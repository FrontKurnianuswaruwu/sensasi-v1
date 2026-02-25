<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

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
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }

    public function headings(): array
    {
        return [
            'Nama Lengkap',
            'Email',
            'NIM',
            'NIK',
            'Tempat Lahir',
            'Tanggal Lahir',
            'Jenis Kelamin',
            'No. WA',
            'Agama',
            'Status Perkawinan',
            'Anak Ke',
            'Jumlah Saudara',
            'Alamat KTP',
            
            'Nama Mitra/Univ',
            'Tahun Akademik',
            'Fakultas',
            'Program Studi',
            'Semester',
            'IP Terakhir',
            
            'Nama Ayah',
            'Pekerjaan Ayah',
            'Pendidikan Ayah',
            'Penghasilan Ayah',
            'Nama Ibu',
            'Pekerjaan Ibu',
            'Pendidikan Ibu',
            'Penghasilan Ibu',
            'Jumlah Tanggungan',
            'No. WA Ortu',
            
            'Kategori',
            'Total Jawaban Benar',
            'Total Jawaban Salah',
            'Status User'
        ];
    }

    public function map($user): array
    {
        $bio = $user->biodataMahasiswa;
        $akad = $user->akademik;
        $ortu = $user->orangtua;
        $kategori = $bio && $bio->hasilujian->first() ? $bio->hasilujian->first()->kategoriSoal->nama_kategori : '-';
        
        $totalBenar = $bio ? $bio->hasilujian->sum('jumlah_benar') : 0;
        $totalSalah = $bio ? $bio->hasilujian->sum('jumlah_salah') : 0;

        return [
            $user->name,
            $user->email,
            $bio->nim ?? '-',
            $bio->nik ?? '-',
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
            $ortu->penghasilan_ayah ?? '-',
            $ortu->nama_ibu ?? '-',
            $ortu->pekerjaan_ibu ?? '-',
            $ortu->pendidikan_ibu ?? '-',
            $ortu->penghasilan_ibu ?? '-',
            $ortu->jumlah_tanggungan ?? '-',
            $ortu->no_wa_ortu ?? '-',
            
            $kategori,
            $totalBenar,
            $totalSalah,
            $user->status_user
        ];
    }
}