@extends('layouts.admin')
@section('content')
@section('title', 'Data Pengajuandana')
<!-- Main Content -->
<meta name="csrf-token" content="{{ csrf_token() }}">
<div id="notificationWrapper" class="fixed top-4 right-4 flex flex-col gap-2 z-[9999]"></div>
<main class="flex-1 lg:ml-0 overflow-x-hidden">
    <div class="p-4 lg:p-8">
        <div class="mb-8 fade-in flex items-center justify-between">
            <!-- Judul -->
            <h2 class="text-2xl lg:text-3xl font-bold mb-2">
                Data Riwayat Pengajuan dana
            </h2>

            <!-- Breadcrumb -->
            <nav class="text-sm text-gray-500" aria-label="Breadcrumb">
                <ol class="list-reset flex">
                    <li>
                        <span class="text-gray-700">Data Riwayat Pengajuan dana</span>
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
                        id="searchInputriwayatpengajuandana" 
                        class="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-primary/20 focus:border-blue-primary transition-all duration-300 text-base placeholder-gray-500" 
                        placeholder="Cari berdasarkan semester...">
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
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider w-[30%]">
                                    <div class="flex items-center">
                                        Nama
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider w-[20%]">
                                    <div class="flex items-center">
                                        Universitas
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider w-[20%]">
                                    <div class="flex items-center">
                                        IP Semester
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider w-[20%]">
                                    <div class="flex items-center">
                                        Nominal
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider w-[20%]">
                                    <div class="flex items-center">
                                        Keterangan
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider w-[20%]">
                                    <div class="flex items-center">
                                        Status
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider w-[10%]">
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

<!-- Modal Tambah/Edit Karyawan -->
<div id="riwayatpengajuandanaModal" class="fixed inset-0 z-50 hidden">
    <div class="modal-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <!-- Header -->
            <div class="gradient-bg px-6 py-4 rounded-t-2xl">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                            <i id="modalIcon" class="fas fa-bars text-white text-lg"></i>
                        </div>
                        <h3 id="modalTitle" class="text-xl font-bold text-white">Tambah Pengajuandana Baru</h3>
                    </div>
                    <button id="closeModal" class="text-white hover:text-gray-200 p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>

            <!-- Body -->
            <form id="riwayatpengajuandanaForm" class="p-6 space-y-6">
                <input type="hidden" id="riwayatpengajuandanaId" name="id">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <label for="riwayatpengajuandanaSemester" class="block text-sm font-semibold text-gray-700">
                            <i class="fas fa-tag mr-2 text-blue-primary"></i>Semester
                        </label>
                        <input type="text" id="riwayatpengajuandanaSemester" name="riwayatpengajuandanaSemester" class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-900" placeholder="Semester" readonly>
                    </div>
                    <div class="space-y-2">
                        <label for="riwayatpengajuandanaIpsemester" class="block text-sm font-semibold text-gray-700">
                            <i class="fas fa-briefcase mr-2 text-blue-primary"></i>IP Semester
                        </label>
                        <input type="text" id="riwayatpengajuandanaIpsemester" name="riwayatpengajuandanaIpsemester" class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-900" placeholder="IP Semester" readonly>
                    </div>
                </div>
                <div class="space-y-2">
                    <label for="riwayatpengajuandanaPengajuandana" class="block text-sm font-semibold text-gray-700">
                        <i class="fas fa-id-card mr-2 text-blue-primary"></i>Pengajuan dana
                    </label>
                    <input type="text" id="riwayatpengajuandanaPengajuandana" name="riwayatpengajuandanaPengajuandana" class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-900" placeholder="Pengajuan dana" readonly>
                </div>
                <!-- Input Dinamis -->
                <div id="paketFields" class="grid grid-cols-1 md:grid-cols-2 gap-6 hidden">
                    <div class="space-y-2">
                        <label for="sppTetap" class="block text-sm font-semibold text-gray-700">
                            <i class="fas fa-money-bill-wave mr-2 text-blue-primary"></i>SPP Tetap
                        </label>
                        <input type="text" id="sppTetap" name="spp_tetap"
                            class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 text-gray-900 rupiah-input" readonly
                            placeholder="Masukkan nominal SPP Tetap">
                    </div>
                    <div class="space-y-2">
                        <label for="sppVariabel" class="block text-sm font-semibold text-gray-700">
                            <i class="fas fa-coins mr-2 text-blue-primary"></i>SPP Variabel
                        </label>
                        <input type="text" id="sppVariabel" name="spp_variabel"
                            class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 text-gray-900 rupiah-input" readonly
                            placeholder="Masukkan nominal SPP Variabel">
                    </div>
                    <div class="space-y-2 md:col-span-2">
                        <label for="praktikumPaket" class="block text-sm font-semibold text-gray-700">
                            <i class="fas fa-flask mr-2 text-blue-primary"></i>Praktikum
                        </label>
                        <input type="text" id="praktikumPaket" name="praktikumPaket"
                            class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 text-gray-900 rupiah-input" readonly
                            placeholder="Masukkan biaya Praktikum">
                    </div>
                    <div class="space-y-2 md:col-span-2">
                        <label for="totalPaket" class="block text-sm font-semibold text-gray-700">
                            <i class="fas fa-calculator mr-2 text-blue-primary"></i>Total
                        </label>
                        <input type="text" id="totalPaket" name="totalpaket" readonly
                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-gray-100 text-gray-700 rupiah-input">
                    </div>
                </div>

                <div id="sksFields" class="grid grid-cols-1 md:grid-cols-2 gap-6 hidden">
                    <div class="space-y-2">
                        <label for="jumlahSks" class="block text-sm font-semibold text-gray-700">
                            <i class="fas fa-list-ol mr-2 text-blue-primary"></i>Jumlah SKS
                        </label>
                        <input type="text" id="jumlahSks" name="jml_sks"
                            class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 text-gray-900" readonly
                            placeholder="Masukkan jumlah SKS">
                    </div>
                    <div class="space-y-2">
                        <label for="nominal" class="block text-sm font-semibold text-gray-700">
                            <i class="fas fa-dollar-sign mr-2 text-blue-primary"></i>Nominal
                        </label>
                        <input type="text" id="nominal" name="nominal"
                            class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 text-gray-900 rupiah-input" readonly
                            placeholder="Masukkan nominal">
                    </div>
                    <div class="space-y-2 md:col-span-2">
                        <label for="praktikumSks" class="block text-sm font-semibold text-gray-700">
                            <i class="fas fa-flask mr-2 text-blue-primary"></i>Praktikum
                        </label>
                        <input type="text" id="praktikumSks" name="praktikum"
                            class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 text-gray-900 rupiah-input" readonly
                            placeholder="Masukkan biaya Praktikum">
                    </div>
                    <div class="space-y-2 md:col-span-2">
                        <label for="totalSks" class="block text-sm font-semibold text-gray-700">
                            <i class="fas fa-calculator mr-2 text-blue-primary"></i>Total
                        </label>
                        <input type="text" id="totalSks" name="totalsks" readonly
                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-gray-100 text-gray-700 rupiah-input">
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
@vite(['resources/css/user.css','resources/js/admin/riwayatpengajuandana.js'])

@endsection