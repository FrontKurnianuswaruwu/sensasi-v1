import $ from 'jquery';

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function() {
    loadData();
});

function loadTahunAkademik(selectedType = '') {
    // Tambahkan return agar loadData tahu kapan ini selesai
    return $.get('/admin/biodata/gettahunakademik', function(response) {
        const tahunakademiks = Array.isArray(response.data) ? response.data : [];
        $('#tahun_akademik').empty().append('<option value="">Pilih Tahun Akademik</option>');
        tahunakademiks.forEach(function(tahunakademik) {
            var selected = tahunakademik.id == selectedType ? 'selected' : '';
            $('#tahun_akademik').append(`<option value="${tahunakademik.id}" ${selected}>${tahunakademik.tahun_akademik}</option>`);
        });
    });
}

function loadMitra(selectedType = '') {
    // Tambahkan return
    return $.get('/admin/getmitra/universitas', function(response) {
        const mitras = Array.isArray(response.data) ? response.data : [];
        $('#universitas').empty().append('<option value="">Pilih Universitas</option>');
        mitras.forEach(function(mitra) {
            var selected = mitra.id == selectedType ? 'selected' : '';
            $('#universitas').append(`<option value="${mitra.id}" ${selected}>${mitra.nama_mitra}</option>`);
        });
    });
}

function loadData() {
    $.ajax({
        url: "/admin/getbiodatamahasiswa",
        type: "GET",
        dataType: "json",
        success: function(res) {
            const user = res.data;
            const biodata = user.biodata_mahasiswa;

            console.log("Data biodata mahasiswa diterima:", user);

            if (!user || !user.biodata_mahasiswa) {
                console.warn("Data biodata mahasiswa tidak ditemukan:", user);
                return;
            }


            // 🧩 Isi otomatis semua input form
            $('#user_id').val(biodata.user_id);
            $('#nama').val(user.name);
            $('#nim').val(biodata.nim);
            $('#tempat_lahir').val(biodata.tempat_lahir);
            $('#tanggal_lahir').val(biodata.tanggal_lahir);
            $('#jenis_kelamin').val(biodata.jenis_kelamin);
            $('#alamat_ktp').val(biodata.alamat_ktp);
            $('#nik').val(biodata.nik);
            $('#no_wa').val(biodata.no_wa);
            $('#agama').val(biodata.agama ?? "");
            $('#status_pernikahan').val(biodata.status_pernikahan);
            $('#jumlah_saudara').val(biodata.jumlah_saudara);
            $('#anak_ke').val(biodata.anak_ke);

            if (biodata.foto) {
                $('#fotoPreview').attr('src', '/' + biodata.foto);
            } else {
                $('#fotoPreview').attr('src', '/img/default-avatar.jpg');
            }

            let promises = [];
            if (user.akademik) {
                promises.push(loadTahunAkademik(user.akademik.tahun_akademik_id));
                promises.push(loadMitra(user.akademik.mitra_id));
                
                $('#fakultas').val(user.akademik.fakultas);
                $('#program_studi').val(user.akademik.program_studi);
                $('#semester').val(user.akademik.semester);
                $('#ip_terakhir').val(user.akademik.ip_terakhir);
                $('#tahun_akademik_id').val(user.akademik.tahun_akademik_id);
            }
            if (user.orangtua) fillOrangtua(user.orangtua);
            if (user.dokumen) fillDokumen(user.dokumen);
            Promise.all(promises).then(() => {
                console.log("Semua data (termasuk dropdown) sudah siap!");
                checkSequentialValidation();
            });
        },
        error: function(xhr, status, error) {
            console.error("Gagal ambil data:", error, xhr.responseText);
        }
    });
}

function formatRupiah(angka) {
    if (!angka) return '';

    let sisa = angka.length % 3;
    let rupiah = angka.substr(0, sisa);
    let ribuan = angka.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    return 'Rp ' + rupiah;
}

// Fungsi isi form orangtua
function fillOrangtua(o) {
    $('#nama_ayah').val(o.nama_ayah);
    $('#pekerjaan_ayah').val(o.pekerjaan_ayah);
    $('#pendidikan_ayah').val(o.pendidikan_ayah);
    $('#penghasilan_ayah').val(formatRupiah(o.penghasilan_ayah));
    $('#nama_ibu').val(o.nama_ibu);
    $('#pekerjaan_ibu').val(o.pekerjaan_ibu);
    $('#pendidikan_ibu').val(o.pendidikan_ibu);
    $('#penghasilan_ibu').val(formatRupiah(o.penghasilan_ibu));
    $('#jumlah_tanggungan').val(o.jumlah_tanggungan);
    $('#no_wa_ortu').val(o.no_wa_ortu);
}

function fillDokumen(d) {
    toggleDokumenPreview('#scan_ktp', d.scan_ktp);
    toggleDokumenPreview('#scan_kartu_mahasiswa', d.scan_kartu_mahasiswa);
    toggleDokumenPreview('#scan_kk', d.scan_kk);
    toggleDokumenPreview('#transkrip_nilai', d.transkrip_nilai);
    toggleDokumenPreview('#surat_keterangan_aktif', d.surat_keterangan_aktif);
    toggleDokumenPreview('#foto_profil', d.foto_profil);
    toggleDokumenPreview('#essay_motivasi', d.essay_motivasi);
    toggleDokumenPreview('#sertifikat_prestasi', d.sertifikat_prestasi);
}

const rupiahInputs = ['#penghasilan_ibu', '#penghasilan_ayah'];

rupiahInputs.forEach(selector => {
    $(document).on('input', selector, function () {
        let cursorPos = this.selectionStart;
        let value = $(this).val();

        // ambil angka saja
        let number = value.replace(/[^0-9]/g, '');

        // format rupiah
        let formatted = formatRupiah(number);

        $(this).val(formatted);

        // kembalikan posisi kursor
        let diff = formatted.length - value.length;
        this.setSelectionRange(cursorPos + diff, cursorPos + diff);
    });
});

// Fungsi bantu untuk tampilkan tombol preview dokumen
function toggleDokumenPreview(selector, filePath) {
    const input = $(selector);
    const container = input.parent(); // ambil elemen <div class="space-y-2">

    // hapus dulu tombol "Lihat File" lama biar gak dobel
    container.find(".lihat-file-btn").remove();

    if (filePath && filePath.trim() !== "") {
        // Sesuaikan URL sesuai lokasi file sebenarnya
        const fileUrl = "/" + filePath; // karena file ada di public/pdf/dokumen
        const link = `
            <a href="${fileUrl}" target="_blank"
                class="lihat-file-btn inline-flex items-center px-2 py-1 mt-2 text-xs text-white bg-blue-primary rounded-lg hover:bg-blue-600">
                <i class="fas fa-eye mr-1"></i>Lihat File
            </a>
        `;
        container.append(link);
    }
}


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

$("#biodataForm").on("submit", function (e) {
    e.preventDefault();

    const requiredFields = {
        'nama': 'Nama Lengkap',
        'nik': 'NIK',
        'jenis_kelamin': 'Jenis Kelamin',
        'tempat_lahir': 'Tempat Lahir',
        'tanggal_lahir': 'Tanggal Lahir',
        'alamat_ktp': 'Alamat KTP',
        'no_wa': 'Nomor WhatsApp',
        'agama': 'Agama',
        'status_pernikahan': 'Status',
        'anak_ke' : 'Anak Ke',
        'jumlah_saudara' : 'Jumlah Saudara'
    };

    let emptyFields = [];
    let firstEmptyInput = null;

    for (const [name, label] of Object.entries(requiredFields)) {
        const input = $(`[name="${name}"]`);
        
        if (!input.val() || input.val().trim() === "") {
            emptyFields.push(label);
            
            input.addClass('border-red-500 bg-red-50');
            
            if (!firstEmptyInput) firstEmptyInput = input;
        } else {
            input.removeClass('border-red-500 bg-red-50');
        }
    }

    if (emptyFields.length > 0) {
        showNotification(
            `Mohon lengkapi data berikut: <br><ul class="text-left ml-4 list-disc"><li>${emptyFields.join('</li><li>')}</li></ul>`, 
            'error'
        );
        
        if (firstEmptyInput) firstEmptyInput.focus();
        
        return false;
    }


    const submit = $('#submit');
    const originalText = submit.html();
    submit.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop('disabled', true);

    let formData = new FormData(this);

    $.ajax({
        url: "/admin/biodatamahasiswa",
        type: "POST",       
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            'X-HTTP-Method-Override': 'PUT'
        },
        dataType: "json",
        success: function (response) {
            showNotification(response.message, response.status);
            submit.html(originalText).prop('disabled', false);
            loadData();
        },
        error: function(xhr) {
            submit.html(originalText).prop('disabled', false);

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

$('#ip_terakhir').on('input', function() {
    let val = $(this).val();

    // 1. Cek jika angka di depan koma/titik lebih dari 4
    let parts = val.split('.');
    if (parseFloat(parts[0]) > 4) {
        $(this).val(4);
        return;
    }

    // 2. Batasi maksimal 3 angka di belakang koma menggunakan Regex
    // Regex ini mencari: angka depan (0-4), lalu titik, lalu maksimal 3 angka
    if (val.indexOf('.') !== -1) {
        if (parts[1].length > 3) {
            $(this).val(parts[0] + '.' + parts[1].slice(0, 3));
        }
    }
});

$("#akademikForm").on("submit", function (e) {
    e.preventDefault();

    const requiredFields = {
        'universitas': 'Universitas / Perguruan Tinggi',
        'tahun_akademik': 'Tahun Akademik Aktif',
        'nim': 'Nomor Induk Mahasiswa (NIM)',
        'fakultas': 'Nama Fakultas',
        'program_studi': 'Program Studi',
        'semester': 'Semester Saat Ini',
        'ip_terakhir': 'Indeks Prestasi (IP) Terakhir'
    };

    let emptyFields = [];
    let firstEmptyInput = null;

    for (const [name, label] of Object.entries(requiredFields)) {
        const input = $(`[name="${name}"]`);
        const value = input.val();

        if (!value || value.toString().trim() === "") {
            emptyFields.push(label);
            input.addClass('border-red-500 bg-red-50');
            
            if (!firstEmptyInput) firstEmptyInput = input;
        } else {
            input.removeClass('border-red-500 bg-red-50');
        }
    }

    const ipInput = $('[name="ip_terakhir"]');
    if (ipInput.val() > 4 || ipInput.val() < 0) {
        showNotification('Nilai IP tidak valid! Harus di antara 0.00 - 4.00', 'error');
        ipInput.addClass('border-red-500 bg-red-50').focus();
        return false;
    }

    if (emptyFields.length > 0) {
        showNotification(
            `Harap isi bidang berikut: <br><ul class="text-left ml-4 list-disc mt-2"><li>${emptyFields.join('</li><li>')}</li></ul>`, 
            'error'
        );
        if (firstEmptyInput) firstEmptyInput.focus();
        return false; 
    }

    const submit = $('#submitakademik');
    const originalText = submit.html();
    submit.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop('disabled', true);

    const formData = $(this).serialize();

    $.ajax({
        url: "/admin/akademikmahasiswa",
        type: "PUT",
        data: formData,
        dataType: "json",
        success: function (response) {
            showNotification(response.message, response.status);
            submit.html(originalText).prop('disabled', false);
            loadData();
        },
        error: function(xhr) {
            submit.html(originalText).prop('disabled', false);

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

$("#orangtuaForm").on("submit", function (e) {
    e.preventDefault();

    const requiredFields = {
        'nama_ayah': 'Nama Lengkap Ayah',
        'pekerjaan_ayah': 'Pekerjaan Ayah',
        'pendidikan_ayah': 'Pendidikan Ayah',
        'penghasilan_ayah': 'Penghasilan Ayah',
        'nama_ibu': 'Nama Lengkap Ibu',
        'pekerjaan_ibu': 'Pekerjaan Ibu',
        'pendidikan_ibu': 'Pendidikan Ibu',
        'penghasilan_ibu': 'Penghasilan Ibu',
        'jumlah_tanggungan': 'Jumlah Tanggungan',
        'no_wa_ortu': 'No. WA Orang Tua'
    };

    let emptyFields = [];
    let firstEmptyInput = null;

    for (const [name, label] of Object.entries(requiredFields)) {
        const input = $(`[name="${name}"]`);
        if (!input.val() || input.val().toString().trim() === "") {
            emptyFields.push(label);
            input.addClass('border-red-500 bg-red-50');
            if (!firstEmptyInput) firstEmptyInput = input;
        } else {
            input.removeClass('border-red-500 bg-red-50');
        }
    }

    if (emptyFields.length > 0) {
        showNotification(
            `Data belum lengkap: <br><ul class="text-left ml-4 list-disc mt-2"><li>${emptyFields.join('</li><li>')}</li></ul>`, 
            'error'
        );
        if (firstEmptyInput) firstEmptyInput.focus();
        return false;
    }

    const submit = $('#submitorangtua');
    const originalText = submit.html();
    
    const backupValues = {};
    $('.rupiah-input').each(function () {
        backupValues[this.id] = $(this).val();
        const cleanValue = $(this).val().replace(/[^0-9]/g, '');
        $(this).val(cleanValue || 0); 
    });

    submit.html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...').prop('disabled', true);
    const formData = $(this).serialize();

    $('.rupiah-input').each(function () {
        $(this).val(backupValues[this.id]);
    });

    $.ajax({
        url: "/admin/orangtuamahasiswa",
        type: "PUT",
        data: formData,
        dataType: "json",
        success: function (response) {
            showNotification(response.message, response.status);
            submit.html(originalText).prop('disabled', false);
            loadData();
        },
        error: function(xhr) {
            submit.html(originalText).prop('disabled', false);

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

$('input[type="file"]').on('change', function() {
    const file = this.files[0];
    const maxSize = 500 * 1024; 
    
    const labelText = $(this).closest('.space-y-2').find('label').text().trim();
    
    const container = $(this).next('div'); 
    const fileNameDisplay = container.find('.file-name');
    const previewBtn = container.find('.btn-preview');

    if (file) {
        if (file.size > maxSize) {
            showNotification(`File "${labelText}" terlalu besar! Maksimal 500 KB.`, 'error');
            
            $(this).val('');
            fileNameDisplay.text('Pilih file...').removeClass('text-orange-600 font-bold');
            previewBtn.addClass('hidden');
        } else {
            showNotification(`File "${labelText}" terpilih.`, 'success');

            fileNameDisplay.text(file.name).addClass('text-orange-600 font-bold');
            previewBtn.removeClass('hidden');

            const fileURL = URL.createObjectURL(file);
            previewBtn.off('click').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); 
                window.open(fileURL, '_blank');
            });
        }
    }
});

$("#dokumenForm").on("submit", function (e) {
    e.preventDefault();

    const requiredDocs = {
        'scan_ktp': 'Scan KTP',
        'scan_kartu_mahasiswa': 'Scan Kartu Mahasiswa',
        'scan_kk': 'Scan Kartu Keluarga',
        'transkrip_nilai': 'Transkrip Nilai',
        'surat_keterangan_aktif': 'Surat Keterangan Aktif',
        'foto_profil': 'Foto Profil',
        'essay_motivasi': 'Essay Motivasi',
        'sertifikat_prestasi': 'Sertifikat Prestasi',
    };

    let missingDocs = [];
    let firstError = null;

    for (const [id, label] of Object.entries(requiredDocs)) {
        const input = $(`#${id}`);
        const container = input.next('div'); 

        if (input[0].files.length === 0) {
            missingDocs.push(label);
            
            container.addClass('border-red-500 bg-red-50').removeClass('border-gray-200');
            
            if (!firstError) firstError = input;
        } else {
            container.removeClass('border-red-500 bg-red-50').addClass('border-green-500');
        }
    }

    if (missingDocs.length > 0) {
        showNotification(
            `Semua dokumen wajib diunggah ulang: <br><ul class="text-left ml-4 list-disc mt-2"><li>${missingDocs.join('</li><li>')}</li></ul>`, 
            'error'
        );
        
        if (firstError) {
            $('html, body').animate({
                scrollTop: firstError.offset().top - 150
            }, 500);
        }
        return false;
    }

    const submit = $('#submitdokumen');
    const originalText = submit.html();
    
    submit.html('<i class="fas fa-spinner fa-spin mr-2"></i>Sedang Mengunggah...').prop('disabled', true);

    const formData = new FormData(this);

    $.ajax({
        url: "/admin/dokumenmahasiswa",
        type: "POST", 
        data: formData,
        processData: false, 
        contentType: false, 
        success: function (response) {
            showNotification(response.message, response.status);
            submit.html(originalText).prop('disabled', false);
            loadData();
            // reload halaman setelah 2 detik untuk update preview dokumen
            setTimeout(() => {
                location.reload();
            }, 2000);
        },
        error: function(xhr) {
            submit.html(originalText).prop('disabled', false);

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

$('#foto').on('change', function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        $('#fotoPreview').attr('src', e.target.result);
    };
    reader.readAsDataURL(file);
});

const tabOrder = ['biodata', 'akademik', 'orangtua', 'dokumen'];

function checkSequentialValidation() {
    tabOrder.forEach((currentTab, index) => {
        const nextTab = tabOrder[index + 1];
        if (!nextTab) return;

        const $currentContent = $(`#${currentTab}`);
        const $nextTabBtn = $(`[data-tab="${nextTab}"]`);

        let isComplete = true;

        const $fieldsToCheck = $currentContent.find('[data-required="true"]');

        $fieldsToCheck.each(function() {
            if ($(this).attr('type') === 'file') {
                if (this.files.length === 0) {
                    isComplete = false;
                    return false;
                }
            } else {
                const value = $(this).val();
                if (!value || value.toString().trim() === "") {
                    isComplete = false;
                    return false;
                }
            }
        });

        if (isComplete) {
            $nextTabBtn.prop('disabled', false)
                       .removeClass('opacity-50 cursor-not-allowed')
                       .addClass('hover:text-blue-primary');
        } else {
            for (let i = index + 1; i < tabOrder.length; i++) {
                $(`[data-tab="${tabOrder[i]}"]`)
                    .prop('disabled', true)
                    .addClass('opacity-50 cursor-not-allowed')
                    .removeClass('hover:text-blue-primary');
            }
        }
    });
}

