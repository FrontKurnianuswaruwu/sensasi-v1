<?php

namespace App\Exports;

use App\Models\Pengajuandana;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class RiwayatpengajuandanaExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize, WithStyles, WithTitle
{
    protected $tahunAkademikId;
    protected $mitraId;

    public function __construct($tahunAkademikId = null, $mitraId = null)
    {
        $this->tahunAkademikId = $tahunAkademikId;
        $this->mitraId = $mitraId;
    }

    public function collection()
    {
        $query = Pengajuandana::with(['mahasiswa.user.akademik.tahunAkademik', 'mahasiswa.user.akademik.mitra'])
            ->orderBy('created_at', 'desc');

        // Filter berdasarkan mitra (untuk role 19)
        if ($this->mitraId) {
            $query->whereHas('mahasiswa.user.akademik', function ($q) {
                $q->where('mitra_id', $this->mitraId);
            });
        }

        // Filter berdasarkan tahun akademik jika dipilih
        if ($this->tahunAkademikId) {
            $query->whereHas('mahasiswa.user.akademik', function ($q) {
                $q->where('tahun_akademik_id', $this->tahunAkademikId);
            });
        }

        return $query->get();
    }

    public function styles(Worksheet $sheet)
    {
        $lastRow = $sheet->getHighestRow();
        $lastCol = $sheet->getHighestColumn();
        $fullRange = 'A1:' . $lastCol . $lastRow;

        $sheet->getRowDimension(1)->setRowHeight(35);
        $sheet->getStyle($fullRange)->getAlignment()->setVertical(Alignment::VERTICAL_CENTER);

        for ($i = 2; $i <= $lastRow; $i++) {
            $sheet->getRowDimension($i)->setRowHeight(25);

            // Zebra stripe
            if ($i % 2 == 0) {
                $sheet->getStyle("A$i:$lastCol$i")->getFill()
                    ->setFillType(Fill::FILL_SOLID)
                    ->getStartColor()->setARGB('F8FAFC');
            }

            // Warna baris berdasarkan status (kolom N)
            $status = $sheet->getCell("N$i")->getValue();
            if ($status === 'Approved') {
                $sheet->getStyle("A$i:$lastCol$i")->getFill()
                    ->setFillType(Fill::FILL_SOLID)
                    ->getStartColor()->setARGB('DCFCE7');
                $sheet->getStyle("N$i")->getFont()->getColor()->setARGB('16A34A');
                $sheet->getStyle("N$i")->getFont()->setBold(true);
            } elseif ($status === 'Rejected') {
                $sheet->getStyle("A$i:$lastCol$i")->getFill()
                    ->setFillType(Fill::FILL_SOLID)
                    ->getStartColor()->setARGB('FEE2E2');
                $sheet->getStyle("N$i")->getFont()->getColor()->setARGB('DC2626');
                $sheet->getStyle("N$i")->getFont()->setBold(true);
            } elseif ($status === 'Pending') {
                $sheet->getStyle("N$i")->getFont()->getColor()->setARGB('D97706');
                $sheet->getStyle("N$i")->getFont()->setBold(true);
            }
        }

        // Format kolom currency (G, H, I, K, L, M)
        foreach (['G', 'H', 'I', 'K', 'L', 'M'] as $col) {
            $sheet->getStyle("{$col}2:{$col}{$lastRow}")
                ->getNumberFormat()
                ->setFormatCode('"Rp "#,##0');
        }

        return [
            1 => [
                'font' => [
                    'bold'  => true,
                    'color' => ['argb' => 'FFFFFF'],
                    'size'  => 11,
                    'name'  => 'Arial',
                ],
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                    'vertical'   => Alignment::VERTICAL_CENTER,
                ],
                'fill' => [
                    'fillType'   => Fill::FILL_SOLID,
                    'startColor' => ['argb' => '1E293B'],
                ],
            ],

            $fullRange => [
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color'       => ['argb' => 'CBD5E1'],
                    ],
                ],
            ],
        ];
    }

    public function headings(): array
    {
        return [
            'NO',
            'NAMA MAHASISWA',
            'UNIVERSITAS',
            'SEMESTER',
            'IP SEMESTER',
            'JENIS PENGAJUAN',
            'SPP TETAP',
            'SPP VARIABEL',
            'PRAKTIKUM',
            'JUMLAH SKS',
            'NOMINAL/SKS',
            'TOTAL',
            'NOMINAL DISETUJUI',
            'STATUS',
            'CATATAN',
            'TANGGAL PENGAJUAN',
        ];
    }

    public function map($row): array
    {
        static $no = 0;
        $no++;

        $statusLabel = match($row->status) {
            'pending'  => 'Pending',
            'approved' => 'Approved',
            'rejected' => 'Rejected',
            default    => '-',
        };

        return [
            $no,
            strtoupper($row->mahasiswa?->user?->name ?? '-'),
            $row->mahasiswa?->user?->akademik?->mitra?->nama_mitra ?? '-',
            'Semester ' . $row->semester,
            $row->ip_semester ?? '-',
            $row->tipe == 1 ? 'Paket' : 'SKS',
            $row->tipe == 1 ? ($row->spp_tetap ?? 0) : 0,
            $row->tipe == 1 ? ($row->spp_variabel ?? 0) : 0,
            $row->praktikum ?? 0,
            $row->tipe == 2 ? ($row->jml_sks ?? 0) : 0,
            $row->tipe == 2 ? ($row->nominal ?? 0) : 0,
            $row->total ?? 0,
            $row->nominal_disetujui ?? 0,
            $statusLabel,
            $row->catatan ?? '-',
            $row->created_at?->format('d M Y H:i') ?? '-',
        ];
    }

    public function title(): string
    {
        return 'Riwayat Pengajuan Dana';
    }
}
