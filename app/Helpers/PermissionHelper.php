<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Models\SubMenu;
use App\Models\Permission;
use App\Models\PermissionRole;

class PermissionHelper
{
    
    public static function hasPermissionByPrefix($roleId, $prefix)
    {
        $currentRoute = Route::currentRouteName();

        // Gunakan referer hanya jika currentRoute kosong/null
        if (!$currentRoute) {
            $referer = request()->headers->get('referer');

            if ($referer) {
                $path = parse_url($referer, PHP_URL_PATH);
                $route = collect(Route::getRoutes())->first(function ($r) use ($path) {
                    return $r->matches(Request::create($path));
                });

                if ($route) {
                    $currentRoute = $route->getName();
                }
            }
        }
        // dd($currentRoute); // ini sekarang akan kpi.index atau semacamnya, bukan dashboardadmin
        $submenuId = SubMenu::where('route', $currentRoute)->where('type', $roleId)->value('id');
        // dd($currentRoute);
        // dd($submenuId);
        if (!$submenuId) return false;

        return Permission::join('permission_roles', 'permissions.id', '=', 'permission_roles.permission_id')
            ->where('permission_roles.role_id', $roleId)
            ->where('permissions.submenu_id', $submenuId)
            ->where('permissions.name', 'like', '%' . $prefix . '%')
            ->exists();
    }


}
