import $ from 'jquery';

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

// initial load
$(function() {
   loadData();
});

function formatTanggal(dateStr) {
    if (!dateStr) return '-';
    const bulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const d = new Date(dateStr);
    if (isNaN(d)) return '-';
    return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

let currentPage = 1;
const rowsPerPage = 10;

function renderTable(data) {
    const tableVisimisi = $('#tableVisimisi');
    tableVisimisi.empty();

    if (data.length === 0) {
        tableVisimisi.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);
        return;
    }

    data.forEach((visimisi, index) => {
        const cleanVisi = visimisi.visi.replace(/<[^>]+>/g, '').trim();
        const firstChar = cleanVisi.charAt(0);
        const row = `
            <tr class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${index + 1}</td>
            <td class="px-6 py-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                        ${firstChar}
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${visimisi.visi}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
                ${visimisi.misi}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${visimisi.id}">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
            </tr>
        `;
        tableVisimisi.append(row);
    });
}

// Render mobile cards khusus role (hanya name + aksi edit/hapus)
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

    data.forEach((visimisi) => {
        const cleanVisi = visimisi.visi ? visimisi.visi.replace(/<[^>]+>/g, '').trim() : '';
        const firstChar = cleanVisi ? cleanVisi.charAt(0) : '';
        const card = `
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
            ${firstChar}
            </div>
            <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-semibold text-gray-900 truncate">${visimisi.visi}</h3>
            </div>
            <div class="space-y-1 text-sm text-gray-600">
                <div class="flex items-center">
                <i class="fas fa-user-tie w-4 mr-2 text-orange-primary"></i>
                <span class="truncate">${visimisi.misi || '-'}</span>
                </div>
                <div class="flex mt-4 space-x-2">
                <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${visimisi.id}">
                <i class="fas fa-edit"></i> Edit
                </button>
                </div>
            </div>
            </div>
            </div>
            </div>
        `;
        cardContainer.append(card);
    });
}

// render pagination berdasarkan totalPages dari server
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

// Ambil data dari server dengan pagination & search
function loadData(query = '', page = 1) {
    $.ajax({
        url: "/admin/getvisimisi",
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

// search event
$('#searchInputvisimisi').on('input', function() {
    const query = $(this).val();
    currentPage = 1;
    loadData(query, currentPage);
});

// Reset form
function resetForm() {
    $('#visimisiForm')[0].reset();
    $('#visimisiForm input, #visimisiForm select, #visimisiForm textarea').removeClass('border-red-300 bg-red-50');

    $('#visimisiForm input, #visimisiForm select').each(function() {
        $(this).removeClass('border-red-300 bg-red-50');
        hideFieldError(this);
    });

    if (typeof visimisiEditor !== 'undefined' && visimisiEditor) {
        visimisiEditor.setData('');
    } else {
        $('#visimisiDescription').val(''); 
    }

    $('#preview').attr('src', '');
    $('#previewContainer').addClass('hidden');
}

// Enhanced modal show/hide with body scroll prevention
function showModalEnhanced(modalId) {
    showModal(modalId);
    preventBodyScroll();
}

// Show modal with animation
function showModal(modalId) {
    const modal = $('#' + modalId);
    modal.removeClass('hidden');
    setTimeout(() => {
        modal.find('.modal-content').addClass('show');
    }, 10);
    $('body').addClass('overflow-hidden');
}

// Prevent modal body scroll when modal is open
function preventBodyScroll() {
    $('body').css({
        'overflow': 'hidden',
        'padding-right': ''
    });
}

// Hide field-specific error
function hideFieldError(field) {
    const $field = $(field);
    const errorId = $field.attr('id') + '-error';
    $('#' + errorId).remove();
}

$('#cancelDeleteBtn').on('click', function() {
    hideModalEnhanced('deleteModal');
});

$('#closeModal, #cancelBtn').on('click', function() {
    hideModalEnhanced('visimisiModal');
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

// Close modal when clicking outside
$('.modal-overlay').on('click', function(e) {
    if (e.target === this) {
        if ($(this).closest('#visimisiModal').length) {
            hideModalEnhanced('visimisiModal');
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

            // Append ke wrapper
    $('#notificationWrapper').append(notification);
    
    // Show notification dengan animasi
    setTimeout(() => {
        notification.removeClass('translate-x-full opacity-0');
    }, 100);

    // Hide otomatis setelah 4 detik
    const hideTimeout = setTimeout(() => {
        notification.addClass('translate-x-full opacity-0');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
    
    // Klik untuk langsung menutup
    notification.on('click', function() {
        clearTimeout(hideTimeout); // stop hide otomatis
        $(this).addClass('translate-x-full opacity-0');
        setTimeout(() => $(this).remove(), 300);
    });
}

// Form validation
function validateForm() {
    let isValid = true;

    // Validasi CKEditor untuk visi
    if (!visivisiEditor || !visivisiEditor.getData().trim()) {
        $('#visimisivisi').addClass('border-red-300 bg-red-50');
        isValid = false;
    } else {
        $('#visimisivisi').removeClass('border-red-300 bg-red-50');
    }

    // Validasi CKEditor untuk misi
    if (!visimisiEditor || !visimisiEditor.getData().trim()) {
        $('#visimisimisi').addClass('border-red-300 bg-red-50');
        isValid = false;
    } else {
        $('#visimisimisi').removeClass('border-red-300 bg-red-50');
    }

    return isValid;
}


let visivisiEditor;
let visimisiEditor;
let currentVisimisiId = null;
let isEditMode = false;

$(function () {
    // Editor untuk visi
    ClassicEditor
    .create(document.querySelector('#visimisivisi'), {
        toolbar: [
            'heading', '|',
            'bold', 'italic', 'link', '|',
            'numberedList', 'bulletedList', '|',
            'undo', 'redo'
        ]
    })
    .then(editor => {
        visivisiEditor = editor;
        console.log('CKEditor Visi siap dipakai!');
    })
    .catch(error => console.error(error));

// Editor untuk misi
ClassicEditor
    .create(document.querySelector('#visimisimisi'), {
        toolbar: [
            'heading', '|',
            'bold', 'italic', 'link', '|',
            'numberedList', 'bulletedList', '|',
            'undo', 'redo'
        ]
    })
    .then(editor => {
        visimisiEditor = editor;
        console.log('CKEditor Misi siap dipakai!');
    })
    .catch(error => console.error(error));


    // Submit form
    $('#visimisiForm').on('submit', function (e) {
        e.preventDefault();

        if (!validateForm()) {
            showNotification('Mohon lengkapi semua field yang wajib diisi!', 'error');
            return;
        }

        if (!visivisiEditor || !visimisiEditor) {
            showNotification('Editor belum siap, coba lagi!', 'error');
            return;
        }

        const submitBtn = $('#submitBtn');
        const originalText = submitBtn.html();
        submitBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop('disabled', true);

        const visimisiId = $('#visimisiId').val();

        const data = {
            visi: visivisiEditor.getData(),
            misi: visimisiEditor.getData(),
            _method: visimisiId ? 'PUT' : 'POST'
        };

        const url = visimisiId ? `/admin/visimisi/${visimisiId}` : '/admin/visimisi';
        const method = 'POST';

        $.ajax({
            url: url,
            type: method,
            data: data,
            success: function (response) {
                showNotification(response.message, response.status);

                hideModalEnhanced('visimisiModal');
                submitBtn.html(originalText).prop('disabled', false);

                loadData($('#searchInputvisimisi').val(), currentPage);
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
});

// Show edit visimisi modal
$(document).on('click', '.edit-btn', function() {
    isEditMode = true;
    currentVisimisiId = $(this).data('id');
    resetForm();

    $('#modalTitle').text('Edit Data Visi Misi');
    $('#modalIcon').removeClass('fa-bars fa-bullseye fa-lightbulb').addClass('fa-bullseye');
    $('#submitText').text('Update Data');
    $('#submitIcon').removeClass('fa-save').addClass('fa-edit');

    $.ajax({
        url: '/admin/visimisi/' + currentVisimisiId,
        type: 'GET',
        success: function(visimisi) {
            $('#visimisiId').val(visimisi.id);

            if (visivisiEditor) visivisiEditor.setData(visimisi.visi || '');
            if (visimisiEditor) visimisiEditor.setData(visimisi.misi || '');

            showModal('visimisiModal');
        },
        error: function(xhr) {
            console.error("Gagal ambil data:", xhr.responseText);
            alert('Gagal ambil data visimisi');
        }
    });
});
