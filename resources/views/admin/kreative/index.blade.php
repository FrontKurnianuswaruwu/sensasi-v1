@extends('layouts.admin')
@section('title', 'Data Artikel')
@section('content')
<!-- Main Content -->
<meta name="csrf-token" content="{{ csrf_token() }}">
<div id="notificationWrapper" class="fixed top-4 right-4 flex flex-col gap-2 z-[9999]"></div>
<main class="flex-1 lg:ml-0 overflow-x-hidden">
    <div class="p-4 lg:p-8">
        <div class="mb-8 fade-in flex items-center justify-between">
            <!-- Judul -->
            <h2 class="text-2xl lg:text-3xl font-bold mb-2">
                Data Artikel
            </h2>

            <!-- Breadcrumb -->
            <nav class="text-sm text-gray-500" aria-label="Breadcrumb">
                <ol class="list-reset flex">
                    <li>
                        <span class="text-gray-700">Data Artikel</span>
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
                        id="searchInputartikel" 
                        class="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-primary/20 focus:border-blue-primary transition-all duration-300 text-base placeholder-gray-500" 
                        placeholder="Cari berdasarkan nama...">
            </div>
            <div class="mt-4 flex items-center justify-between">
                <span id="resultCount" class="text-sm text-gray-600 font-medium">
                    <i class="fas fa-info-circle mr-1"></i>
                    Menampilkan semua data
                </span>
            </div>
        </div>

        <div class="mb-6 flex justify-start fade-in" style="animation-delay: 0.2s;">
            <button id="addSubartikelBtn" 
                class="px-5 py-3 bg-blue-primary text-white rounded-xl hover:bg-blue-primary flex items-center space-x-2 transition-all duration-300 shadow-md">
                <i class="fas fa-plus"></i>
                <span>Tambah Artikel</span>
            </button>
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
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider w-[60%]">
                                    <div class="flex items-center">
                                        Deskripsi
                                    </div>
                                </th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider w-[60%]">
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
                        <tbody id="tableArtikel" class="bg-white divide-y divide-gray-200">
                            
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
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <input type="hidden" id="oldFoto" name="oldFoto">
                        <label for="artikelFoto" class="block text-sm font-semibold text-gray-700">
                            <i class="fas fa-image mr-2 text-blue-primary"></i>Gambar
                        </label>

                        <!-- Dropzone -->
                        <div id="dropzone" class="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-primary transition" onclick="document.getElementById('artikelFoto').click()" ondragover="event.preventDefault(); this.classList.add('border-blue-primary', 'bg-blue-50')" ondragleave="this.classList.remove('border-blue-primary', 'bg-blue-50')" >
                            <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
                            <p class="text-gray-600 text-sm">Klik untuk pilih gambar atau drag & drop di sini</p>
                            <input type="file" id="artikelFoto" name="gambar" accept="image/*" class="hidden">
                        </div>
                    </div>
                    <div class="space-y-2">
                    <!-- Live preview -->
                        <div id="previewContainer" class="mt-3 hidden">
                            <p class="text-gray-600 text-sm mb-2">Preview:</p>
                            <img id="preview" src="" alt="Preview gambar" class="w-64 rounded-lg shadow-md border mb-2" />
                            <button type="button" id='removeFoto' class="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition">
                            Hapus Gambar
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
                <input type="hidden" id="deleteartikelId" name="id">

                <!-- Body -->
                <div class="p-6">
                    <div class="text-center mb-6">
                        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-trash-alt text-3xl text-red-500"></i>
                        </div>
                        <h4 class="text-lg font-semibold text-gray-900 mb-2">Apakah Anda yakin?</h4>
                        <p class="text-gray-600">Data Artikel <span id="deleteArtikelName" class="font-semibold text-gray-900"></span> akan dihapus secara permanen dan tidak dapat dikembalikan.</p>
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

    <!-- Approve Modal -->
    <div id="approveModal" class="fixed inset-0 z-50 hidden">
        <div class="modal-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div class="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-md">
                <!-- Header -->
                <div class="bg-green-500 px-6 py-4 rounded-t-2xl">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                            <i class="fas fa-check-circle text-white text-lg"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white">Konfirmasi Tindakan</h3>
                    </div>
                </div>
                <input type="hidden" id="approveartikelId" name="id">

                <!-- Body -->
                <div class="p-6">
                    <div class="text-center mb-6">
                        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-file-alt text-3xl text-green-500"></i>
                        </div>
                        <h4 class="text-lg font-semibold text-gray-900 mb-2">Pilih tindakan untuk artikel ini</h4>
                        <p class="text-gray-600">
                            Artikel <span id="approveArtikelName" class="font-semibold text-gray-900"></span>
                            sedang menunggu keputusan Anda.
                        </p>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                        <button type="button" 
                                id="cancelApproveBtn"
                                class="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 transition-all duration-300 font-medium">
                            <i class="fas fa-times mr-2"></i>Batal
                        </button>
                        <button type="button" 
                                id="confirmRejectBtn"
                                class="w-full sm:w-auto px-6 py-3 text-white bg-red-500 border border-red-500 rounded-xl hover:bg-red-600 focus:ring-4 focus:ring-red-200 transition-all duration-300 font-medium">
                            <i class="fas fa-times-circle mr-2"></i>Tolak
                        </button>
                        <button type="button" 
                                id="confirmApproveBtn"
                                class="w-full sm:w-auto px-6 py-3 text-white bg-green-500 border border-green-500 rounded-xl hover:bg-green-600 focus:ring-4 focus:ring-green-200 transition-all duration-300 font-medium">
                            <i class="fas fa-check mr-2"></i>Ya, Setujui
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

@vite(['resources/css/user.css','resources/js/admin/artikel.js'])

@endsection