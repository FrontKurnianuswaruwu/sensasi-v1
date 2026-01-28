<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kreative extends Model
{
    protected $table = 'kreatives';
    protected $fillable = [
        'user_id',
        'nama',
        'deskripsi',
        'status',
        'pdf',
        'foto',
    ];

    public function biodataMahasiswa()
    {
        return $this->belongsTo(BiodataMahasiswa::class, 'user_id', 'user_id');
    }
}
