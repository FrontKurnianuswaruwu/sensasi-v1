<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Submenu extends Model
{
    protected $fillable = ['name', 'route', 'icon', 'menu_id', 'type', 'type_menu'];
    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }
    public function permissions()
    {
        return $this->hasMany(Permission::class, 'submenu_id');
    }
}
