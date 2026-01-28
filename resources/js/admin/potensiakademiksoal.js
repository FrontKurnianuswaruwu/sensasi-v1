import $ from 'jquery';
$(document).ready(function () {
    let timeLeft = 1 * 10; // 10 menit, bisa disesuaikan
    const countdown = document.getElementById('countdown');
    const form = $('#testForm');
    let submitted = false; // untuk mencegah double submit

    function updateTimer() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        countdown.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;

        if(timeLeft <= 0 && !submitted){
            clearInterval(timerInterval);
            alert("Waktu Habis! Jawaban akan otomatis disubmit.");
            submitForm();
        }
        timeLeft--;
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    function submitForm() {
        submitted = true;

        $.ajax({
            url: window.submitRoute, // ambil dari Blade
            type: 'POST',
            data: form.serialize(),
            success: function (res) {
                if(res.status === 'success'){
                    showNotification(res.message, res.status);
                    setTimeout(() => {
                        window.location.href = res.redirect_url;
                    }, 2000);
                }
            },
            error: function () {
                alert('Gagal submit jawaban');
            }
        });
    }

    form.on('submit', function(e){
        e.preventDefault();
        if(!submitted){
            clearInterval(timerInterval);
            submitForm();
        }
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
