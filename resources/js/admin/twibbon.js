import $ from 'jquery';

$.ajaxSetup({
    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
});

let currentPage = 1;
const rowsPerPage = 10;
let isEditMode = false;

$(function () {
    loadData();
});

function loadData(query = '', page = 1) {
    $.ajax({
        url: '/admin/gettwibbon',
        type: 'GET',
        data: { search: query, page, limit: rowsPerPage },
        dataType: 'json',
        success: function (res) {
            renderTable(res.data || [], res.current_page);
            renderCards(res.data || []);
            renderPagination(res.last_page, query);
            renderPaginationMobile(res.last_page, query);

            const start = res.total === 0 ? 0 : (res.current_page - 1) * rowsPerPage + 1;
            const end = start + (res.data || []).length - 1;
            $('#resultCount').html(`<i class="fas fa-info-circle mr-1"></i>Menampilkan ${start}–${end} dari ${res.total} data`);
        },
        error: function (xhr) {
            console.error('Gagal ambil data:', xhr.responseText);
        }
    });
}

function renderTable(data, currentPageNum) {
    const tbody = $('#tableTwibbon');
    tbody.empty();

    if (data.length === 0) {
        tbody.append(`<tr><td colspan="7" class="px-6 py-8 text-center text-gray-500"><i class="fas fa-info-circle mr-2"></i>Tidak ada data ditemukan</td></tr>`);
        return;
    }

    data.forEach((item, index) => {
        const no = (currentPageNum - 1) * rowsPerPage + index + 1;
        const publicUrl = `${window.location.origin}/twibbon/${item.slug}`;
        const statusClass = item.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
        tbody.append(`
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 text-sm text-gray-900">${no}</td>
                <td class="px-6 py-4"><div class="text-sm font-semibold text-gray-900">${escapeHtml(item.title)}</div><div class="text-xs text-gray-500">${item.user?.name || 'Guest'}</div></td>
                <td class="px-6 py-4 text-sm"><a href="${publicUrl}" target="_blank" class="text-blue-600 hover:underline">/twibbon/${item.slug}</a></td>
                <td class="px-6 py-4"><span class="px-2 py-1 rounded-full text-xs font-semibold ${statusClass}">${item.status}</span></td>
                <td class="px-6 py-4 text-sm text-gray-700">${item.view_count}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${item.download_count}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <div class="flex items-center gap-2">
                        <button class="copy-btn px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs" data-url="${publicUrl}"><i class="fas fa-copy mr-1"></i>Copy</button>
                        <button class="edit-btn px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-xs" data-id="${item.id}"><i class="fas fa-edit mr-1"></i>Edit</button>
                        <button class="delete-btn px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xs" data-id="${item.id}"><i class="fas fa-trash mr-1"></i>Hapus</button>
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
        container.append(`<div class="p-6 text-center text-gray-500"><i class="fas fa-info-circle mr-2"></i>Tidak ada data ditemukan</div>`);
        return;
    }

    data.forEach(item => {
        const publicUrl = `${window.location.origin}/twibbon/${item.slug}`;
        container.append(`
            <div class="p-4 border-b border-gray-200">
                <div class="flex justify-between gap-3 mb-3">
                    <div>
                        <p class="text-sm font-semibold text-gray-900">${escapeHtml(item.title)}</p>
                        <a href="${publicUrl}" target="_blank" class="text-xs text-blue-600">/twibbon/${item.slug}</a>
                    </div>
                    <span class="h-fit px-2 py-1 rounded-full text-xs font-semibold ${item.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}">${item.status}</span>
                </div>
                <div class="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                    <span><i class="fas fa-eye mr-1"></i>${item.view_count} views</span>
                    <span><i class="fas fa-download mr-1"></i>${item.download_count} downloads</span>
                </div>
                <div class="flex gap-2">
                    <button class="copy-btn flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm" data-url="${publicUrl}">Copy</button>
                    <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg text-sm" data-id="${item.id}">Edit</button>
                    <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg text-sm" data-id="${item.id}">Hapus</button>
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
        const btn = $(`<button class="mx-1 px-3 py-1 rounded-lg border ${i === currentPage ? 'bg-orange-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}">${i}</button>`);
        btn.on('click', () => { currentPage = i; loadData(query, i); });
        container.append(btn);
    }
}

function renderPaginationMobile(totalPages, query) {
    const container = $('#paginationMobile');
    container.empty();
    if (totalPages <= 1) return;
    for (let i = 1; i <= totalPages; i++) {
        const btn = $(`<button class="px-3 py-1 rounded-lg border ${i === currentPage ? 'bg-orange-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}">${i}</button>`);
        btn.on('click', () => { currentPage = i; loadData(query, i); });
        container.append(btn);
    }
}

$('#searchInputtwibbon').on('input', function () {
    currentPage = 1;
    loadData($(this).val(), 1);
});

function resetForm() {
    $('#twibbonForm')[0].reset();
    $('#twibbonId').val('');
    $('#oldTemplate').val('');
    $('#previewTemplate').attr('src', '').addClass('hidden');
    $('#emptyPreview').removeClass('hidden');
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
        if ($(this).closest('#twibbonModal').length) hideModal('twibbonModal');
        if ($(this).closest('#deleteModal').length) hideModal('deleteModal');
    }
});

$('#closeModal, #cancelBtn').on('click', () => hideModal('twibbonModal'));
$('#cancelDeleteBtn').on('click', () => hideModal('deleteModal'));

$('#addTwibbonBtn').on('click', function () {
    isEditMode = false;
    resetForm();
    $('#modalTitle').text('Tambah Twibbon');
    $('#submitText').text('Simpan Data');
    showModal('twibbonModal');
});

$('#templateImage').on('change', function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        $('#previewTemplate').attr('src', e.target.result).removeClass('hidden');
        $('#emptyPreview').addClass('hidden');
    };
    reader.readAsDataURL(file);
});

$(document).on('click', '.edit-btn', function () {
    isEditMode = true;
    resetForm();
    const id = $(this).data('id');
    $('#modalTitle').text('Edit Twibbon');
    $('#submitText').text('Update Data');

    $.ajax({
        url: `/admin/twibbon/${id}`,
        type: 'GET',
        success: function (data) {
            $('#twibbonId').val(data.id);
            $('#title').val(data.title);
            $('#slug').val(data.slug);
            $('#description').val(data.description);
            $('#status').val(data.status);
            $('#oldTemplate').val(data.template_image);
            if (data.template_image) {
                $('#previewTemplate').attr('src', '/' + data.template_image).removeClass('hidden');
                $('#emptyPreview').addClass('hidden');
            }
            showModal('twibbonModal');
        },
        error: () => showNotification('Gagal memuat data twibbon.', 'error')
    });
});

$('#twibbonForm').on('submit', function (e) {
    e.preventDefault();

    if (!$('#title').val().trim()) {
        showNotification('Judul wajib diisi.', 'error');
        return;
    }

    if (!isEditMode && !$('#templateImage')[0].files[0]) {
        showNotification('Template twibbon wajib diupload.', 'error');
        return;
    }

    const submitBtn = $('#submitBtn');
    const originalHtml = submitBtn.html();
    submitBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop('disabled', true);

    const formData = new FormData();
    formData.append('title', $('#title').val().trim());
    formData.append('slug', $('#slug').val().trim());
    formData.append('description', $('#description').val().trim());
    formData.append('status', $('#status').val());
    if ($('#templateImage')[0].files[0]) formData.append('template_image', $('#templateImage')[0].files[0]);

    const id = $('#twibbonId').val();
    let url = '/admin/twibbon';
    if (id) {
        url = `/admin/twibbon/${id}`;
        formData.append('_method', 'PUT');
    }

    $.ajax({
        url,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            showNotification(response.message, response.status);
            hideModal('twibbonModal');
            loadData($('#searchInputtwibbon').val(), currentPage);
        },
        error: function (xhr) {
            if (xhr.status === 422 && xhr.responseJSON?.errors) {
                showNotification(Object.values(xhr.responseJSON.errors).flat().join(' | '), 'error');
            } else {
                showNotification(xhr.responseJSON?.message ?? 'Terjadi kesalahan saat menyimpan!', 'error');
            }
        },
        complete: function () {
            submitBtn.html(originalHtml).prop('disabled', false);
        }
    });
});

$(document).on('click', '.delete-btn', function () {
    $('#deleteTwibbonId').val($(this).data('id'));
    showModal('deleteModal');
});

$('#confirmDeleteBtn').on('click', function () {
    const btn = $(this);
    const originalHtml = btn.html();
    btn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...').prop('disabled', true);

    $.ajax({
        url: `/admin/twibbon/${$('#deleteTwibbonId').val()}`,
        type: 'DELETE',
        success: function (response) {
            showNotification(response.message, response.status);
            hideModal('deleteModal');
            loadData($('#searchInputtwibbon').val(), currentPage);
        },
        error: xhr => showNotification(xhr.responseJSON?.message ?? 'Gagal menghapus data!', 'error'),
        complete: () => btn.html(originalHtml).prop('disabled', false)
    });
});

$(document).on('click', '.copy-btn', async function () {
    const url = $(this).data('url');
    try {
        await navigator.clipboard.writeText(url);
        showNotification('Link berhasil disalin.', 'success');
    } catch (e) {
        showNotification(url, 'info');
    }
});

function escapeHtml(str) {
    return $('<div>').text(str || '').html();
}

function showNotification(message, type = 'info') {
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    const notif = $(`<div class="notification flex items-center space-x-3 ${bgColor} text-white px-6 py-4 rounded-xl shadow-lg transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer"><i class="fas ${icon} text-lg"></i><span class="font-medium">${message}</span></div>`);
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
