<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengajuandana extends Model
{
    protected $table = 'pengajuan_dana';

    protected $fillable = [
        'mahasiswa_id',
        'semester',
        'ip_semester',
        'spp_tetap',
        'spp_variabel',
        'praktikum',
        'jml_sks',
        'nominal',
        'total',
        'tipe',
        'status',
        'catatan',
        'nominal_disetujui',
    ];

    public function mahasiswa()
    {
        return $this->belongsTo(BiodataMahasiswa::class, 'mahasiswa_id', 'id');
    }

    // Relasi ke tahun akademik melalui mahasiswa -> user -> akademik
    public function tahunAkademik()
    {
        return $this->hasOneThrough(
            TahunAkademik::class,
            AkademikMahasiswa::class,
            'user_id', // Foreign key on akademik_mahasiswa table
            'id', // Foreign key on tahun_akademik table
            'mahasiswa_id', // Local key on pengajuan_dana table
            'tahun_akademik_id' // Local key on akademik_mahasiswa table
        )->join('biodata_mahasiswa', 'akademik_mahasiswa.user_id', '=', 'biodata_mahasiswa.user_id')
         ->where('biodata_mahasiswa.id', '=', $this->mahasiswa_id);
    }
}
