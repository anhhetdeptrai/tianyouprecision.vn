// ============================================
// NGÔN NGỮ TRANG (VN / EN / CN) — lấy từ <html lang="...">
// ============================================
var PAGE_LANG = (function () {
    var l = (document.documentElement.lang || 'vi').toLowerCase();
    if (l.indexOf('zh') === 0) return 'cn';
    if (l.indexOf('en') === 0) return 'en';
    return 'vn';
})();
var MSG = {
    vn: { name: 'Vui lòng nhập họ và tên', email: 'Vui lòng nhập email hợp lệ', subject: 'Vui lòng chọn chủ đề',
          message: 'Vui lòng nhập tin nhắn', thanks: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.',
          open: 'Mở menu', close: 'Đóng menu' },
    en: { name: 'Please enter your full name', email: 'Please enter a valid email address', subject: 'Please select a subject',
          message: 'Please enter your message', thanks: 'Thank you for contacting us! We will get back to you as soon as possible.',
          open: 'Open menu', close: 'Close menu' },
    cn: { name: '請輸入您的姓名', email: '請輸入有效的電子郵件地址', subject: '請選擇主旨',
          message: '請輸入訊息內容', thanks: '感謝您的來信！我們將盡快回覆您。',
          open: '開啟選單', close: '關閉選單' }
}[PAGE_LANG];

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
                alert(MSG.name);
                return;
            }
            
            if (!email || !isValidEmail(email)) {
                alert(MSG.email);
                return;
            }
            
            if (!subject) {
                alert(MSG.subject);
                return;
            }
            
            if (!message) {
                alert(MSG.message);
                return;
            }
            
            // Show success message
            alert(MSG.thanks);
            
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
    const currentPage = window.location.pathname.split('/').pop() || ({ vn: 'index.html', en: 'index-en.html', cn: 'index-cn.html' })[PAGE_LANG];
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
// CN / VN / EN là đường link thật tới trang tương ứng
// (vd: about.html ↔ about-en.html ↔ about-cn.html), không cần JavaScript.
// ============================================

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
    btn.setAttribute('aria-label', MSG.open);
    btn.setAttribute('aria-controls', nav.id);
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';

    var logo = content.querySelector('.logo');
    if (logo && logo.nextSibling) content.insertBefore(btn, logo.nextSibling);
    else content.appendChild(btn);

    function setOpen(open) {
        header.classList.toggle('nav-open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.setAttribute('aria-label', open ? MSG.close : MSG.open);
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
