<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PermissionRole extends Model
{
    protected $fillable = ['permission_id', 'role_id'];

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    public function permission()
    {
        return $this->belongsTo(Permission::class, 'permission_id');
    }

    static public function getPermission($slug, $role_id)
    {
        return PermissionRole::select('permission_role.id')
                    ->join('permissions', 'permissions.id', '=', 'permission_role.permission_id')
                    ->where('permission_role.role_id', '=', $role_id)
                    ->where('permissions.slug', '=', $slug)
                    ->count();
    }
}
