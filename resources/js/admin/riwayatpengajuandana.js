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

// Format rupiah
function formatRupiah(angka) {
    if (!angka) return '';
    let numberString = angka.toString().replace(/[^,\d]/g, '');
    let split = numberString.split(',');
    let sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    let ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }
    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return 'Rp ' + rupiah;
}

let currentPage = 1;
const rowsPerPage = 10;

function renderTable(data) {
    const tablePengajuandana = $('#tablePengajuandana');
    tablePengajuandana.empty();

    if (data.length === 0) {
        tablePengajuandana.append(`
            <tr>
                <td colspan="8" class="px-6 py-10 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-300 text-4xl mb-3 block"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);
        return;
    }

    data.forEach((riwayat, index) => {
        const statusBadge = getStatusBadge(riwayat.status);

        const namaMahasiswa = riwayat?.mahasiswa?.user?.name || 'Unknown';
        const avatarChar = namaMahasiswa.charAt(0).toUpperCase();
        const namaMitra = riwayat.mahasiswa?.user?.akademik?.mitra?.nama_mitra || '-';

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
                            <div class="text-sm font-semibold text-gray-900">${namaMahasiswa}</div>
                            <div class="text-xs text-gray-500">Mahasiswa</div>
                        </div>
                    </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-semibold text-gray-900">${namaMitra}</div>
                    <div class="text-xs text-gray-500">Mitra</div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span class="px-2 py-1 bg-gray-100 text-gray-700 font-bold rounded border border-gray-200">
                        ${riwayat.ip_semester || '0.00'}
                    </span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${formatRupiah(riwayat.total)}
                </td>

                <td class="px-6 py-4 text-sm text-gray-700">
                    ${riwayat.catatan || '-'}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${statusBadge}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="detail-btn inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-sm" data-id="${riwayat.id}">
                        <i class="fas fa-info-circle mr-1.5"></i> Detail
                    </button>
                </td>
            </tr>
        `;

        tablePengajuandana.append(row);
    });
}

// Render mobile cards khusus role (hanya name + aksi edit/hapus)
function renderCards(data) {
    const cardContainer = $('#cardContainer');
    cardContainer.empty();

    if (data.length === 0) {
        cardContainer.append(`<div class="p-8 text-center text-gray-400">Data tidak tersedia</div>`);
        return;
    }

    data.forEach((riwayat) => {
        let statusBadge = getStatusBadge(riwayat.status);

        const card = `
            <div class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm active:scale-[0.98] transition-transform">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                            ${riwayat.mahasiswa?.user?.name.charAt(0)}
                        </div>
                        <div>
                            <h3 class="text-sm font-bold text-gray-900">${riwayat.mahasiswa?.user?.name}</h3>
                            <p class="text-xs text-gray-500 line-clamp-1">${riwayat.mahasiswa?.user?.akademik?.mitra?.nama_mitra || '-'}</p>
                        </div>
                    </div>
                    ${statusBadge}
                </div>
                
                <div class="grid grid-cols-2 gap-4 py-3 border-y border-dashed border-gray-100 my-3">
                    <div>
                        <p class="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Total Dana</p>
                        <p class="text-sm font-black text-blue-700">${formatRupiah(riwayat.total)}</p>
                    </div>
                    <div>
                        <p class="text-[10px] uppercase tracking-wider text-gray-400 font-bold">IP Semester</p>
                        <p class="text-sm font-bold text-gray-700">${riwayat.ip_semester || '-'}</p>
                    </div>
                </div>

                <div class="flex space-x-2 mt-4">
                    <button class="detail-btn flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors" data-id="${riwayat.id}">
                        <i class="fas fa-info-circle mr-1"></i> Detail
                    </button>
                    <button class="edit-btn px-4 py-2 bg-yellow-50 text-yellow-600 rounded-lg text-xs font-bold" data-id="${riwayat.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </div>
        `;
        cardContainer.append(card);
    });
}

// Fungsi Helper agar tidak duplikasi kode switch status
function getStatusBadge(status) {
    const s = String(status).toLowerCase();
    if (s === '1' || s === 'pending') 
        return `<span class="px-2 py-1 text-[10px] font-bold rounded bg-yellow-100 text-yellow-700 border border-yellow-200">PENDING</span>`;
    if (s === '2' || s === 'approved') 
        return `<span class="px-2 py-1 text-[10px] font-bold rounded bg-green-100 text-green-700 border border-green-200">APPROVED</span>`;
    if (s === '3' || s === 'rejected') 
        return `<span class="px-2 py-1 text-[10px] font-bold rounded bg-red-100 text-red-700 border border-red-200">REJECTED</span>`;
    return `<span class="px-2 py-1 text-[10px] font-bold rounded bg-gray-100 text-gray-600">UNKNOWN</span>`;
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
        url: "/admin/getriwayatpengajuandana",
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
$('#searchInputriwayatpengajuandana').on('input', function() {
    const query = $(this).val();
    currentPage = 1;
    loadData(query, currentPage);
});

// Reset form
function resetForm() {
    $('#riwayatpengajuandanaForm')[0].reset();
    $('#riwayatpengajuandanaForm input, #riwayatpengajuandanaForm select, #riwayatpengajuandanaForm textarea').removeClass('border-red-300 bg-red-50');

    $('#riwayatpengajuandanaForm input, #riwayatpengajuandanaForm select').each(function() {
        $(this).removeClass('border-red-300 bg-red-50');
        hideFieldError(this);
    });
    $('#riwayatpengajuandanaPengajuandana').val('').trigger('change');

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
    hideModalEnhanced('riwayatpengajuandanaModal');
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
        if ($(this).closest('#riwayatpengajuandanaModal').length) {
            hideModalEnhanced('riwayatpengajuandanaModal');
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
        'riwayatpengajuandanaSemester',
        'riwayatpengajuandanaIpsemester',
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

function parseRupiah(rupiahStr) {
    return parseInt(rupiahStr.replace(/[^0-9]/g, '')) || 0;
}

// ======================
// 2️⃣ Tampilkan Form sesuai pilihan
// ======================
$('#riwayatpengajuandanaPengajuandana').on('change', function () {
    const selected = $(this).val();

    // Reset semua input
    $('#paketFields input, #sksFields input').val('');
    $('#totalPaket, #totalSks').val('');

    if (selected === 'Paket') {
        // Pilih Paket
        $('#paketFields').removeClass('hidden');
        $('#sksFields').addClass('hidden');
    } else if (selected === 'SKS') {
        // Pilih SKS
        $('#sksFields').removeClass('hidden');
        $('#paketFields').addClass('hidden');
    } else {
        // Tidak ada pilihan
        $('#paketFields, #sksFields').addClass('hidden');
    }
});


// ======================
// 3️⃣ Hitung Total Paket
// ======================
function hitungTotalPaket() {
    const sppTetap = parseRupiah($('#sppTetap').val());
    const sppVariabel = parseRupiah($('#sppVariabel').val());
    const praktikum = parseRupiah($('#praktikumPaket').val());
    const total = sppTetap + sppVariabel + praktikum;
    $('#totalPaket').val(formatRupiah(total));
}

// ======================
// 4️⃣ Hitung Total SKS
// ======================
function hitungTotalSks() {
    const jumlahSks = parseRupiah($('#jumlahSks').val());
    const nominal = parseRupiah($('#nominal').val());
    const praktikum = parseRupiah($('#praktikumSks').val());
    const total = (jumlahSks * nominal) + praktikum;
    $('#totalSks').val(formatRupiah(total));
}

// ======================
// 5️⃣ Event Formatting (Rupiah di semua input angka)
// ======================
const rupiahInputs = [
    '#sppTetap', '#sppVariabel', '#praktikumPaket',
    '#jumlahSks', '#nominal', '#praktikumSks'
];

rupiahInputs.forEach(selector => {
    $(selector).on('input', function () {
        let value = $(this).val();
        value = value.replace(/[^0-9]/g, '');
        $(this).val(formatRupiah(value));

        // Rehitung otomatis
        if (selector.includes('Tetap') || selector.includes('Variabel') || selector.includes('Paket')) {
            hitungTotalPaket();
        } else {
            hitungTotalSks();
        }
    });
});



let riwayatpengajuandanaEditor;
let currentPengajuandanaId = null;
let isEditMode = false;

$(document).on('click', '.detail-btn', function() {
    isEditMode = true;
    currentPengajuandanaId = $(this).data('id');
    resetForm();

    $('#modalTitle').text('Detail Data Riwayat Pengajuan dana');
    $('#modalIcon').removeClass().addClass('fas fa-money-bill');
    $('#submitText').text('Update Data');
    $('#submitIcon').removeClass('fa-save').addClass('fa-edit');

    $.ajax({
        url: '/admin/riwayatpengajuandana/' + currentPengajuandanaId,
        type: 'GET',
        success: function(riwayatpengajuandana) {
            $('#paketFields').addClass('hidden');
            $('#sksFields').addClass('hidden');
            $('#riwayatpengajuandanaId').val(riwayatpengajuandana.id);
            $('#riwayatpengajuandanaSemester').val('Semester ' + riwayatpengajuandana.semester);
            $('#riwayatpengajuandanaIpsemester').val(riwayatpengajuandana.ip_semester);
            let tipeText = '';

            if (riwayatpengajuandana.tipe == 1) {
                tipeText = 'Paket';
            } else if (riwayatpengajuandana.tipe == 2) {
                tipeText = 'SKS';
            } else {
                tipeText = '-';
            }

            $('#riwayatpengajuandanaPengajuandana').val(tipeText).trigger('change');

            if (Number(riwayatpengajuandana.tipe) === 1) {
                $('#paketFields').removeClass('hidden');

                $('#sppTetap').val(formatRupiah(riwayatpengajuandana.spp_tetap));
                $('#sppVariabel').val(formatRupiah(riwayatpengajuandana.spp_variabel));
                $('#praktikumPaket').val(formatRupiah(riwayatpengajuandana.praktikum));

                hitungTotalPaket();

            } else if (Number(riwayatpengajuandana.tipe) === 2) {
                $('#sksFields').removeClass('hidden');

                $('#jumlahSks').val(riwayatpengajuandana.jml_sks);
                $('#nominal').val(formatRupiah(riwayatpengajuandana.nominal));
                $('#praktikumSks').val(formatRupiah(riwayatpengajuandana.praktikum));

                hitungTotalSks();
            }
            showModal('riwayatpengajuandanaModal');
        },
        error: function(xhr) {
            console.error("Gagal ambil data:", xhr.responseText);
            alert('Gagal ambil data riwayatpengajuandana');
        }
    });
});
