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

function renderTable(data, isMahasiswa) {
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

    data.forEach((pengajuandana, index) => {
        const semesterText = pengajuandana.semester 
            ? `Semester ${pengajuandana.semester}`
            : '-';

        // ===== STATUS BADGE =====
        let statusBadge = '';
        switch (pengajuandana.status) {
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

        // ===== ACTION BUTTONS =====
        let actionButtons = '';

        if (isMahasiswa) {
            if (pengajuandana.status === 'approved') {
                actionButtons = `
                    <i class="fas fa-lock text-gray-400" title="Aksi tidak tersedia"></i>
                `;
            } else if (pengajuandana.status === 'pending') {
                actionButtons = `
                    <button class="delete-btn inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm" 
                        data-id="${pengajuandana.id}" data-name="${semesterText}">
                        <i class="fas fa-trash mr-1.5"></i> Hapus
                    </button>
                `;
            } else {
                actionButtons = `
                    <button class="edit-btn inline-flex items-center px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all shadow-sm mr-2" 
                        data-id="${pengajuandana.id}">
                        <i class="fas fa-edit mr-1.5"></i> Edit
                    </button>
                    <button class="delete-btn inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm" 
                        data-id="${pengajuandana.id}" data-name="${semesterText}">
                        <i class="fas fa-trash mr-1.5"></i> Hapus
                    </button>
                `;
            }
        } else {
            if (pengajuandana.status === 'approved' || pengajuandana.status === 'rejected') {
                actionButtons = `
                    <button class="detail-btn inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-sm mr-2" 
                        data-id="${pengajuandana.id}" title="Lihat Detail">
                        <i class="fas fa-eye mr-1.5"></i> Detail
                    </button>
                    <i class="fas fa-lock text-gray-400" title="Aksi tidak tersedia"></i>
                `;
            } else {
                actionButtons = `
                    <button class="detail-btn inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-sm mr-2" 
                        data-id="${pengajuandana.id}" title="Lihat Detail">
                        <i class="fas fa-eye mr-1.5"></i> Detail
                    </button>
                    <button class="approve-btn inline-flex items-center px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-sm mr-2" 
                            data-id="${pengajuandana.id}" title="Approve">
                        <i class="fas fa-check mr-1.5"></i> Approve
                    </button>
                    <button class="reject-btn inline-flex items-center px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all shadow-sm" 
                            data-id="${pengajuandana.id}" title="Reject">
                        <i class="fas fa-times mr-1.5"></i> Reject
                    </button>
                `;
            }
        }

        const namaMahasiswa = pengajuandana.mahasiswa?.user?.name ?? '-';
        const avatarChar = namaMahasiswa.charAt(0).toUpperCase();

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

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                    ${semesterText}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span class="px-2 py-1 bg-gray-100 text-gray-700 font-bold rounded border border-gray-200">
                        ${pengajuandana.ip_semester ?? '0.00'}
                    </span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    ${formatRupiah(pengajuandana.total)}
                </td>

                <td class="px-6 py-4 text-sm text-gray-700">
                    ${pengajuandana.catatan ?? '-'}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${statusBadge}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    ${actionButtons}
                </td>
            </tr>
        `;

        tablePengajuandana.append(row);
    });
}


function renderCards(data, isMahasiswa) {
    const cardContainer = $('#cardContainer');
    cardContainer.empty();

    if (data.length === 0) {
        cardContainer.append(`
            <div class="p-10 text-center text-gray-400 font-medium bg-white rounded-xl border border-dashed border-gray-300">
                Tidak ada data pengajuan.
            </div>
        `);
        return;
    }

    data.forEach((pengajuandana) => {
        const semesterText = pengajuandana.semester ? `Semester ${pengajuandana.semester}` : '-';
        const status = pengajuandana.status?.toString().toLowerCase();

        // Badge Status Konsisten
        let statusBadge = '';
        if (status === '1' || status === 'pending') {
            statusBadge = `<span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-yellow-100 text-yellow-700 border border-yellow-200">Pending</span>`;
        } else if (status === '2' || status === 'approved') {
            statusBadge = `<span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-green-100 text-green-700 border border-green-200">Approved</span>`;
        } else if (status === '3' || status === 'rejected') {
            statusBadge = `<span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-red-100 text-red-700 border border-red-200">Rejected</span>`;
        }

        const card = `
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 hover:shadow-md transition-shadow">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-sm mr-3">
                            ${(pengajuandana.mahasiswa?.user?.name || 'M').charAt(0)}
                        </div>
                        <div>
                            <h3 class="text-sm font-bold text-gray-900">${pengajuandana.mahasiswa?.user?.name ?? 'Mahasiswa'}</h3>
                            <p class="text-xs text-gray-500">${semesterText}</p>
                        </div>
                    </div>
                    ${statusBadge}
                </div>

                <div class="bg-gray-50 rounded-lg p-3 mb-4 space-y-2">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-500">Total Dana:</span>
                        <span class="font-bold text-blue-600">${formatRupiah(pengajuandana.total)}</span>
                    </div>
                    <div class="text-xs text-gray-500 italic">
                        <i class="fas fa-quote-left mr-1 opacity-50"></i>${pengajuandana.catatan || '-'}
                    </div>
                </div>

                <div class="flex gap-2">
                    ${isMahasiswa ? (
                        (status === 'approved' || status === '2') 
                        ? `<div class="w-full py-2 bg-gray-100 text-gray-400 text-center rounded-lg text-sm italic"><i class="fas fa-lock mr-2"></i>Pengajuan Selesai</div>`
                        : `
                            <button class="edit-btn flex-1 py-2.5 bg-yellow-500 text-white rounded-lg text-sm font-bold shadow-sm" data-id="${pengajuandana.id}"><i class="fas fa-edit mr-1"></i> Edit</button>
                            <button class="delete-btn flex-1 py-2.5 bg-red-500 text-white rounded-lg text-sm font-bold shadow-sm" data-id="${pengajuandana.id}" data-name="${semesterText}"><i class="fas fa-trash mr-1"></i> Hapus</button>
                        `
                    ) : `
                        <button class="detail-btn flex-1 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm" data-id="${pengajuandana.id}"><i class="fas fa-eye mr-1"></i> Detail</button>
                        ${(status === 'pending' || status === '1') ? `
                            <button class="approve-btn flex-1 py-2.5 bg-green-500 text-white rounded-lg text-sm font-bold shadow-sm" data-id="${pengajuandana.id}"><i class="fas fa-check"></i></button>
                            <button class="reject-btn flex-1 py-2.5 bg-gray-600 text-white rounded-lg text-sm font-bold shadow-sm" data-id="${pengajuandana.id}"><i class="fas fa-times"></i></button>
                        ` : ''}
                    `}
                </div>
            </div>
        `;
        cardContainer.append(card);
    });
}

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

function loadData(query = '', page = 1) {
    $.ajax({
        url: "/admin/getpengajuandana",
        type: "GET",
        data: { search: query, page: page, limit: rowsPerPage },
        dataType: "json",
        success: function(res) {
            const data = res.data;
            const isMahasiswa = res.is_mahasiswa;
            if (!Array.isArray(data)) {
                console.error("Response data bukan array:", data);
                return;
            }

            renderTable(data, isMahasiswa);
            renderCards(data, isMahasiswa);
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
$('#searchInputpengajuandana').on('input', function() {
    const query = $(this).val();
    currentPage = 1;
    loadData(query, currentPage);
});

// Reset form
function resetForm() {
    $('#pengajuandanaForm')[0].reset();
    $('#pengajuandanaForm input, #pengajuandanaForm select, #pengajuandanaForm textarea').removeClass('border-red-300 bg-red-50');

    $('#pengajuandanaForm input, #pengajuandanaForm select').each(function() {
        $(this).removeClass('border-red-300 bg-red-50');
        hideFieldError(this);
    });
    $('#pengajuandanaPengajuandana').val('').trigger('change');

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
$('#cancelDeleteBtnApprove').on('click', function() {
    hideModalEnhanced('approveModal');
});
$('#cancelMahasiswaBtn').on('click', function() {
    hideModalEnhanced('detailMahasiswaModal');
});
$('#cancelRejectBtn').on('click', function() {
    hideModalEnhanced('rejectModal');
});
$('#tutupDetailBtn').on('click', function() {
    hideModalEnhanced('detailpengajuandanaModal');
});

$('#closeModal, #cancelBtn').on('click', function() {
    hideModalEnhanced('pengajuandanaModal');
    hideModalEnhanced('detailpengajuandanaModal');
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
        if ($(this).closest('#pengajuandanaModal').length) {
            hideModalEnhanced('pengajuandanaModal');
        } else if ($(this).closest('#deleteModal').length) {
            hideModalEnhanced('deleteModal');
        } else if ($(this).closest('#approveModal').length) {
            hideModalEnhanced('approveModal');
        } else if ($(this).closest('#rejectModal').length) {
            hideModalEnhanced('rejectModal');
        } else if ($(this).closest('#detailpengajuandanaModal').length) {
            hideModalEnhanced('detailpengajuandanaModal');
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
        'pengajuandanaSemester',
        'pengajuandanaIpsemester',
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
$('#pengajuandanaPengajuandana').on('change', function () {
    const selected = $(this).val();

    // Reset semua input
    $('#paketFields input, #sksFields input').val('');
    $('#totalPaket, #totalSks').val('');

    if (selected === '1') {
        // Pilih Paket
        $('#paketFields').removeClass('hidden');
        $('#sksFields').addClass('hidden');
    } else if (selected === '2') {
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
    const sppTetap = parseRupiah($('#det_spp_tetap').text());
    const sppVariabel = parseRupiah($('#det_spp_variabel').text());
    const praktikum = parseRupiah($('#det_praktikum_paket').text());
    
    const total = sppTetap + sppVariabel + praktikum;
    $('#det_total_paket').text(formatRupiah(total));
}

function hitungTotalSks() {
    const jumlahSks = parseInt($('#det_jml_sks').text()) || 0;
    const nominal = parseRupiah($('#det_nominal').text());
    const praktikum = parseRupiah($('#det_praktikum_sks').text());
    
    const total = (jumlahSks * nominal) + praktikum;
    $('#det_total_sks').text(formatRupiah(total));
}

// ==========================================
// 3️⃣ Event Listeners (Input Handling)
// ==========================================

$(document).ready(function() {
    
    // A. Handling Input khusus Rupiah (dengan simbol Rp)
    const rupiahInputs = [
        '#sppTetap', '#sppVariabel', '#praktikumPaket', 
        '#nominal', '#praktikumSks'
    ];

    rupiahInputs.forEach(selector => {
        $(selector).on('input', function() {
            let rawValue = $(this).val().replace(/[^0-9]/g, '');
            $(this).val(formatRupiah(rawValue));

            // Cek harus masuk ke perhitungan Paket atau SKS
            if (selector.includes('Sks') || selector.includes('nominal')) {
                hitungTotalSks();
            } else {
                hitungTotalPaket();
            }
        });
    });

    // B. Handling Input Jumlah SKS (Hanya angka murni)
    $('#jumlahSks').on('input', function() {
        // Hapus karakter non-angka tapi jangan beri formatRupiah
        let value = $(this).val().replace(/[^0-9]/g, '');
        $(this).val(value); 
        
        // Update perhitungan SKS
        hitungTotalSks();
    });

});

$('#pengajuandanaSemester').on('change', function () {
    const semester = $(this).val();

    if (!semester) return;

    $.ajax({
        url: '/admin/get-ip-sebelumnya',
        type: 'GET',
        data: { semester: semester },
        success: function (res) {
            if (res.ip) {
                $('#pengajuandanaIpsemester').val(res.ip); 
            } else {
                $('#pengajuandanaIpsemester').val('');
                showNotification(res.message, res.status);
            }
        },
        error: function () {
            $('#pengajuandanaIpsemester').val('');
            showNotification('Gagal mengambil data IP Semester sebelumnya', 'error');
        }
    });
});


let pengajuandanaEditor;
let currentPengajuandanaId = null;
let isEditMode = false;
// Show add Pengajuandana modal
$('#addSubpengajuandanaBtn').on('click', function() {
    isEditMode = false;
    currentPengajuandanaId = null;
    resetForm();
    $('#pengajuandanaId').val('');

    $('#modalTitle').text('Tambah Pengajuandana Baru');
    $('#modalIcon').removeClass().addClass('fas fa-money-bill');
    $('#submitText').text('Simpan Data');
    $('#submitIcon').removeClass('fa-edit').addClass('fa-save');

    showModalEnhanced('pengajuandanaModal');
    
    $('#pengajuandanaIsparent').val('');
});

$(function () {
    $('#pengajuandanaForm').on('submit', function (e) {
        e.preventDefault();

        if (!validateForm()) {
            showNotification('Mohon lengkapi semua field yang wajib diisi!', 'error');
            return;
        }

        const submitBtn = $('#submitBtn');
        const originalText = submitBtn.html();
        submitBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop('disabled', true);

        // 🔹 Hapus semua format rupiah sebelum dikirim
        $('.rupiah-input').each(function () {
            const cleanValue = $(this).val().replace(/[^0-9]/g, '');
            $(this).val(cleanValue || 0); // pastikan tidak kosong
        });

        const pengajuandanaId = $('#pengajuandanaId').val();
        const url = pengajuandanaId 
            ? `/admin/pengajuandana/${pengajuandanaId}` 
            : '/admin/pengajuandana';

        $.ajax({
            url: url,
            type: 'POST',
            data: $('#pengajuandanaForm').serialize() + (pengajuandanaId ? '&_method=PUT' : ''),
            success: function (response) {
                showNotification(response.message, response.status);
                hideModalEnhanced('pengajuandanaModal');
                submitBtn.html(originalText).prop('disabled', false);
                loadData($('#searchInputpengajuandana').val(), currentPage);
            },
            error: function (xhr) {
                submitBtn.html(originalText).prop('disabled', false);

                if (xhr.status === 422 && xhr.responseJSON.errors) {
                    const errors = xhr.responseJSON.errors;
                    const messages = Object.values(errors).flat().join(' | ');
                    showNotification(messages, 'error');
                } else {
                    showNotification('Terjadi kesalahan saat menyimpan data!', 'error');
                }
            }
        });
    });
});



$(document).on('click', '.edit-btn', function() {
    isEditMode = true;
    currentPengajuandanaId = $(this).data('id');
    resetForm();

    $('#modalTitle').text('Edit Data Pengajuandana');
    $('#modalIcon').removeClass().addClass('fas fa-money-bill');
    $('#submitText').text('Update Data');
    $('#submitIcon').removeClass('fa-save').addClass('fa-edit');

    $.ajax({
        url: '/admin/pengajuandana/' + currentPengajuandanaId,
        type: 'GET',
        success: function(pengajuandana) {
            $('#pengajuandanaId').val(pengajuandana.id);
            $('#pengajuandanaSemester').val(pengajuandana.semester);
            $('#pengajuandanaIpsemester').val(pengajuandana.ip_semester);
            $('#pengajuandanaPengajuandana').val(pengajuandana.tipe).trigger('change');

            if (pengajuandana.tipe === 1) {
                $('#sppTetap').val(formatRupiah(pengajuandana.spp_tetap));
                $('#sppVariabel').val(formatRupiah(pengajuandana.spp_variabel));
                $('#praktikumPaket').val(formatRupiah(pengajuandana.praktikum));
                hitungTotalPaket();
            } else if (pengajuandana.tipe === 2) {
                $('#jumlahSks').val(formatRupiah(pengajuandana.jml_sks));
                $('#nominal').val(formatRupiah(pengajuandana.nominal));
                $('#praktikumSks').val(formatRupiah(pengajuandana.praktikum));
                hitungTotalSks();
            }
            showModal('pengajuandanaModal');
        },
        error: function(xhr) {
            console.error("Gagal ambil data:", xhr.responseText);
            alert('Gagal ambil data pengajuandana');
        }
    });
});

$(document).on('click', '.delete-btn', function() {
    const id = $(this).data('id');  
    const name = $(this).data('name');

    $('#deletepengajuandanaId').val(id); 
    $('#deletePengajuandanaName').text(name);

    showModalEnhanced('deleteModal');
});

// Update delete confirmation handler
$(document).on('click', '#confirmDeleteBtn', function() {
    const deleteBtn = $(this);
    const originalText = deleteBtn.html();
    deleteBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menghapus...')
             .prop('disabled', true);

    const pengajuandanad = $('#deletepengajuandanaId').val();

    $.ajax({
        url: `/admin/pengajuandana/${pengajuandanad}`, 
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
    let pengajuandanaId = $("#pengajuandanaId").val();

    if (!pengajuandanaId) {
        showNotification("ID Pengajuandana tidak ditemukan.");
        return;
    }

    $.ajax({
        url: '/pengajuandana/deleteFoto', 
        type: 'POST',
        data: { id: pengajuandanaId },
        success: function (response) {
            if (response.success) {
                $("#pengajuandanaFoto").val("");
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

$(document).on('input', '#approveDanaDisetujui', function () {
    let value = $(this).val().replace(/[^0-9]/g, '');
    $(this).val(formatRupiah(value));
});

$(document).on('click', '.approve-btn', function() {
    const id = $(this).data('id');  

    resetApproveModal();
    $('#approvepengajuandanaId').val(id); 

    showModalEnhanced('approveModal');
});

$(document).on('click', '#confirApproveBtn', function() {
    const approveBtn = $(this);
    const originalText = approveBtn.html();
    approveBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...')
             .prop('disabled', true);

    const pengajuandanad = $('#approvepengajuandanaId').val();

    // ambil input dari form modal
    let nominalDisetujui = $('#approveDanaDisetujui').val();
    let catatan = $('#approveCatatan').val();

    // convert Rp 1.500.000 → 1500000
    nominalDisetujui = nominalDisetujui.replace(/[^0-9]/g, '');

    $.ajax({
        url: `/admin/pengajuandanaapprove/${pengajuandanad}`,
        type: 'PUT',
        data: {
            nominal_disetujui: nominalDisetujui,
            catatan: catatan
        },
        success: function(response) {
            showNotification(response.message , response.status);
            hideModalEnhanced('approveModal');
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

$(document).on('click', '.reject-btn', function() {
    const id = $(this).data('id');  

    resetApproveModal();
    $('#rejectpengajuandanaId').val(id); 

    showModalEnhanced('rejectModal');
});

$(document).on('click', '#confirmRejectBtn', function() {
    const rejectBtn = $(this);
    const originalText = rejectBtn.html();

    rejectBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...')
             .prop('disabled', true);

    const pengajuandanad = $('#rejectpengajuandanaId').val();
    const catatan = $('#rejectCatatan').val();

    $.ajax({
        url: `/admin/pengajuandanareject/${pengajuandanad}`,
        type: 'PUT',
        data: {
            catatan: catatan
        },
        success: function(response) {
            showNotification(response.message, response.status);

            hideModalEnhanced('rejectModal');
            loadData();
        },
        error: function(xhr) {
            let msg = (xhr.responseJSON && xhr.responseJSON.message)
                        ? xhr.responseJSON.message
                        : 'Gagal menolak data!';
            showNotification(msg, 'error');
        },
        complete: function() {
            rejectBtn.html(originalText).prop('disabled', false);
        }
    });
});

function resetApproveModal() {

    $('#approveDanaDisetujui').val('').removeClass('border-red-300 bg-red-50');
    $('#approveCatatan').val('').removeClass('border-red-300 bg-red-50');
    $('#rejectCatatan').val('').removeClass('border-red-300 bg-red-50');
    $('#approvepengajuandanaId').val('');

    if (typeof hideFieldError === "function") {
        hideFieldError('#approveDanaDisetujui');
        hideFieldError('#approveCatatan');
        hideFieldError('#rejectCatatan');
    }
}

$(document).on('click', '.detail-btn', function() {
    const mahasiswaId = $(this).data('id');
    
    showModalEnhanced('detailpengajuandanaModal');

    $.ajax({
        url: `/admin/mahasiswa/pengajuandanadetail/${mahasiswaId}`,
        type: 'GET',
        success: function(res) {
            $('#det_semester').text(`Semester ${res.semester}`);
            $('#det_ip').text(res.ip_semester);
            $('#det_tipe').text(res.tipe === 1 ? 'Paket' : 'SKS');

            $('#detailPaket').addClass('hidden');
            $('#detailSks').addClass('hidden');

            if (res.tipe === 1) {
                $('#detailPaket').removeClass('hidden');
                $('#det_spp_tetap').text(formatRupiah(res.spp_tetap));
                $('#det_spp_variabel').text(formatRupiah(res.spp_variabel));
                $('#det_praktikum_paket').text(formatRupiah(res.praktikum));
                hitungTotalPaket();
            } else if (res.tipe === 2) {
                $('#detailSks').removeClass('hidden');
                $('#det_jml_sks').text(formatRupiah(res.jml_sks));
                $('#det_nominal').text(formatRupiah(res.nominal));
                $('#det_praktikum_sks').text(formatRupiah(res.praktikum));
                hitungTotalSks();
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