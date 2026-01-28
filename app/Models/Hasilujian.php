<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hasilujian extends Model
{
    protected $table = 'hasil_ujian';

    protected $fillable = [
        'mahasiswa_id',
        'kategori_id',
        'jumlah_benar',
        'jumlah_salah',
        'tanggal',
        'status',
    ];

    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class, 'mahasiswa_id');
    }
    
    public function kategoriSoal()
    {
        return $this->belongsTo(KategoriSoal::class, 'kategori_id');
    }
}
