<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sejarah extends Model
{
    protected $fillable = ['nama', 'deskripsi'];

    public function fotos()
    {
        return $this->hasMany(SejarahFoto::class, 'sejarah_id');
    }
}
