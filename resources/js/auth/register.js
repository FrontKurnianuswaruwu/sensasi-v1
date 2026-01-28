import $ from 'jquery';

window.$ = window.jQuery = $;

$(document).ready(function () {

    $('#registerForm').on('submit', function (e) {
        e.preventDefault();

        // Reset error
        $('.text-red-300').addClass('hidden');

        let name = $('#name').val().trim();
        let email = $('#email').val().trim();
        let mitra = $('#mitra').val().trim();
        let password = $('#password').val();
        let confirm = $('#password_confirmation').val();
        let valid = true;

        if (email === '') {
            $('#email-error').removeClass('hidden');
            valid = false;
        }
        if (mitra === '') {
            $('#mitra-error').removeClass('hidden');
            valid = false;
        }

        if (password.length < 8) {
            $('#password-error').removeClass('hidden');
            valid = false;
        }

        if (password !== confirm) {
            $('#confirm-error').removeClass('hidden');
            valid = false;
        }

        if (name === '') {
            $('#name-error').removeClass('hidden');
            valid = false;
        }

        if (!valid) return;

        // Loading state
        $('#registerText').addClass('hidden');
        $('#registerLoading').removeClass('hidden');
        $('#registerBtn').prop('disabled', true);

        $.ajax({
            url: "/registerpost",
            type: "POST",
            data: {
                name: name,
                email: email,
                mitra: mitra,
                password: password,
                password_confirmation: confirm,
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            success: function (res) {
                // redirect ke halaman OTP
                window.location.href = res.redirect;
            },
            error: function (xhr) {
                let msg = xhr.responseJSON?.message ?? "Registrasi gagal";
                showToast(msg);
            },
            complete: function () {
                $('#registerText').removeClass('hidden');
                $('#registerLoading').addClass('hidden');
                $('#registerBtn').prop('disabled', false);
            }
        });
    });

    function showToast(message) {
        $('#toast-message').text(message);
        $('#toast').fadeIn();
        setTimeout(() => $('#toast').fadeOut(), 3000);
    }

    $('#togglePassword').on('click', function () {
        const input = $('#password');
        const icon = $(this).find('i');

        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            input.attr('type', 'password');
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });

    $('#toggleConfirm').on('click', function () {
        const input = $('#password_confirmation');
        const icon = $(this).find('i');

        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            input.attr('type', 'password');
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });


});
