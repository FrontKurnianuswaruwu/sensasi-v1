@extends('layouts.website')
@section('content')
@section('title', 'Kontak Sensasi')

<!-- Kontak Section -->
<section id="kontak" class="py-20 px-4 gradient-bg hero-pattern">
    <div class="max-w-7xl mx-auto mt-5">
        <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Hubungi Kami</h2>
            <div class="mt-8 flex items-center justify-center gap-2">
                <div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-blue-500 rounded-full"></div>
            </div>
        </div>
        <!-- Map Section -->
        <div class="grid md:grid-cols-2 gap-12 items-start mb-16">
            <!-- Contact Form -->
            <div class="bg-white rounded-2xl shadow-2xl p-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-6">Kirim Pesan</h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-gray-700 font-medium mb-2">Nama Lengkap</label>
                        <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600" placeholder="Masukkan nama Anda">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-medium mb-2">Email</label>
                        <input type="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600" placeholder="email@example.com">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-medium mb-2">Subjek</label>
                        <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600" placeholder="Subjek pesan">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-medium mb-2">Pesan</label>
                        <textarea rows="5" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600" placeholder="Tulis pesan Anda di sini..."></textarea>
                    </div>
                    <button class="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 transition">
                        <i class="fas fa-paper-plane mr-2"></i>Kirim Pesan
                    </button>
                </div>
            </div>

            <!-- Contact Info -->
            <div class="space-y-6">
                <div class="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4">
                    <div class="bg-sky-100 rounded-full p-4 flex-shrink-0">
                        <i class="fas fa-map-marker-alt text-2xl text-sky-600"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-lg text-gray-800 mb-2">Alamat</h4>
                        <p class="text-gray-600">{{ $datakontak->alamat }}</p>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4">
                    <div class="bg-sky-100 rounded-full p-4 flex-shrink-0">
                        <i class="fas fa-phone text-2xl text-sky-600"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-lg text-gray-800 mb-2">Telepon</h4>
                        <p class="text-gray-600">{{ $datakontak->nomor }}</p>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4">
                    <div class="bg-sky-100 rounded-full p-4 flex-shrink-0">
                        <i class="fas fa-envelope text-2xl text-sky-600"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-lg text-gray-800 mb-2">Email</h4>
                        <p class="text-gray-600">{{ $datakontak->email }}</p>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h4 class="font-bold text-lg text-gray-800 mb-4">Ikuti Kami</h4>
                    <div class="flex space-x-4">
                        <a href="{{ $datakontak->instagram }}" class="bg-sky-100 hover:bg-sky-600 text-sky-600 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition">
                            <i class="fab fa-instagram text-xl"></i>
                        </a>
                        <a href="{{ $datakontak->facebook }}" class="bg-sky-100 hover:bg-sky-600 text-sky-600 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition">
                            <i class="fab fa-facebook text-xl"></i>
                        </a>
                        <a href="{{ $datakontak->twitter }}" class="bg-sky-100 hover:bg-sky-600 text-sky-600 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition">
                            <i class="fab fa-twitter text-xl"></i>
                        </a>
                        <a href="{{ $datakontak->youtube }}" class="bg-sky-100 hover:bg-sky-600 text-sky-600 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition">
                            <i class="fab fa-youtube text-xl"></i>
                        </a>
                        <a href="{{ $datakontak->linkedin }}" class="bg-sky-100 hover:bg-sky-600 text-sky-600 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition">
                            <i class="fab fa-linkedin text-xl"></i>
                        </a>
                        <a href="{{ $datakontak->tiktok }}" class="bg-sky-100 hover:bg-sky-600 text-sky-600 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition">
                            <i class="fab fa-tiktok text-xl"></i>
                        </a>

                    </div>
                </div>
            </div>
        </div>

        <!-- Map Section -->
        <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div class="p-6">
                <h4 class="font-bold text-lg text-gray-800 mb-2">Lokasi Kami</h4>
                <p class="text-gray-600 mb-4">
                    Temukan lokasi Yayasan Sensasi dengan mudah melalui peta di bawah ini.
                </p>
            </div>

            <div class="w-full h-[350px]">
                <iframe
                    class="w-full h-full border-0"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.760060174847!2d106.72835058715819!3d-6.205544199999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f73a74c0652d%3A0x690f98759d037b18!2sTaman%20Kebon%20Jeruk%20Intercon!5e0!3m2!1sen!2sid!4v1769609504310!5m2!1sen!2sid">
                </iframe>
            </div>
        </div>

    </div>
</section>

@endsection