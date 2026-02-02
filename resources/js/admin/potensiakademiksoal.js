import $ from 'jquery';
$(document).ready(function () {
    let waktuPengerjaan = parseInt($('#waktuPengerjaan').val(), 10) * 60; 
    const countdown = document.getElementById('countdown');
    const form = $('#testForm');
    let submitted = false; 

    function updateTimer() {
        let minutes = Math.floor(waktuPengerjaan / 60);
        let seconds = waktuPengerjaan % 60;
        countdown.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;


        if(waktuPengerjaan <= 0 && !submitted){
            clearInterval(timerInterval);
            alert("Waktu Habis! Jawaban akan otomatis disubmit.");
            submitForm();
        }
        waktuPengerjaan--;
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    const modal = $('#confirmModal');
    const confirmBtn = $('#confirmSubmit');
    const cancelBtn = $('#cancelSubmit');


    function submitForm() {

        submitted = true;

        const submitBtn = $('#submit');
        const originalText = submitBtn.html();

        submitBtn
            .html('<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...')
            .prop('disabled', true);

        $.ajax({
            url: window.submitRoute,
            type: 'POST',
            data: form.serialize(),
            success: function (res) {
                if (res.status === 'success') {
                    showNotification(res.message, 'success');
                    setTimeout(() => {
                        window.location.href = res.redirect_url;
                    }, 2000);
                }
            },
            error: function () {
                alert('Gagal submit jawaban');
            },
            complete: function () {
                submitBtn.html(originalText).prop('disabled', false);
            }
        });
    }

    form.on('submit', function(e){
        e.preventDefault();

        if (!submitted) {
            modal.removeClass('hidden').addClass('flex');
        }
    });
    cancelBtn.on('click', function () {
        modal.addClass('hidden').removeClass('flex');
    });
    
    confirmBtn.on('click', function () {
        modal.addClass('hidden').removeClass('flex');
        clearInterval(timerInterval);
        submitForm();
    });



});

// Notifikasi
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
