<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Pengaturan;

class CheckPendaftaran
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $pengaturan = Pengaturan::first();

        if (!$pengaturan || $pengaturan->value == 0) {
            return redirect('/')->with('error', 'Pendaftaran sedang ditutup.');
        }

        return $next($request);
    }
}
