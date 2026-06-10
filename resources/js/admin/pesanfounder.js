import $ from 'jquery';
import 'summernote/dist/summernote-lite.min.css';
import 'summernote/dist/summernote-lite.min.js';

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

// initial load
$(function() {
   loadData();
});

let currentPage = 1;
const rowsPerPage = 10;

function renderTable(data) {
    const tablePesanFounder = $('#tablePesanFounder');
    tablePesanFounder.empty();

    if (data.length === 0) {
        tablePesanFounder.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);
        return;
    }

    data.forEach((pesanfounder, index) => {
        const firstChar = pesanfounder.nama ? pesanfounder.nama.charAt(0) : 'F';
        const deskripsiPreview = pesanfounder.deskripsi
            ? pesanfounder.deskripsi.replace(/<[^>]+>/g, '').substring(0, 100) + '...'
            : '-';

        const row = `
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${index + 1}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                                ${firstChar}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${pesanfounder.nama || '-'}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4">
                    <div class="text-sm text-gray-600 line-clamp-2">${deskripsiPreview}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${pesanfounder.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${pesanfounder.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        tablePesanFounder.append(row);
    });
}

function renderCards(data) {
    const cardContainer = $('#cardContainer');
    cardContainer.empty();

    if (data.length === 0) {
        cardContainer.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);
        return;
    }

    data.forEach((pesanfounder) => {
        const firstChar = pesanfounder.nama ? pesanfounder.nama.charAt(0) : 'F';
        const deskripsiPreview = pesanfounder.deskripsi
            ? pesanfounder.deskripsi.replace(/<[^>]+>/g, '').substring(0, 100) + '...'
            : '-';

        const card = `
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                            ${firstChar}
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-lg font-semibold text-gray-900">${pesanfounder.nama || '-'}</h3>
                        </div>
                        <p class="text-sm text-gray-600 mb-3 line-clamp-2">${deskripsiPreview}</p>
                        <div class="flex mt-4 space-x-2">
                            <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${pesanfounder.id}">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${pesanfounder.id}">
                                <i class="fas fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardContainer.append(card);
    });
}

function renderPagination(totalPages, query) {
    const paginationContainer = $('#pagination');
    paginationContainer.empty();

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const btn = $(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border ${i === currentPage ? 'bg-orange-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}">${i}</button>`);
        btn.on('click', function () {
            currentPage = i;
            loadData(query, currentPage);
        });
        paginationContainer.append(btn);
    }
}

function renderPaginationMobile(totalPages, query) {
    const pagination = $('#paginationMobile');
    pagination.empty();

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const btn = $(`<button class="px-3 py-1 rounded-lg border ${i === currentPage ? 'bg-orange-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}">${i}</button>`);
        btn.on('click', function() {
            currentPage = i;
            loadData(query, currentPage);
        });
        pagination.append(btn);
    }
}

function loadData(query = '', page = 1) {
    $.ajax({
        url: "/admin/getpesanfounder",
        type: "GET",
        data: { search: query, page: page, limit: rowsPerPage },
        dataType: "json",
        success: function(res) {
            const data = res.data;

            if (!Array.isArray(data)) {
                console.error("Response data bukan array:", data);
                return;
            }

            renderTable(data);
            renderCards(data);
            renderPagination(res.last_page, query);
            renderPaginationMobile(res.last_page, query);

            let start = (res.current_page - 1) * rowsPerPage + 1;
            let end = start + data.length - 1;
            $("#resultCount").html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${start} - ${end} dari ${res.total} data
            `);
        },
        error: function(xhr, status, error) {
            console.error("Gagal ambil data:", error, xhr.responseText);
        }
    });
}

$('#searchInputpesanfounder').on('input', function() {
    const query = $(this).val();
    currentPage = 1;
    loadData(query, currentPage);
});

function resetForm() {
    $('#pesanFounderForm')[0].reset();
    $('#pesanFounderDeskripsi').summernote('code', '');
}

function showModalEnhanced(modalId) {
    showModal(modalId);
    preventBodyScroll();
}

function showModal(modalId) {
    const modal = $('#' + modalId);
    modal.removeClass('hidden');
    setTimeout(() => {
        modal.find('.modal-content').addClass('show');
    }, 10);
    $('body').addClass('overflow-hidden');
}

function preventBodyScroll() {
    $('body').css({
        'overflow': 'hidden',
        'padding-right': ''
    });
}

$('#cancelDeleteBtn').on('click', function() {
    hideModalEnhanced('deleteModal');
});

$('#closeModal, #cancelBtn').on('click', function() {
    hideModalEnhanced('pesanFounderModal');
});

function hideModalEnhanced(modalId) {
    hideModal(modalId);
    restoreBodyScroll();
}

function hideModal(modalId) {
    const modal = $('#' + modalId);
    modal.find('.modal-content').removeClass('show');
    setTimeout(() => {
        modal.addClass('hidden');
        $('body').removeClass('overflow-hidden');
    }, 300);
}

function restoreBodyScroll() {
    $('body').css({
        'overflow': '',
        'padding-right': ''
    });
}

$('.modal-overlay').on('click', function(e) {
    if (e.target === this) {
        if ($(this).closest('#pesanFounderModal').length) {
            hideModalEnhanced('pesanFounderModal');
        } else if ($(this).closest('#deleteModal').length) {
            hideModalEnhanced('deleteModal');
        }
    }
});

function showNotification(message, type = 'info') {
    const bgColor = type === 'success'
        ? 'bg-green-500'
        : type === 'error'
        ? 'bg-red-500'
        : 'bg-blue-500';

    const icon = type === 'success'
        ? 'fa-check-circle'
        : type === 'error'
        ? 'fa-exclamation-circle'
        : 'fa-info-circle';

    const notification = $(`
        <div class="notification flex items-center space-x-3 ${bgColor} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${icon} text-lg"></i>
            <span class="font-medium">${message}</span>
        </div>
    `);

    $('#notificationWrapper').append(notification);

    setTimeout(() => {
        notification.removeClass('translate-x-full opacity-0');
    }, 100);

    const hideTimeout = setTimeout(() => {
        notification.addClass('translate-x-full opacity-0');
        setTimeout(() => notification.remove(), 300);
    }, 4000);

    notification.on('click', function() {
        clearTimeout(hideTimeout);
        $(this).addClass('translate-x-full opacity-0');
        setTimeout(() => $(this).remove(), 300);
    });
}

function validateForm() {
    let isValid = true;
    const nama = $('#pesanFounderNama').val().trim();
    const deskripsi = $('#pesanFounderDeskripsi').summernote('code').trim();

    if (!nama) {
        showNotification('Nama founder tidak boleh kosong!', 'error');
        isValid = false;
    }

    if (!deskripsi || deskripsi === '<p><br></p>') {
        showNotification('Pesan tidak boleh kosong!', 'error');
        isValid = false;
    }

    return isValid;
}

let currentPesanFounderId = null;

$(function () {
    function uploadImage(file) {
        const formData = new FormData();
        formData.append('upload', file);

        return $.ajax({
            url: '/admin/ckeditor/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    }

    $('#pesanFounderDeskripsi').summernote({
        height: 300,
        placeholder: 'Masukkan pesan founder...',
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture']],
            ['view', ['fullscreen', 'codeview', 'help']]
        ],
        callbacks: {
            onImageUpload: function(files) {
                for (let i = 0; i < files.length; i++) {
                    uploadImage(files[i]).done(function(response) {
                        $('#pesanFounderDeskripsi').summernote('insertImage', response.url);
                    }).fail(function() {
                        showNotification('Upload gambar gagal!', 'error');
                    });
                }
            }
        }
    });

    $('#addBtn').on('click', function() {
        currentPesanFounderId = null;
        resetForm();
        $('#modalTitle').text('Tambah Pesan Founder Baru');
        $('#modalIcon').removeClass().addClass('fas fa-envelope');
        $('#submitText').text('Simpan Data');
        $('#submitIcon').removeClass('fa-edit').addClass('fa-save');
        $('#pesanFounderId').val('');
        showModalEnhanced('pesanFounderModal');
    });

    $('#pesanFounderForm').on('submit', function (e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const submitBtn = $('#submitBtn');
        const originalText = submitBtn.html();
        submitBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop('disabled', true);

        const pesanFounderId = $('#pesanFounderId').val();

        const formData = new FormData();
        formData.append('nama', $('#pesanFounderNama').val());
        formData.append('deskripsi', $('#pesanFounderDeskripsi').summernote('code'));

        const url = pesanFounderId ? `/admin/pesanfounder/${pesanFounderId}` : '/admin/pesanfounder';
        const method = 'POST';
        if (pesanFounderId) {
            formData.append('_method', 'PUT');
        }

        $.ajax({
            url: url,
            type: method,
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                showNotification(response.message, response.status);
                hideModalEnhanced('pesanFounderModal');
                submitBtn.html(originalText).prop('disabled', false);
                loadData($('#searchInputpesanfounder').val(), currentPage);
            },
            error: function (xhr) {
                submitBtn.html(originalText).prop('disabled', false);
                if (xhr.status === 422 && xhr.responseJSON.errors) {
                    let errors = xhr.responseJSON.errors;
                    let messages = [];
                    for (let field in errors) {
                        if (errors.hasOwnProperty(field)) {
                            messages.push(errors[field].join(', '));
                        }
                    }
                    showNotification(messages.join(' | '), 'error');
                } else {
                    let msg = (xhr.responseJSON && xhr.responseJSON.message)
                        ? xhr.responseJSON.message
                        : 'Terjadi kesalahan saat menyimpan data!';
                    showNotification(msg, 'error');
                }
            }
        });
    });

    $(document).on('click', '.edit-btn', function() {
        currentPesanFounderId = $(this).data('id');
        resetForm();

        $('#modalTitle').text('Edit Pesan Founder');
        $('#modalIcon').removeClass().addClass('fas fa-edit');
        $('#submitText').text('Update Data');
        $('#submitIcon').removeClass('fa-save').addClass('fa-edit');

        $.ajax({
            url: '/admin/pesanfounder/' + currentPesanFounderId,
            type: 'GET',
            success: function(pesanfounder) {
                $('#pesanFounderId').val(pesanfounder.id);
                $('#pesanFounderNama').val(pesanfounder.nama);
                $('#pesanFounderDeskripsi').summernote('code', pesanfounder.deskripsi || '');
                showModalEnhanced('pesanFounderModal');
            },
            error: function(xhr) {
                console.error("Gagal ambil data:", xhr.responseText);
                showNotification('Gagal ambil data pesan founder', 'error');
            }
        });
    });

    $(document).on('click', '.delete-btn', function() {
        const id = $(this).data('id');
        $('#deletepesanFounderId').val(id);
        showModalEnhanced('deleteModal');
    });

    $('#confirmDeleteBtn').on('click', function() {
        const id = $('#deletepesanFounderId').val();
        const btn = $(this);
        const originalText = btn.html();
        btn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop('disabled', true);

        $.ajax({
            url: `/admin/pesanfounder/${id}`,
            type: 'DELETE',
            success: function(response) {
                showNotification(response.message, response.status);
                hideModalEnhanced('deleteModal');
                btn.html(originalText).prop('disabled', false);
                loadData($('#searchInputpesanfounder').val(), currentPage);
            },
            error: function(xhr) {
                btn.html(originalText).prop('disabled', false);
                let msg = (xhr.responseJSON && xhr.responseJSON.message)
                    ? xhr.responseJSON.message
                    : 'Terjadi kesalahan saat menghapus data!';
                showNotification(msg, 'error');
            }
        });
    });
});
