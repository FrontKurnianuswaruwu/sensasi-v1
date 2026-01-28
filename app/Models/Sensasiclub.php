<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sensasiclub extends Model
{
    protected $table = 'sensai_club';
    protected $fillable = [
        'mahasiswa_id',
        'judul',
        'link_youtube',
        'pdf',
        'foto',
        'jenis',
        'deskripsi',
        'status',
    ];

    public function mahasiswa()
    {
        return $this->belongsTo(BiodataMahasiswa::class, 'mahasiswa_id');
    }
}
