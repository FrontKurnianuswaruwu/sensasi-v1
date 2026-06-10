@extends('layouts.admin')
@section('content')
@section('title', 'Data Twibbon')
<meta name="csrf-token" content="{{ csrf_token() }}">
<div id="notificationWrapper" class="fixed top-4 right-4 flex flex-col gap-2 z-[9999]"></div>

<main class="flex-1 lg:ml-0 overflow-x-hidden">
    <div class="p-4 lg:p-8">
        <div class="mb-8 fade-in flex items-center justify-between">
            <h2 class="text-2xl lg:text-3xl font-bold mb-2">Data Twibbon</h2>
            <nav class="text-sm text-gray-500" aria-label="Breadcrumb">
                <ol class="list-reset flex">
                    <li><span class="text-gray-700">Data Twibbon</span></li>
                </ol>
            </nav>
        </div>

        <div class="floating-search rounded-2xl shadow-lg mb-8 p-6 fade-in" style="animation-delay: 0.1s;">
            <div class="flex flex-col md:flex-row gap-4">
                <div class="relative flex-1">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <i class="fas fa-search text-gray-400 text-lg"></i>
                    </div>
                    <input type="text" id="searchInputtwibbon" class="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-primary/20 focus:border-blue-primary transition-all duration-300 text-base placeholder-gray-500" placeholder="Cari twibbon...">
                </div>
                <button id="addTwibbonBtn" class="px-6 py-4 bg-blue-primary text-white rounded-xl hover:bg-blue-primary font-semibold flex items-center gap-2">
                    <i class="fas fa-plus"></i> Tambah Twibbon
                </button>
            </div>
            <div class="mt-4">
                <span id="resultCount" class="text-sm text-gray-600 font-medium"><i class="fas fa-info-circle mr-1"></i>Menampilkan semua data</span>
            </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg overflow-hidden fade-in" style="animation-delay: 0.3s;">
            <div class="hidden lg:block">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gradient-to-r gradient-bg to-blue-light text-white">
                            <tr>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider">No</th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider w-[28%]">Judul</th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider w-[22%]">Link</th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider">View</th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider">Download</th>
                                <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider w-[18%]">Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="tableTwibbon" class="bg-white divide-y divide-gray-200"></tbody>
                    </table>
                    <div id="pagination" class="flex justify-center space-x-2 p-4"></div>
                </div>
            </div>
            <div class="lg:hidden p-4" id="cardContainer"></div>
            <div class="lg:hidden flex justify-center space-x-2 p-4" id="paginationMobile"></div>
        </div>
    </div>
</main>

<div id="twibbonModal" class="fixed inset-0 z-50 hidden">
    <div class="modal-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div class="gradient-bg px-6 py-4 rounded-t-2xl">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                            <i id="modalIcon" class="fas fa-image text-white text-lg"></i>
                        </div>
                        <h3 id="modalTitle" class="text-xl font-bold text-white">Tambah Twibbon</h3>
                    </div>
                    <button id="closeModal" class="text-white hover:text-gray-200 p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>

            <form id="twibbonForm" class="p-6 space-y-6">
                <input type="hidden" id="twibbonId">
                <input type="hidden" id="oldTemplate">

                <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700"><i class="fas fa-heading mr-2 text-blue-primary"></i>Judul</label>
                    <input type="text" id="title" name="title" class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl" placeholder="Masukkan judul twibbon">
                </div>

                <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700"><i class="fas fa-link mr-2 text-blue-primary"></i>Custom Link</label>
                    <div class="flex rounded-xl overflow-hidden border-2 border-gray-200">
                        <span class="px-4 py-3 bg-gray-100 text-gray-500 text-sm flex items-center">{{ url('/twibbon') }}/</span>
                        <input type="text" id="slug" name="slug" class="flex-1 px-4 py-3 outline-none" placeholder="contoh: kampanye-sensasi">
                    </div>
                    <p class="text-xs text-gray-500">Kosongkan untuk auto-generate dari judul.</p>
                </div>

                <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700"><i class="fas fa-align-left mr-2 text-blue-primary"></i>Deskripsi</label>
                    <textarea id="description" name="description" rows="3" class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl" placeholder="Deskripsi opsional"></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700"><i class="fas fa-image mr-2 text-blue-primary"></i>Template Twibbon</label>
                        <div id="dropzone" class="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-primary transition" onclick="document.getElementById('templateImage').click()">
                            <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
                            <p class="text-gray-600 text-sm text-center">Upload PNG transparan/JPG maksimal 2MB</p>
                            <input type="file" id="templateImage" name="template_image" accept="image/*" class="hidden">
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700">Preview</label>
                        <div class="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center border">
                            <img id="previewTemplate" src="" class="hidden w-full h-full object-contain" alt="Preview template">
                            <span id="emptyPreview" class="text-gray-400 text-sm">Belum ada template</span>
                        </div>
                    </div>
                </div>

                <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700"><i class="fas fa-toggle-on mr-2 text-blue-primary"></i>Status</label>
                    <select id="status" name="status" class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl">
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>

                <div class="flex justify-end gap-3 pt-6 border-t border-gray-200">
                    <button type="button" id="cancelBtn" class="px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 font-medium">Batal</button>
                    <button type="submit" id="submitBtn" class="px-6 py-3 text-white bg-orange-primary border border-orange-primary rounded-xl hover:bg-orange-light font-medium">
                        <i id="submitIcon" class="fas fa-save mr-2"></i><span id="submitText">Simpan Data</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<div id="deleteModal" class="fixed inset-0 z-50 hidden">
    <div class="modal-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div class="bg-red-500 px-6 py-4 rounded-t-2xl">
                <h3 class="text-xl font-bold text-white"><i class="fas fa-exclamation-triangle mr-2"></i>Konfirmasi Hapus</h3>
            </div>
            <input type="hidden" id="deleteTwibbonId">
            <div class="p-6 text-center">
                <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-trash-alt text-3xl text-red-500"></i>
                </div>
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Apakah Anda yakin?</h4>
                <p class="text-gray-600 mb-6">Twibbon akan dihapus permanen.</p>
                <div class="flex justify-center gap-3">
                    <button type="button" id="cancelDeleteBtn" class="px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 font-medium">Batal</button>
                    <button type="button" id="confirmDeleteBtn" class="px-6 py-3 text-white bg-red-500 border border-red-500 rounded-xl hover:bg-red-600 font-medium">Ya, Hapus</button>
                </div>
            </div>
        </div>
    </div>
</div>

@vite(['resources/css/user.css','resources/js/admin/twibbon.js'])
@endsection
