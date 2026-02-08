<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Dashboard Admin SENSASI</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="icon" type="image/png" href="{{ asset('img/logo sensasi.png') }}">
</head>
<meta name="csrf-token" content="{{ csrf_token() }}">
<body class="gradient-bg min-h-screen flex items-center justify-center p-4">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
        <div class="floating-animation absolute top-20 left-20 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div class="floating-animation absolute top-40 right-32 w-32 h-32 bg-white/5 rounded-full blur-2xl" style="animation-delay: -2s;"></div>
        <div class="floating-animation absolute bottom-20 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl" style="animation-delay: -4s;"></div>
        <div class="floating-animation absolute bottom-32 right-20 w-16 h-16 bg-white/15 rounded-full blur-lg" style="animation-delay: -1s;"></div>
    </div>

    <!-- Login Container -->
    <div class="w-full max-w-md relative z-10">
        <!-- Logo Section -->
        <div class="text-center mb-8 slide-in">
            <div class="inline-flex items-center justify-center mb-4">
                <img src="{{ asset('img/logosensasi.webp') }}"
                    alt="Logo Sensasi"
                    class="w-25 h-25 object-contain">
            </div>
            <p class="text-white/80 text-sm">Masuk ke panel admin Anda</p>
        </div>

        <!-- Login Card -->
        <div class="glass-effect rounded-2xl p-8 login-card slide-in" style="animation-delay: 0.2s;">
            <form id="loginForm" class="space-y-6">
                <!-- Username Field -->
                <div class="space-y-2">
                    <label for="email" class="block text-white font-medium text-sm">
                        <i class="fas fa-user mr-2"></i>Username
                    </label>
                    <input 
                        type="text" 
                        id="email" 
                        name="email"
                        class="input-focus w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                        placeholder="Masukkan email Anda"
                        required
                    >
                    <div id="email-error" class="text-red-300 text-xs hidden">
                        <i class="fas fa-exclamation-circle mr-1"></i>Email harus diisi
                    </div>
                </div>

                <!-- Password Field -->
                <div class="space-y-2">
                    <label for="password" class="block text-white font-medium text-sm">
                        <i class="fas fa-lock mr-2"></i>Password
                    </label>
                    <div class="relative">
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            class="input-focus w-full px-4 py-3 pr-12 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                            placeholder="Masukkan password Anda"
                            required
                        >
                        <button 
                            type="button" 
                            id="togglePassword"
                            class="absolute inset-y-0 right-0 flex items-center px-3 text-white/60 hover:text-white transition-colors"
                        >
                            <i id="passwordIcon" class="fas fa-eye"></i>
                        </button>
                    </div>
                    <div id="password-error" class="text-red-300 text-xs hidden">
                        <i class="fas fa-exclamation-circle mr-1"></i>Password harus diisi
                    </div>
                </div>

                <!-- Remember Me & Forgot Password -->
                <div class="flex items-center justify-between text-sm">
                    <a href="#" class="text-white/80 hover:text-white transition-colors">
                        Lupa password?
                    </a>
                </div>

                <!-- Login Button -->
                <button 
                    type="submit" 
                    id="loginBtn"
                    class="btn-hover w-full bg-white text-gray-800 font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                    <span id="loginText">
                        <i class="fas fa-sign-in-alt mr-2"></i>Masuk Dashboard
                    </span>
                    <span id="loginLoading" class="hidden">
                        <i class="fas fa-spinner fa-spin mr-2"></i>Memproses...
                    </span>
                </button>
            </form>

        </div>

        <!-- Footer -->
        <div class="text-center mt-6 text-white/60 text-xs slide-in" style="animation-delay: 0.4s;">
            <p>&copy; 2026 SENSASI Dashboard. Semua hak dilindungi.</p>
        </div>
    </div>

    <!-- Success/Error Toast -->
    <div id="toast" class="fixed top-4 right-4 z-50 hidden">
        <div class="bg-white rounded-lg shadow-lg p-4 max-w-sm">
            <div class="flex items-center">
                <div id="toast-icon" class="mr-3"></div>
                <div>
                    <div id="toast-title" class="font-semibold text-gray-800"></div>
                    <div id="toast-message" class="text-sm text-gray-600"></div>
                </div>
            </div>
        </div>
    </div>
    @vite(['resources/css/auth/login.css','resources/js/auth/login.js'])
</body>
</html>