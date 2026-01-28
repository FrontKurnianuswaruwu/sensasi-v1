<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Submenu;
use App\Models\PermissionRole;
use App\Models\Permission;

class CheckPermission
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            return $this->deny($request, 'Silakan login terlebih dahulu.', true);
        }
        
        $user = Auth::user();
        $roleId = $user->role;
        $routeName = $request->route()->getName();

        // ambil semua submenu sesuai route
        $submenus = Submenu::where('route', $routeName)->get();

        // filter hanya restricted (type_menu 0 dan 1)
        $restrictedSubmenus = $submenus->whereIn('type_menu', [0, 1]);

        if ($restrictedSubmenus->isEmpty()) {
            // kalau tidak restricted → lanjut
            return $next($request);
        }

        // cek apakah ada submenu untuk role ini
        $submenu = $restrictedSubmenus->firstWhere('type', $roleId);
        if (!$submenu) {
            return $this->deny($request, 'Akses ditolak! Role Anda tidak memiliki akses ke submenu ini.');
        }

        // cek permission
        $permission = Permission::where('submenu_id', $submenu->id)
            ->where('name', 'like', 'View%')
            ->first();

        if (!$permission) {
            return $this->deny($request, 'Akses ditolak! Tidak ada izin yang terdaftar untuk submenu ini.');
        }

        $hasPermission = PermissionRole::where('role_id', $roleId)
            ->where('permission_id', $permission->id)
            ->exists();

        if (!$hasPermission) {
            return $this->deny($request, 'Akses ditolak! Anda tidak memiliki izin.');
        }

        return $next($request);
    }

    protected function deny(Request $request, $message, $forceRedirectLogin = false)
    {
        if ($request->expectsJson()) {
            return response()->json(['status' => 'error', 'message' => $message], 403);
        }

        if ($forceRedirectLogin) {
            return redirect()->route('auth.login')->with('message', $message);
        }

        return redirect()->back()->with('message', $message);
    }
}
