<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kontak extends Model
{
    protected $fillable = [
        'alamat',
        'nomor',
        'email',
        'maps',
        'instagram',
        'facebook',
        'twitter',
        'linkedin',
        'youtube',
        'tiktok',
    ];
}
