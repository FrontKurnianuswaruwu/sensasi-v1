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
                Data Pengajuan dana
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
            <div class="mt-4 flex items-center justify-between">
                <span id="resultCount" class="text-sm text-gray-600 font-medium">
                    <i class="fas fa-info-circle mr-1"></i>
                    Menampilkan semua data
                </span>
            </div>
        </div>

        @if ($is_mahasiswa)
            <div id="addpengajuandana" class="mb-6 flex justify-start fade-in" style="animation-delay: 0.2s;">
                <button id="addSubpengajuandanaBtn" 
                    class="px-5 py-3 bg-blue-primary text-white rounded-xl hover:bg-blue-primary flex items-center space-x-2 transition-all duration-300 shadow-md">
                    <i class="fas fa-plus"></i>
                    <span>Tambah Pengajuan dana</span>
                </button>
            </div>
        @endif

        <!-- Table Container -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden fade-in" style="animation-delay: 0.3s;">
            <!-- Desktop Table -->
            <div class="hidden lg:block">
                <div class="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
                    <table class="min-w-full divide-y divide-gray-200">
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

<!-- Modal Tambah/Edit Karyawan -->
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

<!-- Modal Konfirmasi Hapus -->
<div id="deleteModal" class="fixed inset-0 z-50 hidden">
    <div class="modal-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <!-- Header -->
            <div class="bg-red-500 px-6 py-4 rounded-t-2xl">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                        <i class="fas fa-exclamation-triangle text-white text-lg"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white">Konfirmasi Hapus</h3>
                </div>
            </div>
            <input type="hidden" id="deletepengajuandanaId" name="id">

            <!-- Body -->
            <div class="p-6">
                <div class="text-center mb-6">
                    <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-trash-alt text-3xl text-red-500"></i>
                    </div>
                    <h4 class="text-lg font-semibold text-gray-900 mb-2">Apakah Anda yakin?</h4>
                    <p class="text-gray-600">Data Pengajuandana <span id="deletePengajuandanaName" class="font-semibold text-gray-900"></span> akan dihapus secara permanen dan tidak dapat dikembalikan.</p>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <button type="button" 
                            id="cancelDeleteBtn"
                            class="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 transition-all duration-300 font-medium">
                        <i class="fas fa-times mr-2"></i>Batal
                    </button>
                    <button type="button" 
                            id="confirmDeleteBtn"
                            class="w-full sm:w-auto px-6 py-3 text-white bg-red-500 border border-red-500 rounded-xl hover:bg-red-600 focus:ring-4 focus:ring-red-200 transition-all duration-300 font-medium">
                        <i class="fas fa-trash mr-2"></i>Ya, Hapus
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="approveModal" class="fixed inset-0 z-50 hidden">
    <div class="modal-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <!-- Header -->
            <div class="bg-green-500 px-6 py-4 rounded-t-2xl">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                        <i class="fas fa-check text-white text-lg"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white">Konfirmasi Persetujuan</h3>
                </div>
            </div>
            <input type="hidden" id="approvepengajuandanaId" name="id">

            <!-- Body -->
            <div class="p-6">
                <div class="text-center mb-6">
                    <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-hand-holding-usd text-3xl text-green-500"></i>
                    </div>
                    <h4 class="text-lg font-semibold text-gray-900 mb-2">Setujui Pengajuan Dana</h4>
                    <p class="text-gray-600">Pengajuan Dana <span id="approvePengajuandanaName" class="font-semibold text-gray-900"></span></p>
                </div>

                <!-- Input Dana Disetujui -->
                <div class="space-y-4 mb-4">
                    <div>
                        <label for="approveDanaDisetujui" class="block text-sm font-semibold text-gray-700">
                            <i class="fas fa-dollar-sign mr-2 text-green-500"></i>Dana Disetujui
                        </label>
                        <input type="text" id="approveDanaDisetujui" name="approved_amount"
                               class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl rupiah-input focus:border-green-500 focus:ring-0 transition-all duration-300 text-gray-900"
                               placeholder="Masukkan nominal yang disetujui">
                    </div>

                    <div>
                        <label for="approveCatatan" class="block text-sm font-semibold text-gray-700">
                            <i class="fas fa-sticky-note mr-2 text-green-500"></i>Catatan Persetujuan (opsional)
                        </label>
                        <textarea id="approveCatatan" name="approval_note" rows="3"
                                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 transition-all duration-300 text-gray-900"
                                  placeholder="Tambahkan catatan atau alasan persetujuan"></textarea>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <button type="button" 
                            id="cancelDeleteBtnApprove"
                            class="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 transition-all duration-300 font-medium">
                        <i class="fas fa-times mr-2"></i>Batal
                    </button>
                    <button type="button" 
                            id="confirApproveBtn"
                            class="w-full sm:w-auto px-6 py-3 text-white bg-green-500 border border-green-500 rounded-xl hover:bg-green-600 focus:ring-4 focus:ring-green-200 transition-all duration-300 font-medium">
                        <i class="fas fa-check mr-2"></i>Setujui
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="rejectModal" class="fixed inset-0 z-50 hidden">
    <div class="modal-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <!-- Header -->
            <div class="bg-red-500 px-6 py-4 rounded-t-2xl">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                        <i class="fas fa-times text-white text-lg"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white">Konfirmasi Penolakan</h3>
                </div>
            </div>
            <input type="hidden" id="rejectpengajuandanaId" name="id">

            <!-- Body -->
            <div class="p-6">
                <div class="text-center mb-6">
                    <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-ban text-3xl text-red-500"></i>
                    </div>
                    <h4 class="text-lg font-semibold text-gray-900 mb-2">Tolak Pengajuan Dana</h4>
                    <p class="text-gray-600">Pengajuan Dana <span id="rejectPengajuandanaName" class="font-semibold text-gray-900"></span></p>
                </div>

                <!-- Input Catatan Penolakan -->
                <div class="space-y-4 mb-4">
                    <div>
                        <label for="rejectCatatan" class="block text-sm font-semibold text-gray-700">
                            <i class="fas fa-sticky-note mr-2 text-red-500"></i>Catatan Penolakan (opsional)
                        </label>
                        <textarea id="rejectCatatan" name="rejection_note" rows="3"
                                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-0 transition-all duration-300 text-gray-900"
                                  placeholder="Tambahkan catatan atau alasan penolakan"></textarea>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <button type="button" 
                            id="cancelRejectBtn"
                            class="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 transition-all duration-300 font-medium">
                        <i class="fas fa-times mr-2"></i>Batal
                    </button>
                    <button type="button" 
                            id="confirmRejectBtn"
                            class="w-full sm:w-auto px-6 py-3 text-white bg-red-500 border border-red-500 rounded-xl hover:bg-red-600 focus:ring-4 focus:ring-red-200 transition-all duration-300 font-medium">
                        <i class="fas fa-ban mr-2"></i>Tolak
                    </button>
                </div>
            </div>
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
@vite(['resources/css/user.css','resources/js/admin/pengajuandana.js'])

@endsection