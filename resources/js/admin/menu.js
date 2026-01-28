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
    const tableMenu = $('#tableMenu');
    tableMenu.empty();

    if (data.length === 0) {
        tableMenu.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);
        return;
    }

    data.forEach((menus, index) => {
        const row = `
            <tr class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${index + 1}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                        ${menus.name.charAt(0)}
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${menus.name}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${menus.route || '-'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${menus.icon ? `<i class="${menus.icon}"></i>` : '-'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${menus.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${menus.id}" data-name="${menus.name}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
            </tr>
        `;
        tableMenu.append(row);
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

    data.forEach((menus) => {
        const card = `
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                        ${menus.name.charAt(0)}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-lg font-semibold text-gray-900 truncate mb-2">${menus.name}</h3>
                            <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                                ${menus.icon ? `<i class="${menus.icon}"></i>` : '-'}
                            </span>
                        </div>
                        <div class="flex mt-4 space-x-2">
                            <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${menus.id}">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${menus.id}" data-name="${menus.name}">
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
            loadData(query, currentPage); // renderCards & pagination mobile
        });
        pagination.append(btn);
    }
}

// Ambil data dari server dengan pagination & search
function loadData(query = '', page = 1) {
    $.ajax({
        url: "/admin/getmenus",
        type: "GET",
        data: { search: query, page: page, limit: rowsPerPage },
        dataType: "json",
        success: function(res) {
            const data = res.data;

            if (!Array.isArray(data)) {
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

// Reset form
function resetForm() {
    $('#menuForm')[0].reset();
    $('#menuForm input, #menuForm select, #menuForm textarea').removeClass('border-red-300 bg-red-50');

    $('#menuForm input, #menuForm select').each(function() {
        $(this).removeClass('border-red-300 bg-red-50');
        hideFieldError(this);
    });
}

// search event
$('#searchInputmenu').on('input', function() {
    const query = $(this).val();
    currentPage = 1;
    loadData(query, currentPage);
});

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

function loadUsers(selectedType = '') {
    $.get('/admin/menu/getroles', function(response) {
        const roles = Array.isArray(response.data) ? response.data : [];
        $('#menuType').empty();
        $('#menuType').append('<option value="">Pilih Type</option>');

        roles.forEach(function(role) {
            var selected = role.id == selectedType ? 'selected' : '';
            $('#menuType').append(`<option value="${role.id}" ${selected}>${role.name}</option>`);
        });
    }).fail(function() {
        alert('Gagal mengambil data role. Pastikan API berjalan dengan benar.');
    });
}

$('#closeModal, #cancelBtn').on('click', function() {
    hideModalEnhanced('menuModal');
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
        if ($(this).closest('#menuModal').length) {
            hideModalEnhanced('menuModal');
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
        'menuName',
        'menuType',
        'menuIsparent'
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

// Real-time validation feedback untuk field menuName
$('#menuName').on('blur', function() {
    const value = $(this).val();
    if (!value || !value.trim()) {
        $(this).addClass('border-red-300 bg-red-50');
        showFieldError(this, 'Nama menu wajib diisi');
    } else {
        $(this).removeClass('border-red-300 bg-red-50');
        hideFieldError(this);
    }
});

// Real-time validation feedback untuk field menuRoute
$('#menuRoute').on('blur', function() {
    const value = $(this).val();
    // Optional: validasi minimal panjang route jika diperlukan
    if (value && value.length < 3) {
        $(this).addClass('border-red-300 bg-red-50');
        showFieldError(this, 'Route minimal 3 karakter');
    } else {
        $(this).removeClass('border-red-300 bg-red-50');
        hideFieldError(this);
    }
});

// Real-time validation feedback untuk field menuIcon
$('#menuIcon').on('blur', function() {
    const value = $(this).val();
    // Optional: validasi format icon jika diperlukan
    if (value && value.length < 2) {
        $(this).addClass('border-red-300 bg-red-50');
        showFieldError(this, 'Icon minimal 2 karakter');
    } else {
        $(this).removeClass('border-red-300 bg-red-50');
        hideFieldError(this);
    }
});

// Real-time validation feedback untuk field menuType
$('#menuType').on('change blur', function() {
    const value = $(this).val();
    if (!value) {
        $(this).addClass('border-red-300 bg-red-50');
        showFieldError(this, 'Type menu wajib dipilih');
    } else {
        $(this).removeClass('border-red-300 bg-red-50');
        hideFieldError(this);
    }
});

// Real-time validation feedback untuk field menuIsparent
$('#menuIsparent').on('change blur', function() {
    const value = $(this).val();
    if (!value) {
        $(this).addClass('border-red-300 bg-red-50');
        showFieldError(this, 'Menu Type wajib dipilih');
    } else {
        $(this).removeClass('border-red-300 bg-red-50');
        hideFieldError(this);
    }
});

// Show field-specific error
function showFieldError(field, message) {
    const $field = $(field);
    const errorId = $field.attr('id') + '-error';
    
    // Remove existing error
    $('#' + errorId).remove();
    
    // Add new error message
    $field.after(`<div id="${errorId}" class="text-red-500 text-xs mt-1 animate-pulse"><i class="fas fa-exclamation-circle mr-1"></i>${message}</div>`);
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

let currentMenuId = null;
let isEditMode = false;

// Show add Menu modal
$('#addMenuBtn').on('click', function() {
    isEditMode = false;
    currentMenuId = null;
    resetForm();
    $('#menuId').val('');
    
    $('#modalTitle').text('Tambah Menu Baru');
    $('#modalIcon').removeClass('fa-edit').addClass('fa-bars');
    $('#submitText').text('Simpan Data');
    $('#submitIcon').removeClass('fa-edit').addClass('fa-save');
    loadUsers();
    showModalEnhanced('menuModal');
});

// Handle form submission
$('#menuForm').on('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        showNotification('Mohon lengkapi semua field yang wajib diisi!', 'error');
        return;
    }

    const submitBtn = $('#submitBtn');
    const originalText = submitBtn.html();
    submitBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop('disabled', true);

    const menuId = $('#menuId').val();

    const formData = {
        name: $('#menuName').val(),
        route: $('#menuRoute').val(),
        icon: $('#menuIcon').val(),
        type: $('#menuType').val(),
        isparent: $('#menuIsparent').val()
    };

    // Tentukan URL dan method berdasarkan mode
    const url = menuId ? `/admin/menu/${menuId}` : '/admin/menu';
    const method = menuId ? 'PUT' : 'POST';

    $.ajax({
        url: url,
        type: method,
        data: JSON.stringify(formData),
        contentType: 'application/json',
        success: function(response) {
            showNotification(response.message, response.status); // response.status = 'success'

            hideModalEnhanced('menuModal');
            submitBtn.html(originalText).prop('disabled', false);

            loadData($('#searchInputmenu').val(), currentPage);
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

// Show edit employee modal
$(document).on('click', '.edit-btn', function() {
    isEditMode = true;
    currentMenuId = $(this).data('id');
    resetForm();

    $('#modalTitle').text('Edit Data Menu');
    $('#modalIcon').removeClass('fa-bars').addClass('fa-edit');
    $('#submitText').text('Update Data');
    $('#submitIcon').removeClass('fa-save').addClass('fa-edit');

    $.ajax({
        url: '/admin/menu/' + currentMenuId,
        type: 'GET',
        success: function(menu) {
            $('#menuId').val(menu.id);
            $('#menuName').val(menu.name);
            $('#menuRoute').val(menu.route);
            $('#menuIcon').val(menu.icon);
            loadUsers(menu.type);
            $('#menuIsparent').val(menu.is_parent);
            showModal('menuModal');
        },
        error: function(xhr) {
            console.error("Gagal ambil data:", xhr.responseText);
            alert('Gagal ambil data menu');
        }
    });
});

$(document).on('click', '.delete-btn', function() {
    const id = $(this).data('id');  
    const name = $(this).data('name');

    $('#deletemenuId').val(id); 
    $('#deleteMenuName').text(name);

    showModalEnhanced('deleteModal');
});

// Update delete confirmation handler
$(document).on('click', '#confirmDeleteBtn', function() {
    const deleteBtn = $(this);
    const originalText = deleteBtn.html();
    deleteBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...')
             .prop('disabled', true);

    const menuId = $('#deletemenuId').val();

    $.ajax({
        url: `/admin/menu/${menuId}`, 
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