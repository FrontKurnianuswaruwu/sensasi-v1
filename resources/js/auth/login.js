import $ from 'jquery';
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
$(function() {
    // Password visibility toggle
    $('#togglePassword').on('click', function() {
        const passwordField = $('#password');
        const passwordIcon = $('#passwordIcon');
        
        if (passwordField.attr('type') === 'password') {
            passwordField.attr('type', 'text');
            passwordIcon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            passwordField.attr('type', 'password');
            passwordIcon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });

    // Form validation and submission
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        
        // Reset errors
        $('.text-red-300').addClass('hidden');
        
        const email = $('#email').val().trim();
        const password = $('#password').val().trim();
        let isValid = true;

        // Validate email
        if (!email) {
            $('#email-error').removeClass('hidden');
            $('#email').addClass('border-red-400');
            isValid = false;
        } else {
            $('#email').removeClass('border-red-400');
        }

        // Validate password
        if (!password) {
            $('#password-error').removeClass('hidden');
            $('#password').addClass('border-red-400');
            isValid = false;
        } else {
            $('#password').removeClass('border-red-400');
        }

        if (isValid) {
            $('#loginText').addClass('hidden');
            $('#loginLoading').removeClass('hidden');
            $('#loginBtn').prop('disabled', true);

            // AJAX POST to /login/post
            $.ajax({
                url: '/login/post',
                method: 'POST',
                data: {
                    email: email,
                    password: password,
                },
                success: function(response) {
                    if (response.success) {
                        showToast('success', 'Login Berhasil!', 'Selamat datang di Dashboard SENSASI');
                        setTimeout(function() {
                            window.location.href = response.route;
                        }, 1500);
                    } else {
                        showToast('error', 'Login Gagal!', response.message || 'Username atau password salah');
                    }
                },
                error: function(xhr) {
                    let errorMsg = 'Terjadi kesalahan pada server';
                    if (xhr.responseJSON && xhr.responseJSON.message) {
                        errorMsg = xhr.responseJSON.message;
                    }
                    showToast('error', 'Login Gagal!', errorMsg);
                },
                complete: function() {
                    // Reset button state
                    $('#loginText').removeClass('hidden');
                    $('#loginLoading').addClass('hidden');
                    $('#loginBtn').prop('disabled', false);
                }
            });
        }
    });

    

    // Input focus effects
    $('input').on('focus', function() {
        $(this).parent().addClass('scale-102');
    }).on('blur', function() {
        $(this).parent().removeClass('scale-102');
    });

    // Toast notification function
    function showToast(type, title, message) {
        const toast = $('#toast');
        const icon = $('#toast-icon');
        
        if (type === 'success') {
            icon.html('<i class="fas fa-check-circle text-green-500 text-xl"></i>');
        } else {
            icon.html('<i class="fas fa-times-circle text-red-500 text-xl"></i>');
        }
        
        $('#toast-title').text(title);
        $('#toast-message').text(message);
        
        toast.removeClass('hidden').hide().slideDown(300);
        
        setTimeout(function() {
            toast.slideUp(300, function() {
                toast.addClass('hidden');
            });
        }, 3000);
    }

    // Show demo info
    // setTimeout(showInfoToast, 2000);
});

// Prevent context menu on production
// $(document).contextmenu(function() {
//     return false;
// });