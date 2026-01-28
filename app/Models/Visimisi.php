<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visimisi extends Model
{
    protected $table = 'visimisis';

    protected $fillable = [
        'visi',
        'misi',
    ];
}
