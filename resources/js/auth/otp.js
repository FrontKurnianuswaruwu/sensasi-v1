import $ from 'jquery';

window.$ = window.jQuery = $;

$(document).ready(function () {
    $('#otpForm').on('submit', function(e) {
        e.preventDefault();
        $('#otp-error').addClass('hidden');

        let otp = $('#otp').val().trim();
        let email = $('#otpForm').data('email'); // ambil dari data-email di form

        if (otp.length !== 6) {
            $('#otp-error').text('OTP harus 6 digit').removeClass('hidden');
            return;
        }

        $('#verifyText').addClass('hidden');
        $('#verifyLoading').removeClass('hidden');
        $('#verifyBtn').prop('disabled', true);

        $.ajax({
            url: "/verify-otp",
            type: "POST",
            data: {
                email: email,
                otp: otp,
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            success: function () {
                showToast("OTP berhasil diverifikasi!");
                setTimeout(() => window.location.href = "/login", 1500);
            },
            error: function(xhr) {
                let msg = xhr.responseJSON?.message ?? "OTP tidak valid";
                $('#otp-error').text(msg).removeClass('hidden');
            },
            complete: function () {
                $('#verifyText').removeClass('hidden');
                $('#verifyLoading').addClass('hidden');
                $('#verifyBtn').prop('disabled', false);
            }
        });
    });

    function showToast(message) {
        $('#toast-message').text(message);
        $('#toast').fadeIn();
        setTimeout(() => $('#toast').fadeOut(), 3000);
    }

    $('#resendOtp').on('click', function () {
        const email = $('#otpForm').data('email');

        $(this).prop('disabled', true).text('Mengirim...');

        $.ajax({
            url: "/resend-otp",
            type: "POST",
            data: {
                email: email,
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            success: function () {
                showToast("OTP baru berhasil dikirim ke email!");
            },
            error: function (xhr) {
                let msg = xhr.responseJSON?.message ?? "Gagal mengirim OTP";
                showToast(msg);
            },
            complete: function () {
                $('#resendOtp').prop('disabled', false).text('Kirim Ulang OTP');
            }
        });
    });
});
