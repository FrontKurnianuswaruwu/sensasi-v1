import $ from 'jquery';
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'orange-primary': '#FF6B35',
                'orange-light': '#FF8A65',
                'blue-primary': '#1E40AF',
                'blue-light': '#3B82F6'
            }
        }
    }
}
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});


let currentPage = 1;
const rowsPerPage = 10;

// Render desktop table
function renderTable(data) {
    const tableBody = $('#tableBody');
    tableBody.empty();

    if (data.length === 0) {
        tableBody.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);
        return;
    }

    data.forEach((employee, index) => {
        const statusClass = employee.user?.status_user === 'Aktif'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';

        const row = `
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${index + 1}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                                ${employee.user?.name.charAt(0)}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${employee.user?.name}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${employee.user?.akademik?.mitra?.nama_mitra || '-'}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${employee.user?.email}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">
                        ${employee.user?.status_user}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${
                        employee.user.status_user !== 'Tidak Aktif'
                        ? `
                            <button class="detail-btn px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all mr-2" 
                                data-id="${employee.id}" title="Lihat Detail">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="alumni-btn px-3 py-1 text-blue-600 hover:text-blue-800 transition-all"
                                title="Set Alumni" data-id="${employee.user?.id}" data-name="${employee.user.name}">
                                <i class="fas fa-user-graduate text-xl"></i>
                            </button>
                        `
                        : `
                            <i class="fas fa-lock text-gray-400 text-xl" title="Aksi tidak tersedia"></i>
                        `
                    }
                </td>
            </tr>
        `;
        tableBody.append(row);
    });
}

// Render mobile cards
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

    data.forEach((employee) => {
        // Penyesuaian pengecekan status sesuai struktur data desktop
        const statusUser = employee.user?.status_user;
        const statusClass = statusUser === 'Aktif'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';

        const card = `
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg shadow-sm">
                        ${employee.user?.name ? employee.user.name.charAt(0) : '?'}
                    </div>
                    
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-1">
                            <h3 class="text-base font-bold text-gray-900 truncate">
                                ${employee.user?.name || '-'}
                            </h3>
                            <span class="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">
                                ${statusUser || '-'}
                            </span>
                        </div>
                        
                        <div class="space-y-1 text-sm text-gray-600">
                            <div class="flex items-center">
                                <i class="fas fa-university w-4 mr-2 text-blue-500"></i>
                                <span class="truncate">${employee.user?.akademik?.mitra?.nama_mitra || '-'}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-envelope w-4 mr-2 text-orange-primary"></i>
                                <span class="truncate">${employee.user?.email || '-'}</span>
                            </div>
                        </div>

                        <div class="flex mt-4 space-x-2">
                            ${statusUser !== 'Tidak Aktif' ? `
                                <button class="detail-btn flex-1 flex items-center justify-center px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-all" 
                                    data-id="${employee.id}">
                                    <i class="fas fa-eye mr-2"></i> Detail
                                </button>
                                <button class="alumni-btn flex-1 flex items-center justify-center px-3 py-2 border border-blue-600 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-all"
                                    data-id="${employee.user?.id}" data-name="${employee.user?.name}">
                                    <i class="fas fa-user-graduate mr-2"></i> Alumni
                                </button>
                            ` : `
                                <div class="flex-1 flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-400 text-sm rounded-lg italic">
                                    <i class="fas fa-lock mr-2"></i> Akses Terkunci
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardContainer.append(card);
    });
}

// Ambil data dari server dengan pagination & search
function loadData(query = '', page = 1) {
    $.ajax({
        url: "/admin/getpbsaktif",
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


// search event
$('#searchInputuser').on('input', function() {
    const query = $(this).val();
    currentPage = 1;
    loadData(query, currentPage);
});

// initial load
$(function() {
   loadData();
});

let currentEmployeeId = null;
let isEditMode = false;

// Show modal with animation
function showModal(modalId) {
    const modal = $('#' + modalId);
    modal.removeClass('hidden');
    setTimeout(() => {
        modal.find('.modal-content').addClass('show');
    }, 10);
    $('body').addClass('overflow-hidden');
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

// Reset form
function resetForm() {
    $('#employeeForm')[0].reset();
    $('#employeeForm input, #employeeForm select, #employeeForm textarea').removeClass('border-red-300');
}
// Close modal with Escape key
$(document).keydown(function(e) {
    if (e.keyCode === 27) { // Escape key
        if (!$('#employeeModal').hasClass('hidden')) {
            hideModal('employeeModal');
        } else if (!$('#alumniModal').hasClass('hidden')) {
            hideModal('alumniModal');
        }
    }
});

// Form validation
function validateForm() {
    let isValid = true;
    const requiredFields = ['employeeName', 'employeeEmail', 'password'];
    
    requiredFields.forEach(function(fieldId) {
        const field = $('#' + fieldId);
        if (!field.val().trim()) {
            field.addClass('border-red-300 bg-red-50');
            isValid = false;
        } else {
            field.removeClass('border-red-300 bg-red-50');
        }
    });

    // Email validation
    const email = $('#employeeEmail').val();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        $('#employeeEmail').addClass('border-red-300 bg-red-50');
        isValid = false;
    }

    return isValid;
}

// Handle form submission
$('#employeeForm').on('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        showNotification('Mohon lengkapi semua field yang wajib diisi!', 'error');
        return;
    }

    const submitBtn = $('#submitBtn');
    const originalText = submitBtn.html();
    submitBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop('disabled', true);

    const employeeId = $('#employeeId').val();

    const formData = {
        name: $('#employeeName').val(),
        email: $('#employeeEmail').val(),
        password: $('#password').val(),
        status: $('#employeeStatus').val(),
        role: $('#employeeRole').val(),
    };

    // Tentukan URL dan method berdasarkan mode
    const url = employeeId ? `/user/${employeeId}` : '/user';
    const method = employeeId ? 'PUT' : 'POST';

    $.ajax({
        url: url,
        type: method,
        data: JSON.stringify(formData),
        contentType: 'application/json',
        success: function(response) {
            showNotification(response.message, response.status); // response.status = 'success'

            hideModalEnhanced('employeeModal');
            submitBtn.html(originalText).prop('disabled', false);

            loadData($('#searchInputuser').val(), currentPage);
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

// Auto-focus on first input when modal opens
$('#employeeModal').on('shown', function() {
    $('#employeeName').focus();
});

// Form field animations and feedback
$('#employeeForm input, #employeeForm select, #employeeForm textarea').on('focus', function() {
    $(this).removeClass('border-red-300 bg-red-50');
});

// Real-time validation feedback
$('#employeeEmail').on('blur', function() {
    const email = $(this).val();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        $(this).addClass('border-red-300 bg-red-50');
        showFieldError(this, 'Format email tidak valid');
    } else {
        $(this).removeClass('border-red-300 bg-red-50');
        hideFieldError(this);
    }
});

$('#password').on('blur', function() {
    const password = $(this).val();
    if (password && password.length < 6) {
        $(this).addClass('border-red-300 bg-red-50');
        showFieldError(this, 'Password harus minimal 6 karakter');
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


// Enhanced mobile experience
function adjustModalForMobile() {
    if ($(window).width() < 640) {
        $('.modal-content').addClass('mx-4 max-h-[95vh]');
    } else {
        $('.modal-content').removeClass('mx-4 max-h-[95vh]');
    }
}

// Handle window resize
$(window).on("resize", function() {
    adjustModalForMobile();
});


// Initial mobile adjustment
adjustModalForMobile();

// Prevent modal body scroll when modal is open
function preventBodyScroll() {
    $('body').css({
        'overflow': 'hidden',
        'padding-right': '15px' // Prevent layout shift
    });
}

function restoreBodyScroll() {
    $('body').css({
        'overflow': '',
        'padding-right': ''
    });
}

// Enhanced modal show/hide with body scroll prevention
function showModalEnhanced(modalId) {
    showModal(modalId);
    preventBodyScroll();
}

function hideModalEnhanced(modalId) {
    hideModal(modalId);
    restoreBodyScroll();
}

function loadRoles(selectedType = '') {
    $.get('/admin/menu/getroles', function(response) {
        const roles = Array.isArray(response.data) ? response.data : [];
        $('#employeeRole').empty();
        $('#employeeRole').append('<option value="">Pilih Role</option>');

        roles.forEach(function(role) {
            var selected = role.id == selectedType ? 'selected' : '';
            $('#employeeRole').append(`<option value="${role.id}" ${selected}>${role.name}</option>`);
        });
    }).fail(function() {
        alert('Gagal mengambil data role. Pastikan API berjalan dengan benar.');
    });
}

// Show add employee modal
$('#addEmployeeBtn').on('click', function() {
    isEditMode = false;
    currentEmployeeId = null;
    resetForm();
    
    $('#modalTitle').text('Tambah User Baru');
    $('#modalIcon').removeClass('fa-edit').addClass('fa-user-plus');
    $('#submitText').text('Simpan Data');
    $('#submitIcon').removeClass('fa-edit').addClass('fa-save');
    loadRoles();

    showModalEnhanced('employeeModal');
});

// Show edit employee modal
$(document).on('click', '.edit-btn', function() {
    isEditMode = true;
    currentEmployeeId = $(this).data('id');
    resetForm();

    $('#modalTitle').text('Edit Data User');
    $('#modalIcon').removeClass('fa-user-plus').addClass('fa-edit');
    $('#submitText').text('Update Data');
    $('#submitIcon').removeClass('fa-save').addClass('fa-edit');

    $.ajax({
        url: '/admin/user/' + currentEmployeeId,
        type: 'GET',
        success: function(employee) {
            $('#employeeId').val(employee.id);
            $('#employeeName').val(employee.name);
            $('#employeeEmail').val(employee.email);
            $('#employeeStatus').val(employee.status_user);
            loadRoles(employee.role);
            $('#employeeJoinDate').val(employee.join_date || '');
            $('#employeeSalary').val(employee.salary || '');
            $('#employeeAddress').val(employee.address || '');

            showModal('employeeModal');
        },
        error: function(xhr) {
            console.error("Gagal ambil data:", xhr.responseText);
            alert('Gagal ambil data user');
        }
    });
});

// Update close handlers
$('#closeModal, #cancelBtn').on('click', function() {
    hideModalEnhanced('employeeModal');
});

$('#cancelAlumniBtn').on('click', function() {
    hideModalEnhanced('alumniModal');
});

$('#cancelMahasiswaBtn').on('click', function() {
    hideModalEnhanced('detailMahasiswaModal');
});


// Close modal when clicking outside
$('.modal-overlay').on('click', function(e) {
    if (e.target === this) {
        if ($(this).closest('#employeeModal').length) {
            hideModalEnhanced('employeeModal');
        } else if ($(this).closest('#alumniModal').length) {
            hideModalEnhanced('alumniModal');
        } else if ($(this).closest('#detailMahasiswaModal').length) {
            hideModalEnhanced('detailMahasiswaModal');
        }
    }
});

$(document).on("click", ".alumni-btn", function () {
    const id = $(this).data("id");
    const name = $(this).data("name");

    $("#alumniUserId").val(id);
    $("#alumniUserName").text(name);

    showModalEnhanced('alumniModal');
});

$(document).on('click', '#confirmAlumniBtn', function() {
    const approveBtn = $(this);
    const originalText = approveBtn.html();
    approveBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...')
             .prop('disabled', true);

    const alumniuserId = $('#alumniUserId').val();

    $.ajax({
        url: `/admin/confirmalumni/${alumniuserId}`,
        type: 'PUT',
        success: function(response) {
            showNotification(response.message , response.status);
            hideModalEnhanced('alumniModal');
            loadData();
        },
        error: function(xhr) {
            let msg = (xhr.responseJSON && xhr.responseJSON.message) 
                        ? xhr.responseJSON.message 
                        : 'Gagal menyimpan data!';
            showNotification(msg, 'error');
        },
        complete: function() {
            approveBtn.html(originalText).prop('disabled', false);
        }
    });
});

$(document).on('click', '.detail-btn', function() {
    const mahasiswaId = $(this).data('id');
    
    showModalEnhanced('detailMahasiswaModal');

    $.ajax({
        url: `/admin/mahasiswa/detail/${mahasiswaId}`,
        type: 'GET',
        success: function(res) {
            $('#detail_nama_mahasiswa').text(res.user.name);
            $('#detail_nim').text('NIM: ' + res.nim);
            $('#det_jk').text(res.jenis_kelamin);
            $('#det_email').text(res.user.email);
            $('#det_agama').text(res.agama);
            $('#det_telp').text(res.no_wa);
            $('#det_alamat').text(res.alamat_ktp);
            $('#det_semester').text(res.user.akademik.semester);
            $('#det_ipk').text(res.user.akademik.ip_terakhir);
            $('#det_status').text(res.user.status_user);
            $('#det_ayah_nama').text(res.user.orangtua.nama_ayah);
            $('#det_ayah_kerja').text(res.user.orangtua.pekerjaan_ayah);
            $('#det_ibu_nama').text(res.user.orangtua.nama_ibu);
            $('#det_ibu_kerja').text(res.user.orangtua.pekerjaan_ibu);
            $('#det_tgllahir').text(formatTanggal(res.tanggal_lahir));
            $('#det_universitas').text(res.mitra.nama_mitra);
            $('#det_ayah_gaji').text(formatRupiah(res.user.orangtua.penghasilan_ayah));
            $('#det_ibu_gaji').text(formatRupiah(res.user.orangtua.penghasilan_ibu));
            $('#det_ortu_telp').text(res.user.orangtua.no_wa_ortu);
            $('#det_tanggungan').text(res.user.orangtua.jumlah_tanggungan);

            const fotoProfilElement = $('#detail_foto_profil');
    
            // Ambil dari variabel window yang kita buat di Blade
            const defaultFoto = window.defaultAvatar; 

            fotoProfilElement.off('error'); 

            if (res.foto) {
                // Gabungkan origin dengan path dari database
                const fotoUrl = window.location.origin + '/' + res.foto;

                fotoProfilElement.one('error', function() {
                    $(this).attr('src', defaultFoto);
                }).attr('src', fotoUrl);
            } else {
                fotoProfilElement.attr('src', defaultFoto);
            }

            const docContainer = $('#document-list');
            docContainer.empty();

            const docFields = [
                { field: 'scan_ktp', label: 'Scan KTP' },
                { field: 'scan_kartu_mahasiswa', label: 'Kartu Mahasiswa' },
                { field: 'scan_kk', label: 'Kartu Keluarga' },
                { field: 'transkrip_nilai', label: 'Transkrip Nilai' },
                { field: 'surat_keterangan_aktif', label: 'Surat Aktif' },
                { field: 'essay_motivasi', label: 'Essay Motivasi' }
            ];

            const dokumen = res.user.dokumen;    

            if (dokumen) {
                docFields.forEach(item => {
                    const filePath = dokumen[item.field];
                    if (filePath) {
                        const fullUrl = window.location.origin + '/' + filePath;
                        
                        const docHtml = `
                            <a href="${fullUrl}" target="_blank" class="flex items-center p-3 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition group">
                                <div class="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-600 group-hover:text-white transition">
                                    <i class="fas fa-file-pdf"></i>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-xs text-gray-400 uppercase font-bold">${item.label}</span>
                                    <span class="text-sm font-medium text-gray-700 truncate max-w-[150px]">Lihat Dokumen</span>
                                </div>
                            </a>
                        `;
                        docContainer.append(docHtml);
                    }
                });
            } else {
                docContainer.append('<p class="text-gray-500 italic text-sm">Belum ada dokumen yang diunggah.</p>');
            }
        },
        error: function() {
            showNotification('Gagal mengambil data detail', 'error');
        }
    });
});

$(document).on('click', '.tab-btn', function() {
    const targetTab = $(this).data('tab');

    $('.tab-btn').removeClass('active-tab border-blue-700 text-blue-700')
                    .addClass('border-transparent text-gray-500');
    
    $(this).addClass('active-tab border-blue-700 text-blue-700')
            .removeClass('border-transparent text-gray-500');

    $('.tab-content').addClass('hidden'); 
    $('#' + targetTab).removeClass('hidden');
});

$(document).on('click', '.detail-btn', function() {
    $('.tab-btn[data-tab="tab-biodata"]').trigger('click');
});