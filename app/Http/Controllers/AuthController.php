<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\EmailOtp;
use App\Models\BiodataMahasiswa;
use App\Models\Mitra;
use App\Models\AkademikMahasiswa;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class AuthController extends Controller
{
    // Tampilkan halaman login
    public function login()
    {
        return view('auth.login');
    }

    // Proses login
    public function loginpost(Request $request)
    {
        // Validasi input
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Cek login menggunakan Auth::attempt
        if (Auth::attempt($credentials)) {
            // Regenerate session supaya lebih aman
            $request->session()->regenerate();
            $request->session()->put('role', Auth::user()->role);
            $request->session()->put('user_id', Auth::id()); // Simpan user_id ke session

            return response()->json([
                'success' => true,
                'route' => route('admin.dashboard.index')
            ]);
        }

        // Jika gagal login
        return response()->json([
            'success' => false,
            'message' => 'Email atau password salah'
        ], 401);
    }

    // Logout
    public function logout(Request $request)
    {
        Auth::logout(); // logout user

        // Invalidate session dan regenerasi CSRF token
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('auth.login');
    }

    public function register()
    {
        $mitra = Mitra::select('id','nama_mitra')->get();
        return view('auth.register', compact('mitra'));
    }

    public function registerpost(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
            'name' => 'required|string|max:255',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 9,
            'status_user' => 'Verifikasi',
        ]);

        BiodataMahasiswa::create([
            'user_id' => $user->id,
            'nim' => null,
            'mitra_id' => $request->mitra,
            'tempat_lahir' => null,
            'tanggal_lahir' => null,
            'status' => 'aktif',
        ]);

        AkademikMahasiswa::create([
            'user_id' => $user->id,
            'mitra_id' => $request->mitra,
        ]);

        $otp = rand(100000, 999999);

        EmailOtp::updateOrCreate(
            ['email' => $request->email],
            [
                'otp' => $otp,
                'expired_at' => Carbon::now()->addMinutes(5)
            ]
        );

        Mail::raw("Kode OTP kamu: $otp (berlaku 5 menit)", function ($message) use ($request) {
            $message->to($request->email)
                    ->subject('Kode OTP Registrasi SENSASI');
        });

        return response()->json([
            'redirect' => route('auth.otp', ['email' => $request->email])
        ]);
    }

    public function otp(Request $request)
    {
        $email = $request->query('email');
        return view('auth.otp', ['email' => $email]);
    }

    public function verifyOtp(Request $request)
    {
        $otp = EmailOtp::where('email', $request->email)
            ->where('otp', $request->otp)
            ->where('expired_at', '>', now())
            ->first();

        if (!$otp) {
            return response()->json([
                'message' => 'OTP tidak valid atau sudah kadaluarsa'
            ], 422);
        }

        User::where('email', $request->email)
            ->update(['email_verified_at' => now()]);

        $otp->delete();

        return response()->json(['success' => true]);
    }

    public function resendOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email'
        ]);

        // Generate OTP baru
        $otp = rand(100000, 999999);

        EmailOtp::updateOrCreate(
            ['email' => $request->email],
            [
                'otp' => $otp,
                'expired_at' => now()->addMinutes(5)
            ]
        );

        // Kirim Email OTP
        Mail::raw("Kode OTP baru kamu: $otp (berlaku 5 menit)", function ($message) use ($request) {
            $message->to($request->email)
                    ->subject('Kode OTP Registrasi SENSASI');
        });

        return response()->json(['success' => true]);
    }

}
