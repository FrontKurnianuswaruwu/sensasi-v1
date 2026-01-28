<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pilihan extends Model
{
    protected $table = 'opsi_jawaban';

    protected $fillable = [
        'soal_id',
        'teks',
        'is_true',
    ];

    public function soal()
    {
        return $this->belongsTo(Soal::class, 'soal_id');
    }
    
}
