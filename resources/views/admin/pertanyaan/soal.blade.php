@extends('layouts.admin')
@section('content')
@section('title', 'Data Soal - ' . $namekategori)
<meta name="csrf-token" content="{{ csrf_token() }}">
<div id="notificationWrapper" class="fixed top-4 right-4 flex flex-col gap-2 z-[9999]"></div>

<main class="flex-1 lg:ml-0 overflow-x-hidden">
    <div class="p-4 lg:p-8">

        <!-- Header -->
        <div class="mb-8 fade-in flex items-center justify-between">
            <div>
                <h2 class="text-2xl lg:text-3xl font-bold mb-1">Data Soal</h2>
                <p class="text-sm text-gray-500">Kategori: <span class="font-semibold text-blue-600">{{ $namekategori }}</span></p>
            </div>
            <nav class="text-sm text-gray-500" aria-label="Breadcrumb">
                <ol class="list-reset flex">
                    <li><a href="/admin/pertanyaan" class="text-blue-500 hover:underline">Kategori Soal</a></li>
                    <li><span class="mx-2">/</span></li>
                    <li><span class="text-gray-700">{{ $namekategori }}</span></li>
                </ol>
            </nav>
        </div>

        <!-- Search & Add -->
        <div class="floating-search rounded-2xl shadow-lg mb-8 p-6 fade-in" style="animation-delay: 0.1s;">
            <div class="flex flex-col sm:flex-row gap-4">
                <div class="relative flex-1">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <i class="fas fa-search text-gray-400 text-lg"></i>
                    </div>
                    <input type="text"
                           id="searchInputsoal"
                           class="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-primary/20 focus:border-blue-primary transition-all duration-300 text-base placeholder-gray-500"
                           placeholder="Cari soal...">
                </div>
                <button id="bulkDeleteBtn"
                        class="px-6 py-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 font-semibold flex items-center gap-2 whitespace-nowrap hidden">
                    <i class="fas fa-trash"></i> Hapus Terpilih (<span id="selectedCount">0</span>)
                </button>
                <button id="addSoalBtn"
                        class="px-6 py-4 bg-orange-primary text-white rounded-xl hover:bg-orange-light transition-all duration-300 font-semibold flex items-center gap-2 whitespace-nowrap">
                    <i class="fas fa-plus"></i> Tambah Soal
                </button>
            </div>
            <div class="mt-4">
                <span id="resultCount" class="text-sm text-gray-600 font-medium">
                    <i class="fas fa-info-circle mr-1"></i>Menampilkan semua data
                </span>
            </div>
        </div>

        <!-- Hidden: idkategori untuk JS -->
        <input type="hidden" id="kategori_id" value="{{ $idkategori }}">

        <!-- Table Desktop -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden fade-in" style="animation-delay: 0.3s;">
            <div class="hidden lg:block">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gradient-to-r gradient-bg to-blue-light text-white">
                            <tr>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider w-[5%]">
                                    <input type="checkbox" id="checkAll" class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer">
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider w-[5%]">No</th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider w-[60%]">Pertanyaan</th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider w-[10%]">Opsi</th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider w-[20%]">Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="tableSoal" class="bg-white divide-gray-200"></tbody>
                    </table>
                    <div id="pagination" class="flex justify-center space-x-2 p-4"></div>
                </div>
            </div>

            <!-- Mobile Cards -->
            <div class="lg:hidden p-4" id="cardContainer"></div>
            <div class="lg:hidden flex justify-center space-x-2 p-4" id="paginationMobile"></div>
        </div>
    </div>
</main>

<!-- ===== MODAL TAMBAH / EDIT SOAL + PILIHAN ===== -->
<div id="soalModal" class="fixed inset-0 z-50 hidden">
    <div class="modal-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            <!-- Header -->
            <div class="gradient-bg px-6 py-4 rounded-t-2xl sticky top-0 z-10">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                            <i id="modalIcon" class="fas fa-question-circle text-white text-lg"></i>
                        </div>
                        <h3 id="modalTitle" class="text-xl font-bold text-white">Tambah Soal Baru</h3>
                    </div>
                    <button id="closeModal" class="text-white hover:text-gray-200 p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>

            <!-- Body -->
            <form id="soalForm" class="p-6 space-y-6">
                <input type="hidden" id="soalId">

                <!-- Pertanyaan -->
                <div class="space-y-2">
                    <label for="teksSoal" class="block text-sm font-semibold text-gray-700">
                        <i class="fas fa-question mr-2 text-blue-primary"></i>Pertanyaan Soal
                        <span class="text-red-500">*</span>
                    </label>
                    <textarea id="teksSoal"
                              rows="3"
                              class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-900 resize-none"
                              placeholder="Masukkan pertanyaan soal di sini..."></textarea>
                </div>

                <!-- Pilihan Jawaban -->
                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <label class="block text-sm font-semibold text-gray-700">
                            <i class="fas fa-list-ul mr-2 text-blue-primary"></i>Opsi Jawaban
                            <span class="text-red-500">*</span>
                            <span class="ml-1 text-xs font-normal text-gray-400">(min. 2 opsi, tandai yang benar)</span>
                        </label>
                        <button type="button" id="addPilihanBtn"
                                class="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-all flex items-center gap-1">
                            <i class="fas fa-plus text-xs"></i> Tambah Opsi
                        </button>
                    </div>

                    <!-- Legend -->
                    <div class="flex items-center gap-4 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                        <span class="flex items-center gap-1.5">
                            <span class="w-5 h-5 rounded-md bg-green-500 inline-flex items-center justify-center">
                                <i class="fas fa-check text-white" style="font-size:9px"></i>
                            </span>
                            Jawaban Benar
                        </span>
                        <span class="flex items-center gap-1.5">
                            <span class="w-5 h-5 rounded-md bg-gray-200 inline-flex items-center justify-center">
                                <i class="fas fa-times text-gray-400" style="font-size:9px"></i>
                            </span>
                            Jawaban Salah
                        </span>
                        <span class="text-gray-400">— klik tombol untuk toggle</span>
                    </div>

                    <div id="pilihanContainer" class="space-y-2">
                        <!-- Baris opsi dirender oleh JS -->
                    </div>

                    <p id="pilihanError" class="text-red-500 text-xs hidden">
                        <i class="fas fa-exclamation-circle mr-1"></i>
                        <span id="pilihanErrorMsg"></span>
                    </p>
                </div>

                <!-- Footer -->
                <div class="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
                    <button type="button" id="cancelBtn"
                            class="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium">
                        <i class="fas fa-times mr-2"></i>Batal
                    </button>
                    <button type="submit" id="submitBtn"
                            class="w-full sm:w-auto px-6 py-3 text-white bg-orange-primary border border-orange-primary rounded-xl hover:bg-orange-light transition-all duration-300 font-medium">
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
            <div class="bg-red-500 px-6 py-4 rounded-t-2xl">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                        <i class="fas fa-exclamation-triangle text-white text-lg"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white">Konfirmasi Hapus</h3>
                </div>
            </div>
            <input type="hidden" id="deleteSoalId">
            <div class="p-6">
                <div class="text-center mb-6">
                    <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-trash-alt text-3xl text-red-500"></i>
                    </div>
                    <h4 class="text-lg font-semibold text-gray-900 mb-2">Apakah Anda yakin?</h4>
                    <p class="text-gray-600">Soal beserta semua opsi jawaban akan dihapus permanen.</p>
                </div>
                <div class="flex flex-col sm:flex-row justify-center gap-3">
                    <button type="button" id="cancelDeleteBtn"
                            class="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium">
                        <i class="fas fa-times mr-2"></i>Batal
                    </button>
                    <button type="button" id="confirmDeleteBtn"
                            class="w-full sm:w-auto px-6 py-3 text-white bg-red-500 border border-red-500 rounded-xl hover:bg-red-600 transition-all duration-300 font-medium">
                        <i class="fas fa-trash mr-2"></i>Ya, Hapus
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Konfirmasi Bulk Delete -->
<div id="bulkDeleteModal" class="fixed inset-0 z-50 hidden">
    <div class="modal-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div class="bg-red-500 px-6 py-4 rounded-t-2xl">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                        <i class="fas fa-exclamation-triangle text-white text-lg"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white">Konfirmasi Hapus Massal</h3>
                </div>
            </div>
            <div class="p-6">
                <div class="text-center mb-6">
                    <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-trash-alt text-3xl text-red-500"></i>
                    </div>
                    <h4 class="text-lg font-semibold text-gray-900 mb-2">Apakah Anda yakin?</h4>
                    <p class="text-gray-600">
                        <span id="bulkDeleteCount"></span> soal beserta semua opsi jawabannya akan dihapus permanen.
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row justify-center gap-3">
                    <button type="button" id="cancelBulkDeleteBtn"
                            class="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium">
                        <i class="fas fa-times mr-2"></i>Batal
                    </button>
                    <button type="button" id="confirmBulkDeleteBtn"
                            class="w-full sm:w-auto px-6 py-3 text-white bg-red-500 border border-red-500 rounded-xl hover:bg-red-600 transition-all duration-300 font-medium">
                        <i class="fas fa-trash mr-2"></i>Ya, Hapus Semua
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

@vite(['resources/css/user.css','resources/js/admin/soal.js'])
@endsection