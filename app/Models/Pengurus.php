<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengurus extends Model
{
    protected $table = 'penguruss';
    protected $fillable = [
        'nama',
        'jabatan',
        'foto',
        'biodata',
    ];
}
