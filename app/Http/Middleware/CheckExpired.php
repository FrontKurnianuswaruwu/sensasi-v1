<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class CheckExpired
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        // Jika pengguna di halaman login, lanjutkan request
        if ($request->is('login')) {
            return $next($request);
        }

        // Jika sudah login, simpan session login selama 1 hari
        if (!Session::has('logged_in_time')) {
            Session::put('logged_in_time', Carbon::now());
        }

        // Cek apakah sudah lebih dari 1 hari
        $loggedInTime = Session::get('logged_in_time');
        if (Carbon::parse($loggedInTime)->addDay()->isPast()) {
            Auth::logout();
            Session::flush();
            return redirect()->route('login')->with(['error' => 'Sesi Anda telah habis, silakan login kembali.']);
        }

        return $next($request);
    }
}
