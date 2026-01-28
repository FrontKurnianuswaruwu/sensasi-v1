import $ from 'jquery';
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'orange-primary': '#FF6B35',
                'orange-light': '#FF8A65',
                'blue-primary': '#1E40AF',
                'blue-light': '#3B82F6'
            }
        }
    }
}
$(document).ready(function() {
    // Sidebar Toggle
    $('#sidebarToggle').click(function() {
        $('#sidebar').toggleClass('-translate-x-full');
        $('#sidebarOverlay').toggleClass('hidden');
    });

    // Close sidebar when clicking overlay
    $('#sidebarOverlay').click(function() {
        $('#sidebar').addClass('-translate-x-full');
        $('#sidebarOverlay').addClass('hidden');
    });

    // Menu Toggle
    $('.menu-toggle').click(function() {
        var submenu = $(this).siblings('.submenu');
        var chevron = $(this).find('.chevron');
        
        // Close other submenus
        $('.submenu').not(submenu).removeClass('active');
        $('.chevron').not(chevron).removeClass('rotate-180');
        
        // Toggle current submenu
        submenu.toggleClass('active');
        chevron.toggleClass('rotate-180');
    });

    // Active menu state
    $('nav a, .menu-toggle').click(function(e) {
        if (!$(this).hasClass('menu-toggle')) {
            $('nav a, .menu-toggle').removeClass('bg-gradient-to-r from-orange-primary to-blue-primary text-white');
            $(this).addClass('bg-gradient-to-r from-orange-primary to-blue-primary text-white');
        }
    });

    // Smooth scrolling and animations
    $('.fade-in').each(function(index) {
        $(this).css('animation-delay', (index * 0.1) + 's');
    });

    // Auto-close sidebar on larger screens
    $(window).resize(function() {
        if ($(window).width() >= 1024) {
            $('#sidebar').removeClass('-translate-x-full');
            $('#sidebarOverlay').addClass('hidden');
        }
    });

    // Card hover effects
    $('.card-hover').hover(
        function() {
            $(this).addClass('transform -translate-y-1 shadow-xl');
        },
        function() {
            $(this).removeClass('transform -translate-y-1 shadow-xl');
        }
    );

    // Initialize tooltips for mobile
    if (window.innerWidth <= 768) {
        $('.menu-item, .menu-toggle').on('touchstart', function() {
            $(this).addClass('hover:bg-gradient-to-r hover:from-orange-primary hover:to-blue-primary hover:text-white');
        });
    }

    // Handle responsive navigation
    function handleResponsiveNav() {
        const width = $(window).width();
        if (width < 1024) {
            $('#sidebar').addClass('-translate-x-full');
        } else {
            $('#sidebar').removeClass('-translate-x-full');
            $('#sidebarOverlay').addClass('hidden');
        }
    }

    // Call on load and resize
    handleResponsiveNav();
    $(window).resize(handleResponsiveNav);

    // Add loading states for buttons
    $('.quick-action-btn').click(function() {
        const $btn = $(this);
        const originalText = $btn.find('span').text();
        
        $btn.prop('disabled', true);
        $btn.find('span').text('Loading...');
        
        setTimeout(function() {
            $btn.prop('disabled', false);
            $btn.find('span').text(originalText);
        }, 2000);
    });

    // Search functionality (if needed)
    $('#searchInput').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        $('.menu-item, .menu-toggle').each(function() {
            const menuText = $(this).text().toLowerCase();
            if (menuText.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // Notification system
    function showNotification(message, type = 'success') {
        const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
        const notification = $(`
            <div class="fixed top-20 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300">
                ${message}
            </div>
        `);
        
        $('body').append(notification);
        
        setTimeout(() => {
            notification.removeClass('translate-x-full');
        }, 100);
        
        setTimeout(() => {
            notification.addClass('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Example usage for quick actions
    $('.quick-action-btn').click(function() {
        const action = $(this).find('span').text();
        showNotification(`${action} berhasil dijalankan!`);
    });

    // Enhanced mobile touch interactions
    if ('ontouchstart' in window) {
        $('.menu-item, .menu-toggle, .card-hover').on('touchstart', function() {
            $(this).addClass('opacity-75');
        }).on('touchend', function() {
            $(this).removeClass('opacity-75');
        });
    }


    // Keyboard navigation
    $(document).keydown(function(e) {
        if (e.altKey && e.keyCode === 77) { // Alt + M for menu
            $('#sidebarToggle').click();
        }
    });

    $('#adminDropdown').on('click', function(e) {
        e.stopPropagation();
        const dropdown = $('#dropdownMenu');
        const icon = $('#dropdownIcon');

        dropdown.toggleClass('hidden show');
        icon.toggleClass('rotate-180');
    });
    
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.dropdown-container').length) {
            $('#dropdownMenu').addClass('hidden').removeClass('show');
            $('#dropdownIcon').removeClass('rotate-180');
        }
    });
    
    // Handle logout button click
    $('#logoutBtn').on('click', function(e) {
        e.preventDefault();
        $('#logoutModal').removeClass('hidden').addClass('flex');
        $('#dropdownMenu').removeClass('show');
        $('#dropdownIcon').removeClass('rotate-180');
    });
    
    // Handle cancel logout
    $('#cancelLogout').on('click', function() {
        $('#logoutModal').addClass('hidden').removeClass('flex');
    });
    
    // Handle confirm logout
    $('#confirmLogout').on('click', function() {
        // Add loading state
        $(this).html(`
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Logging out...
        `).prop('disabled', true);
        
        // Simulate logout process
        setTimeout(function() {
            alert('Logout successful! Redirecting to login page...');
            $('#logoutModal').addClass('hidden').removeClass('flex');
            $('#confirmLogout').html('Logout').prop('disabled', false);
            
            // Here you would typically redirect to login page
            // window.location.href = '/login';
        }, 2000);
    });
    
    // Close modal when clicking backdrop
    $('#logoutModal').on('click', function(e) {
        if (e.target === this) {
            $(this).addClass('hidden').removeClass('flex');
        }
    });
    
    // Escape key to close modal
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            $('#logoutModal').addClass('hidden').removeClass('flex');
            $('#dropdownMenu').removeClass('show');
            $('#dropdownIcon').removeClass('rotate-180');
        }
    });
    
    // Prevent dropdown from closing when clicking inside it
    $('#dropdownMenu').on('click', function(e) {
        e.stopPropagation();
    });
    
    // Touch device optimizations
    if ('ontouchstart' in window) {
        $('.menu-item').on('touchstart', function() {
            $(this).addClass('bg-orange-50');
        }).on('touchend', function() {
            setTimeout(() => {
                $(this).removeClass('bg-orange-50');
            }, 150);
        });
    }
});