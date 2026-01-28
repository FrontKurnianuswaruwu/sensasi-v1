<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Herophoto extends Model
{
    protected $table = 'hero_photos';

    protected $fillable = [
        'hero_id',
        'foto',
    ];

    public function herosection()
    {
        return $this->belongsTo(Herosection::class, 'hero_id');
    }
}
