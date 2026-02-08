@extends('layouts.admin')
@section('content')
@section('title', 'Data Alumni')
<!-- Main Content -->
<meta name="csrf-token" content="{{ csrf_token() }}">
<div id="notificationWrapper" class="fixed top-4 right-4 flex flex-col gap-2 z-[9999]"></div>
<main class="flex-1 lg:ml-0 overflow-x-hidden">
    <div class="p-4 lg:p-8">
        <div class="mb-8 fade-in flex items-center justify-between">
            <!-- Judul -->
            <h2 class="text-2xl lg:text-3xl font-bold mb-2">
                Data Alumni
            </h2>

            <!-- Breadcrumb -->
            <nav class="text-sm text-gray-500" aria-label="Breadcrumb">
                <ol class="list-reset flex">
                    <li>
                        <span class="text-gray-700">Data Alumni</span>
                        {{-- <a href="/" class="text-orange-primary hover:underline">Dashboard</a> --}}
                    </li>
                    <li><span class="mx-2">/</span></li>
                    <li>
                        
                    </li>
                </ol>
            </nav>
        </div>

        <!-- Search Container -->
        <div class="floating-search rounded-2xl shadow-lg mb-8 p-6 fade-in" style="animation-delay: 0.1s;">
            <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i class="fas fa-search text-gray-400 text-lg"></i>
                </div>
                <input type="text" 
                        id="searchInputuser" 
                        class="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-primary/20 focus:border-blue-primary transition-all duration-300 text-base placeholder-gray-500" 
                        placeholder="Cari berdasarkan nama, atau email...">
            </div>
            <div class="mt-4 flex items-center justify-between">
                <span id="resultCount" class="text-sm text-gray-600 font-medium">
                    <i class="fas fa-info-circle mr-1"></i>
                    Menampilkan semua data
                </span>
            </div>
        </div>

        <!-- Table Container -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden fade-in" style="animation-delay: 0.3s;">
            <!-- Desktop Table -->
            <div class="hidden lg:block">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gradient-to-r gradient-bg to-blue-light text-white">
                            <tr>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider">
                                    <div class="flex items-center">
                                        No
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider">
                                    <div class="flex items-center">
                                        Nama
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider">
                                    <div class="flex items-center">
                                        Universitas
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider">
                                    <div class="flex items-center">
                                        Email
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider">
                                    <div class="flex items-center">
                                        Status
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider">
                                    <div class="flex items-center">
                                        Aksi
                                    </div>
                                </th>

                            </tr>
                        </thead>
                        <tbody id="tableBody" class="bg-white divide-y divide-gray-200">
                            
                        </tbody>
                    </table>
                    <!-- Pagination -->
                    <div id="pagination" class="flex justify-center space-x-2 p-4"></div>
                </div>
            </div>

            <!-- Mobile/Tablet Cards -->
            <div class="lg:hidden p-4" id="cardContainer">
                <!-- Sample Card -->
            </div>
            <div class="lg:hidden flex justify-center space-x-2 p-4" id="paginationMobile"></div>

        </div>
    </div>

    <div id="activeModal" class="fixed inset-0 z-50 hidden">
        <div class="modal-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div class="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-md">
                
                <!-- Header -->
                <div class="bg-green-500 px-6 py-4 rounded-t-2xl">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                            <i class="fas fa-user-check text-white text-lg"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white">Konfirmasi Aktif Kembali</h3>
                    </div>
                </div>

                <input type="hidden" id="activeUserId" name="id">

                <!-- Body -->
                <div class="p-6">
                    <div class="text-center mb-6">
                        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-user-check text-3xl text-green-500"></i>
                        </div>
                        <h4 class="text-lg font-semibold text-gray-900 mb-2">Aktifkan PBS</h4>
                        <p class="text-gray-600">
                            Apakah Anda yakin ingin mengaktifkan kembali
                            <span id="activeUserName" class="font-semibold text-gray-900"></span> sebagai PBS aktif?
                        </p>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                        <button type="button" 
                                id="cancelActiveBtn"
                                class="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 transition-all duration-300 font-medium">
                            <i class="fas fa-times mr-2"></i>Batal
                        </button>
                        <button type="button" 
                                id="confirmActiveBtn"
                                class="w-full sm:w-auto px-6 py-3 text-white bg-green-500 border border-green-500 rounded-xl hover:bg-green-600 focus:ring-4 focus:ring-green-200 transition-all duration-300 font-medium">
                            <i class="fas fa-check mr-2"></i>Konfirmasi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="detailMahasiswaModal" class="fixed inset-0 z-50 hidden">
        <div class="modal-overlay absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4">
            <div class="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
                
                <div class="bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-4 flex items-center justify-between shadow-lg">
                    <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden border-2 border-white">
                            <img id="detail_foto_profil" src="#" alt="{{ asset('img/default-avatar.jpg') }}" class="w-full h-full object-cover" loading="lazy">
                        </div>
                        <div>
                            <h3 id="detail_nama_mahasiswa" class="text-xl font-bold text-white leading-tight">Nama Mahasiswa</h3>
                            <p id="detail_nim" class="text-blue-100 text-sm">NIM: 123456789</p>
                        </div>
                    </div>
                    <button id="cancelMahasiswaBtn" class="text-white hover:bg-white/20 p-2 rounded-lg transition-all">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>

                <div class="flex border-b border-gray-200 bg-gray-50 overflow-x-auto scrollbar-hide">
                    <button data-tab="tab-biodata" class="tab-btn active-tab px-6 py-3 text-sm font-semibold transition-all flex items-center space-x-2 border-b-2">
                        <i class="fas fa-user"></i> <span>Biodata</span>
                    </button>
                    <button data-tab="tab-akademik" class="tab-btn px-6 py-3 text-sm font-semibold transition-all flex items-center space-x-2 border-b-2 border-transparent">
                        <i class="fas fa-graduation-cap"></i> <span>Akademik</span>
                    </button>
                    <button data-tab="tab-orangtua" class="tab-btn px-6 py-3 text-sm font-semibold transition-all flex items-center space-x-2 border-b-2 border-transparent">
                        <i class="fas fa-users"></i> <span>Orang Tua</span>
                    </button>
                    <button data-tab="tab-dokumen" class="tab-btn px-6 py-3 text-sm font-semibold transition-all flex items-center space-x-2 border-b-2 border-transparent">
                        <i class="fas fa-file-alt"></i> <span>Dokumen</span>
                    </button>
                </div>

                <div class="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
                    
                    <div id="tab-biodata" class="tab-content">
                        <h4 class="text-blue-primary font-bold mb-6 border-b pb-2 flex items-center">
                            <i class="fas fa-user-circle mr-2"></i> Data Pribadi
                        </h4>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            <div class="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                                <p class="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1 flex items-center">
                                    <i class="fas fa-venus-mars mr-2 text-blue-primary"></i> Jenis Kelamin
                                </p>
                                <p id="det_jk" class="text-gray-900 font-bold text-sm md:text-base leading-tight">-</p>
                            </div>

                            <div class="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                                <p class="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1 flex items-center">
                                    <i class="fas fa-praying-hands mr-2 text-blue-primary"></i> Agama
                                </p>
                                <p id="det_agama" class="text-gray-900 font-bold text-sm md:text-base leading-tight">-</p>
                            </div>

                            <div class="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                                <p class="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1 flex items-center">
                                    <i class="fas fa-calendar-alt mr-2 text-blue-primary"></i> Tanggal Lahir
                                </p>
                                <p id="det_tgllahir" class="text-gray-900 font-bold text-sm md:text-base leading-tight">-</p>
                            </div>

                            <div class="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                                <p class="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1 flex items-center">
                                    <i class="fas fa-envelope mr-2 text-blue-primary"></i> Email
                                </p>
                                <p id="det_email" class="text-gray-900 font-bold text-sm md:text-base break-all leading-tight">-</p>
                            </div>

                            <div class="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                                <p class="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1 flex items-center">
                                    <i class="fas fa-phone mr-2 text-blue-primary"></i> Telepon
                                </p>
                                <p id="det_telp" class="text-gray-900 font-bold text-sm md:text-base leading-tight">-</p>
                            </div>

                            <div class="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all md:col-span-3">
                                <p class="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1 flex items-center">
                                    <i class="fas fa-map-marker-alt mr-2 text-blue-primary"></i> Alamat Lengkap
                                </p>
                                <p id="det_alamat" class="text-gray-900 font-bold text-sm md:text-base leading-relaxed">-</p>
                            </div>
                        </div>
                    </div>

                    <div id="tab-akademik" class="tab-content hidden">
                        <h4 class="text-blue-primary font-bold mb-4 border-b pb-2">Informasi Kampus</h4>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="md:col-span-3 bg-gray-50 p-5 rounded-xl border border-gray-200 flex items-center">
                                <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm mr-4 border border-gray-100">
                                    <i class="fas fa-university text-gray-400 text-xl"></i>
                                </div>
                                <div>
                                    <p class="text-xs text-gray-500 font-bold uppercase mb-1 leading-none">Nama Universitas</p>
                                    <p id="det_universitas" class="text-lg font-bold text-gray-800 uppercase leading-tight">-</p>
                                </div>
                            </div>

                            <div class="bg-blue-50 p-4 rounded-xl text-center border border-blue-100 transition hover:shadow-md">
                                <p class="text-xs text-blue-600 font-bold uppercase mb-1">Semester</p>
                                <p id="det_semester" class="text-2xl font-black text-blue-800">1</p>
                            </div>

                            <div class="bg-orange-50 p-4 rounded-xl text-center border border-orange-100 transition hover:shadow-md">
                                <p class="text-xs text-orange-600 font-bold uppercase mb-1">IP Terakhir</p>
                                <p id="det_ipk" class="text-2xl font-black text-orange-800">0.00</p>
                            </div>

                            <div class="bg-green-50 p-4 rounded-xl text-center border border-green-100 transition hover:shadow-md">
                                <p class="text-xs text-green-600 font-bold uppercase mb-1">Status Beasiswa</p>
                                <p id="det_status" class="text-sm font-black text-green-800 uppercase">Verifikasi</p>
                            </div>
                        </div>
                    </div>

                    <div id="tab-orangtua" class="tab-content hidden">
                        <h4 class="text-blue-primary font-bold mb-4 border-b pb-2">Informasi Keluarga</h4>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="p-5 rounded-2xl border-2 border-blue-50 bg-white hover:border-blue-200 transition-all">
                                <div class="flex items-center mb-4 text-blue-700">
                                    <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <i class="fas fa-male text-lg"></i>
                                    </div>
                                    <h5 class="font-bold uppercase tracking-tight">Data Ayah</h5>
                                </div>
                                <div class="space-y-3">
                                    <div class="flex justify-between border-b border-gray-50 pb-2">
                                        <span class="text-xs text-gray-500 font-semibold uppercase">Nama</span>
                                        <span id="det_ayah_nama" class="text-sm font-bold text-gray-800">-</span>
                                    </div>
                                    <div class="flex justify-between border-b border-gray-50 pb-2">
                                        <span class="text-xs text-gray-500 font-semibold uppercase">Pekerjaan</span>
                                        <span id="det_ayah_kerja" class="text-sm font-bold text-gray-800">-</span>
                                    </div>
                                    <div class="flex justify-between border-b border-gray-50 pb-2">
                                        <span class="text-xs text-gray-500 font-semibold uppercase">Penghasilan</span>
                                        <span id="det_ayah_gaji" class="text-sm font-bold text-green-600">-</span>
                                    </div>
                                </div>
                            </div>

                            <div class="p-5 rounded-2xl border-2 border-pink-50 bg-white hover:border-pink-200 transition-all">
                                <div class="flex items-center mb-4 text-pink-700">
                                    <div class="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                                        <i class="fas fa-female text-lg"></i>
                                    </div>
                                    <h5 class="font-bold uppercase tracking-tight">Data Ibu</h5>
                                </div>
                                <div class="space-y-3">
                                    <div class="flex justify-between border-b border-gray-50 pb-2">
                                        <span class="text-xs text-gray-500 font-semibold uppercase">Nama</span>
                                        <span id="det_ibu_nama" class="text-sm font-bold text-gray-800">-</span>
                                    </div>
                                    <div class="flex justify-between border-b border-gray-50 pb-2">
                                        <span class="text-xs text-gray-500 font-semibold uppercase">Pekerjaan</span>
                                        <span id="det_ibu_kerja" class="text-sm font-bold text-gray-800">-</span>
                                    </div>
                                    <div class="flex justify-between border-b border-gray-50 pb-2">
                                        <span class="text-xs text-gray-500 font-semibold uppercase">Penghasilan</span>
                                        <span id="det_ibu_gaji" class="text-sm font-bold text-green-600">-</span>
                                    </div>
                                </div>
                            </div>

                            <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <div class="flex items-center p-3 bg-white rounded-lg shadow-sm">
                                    <i class="fas fa-phone-alt text-blue-500 mr-3"></i>
                                    <div>
                                        <p class="text-[10px] text-gray-400 uppercase font-bold">No. Telp Orang Tua</p>
                                        <p id="det_ortu_telp" class="text-sm font-bold text-gray-700">-</p>
                                    </div>
                                </div>
                                <div class="flex items-center p-3 bg-white rounded-lg shadow-sm">
                                    <i class="fas fa-users text-orange-500 mr-3"></i>
                                    <div>
                                        <p class="text-[10px] text-gray-400 uppercase font-bold">Jumlah Tanggungan</p>
                                        <p id="det_tanggungan" class="text-sm font-bold text-gray-700">-</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="tab-dokumen" class="tab-content hidden">
                        <h4 class="text-blue-primary font-bold mb-4 border-b pb-2">Berkas Mahasiswa</h4>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" id="document-list">
                            <a href="#" target="_blank" class="flex items-center p-3 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition group">
                                <div class="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-600 group-hover:text-white transition">
                                    <i class="fas fa-file-pdf"></i>
                                </div>
                                <span class="text-sm font-medium text-gray-700">KTP_Mahasiswa.pdf</span>
                            </a>
                            </div>
                    </div>

                </div>

                <div class="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t border-gray-200">
                    <button type="button" id="tutupDetailBtn" class="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 font-bold transition">
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    </div>

    <style>
        .active-tab {
            border-bottom-color: #1d4ed8; /* blue-700 */
            color: #1d4ed8;
        }
        .tab-btn:not(.active-tab) {
            color: #6b7280; /* gray-500 */
        }
        .tab-btn:hover {
            background-color: #f3f4f6;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
    </style>
    <script>
        window.defaultAvatar = "{{ asset('img/default-avatar.jpg') }}";
    </script>

</main>
@vite(['resources/css/user.css','resources/js/admin/alumniadmin.js'])

@endsection