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
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Tidak ada data ditemukan
                </td>
            </tr>
        `);
        return;
    }

    data.forEach((approvalpengajuandana, index) => {
        const semesterText = approvalpengajuandana.semester 
            ? `Semester ${approvalpengajuandana.semester}`
            : '-';

        let statusBadge = '';
        switch (approvalpengajuandana.status) {
            case 1:
            case 'pending':
                statusBadge = `<span class="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">Pending</span>`;
                break;
            case 2:
            case 'approved':
                statusBadge = `<span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">Approved</span>`;
                break;
            case 3:
            case 'rejected':
                statusBadge = `<span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-300">Rejected</span>`;
                break;
            default:
                statusBadge = `<span class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300">Unknown</span>`;
        }

        const row = `
            <tr class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${index + 1}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                    ${approvalpengajuandana.semester ? 'S' + approvalpengajuandana.semester : '-'}
                    </div>
                </div>
                <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">${semesterText}</div>
                </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${approvalpengajuandana.ip_semester || '-'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${formatRupiah(approvalpengajuandana.total)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${statusBadge}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="detail-btn px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all mr-2" data-id="${approvalpengajuandana.id}">
                    <i class="fas fa-info-circle"></i> Detail
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
        cardContainer.append(`
            <div class="p-6 text-center text-gray-500">
                <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                Tidak ada data ditemukan
            </div>
        `);
        return;
    }

    data.forEach((approvalpengajuandana) => {
        // Tentukan ikon berdasarkan jabatan
        let jabatanIcon = 'fa-user-tie'; // default
        if (approvalpengajuandana.jabatan) {
            const jabatan = approvalpengajuandana.jabatan.toLowerCase();
            if (jabatan.includes('ketua')) jabatanIcon = 'fa-crown';
            else if (jabatan.includes('wakil')) jabatanIcon = 'fa-user-friends';
            else if (jabatan.includes('sekretaris')) jabatanIcon = 'fa-file-signature';
            else if (jabatan.includes('bendahara')) jabatanIcon = 'fa-wallet';
            else if (jabatan.includes('anggota')) jabatanIcon = 'fa-users';
        }

        const card = `
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            <div class="flex items-start space-x-3">
                <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold text-lg">
                ${approvalpengajuandana.nama.charAt(0)}
                </div>
                <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="text-lg font-semibold text-gray-900 truncate">${approvalpengajuandana.nama}</h3>
                </div>
                <div class="space-y-1 text-sm text-gray-600">
                    <div class="flex items-center">
                    <i class="fas ${jabatanIcon} w-4 mr-2 text-orange-primary"></i>
                    <span class="truncate">${approvalpengajuandana.jabatan || '-'}</span>
                    </div>
                    <div class="flex mt-4 space-x-2">
                    <button class="edit-btn flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all" data-id="${approvalpengajuandana.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="delete-btn flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all" data-id="${approvalpengajuandana.id}" data-name="${approvalpengajuandana.nama}">
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
        url: "/admin/getapprovalpengajuandana",
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
            // renderCards(data);
            renderPagination(res.last_page, query);
            // renderPaginationMobile(res.last_page, query);

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
$('#searchInputapprovalpengajuandana').on('input', function() {
    const query = $(this).val();
    currentPage = 1;
    loadData(query, currentPage);
});

// Reset form
function resetForm() {
    $('#approvalpengajuandanaForm')[0].reset();
    $('#approvalpengajuandanaForm input, #approvalpengajuandanaForm select, #approvalpengajuandanaForm textarea').removeClass('border-red-300 bg-red-50');

    $('#approvalpengajuandanaForm input, #approvalpengajuandanaForm select').each(function() {
        $(this).removeClass('border-red-300 bg-red-50');
        hideFieldError(this);
    });
    $('#approvalpengajuandanaPengajuandana').val('').trigger('change');

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
    hideModalEnhanced('approvalpengajuandanaModal');
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
        if ($(this).closest('#approvalpengajuandanaModal').length) {
            hideModalEnhanced('approvalpengajuandanaModal');
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
        'approvalpengajuandanaSemester',
        'approvalpengajuandanaIpsemester',
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
$('#approvalpengajuandanaPengajuandana').on('change', function () {
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



let approvalpengajuandanaEditor;
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
        url: '/admin/approvalpengajuandana/' + currentPengajuandanaId,
        type: 'GET',
        success: function(approvalpengajuandana) {
            $('#paketFields').addClass('hidden');
            $('#sksFields').addClass('hidden');
            $('#approvalpengajuandanaId').val(approvalpengajuandana.id);
            $('#approvalpengajuandanaSemester').val('Semester ' + approvalpengajuandana.semester);
            $('#approvalpengajuandanaIpsemester').val(approvalpengajuandana.ip_semester);
            let tipeText = '';

            if (approvalpengajuandana.tipe == 1) {
                tipeText = 'Paket';
            } else if (approvalpengajuandana.tipe == 2) {
                tipeText = 'SKS';
            } else {
                tipeText = '-';
            }

            $('#approvalpengajuandanaPengajuandana').val(tipeText).trigger('change');

            if (Number(approvalpengajuandana.tipe) === 1) {
                $('#paketFields').removeClass('hidden');

                $('#sppTetap').val(formatRupiah(approvalpengajuandana.spp_tetap));
                $('#sppVariabel').val(formatRupiah(approvalpengajuandana.spp_variabel));
                $('#praktikumPaket').val(formatRupiah(approvalpengajuandana.praktikum));

                hitungTotalPaket();

            } else if (Number(approvalpengajuandana.tipe) === 2) {
                $('#sksFields').removeClass('hidden');

                $('#jumlahSks').val(approvalpengajuandana.jml_sks);
                $('#nominal').val(formatRupiah(approvalpengajuandana.nominal));
                $('#praktikumSks').val(formatRupiah(approvalpengajuandana.praktikum));

                hitungTotalSks();
            }
            showModal('approvalpengajuandanaModal');
        },
        error: function(xhr) {
            console.error("Gagal ambil data:", xhr.responseText);
            alert('Gagal ambil data approvalpengajuandana');
        }
    });
});
