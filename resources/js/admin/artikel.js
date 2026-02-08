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
    const tableArtikel = $('#tableArtikel');
    tableArtikel.empty();

    if (data.length === 0) {
        tableArtikel.append(`
            <tr>
                <td colspan="5" class="px-6 py-10 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-300 text-4xl mb-3 block"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);
        return;
    }

    data.forEach((artikel, index) => {
        // ===== STATUS BADGE =====
        let statusBadge = '';
        switch (artikel.status) {
            case 'pending':
                statusBadge = `<span class="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">Pending</span>`;
                break;
            case 'approved':
                statusBadge = `<span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">Approved</span>`;
                break;
            case 'rejected':
                statusBadge = `<span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-300">Rejected</span>`;
                break;
            default:
                statusBadge = `<span class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300">Unknown</span>`;
        }

        // ===== ACTION BUTTONS =====
        let actionButtons = '';

        if (artikel.role === 9) {
            actionButtons = `
                <span class="inline-flex items-center px-3 py-1.5 text-gray-400 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed shadow-sm" 
                    title="Data terkunci untuk role 9">
                    <i class="fas fa-lock mr-1.5"></i> Terkunci
                </span>
            `;
        } else {
            const approveButton = !artikel.has_biodata
                ? `<button class="approve-btn inline-flex items-center px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-sm mr-2" 
                        data-id="${artikel.id}" title="Approve">
                        <i class="fas fa-check mr-1.5"></i> Approve
                </button>`
                : '';

            actionButtons = `
                ${approveButton}
                <button class="edit-btn inline-flex items-center px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all shadow-sm mr-2" 
                        data-id="${artikel.id}" data-name="${artikel.nama}">
                    <i class="fas fa-edit mr-1.5"></i> Edit
                </button>
                <button class="delete-btn inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm" 
                        data-id="${artikel.id}" data-name="${artikel.nama}">
                    <i class="fas fa-trash mr-1.5"></i> Hapus
                </button>
            `;
        }

        const namaArtikel = artikel.nama || '-';
        const avatarChar = namaArtikel.charAt(0).toUpperCase();

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
                            <div class="text-sm font-semibold text-gray-900">${namaArtikel}</div>
                            <div class="text-xs text-gray-500">Artikel</div>
                        </div>
                    </div>
                </td>

                <td class="px-6 py-4 text-sm text-gray-700">
                    ${artikel.deskripsi || '-'}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${statusBadge}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    ${actionButtons}
                </td>
            </tr>
        `;

        tableArtikel.append(row);
    });
}

// Render mobile cards khusus role (hanya name + aksi edit/hapus)
function renderCards(data) {
    const cardContainer = $('#cardContainer');
    cardContainer.empty();

    if (data.length === 0) {
        cardContainer.append(`
            <div class="p-10 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-300 text-4xl mb-3 block"></i>
                Tidak ada artikel ditemukan
            </div>
        `);
        return;
    }

    data.forEach((artikel) => {
        // ===== LOGIKA STATUS BADGE =====
        let statusBadge = '';
        switch (artikel.status) {
            case 'pending':
                statusBadge = `<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300 uppercase">Pending</span>`;
                break;
            case 'approved':
                statusBadge = `<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-green-100 text-green-700 border border-green-300 uppercase">Approved</span>`;
                break;
            case 'rejected':
                statusBadge = `<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-red-100 text-red-700 border border-red-300 uppercase">Rejected</span>`;
                break;
            default:
                statusBadge = `<span class="px-3 py-1 text-[10px] font-bold rounded-full bg-gray-100 text-gray-700 border border-gray-300 uppercase">Unknown</span>`;
        }

        // ===== LOGIKA ACTION BUTTONS (Handle Role 9) =====
        let actionButtons = '';
        if (artikel.role === 9) {
            actionButtons = `
                <div class="w-full text-center py-2 bg-gray-100 text-gray-400 rounded-lg text-xs font-bold border border-gray-200">
                    <i class="fas fa-lock mr-1"></i> DATA TERKUNCI
                </div>
            `;
        } else {
            actionButtons = `
                <button class="edit-btn flex-1 py-2.5 bg-yellow-50 text-yellow-600 rounded-xl text-xs font-bold hover:bg-yellow-100 transition-all active:scale-95" 
                    data-id="${artikel.id}" data-name="${artikel.nama}">
                    <i class="fas fa-edit mr-1"></i> EDIT
                </button>
                <button class="delete-btn flex-1 py-2.5 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-all active:scale-95" 
                    data-id="${artikel.id}" data-name="${artikel.nama}">
                    <i class="fas fa-trash mr-1"></i> HAPUS
                </button>
            `;
        }

        const avatarChar = artikel.nama ? artikel.nama.charAt(0).toUpperCase() : '?';

        const card = `
            <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-4 transition-all hover:shadow-md">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="h-11 w-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-sm">
                            ${avatarChar}
                        </div>
                        <div class="max-w-[150px]">
                            <h3 class="text-sm font-extrabold text-gray-900 truncate uppercase tracking-tight">${artikel.nama || '-'}</h3>
                            <p class="text-[11px] text-gray-400 font-medium">Kategori: Artikel</p>
                        </div>
                    </div>
                    ${statusBadge}
                </div>

                <div class="bg-gray-50 rounded-xl p-3 mb-4">
                    <p class="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Deskripsi Singkat</p>
                    <p class="text-xs text-gray-600 line-clamp-2 leading-relaxed italic">
                        "${artikel.deskripsi || 'Tidak ada deskripsi.'}"
                    </p>
                </div>

                <div class="flex space-x-2">
                    ${actionButtons}
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
        url: "/admin/getkreatif",
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
$('#searchInputartikel').on('input', function() {
    const query = $(this).val();
    currentPage = 1;
    loadData(query, currentPage);
});

// Reset form
function resetForm() {
    $('#artikelForm')[0].reset();
    $('#artikelForm input, #artikelForm select, #artikelForm textarea').removeClass('border-red-300 bg-red-50');

    $('#artikelForm input, #artikelForm select').each(function() {
        $(this).removeClass('border-red-300 bg-red-50');
        hideFieldError(this);
    });

    $('#preview').attr('src', '');
    $('#pdfPreviewContainer').addClass('hidden');
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
$('#cancelApproveBtn').on('click', function() {
    hideModalEnhanced('approveModal');
});

$('#closeModal, #cancelBtn').on('click', function() {
    hideModalEnhanced('artikelModal');
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
        if ($(this).closest('#artikelModal').length) {
            hideModalEnhanced('artikelModal');
        } else if ($(this).closest('#deleteModal').length) {
            hideModalEnhanced('deleteModal');
        } else if ($(this).closest('#approveModal').length) {
            hideModalEnhanced('approveModal');
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
        'artikelNama',
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

    // Validate CKEditor (artikelDeskripsi)
    const deskripsi = artikelEditor.getData().replace(/<[^>]*>/g, '').trim();
    const deskripsiField = $('#artikelDeskripsi').closest('.ck-editor');
    if (!deskripsi) {
        deskripsiField.addClass('border-red-300 bg-red-50');
        isValid = false;
    } else {
        deskripsiField.removeClass('border-red-300 bg-red-50');
    }

    return isValid;
}

// Preview PDF
$("#artikelPdf").on("change", function () {
    const file = this.files[0];
    if (file && file.type === "application/pdf") {
        $("#pdfPreview").attr("src", URL.createObjectURL(file));
        $("#pdfPreviewContainer").removeClass("hidden");
    } else {
        $("#pdfPreview").attr("src", "");
        $("#pdfPreviewContainer").addClass("hidden");
        alert("File bukan PDF!");
    }
});

// Preview Foto
$("#artikelFoto").on("change", function () {
    const file = this.files[0];
    if (file && file.type.startsWith("image/")) {
        $("#preview").attr("src", URL.createObjectURL(file));
        $("#previewContainer").removeClass("hidden");
    } else {
        $("#preview").attr("src", "");
        $("#previewContainer").addClass("hidden");
        alert("File bukan gambar!");
    }
});

// Drag & Drop untuk kedua input
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

        const files = e.originalEvent.dataTransfer.files;
        if (!files.length) return;

        const file = files[0];

        if (file.type.startsWith("image/")) {
            const fotoInput = $("#artikelFoto")[0];
            if (fotoInput) {
                fotoInput.files = files;
                $("#artikelFoto").trigger("change");
            }
        } else if (file.type === "application/pdf") {
            const pdfInput = $("#artikelPdf")[0];
            if (pdfInput) {
                pdfInput.files = files;
                $("#artikelPdf").trigger("change");
            }
        } else {
            alert("Hanya boleh upload PDF atau gambar!");
        }
    });

// Hapus foto
$("#removeFoto").on("click", function () {
    const fotoInput = $("#artikelFoto")[0];
    if (fotoInput) fotoInput.value = "";
    $("#preview").attr("src", "");
    $("#previewContainer").addClass("hidden");
    $("#oldFoto").val("");
});

let artikelEditor;
let currentArtikelId = null;
let isEditMode = false;
// Show add Artikel modal
$('#addSubartikelBtn').on('click', function() {
    isEditMode = false;
    currentArtikelId = null;
    resetForm();
    $('#artikelId').val('');

    $('#modalTitle').text('Tambah Artikel Baru');
    $('#modalIcon').removeClass().addClass('fas fa-newspaper');
    $('#submitText').text('Simpan Data');
    $('#submitIcon').removeClass('fa-edit').addClass('fa-save');

    showModalEnhanced('artikelModal');
    
    $('#artikelIsparent').val('');
});

$(function () {
    ClassicEditor
    .create(document.querySelector('#artikelDeskripsi'))
    .then(editor => {
        artikelEditor = editor;
        console.log('CKEditor siap dipakai!');
    })
    .catch(error => {
        console.error(error);
    });

    $('#artikelForm').on('submit', function (e) {
        e.preventDefault();

        if (!validateForm()) {
            showNotification('Mohon lengkapi semua field yang wajib diisi!', 'error');
            return;
        }

        const submitBtn = $('#submitBtn');
        const originalText = submitBtn.html();
        submitBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop('disabled', true);

        const artikelId = $('#artikelId').val();

        const formData = new FormData();
        formData.append('nama', $('#artikelNama').val());
        formData.append('deskripsi', artikelEditor.getData());

        // Tambahkan file PDF jika ada
        const pdfInput = $('#artikelPdf')[0];
        if (pdfInput && pdfInput.files.length > 0) {
            formData.append('pdf', pdfInput.files[0]);
        }

        const fileInput = $('#artikelFoto')[0];
        if (fileInput.files.length > 0) {
            formData.append('foto', fileInput.files[0]); 
        } else {
            formData.append('oldFoto', $('#oldFoto').val());
        }

        const url = artikelId ? `/admin/kreatif/${artikelId}` : '/admin/kreatif';
        const method = 'POST';
        if (artikelId) {
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

                hideModalEnhanced('artikelModal');
                submitBtn.html(originalText).prop('disabled', false);

                loadData($('#searchInputartikel').val(), currentPage);
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
    currentArtikelId = $(this).data('id');
    resetForm();

    $('#modalTitle').text('Edit Data Artikel');
    $('#modalIcon').removeClass().addClass('fas fa-newspaper');
    $('#submitText').text('Update Data');
    $('#submitIcon').removeClass('fa-save').addClass('fa-edit');

    $.ajax({
        url: '/admin/kreatif/' + currentArtikelId,
        type: 'GET',
        success: function(artikel) {
            $('#artikelId').val(artikel.id);
            $('#artikelNama').val(artikel.nama);
            if (artikelEditor) {
                artikelEditor.setData(artikel.deskripsi || '');
            } else {
                $('#artikelDeskripsi').val(artikel.deskripsi);
            }
            if (artikel.pdf) {
                $('#pdfPreview').attr('src', '/' + artikel.pdf);
                $('#pdfPreviewContainer').removeClass('hidden');
                $('#oldPdf').val(artikel.pdf);
            } else {
                $('#pdfPreview').attr('src', '');
                $('#pdfPreviewContainer').addClass('hidden');
                $('#oldPdf').val('');
            }
            if (artikel.foto) {
                $('#preview').attr('src', '/' + artikel.foto);
                $('#previewContainer').removeClass('hidden');
                $('#oldFoto').val(artikel.foto);
            } else {
                $('#preview').attr('src', '');
                $('#previewContainer').addClass('hidden');
                $('#oldFoto').val('');
            }

            showModal('artikelModal');
        },
        error: function(xhr) {
            console.error("Gagal ambil data:", xhr.responseText);
            alert('Gagal ambil data artikel');
        }
    });
});

$(document).on('click', '.delete-btn', function() {
    const id = $(this).data('id');  
    const name = $(this).data('name');

    $('#deleteartikelId').val(id); 
    $('#deleteArtikelName').text(name);

    showModalEnhanced('deleteModal');
});

// Update delete confirmation handler
$(document).on('click', '#confirmDeleteBtn', function() {
    const deleteBtn = $(this);
    const originalText = deleteBtn.html();
    deleteBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...')
             .prop('disabled', true);

    const artikeld = $('#deleteartikelId').val();

    $.ajax({
        url: `/admin/kreatif/${artikeld}`, 
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

$("#removePdf").on("click", function () {
    let artikelId = $("#artikelId").val();

    if (!artikelId) {
        showNotification("ID Pengurus tidak ditemukan.");
        return;
    }

    $.ajax({
        url: '/kreatif/deletePdf', 
        type: 'POST',
        data: { id: artikelId },
        success: function (response) {
            if (response.success) {
                $("#artikelPdf").val("");
                $("#pdfPreviewContainer").addClass("hidden");
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

$(document).on('click', '.approve-btn', function() {
    const id = $(this).data('id');
    const name = $(this).data('name');

    $('#approveartikelId').val(id);
    $('#approveArtikelName').text(name);

    showModalEnhanced('approveModal');
});

// Approve confirmation handler
$(document).on('click', '#confirmApproveBtn', function() {
    const approveBtn = $(this);
    const originalText = approveBtn.html();
    approveBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyetujui...')
             .prop('disabled', true);
    const artikela = $('#approveartikelId').val();

    $.ajax({
        url: `/admin/approvekreatif/${artikela}`, 
        type: 'POST',
        success: function(response) {
            showNotification(response.message , response.status);
            hideModalEnhanced('approveModal');
            loadData(); 
        },
        error: function(xhr) {
            let msg = (xhr.responseJSON && xhr.responseJSON.message)
                        ? xhr.responseJSON.message
                        : 'Gagal menyetujui data!';
            showNotification(msg, 'error');
        },
        complete: function() {
            approveBtn.html(originalText).prop('disabled', false);
        }
    });
});

$(document).on('click', '#confirmRejectBtn', function() {
    const rejectBtn = $(this);
    const originalText = rejectBtn.html();
    rejectBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyetujui...')
             .prop('disabled', true);
    const artikela = $('#approveartikelId').val();

    $.ajax({
        url: `/admin/rejectkreatif/${artikela}`, 
        type: 'POST',
        success: function(response) {
            showNotification(response.message , response.status);
            hideModalEnhanced('approveModal');
            loadData(); 
        },
        error: function(xhr) {
            let msg = (xhr.responseJSON && xhr.responseJSON.message)
                        ? xhr.responseJSON.message
                        : 'Gagal menyetujui data!';
            showNotification(msg, 'error');
        },
        complete: function() {
            rejectBtn.html(originalText).prop('disabled', false);
        }
    });
});

$('#pendaftaranSwitch').click(function() {
    $.ajax({
        url: `/pendaftaran/toggle`,
        type: "POST",
        success: function(res) {
            const bg = $('#pendaftaranBg');
            const knob = $('#pendaftaranKnob');

            if(res.value == 1) {
                bg.removeClass('bg-gray-300').addClass('bg-green-500');
                knob.addClass('translate-x-8');
            } else {
                bg.removeClass('bg-green-500').addClass('bg-gray-300');
                knob.removeClass('translate-x-8');
            }
        },
        error: function() {
            alert('Gagal mengubah status pendaftaran.');
        }
    });
});
