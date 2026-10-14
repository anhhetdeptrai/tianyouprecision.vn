/* ============================================
   PRODUCT CATALOG — chọn danh mục, xem ảnh, phóng to (lightbox)
   Dùng chung cho products.html / products-en.html / products-cn.html
   ============================================ */
(function () {
    var tabs = [].slice.call(document.querySelectorAll('.pc-tab'));
    var panels = [].slice.call(document.querySelectorAll('.pc-panel'));
    var cards = [].slice.call(document.querySelectorAll('.pc-cat-card'));
    var catalog = document.getElementById('catalog');
    if (!panels.length) return;

    function show(id, scroll) {
        var found = panels.some(function (p) { return p.dataset.cat === id; });
        if (!found) id = panels[0].dataset.cat;
        panels.forEach(function (p) {
            var on = p.dataset.cat === id;
            p.hidden = !on; p.classList.toggle('is-active', on);
        });
        tabs.forEach(function (t) {
            var on = t.dataset.cat === id;
            t.classList.toggle('is-active', on); t.setAttribute('aria-selected', on ? 'true' : 'false');
            if (on && t.scrollIntoView) t.scrollIntoView({ block: 'nearest', inline: 'center' });
        });
        cards.forEach(function (c) { c.classList.toggle('is-active', c.dataset.cat === id); });
        if (history.replaceState) history.replaceState(null, '', '#' + id);
        if (scroll && catalog) catalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    cards.forEach(function (c) {
        c.addEventListener('click', function (e) { e.preventDefault(); show(c.dataset.cat, true); });
    });
    tabs.forEach(function (t) {
        t.addEventListener('click', function () { show(t.dataset.cat, false); });
    });
    var hash = location.hash.replace('#', '');
    if (hash) show(hash, true); else cards[0] && cards[0].classList.add('is-active');

    /* ---------- lightbox ---------- */
    var lb = document.querySelector('.pc-lightbox');
    if (!lb) return;
    var lbImg = lb.querySelector('img'), lbCap = lb.querySelector('figcaption');
    var list = [], idx = 0, lastFocus = null;

    function render() {
        var it = list[idx];
        lbImg.src = it.src; lbImg.alt = it.alt; lbCap.textContent = it.alt + '  (' + (idx + 1) + '/' + list.length + ')';
    }
    function open(panel, i) {
        list = [].slice.call(panel.querySelectorAll('.pc-item img')).map(function (im) { return { src: im.currentSrc || im.src, alt: im.alt }; });
        idx = i; lastFocus = document.activeElement; render();
        lb.hidden = false; document.documentElement.style.overflow = 'hidden';
        lb.querySelector('.pc-lb-close').focus();
    }
    function close() {
        lb.hidden = true; document.documentElement.style.overflow = '';
        if (lastFocus) lastFocus.focus();
    }
    function step(d) { idx = (idx + d + list.length) % list.length; render(); }

    panels.forEach(function (panel) {
        [].slice.call(panel.querySelectorAll('.pc-zoom')).forEach(function (b, i) {
            b.addEventListener('click', function () { open(panel, i); });
        });
    });
    lb.querySelector('.pc-lb-close').addEventListener('click', close);
    lb.querySelector('.pc-lb-prev').addEventListener('click', function () { step(-1); });
    lb.querySelector('.pc-lb-next').addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
        if (lb.hidden) return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowLeft') step(-1);
        else if (e.key === 'ArrowRight') step(1);
    });
    var x0 = null;
    lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
        if (x0 === null) return;
        var dx = e.changedTouches[0].clientX - x0; x0 = null;
        if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
    });
})();
