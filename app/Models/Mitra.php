<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mitra extends Model
{
    protected $fillable = [
        'nama_mitra',
        'deskripsi',
        'logo_url',
        'kontak',
        'nama_admin',
        'link_website',
        'tahun_kerjasama',
    ];
}
