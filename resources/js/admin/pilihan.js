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

let currentPage = 1;
const rowsPerPage = 10;

function renderTable(data) {
    const tableSoal = $('#tableSoal');
    tableSoal.empty();

    if (data.length === 0) {
        tableSoal.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);
        return;
    }

    data.forEach((pertanyaan, index) => {
        const row = `
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${index + 1}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                                ${pertanyaan.pertanyaan.charAt(0)}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${pertanyaan.pertanyaan}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button class="goto-soal-btn px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                        data-id="${pertanyaan.id}"
                        data-name="${pertanyaan.name}">
                        <i class="fas fa-list mr-1"></i>
                    </button>
                </td>
            </tr>
        `;
        tableSoal.append(row);
    });
}

// Render mobile cards khusus soal (hanya name + aksi edit/hapus)
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

    data.forEach((soal) => {
        const card = `
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                        ${soal.pertanyaan.charAt(0)}
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-lg font-semibold text-gray-900 truncate mb-2">${soal.pertanyaan}</h3>
                        <div class="flex mt-4 space-x-2">
                            <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${soal.id}">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${soal.id}" data-name="${soal.name}">
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
        url: "/admin/getsoal",
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
$('#searchInputsoal').on('input', function() {
    const query = $(this).val();
    currentPage = 1;
    loadData(query, currentPage);
});

// Reset form
function resetForm() {
    $('#soalForm')[0].reset();
    $('#soalForm input, #soalForm select, #soalForm textarea').removeClass('border-red-300 bg-red-50');
}

// Enhanced modal show/hide with body scroll prevention
function showModalEnhanced(modalId) {
    showModal(modalId);
    preventBodyScroll();
}

// Prevent modal body scroll when modal is open
function preventBodyScroll() {
    $('body').css({
        'overflow': 'hidden',
        'padding-right': '' // Prevent layout shift
    });
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

function restoreBodyScroll() {
    $('body').css({
        'overflow': '',
        'padding-right': ''
    });
}

// Update close handlers
$('#closeModal, #cancelBtn').on('click', function() {
    hideModalEnhanced('soalModal');
});

function hideModalEnhanced(modalId) {
    hideModal(modalId);
    restoreBodyScroll();
}

// Hide modal with animation
function hideModal(modalId) {
    const modal = $('#' + modalId);
    modal.find('.modal-content').removeClass('show');
    setTimeout(() => {
        modal.addClass('hidden');
        $('body').removeClass('overflow-hidden');
    }, 300);
}

// Close modal when clicking outside
$('.modal-overlay').on('click', function(e) {
    if (e.target === this) {
        if ($(this).closest('#soalModal').length) {
            hideModalEnhanced('soalModal');
        } else if ($(this).closest('#deleteModal').length) {
            hideModalEnhanced('deleteModal');
        }
    }
});

$('#cancelDeleteBtn').on('click', function() {
    hideModalEnhanced('deleteModal');
});

let currentSoalsoalId = null;
let isEditMode = false;

// Show add Soalsoal modal
$('#addSubsoalBtn').on('click', function() {
    isEditMode = false;
    currentSoalsoalId = null;
    resetForm();
    $('#soalId').val('');
    
    $('#modalTitle').text('Tambah Soal Baru');
    $('#modalIcon').removeClass('fa-edit').addClass('fa-layer-group');
    $('#submitText').text('Simpan Data');
    $('#submitIcon').removeClass('fa-edit').addClass('fa-save');
    
    showModalEnhanced('soalModal');
});


// Form validation
function validateForm() {
    let isValid = true;
    const requiredFields = ['pertanyaan'];
    
    requiredFields.forEach(function(fieldId) {
        const field = $('#' + fieldId);
        if (!field.val().trim()) {
            field.addClass('border-red-300 bg-red-50');
            isValid = false;
        } else {
            field.removeClass('border-red-300 bg-red-50');
        }
    });

    return isValid;
}

// Notifikasi
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

// Handle form submission
$('#soalForm').on('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        showNotification('Mohon lengkapi semua field yang wajib diisi!', 'error');
        return;
    }

    const submitBtn = $('#submitBtn');
    const originalText = submitBtn.html();
    submitBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop('disabled', true);

    const soalId = $('#soalId').val();
    const kategoriId = $('#kategori_id').val();

    const formData = {
        name: $('#pertanyaan').val(),
        kategori_id: kategoriId
    };

    // Tentukan URL dan method berdasarkan mode
    const url = soalId ? `/admin/pertanyaan/soal/${soalId}` : '/admin/pertanyaan/soal';
    const method = soalId ? 'PUT' : 'POST';

    $.ajax({
        url: url,
        type: method,
        data: JSON.stringify(formData),
        contentType: 'application/json',
        success: function(response) {
            showNotification(response.message, response.status); // response.status = 'success'

            hideModalEnhanced('soalModal');
            submitBtn.html(originalText).prop('disabled', false);

            loadData($('#searchInputsoal').val(), currentPage);
        },
        error: function(xhr) {
            submitBtn.html(originalText).prop('disabled', false);

            if (xhr.status === 422 && xhr.responseJSON.errors) {
                let errors = xhr.responseJSON.errors;
                let messages = [];

                for (let field in errors) {
                    if (errors.hasOwnProperty(field)) {
                        messages.push(errors[field].join(', '));
                    }
                }

                showNotification(messages.join(' | '), 'error'); // tampilkan notifikasi
            } else {
                let msg = (xhr.responseJSON && xhr.responseJSON.message) 
                            ? xhr.responseJSON.message 
                            : 'Terjadi kesalahan saat menyimpan data!';
                showNotification(msg, 'error');
            }
        }
    });
});

// Show edit employee modal
$(document).on('click', '.edit-btn', function() {
    isEditMode = true;
    currentSoalsoalId = $(this).data('id');
    resetForm();

    $('#modalTitle').text('Edit Data Tahun akademik');
    $('#modalIcon').removeClass('fa-calendar').addClass('fa-edit');
    $('#submitText').text('Update Data');
    $('#submitIcon').removeClass('fa-save').addClass('fa-edit');

    $.ajax({
        url: '/admin/getpertanyaan/soal/' + currentSoalsoalId,
        type: 'GET',
        success: function(soal) {
            $('#soalId').val(soal.id);
            $('#pertanyaan').val(soal.pertanyaan);
            showModal('soalModal');
        },
        error: function(xhr) {
            console.error("Gagal ambil data:", xhr.responseText);
            alert('Gagal ambil data soal');
        }
    });
});

$(document).on('click', '.delete-btn', function() {
    const id = $(this).data('id');  
    const name = $(this).data('name');
    console.log(name);

    $('#deletesoalId').val(id); 
    $('#deleteSoalsoalName').text(name);

    showModalEnhanced('deleteModal');
});

// Update delete confirmation handler
$(document).on('click', '#confirmDeleteBtn', function() {
    const deleteBtn = $(this);
    const originalText = deleteBtn.html();
    deleteBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...')
             .prop('disabled', true);

    const soalId = $('#deletesoalId').val();

    $.ajax({
        url: `/admin/pertanyaan/soal/${soalId}`, 
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

$(document).on("click", ".goto-soal-btn", function() {
    const id = $(this).data("id");
    window.location.href = `/admin/pilihan/soal/${id}`;
});
