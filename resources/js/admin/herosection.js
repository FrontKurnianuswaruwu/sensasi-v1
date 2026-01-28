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
    const tableHerosection = $('#tableHerosection');
    tableHerosection.empty();

    if (data.length === 0) {
        tableHerosection.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);
        return;
    }

    data.forEach((herosection, index) => {
        const row = `
            <tr class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${index + 1}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                        ${herosection.name.charAt(0)}
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${herosection.name}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
                ${herosection.deskripsi}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all mr-2" data-id="${herosection.id}">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
            </tr>
        `;
        tableHerosection.append(row);
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

    data.forEach((herosection) => {
        const card = `
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
            ${herosection.name.charAt(0)}
            </div>
            <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-semibold text-gray-900 truncate">${herosection.name}</h3>
            </div>
            <div class="space-y-1 text-sm text-gray-600">
                <div class="flex items-center">
                <i class="fas fa-user-tie w-4 mr-2 text-orange-primary"></i>
                <span class="truncate">${herosection.deksripsi || '-'}</span>
                </div>
                <div class="flex mt-4 space-x-2">
                <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${herosection.id}">
                <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${herosection.id}" data-name="${herosection.nama_herosection}">
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
        url: "/admin/getherosection",
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
$('#searchInputherosection').on('input', function() {
    const query = $(this).val();
    currentPage = 1;
    loadData(query, currentPage);
});

// Reset form
function resetForm() {
    $('#herosectionForm')[0].reset();
    $('#herosectionForm input, #herosectionForm select, #herosectionForm textarea').removeClass('border-red-300 bg-red-50');

    $('#herosectionForm input, #herosectionForm select').each(function() {
        $(this).removeClass('border-red-300 bg-red-50');
        hideFieldError(this);
    });

    if (typeof herosectionEditor !== 'undefined' && herosectionEditor) {
        herosectionEditor.setData('');
    } else {
        $('#herosectionDescription').val(''); 
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
    hideModalEnhanced('herosectionModal');
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
        if ($(this).closest('#herosectionModal').length) {
            hideModalEnhanced('herosectionModal');
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
        'herosectionName',
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

let herosectionEditor;
let currentHerosectionId = null;
let isEditMode = false;
// Show add Herosection modal
$('#addSubherosectionBtn').on('click', function() {
    isEditMode = false;
    currentHerosectionId = null;
    resetForm();
    $('#herosectionId').val('');

    $('#modalTitle').text('Tambah Herosection Baru');
    $('#modalIcon').removeClass().addClass('fas fa-plus-circle');
    $('#submitText').text('Simpan Data');
    $('#submitIcon').removeClass('fa-edit').addClass('fa-save');
    showModalEnhanced('herosectionModal');
    
    $('#herosectionIsparent').val('');
});

$(function () {
    ClassicEditor
        .create(document.querySelector('#herosectionDescription'))
        .then(editor => {
            herosectionEditor = editor;
            console.log('CKEditor siap dipakai!');
        })
        .catch(error => {
            console.error(error);
        });

    $('#herosectionForm').on('submit', function (e) {
        e.preventDefault();

        if (!validateForm()) {
            showNotification('Mohon lengkapi semua field yang wajib diisi!', 'error');
            return;
        }

        if (!herosectionEditor) {
            showNotification('Editor belum siap, coba lagi!', 'error');
            return;
        }

        const submitBtn = $('#submitBtn');
        const originalText = submitBtn.html();
        submitBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop('disabled', true);

        const herosectionId = $('#herosectionId').val();

        const formData = new FormData();
        formData.append('name', $('#herosectionName').val());
        formData.append('deskripsi', herosectionEditor.getData());

        let files = $('#herosectionFoto')[0].files;
        for (let i = 0; i < files.length; i++) {
            formData.append('gambar[]', files[i]);
        }

        const url = herosectionId ? `/admin/herosection/${herosectionId}` : '/admin/herosection';
        const method = 'POST';
        if (herosectionId) {
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

                hideModalEnhanced('herosectionModal');
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

// Show edit herosection modal
$(document).on('click', '.edit-btn', function() {
    isEditMode = true;
    currentHerosectionId = $(this).data('id');
    resetForm();

    $('#modalTitle').text('Edit Data Herosection');
    $('#modalIcon').removeClass('fa-bars').addClass('fa-edit');
    $('#submitText').text('Update Data');
    $('#submitIcon').removeClass('fa-save').addClass('fa-edit');

    $.ajax({
        url: '/admin/herosection/' + currentHerosectionId,
        type: 'GET',
        success: function(dataherosection) {
            const herosection = dataherosection.data;
            // **SET FIELD TEXT**
            $('#herosectionId').val(herosection.id);
            $('#herosectionName').val(herosection.name);

            // **SET DESKRIPSI**
            if (herosectionEditor) {
                herosectionEditor.setData(herosection.deskripsi || '');
            } else {
                $('#herosectionDescription').val(herosection.deskripsi);
            }

            // 🔥 RESET PREVIEW FOTO
            $("#previewList").html("");

            // TAMPILKAN DATA FOTO
            if (herosection.herophotos && herosection.herophotos.length > 0) {
                herosection.herophotos.forEach(photo => {
                    $("#previewList").append(`
                        <div class="relative inline-block m-2">
                            <img src="/uploads/herosection/${photo.foto}"
                                class="w-28 h-28 object-cover rounded-lg shadow border" />

                            <button type="button"
                                class="deleteOld absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
                                data-id="${photo.id}">
                                X
                            </button>
                        </div>
                    `);
                });

                $("#previewContainer").removeClass("hidden");
            }


            showModal('herosectionModal');
        },
        error: function(xhr) {
            console.error("Gagal ambil data:", xhr.responseText);
            alert('Gagal ambil data herosection');
        }
    });
});


$(document).on('click', '.delete-btn', function() {
    const id = $(this).data('id');  
    const name = $(this).data('name');

    $('#deleteherosectionId').val(id); 
    $('#deleteHerosectionName').text(name);

    showModalEnhanced('deleteModal');
});

// Update delete confirmation handler
$(document).on('click', '#confirmDeleteBtn', function() {
    const deleteBtn = $(this);
    const originalText = deleteBtn.html();
    deleteBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...')
             .prop('disabled', true);

    const herosectionId = $('#deleteherosectionId').val();

    $.ajax({
        url: `/admin/herosection/${herosectionId}`, 
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

// Multiple preview (ADD, tidak mengganti)
$("#herosectionFoto").on("change", function () {
    const files = this.files;

    $("#previewContainer").removeClass("hidden");

    Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            $("#previewList").append(`
                <div class="relative inline-block m-2 new-photo" data-index="${index}">
                    <img src="${e.target.result}" class="w-28 h-28 object-cover rounded-lg shadow border" />
                    <button type="button" class="removeSingle absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded" data-index="${index}">
                        X
                    </button>
                </div>
            `);
        };
        reader.readAsDataURL(file);
    });
});


// DRAG & DROP
$("#dropzone")
    .on("dragover", function (e) {
        e.preventDefault();
        $(this).addClass("border-blue-primary bg-blue-50");
    })
    .on("dragleave", function () {
        $(this).removeClass("border-blue-primary bg-blue-50");
    })
    .on("drop", function (e) {
        e.preventDefault();
        $(this).removeClass("border-blue-primary bg-blue-50");

        let files = e.originalEvent.dataTransfer.files;
        $("#herosectionFoto")[0].files = files;
        $("#herosectionFoto").trigger("change");
    });

// Hapus satu foto dari preview (sebelum submit)
$(document).on("click", ".removeSingle", function () {
    const index = $(this).data("index");

    let input = $("#herosectionFoto")[0];
    let dt = new DataTransfer();

    Array.from(input.files).forEach((file, i) => {
        if (i !== index) dt.items.add(file);
    });

    input.files = dt.files;

    // HANYA remove foto baru
    $(this).parent().remove();
});


$(document).on("click", ".deleteOld", function () {
    let photoId = $(this).data("id");

    $.ajax({
        url: '/admin/herophoto/' + photoId,
        type: 'DELETE',
        data: {
            _token: $('meta[name="csrf-token"]').attr('content')
        },
        success: function () {
            $("button[data-id='" + photoId + "']").parent().remove();
        }
    });
});

