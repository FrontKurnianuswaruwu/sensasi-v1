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
    const tableKategorisoal = $('#tableKategorisoal');
    tableKategorisoal.empty();

    if (data.length === 0) {
        tableKategorisoal.append(`
            <tr>
                <td colspan="5" class="px-6 py-10 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-300 text-4xl mb-3 block"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);
        return;
    }

    // ===== CEK APAKAH SUDAH ADA KATEGORI SELESAI =====
    const adaKategoriSelesai = data.some(k => 
        k.hasil_ujians && k.hasil_ujians.length > 0 && k.hasil_ujians[0].status === 'selesai'
    );

    data.forEach((kategorisoal, index) => {
        const userId = CURRENT_USER_ID; 
        const loginRole = CURRENT_USER_ROLE;

        let sudahSelesai = false;

        if (kategorisoal.hasil_ujians && kategorisoal.hasil_ujians.length > 0) {
            if (loginRole == 9) {
                sudahSelesai = kategorisoal.hasil_ujians[0].status === 'selesai';
            } else {
                sudahSelesai = kategorisoal.hasil_ujians.some(hasil => hasil.mahasiswa_id === userId && hasil.status === 'selesai');
            }
        }

        let statusKategori = '';
        let actionButton = '';

        if (sudahSelesai) {
            statusKategori = `<span class="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-300">Selesai</span>`;
            actionButton = `
                <span class="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-400 border border-gray-300 rounded-lg cursor-not-allowed shadow-sm">
                    <i class="fas fa-lock mr-1.5"></i> Terkunci
                </span>`;
        } 
        else if (adaKategoriSelesai) { 
            statusKategori = `<span class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300">Terkunci</span>`;
            actionButton = `
                <span class="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-400 border border-gray-300 rounded-lg cursor-not-allowed shadow-sm">
                    <i class="fas fa-lock mr-1.5"></i> Terkunci
                </span>`;
        } 
        else if (kategorisoal.is_active == 1) {
            statusKategori = `<span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">Aktif</span>`;
            actionButton = `
                <a href="/admin/potensiakademik/soal?kategori_id=${kategorisoal.id}" 
                   class="inline-flex items-center px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-sm">
                    <i class="fas fa-play mr-1.5"></i> Kerjakan
                </a>`;
        } 
        else {
            statusKategori = `<span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-300">Tidak Aktif</span>`;
            actionButton = `
                <span class="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-400 border border-gray-300 rounded-lg cursor-not-allowed shadow-sm">
                    <i class="fas fa-ban mr-1.5"></i> Tidak tersedia
                </span>`;
        }

        const avatarChar = kategorisoal.name ? kategorisoal.name.charAt(0).toUpperCase() : '-';

        const row = `
            <tr class="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${index + 1}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-sm">
                                ${avatarChar}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-semibold text-gray-900">${kategorisoal.name}</div>
                            <div class="text-xs text-gray-500">Kategori Soal</div>
                        </div>
                    </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                    ${kategorisoal.waktu_pengerjaan} menit
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${statusKategori}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    ${actionButton}
                </td>
            </tr>
        `;

        tableKategorisoal.append(row);
    });
}

// Render mobile cards khusus kategorisoal (hanya name + aksi edit/hapus)
function renderCards(data) {
    const cardContainer = $('#cardContainer');
    cardContainer.empty();

    if (data.length === 0) {
        cardContainer.append(`
            <div class="p-10 text-center text-gray-500 bg-white rounded-2xl border border-dashed border-gray-300">
                <i class="fas fa-folder-open text-gray-300 text-4xl mb-3 block"></i>
                Tidak ada kategori soal ditemukan
            </div>
        `);
        return;
    }

    // ===== CEK APAKAH SUDAH ADA KATEGORI SELESAI =====
    const adaKategoriSelesai = data.some(k => 
        k.hasil_ujians && k.hasil_ujians.length > 0 && k.hasil_ujians[0].status === 'selesai'
    );

    data.forEach((kategorisoal) => {
        const userId = CURRENT_USER_ID; 
        const loginRole = CURRENT_USER_ROLE;
        let sudahSelesai = false;

        // Logika pengecekan status (Sama dengan tabel)
        if (kategorisoal.hasil_ujians && kategorisoal.hasil_ujians.length > 0) {
            if (loginRole == 9) {
                sudahSelesai = kategorisoal.hasil_ujians[0].status === 'selesai';
            } else {
                sudahSelesai = kategorisoal.hasil_ujians.some(hasil => hasil.mahasiswa_id === userId && hasil.status === 'selesai');
            }
        }

        let statusBadge = '';
        let actionButton = '';

        if (sudahSelesai) {
            statusBadge = `<span class="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-blue-100 text-blue-700 border border-blue-200 uppercase">Selesai</span>`;
            actionButton = `<button disabled class="w-full py-2.5 bg-gray-100 text-gray-400 rounded-xl text-xs font-bold border border-gray-200 cursor-not-allowed uppercase"><i class="fas fa-lock mr-1"></i> Terkunci</button>`;
        } 
        else if (adaKategoriSelesai) { 
            statusBadge = `<span class="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-gray-100 text-gray-600 border border-gray-200 uppercase">Terkunci</span>`;
            actionButton = `<button disabled class="w-full py-2.5 bg-gray-100 text-gray-400 rounded-xl text-xs font-bold border border-gray-200 cursor-not-allowed uppercase"><i class="fas fa-lock mr-1"></i> Terkunci</button>`;
        } 
        else if (kategorisoal.is_active == 1) {
            statusBadge = `<span class="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-green-100 text-green-700 border border-green-200 uppercase">Aktif</span>`;
            actionButton = `
                <a href="/admin/potensiakademik/soal?kategori_id=${kategorisoal.id}" 
                   class="block w-full text-center py-2.5 bg-green-500 text-white rounded-xl text-xs font-bold hover:bg-green-600 shadow-md shadow-green-100 transition-all active:scale-95 uppercase">
                    <i class="fas fa-play mr-1"></i> Kerjakan
                </a>`;
        } 
        else {
            statusBadge = `<span class="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-red-100 text-red-700 border border-red-200 uppercase">Non-Aktif</span>`;
            actionButton = `<button disabled class="w-full py-2.5 bg-gray-50 text-gray-300 rounded-xl text-xs font-bold border border-gray-100 cursor-not-allowed uppercase">Tidak Tersedia</button>`;
        }

        const avatarChar = kategorisoal.name ? kategorisoal.name.charAt(0).toUpperCase() : '?';

        const card = `
            <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-4 transition-all hover:shadow-md">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-sm transform -rotate-3 text-lg">
                            ${avatarChar}
                        </div>
                        <div class="max-w-[160px]">
                            <h3 class="text-sm font-extrabold text-gray-900 truncate uppercase tracking-tight">${kategorisoal.name}</h3>
                            <div class="flex items-center text-[11px] text-gray-400 font-medium mt-0.5">
                                <i class="far fa-clock mr-1"></i> ${kategorisoal.waktu_pengerjaan} Menit
                            </div>
                        </div>
                    </div>
                    ${statusBadge}
                </div>

                <div class="flex space-x-2 mt-2">
                    ${actionButton}
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
        url: "/admin/getkategoripotensiakademik",
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
$('#searchInputkategorisoal').on('input', function() {
    const query = $(this).val();
    currentPage = 1;
    loadData(query, currentPage);
});

// Reset form
function resetForm() {
    $('#kategorisoalForm')[0].reset();
    $('#kategorisoalForm input, #kategorisoalForm select, #kategorisoalForm textarea').removeClass('border-red-300 bg-red-50');
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
    hideModalEnhanced('kategorisoalModal');
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
        if ($(this).closest('#kategorisoalModal').length) {
            hideModalEnhanced('kategorisoalModal');
        } else if ($(this).closest('#deleteModal').length) {
            hideModalEnhanced('deleteModal');
        }
    }
});

$('#cancelDeleteBtn').on('click', function() {
    hideModalEnhanced('deleteModal');
});

let currentKategorisoalId = null;
let isEditMode = false;

// Show add Kategorisoal modal
$('#addKategorisoalBtn').on('click', function() {
    isEditMode = false;
    currentKategorisoalId = null;
    resetForm();
    $('#kategorisoalId').val('');
    
    $('#modalTitle').text('Tambah Kategori Baru');
    $('#modalIcon').removeClass('fa-edit').addClass('fa-layer-group');
    $('#submitText').text('Simpan Data');
    $('#submitIcon').removeClass('fa-edit').addClass('fa-save');
    
    showModalEnhanced('kategorisoalModal');
});


// Form validation
function validateForm() {
    let isValid = true;
    const requiredFields = ['kategorisoalName'];
    
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
$('#kategorisoalForm').on('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        showNotification('Mohon lengkapi semua field yang wajib diisi!', 'error');
        return;
    }

    const submitBtn = $('#submitBtn');
    const originalText = submitBtn.html();
    submitBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop('disabled', true);

    const kategorisoalId = $('#kategorisoalId').val();

    const formData = {
        name: $('#kategorisoalName').val(),
        waktu_pengerjaan: $('#kategorisoalWaktu').val(),
        is_active: $('#kategorisoalStatus').val()
    };

    // Tentukan URL dan method berdasarkan mode
    const url = kategorisoalId ? `/admin/kategorisoal/${kategorisoalId}` : '/admin/kategorisoal';
    const method = kategorisoalId ? 'PUT' : 'POST';

    $.ajax({
        url: url,
        type: method,
        data: JSON.stringify(formData),
        contentType: 'application/json',
        success: function(response) {
            showNotification(response.message, response.status); // response.status = 'success'

            hideModalEnhanced('kategorisoalModal');
            submitBtn.html(originalText).prop('disabled', false);

            loadData($('#searchInputkategorisoal').val(), currentPage);
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
    currentKategorisoalId = $(this).data('id');
    resetForm();

    $('#modalTitle').text('Edit Data Tahun akademik');
    $('#modalIcon').removeClass('fa-calendar').addClass('fa-edit');
    $('#submitText').text('Update Data');
    $('#submitIcon').removeClass('fa-save').addClass('fa-edit');

    $.ajax({
        url: '/admin/kategorisoal/' + currentKategorisoalId,
        type: 'GET',
        success: function(kategorisoal) {
            $('#kategorisoalId').val(kategorisoal.id);
            $('#kategorisoalName').val(kategorisoal.name);
            $('#kategorisoalWaktu').val(kategorisoal.waktu_pengerjaan);
            $('#kategorisoalStatus').val(kategorisoal.is_active ? '1' : '0');

            showModal('kategorisoalModal');
        },
        error: function(xhr) {
            console.error("Gagal ambil data:", xhr.responseText);
            alert('Gagal ambil data kategorisoal');
        }
    });
});

$(document).on('click', '.delete-btn', function() {
    const id = $(this).data('id');  
    const name = $(this).data('name');

    $('#deletekategorisoalId').val(id); 
    $('#deleteKategorisoalName').text(name);

    showModalEnhanced('deleteModal');
});

// Update delete confirmation handler
$(document).on('click', '#confirmDeleteBtn', function() {
    const deleteBtn = $(this);
    const originalText = deleteBtn.html();
    deleteBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...')
             .prop('disabled', true);

    const kategorisoalId = $('#deletekategorisoalId').val();

    $.ajax({
        url: `/admin/kategorisoal/${kategorisoalId}`, 
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