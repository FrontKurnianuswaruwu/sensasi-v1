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
    const tableSejarah = $('#tableSejarah');
    tableSejarah.empty();

    if (data.length === 0) {
        tableSejarah.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);
        return;
    }

    data.forEach((sejarah, index) => {
        const cleanDeskripsi = sejarah.deskripsi ? sejarah.deskripsi.replace(/<[^>]+>/g, '').trim() : '';
        // ambil karakter pertama dari deskripsi yang sudah dibersihkan
        const firstChar = cleanDeskripsi ? cleanDeskripsi.charAt(0) : '';
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
                    <div class="text-sm font-medium text-gray-900">${sejarah.deskripsi || '-'}</div>
                </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${sejarah.id}">
                <i class="fas fa-edit"></i>
                </button>
            </td>
            </tr>
        `;
        tableSejarah.append(row);
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

    data.forEach((sejarah) => {
        const cleanDeskripsi = sejarah.deskripsi ? sejarah.deskripsi.replace(/<[^>]+>/g, '').trim() : '';
        // ambil karakter pertama dari deskripsi yang sudah dibersihkan
        const firstChar = cleanDeskripsi ? cleanDeskripsi.charAt(0) : '';
        const card = `
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                        ${firstChar}
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-2">
                        <h3 class="text-lg font-semibold text-gray-900 truncate">${sejarah.deskripsi}</h3>
                    </div>
                    <div class="flex mt-4 space-x-2">
                        <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${sejarah.id}">
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
        url: "/admin/getsejarah",
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
$('#searchInputsejarah').on('input', function() {
    const query = $(this).val();
    currentPage = 1;
    loadData(query, currentPage);
});

// Reset form
function resetForm() {
    $('#sejarahForm')[0].reset();
    $('#sejarahForm input, #sejarahForm select, #sejarahForm textarea').removeClass('border-red-300 bg-red-50');

    $('#sejarahForm input, #sejarahForm select').each(function() {
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
    hideModalEnhanced('sejarahModal');
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
        if ($(this).closest('#sejarahModal').length) {
            hideModalEnhanced('sejarahModal');
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

    // Ambil isi CKEditor
    const deskripsi = sejarahEditor.getData().trim();

    if (!deskripsi) {
        // tambahin kelas error ke editor container
        $('#sejarahDeskripsi').next('.ck-editor').addClass('border border-red-300 bg-red-50 rounded');
        isValid = false;
    } else {
        $('#sejarahDeskripsi').next('.ck-editor').removeClass('border border-red-300 bg-red-50');
    }

    return isValid;
}


$("#sejarahFoto").on("change", function () {
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

// Preview multiple images
$("#sejarahFoto").on("change", function () {
    const files = this.files;
    const previewList = $("#previewList");
    previewList.empty();

    if (files.length > 0) {
        $("#previewContainer").removeClass("hidden");

        Array.from(files).forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                const previewItem = $(`
                    <div class="relative">
                        <img src="${e.target.result}" class="w-32 h-32 object-cover rounded-lg shadow-md border" />
                        <button type="button" data-index="${index}" class="removeBtn absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded hover:bg-red-600">X</button>
                    </div>
                `);
                previewList.append(previewItem);
            };
            reader.readAsDataURL(file);
        });
    } else {
        $("#previewContainer").addClass("hidden");
    }
});

// Hapus foto individual
$(document).on("click", ".removeBtn", function () {
    const index = $(this).data("index");
    const input = document.getElementById("sejarahFoto");
    const dt = new DataTransfer();

    Array.from(input.files).forEach((file, i) => {
        if (i !== index) {
            dt.items.add(file);
        }
    });

    input.files = dt.files;
    $(this).parent().remove();

    if (input.files.length === 0) {
        $("#previewContainer").addClass("hidden");
    }
});

// Drag & drop functionality
$("#dropzone").on("drop", function (e) {
    e.preventDefault();
    const files = e.originalEvent.dataTransfer.files;
    $("#sejarahFoto")[0].files = files;
    $("#sejarahFoto").trigger("change");
}).on("dragleave", function () {
    $(this).removeClass("border-blue-primary bg-blue-50");
}).on("dragover", function (e) {
    e.preventDefault();
    $(this).addClass("border-blue-primary bg-blue-50");
});



let sejarahEditor;
let currentSejarahId = null;
let isEditMode = false;
// Show add Sejarah modal


$(function () {
    ClassicEditor
    .create(document.querySelector('#sejarahDeskripsi'))
    .then(editor => {
        sejarahEditor = editor;
        console.log('CKEditor siap dipakai!');
    })
    .catch(error => {
        console.error(error);
    });
    $('#sejarahForm').on('submit', function (e) {
        e.preventDefault();

        if (!validateForm()) {
            showNotification('Mohon lengkapi semua field yang wajib diisi!', 'error');
            return;
        }

        const submitBtn = $('#submitBtn');
        const originalText = submitBtn.html();
        submitBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop('disabled', true);

        const sejarahId = $('#sejarahId').val();

        const formData = new FormData();
        formData.append('deskripsi', sejarahEditor.getData());

        const fileInput = $('#sejarahFoto')[0];
        if (fileInput.files.length > 0) {
            Array.from(fileInput.files).forEach((file, index) => {
                formData.append('foto[]', file);
            });
        } else {
            formData.append('oldFoto', $('#oldFoto').val());
        }

        const url = sejarahId ? `/admin/sejarah/${sejarahId}` : '/admin/sejarah';
        const method = 'POST';
        if (sejarahId) {
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

                hideModalEnhanced('sejarahModal');
                submitBtn.html(originalText).prop('disabled', false);

                loadData($('#searchInputsejarah').val(), currentPage);
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
    currentSejarahId = $(this).data('id');
    resetForm();

    $('#modalTitle').text('Edit Data Sejarah');
    $('#modalIcon').removeClass('fa-bars').addClass('fa-history');
    $('#submitText').text('Update Data');
    $('#submitIcon').removeClass('fa-save').addClass('fa-edit');

    $.ajax({
        url: '/admin/sejarah/' + currentSejarahId,
        type: 'GET',
        success: function(sejarah) {
            $('#sejarahId').val(sejarah.id);
            if (sejarahEditor) {
                sejarahEditor.setData(sejarah.deskripsi || '');
            } else {
                $('#sejarahDeskripsi').val(sejarah.deskripsi);
            }

            // Reset preview
            const previewList = $("#previewList");
            previewList.empty();

            if (sejarah.fotos && sejarah.fotos.length > 0) {
                $("#previewContainer").removeClass("hidden");

                sejarah.fotos.forEach(function(foto) {
                    const previewItem = $(`
                        <div class="relative">
                            <img src="/${foto.foto}"
                                class="w-32 h-32 object-cover rounded-lg shadow-md border" />
                        </div>
                    `);
                    previewList.append(previewItem);
                });
            } else {
                $("#previewContainer").addClass("hidden");
            }

            showModal('sejarahModal');
        },
        error: function(xhr) {
            console.error("Gagal ambil data:", xhr.responseText);
            alert('Gagal ambil data sejarah');
        }
    });
});
