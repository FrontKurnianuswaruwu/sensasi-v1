<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $fillable = ['name', 'route', 'icon', 'is_parent', 'type'];
    public function submenus()
    {
        return $this->hasMany(Submenu::class);
    }    
}
