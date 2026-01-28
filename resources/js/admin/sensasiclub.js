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
    const tableSensasiclub = $('#tableSensasiclub');
    tableSensasiclub.empty();

    if (data.length === 0) {
        tableSensasiclub.append(`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);
        return;
    }

    data.forEach((sensasiclub, index) => {
        const isArtikel = sensasiclub.jenis === 'artikel';

        const statusClub = isArtikel
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';

        const row = `
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 text-sm text-gray-900">${index + 1}</td>

                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                                ${sensasiclub?.mahasiswa?.user?.name?.charAt(0) ?? '-'}
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">
                                ${sensasiclub?.mahasiswa?.user?.name ?? '-'}
                            </div>
                        </div>
                    </div>
                </td>

                <td class="px-6 py-4 text-sm text-gray-900">
                    ${sensasiclub?.mahasiswa?.mitra?.nama_mitra || '-'}
                </td>

                <td class="px-6 py-4 text-sm text-gray-900">
                    ${sensasiclub.judul || '-'}
                </td>

                <td class="px-6 py-4">
                    <span class="px-2 py-1 inline-flex text-xs font-semibold rounded-full ${statusClub}">
                        ${isArtikel ? 'Artikel' : 'Youtube'}
                    </span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 mr-2" data-id="${sensasiclub.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600" data-id="${sensasiclub.id}" data-name="${sensasiclub.judul}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;

        tableSensasiclub.append(row);
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

    data.forEach((sensasiclub) => {
        const card = `
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                        ${sensasiclub?.mahasiswa?.user?.name.charAt(0)}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-lg font-semibold text-gray-900 truncate">
                                ${sensasiclub?.mahasiswa?.user?.name}
                            </h3>
                            <!-- Badge Tipe Konten -->
                            <span class="inline-block px-2 py-1 text-xs font-semibold rounded-full 
                                        ${sensasiclub.jenis === 'youtube' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
                                ${sensasiclub.jenis === 'youtube' ? 'YouTube' : 'Artikel'}
                            </span>
                        </div>
                        <div class="space-y-1 text-sm text-gray-600">
                            <div class="flex items-center">
                                <i class="fas fa-handshake w-4 mr-2 text-orange-primary"></i>
                                <span class="truncate">${sensasiclub?.mahasiswa?.mitra?.nama_mitra}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-bookmark w-4 mr-2 text-blue-500"></i>
                                <span class="truncate">${sensasiclub.judul}</span>
                            </div>
                            <div class="flex mt-4 space-x-2">
                                <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${sensasiclub.id}">
                                    <i class="fas fa-edit"></i> Edit
                                </button>
                                <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${sensasiclub.id}" data-name="${sensasiclub.judul}">
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
        url: "/admin/getsensasiclub",
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
$('#searchInputsensasiclub').on('input', function() {
    const query = $(this).val();
    currentPage = 1;
    loadData(query, currentPage);
});

// Reset form
function resetForm() {
    $('#sensasiclubForm')[0].reset();

    $('#sensasiclubForm input, #sensasiclubForm select, #sensasiclubForm textarea')
        .removeClass('border-red-300 bg-red-50');

    $('#sensasiclubForm input, #sensasiclubForm select').each(function () {
        hideFieldError(this);
    });

    if (window.deskripsiEditor) {
        window.deskripsiEditor.setData('');
    }

    // reset preview PDF
    $("#pdfPreview").attr("src", "");
    $("#pdfPreviewContainer").addClass("hidden");
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
    hideModalEnhanced('sensasiclubModal');
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
        if ($(this).closest('#sensasiclubModal').length) {
            hideModalEnhanced('sensasiclubModal');
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
        'sensasiclubMahasiswa',
        'sensasiclubJudul'
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

$("#sensasiclubFoto").on("change", function () {
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

$("#sensasiclubPdf").on("change", function () {
    const file = this.files[0];

    if (file && file.type === "application/pdf") {
        const fileURL = URL.createObjectURL(file);
        $("#pdfPreview").attr("src", fileURL);
        $("#pdfPreviewContainer").removeClass("hidden");
    } else {
        $("#pdfPreview").attr("src", "");
        $("#pdfPreviewContainer").addClass("hidden");
        alert("File bukan PDF!");
    }
});

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

    // IMAGE
    if (file.type.startsWith("image/")) {
        $("#sensasiclubFoto")[0].files = files;
        $("#sensasiclubFoto").trigger("change");
    }
    // PDF
    else if (file.type === "application/pdf") {
        $("#sensasiclubPdf")[0].files = files;
        $("#sensasiclubPdf").trigger("change");
    }
    else {
        alert("Hanya boleh upload gambar atau PDF!");
    }
});
function loadMahasiswa(selectedId = '') {
    $.get('/admin/getmahasiswa/sensasiclub', function(response) {
        // Pastikan response berupa array
        const mahasiswaList = Array.isArray(response) ? response : [];

        // Kosongkan select
        $('#sensasiclubMahasiswa').empty();
        $('#sensasiclubMahasiswa').append('<option value="">Pilih Mahasiswa</option>');

        // Loop mahasiswa
        mahasiswaList.forEach(function(mahasiswa) {
            const selected = mahasiswa.id == selectedId ? 'selected' : '';
            const name = mahasiswa.user ? mahasiswa.user.name : 'Nama tidak tersedia';
            $('#sensasiclubMahasiswa').append(`<option value="${mahasiswa.id}" ${selected}>${name}</option>`);
        });
    }).fail(function() {
        alert('Gagal mengambil data mahasiswa. Pastikan API berjalan dengan benar.');
    });
}


let sensasiclubEditor;
let currentSensasiclubId = null;
let isEditMode = false;
// Show add Sensasiclub modal
$('#addSubsensasiclubBtn').on('click', function() {
    isEditMode = false;
    currentSensasiclubId = null;
    resetForm();
    $('#sensasiclubId').val('');

    $('#modalTitle').text('Tambah Sensasiclub Baru');
    $('#modalIcon').removeClass('fa-edit').addClass('fa-bookmark');
    $('#submitText').text('Simpan Data');
    $('#submitIcon').removeClass('fa-edit').addClass('fa-save');

    showModalEnhanced('sensasiclubModal');
    loadMahasiswa();
    
    $('#sensasiclubIsparent').val('');
});

$(function () {
    ClassicEditor
    .create(document.querySelector('#sensasiclubDeskripsi'))
    .then(editor => {
        sensasiclubEditor = editor;
        console.log('CKEditor siap dipakai!');
    })
    .catch(error => {
        console.error(error);
    });
    $('#sensasiclubForm').on('submit', function (e) {
        e.preventDefault();

        if (!validateForm()) {
            showNotification('Mohon lengkapi semua field yang wajib diisi!', 'error');
            return;
        }

        const submitBtn = $('#submitBtn');
        const originalText = submitBtn.html();
        submitBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop('disabled', true);

        const sensasiclubId = $('#sensasiclubId').val();

        const formData = new FormData();
        formData.append('mahasiswa_id', $('#sensasiclubMahasiswa').val());
        formData.append('judul', $('#sensasiclubJudul').val());
        formData.append('jenis', $('#sensasiclubTipe').val());
        formData.append('link_youtube', $('#sensasiclubYoutube').val());
        formData.append('deskripsi', sensasiclubEditor.getData());

        // Tambahkan file PDF jika ada
        const pdfInput = $('#sensasiclubPdf')[0];
        if (pdfInput && pdfInput.files.length > 0) {
            formData.append('pdf', pdfInput.files[0]);
        }

        const fileInput = $('#sensasiclubFoto')[0];
        if (fileInput.files.length > 0) {
            formData.append('foto', fileInput.files[0]); 
        } else {
            formData.append('oldFoto', $('#oldFoto').val());
        }

        const url = sensasiclubId ? `/admin/sensasiclub/${sensasiclubId}` : '/admin/sensasiclub';
        const method = 'POST';
        if (sensasiclubId) {
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

                hideModalEnhanced('sensasiclubModal');
                submitBtn.html(originalText).prop('disabled', false);

                loadData($('#searchInputsensasiclub').val(), currentPage);
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
    currentSensasiclubId = $(this).data('id');
    resetForm();

    $('#modalTitle').text('Edit Data Sensasiclub');
    $('#modalIcon').removeClass().addClass('fa-bookmark');
    $('#submitText').text('Update Data');
    $('#submitIcon').removeClass('fa-save').addClass('fa-edit');

    $.ajax({
        url: '/admin/sensasiclub/' + currentSensasiclubId,
        type: 'GET',
        success: function(sensasiclub) {
            $('#sensasiclubId').val(sensasiclub.id);
            loadMahasiswa(sensasiclub.mahasiswa_id);
            $('#sensasiclubJudul').val(sensasiclub.judul);
            $('#sensasiclubTipe').val(sensasiclub.jenis).trigger('change');
            $('#sensasiclubYoutube').val(sensasiclub.link_youtube);
            if (sensasiclubEditor) {
                sensasiclubEditor.setData(sensasiclub.deskripsi || '');
            } else {
                $('#sensasiclubDeskripsi').val(sensasiclub.deskripsi);
            }
            if (sensasiclub.pdf) {
                $('#pdfPreview').attr('src', '/' + sensasiclub.pdf);
                $('#pdfPreviewContainer').removeClass('hidden');
                $('#oldPdf').val(sensasiclub.pdf);
            } else {
                $('#pdfPreview').attr('src', '');
                $('#pdfPreviewContainer').addClass('hidden');
                $('#oldPdf').val('');
            }

            if (sensasiclub.foto) {
                $('#preview').attr('src', '/' + sensasiclub.foto);
                $('#previewContainer').removeClass('hidden');
                $('#oldFoto').val(sensasiclub.foto);
            } else {
                $('#preview').attr('src', '');
                $('#previewContainer').addClass('hidden');
                $('#oldFoto').val('');
            }

            showModal('sensasiclubModal');
        },
        error: function(xhr) {
            console.error("Gagal ambil data:", xhr.responseText);
            alert('Gagal ambil data sensasiclub');
        }
    });
});

$(document).on('click', '.delete-btn', function() {
    const id = $(this).data('id');  
    const name = $(this).data('name');

    $('#deletesensasiclubId').val(id); 
    $('#deleteSensasiclubName').text(name);

    showModalEnhanced('deleteModal');
});

// Update delete confirmation handler
$(document).on('click', '#confirmDeleteBtn', function() {
    const deleteBtn = $(this);
    const originalText = deleteBtn.html();
    deleteBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...')
             .prop('disabled', true);

    const sensasiclubd = $('#deletesensasiclubId').val();

    $.ajax({
        url: `/admin/sensasiclub/${sensasiclubd}`, 
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
    let sensasiclubId = $("#sensasiclubId").val();

    if (!sensasiclubId) {
        // reset input file
        $("#sensasiclubPdf").val("");

        // reset preview
        $("#pdfPreview").attr("src", "");
        $("#pdfPreviewContainer").addClass("hidden");

        showNotification("PDF dihapus.", "success");
        return;
    }

    $.ajax({
        url: '/sensasiclub/deletePdf', 
        type: 'POST',
        data: { id: sensasiclubId },
        success: function (response) {
            if (response.success) {
                $("#sensasiclubPdf").val("");
                $("#pdfPreviewContainer").addClass("hidden");
                $("#preview").attr("src", "");
                showNotification(response.message, 'success');
            } else {
                showNotification("Gagal menghapus pdf.");
            }
        },
        error: function () {
            showNotification("Terjadi kesalahan.");
        }
    });
});

$('#sensasiclubTipe').on('change', function() {
    const tipe = $(this).val();

    if (tipe === 'youtube') {
        // tampilkan video, sembunyikan artikel
        $('#youtubeField').removeClass('hidden');
        $('#artikelFields').addClass('hidden');

        // reset value artikel
        $('#sensasiclubPdf').val('');
        $('#sensasiclubDeskripsi').val('');
    } else if (tipe === 'artikel') {
        // tampilkan artikel, sembunyikan video
        $('#youtubeField').addClass('hidden');
        $('#artikelFields').removeClass('hidden');

        // reset value youtube
        $('#sensasiclubYoutube').val('');
    } else {
        // sembunyikan semua dan reset
        $('#youtubeField').addClass('hidden');
        $('#artikelFields').addClass('hidden');
        $('#sensasiclubYoutube').val('');
        $('#sensasiclubPdf').val('');
        $('#sensasiclubDeskripsi').val('');
    }
});