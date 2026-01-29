<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>
    <link rel="icon" type="image/png" href="{{ asset('img/logo sensasi.png') }}">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50">
    <!-- Navbar -->
    <audio id="bg-music" src="{{ asset('song/lagu.mp3') }}"></audio>
    <nav class="bg-white shadow-lg fixed w-full top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center h-12">
                    <img src="{{ asset('img/logo/logosensasi.webp') }}" alt="" class="h-full max-h-12 w-auto object-contain">
                </div>
                
                <!-- Desktop Menu -->
                <div class="hidden md:flex space-x-8">
                    <a href="{{ route('user.dashboard.index') }}" 
                    class="nav-link font-medium {{ Route::is('user.dashboard.index') ? 'text-sky-600' : 'text-gray-700 hover:text-sky-600' }}">
                    Home
                    </a>

                    <a href="{{ route('user.profile.index') }}" 
                    class="nav-link font-medium {{ Route::is('user.profile.index') ? 'text-sky-600' : 'text-gray-700 hover:text-sky-600' }}">
                    Profile
                    </a>

                    <a href="{{ route('user.mitra.index') }}" 
                    class="nav-link font-medium {{ Route::is('user.mitra.index') ? 'text-sky-600' : 'text-gray-700 hover:text-sky-600' }}">
                    Mitra
                    </a>

                    <a href="{{ route('user.berita.index') }}" 
                    class="nav-link font-medium {{ Route::is('user.berita.index') || Route::is('user.berita.detail') ? 'text-sky-600' : 'text-gray-700 hover:text-sky-600' }}">
                    Berita
                    </a>

                    <a href="{{ route('user.sensasiclub.index') }}" 
                    class="nav-link font-medium {{ Route::is('user.sensasiclub.index') ? 'text-sky-600' : 'text-gray-700 hover:text-sky-600' }}">
                    Sensasi Club
                    </a>

                    <a href="{{ route('user.kreatif.index') }}" 
                    class="nav-link font-medium {{ Route::is('user.kreatif.index') ? 'text-sky-600' : 'text-gray-700 hover:text-sky-600' }}">
                    Kolom Creative
                    </a>

                    <a href="{{ route('user.kontak.index') }}" 
                    class="nav-link font-medium {{ Route::is('user.kontak.index') ? 'text-sky-600' : 'text-gray-700 hover:text-sky-600' }}">
                    Kontak
                    </a>
                </div>

                <!-- Mobile Menu Button -->
                <button class="md:hidden text-gray-700" id="mobile-menu-btn">
                    <i class="fas fa-bars text-2xl"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div class="mobile-menu fixed top-0 right-0 w-64 h-full bg-white shadow-2xl md:hidden z-50 transform translate-x-full opacity-0 pointer-events-none" id="mobile-menu">
            <div class="p-6">
                <button class="absolute top-4 right-4 text-gray-700" id="close-menu">
                    <i class="fas fa-times text-2xl"></i>
                </button>
                <div class="mt-12 space-y-4">
                    <a href="#home" class="block text-gray-700 hover:text-sky-600 font-medium py-2">Home</a>
                    <a href="#profile" class="block text-gray-700 hover:text-sky-600 font-medium py-2">Profile</a>
                    <a href="#mitra" class="block text-gray-700 hover:text-sky-600 font-medium py-2">Mitra</a>
                    <a href="#berita" class="block text-gray-700 hover:text-sky-600 font-medium py-2">Berita</a>
                    <a href="#club" class="block text-gray-700 hover:text-sky-600 font-medium py-2">Sensasi Club</a>
                    <a href="#creative" class="block text-gray-700 hover:text-sky-600 font-medium py-2">Kolom Creative</a>
                    <a href="#kontak" class="block text-gray-700 hover:text-sky-600 font-medium py-2">Kontak</a>
                </div>
            </div>
        </div>
    </nav>
    @yield('content')
    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12 px-4">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                    <h3 class="text-2xl font-bold mb-4 gradient-text">SENSASI</h3>
                    <p class="text-gray-400">{{ strip_tags($dataherosection->deskripsi) }}</p>
                </div>
                <div>
                    <h4 class="font-bold text-lg mb-4">Quick Links</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#home" class="hover:text-white transition">Home</a></li>
                        <li><a href="#profile" class="hover:text-white transition">Profile</a></li>
                        <li><a href="#mitra" class="hover:text-white transition">Mitra</a></li>
                        <li><a href="#berita" class="hover:text-white transition">Berita</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-lg mb-4">Program</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#club" class="hover:text-white transition">Sensasi Club</a></li>
                        <li><a href="#creative" class="hover:text-white transition">Kolom Creative</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-lg mb-4">Kontak</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><i class="fas fa-envelope mr-2"></i>{{ $datakontak->email }}</li>
                        <li><i class="fas fa-phone mr-2"></i>{{ $datakontak->nomor }}</li>
                        <li><i class="fas fa-map-marker-alt mr-2"></i>{{ $datakontak->alamat }}</li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
                <p>&copy; 2026 Sensasi. All rights reserved. Made with <i class="fas fa-heart text-red-500"></i> by Sensasi Team</p>
            </div>
        </div>
    </footer>

    <!-- Back to Top Button -->
    <button id="back-to-top" class="fixed bottom-8 right-8 bg-sky-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-sky-700 transition hidden z-40">
        <i class="fas fa-arrow-up"></i>
    </button>

    @vite(['resources/css/website.css','resources/js/website/website.js'])
</body>
</html>