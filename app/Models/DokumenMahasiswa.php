<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DokumenMahasiswa extends Model
{
    protected $table = 'dokumen_mahasiswa';

    protected $fillable = [
        'user_id',
        'scan_ktp',
        'scan_kartu_mahasiswa',
        'scan_kk',
        'transkrip_nilai',
        'surat_keterangan_aktif',
        'foto_profil',
        'essay_motivasi',
        'sertifikat_prestasi',
    ];
}
