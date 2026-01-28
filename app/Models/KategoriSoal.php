<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KategoriSoal extends Model
{
    protected $table = 'kategori_soal';

    protected $fillable = [
        'name',
        'waktu_pengerjaan',
        'is_active',
    ];

    public function soals()
    {
        return $this->hasMany(Soal::class, 'kategori_id');
    }

    public function hasilUjians()
    {
        return $this->hasMany(Hasilujian::class, 'kategori_id');
    }
}
