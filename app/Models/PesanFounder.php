<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PesanFounder extends Model
{
    protected $fillable = ['nama', 'deskripsi'];

    protected $table = 'pesan_founders';
}
