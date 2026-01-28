<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar - Dashboard Admin SENSASI</title>

    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="icon" type="image/png" href="{{ asset('img/logo sensasi.png') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>

<body class="gradient-bg min-h-screen flex items-center justify-center p-4">

<div class="w-full max-w-md relative z-10">
    <!-- Logo -->
    <div class="text-center mb-8 slide-in">
        <div class="inline-flex items-center justify-center mb-4">
            <img src="{{ asset('img/logosensasi.webp') }}"
                alt="Logo Sensasi"
                class="w-25 h-25 object-contain">
        </div>
        <p class="text-white/80 text-sm">Buat akun admin SENSASI</p>
    </div>

    <!-- Card -->
    <div class="glass-effect rounded-2xl p-8 login-card slide-in" style="animation-delay: 0.2s;" >
        <form id="registerForm" class="space-y-6">
            <div>
                <label class="block text-white text-sm mb-2">
                    <i class="fas fa-user mr-2"></i>Nama
                </label>
                <input type="text" id="name" name="name"
                    class="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-white/50"
                    placeholder="Nama lengkap">
                <p id="name-error" class="text-red-300 text-xs hidden">Nama wajib diisi</p>
            </div>
            <!-- Email -->
            <div>
                <label class="block text-white text-sm mb-2">
                    <i class="fas fa-envelope mr-2"></i>Email
                </label>
                <input type="email" id="email" name="email"
                       class="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-white/50"
                       placeholder="email@example.com">
                <p id="email-error" class="text-red-300 text-xs hidden">Email wajib diisi</p>
            </div>
            <!-- Mitra -->
            <div>
                <label class="block text-white text-sm mb-2">
                    <i class="fas fa-handshake mr-2"></i>Mitra
                </label>
                <select id="mitra" name="mitra"
                    class="w-full px-4 py-3 bg-white/10 text-white border border-white/30 rounded-lg
                        focus:ring-2 focus:ring-white/50">
                    
                    <option value="" disabled selected class="text-gray-400">
                        Pilih Mitra
                    </option>

                    @foreach ($mitra as $m)
                        <option value="{{ $m->id }}" class="text-black bg-white">
                            {{ $m->nama_mitra }}
                        </option>
                    @endforeach
                </select>
                <p id="mitra-error" class="text-red-300 text-xs hidden">Pilih Mitra wajib diisi</p>
            </div>

            <!-- Password -->
            <div>
                <label class="block text-white text-sm mb-2">
                    <i class="fas fa-lock mr-2"></i>Password
                </label>

                <div class="relative">
                    <input type="password" id="password" name="password"
                        class="w-full px-4 py-3 pr-12 bg-white/10 border border-white/30 rounded-lg
                                text-white placeholder-white/60 focus:ring-2 focus:ring-white/50"
                        placeholder="Password minimal 8 karakter">

                    <!-- Icon Mata -->
                    <button type="button" id="togglePassword"
                            class="absolute inset-y-0 right-3 flex items-center text-white/60 hover:text-white">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>

                <p id="password-error" class="text-red-300 text-xs hidden">
                    Password minimal 8 karakter
                </p>
            </div>

            <!-- Confirm Password -->
            <div>
                <label class="block text-white text-sm mb-2">
                    <i class="fas fa-lock mr-2"></i>Konfirmasi Password
                </label>

                <div class="relative">
                    <input type="password" id="password_confirmation" name="password_confirmation"
                        class="w-full px-4 py-3 pr-12 bg-white/10 border border-white/30 rounded-lg
                                text-white placeholder-white/60 focus:ring-2 focus:ring-white/50"
                        placeholder="Ulangi password">

                    <!-- Icon Mata -->
                    <button type="button" id="toggleConfirm"
                            class="absolute inset-y-0 right-3 flex items-center text-white/60 hover:text-white">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>

                <p id="confirm-error" class="text-red-300 text-xs hidden">
                    Password tidak sama
                </p>
            </div>

            <!-- Button -->
            <button type="submit" id="registerBtn"
                    class="w-full bg-white text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-100 transition">
                <span id="registerText">
                    <i class="fas fa-user-plus mr-2"></i>Daftar
                </span>
                <span id="registerLoading" class="hidden">
                    <i class="fas fa-spinner fa-spin mr-2"></i>Memproses...
                </span>
            </button>

            <p class="text-center text-white/70 text-sm">
                Sudah punya akun?
                <a href="{{ route('auth.login') }}" class="text-white font-semibold hover:underline">
                    Login
                </a>
            </p>

        </form>
    </div>
</div>

<!-- Toast -->
<div id="toast" class="fixed top-4 right-4 hidden z-50">
    <div class="bg-white rounded-lg shadow-lg p-4">
        <p id="toast-message" class="text-gray-800 font-medium"></p>
    </div>
</div>
    @vite(['resources/css/auth/login.css','resources/js/auth/register.js'])
</body>
</html>
