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
    const tableAlumni = $('#tableAlumni');
    tableAlumni.empty();

    if (data.length === 0) {
        tableAlumni.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);
        return;
    }

    data.forEach((alumni, index) => {
        const row = `
            <tr class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${index + 1}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                        ${alumni.nama_lengkap.charAt(0)}
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${alumni.nama_lengkap}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${alumni.mitra.nama_mitra || '-'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${alumni.program_studi || '-'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${alumni.tahun_lulus || '-'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${alumni.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${alumni.id}" data-name="${alumni.nama_lengkap}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
            </tr>
        `;
        tableAlumni.append(row);
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

    data.forEach((alumni) => {
        const card = `
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                        ${alumni.nama_lengkap.charAt(0)}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-2">
                        <h3 class="text-lg font-semibold text-gray-900 truncate">${alumni.nama_lengkap}</h3>
                    </div>
                    <div class="space-y-1 text-sm text-gray-600">
                    <div class="flex items-center">
                        <i class="fas fa-handshake w-4 mr-2 text-orange-primary"></i>
                        <span class="truncate">${alumni.mitra.nama_mitra || '-'}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-book w-4 mr-2 text-blue-500"></i>
                        <span class="truncate">${alumni.program_studi || '-'}</span>
                    </div>
                    <div class="flex mt-4 space-x-2">
                        <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${alumni.id}">
                        <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${alumni.id}" data-name="${alumni.nama_lengkap}">
                        <i class="fas fa-trash"></i> Hapus
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
        url: "/admin/getalumni",
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
$('#searchInputalumni').on('input', function() {
    const query = $(this).val();
    currentPage = 1;
    loadData(query, currentPage);
});

// Reset form
function resetForm() {
    $('#alumniForm')[0].reset();
    $('#alumniForm input, #alumniForm select, #alumniForm textarea').removeClass('border-red-300 bg-red-50');

    $('#alumniForm input, #alumniForm select').each(function() {
        $(this).removeClass('border-red-300 bg-red-50');
        hideFieldError(this);
    });

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
    hideModalEnhanced('alumniModal');
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
        if ($(this).closest('#alumniModal').length) {
            hideModalEnhanced('alumniModal');
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
    const requiredFields = [
        'alumniName',
        'alumniMitraid',
        'alumniTahunlulus',
        'alumniProgramstudi'
    ];
    
    requiredFields.forEach(function(fieldId) {
        const field = $('#' + fieldId);
        if (!field.val() || !field.val().toString().trim()) {
            field.addClass('border-red-300 bg-red-50');
            isValid = false;
        } else {
            field.removeClass('border-red-300 bg-red-50');
        }
    });

    return isValid;
}

$("#alumniFoto").on("change", function () {
    const input = this;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            $("#preview").attr("src", e.target.result);
            $("#previewContainer").removeClass("hidden");
        };
        reader.readAsDataURL(input.files[0]);
    }
});

// drag & drop
$("#dropzone").on("drop", function (e) {
    e.preventDefault();
    const files = e.originalEvent.dataTransfer.files;
    $("#alumniFoto")[0].files = files;
    $("#alumniFoto").trigger("change");
})
.on("dragleave", function () {
    $(this).removeClass("border-blue-primary bg-blue-50");
})
.on("drop", function (e) {
    e.preventDefault();
    const files = e.originalEvent.dataTransfer.files;
    $("#alumniFoto")[0].files = files;
    $("#alumniFoto").trigger("change");
});

$("#removeFoto").on("click", function () {
    let alumniId = $("#alumniId").val();

    if (!alumniId) {
        showNotification("ID Alumni tidak ditemukan.");
        return;
    }

    $.ajax({
        url: '/alumni/deleteFoto', 
        type: 'POST',
        data: { id: alumniId },
        success: function (response) {
            if (response.success) {
                $("#alumniFoto").val("");
                $("#previewContainer").addClass("hidden");
                $("#preview").attr("src", "");
                showNotification(response.message, 'success');
            } else {
                showNotification("Gagal menghapus foto.");
            }
        },
        error: function () {
            showNotification("Terjadi kesalahan.");
        }
    });
});

let alumniEditor;
let currentAlumniId = null;
let isEditMode = false;
// Show add Alumni modal
$('#addSubalumniBtn').on('click', function() {
    isEditMode = false;
    currentAlumniId = null;
    resetForm();
    $('#alumniId').val('');

    $('#modalTitle').text('Tambah Alumni Baru');
    $('#modalIcon').removeClass('fa-edit').addClass('fa-user-graduate');
    $('#submitText').text('Simpan Data');
    $('#submitIcon').removeClass('fa-edit').addClass('fa-save');

    loadMitras();

    showModalEnhanced('alumniModal');
    
    $('#alumniIsparent').val('');
});

// Load menu options
function loadMitras(selectedMitra = '') {
    $.get('/admin/alumni/getmitras', function(response) {
        const mitras = Array.isArray(response) ? response : (Array.isArray(response.data) ? response.data : []);
        $('#alumniMitraid').empty();
        $('#alumniMitraid').append('<option value="">Pilih Mitra</option>');

        mitras.forEach(function(menu) {
            var selected = menu.id == selectedMitra ? 'selected' : '';
            $('#alumniMitraid').append(`<option value="${menu.id}" ${selected}>${menu.nama_mitra}</option>`);
        });
    }).fail(function() {
        alert('Gagal mengambil data menu. Pastikan API berjalan dengan benar.');
    });
}

flatpickr("#alumniTahunlulus", {
    plugins: [
        new monthSelectPlugin({
            shorthand: true,
            dateFormat: "Y",
            altFormat: "Y"
        })
    ]
});

$(function () {
    $('#alumniForm').on('submit', function (e) {
        e.preventDefault();

        if (!validateForm()) {
            showNotification('Mohon lengkapi semua field yang wajib diisi!', 'error');
            return;
        }

        const submitBtn = $('#submitBtn');
        const originalText = submitBtn.html();
        submitBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop('disabled', true);

        const alumniId = $('#alumniId').val();

        const formData = new FormData();
        formData.append('nama_lengkap', $('#alumniName').val());
        formData.append('mitra_id', $('#alumniMitraid').val());
        formData.append('tahun_lulus', $('#alumniTahunlulus').val());
        formData.append('program_studi', $('#alumniProgramstudi').val());

        const fileInput = $('#alumniFoto')[0];
        if (fileInput.files.length > 0) {
            formData.append('foto', fileInput.files[0]); 
        } else {
            formData.append('oldFoto', $('#oldFoto').val());
        }

        const url = alumniId ? `/admin/alumni/${alumniId}` : '/admin/alumni';
        const method = 'POST';
        if (alumniId) {
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

                hideModalEnhanced('alumniModal');
                submitBtn.html(originalText).prop('disabled', false);

                loadData($('#searchInputmenu').val(), currentPage);
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

$(document).on('click', '.edit-btn', function() {
    isEditMode = true;
    currentAlumniId = $(this).data('id');
    resetForm();

    $('#modalTitle').text('Edit Data Alumni');
    $('#modalIcon').removeClass('fa-bars').addClass('fa-edit');
    $('#submitText').text('Update Data');
    $('#submitIcon').removeClass('fa-save').addClass('fa-edit');

    $.ajax({
        url: '/admin/alumni/' + currentAlumniId,
        type: 'GET',
        success: function(alumni) {
            $('#alumniId').val(alumni.id);
            $('#alumniName').val(alumni.nama_lengkap);
            $('#alumniTahunlulus').val(alumni.tahun_lulus);
            $('#alumniProgramstudi').val(alumni.program_studi);
            loadMitras(alumni.mitra_id);
            if (alumni.foto) {
                $('#preview').attr('src', '/' + alumni.foto);
                $('#previewContainer').removeClass('hidden');
                $('#oldFoto').val(alumni.foto);
            } else {
                $('#preview').attr('src', '');
                $('#previewContainer').addClass('hidden');
                $('#oldFoto').val('');
            }

            showModal('alumniModal');
        },
        error: function(xhr) {
            console.error("Gagal ambil data:", xhr.responseText);
            alert('Gagal ambil data alumni');
        }
    });
});

$(document).on('click', '.delete-btn', function() {
    const id = $(this).data('id');  
    const name = $(this).data('name');

    $('#deletealumniId').val(id); 
    $('#deleteAlumniName').text(name);

    showModalEnhanced('deleteModal');
});

// Update delete confirmation handler
$(document).on('click', '#confirmDeleteBtn', function() {
    const deleteBtn = $(this);
    const originalText = deleteBtn.html();
    deleteBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...')
             .prop('disabled', true);

    const alumnid = $('#deletealumniId').val();

    $.ajax({
        url: `/admin/alumni/${alumnid}`, 
        type: 'DELETE',
        success: function(response) {
            showNotification(response.message , response.status);

            hideModalEnhanced('deleteModal');
            loadData(); 
        },
        error: function(xhr) {
            let msg = (xhr.responseJSON && xhr.responseJSON.message) 
                        ? xhr.responseJSON.message 
                        : 'Gagal menghapus data!';
            showNotification(msg, 'error');
        },
        complete: function() {
            deleteBtn.html(originalText).prop('disabled', false);
        }
    });
});