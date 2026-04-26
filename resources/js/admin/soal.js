import $ from 'jquery';

$.ajaxSetup({
    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
});

let currentPage   = 1;
const rowsPerPage = 10;
let isEditMode    = false;
let pilihanCount  = 0; // counter unik ID tiap baris opsi

$(function () {
    loadData();
});

function loadData(query = '', page = 1) {
    const kategoriId = $('#kategori_id').val();

    $.ajax({
        url: `/admin/getsoal/${kategoriId}`,
        type: 'GET',
        data: { search: query, page: page, limit: rowsPerPage },
        dataType: 'json',
        success: function (res) {
            if (!Array.isArray(res.data)) return;

            renderTable(res.data, res.current_page);
            renderCards(res.data);
            renderPagination(res.last_page, query);
            renderPaginationMobile(res.last_page, query);

            const start = (res.current_page - 1) * rowsPerPage + 1;
            const end   = start + res.data.length - 1;
            $('#resultCount').html(`
                <i class="fas fa-info-circle mr-1"></i>
                Menampilkan ${start}–${end} dari ${res.total} data
            `);
        },
        error: function (xhr) {
            console.error('Gagal ambil data:', xhr.responseText);
        }
    });
}

function renderTable(data, currentPageNum) {
    const tbody = $('#tableSoal');
    tbody.empty();

    if (data.length === 0) {
        tbody.append(`
            <tr>
                <td colspan="4" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>Tidak ada data ditemukan
                </td>
            </tr>
        `);
        return;
    }

    data.forEach((soal, index) => {
        const no = (currentPageNum - 1) * rowsPerPage + index + 1;
        tbody.append(`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 text-sm text-gray-900">${no}</td>
                <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                        <div class="h-9 w-9 rounded-full bg-gradient-to-r gradient-bg to-blue-light
                                    flex items-center justify-center text-white font-semibold flex-shrink-0">
                            ${soal.pertanyaan.charAt(0).toUpperCase()}
                        </div>
                        <span class="text-sm font-medium text-gray-900">${soal.pertanyaan}</span>
                    </div>
                </td>
                <td class="px-6 py-4 text-sm">
                    <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        ${soal.pilihan_count ?? 0} opsi
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <div class="flex items-center gap-2">
                        <button class="edit-btn px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all text-xs"
                                data-id="${soal.id}">
                            <i class="fas fa-edit mr-1"></i>Edit
                        </button>
                        <button class="delete-btn px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-xs"
                                data-id="${soal.id}">
                            <i class="fas fa-trash mr-1"></i>Hapus
                        </button>
                    </div>
                </td>
            </tr>
        `);
    });
}

function renderCards(data) {
    const container = $('#cardContainer');
    container.empty();

    if (data.length === 0) {
        container.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>Tidak ada data ditemukan
            </div>
        `);
        return;
    }

    data.forEach(soal => {
        container.append(`
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex items-start gap-3">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light
                                flex items-center justify-center text-white font-semibold">
                        ${soal.pertanyaan.charAt(0).toUpperCase()}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-gray-900 mb-1">${soal.pertanyaan}</p>
                        <span class="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                            ${soal.pilihan_count ?? 0} opsi
                        </span>
                        <div class="flex mt-3 gap-2">
                            <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all text-sm"
                                    data-id="${soal.id}">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm"
                                    data-id="${soal.id}">
                                <i class="fas fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });
}

function renderPagination(totalPages, query) {
    const container = $('#pagination');
    container.empty();
    if (totalPages <= 1) return;
    for (let i = 1; i <= totalPages; i++) {
        const btn = $(`<button class="page-btn mx-1 px-3 py-1 rounded-lg border
            ${i === currentPage ? 'bg-orange-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}">${i}</button>`);
        btn.on('click', () => { currentPage = i; loadData(query, i); });
        container.append(btn);
    }
}

function renderPaginationMobile(totalPages, query) {
    const container = $('#paginationMobile');
    container.empty();
    if (totalPages <= 1) return;
    for (let i = 1; i <= totalPages; i++) {
        const btn = $(`<button class="px-3 py-1 rounded-lg border
            ${i === currentPage ? 'bg-orange-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}">${i}</button>`);
        btn.on('click', () => { currentPage = i; loadData(query, i); });
        container.append(btn);
    }
}

$('#searchInputsoal').on('input', function () {
    currentPage = 1;
    loadData($(this).val(), 1);
});


/**
 * Tambah satu baris opsi jawaban ke #pilihanContainer.
 * @param {string}  teks   - teks opsi
 * @param {boolean} isTrue - jawaban benar atau tidak
 */
function addPilihanRow(teks = '', isTrue = false) {
    pilihanCount++;
    const uid      = pilihanCount;
    const btnClass = isTrue
        ? 'bg-green-500 border-green-500 text-white'
        : 'bg-gray-200 border-gray-300 text-gray-400';
    const iconClass = isTrue ? 'fa-check' : 'fa-times';
    const title     = isTrue ? 'Jawaban Benar (klik untuk ubah)' : 'Jawaban Salah (klik untuk ubah)';

    $('#pilihanContainer').append(`
        <div class="pilihan-row flex items-center gap-2" id="pilihan-row-${uid}">
            <button type="button"
                    class="toggle-benar flex-shrink-0 w-8 h-8 rounded-lg border-2 flex items-center justify-center
                           transition-all duration-200 ${btnClass}"
                    data-uid="${uid}"
                    data-benar="${isTrue ? '1' : '0'}"
                    title="${title}">
                <i class="fas ${iconClass} text-xs"></i>
            </button>

            <input type="text"
                   id="pilihan-teks-${uid}"
                   class="pilihan-teks flex-1 px-3 py-2 border-2 border-gray-200 rounded-xl
                          focus:border-blue-primary focus:ring-0 transition-all duration-300 text-sm text-gray-900"
                   placeholder="Masukkan teks opsi jawaban..."
                   value="${escapeHtml(teks)}">

            <button type="button"
                    class="remove-pilihan flex-shrink-0 w-8 h-8 rounded-lg bg-red-100 text-red-500
                           hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center"
                    data-uid="${uid}"
                    title="Hapus opsi ini">
                <i class="fas fa-trash text-xs"></i>
            </button>
        </div>
    `);
}

function escapeHtml(str) {
    return $('<div>').text(str).html();
}

// Tambah opsi baru
$('#addPilihanBtn').on('click', function () {
    addPilihanRow();
});

// Toggle benar / salah
$(document).on('click', '.toggle-benar', function () {
    const isBenar  = $(this).data('benar') === '1' || $(this).data('benar') === 1;
    const newBenar = !isBenar;

    $(this).data('benar', newBenar ? '1' : '0');

    if (newBenar) {
        $(this)
            .removeClass('bg-gray-200 border-gray-300 text-gray-400')
            .addClass('bg-green-500 border-green-500 text-white')
            .attr('title', 'Jawaban Benar (klik untuk ubah)')
            .find('i').removeClass('fa-times').addClass('fa-check');
    } else {
        $(this)
            .removeClass('bg-green-500 border-green-500 text-white')
            .addClass('bg-gray-200 border-gray-300 text-gray-400')
            .attr('title', 'Jawaban Salah (klik untuk ubah)')
            .find('i').removeClass('fa-check').addClass('fa-times');
    }
});

// Hapus baris opsi
$(document).on('click', '.remove-pilihan', function () {
    if ($('#pilihanContainer .pilihan-row').length <= 2) {
        showNotification('Minimal harus ada 2 opsi jawaban.', 'error');
        return;
    }
    $(`#pilihan-row-${$(this).data('uid')}`).remove();
});

function collectPilihan() {
    const result = [];
    $('#pilihanContainer .pilihan-row').each(function () {
        const uid   = $(this).find('.toggle-benar').data('uid');
        const teks  = $(`#pilihan-teks-${uid}`).val().trim();
        const benar = $(this).find('.toggle-benar').data('benar');
        result.push({
            teks:    teks,
            is_true: benar === '1' || benar === 1,
        });
    });
    return result;
}

function validateForm() {
    let isValid = true;

    if (!$('#teksSoal').val().trim()) {
        $('#teksSoal').addClass('border-red-300 bg-red-50');
        isValid = false;
    } else {
        $('#teksSoal').removeClass('border-red-300 bg-red-50');
    }

    const pilihan    = collectPilihan();
    const emptyTeks  = pilihan.some(p => !p.teks);
    const benarCount = pilihan.filter(p => p.is_true).length;

    $('#pilihanError').addClass('hidden');

    if (pilihan.length < 2) {
        showPilihanError('Minimal harus ada 2 opsi jawaban.');
        isValid = false;
    } else if (emptyTeks) {
        showPilihanError('Semua teks opsi jawaban wajib diisi.');
        isValid = false;
    } else if (benarCount === 0) {
        showPilihanError('Minimal satu opsi harus ditandai sebagai jawaban benar.');
        isValid = false;
    }

    return isValid;
}

function showPilihanError(msg) {
    $('#pilihanErrorMsg').text(msg);
    $('#pilihanError').removeClass('hidden');
}

function resetForm() {
    $('#soalForm')[0].reset();
    $('#soalId').val('');
    $('#teksSoal').removeClass('border-red-300 bg-red-50');
    $('#pilihanContainer').empty();
    $('#pilihanError').addClass('hidden');
    pilihanCount = 0;

    // Default 2 baris: pertama benar, kedua salah
    addPilihanRow('', true);
    addPilihanRow('', false);
}

function showModal(modalId) {
    const modal = $('#' + modalId);
    modal.removeClass('hidden');
    setTimeout(() => modal.find('.modal-content').addClass('show'), 10);
    $('body').addClass('overflow-hidden');
}

function hideModal(modalId) {
    const modal = $('#' + modalId);
    modal.find('.modal-content').removeClass('show');
    setTimeout(() => {
        modal.addClass('hidden');
        $('body').removeClass('overflow-hidden');
    }, 300);
}

$('.modal-overlay').on('click', function (e) {
    if (e.target === this) {
        if ($(this).closest('#soalModal').length)   hideModal('soalModal');
        if ($(this).closest('#deleteModal').length) hideModal('deleteModal');
    }
});

$('#closeModal, #cancelBtn').on('click', () => hideModal('soalModal'));
$('#cancelDeleteBtn').on('click', () => hideModal('deleteModal'));

$('#addSoalBtn').on('click', function () {
    isEditMode = false;
    resetForm();

    $('#modalTitle').text('Tambah Soal Baru');
    $('#modalIcon').attr('class', 'fas fa-plus-circle text-white text-lg');
    $('#submitText').text('Simpan Data');
    $('#submitIcon').attr('class', 'fas fa-save mr-2');

    showModal('soalModal');
});

$(document).on('click', '.edit-btn', function () {
    isEditMode = true;
    const soalId = $(this).data('id');

    resetForm();
    $('#modalTitle').text('Edit Soal');
    $('#modalIcon').attr('class', 'fas fa-edit text-white text-lg');
    $('#submitText').text('Update Data');
    $('#submitIcon').attr('class', 'fas fa-edit mr-2');

    $.ajax({
        url: `/admin/getpertanyaan/soal/${soalId}`,
        type: 'GET',
        success: function (data) {
            $('#soalId').val(data.id);
            $('#teksSoal').val(data.pertanyaan);

            $('#pilihanContainer').empty();
            pilihanCount = 0;

            if (data.pilihan && data.pilihan.length > 0) {
                data.pilihan.forEach(p => addPilihanRow(p.teks, !!p.is_true));
            } else {
                addPilihanRow('', true);
                addPilihanRow('', false);
            }

            showModal('soalModal');
        },
        error: function (xhr) {
            console.error('Gagal ambil data:', xhr.responseText);
            showNotification('Gagal memuat data soal.', 'error');
        }
    });
});

$('#soalForm').on('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) {
        showNotification('Mohon lengkapi semua field yang wajib diisi!', 'error');
        return;
    }

    const submitBtn    = $('#submitBtn');
    const originalHtml = submitBtn.html();
    submitBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop('disabled', true);

    const soalId     = $('#soalId').val();
    const kategoriId = $('#kategori_id').val();

    const payload = {
        name:        $('#teksSoal').val().trim(),
        kategori_id: kategoriId,
        pilihan:     collectPilihan(),
    };

    const url    = soalId ? `/admin/pertanyaan/soal/${soalId}` : '/admin/pertanyaan/soal';
    const method = soalId ? 'PUT' : 'POST';

    $.ajax({
        url, type: method,
        data:        JSON.stringify(payload),
        contentType: 'application/json',
        success: function (response) {
            showNotification(response.message, response.status);
            hideModal('soalModal');
            submitBtn.html(originalHtml).prop('disabled', false);
            loadData($('#searchInputsoal').val(), currentPage);
        },
        error: function (xhr) {
            submitBtn.html(originalHtml).prop('disabled', false);

            if (xhr.status === 422 && xhr.responseJSON) {
                const err = xhr.responseJSON;
                if (err.errors) {
                    showNotification(Object.values(err.errors).flat().join(' | '), 'error');
                } else {
                    showNotification(err.message ?? 'Validasi gagal.', 'error');
                }
            } else {
                showNotification(xhr.responseJSON?.message ?? 'Terjadi kesalahan saat menyimpan!', 'error');
            }
        }
    });
});

$(document).on('click', '.delete-btn', function () {
    $('#deleteSoalId').val($(this).data('id'));
    showModal('deleteModal');
});

$(document).on('click', '#confirmDeleteBtn', function () {
    const btn          = $(this);
    const originalHtml = btn.html();
    btn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop('disabled', true);

    $.ajax({
        url:  `/admin/pertanyaan/soal/${$('#deleteSoalId').val()}`,
        type: 'DELETE',
        success: function (response) {
            showNotification(response.message, response.status);
            hideModal('deleteModal');
            loadData();
        },
        error: function (xhr) {
            showNotification(xhr.responseJSON?.message ?? 'Gagal menghapus data!', 'error');
        },
        complete: function () {
            btn.html(originalHtml).prop('disabled', false);
        }
    });
});

function showNotification(message, type = 'info') {
    const bgColor = type === 'success' ? 'bg-green-500'
                  : type === 'error'   ? 'bg-red-500'
                  :                      'bg-blue-500';
    const icon    = type === 'success' ? 'fa-check-circle'
                  : type === 'error'   ? 'fa-exclamation-circle'
                  :                      'fa-info-circle';

    const notif = $(`
        <div class="notification flex items-center space-x-3 ${bgColor} text-white px-6 py-4
                    rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer">
            <i class="fas ${icon} text-lg"></i>
            <span class="font-medium">${message}</span>
        </div>
    `);

    $('#notificationWrapper').append(notif);
    setTimeout(() => notif.removeClass('translate-x-full opacity-0'), 100);

    const timeout = setTimeout(() => {
        notif.addClass('translate-x-full opacity-0');
        setTimeout(() => notif.remove(), 300);
    }, 4000);

    notif.on('click', function () {
        clearTimeout(timeout);
        $(this).addClass('translate-x-full opacity-0');
        setTimeout(() => $(this).remove(), 300);
    });
}