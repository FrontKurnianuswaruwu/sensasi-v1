<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Herosection extends Model
{
    protected $table = 'hero_sections';

    protected $fillable = [
        'name',
        'deskripsi',
    ];

    public function herophotos()
    {
        return $this->hasMany(Herophoto::class, 'hero_id');
    }
}
