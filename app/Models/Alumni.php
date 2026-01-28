<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alumni extends Model
{
    protected $fillable = [
        'nama_lengkap',
        'mitra_id',
        'foto',
        'tahun_lulus',
        'program_studi',
    ];

    public function mitra()
    {
        return $this->belongsTo(Mitra::class, 'mitra_id');
    }
}
