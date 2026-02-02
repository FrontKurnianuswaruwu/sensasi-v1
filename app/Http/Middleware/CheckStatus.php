<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckStatus
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $role = auth()->user()->role;
        if ($role == 9) {
            $statusUser = auth()->user()->status_user;

            if ($statusUser == 'Biodata') {
                $allowedRoutes = [
                    'admin.biodatamahasiswa.index',
                    'admin.dashboard.index',
                ];

                if (!in_array($request->route()->getName(), $allowedRoutes)) {
                    return redirect()->route('admin.biodatamahasiswa.index')->with('error', 'Silakan lengkapi biodata Anda terlebih dahulu.');
                }
            } elseif ($statusUser == 'Potensi Akademik') {
                $allowedRoutes = [
                    'admin.biodatamahasiswa.index',
                    'admin.potensiakademik.index',
                    'admin.dashboard.index',
                ];

                if (!in_array($request->route()->getName(), $allowedRoutes)) {
                    return redirect()->route('admin.potensiakademik.index')->with('error', 'Silakan selesaikan tes potensi akademik Anda terlebih dahulu.');
                }
            }
        }
        return $next($request);
    }
}
