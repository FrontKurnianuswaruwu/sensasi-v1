@extends('layouts.admin')
@section('content')
@section('title', 'Potensi Akademik')
<!-- Main Content -->
<meta name="csrf-token" content="{{ csrf_token() }}">
<div id="notificationWrapper" class="fixed top-4 right-4 flex flex-col gap-2 z-[9999]"></div>
<main class="flex-1 lg:ml-0 overflow-x-hidden">
    <div class="p-4 lg:p-8">
        <div class="mb-8 fade-in flex items-center justify-between">
            <!-- Judul -->
            <h2 class="text-2xl lg:text-3xl font-bold mb-2">
                Potensi Akademik
            </h2>

            <!-- Breadcrumb -->
            <nav class="text-sm text-gray-500" aria-label="Breadcrumb">
                <ol class="list-reset flex">
                    <li>
                        <span class="text-gray-700">Potensi Akademik</span>
                    </li>
                    <li><span class="mx-2">/</span></li>
                    <li>
                        
                    </li>
                </ol>
            </nav>
        </div>
        <div class="mb-4 p-4 bg-orange-100 border-l-4 border-orange-500 text-orange-800 rounded-lg flex items-center shadow-sm fade-in" style="animation-delay: 0s;">
            <i class="fas fa-exclamation-circle mr-3 text-lg"></i>
            <span class="font-medium">Kerjakan dengan fokus dan maksimal! Pastikan jawabanmu tepat dan lengkap.</span>
        </div>
        <div class="floating-info rounded-2xl shadow-lg mb-8 p-6 fade-in" style="animation-delay: 0.1s;">
            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-info-circle text-blue-primary mr-2"></i>
                Papan Informasi
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-5 gap-4">

                <!-- Jumlah Soal -->
                <div class="flex items-center p-4 bg-purple-50 border border-purple-200 rounded-xl">
                    <div class="w-12 h-12 flex items-center justify-center bg-purple-500 text-white rounded-full">
                        <i class="fas fa-list-ol text-lg"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm text-gray-600">Jumlah Soal</p>
                        <p class="text-xl font-bold text-gray-800">
                            {{ $totalsoal ?? 0 }}
                        </p>
                    </div>
                </div>

                <!-- Jawaban Benar -->
                <div class="flex items-center p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div class="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-full">
                        <i class="fas fa-check text-lg"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm text-gray-600">Jawaban Benar</p>
                        <p class="text-xl font-bold text-gray-800" id="jawabanBenar">
                            {{ $hasilujian->jumlah_benar ?? 0 }}
                        </p>
                    </div>
                </div>

                <!-- Jawaban Salah -->
                <div class="flex items-center p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div class="w-12 h-12 flex items-center justify-center bg-red-500 text-white rounded-full">
                        <i class="fas fa-times text-lg"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm text-gray-600">Jawaban Salah</p>
                        <p class="text-xl font-bold text-gray-800" id="jawabanSalah">
                            {{ $hasilujian->jumlah_salah ?? 0 }}
                        </p>
                    </div>
                </div>

                <!-- Kategori -->
                <div class="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div class="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full">
                        <i class="fas fa-tags text-lg"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm text-gray-600">Kategori</p>
                        <p class="text-base font-semibold text-gray-800" id="kategoriSoal">
                            {{ $hasilujian->kategoriSoal->name ?? 'Belum Mengikuti Ujian' }}
                        </p>
                    </div>
                </div>

                <!-- Tanggal Pengerjaan -->
                <div class="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <div class="w-12 h-12 flex items-center justify-center bg-yellow-500 text-white rounded-full">
                        <i class="fas fa-calendar-alt text-lg"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm text-gray-600">Tanggal Pengerjaan</p>
                        <p class="text-sm font-semibold text-gray-800">
                            {{ $hasilujian?->tanggal 
                                ? \Carbon\Carbon::parse($hasilujian->tanggal)->format('d M Y H:i')
                                : '-' 
                            }}
                        </p>
                    </div>
                </div>

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
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider  w-[10%]">
                                    <div class="flex items-center">
                                        No
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider  w-[40%]">
                                    <div class="flex items-center">
                                        Nama
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider  w-[20%]">
                                    <div class="flex items-center">
                                        Waktu Pengerjaan
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider  w-[15%]">
                                    <div class="flex items-center">
                                        Status
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider  w-[20%]">
                                    <div class="flex items-center">
                                        Aksi
                                    </div>
                                </th>

                            </tr>
                        </thead>
                        <tbody id="tableKategorisoal" class="bg-white divide-gray-200">
                            
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

<!-- Modal Tambah/Edit Kategorisoal -->
<div id="kategorisoalModal" class="fixed inset-0 z-50 hidden">
    <div class="modal-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto">
            <!-- Header -->
            <div class="gradient-bg px-6 py-4 rounded-t-2xl">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                            <i id="modalIcon" class="fas fa-calendar-days text-white text-lg"></i>
                        </div>
                        <h3 id="modalTitle" class="text-xl font-bold text-white">Tambah Tahun Akademik Baru</h3>
                    </div>
                    <button id="closeModal" class="text-white hover:text-gray-200 p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>

            <!-- Body -->
            <form id="kategorisoalForm" class="p-6 space-y-6">
                <div class="space-y-2">
                    <input type="hidden" id="kategorisoalId" name="id">
                    <label for="kategorisoalName" class="block text-sm font-semibold text-gray-700">
                        <i class="fas fa-calendar-days mr-2 text-blue-primary"></i>Kategori Soal
                    </label>
                    <input type="text" 
                            id="kategorisoalName" 
                            name="name"
                            class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-900"
                            placeholder="Masukkan kategori soal..."
                            >
                </div>
                <div class="space-y-2">
                    <input type="hidden" id="kategorisoalId" name="id">
                    <label for="kategorisoalWaktu" class="block text-sm font-semibold text-gray-700">
                        <i class="fas fa-clock mr-2 text-blue-primary"></i>Waktu Pengerjaan
                    </label>
                    <input type="number" 
                            id="kategorisoalWaktu" 
                            name="name"
                            class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-900"
                            placeholder="Masukkan waktu pengerjaan..."
                            >
                </div>
                <div class="space-y-2">
                    <label for="kategorisoalStatus" class="block text-sm font-semibold text-gray-700">
                        <i class="fas fa-building mr-2 text-blue-primary"></i>Status
                    </label>
                    <select id="kategorisoalStatus" name="is_active" class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-900 bg-white">
                        <option value="1">Aktif</option>
                        <option value="0">Tidak Aktif</option>
                    </select>
                </div>

                <!-- Footer Buttons -->
                <div class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200">
                    <button type="button" 
                            id="cancelBtn"
                            class="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 transition-all duration-300 font-medium">
                        <i class="fas fa-times mr-2"></i>Batal
                    </button>
                    <button type="submit" 
                            id="submitBtn"
                            class="w-full sm:w-auto px-6 py-3 text-white bg-orange-primary border border-orange-primary rounded-xl hover:bg-orange-light focus:ring-4 focus:ring-orange-200 transition-all duration-300 font-medium">
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
                <input type="hidden" id="deletekategorisoalId" name="id">

                <!-- Body -->
                <div class="p-6">
                    <div class="text-center mb-6">
                        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-trash-alt text-3xl text-red-500"></i>
                        </div>
                        <h4 class="text-lg font-semibold text-gray-900 mb-2">Apakah Anda yakin?</h4>
                        <p class="text-gray-600">Potensi Akademik <span id="deleteKategorisoalWaktu" class="font-semibold text-gray-900"></span> akan dihapus secara permanen dan tidak dapat dikembalikan.</p>
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
<script>
    const CURRENT_USER_ID = {{ auth()->id() }};
    const CURRENT_USER_ROLE = {{ auth()->user()->role }};
</script>

@vite(['resources/css/user.css','resources/js/admin/kategoripotensiakademik.js'])
@endsection