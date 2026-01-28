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
    const tableNilai = $('#tableNilai');
    tableNilai.empty();

    if (data.length === 0) {
        tableNilai.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);
        return;
    }

    data.forEach((nilai, index) => {
        const getSemesterLabel = (semester) => {
            const semesterNum = parseInt(semester);
            if (semesterNum >= 1 && semesterNum <= 8) {
            return `Semester ${semesterNum}`;
            }
            return semester || '-';
        };

        const row = `
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${index + 1}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                            ${nilai.tahunakademik.tahun_akademik.charAt(0)}
                            </div>
                            </div>
                            <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${nilai.tahunakademik.tahun_akademik}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${getSemesterLabel(nilai.semester)}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${nilai.ip_semester || '-'}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                        <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${nilai.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                    <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${nilai.id}" data-name="${nilai.semester}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        tableNilai.append(row);
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

    data.forEach((nilai) => {
        const card = `
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                        ${nilai.semester.charAt(0)}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-lg font-semibold text-gray-900 truncate">${nilai.semester}</h3>
                            <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                                ${nilai.ip_semester || '-'}
                            </span>
                        </div>
                        <div class="space-y-1 text-sm text-gray-600">
                            <div class="flex items-center">
                                <i class="fas fa-calendar-alt w-4 mr-2 text-orange-primary"></i>
                                <span>${nilai.tahunakademik.tahun_akademik}</span>
                            </div>
                            <div class="flex mt-4 space-x-2">
                                <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${nilai.id}">
                                    <i class="fas fa-edit"></i> Edit
                                </button>
                                <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${nilai.id}" data-name="${nilai.semester}">
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

function loadMitra(selectedType = '') {
    $.get('/admin/biodata/getmitra', function(response) {
        const mitras = Array.isArray(response.data) ? response.data : [];
        $('#universitas').empty();
        $('#universitas').append('<option value="">Pilih Universitas</option>');

        mitras.forEach(function(mitra) {
            var selected = mitra.id == selectedType ? 'selected' : '';
            $('#universitas').append(`<option value="${mitra.id}" ${selected}>${mitra.nama_mitra}</option>`);
        });
    }).fail(function() {
        alert('Gagal mengambil data tahun akademik. Pastikan API berjalan dengan benar.');
    });
}

function loadTahunAkademik(selectedType = '') {
    $.get('/admin/biodata/gettahunakademik', function(response) {
        const tahunakademiks = Array.isArray(response.data) ? response.data : [];
        $('#tahun_akademik_id').empty();
        $('#tahun_akademik_id').append('<option value="">Pilih Tahun Akademik</option>');
        console.log(selectedType);
        tahunakademiks.forEach(function(tahunakademik) {
            var selected = tahunakademik.id == selectedType ? 'selected' : '';
            $('#tahun_akademik_id').append(`<option value="${tahunakademik.id}" ${selected}>${tahunakademik.tahun_akademik}</option>`);
        });
    }).fail(function() {
        alert('Gagal mengambil data tahun akademik. Pastikan API berjalan dengan benar.');
    });
}

// Ambil data dari server dengan pagination & search
function loadData(query = '', page = 1) {
    $.ajax({
        url: "/admin/getnilaisemester",
        type: "GET",
        data: { search: query, page: page, limit: rowsPerPage },
        dataType: "json",
        success: function(res) {
            const data = res.data;
            const akademiks = res.akademik_mahasiswa;

            if (!Array.isArray(data)) {
                console.error("Response data bukan array:", data);
                return;
            }

            renderTable(data);
            renderCards(data);
            renderPagination(res.last_page, query);
            renderPaginationMobile(res.last_page, query);

            // panggil loadMitra sambil kirim user_id mahasiswa
            loadMitra(akademiks.mitra_id);
            loadTahunAkademik();
            if (data.length > 0 && data[0].mahasiswa) {
                $('#mahasiswa_id').val(data[0].mahasiswa.id);
            }

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
$('#searchInputnilai').on('input', function() {
    const query = $(this).val();
    currentPage = 1;
    loadData(query, currentPage);
});

// Reset form
function resetForm() {
    $('#nilaiForm')[0].reset();
    $('#nilaiForm input, #nilaiForm select, #nilaiForm textarea').removeClass('border-red-300 bg-red-50');

    $('#nilaiForm input, #nilaiForm select').each(function() {
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
    hideModalEnhanced('nilaiModal');
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
        if ($(this).closest('#nilaiModal').length) {
            hideModalEnhanced('nilaiModal');
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
        'semester',
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

$("#khsFoto").on("change", function () {
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
    $("#khsFoto")[0].files = files;
    $("#khsFoto").trigger("change");
})
.on("dragleave", function () {
    $(this).removeClass("border-blue-primary bg-blue-50");
})
.on("drop", function (e) {
    e.preventDefault();
    const files = e.originalEvent.dataTransfer.files;
    $("#khsFoto")[0].files = files;
    $("#khsFoto").trigger("change");
});

$("#removeFoto").on("click", function () {
    let khsId = $("#khsId").val();

    if (!khsId) {
        showNotification("ID Alumni tidak ditemukan.");
        return;
    }

    $.ajax({
        url: '/khs/deleteFoto', 
        type: 'POST',
        data: { id: khsId },
        success: function (response) {
            if (response.success) {
                $("#khsFoto").val("");
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

let currentNilaiId = null;
let isEditMode = false;
// Show add Nilai modal
$('#addSubnilaiBtn').on('click', function() {
    isEditMode = false;
    currentNilaiId = null;
    resetForm();
    $('#nilaiId').val('');

    $('#modalTitle').text('Tambah Nilai Baru');
    $('#modalIcon').removeClass().addClass('fas fa-newspaper');
    $('#submitText').text('Simpan Data');
    $('#submitIcon').removeClass('fa-edit').addClass('fa-save');

    showModalEnhanced('nilaiModal');
    
    $('#nilaiIsparent').val('');
});

$(function () {

    $('#nilaiForm').on('submit', function (e) {
        e.preventDefault();

        if (!validateForm()) {
            showNotification('Mohon lengkapi semua field yang wajib diisi!', 'error');
            return;
        }

        const submitBtn = $('#submitBtn');
        const originalText = submitBtn.html();
        submitBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop('disabled', true);

        const nilaiId = $('#nilaiId').val();

        const formData = new FormData();
        formData.append('semester', $('#semester').val());
        formData.append('tahun_akademik_id', $('#tahun_akademik_id').val());
        formData.append('ip_semester', $('#ip_semester').val());
        formData.append('mahasiswa_id', $('#mahasiswa_id').val());

        const fileInput = $('#khsFoto')[0];
        if (fileInput.files.length > 0) {
            formData.append('foto', fileInput.files[0]); 
        } else {
            formData.append('oldFoto', $('#oldFoto').val());
        }

        const url = nilaiId ? `/admin/nilaisemester/${nilaiId}` : '/admin/nilaisemester';
        const method = 'POST';
        if (nilaiId) {
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

                hideModalEnhanced('nilaiModal');
                submitBtn.html(originalText).prop('disabled', false);

                loadData($('#searchInputnilai').val(), currentPage);
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
    currentNilaiId = $(this).data('id');
    resetForm();

    $('#modalTitle').text('Edit Data Nilai');
    $('#modalIcon').removeClass().addClass('fas fa-graduation-cap');
    $('#submitText').text('Update Data');
    $('#submitIcon').removeClass('fa-save').addClass('fa-edit');

    $.ajax({
        url: '/admin/nilaisemester/' + currentNilaiId,
        type: 'GET',
        success: function(nilai) {
            $('#nilaiId').val(nilai.id);
            $('#semester').val(nilai.semester);
            $('#ip_semester').val(nilai.ip_semester);

            if (nilai.khs_file) {
                $('#preview').attr('src', '/' + nilai.khs_file);
                $('#previewContainer').removeClass('hidden');
                $('#oldFoto').val(nilai.khs_file);
            } else {
                $('#preview').attr('src', '');
                $('#previewContainer').addClass('hidden');
                $('#oldFoto').val('');
            }
            loadTahunAkademik(nilai.tahun_akademik_id);

            showModal('nilaiModal');
        },
        error: function(xhr) {
            console.error("Gagal ambil data:", xhr.responseText);
            alert('Gagal ambil data nilai');
        }
    });
});

$(document).on('click', '.delete-btn', function() {
    const id = $(this).data('id');  
    const name = $(this).data('name');

    $('#deletenilaiId').val(id); 
    $('#deleteNilaiName').text(name);

    showModalEnhanced('deleteModal');
});

// Update delete confirmation handler
$(document).on('click', '#confirmDeleteBtn', function() {
    const deleteBtn = $(this);
    const originalText = deleteBtn.html();
    deleteBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...')
             .prop('disabled', true);

    const nilaid = $('#deletenilaiId').val();

    $.ajax({
        url: `/admin/nilaisemester/${nilaid}`, 
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

$("#removeFoto").on("click", function () {
    let nilaiId = $("#nilaiId").val();

    $.ajax({
        url: '/nilaisemester/deleteFoto', 
        type: 'POST',
        data: { id: nilaiId },
        success: function (response) {
            if (response.success) {
                $("#khsFoto").val("");
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
$('#semester').on('change', function () {
    const semester = $(this).val();

    if (!semester) return;

    $.ajax({
        url: '/admin/get-semester-sebelumnya',
        type: 'GET',
        data: { semester: semester },
        success: function (res) {

            if (res.status === false) {
                $('#semester').val(''); 
                $('#pengajuandanaIpsemester').val('');
                showNotification(res.message, 'error');
                return;
            }

            if (res.status === true) {
                showNotification(res.message, 'success');

                console.log('Semester terakhir:', res.last_semester);
            }
        },
        error: function () {
            $('#pengajuandanaIpsemester').val('');
            showNotification('Gagal memvalidasi semester', 'error');
        }
    });
});
