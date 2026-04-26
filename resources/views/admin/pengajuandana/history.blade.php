@extends('layouts.admin')
@section('content')
@section('title', 'Data Pengajuandana')
<!-- Main Content -->
<meta name="csrf-token" content="{{ csrf_token() }}">
<div id="notificationWrapper" class="fixed top-4 right-4 flex flex-col gap-2 z-[9999]"></div>
<main class="flex-1 lg:ml-0">
    <div class="p-4 lg:p-8">
        <div class="mb-8 fade-in flex items-center justify-between">
            <!-- Judul -->
            <h2 class="text-2xl lg:text-3xl font-bold mb-2">
                History Pengajuan dana
            </h2>

            <!-- Breadcrumb -->
            <nav class="text-sm text-gray-500" aria-label="Breadcrumb">
                <ol class="list-reset flex">
                    <li>
                        <span class="text-gray-700">Data Pengajuan dana</span>
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
                        id="searchInputpengajuandana" 
                        class="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-primary/20 focus:border-blue-primary transition-all duration-300 text-base placeholder-gray-500" 
                        placeholder="Cari berdasarkan semester...">
            </div>
            <div class="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span id="resultCount" class="text-sm text-gray-600 font-medium order-2 sm:order-1">
                    <i class="fas fa-info-circle mr-1"></i>
                    Menampilkan semua data
                </span>
                @if (!$is_mahasiswa)
                    <a href="{{ route('admin.pengajuandana.exportapproved') }}" 
                        class="order-1 sm:order-2 w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md active:scale-95">
                        <i class="fas fa-file-excel"></i>
                        <span>Download Excel</span>
                    </a>
                @endif
            </div>
        </div>        

        <!-- Table Container -->
        <div class="bg-white rounded-2xl shadow-lg fade-in" style="animation-delay: 0.3s;">
            <!-- Desktop Table -->
            <div class="hidden lg:block">
                <div class="overflow-x-auto border border-gray-200 rounded-xl shadow-sm"">
                    <table class="min-w-max w-full divide-gray-200">
                        <thead class="bg-gradient-to-r gradient-bg to-blue-light text-white">
                            <tr>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider whitespace-nowrap">
                                    <div class="flex items-center">
                                        No
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider whitespace-nowrap">
                                    <div class="flex items-center">
                                        Nama
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider whitespace-nowrap">
                                    <div class="flex items-center">
                                        Universitas
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider whitespace-nowrap">
                                    <div class="flex items-center">
                                        Semester
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider whitespace-nowrap">
                                    <div class="flex items-center">
                                        IP Semester
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider whitespace-nowrap">
                                    <div class="flex items-center">
                                        Nominal
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider whitespace-nowrap">
                                    <div class="flex items-center">
                                        Nominal Disetujui
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider whitespace-nowrap">
                                    <div class="flex items-center">
                                        Keterangan
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider whitespace-nowrap">
                                    <div class="flex items-center">
                                        Status
                                    </div>
                                </th>
                                <th id="thAksi" class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider whitespace-nowrap">
                                    <div class="flex items-center">
                                        Aksi
                                    </div>
                                </th>

                            </tr>
                        </thead>
                        <tbody id="tablePengajuandana" class="bg-white divide-y divide-gray-200">
                            
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
</div>

<div id="detailpengajuandanaModal" class="fixed inset-0 z-50 hidden">
    <div class="modal-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        
        <div class="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

            <!-- HEADER -->
            <div class="gradient-bg px-6 py-4 rounded-t-2xl">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                            <i class="fas fa-eye text-white text-lg"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white">Detail Pengajuan Dana</h3>
                    </div>
                    <button id="closeModal" class="text-white hover:text-gray-200">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>

            <!-- BODY -->
            <div class="p-6 space-y-6">

                <!-- INFORMASI UMUM -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div class="p-4 rounded-xl bg-gray-50 border hover:bg-white hover:shadow-md transition">
                        <p class="text-[10px] text-gray-400 uppercase font-black mb-1">Semester</p>
                        <p id="det_semester" class="font-bold text-gray-900">-</p>
                    </div>

                    <div class="p-4 rounded-xl bg-gray-50 border hover:bg-white hover:shadow-md transition">
                        <p class="text-[10px] text-gray-400 uppercase font-black mb-1">IP Semester</p>
                        <p id="det_ip" class="font-bold text-gray-900">-</p>
                    </div>

                    <div class="p-4 rounded-xl bg-gray-50 border hover:bg-white hover:shadow-md transition">
                        <p class="text-[10px] text-gray-400 uppercase font-black mb-1">Jenis</p>
                        <p id="det_tipe" class="font-bold text-gray-900">-</p>
                    </div>

                </div>

                <!-- ================= DETAIL PAKET ================= -->
                <div id="detailPaket" class="hidden space-y-4">

                    <h4 class="font-bold text-blue-primary border-b pb-2">Detail Paket</h4>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div class="p-4 rounded-xl bg-gray-50 border">
                            <p class="text-[10px] text-gray-400 uppercase font-black mb-1">SPP Tetap</p>
                            <p id="det_spp_tetap" class="font-bold text-gray-900">-</p>
                        </div>

                        <div class="p-4 rounded-xl bg-gray-50 border">
                            <p class="text-[10px] text-gray-400 uppercase font-black mb-1">SPP Variabel</p>
                            <p id="det_spp_variabel" class="font-bold text-gray-900">-</p>
                        </div>

                        <div class="p-4 rounded-xl bg-gray-50 border md:col-span-2">
                            <p class="text-[10px] text-gray-400 uppercase font-black mb-1">Praktikum</p>
                            <p id="det_praktikum_paket" class="font-bold text-gray-900">-</p>
                        </div>

                        <div class="p-4 rounded-xl bg-blue-50 border border-blue-200 md:col-span-2">
                            <p class="text-[10px] text-blue-500 uppercase font-black mb-1">Total</p>
                            <p id="det_total_paket" class="font-extrabold text-lg text-blue-700">-</p>
                        </div>

                    </div>
                </div>

                <!-- ================= DETAIL SKS ================= -->
                <div id="detailSks" class="hidden space-y-4">

                    <h4 class="font-bold text-blue-primary border-b pb-2">Detail SKS</h4>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div class="p-4 rounded-xl bg-gray-50 border">
                            <p class="text-[10px] text-gray-400 uppercase font-black mb-1">Jumlah SKS</p>
                            <p id="det_jml_sks" class="font-bold text-gray-900">-</p>
                        </div>

                        <div class="p-4 rounded-xl bg-gray-50 border">
                            <p class="text-[10px] text-gray-400 uppercase font-black mb-1">Nominal / SKS</p>
                            <p id="det_nominal" class="font-bold text-gray-900">-</p>
                        </div>

                        <div class="p-4 rounded-xl bg-gray-50 border md:col-span-2">
                            <p class="text-[10px] text-gray-400 uppercase font-black mb-1">Praktikum</p>
                            <p id="det_praktikum_sks" class="font-bold text-gray-900">-</p>
                        </div>

                        <div class="p-4 rounded-xl bg-blue-50 border border-blue-200 md:col-span-2">
                            <p class="text-[10px] text-blue-500 uppercase font-black mb-1">Total</p>
                            <p id="det_total_sks" class="font-extrabold text-lg text-blue-700">-</p>
                        </div>

                    </div>
                </div>

                <!-- FOOTER -->
                <div class="flex justify-end pt-6 border-t">
                    <button type="button" id="tutupDetailBtn"
                        class="px-6 py-3 bg-gray-100 border rounded-xl hover:bg-gray-200 transition font-medium">
                        Tutup
                    </button>
                </div>

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
@vite(['resources/css/user.css','resources/js/admin/historypengajuandana.js'])

@endsection