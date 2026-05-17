import $ from 'jquery';

$(document).ready(function () {

    const TOTAL_SOAL  = window.TOTAL_SOAL;
    let currentIndex  = 0;
    let submitted     = false;
    const jawaban     = {};
    const lockedSoals = {};  // Track soal yang sudah dijawab & di-next-kan (terkunci)

    const KATEGORI_ID = $('input[name="kategori_id"]').val();
    const START_KEY   = `potensi_start_${KATEGORI_ID}`; 
    const waktuAwal   = parseInt($('#waktuPengerjaan').val(), 10) * 60;
    const countdown   = document.getElementById('countdown');

    let startTime = sessionStorage.getItem(START_KEY);
    if (!startTime) {
        startTime = Date.now();
        sessionStorage.setItem(START_KEY, startTime);
    } else {
        startTime = parseInt(startTime, 10);
    }

    function getSisaDetik() {
        const selisihDetik = Math.floor((Date.now() - startTime) / 1000);
        return Math.max(0, waktuAwal - selisihDetik);
    }

    function updateCountdown() {
        const sisa = getSisaDetik();
        const m    = Math.floor(sisa / 60);
        const s    = sisa % 60;
        countdown.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;

        if (sisa <= 60) {
            countdown.classList.add('text-red-500');
            countdown.classList.remove('text-orange-500');
        }

        if (sisa <= 0 && !submitted) {
            clearInterval(timerInterval);
            sessionStorage.removeItem(START_KEY);
            showNotification('Waktu habis! Jawaban otomatis dikumpulkan.', 'error');
            submitForm(true);
        }
    }

    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    function showSoal(index) {
        $('.soal-card').addClass('hidden');
        $(`.soal-card[data-index="${index}"]`).removeClass('hidden');
        currentIndex = index;
        updateUI();
    }

    function updateUI() {
        $('#currentSoalNum').text(currentIndex + 1);

        const dijawab = Object.keys(jawaban).length;
        const persen  = Math.round((dijawab / TOTAL_SOAL) * 100);
        $('#progressBar').css('width', persen + '%');
        $('#progressPercent').text(persen + '% terjawab');

        $('.soal-nav-btn').each(function (i) {
            $(this).removeClass('bg-orange-500 border-orange-500 bg-green-500 border-green-500 bg-white border-gray-200 text-gray-500 text-white opacity-50 cursor-not-allowed');

            const soalId = String($(`.soal-card[data-index="${i}"]`).data('soal-id'));
            const isLocked = lockedSoals[soalId];

            if (i === currentIndex) {
                $(this).addClass('bg-orange-500 border-orange-500 text-white');
            } else if (isLocked) {
                // Soal sudah terkunci (dijawab & sudah next)
                $(this).addClass('bg-green-500 border-green-500 text-white opacity-50 cursor-not-allowed');
            } else if (soalId && jawaban[soalId]) {
                $(this).addClass('bg-green-500 border-green-500 text-white');
            } else {
                $(this).addClass('bg-white border-gray-200 text-gray-500');
            }
        });

        // Back button: disabled jika index 0 ATAU semua soal sebelumnya sudah terkunci
        let canGoBack = false;
        for (let i = currentIndex - 1; i >= 0; i--) {
            const prevSoalId = String($(`.soal-card[data-index="${i}"]`).data('soal-id'));
            if (!lockedSoals[prevSoalId]) {
                canGoBack = true;
                break;
            }
        }
        $('#btnBack').prop('disabled', currentIndex === 0 || !canGoBack);

        const isLast = currentIndex === TOTAL_SOAL - 1;
        $('#btnNextText').text(isLast ? 'Kumpulkan' : 'Berikutnya');
        $('#btnNextIcon').attr('class', isLast
            ? 'fas fa-paper-plane text-sm'
            : 'fas fa-arrow-right text-sm'
        );
    }

    $(document).on('change', 'input[type="radio"]', function () {
        const soalId    = this.name.match(/\[(\d+)\]/)[1];
        jawaban[soalId] = this.value;

        const soalCard = $(this).closest('.soal-card');
        soalCard.find('.pilihan-label').each(function () {
            $(this).removeClass('border-orange-400 bg-orange-50');
            $(this).find('.pilihan-circle')
                   .removeClass('border-orange-500 bg-orange-500 text-white')
                   .addClass('border-gray-200 text-gray-400');
        });

        const label = $(this).closest('.pilihan-label');
        label.addClass('border-orange-400 bg-orange-50');
        label.find('.pilihan-circle')
             .removeClass('border-gray-200 text-gray-400')
             .addClass('border-orange-500 bg-orange-500 text-white');

        updateUI();
    });

    // Fungsi untuk mengunci soal saat ini jika sudah dijawab
    function lockCurrentSoalIfAnswered() {
        const currentSoalId = String($(`.soal-card[data-index="${currentIndex}"]`).data('soal-id'));
        if (jawaban[currentSoalId] && !lockedSoals[currentSoalId]) {
            lockedSoals[currentSoalId] = true;
            // Disable radio buttons di soal yang terkunci
            $(`.soal-card[data-index="${currentIndex}"] input[type="radio"]`).prop('disabled', true);
            $(`.soal-card[data-index="${currentIndex}"] .pilihan-label`)
                .addClass('cursor-default')
                .removeClass('cursor-pointer hover:border-orange-300 hover:bg-orange-50');
        }
    }

    $(document).on('click', '.soal-nav-btn', function () {
        const targetIndex = parseInt($(this).data('index'));
        const targetSoalId = String($(`.soal-card[data-index="${targetIndex}"]`).data('soal-id'));

        // Jangan bisa klik soal yang sudah terkunci
        if (lockedSoals[targetSoalId]) return;

        // Kunci soal saat ini sebelum pindah (jika sudah dijawab)
        lockCurrentSoalIfAnswered();

        showSoal(targetIndex);
    });

    $('#btnNext').on('click', function () {
        if (currentIndex < TOTAL_SOAL - 1) {
            // Kunci soal saat ini sebelum pindah (jika sudah dijawab)
            lockCurrentSoalIfAnswered();
            showSoal(currentIndex + 1);
        } else {
            openConfirmModal();
        }
    });

    $('#btnBack').on('click', function () {
        // Cari soal sebelumnya yang belum terkunci
        for (let i = currentIndex - 1; i >= 0; i--) {
            const prevSoalId = String($(`.soal-card[data-index="${i}"]`).data('soal-id'));
            if (!lockedSoals[prevSoalId]) {
                showSoal(i);
                return;
            }
        }
    });

    function openConfirmModal() {
        const dijawab = Object.keys(jawaban).length;
        $('#summaryJawab').text(dijawab);
        $('#warningBelumJawab').toggleClass('hidden', dijawab === TOTAL_SOAL);
        $('#confirmModal').removeClass('hidden').addClass('flex');
    }

    $('#cancelSubmit').on('click', function () {
        $('#confirmModal').addClass('hidden').removeClass('flex');
    });

    $('#confirmSubmit').on('click', function () {
        $('#confirmModal').addClass('hidden').removeClass('flex');
        clearInterval(timerInterval);
        sessionStorage.removeItem(START_KEY);
        submitForm(false);
    });

    $('#confirmModal').on('click', function (e) {
        if ($(e.target).is('#confirmModal')) {
            $(this).addClass('hidden').removeClass('flex');
        }
    });

    $('#testForm').on('submit', function (e) {
        e.preventDefault();
        if (!submitted) openConfirmModal();
    });

    function submitForm(autoSubmit = false) {
        if (submitted) return;
        submitted = true;

        clearInterval(timerInterval);
        sessionStorage.removeItem(START_KEY);

        // Re-enable semua radio yang di-disable (locked) agar value ikut terkirim
        $('#testForm input[type="radio"]').prop('disabled', false);

        $('#btnNext').prop('disabled', true)
                     .html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...');

        $.ajax({
            url:  window.submitRoute,
            type: 'POST',
            data: $('#testForm').serialize(),
            success: function (res) {
                if (res.status === 'success') {
                    showNotification(res.message, 'success');
                    setTimeout(() => {
                        window.location.href = res.redirect_url;
                    }, 1500);
                } else {
                    showNotification('Gagal menyimpan jawaban.', 'error');
                    submitted = false;
                    $('#btnNext').prop('disabled', false);
                    updateUI();
                }
            },
            error: function () {
                showNotification('Terjadi kesalahan. Coba lagi.', 'error');
                submitted = false;
                $('#btnNext').prop('disabled', false);
                updateUI();
            }
        });
    }

    updateUI();

    if (getSisaDetik() <= 0) {
        clearInterval(timerInterval);
        sessionStorage.removeItem(START_KEY);
        showNotification('Waktu habis! Jawaban otomatis dikumpulkan.', 'error');
        submitForm(true);
    }

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