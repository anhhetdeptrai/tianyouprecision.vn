// ============================================
// FAQ ACCORDION FUNCTIONALITY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // FAQ items toggle
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // ============================================
    // ACTIVE NAVIGATION LINK
    // ============================================
    updateActiveNavLink();
    
    // ============================================
    // CONTACT FORM VALIDATION
    // ============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            // Validation
            if (!name) {
                alert('Vui lòng nhập họ và tên');
                return;
            }
            
            if (!email || !isValidEmail(email)) {
                alert('Vui lòng nhập email hợp lệ');
                return;
            }
            
            if (!subject) {
                alert('Vui lòng chọn chủ đề');
                return;
            }
            
            if (!message) {
                alert('Vui lòng nhập tin nhắn');
                return;
            }
            
            // Show success message
            alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // ============================================
    // HEADER SHADOW ON SCROLL
    // ============================================
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // ============================================
    // SMOOTH SCROLL FOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// ============================================
// HELPER FUNCTIONS
// ============================================

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Update active navigation link based on current page
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ============================================
// LANGUAGE SELECTOR
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const langOptions = document.querySelectorAll('.lang-option');
    
    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.textContent.trim();
            
            // Remove active class from all options
            langOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Store language preference
            localStorage.setItem('selectedLanguage', lang);
            
            // Here you would typically change the page language
            console.log('Language changed to:', lang);
        });
    });
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        langOptions.forEach(option => {
            if (option.textContent.trim() === savedLanguage) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Lazy loading for images (if needed)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    // Apply to images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// MOBILE MENU TOGGLE (if needed)
// ============================================
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// ============================================
// CONSOLE LOG FOR DEBUGGING
// ============================================
console.log('Website loaded successfully!');
console.log('Current page:', window.location.pathname);
// ============================================
// MOBILE MENU (HAMBURGER)
// Tự chèn nút ☰ vào header — không cần sửa từng file HTML
// ============================================
(function () {
    var header = document.querySelector('.header');
    var content = header && header.querySelector('.header-content');
    var nav = header && header.querySelector('.nav-menu');
    if (!header || !content || !nav || header.querySelector('.nav-toggle')) return;

    nav.id = nav.id || 'main-nav';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', 'Mở menu');
    btn.setAttribute('aria-controls', nav.id);
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';

    var logo = content.querySelector('.logo');
    if (logo && logo.nextSibling) content.insertBefore(btn, logo.nextSibling);
    else content.appendChild(btn);

    function setOpen(open) {
        header.classList.toggle('nav-open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    }

    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        setOpen(!header.classList.contains('nav-open'));
    });
    // Bấm vào 1 mục menu -> đóng menu
    nav.addEventListener('click', function (e) {
        if (e.target.closest('a')) setOpen(false);
    });
    // Bấm ra ngoài header -> đóng menu
    document.addEventListener('click', function (e) {
        if (!header.contains(e.target)) setOpen(false);
    });
    // Phím Esc -> đóng menu
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setOpen(false);
    });
    // Xoay ngang / chuyển sang màn hình lớn -> đóng menu
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) setOpen(false);
    });
})();