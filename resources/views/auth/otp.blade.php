<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifikasi OTP - Dashboard Admin SENSASI</title>

    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="icon" type="image/png" href="{{ asset('img/logo sensasi.png') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body class="gradient-bg min-h-screen flex items-center justify-center p-4">

<div class="w-full max-w-md relative z-10">
    <!-- Logo -->
    <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center mb-4">
            <img src="{{ asset('img/logosensasi.webp') }}"
                alt="Logo Sensasi"
                class="w-25 h-25 object-contain">
        </div>
        <p class="text-white/80 text-sm">Kode OTP dikirim ke <b>{{ $email }}</b></p>
    </div>

    <!-- Card -->
    <div class="glass-effect rounded-2xl p-8">
        <form id="otpForm" data-email="{{ $email }}" class="space-y-6">
            <div>
                <label class="block text-white text-sm mb-2">
                    <i class="fas fa-key mr-2"></i>Masukkan Kode OTP
                </label>
                <input type="text" id="otp" maxlength="6"
                       class="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 text-center text-2xl tracking-widest"
                       placeholder="******">
                <p id="otp-error" class="text-red-300 text-xs hidden mt-1">OTP tidak valid</p>
            </div>

            <button type="submit" id="verifyBtn"
                    class="w-full bg-white text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-100 transition">
                <span id="verifyText"><i class="fas fa-check mr-2"></i>Verifikasi</span>
                <span id="verifyLoading" class="hidden"><i class="fas fa-spinner fa-spin mr-2"></i>Memproses...</span>
            </button>

            <p class="text-center text-white/70 text-sm mt-2">
                Belum menerima OTP?
                <a href="{{ route('auth.register') }}" class="text-white font-semibold hover:underline">Kembali Daftar</a>
            </p>
        </form>
        <div class="flex justify-between items-center mt-4">
            <p id="otp-error" class="text-red-300 text-xs hidden"></p>
            <button type="button" id="resendOtp" class="text-sm text-white/80 hover:underline">
                Kirim Ulang OTP
            </button>
        </div>
    </div>
</div>

<!-- Toast -->
<div id="toast" class="fixed top-4 right-4 hidden z-50">
    <div class="bg-white rounded-lg shadow-lg p-4">
        <p id="toast-message" class="text-gray-800 font-medium"></p>
    </div>
</div>

 @vite(['resources/css/auth/login.css','resources/js/auth/otp.js'])
</body>
</html>