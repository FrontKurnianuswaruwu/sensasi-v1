<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SejarahFoto extends Model
{
    protected $table = 'sejarah_fotos';
    protected $fillable = ['foto', 'sejarah_id'];

    public function sejarah()
    {
        return $this->belongsTo(Sejarah::class);
    }
}
