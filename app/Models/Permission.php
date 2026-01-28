<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    protected $fillable = ['submenu_id', 'name', 'slug', 'groupby'];
    public function submenu()
    {
        return $this->belongsTo(Submenu::class, 'submenu_id');
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'permission_roles', 'permission_id', 'role_id');
    }

}
