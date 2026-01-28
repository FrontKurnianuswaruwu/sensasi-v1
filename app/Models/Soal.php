<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Soal extends Model
{
    protected $table = 'soal';

    protected $fillable = [
        'kategori_id',
        'pertanyaan',
    ];

    public function kategoriSoal()
    {
        return $this->belongsTo(KategoriSoal::class, 'kategori_id');
    }
    public function pilihan()
    {
        return $this->hasMany(Pilihan::class, 'soal_id');
    }
}
