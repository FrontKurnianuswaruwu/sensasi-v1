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
}
