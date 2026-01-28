import $ from 'jquery';
window.$ = $;
window.jQuery = $;

const startMusicOnScroll = () => {
    const audio = document.getElementById("bg-music");
    audio.volume = 0.1;

    audio.play().catch(err => console.log("Autoplay gagal:", err));

    document.removeEventListener("scroll", startMusicOnScroll);
};

document.addEventListener("scroll", startMusicOnScroll);

$(document).ready(function() {
    let slides = document.querySelectorAll("#heroImageSlider .slide");
    let index = 0;

    if (slides.length > 0) {

        slides[0].classList.add("slide-active");

        setInterval(() => {
            let current = slides[index];

            index = (index + 1) % slides.length;
            let next = slides[index];

            current.classList.remove("slide-active");
            current.classList.add("slide-out");

            next.classList.remove("slide-out");
            next.classList.add("slide-active");

        }, 4000);
    }
    // Mobile Menu Toggle
    $('#mobile-menu-btn').click(function() {
        $('#mobile-menu').addClass('active');
    });

    $('#close-menu').click(function() {
        $('#mobile-menu').removeClass('active');
    });

    // Close mobile menu when clicking a link
    $('#mobile-menu a').click(function() {
        $('#mobile-menu').removeClass('active');
    });

    // Smooth Scroll
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if(target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('nav').addClass('shadow-xl');
        } else {
            $('nav').removeClass('shadow-xl');
        }

        // Back to top button
        if ($(this).scrollTop() > 300) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });

    // Back to top
    $('#back-to-top').click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

    // Tab functionality for Sensasi Club
    $('.tab-btn').click(function() {
        var tab = $(this).data('tab');
        
        // Remove active class from all tabs
        $('.tab-btn').removeClass('active bg-sky-800 text-white');
        $('.tab-btn').addClass('text-gray-600');
        
        // Add active class to clicked tab
        $(this).addClass('active bg-sky-800 text-white');
        $(this).removeClass('text-gray-600');
        
        // Hide all tab contents
        $('.tab-content').addClass('hidden');
        
        // Show selected tab content
        $('#' + tab + '-tab').removeClass('hidden');
    });

    // Set first tab as active by default
    $('.tab-btn:first').addClass('bg-sky-800 text-white');
    $('.tab-btn:not(:first)').addClass('text-gray-600');

    // Animate elements on scroll
    $(window).scroll(function() {
        $('.card-hover').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate-fade-in');
            }
        });
    });

    // Close mobile menu when clicking outside
    $(document).click(function(event) {
        var $target = $(event.target);
        if(!$target.closest('#mobile-menu').length && 
            !$target.closest('#mobile-menu-btn').length) {
            $('#mobile-menu').removeClass('active');
        }
    });

    // Form validation (basic)
    $('form').submit(function(e) {
        e.preventDefault();
        
        var nama = $(this).find('input[type="text"]').first().val();
        var email = $(this).find('input[type="email"]').val();
        var pesan = $(this).find('textarea').val();
        
        if(nama && email && pesan) {
            alert('Terima kasih! Pesan Anda telah terkirim.');
            $(this)[0].reset();
        } else {
            alert('Mohon lengkapi semua field!');
        }
    });

    // Add hover effect to cards
    $('.card-hover').hover(
        function() {
            $(this).css('transform', 'translateY(-10px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );

    // Stats counter animation
    function animateCounter(element, target) {
        var current = 0;
        var increment = target / 50;
        var timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            $(element).text(Math.floor(current) + '+');
        }, 30);
    }

    // Trigger counter animation when stats section is visible
    var statsAnimated = false;

    $(window).scroll(function () {
        var statsSection = $('.stats-card');

        if (statsSection.length) {
            var statsSectionTop = statsSection.first().offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();

            if (windowBottom > statsSectionTop && !statsAnimated) {
                statsAnimated = true;

                $('.stats-card').each(function (index) {
                    var value = $(this).data('value');
                    var target = $(this).find('.text-sky-800');
                    animateCounter(target, value);
                });
            }
        }
    });


    // Active navigation highlighting
    $(window).scroll(function() {
        var scrollPos = $(document).scrollTop() + 100;
        
        $('.nav-link').each(function() {
            var currLink = $(this);
            var href = currLink.attr("href");

            // Hanya lakukan jika href dimulai dengan #
            if (href && href.startsWith("#")) {
                var refElement = $(href);
                
                if (refElement.length && refElement.position().top <= scrollPos && 
                    refElement.position().top + refElement.height() > scrollPos) {
                    $('.nav-link').removeClass('text-sky-800');
                    currLink.addClass('text-sky-800');
                } else {
                    currLink.removeClass('text-sky-800');
                }
            }
        });
    });

    // Image lazy loading effect
    $('img').on('load', function() {
        $(this).addClass('animate-fade-in');
    });

    // Parallax effect for hero section
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        $('.hero-pattern').css('background-position', 'center ' + (scrolled * 0.5) + 'px');
    });

    // Search functionality (if needed later)
    $('#search-btn').click(function() {
        var searchTerm = $('#search-input').val();
        if(searchTerm) {
            console.log('Searching for: ' + searchTerm);
            // Add your search logic here
        }
    });

    // Newsletter subscription (if needed)
    $('#newsletter-form').submit(function(e) {
        e.preventDefault();
        var email = $(this).find('input[type="email"]').val();
        if(email) {
            alert('Terima kasih telah berlangganan newsletter kami!');
            $(this)[0].reset();
        }
    });

    // Read more functionality
    $('.read-more-btn').click(function(e) {
        e.preventDefault();
        $(this).prev('.short-desc').slideUp();
        $(this).next('.full-desc').slideDown();
        $(this).hide();
    });

    // Filter functionality for content
    $('.filter-btn').click(function() {
        var filter = $(this).data('filter');
        
        $('.filter-btn').removeClass('bg-sky-800 text-white');
        $('.filter-btn').addClass('bg-gray-200 text-gray-700');
        $(this).addClass('bg-sky-800 text-white');
        $(this).removeClass('bg-gray-200 text-gray-700');
        
        if(filter === 'all') {
            $('.filter-item').fadeIn();
        } else {
            $('.filter-item').hide();
            $('.filter-item[data-category="' + filter + '"]').fadeIn();
        }
    });

    // Modal functionality (if needed)
    $('.open-modal').click(function() {
        var modalId = $(this).data('modal');
        $('#' + modalId).fadeIn();
    });

    $('.close-modal, .modal-overlay').click(function() {
        $('.modal').fadeOut();
    });

    // Tooltip initialization (if needed)
    $('[data-tooltip]').hover(
        function() {
            var tooltip = $(this).data('tooltip');
            $(this).append('<div class="tooltip">' + tooltip + '</div>');
            $('.tooltip').fadeIn();
        },
        function() {
            $('.tooltip').remove();
        }
    );

    // Print functionality
    $('.print-btn').click(function() {
        window.print();
    });

    // Share functionality
    $('.share-btn').click(function() {
        var shareUrl = window.location.href;
        var shareText = 'Check out Sensasi!';
        
        if (navigator.share) {
            navigator.share({
                title: 'Sensasi',
                text: shareText,
                url: shareUrl
            });
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(shareUrl);
            alert('Link telah disalin ke clipboard!');
        }
    });

    // Accordion functionality (if needed)
    $('.accordion-header').click(function() {
        $(this).next('.accordion-content').slideToggle();
        $(this).find('.accordion-icon').toggleClass('rotate-180');
    });

    // Initialize tooltips with better positioning
    function initTooltips() {
        $('[data-tooltip]').each(function() {
            $(this).hover(
                function() {
                    var tooltipText = $(this).data('tooltip');
                    var tooltip = $('<div class="custom-tooltip">' + tooltipText + '</div>');
                    $('body').append(tooltip);
                    
                    var offset = $(this).offset();
                    tooltip.css({
                        top: offset.top - tooltip.outerHeight() - 10,
                        left: offset.left + ($(this).outerWidth() / 2) - (tooltip.outerWidth() / 2)
                    }).fadeIn();
                },
                function() {
                    $('.custom-tooltip').remove();
                }
            );
        });
    }

    initTooltips();

    // Preloader (if needed)
    $(window).on('load', function() {
        $('#preloader').fadeOut('slow');
    });

    // Copy to clipboard functionality
    $('.copy-btn').click(function() {
        var textToCopy = $(this).data('copy');
        navigator.clipboard.writeText(textToCopy).then(function() {
            alert('Disalin ke clipboard!');
        });
    });

    // Dynamic year for footer
    $('#current-year').text(new Date().getFullYear());

    console.log('Sensasi Website Loaded Successfully! 🚀');
});