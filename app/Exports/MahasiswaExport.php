<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class MahasiswaExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize, WithStyles
{
    public function collection()
    {
        return User::where('status_user', 'Verifikasi')
            ->with([
                'biodataMahasiswa.hasilujian.kategoriSoal', 
                'akademik.mitra', 
                'orangtua', 
                'akademik.tahunAkademik'
            ])
            ->get();
    }

    public function styles(Worksheet $sheet)
    {
        $lastRow = $sheet->getHighestRow();
        $lastCol = $sheet->getHighestColumn();
        $range = 'A1:' . $lastCol . $lastRow;

        return [
            1 => [
                'font' => [
                    'bold' => true, 
                    'color' => ['argb' => 'FFFFFF'],
                    'size' => 12
                ],
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => ['argb' => '2563EB'],
                ],
            ],

            $range => [
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['argb' => '000000'],
                    ],
                ],
                'alignment' => [
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
            ],
        ];
    }

    private function formatRupiah($angka)
    {
        if (!$angka || !is_numeric($angka)) return 'Rp 0';
        return 'Rp ' . number_format($angka, 0, ',', '.');
    }

    public function headings(): array
    {
        return [
            'NAMA LENGKAP', 'EMAIL', 'NIM', 'NIK', 'TEMPAT LAHIR', 'TANGGAL LAHIR', 'GENDER', 'NO. WA',
            'AGAMA', 'STATUS KAWIN', 'ANAK KE', 'SAUDARA', 'ALAMAT KTP',
            'MITRA/UNIV', 'TAHUN AKADEMIK', 'FAKULTAS', 'PRODI', 'SMT', 'IPK',
            'NAMA AYAH', 'KERJA AYAH', 'PENDIDIKAN AYAH', 'PENGHASILAN AYAH',
            'NAMA IBU', 'KERJA IBU', 'PENDIDIKAN IBU', 'PENGHASILAN IBU',
            'TANGGUNGAN', 'WA ORTU',
            'KATEGORI UJIAN', 'TOTAL BENAR', 'TOTAL SALAH', 'STATUS'
        ];
    }

    public function map($user): array
    {
        $bio = $user->biodataMahasiswa;
        $akad = $user->akademik;
        $ortu = $user->orangtua;

        $daftarKategori = '-';
        if ($bio && $bio->hasilujian->isNotEmpty()) {
            $daftarKategori = $bio->hasilujian->map(function($item) {
                return $item->kategoriSoal->name ?? '-';
            })->implode(', ');
        }
        
        $totalBenar = $bio ? $bio->hasilujian->sum('jumlah_benar') : 0;
        $totalSalah = $bio ? $bio->hasilujian->sum('jumlah_salah') : 0;

        return [
            strtoupper($user->name),
            $user->email,
            $bio->nim ?? '-',
            "'" . ($bio->nik ?? '-'),
            $bio->tempat_lahir ?? '-',
            $bio->tanggal_lahir ?? '-',
            $bio->jenis_kelamin ?? '-',
            $bio->no_wa ?? '-',
            $bio->agama ?? '-',
            $bio->status_perkawinan ?? '-',
            $bio->anak_ke ?? '-',
            $bio->jumlah_saudara ?? '-',
            $bio->alamat_ktp ?? '-',
            
            $akad->mitra->nama_mitra ?? '-', 
            $akad->tahunAkademik->tahun ?? '-',
            $akad->fakultas ?? '-',
            $akad->program_studi ?? '-',
            $akad->semester ?? '-',
            $akad->ip_terakhir ?? '-',
            
            $ortu->nama_ayah ?? '-',
            $ortu->pekerjaan_ayah ?? '-',
            $ortu->pendidikan_ayah ?? '-',
            $this->formatRupiah($ortu->penghasilan_ayah ?? 0),
            
            $ortu->nama_ibu ?? '-',
            $ortu->pekerjaan_ibu ?? '-',
            $ortu->pendidikan_ibu ?? '-',
            $this->formatRupiah($ortu->penghasilan_ibu ?? 0),
            
            $ortu->jumlah_tanggungan ?? '-',
            $ortu->no_wa_ortu ?? '-',
            
            $daftarKategori,
            $totalBenar,
            $totalSalah,
            $user->status_user
        ];
    }
}