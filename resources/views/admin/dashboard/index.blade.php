
@extends('layouts.admin')
@section('content')
@section('title', 'Dashboard Admin SENSASI')
<!-- Main Content -->
@if ($userstatus == 'Aktif')
<meta name="csrf-token" content="{{ csrf_token() }}">
    <main class="flex-1 lg:ml-0 overflow-x-hidden">
    <div class="p-4 lg:p-8">
        <!-- Welcome Section -->
        <div class="gradient-bg rounded-xl p-6 mb-8 text-white fade-in">
            <h2 class="text-2xl lg:text-3xl font-bold mb-2">Selamat Datang {{ $rolename }} SENSASI</h2>
            <p class="text-white/90">Kelola semua konten dan informasi organisasi Anda dengan mudah</p>
        </div>
        @if ($userrole == 2)
            <div class="bg-white rounded-xl p-6 shadow-lg flex items-center justify-between">
                <div>
                    <h3 class="text-lg font-semibold text-gray-800">Status Pendaftaran</h3>
                    <p class="text-sm text-gray-500">Aktif / Nonaktif pendaftaran pengguna</p>
                </div>

                <!-- Switch Button -->
                <div id="pendaftaranSwitch" class="relative inline-block h-8 w-16 cursor-pointer">
                    <!-- Background -->
                    <span id="pendaftaranBg" class="absolute top-0 left-0 h-8 w-16 rounded-full transition-colors duration-300
                        {{ \App\Models\Pengaturan::getValue() ? 'bg-green-500' : 'bg-gray-300' }}">
                    </span>
                    <!-- Knob -->
                    <span id="pendaftaranKnob" class="absolute top-1 left-1 h-6 w-6 bg-white rounded-full shadow-md transition-transform duration-300
                        {{ \App\Models\Pengaturan::getValue() ? 'translate-x-8' : '' }}">
                    </span>
                </div>
            </div>
        @endif

        <!-- Stats Cards -->
        @php
            $role = auth()->user()->role;

            $roleCards = [

                1 => [
                    ['text' => 'Total Artikel', 'count' => $countkreative, 'bg' => 'bg-orange-100',
                        'icon' => '<i class="fas fa-newspaper text-orange-primary text-xl"></i>'],
                    ['text' => 'Total Alumni', 'count' => $countalumniall, 'bg' => 'bg-blue-100',
                        'icon' => '<i class="fas fa-users text-blue-primary text-xl"></i>'],
                    ['text' => 'Total Mitra', 'count' => $countmitra, 'bg' => 'bg-green-100',
                        'icon' => '<i class="fas fa-handshake text-green-600 text-xl"></i>'],
                    ['text' => 'Total Program', 'count' => $countprogram, 'bg' => 'bg-purple-100',
                        'icon' => '<i class="fas fa-layer-group text-purple-600 text-xl"></i>'],
                ],

                9 => [
                    ['text' => 'Total Artikel', 'count' => $countkreative, 'bg' => 'bg-orange-100',
                        'icon' => '<i class="fas fa-newspaper text-orange-primary text-xl"></i>'],
                    ['text' => 'Disetujui Pengajuan Dana', 'count' => $countpengajuandana, 'bg' => 'bg-blue-100',
                        'icon' => '<i class="fas fa-check-circle text-blue-primary text-xl"></i>'],
                    ['text' => 'Diproses Pengajuan Dana', 'count' => $countpengajuandanaproses, 'bg' => 'bg-green-100',
                        'icon' => '<i class="fas fa-clock text-green-600 text-xl"></i>'],
                    ['text' => 'Ditolak Pengajuan Dana', 'count' => $countpengajuandanaditolak, 'bg' => 'bg-red-100',
                        'icon' => '<i class="fas fa-times-circle text-red-600 text-xl"></i>'],
                ],

                18 => [
                    ['text' => 'Diproses Pengajuan Dana', 'count' => $countpengajuandanaproses, 'bg' => 'bg-green-100',
                        'icon' => '<i class="fas fa-clock text-green-600 text-xl"></i>'],
                    ['text' => 'Total PBS Aktif', 'count' => $countpbsaktif, 'bg' => 'bg-blue-100',
                        'icon' => '<i class="fas fa-user-check text-blue-primary text-xl"></i>'],
                    ['text' => 'Total Alumni', 'count' => $countalumniall, 'bg' => 'bg-orange-100',
                        'icon' => '<i class="fas fa-users text-orange-primary text-xl"></i>'],
                    ['text' => 'Total Pendaftar PBS', 'count' => $countpendaftarpbs, 'bg' => 'bg-purple-100',
                        'icon' => '<i class="fas fa-user-plus text-purple-600 text-xl"></i>'],
                ],

                19 => [
                    ['text' => 'Total PBS Aktif', 'count' => $countpbsaktif, 'bg' => 'bg-blue-100',
                        'icon' => '<i class="fas fa-user-check text-blue-primary text-xl"></i>'],
                    ['text' => 'Total Alumni', 'count' => $countalumniall, 'bg' => 'bg-orange-100',
                        'icon' => '<i class="fas fa-users text-orange-primary text-xl"></i>'],
                    ['text' => 'Diproses Pengajuan Dana', 'count' => $countpengajuandanaproses, 'bg' => 'bg-green-100',
                        'icon' => '<i class="fas fa-clock text-green-600 text-xl"></i>'],
                    ['text' => 'Disetujui Pengajuan Dana', 'count' => $countpengajuandana, 'bg' => 'bg-purple-100',
                        'icon' => '<i class="fas fa-check-circle text-purple-600 text-xl"></i>'],
                ],
            ];

            $cards = $roleCards[$role] ?? [];
        @endphp

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            @foreach($cards as $index => $card)
                <div class="bg-white rounded-xl p-6 shadow-lg card-hover fade-in"
                    style="animation-delay: {{ $index * 0.1 }}s;">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full {{ $card['bg'] }} mr-4 flex items-center justify-center">
                            {!! $card['icon'] !!}
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">{{ $card['text'] }}</p>
                            <p class="text-2xl font-bold text-gray-800">
                                {{ $card['count'] < 10 ? '0'.$card['count'] : $card['count'] }}
                            </p>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
        @if ($userrole == 9)
            <!-- Aksi Cepat -->
            <div class="bg-white rounded-xl p-6 shadow-lg mb-8 fade-in" style="animation-delay: 0.4s;">
                <h3 class="text-xl font-bold text-gray-800 mb-4">Aksi Cepat</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <button id="addSubpengajuandanaBtn" class="flex items-center p-4 border-2 border-dashed border-orange-200 rounded-lg hover:border-orange-primary hover:bg-orange-50 transition-all">
                        <div class="p-2 bg-orange-primary rounded-full mr-3">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                            </svg>
                        </div>
                        <span class="text-gray-700 font-medium">Tambah Nilai</span>
                    </button>

                    <button id="addSubartikelBtn" class="flex items-center p-4 border-2 border-dashed border-blue-200 rounded-lg hover:border-blue-primary hover:bg-blue-50 transition-all">
                        <div class="p-2 bg-blue-primary rounded-full mr-3">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                            </svg>
                        </div>
                        <span class="text-gray-700 font-medium">Upload Arikel</span>
                    </button>
                </div>
            </div>
        @endif

        <!-- Recent Activities -->
        {{-- <div class="bg-white rounded-xl p-6 shadow-lg fade-in" style="animation-delay: 0.5s;">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Aktivitas Terbaru</h3>
            <div class="space-y-4">
                <div class="flex items-center p-3 bg-orange-50 rounded-lg">
                    <div class="p-2 bg-orange-primary rounded-full mr-3">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                    </div>
                    <div class="flex-1">
                        <p class="text-sm text-gray-800">Program "Seminar Teknologi" berhasil ditambahkan</p>
                        <p class="text-xs text-gray-500">2 jam yang lalu</p>
                    </div>
                </div>

                <div class="flex items-center p-3 bg-blue-50 rounded-lg">
                    <div class="p-2 bg-blue-primary rounded-full mr-3">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                    </div>
                    <div class="flex-1">
                        <p class="text-sm text-gray-800">5 foto baru ditambahkan ke galeri</p>
                        <p class="text-xs text-gray-500">5 jam yang lalu</p>
                    </div>
                </div>

                <div class="flex items-center p-3 bg-green-50 rounded-lg">
                    <div class="p-2 bg-green-500 rounded-full mr-3">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                    </div>
                    <div class="flex-1">
                        <p class="text-sm text-gray-800">Data profil organisasi diperbarui</p>
                        <p class="text-xs text-gray-500">1 hari yang lalu</p>
                    </div>
                </div>
            </div>
        </div> --}}
    <div id="pengajuandanaModal" class="fixed inset-0 z-50 hidden">
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
                <form id="pengajuandanaForm" class="p-6 space-y-6">
                    <input type="hidden" id="pengajuandanaId" name="id">
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label for="pengajuandanaSemester" class="block text-sm font-semibold text-gray-700">
                                <i class="fas fa-tag mr-2 text-blue-primary"></i>Semester
                            </label>
                            <select id="pengajuandanaSemester" name="pengajuandanaSemester"
                                class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-500">
                                <option value="" disabled selected>Pilih Semester</option>
                                <option value="1">Semester 1</option>
                                <option value="2">Semester 2</option>
                                <option value="3">Semester 3</option>
                                <option value="4">Semester 4</option>
                                <option value="5">Semester 5</option>
                                <option value="6">Semester 6</option>
                                <option value="7">Semester 7</option>
                                <option value="8">Semester 8</option>
                            </select>
                        </div>
                        <div class="space-y-2">
                            <label for="pengajuandanaIpsemester" class="block text-sm font-semibold text-gray-700">
                                <i class="fas fa-briefcase mr-2 text-blue-primary"></i>IP Semester
                            </label>
                            <input type="text" id="pengajuandanaIpsemester" name="pengajuandanaIpsemester" class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-900" placeholder="IP Semester" readonly>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label for="pengajuandanaPengajuandana" class="block text-sm font-semibold text-gray-700">
                            <i class="fas fa-id-card mr-2 text-blue-primary"></i>Pengajuandana
                        </label>
                        <select id="pengajuandanaPengajuandana" name="pengajuandanaPengajuandana"
                                class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-500">
                                <option value="" disabled selected>Pilih Pengajuan Dana</option>
                                <option value="1">Paket</option>
                                <option value="2">SKS</option>
                            </select>
                    </div>
                    <!-- Input Dinamis -->
                    <div id="paketFields" class="grid grid-cols-1 md:grid-cols-2 gap-6 hidden">
                        <div class="space-y-2">
                            <label for="sppTetap" class="block text-sm font-semibold text-gray-700">
                                <i class="fas fa-money-bill-wave mr-2 text-blue-primary"></i>SPP Tetap
                            </label>
                            <input type="text" id="sppTetap" name="spp_tetap"
                                class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 text-gray-900 rupiah-input"
                                placeholder="Masukkan nominal SPP Tetap">
                        </div>
                        <div class="space-y-2">
                            <label for="sppVariabel" class="block text-sm font-semibold text-gray-700">
                                <i class="fas fa-coins mr-2 text-blue-primary"></i>SPP Variabel
                            </label>
                            <input type="text" id="sppVariabel" name="spp_variabel"
                                class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 text-gray-900 rupiah-input"
                                placeholder="Masukkan nominal SPP Variabel">
                        </div>
                        <div class="space-y-2 md:col-span-2">
                            <label for="praktikumPaket" class="block text-sm font-semibold text-gray-700">
                                <i class="fas fa-flask mr-2 text-blue-primary"></i>Praktikum
                            </label>
                            <input type="text" id="praktikumPaket" name="praktikumPaket"
                                class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 text-gray-900 rupiah-input"
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
                                class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 text-gray-900"
                                placeholder="Masukkan jumlah SKS">
                        </div>
                        <div class="space-y-2">
                            <label for="nominal" class="block text-sm font-semibold text-gray-700">
                                <i class="fas fa-dollar-sign mr-2 text-blue-primary"></i>Nominal
                            </label>
                            <input type="text" id="nominal" name="nominal"
                                class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 text-gray-900 rupiah-input"
                                placeholder="Masukkan nominal">
                        </div>
                        <div class="space-y-2 md:col-span-2">
                            <label for="praktikumSks" class="block text-sm font-semibold text-gray-700">
                                <i class="fas fa-flask mr-2 text-blue-primary"></i>Praktikum
                            </label>
                            <input type="text" id="praktikumSks" name="praktikum"
                                class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 text-gray-900 rupiah-input"
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

                    <!-- Footer Buttons -->
                    <div class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200">
                        <button type="button" id="cancelBtn" class="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 transition-all duration-300 font-medium">
                            <i class="fas fa-times mr-2"></i>Batal
                        </button>
                        <button type="submit" id="submitBtn" class="w-full sm:w-auto px-6 py-3 text-white bg-orange-primary border border-orange-primary rounded-xl hover:bg-orange-light focus:ring-4 focus:ring-orange-200 transition-all duration-300 font-medium">
                            <i id="submitIcon" class="fas fa-save mr-2"></i>
                            <span id="submitText">Simpan Data</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Modal Tambah/Edit Karyawan -->
    <div id="artikelModal" class="fixed inset-0 z-50 hidden">
    <div class="modal-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <!-- Header -->
            <div class="gradient-bg px-6 py-4 rounded-t-2xl">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                            <i id="modalIcon" class="fas fa-bars text-white text-lg"></i>
                        </div>
                        <h3 id="modalTitle" class="text-xl font-bold text-white">Tambah Artikel Baru</h3>
                    </div>
                    <button id="closeModal" class="text-white hover:text-gray-200 p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>

            <!-- Body -->
            <form id="artikelForm" class="p-6 space-y-6">
                <input type="hidden" id="artikelId" name="id">
                
                <div class="space-y-2">
                    <label for="artikelNama" class="block text-sm font-semibold text-gray-700">
                        <i class="fas fa-tag mr-2 text-blue-primary"></i>Nama
                    </label>
                    <input type="text" id="artikelNama" name="artikelNama" class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-900" placeholder="Masukkan nama">
                </div>
                <div class="space-y-2">
                    <label for="artikelDeskripsi" class="block text-sm font-semibold text-gray-700">
                        <i class="fas fa-align-left mr-2 text-blue-primary"></i>Deskripsi
                    </label>
                    <input type="text" id="artikelDeskripsi" name="artikelDeskripsi" class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-900" placeholder="Masukkan biodata" >
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <input type="hidden" id="oldPdf" name="oldPdf">
                        <label for="artikelPdf" class="block text-sm font-semibold text-gray-700">
                            <i class="fas fa-file-pdf mr-2 text-blue-primary"></i>Artikel
                        </label>

                        <!-- Dropzone -->
                        <div id="dropzone" class="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-primary transition" onclick="document.getElementById('artikelPdf').click()" ondragover="event.preventDefault(); this.classList.add('border-blue-primary', 'bg-blue-50')" ondragleave="this.classList.remove('border-blue-primary', 'bg-blue-50')" >
                            <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
                            <p class="text-gray-600 text-sm">Klik untuk pilih pdf atau drag & drop di sini</p>
                            <input type="file" id="artikelPdf" name="pdf" accept="application/pdf" class="hidden">
                        </div>
                    </div>
                    <div class="space-y-2">
                    <!-- Live preview -->
                        <div id="pdfPreviewContainer" class="mt-3 hidden">
                            <p class="text-gray-600 text-sm mb-2">Preview:</p>
                            <embed id="pdfPreview" type="application/pdf" width="300" height="400" class="rounded-lg shadow-md border mb-2" />
                            <button type="button" id="removePdf" class="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition">
                                Hapus Pdf
                            </button>
                        </div>
                    </div>
                    
                </div>

                <!-- Footer Buttons -->
                <div class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200">
                    <button type="button" id="cancelBtn" class="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 transition-all duration-300 font-medium">
                        <i class="fas fa-times mr-2"></i>Batal
                    </button>
                    <button type="submit" id="submitBtn" class="w-full sm:w-auto px-6 py-3 text-white bg-orange-primary border border-orange-primary rounded-xl hover:bg-orange-light focus:ring-4 focus:ring-orange-200 transition-all duration-300 font-medium">
                        <i id="submitIcon" class="fas fa-save mr-2"></i>
                        <span id="submitText">Simpan Data</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
    </div>
        @vite(['resources/js/admin/pengajuandana.js', 'resources/js/admin/artikel.js'])
    </div>
    </main>
@elseif (in_array($userstatus, ['Biodata', 'Potensi Akademik', 'Verifikasi']))
    @php
        $statusConfig = [
            'Biodata' => [
                'color' => 'blue',
                'icon' => 'fa-user-edit',
                'title' => 'Lengkapi Biodata',
                'desc'  => 'Kamu baru saja mendaftar. Silakan lengkapi biodata supaya bisa lanjut ke tahap berikutnya.',
                'btnText' => 'Isi Biodata',
                'btnLink' => route('admin.biodatamahasiswa.index'),
            ],
            'Potensi Akademik' => [
                'color' => 'indigo',
                'icon' => 'fa-pencil-alt',
                'title' => 'Lengkapi Potensi Akademik',
                'desc'  => 'Sebelum bisa diverifikasi admin, kamu perlu mengisi Potensi Akademik terlebih dahulu.',
                'btnText' => 'Isi Potensi Akademik',
                'btnLink' => route('admin.potensiakademik.index'),
            ],
            'Verifikasi' => [
                'color' => 'yellow',
                'icon' => 'fa-user-clock',
                'title' => 'Akun Sedang Diverifikasi',
                'desc'  => 'Data kamu sudah diterima dan sedang diperiksa oleh admin. Beberapa fitur akan sementara dinonaktifkan.',
                'btnText' => 'Kembali ke Dashboard',
                'btnLink' => route('admin.dashboard.index'),
            ],
            'Aktif' => [
                'color' => 'green',
                'icon' => 'fa-user-check',
                'title' => 'Akun Kamu Sudah Aktif',
                'desc'  => 'Selamat! Kamu sekarang bisa menggunakan semua fitur yang tersedia.',
                'btnText' => 'Kembali ke Dashboard',
                'btnLink' => route('admin.dashboard.index'),
            ],
        ];

        $config = $statusConfig[$userstatus] ?? [
            'color' => 'gray',
            'icon' => 'fa-exclamation-triangle',
            'title' => 'Status Tidak Diketahui',
            'desc'  => 'Mohon hubungi admin untuk informasi lebih lanjut.',
            'btnText' => 'Kembali',
            'btnLink' => route('dashboard'),
        ];
    @endphp

    <main class="flex-1 overflow-x-hidden">
        <div class="p-4 lg:p-8 flex items-center justify-center min-h-[80vh]">

            <div class="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center animate-fade-in">
                <!-- Animated Icon -->
                <div class="relative w-24 h-24 mx-auto mb-6">
                    <div class="absolute inset-0 rounded-full bg-{{ $config['color'] }}-200 animate-ping opacity-60"></div>
                    <div class="relative w-24 h-24 rounded-full bg-{{ $config['color'] }}-100 flex items-center justify-center">
                        <i class="fas {{ $config['icon'] }} text-{{ $config['color'] }}-600 text-4xl"></i>
                    </div>
                </div>

                <!-- Title -->
                <h2 class="text-2xl font-bold text-gray-800 mb-3">
                    {{ $config['title'] }}
                </h2>

                <!-- Description -->
                <p class="text-gray-600 leading-relaxed mb-6">
                    {{ $config['desc'] }}
                </p>

                @if(in_array($userstatus, ['Verifikasi', 'Aktif']))
                <!-- Status Badge -->
                <div class="mb-6">
                    <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold
                        bg-{{ $config['color'] }}-100 text-{{ $config['color'] }}-700">
                        <i class="fas fa-clock mr-2"></i>
                        {{ $userstatus == 'Verifikasi' ? 'Dalam Proses Verifikasi' : 'Akun Aktif' }}
                    </span>
                </div>
                @endif

                <!-- Action Button -->
                <div class="mt-8">
                    <a href="{{ $config['btnLink'] }}"
                    class="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl
                    bg-{{ $config['color'] }}-600 text-white font-semibold hover:bg-{{ $config['color'] }}-500 transition">
                        <i class="fas fa-arrow-right mr-2"></i>
                        {{ $config['btnText'] }}
                    </a>
                </div>
            </div>

        </div>
    </main>


@else
@endif
@endsection