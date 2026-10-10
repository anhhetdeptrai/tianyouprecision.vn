/* =====================================================================
   TIAN-YOU PRECISION — WELCOME INTRO ANIMATION  (welcome.js)
   ---------------------------------------------------------------------
   Cách dùng: đặt dòng sau NGAY SAU thẻ <body> của index.html
       <script src="welcome.js"></ script>    (bỏ dấu cách trong thẻ đóng)
   Tuỳ chọn:
       data-logo="image/logoTY.jpg"   → đổi đường dẫn logo
       data-always                    → lần nào vào trang cũng chạy intro
   Mặc định: intro chạy 1 lần mỗi phiên (đóng trình duyệt mở lại sẽ chạy lại).
   Xem lại bất cứ lúc nào: thêm ?intro=1 vào URL, ví dụ index.html?intro=1
   ===================================================================== */
(function () {
  'use strict';

  var cs = document.currentScript;
  var CFG = {
    logo: (cs && cs.getAttribute('data-logo')) || 'image/logoTY.jpg',
    always: !!(cs && cs.hasAttribute('data-always')),
    key: 'ty_intro_seen',
    lang: (cs && cs.getAttribute('data-lang')) || 'vn'
  };

  /* Chữ hiển thị theo ngôn ngữ (data-lang="vn" | "en" | "cn") */
  var TXT = {
    vn: { years: 'NĂM KINH NGHIỆM', skip: 'BỎ QUA ›', aria: 'Chào mừng đến với Tian-You Precision', hello: ['Chào mừng', 'Welcome', '歡迎光臨'] },
    en: { years: 'YEARS OF EXPERIENCE', skip: 'SKIP ›', aria: 'Welcome to Tian-You Precision', hello: ['Welcome', '歡迎光臨', 'Chào mừng'] },
    cn: { years: '年 製造經驗', skip: '略過 ›', aria: '歡迎光臨天佑精密', hello: ['歡迎光臨', 'Welcome', 'Chào mừng'] }
  }[CFG.lang] || null;
  if (!TXT) TXT = { years: 'NĂM KINH NGHIỆM', skip: 'BỎ QUA ›', aria: 'Chào mừng đến với Tian-You Precision', hello: ['Chào mừng', 'Welcome', '歡迎光臨'] };

  var CSS = [
    '#ty-intro{position:fixed;inset:0;z-index:2147483000;overflow:hidden;color:#fff;',
    "font-family:'Segoe UI',Tahoma,Geneva,Verdana,'Microsoft JhengHei','PingFang TC',sans-serif;-webkit-font-smoothing:antialiased}",
    '#ty-intro *{box-sizing:border-box;margin:0;padding:0}',
    /* doors */
    '#ty-intro .ty-door{position:absolute;left:0;right:0;height:50.2%;transition:transform 1s cubic-bezier(.83,0,.17,1)}',
    '#ty-intro .ty-top{top:0;background:linear-gradient(180deg,#000814 0%,#001a3d 100%)}',
    '#ty-intro .ty-bot{bottom:0;background:linear-gradient(0deg,#000814 0%,#001a3d 100%)}',
    '#ty-intro .ty-top:after,#ty-intro .ty-bot:after{content:"";position:absolute;left:0;right:0;height:1px;background:rgba(162,201,255,.35)}',
    '#ty-intro .ty-top:after{bottom:0}#ty-intro .ty-bot:after{top:0}',
    '#ty-intro.is-open .ty-top{transform:translateY(-101%)}',
    '#ty-intro.is-open .ty-bot{transform:translateY(101%)}',
    '#ty-intro.is-open{pointer-events:none}',
    '#ty-intro .ty-cv{position:absolute;inset:0;width:100%;height:100%;transition:opacity .5s}',
    /* seam flash */
    '#ty-intro .ty-seam{position:absolute;left:0;right:0;top:50%;height:2px;margin-top:-1px;background:#ffd2b0;',
    'box-shadow:0 0 10px 2px #ff6a2b,0 0 40px 10px rgba(255,106,43,.45);transform:scaleX(0);opacity:0}',
    '#ty-intro.is-exit .ty-seam{animation:tySeam .9s ease-out forwards}',
    '@keyframes tySeam{0%{transform:scaleX(0);opacity:1}45%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}',
    /* stage */
    '#ty-intro .ty-stage{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px 16px;transition:opacity .45s ease-in,transform .45s ease-in,filter .45s ease-in}',
    '#ty-intro.is-exit .ty-stage{opacity:0;transform:scale(1.06);filter:blur(6px)}',
    '#ty-intro.is-exit .ty-cv,#ty-intro.is-exit .ty-hud,#ty-intro.is-exit .ty-bar,#ty-intro.is-exit .ty-pct,#ty-intro.is-exit .ty-skip{opacity:0}',
    /* emblem */
    '#ty-intro .ty-emblem{position:relative;width:132px;height:132px;margin-bottom:26px;opacity:0;transform:scale(.55) rotate(-30deg);transition:opacity .6s,transform 1s cubic-bezier(.2,1.4,.4,1)}',
    '#ty-intro.is-ring .ty-emblem{opacity:1;transform:none}',
    '#ty-intro .ty-emblem svg{position:absolute;inset:-10px;width:calc(100% + 20px);height:calc(100% + 20px);overflow:visible}',
    '#ty-intro .ty-ring{fill:none;stroke:#a2c9ff;stroke-width:2;stroke-dasharray:415;stroke-dashoffset:415;transform:rotate(-90deg);transform-origin:80px 80px;',
    'transition:stroke-dashoffset 1.3s cubic-bezier(.65,0,.35,1) .1s;filter:drop-shadow(0 0 5px rgba(162,201,255,.9))}',
    '#ty-intro.is-ring .ty-ring{stroke-dashoffset:0}',
    '#ty-intro .ty-ticks{fill:none;stroke:rgba(162,201,255,.45);stroke-width:6;stroke-dasharray:1.2 6.55;transform-origin:80px 80px;animation:tySpin 18s linear infinite}',
    '#ty-intro .ty-arc{fill:none;stroke:#ff7a3d;stroke-width:3;stroke-linecap:round;stroke-dasharray:46 369;transform-origin:80px 80px;animation:tySpin 2.4s linear infinite reverse;filter:drop-shadow(0 0 6px #ff7a3d)}',
    '@keyframes tySpin{to{transform:rotate(360deg)}}',
    '#ty-intro .ty-logo{position:absolute;inset:18px;border-radius:50%;background:#fff;overflow:hidden;display:flex;align-items:center;justify-content:center;',
    'box-shadow:0 0 0 1px rgba(255,255,255,.25),0 10px 34px rgba(0,0,0,.55);opacity:0;transform:scale(.8);transition:opacity .6s .7s,transform .8s cubic-bezier(.2,1.4,.4,1) .7s}',
    '#ty-intro.is-ring .ty-logo{opacity:1;transform:none}',
    '#ty-intro .ty-logo img{width:80%;height:80%;object-fit:contain}',
    '#ty-intro .ty-logo span{display:none;font-weight:900;font-size:36px;letter-spacing:.02em;background:linear-gradient(180deg,#fff,#a2c9ff);-webkit-background-clip:text;background-clip:text;color:transparent}',
    '#ty-intro .ty-logo.noimg{background:radial-gradient(circle at 30% 30%,#1960a3,#002045)}',
    '#ty-intro .ty-logo.noimg img{display:none}#ty-intro .ty-logo.noimg span{display:block}',
    /* title */
    '#ty-intro .ty-title-wrap{position:relative;line-height:1}',
    '#ty-intro .ty-title{font-size:clamp(44px,11vw,128px);font-weight:900;letter-spacing:.04em;line-height:1;padding:0 .04em;',
    'background:linear-gradient(100deg,#7d97b8 0%,#e9f2ff 22%,#fff 30%,#9fb6d4 45%,#dfe9f7 60%,#6f88aa 80%,#c9d8ec 100%);background-size:220% 100%;background-position:100% 0;',
    '-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-clip-path:inset(-20% 100% -20% 0);clip-path:inset(-20% 100% -20% 0)}',
    '#ty-intro.is-cut .ty-title{animation:tyShine 2.6s ease-in-out forwards}',
    '@keyframes tyShine{from{background-position:100% 0}to{background-position:0 0}}',
    '#ty-intro .ty-laser{position:absolute;top:-18%;bottom:-18%;left:0;width:3px;margin-left:-1.5px;border-radius:3px;opacity:0;will-change:transform;',
    'background:linear-gradient(180deg,transparent,#fff 15%,#ffd2b0 50%,#fff 85%,transparent);',
    'box-shadow:0 0 8px 2px #ff7a3d,0 0 28px 8px rgba(255,106,43,.55),0 0 80px 22px rgba(255,106,43,.25)}',
    /* sub + tag */
    '#ty-intro .ty-sub{margin-top:16px;padding-left:.62em;font-size:clamp(13px,2.4vw,20px);font-weight:600;letter-spacing:1.4em;color:#a2c9ff;opacity:0;transform:translateY(8px);transition:all 1.1s cubic-bezier(.2,.8,.2,1)}',
    '#ty-intro.is-sub .ty-sub{opacity:1;letter-spacing:.62em;transform:none}',
    '#ty-intro .ty-tag{margin-top:12px;display:flex;align-items:center;gap:12px;font-size:11px;letter-spacing:.3em;color:rgba(255,255,255,.55);opacity:0;transition:opacity .8s .35s}',
    '#ty-intro .ty-tag:before,#ty-intro .ty-tag:after{content:"";width:28px;height:1px;background:rgba(162,201,255,.45)}',
    '#ty-intro.is-sub .ty-tag{opacity:1}',
    /* route */
    '#ty-intro .ty-route{display:flex;align-items:center;gap:12px;margin-top:34px;opacity:0;transform:translateY(10px);transition:all .7s cubic-bezier(.2,.8,.2,1)}',
    '#ty-intro.is-route .ty-route{opacity:1;transform:none}',
    '#ty-intro .ty-chip{font-size:11px;letter-spacing:.2em;color:rgba(255,255,255,.7);border:1px solid rgba(162,201,255,.35);padding:7px 12px;border-radius:999px;background:rgba(0,32,69,.55);white-space:nowrap}',
    '#ty-intro .ty-chip b{color:#fff;margin-left:6px;font-weight:700;letter-spacing:.08em}',
    '#ty-intro .ty-path{position:relative;width:clamp(36px,10vw,110px);height:2px;background:rgba(162,201,255,.2);overflow:hidden}',
    '#ty-intro .ty-path:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#a2c9ff,#ff7a3d);transform:scaleX(0);transform-origin:left;transition:transform 1s cubic-bezier(.65,0,.35,1) .3s}',
    '#ty-intro.is-route .ty-path:after{transform:scaleX(1)}',
    '#ty-intro .ty-years{margin-top:20px;font-size:12px;letter-spacing:.3em;color:rgba(255,255,255,.6);opacity:0;transition:opacity .6s}',
    '#ty-intro.is-years .ty-years{opacity:1}',
    '#ty-intro .ty-years b{display:inline-block;min-width:2.3ch;margin-right:10px;text-align:right;font-size:clamp(26px,4vw,36px);letter-spacing:0;color:#ff8a4c;font-weight:800;vertical-align:-6px;font-variant-numeric:tabular-nums;text-shadow:0 0 18px rgba(255,122,61,.55)}',
    /* welcome */
    '#ty-intro .ty-welcome{margin-top:26px;display:flex;gap:14px;align-items:center;font-size:clamp(15px,2.2vw,20px);font-weight:300}',
    '#ty-intro .ty-welcome span{opacity:0;transform:translateY(12px);filter:blur(6px);transition:all .7s cubic-bezier(.2,.8,.2,1)}',
    '#ty-intro .ty-welcome em{opacity:0;color:#ff7a3d;font-style:normal;transition:opacity .5s .2s}',
    '#ty-intro.is-welcome .ty-welcome span,#ty-intro.is-welcome .ty-welcome em{opacity:1;transform:none;filter:none}',
    '#ty-intro .ty-welcome span:nth-of-type(2){transition-delay:.22s}#ty-intro .ty-welcome span:nth-of-type(3){transition-delay:.44s}',
    /* HUD */
    "#ty-intro .ty-hud{position:absolute;font:500 10px/1.4 Consolas,'Courier New',monospace;letter-spacing:.18em;color:rgba(162,201,255,.65);transition:opacity .4s}",
    '#ty-intro .ty-tl{top:22px;left:24px;display:flex;align-items:center;gap:8px}',
    '#ty-intro .ty-dot{width:6px;height:6px;border-radius:50%;background:#ff7a3d;box-shadow:0 0 8px #ff7a3d;animation:tyBlink 1s steps(2) infinite}',
    '@keyframes tyBlink{50%{opacity:.15}}',
    '#ty-intro .ty-tr{top:22px;right:24px}',
    '#ty-intro .ty-bl{bottom:24px;left:24px}',
    '#ty-intro .ty-bar{position:absolute;left:0;right:0;bottom:0;height:2px;background:rgba(162,201,255,.12);transition:opacity .4s}',
    '#ty-intro .ty-bar i{display:block;height:100%;transform-origin:left;transform:scaleX(0);background:linear-gradient(90deg,#1960a3,#a2c9ff,#ff7a3d)}',
    "#ty-intro .ty-pct{position:absolute;bottom:24px;left:50%;transform:translateX(-50%);font:500 10px/1.4 Consolas,'Courier New',monospace;letter-spacing:.25em;color:rgba(255,255,255,.5);transition:opacity .4s}",
    '#ty-intro .ty-pct b{color:#fff;font-weight:600}',
    "#ty-intro .ty-skip{position:absolute;right:20px;bottom:16px;background:transparent;border:1px solid rgba(162,201,255,.35);color:rgba(255,255,255,.8);font:600 11px/1 'Segoe UI',Tahoma,sans-serif;letter-spacing:.2em;padding:9px 15px;border-radius:999px;cursor:pointer;transition:all .25s}",
    '#ty-intro .ty-skip:hover,#ty-intro .ty-skip:focus-visible{background:rgba(255,122,61,.15);border-color:#ff7a3d;color:#fff;outline:none}',
    /* reduced motion */
    '#ty-intro.ty-rm.is-open{opacity:0;transition:opacity .4s}#ty-intro.ty-rm .ty-door{transition:none;transform:none!important}',
    /* mobile */
    '@media (max-width:640px){#ty-intro .ty-tr,#ty-intro .ty-bl{display:none}#ty-intro .ty-emblem{width:104px;height:104px;margin-bottom:20px}',
    '#ty-intro .ty-route{gap:8px}#ty-intro .ty-chip{font-size:10px;letter-spacing:.12em;padding:6px 9px}#ty-intro .ty-welcome{gap:8px}',
    '#ty-intro .ty-pct{left:24px;transform:none}#ty-intro .ty-tag{letter-spacing:.18em;font-size:10px}}',
    /* page reveal after intro */
    'html.ty-reveal .header{animation:tyDown .7s cubic-bezier(.2,.8,.2,1) .15s both}',
    'html.ty-reveal .hero-content>*{animation:tyUp .9s cubic-bezier(.2,.8,.2,1) both}',
    'html.ty-reveal .hero-content>*:nth-child(1){animation-delay:.25s}html.ty-reveal .hero-content>*:nth-child(2){animation-delay:.37s}',
    'html.ty-reveal .hero-content>*:nth-child(3){animation-delay:.49s}html.ty-reveal .hero-content>*:nth-child(4){animation-delay:.61s}',
    '@keyframes tyUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}',
    '@keyframes tyDown{from{opacity:0;transform:translateY(-100%)}to{opacity:1;transform:none}}'
  ].join('\n');

  var HTML =
    '<div class="ty-door ty-top"></div><div class="ty-door ty-bot"></div>' +
    '<canvas class="ty-cv" aria-hidden="true"></canvas>' +
    '<div class="ty-seam"></div>' +
    '<div class="ty-hud ty-tl"><i class="ty-dot"></i><span class="ty-status">TIAN-YOU // SYSTEM INIT</span></div>' +
    '<div class="ty-hud ty-tr">X 0000.00 · Y 0000.00</div>' +
    '<div class="ty-hud ty-bl">MY PHUOC 2 IZ · BINH DUONG · VIETNAM</div>' +
    '<div class="ty-stage">' +
      '<div class="ty-emblem"><svg viewBox="0 0 160 160" aria-hidden="true">' +
        '<circle class="ty-ticks" cx="80" cy="80" r="74"/>' +
        '<circle class="ty-ring" cx="80" cy="80" r="66"/>' +
        '<circle class="ty-arc" cx="80" cy="80" r="66"/></svg>' +
        '<div class="ty-logo"><img alt="Tian-You Precision"><span>TY</span></div></div>' +
      '<div class="ty-title-wrap"><div class="ty-title">TIAN-YOU</div><i class="ty-laser"></i></div>' +
      '<div class="ty-sub">PRECISION</div>' +
      '<div class="ty-tag">METAL FABRICATION · OEM / ODM</div>' +
      '<div class="ty-route"><span class="ty-chip">TAIWAN<b>1972</b></span><span class="ty-path"></span><span class="ty-chip">VIETNAM<b>2006</b></span></div>' +
      '<div class="ty-years"><b class="ty-count">0</b>' + TXT.years + '</div>' +
      '<div class="ty-welcome"><span>' + TXT.hello[0] + '</span><em>·</em><span>' + TXT.hello[1] + '</span><em>·</em><span>' + TXT.hello[2] + '</span></div>' +
    '</div>' +
    '<div class="ty-bar"><i></i></div>' +
    '<div class="ty-pct">LOADING <b>000</b>%</div>' +
    '<button class="ty-skip" type="button">' + TXT.skip + '</button>';

  var running = false;

  function injectCSS() {
    if (document.getElementById('ty-intro-style')) return;
    var s = document.createElement('style');
    s.id = 'ty-intro-style';
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  function pad(n, w) { n = String(n); while (n.length < w) n = '0' + n; return n; }
  function easeInOut(p) { return -(Math.cos(Math.PI * p) - 1) / 2; }
  function easeOut(p) { return 1 - Math.pow(1 - p, 3); }

  function start() {
    if (running) return;
    running = true;
    injectCSS();

    var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var html = document.documentElement;
    html.classList.remove('ty-reveal');

    var root = document.createElement('div');
    root.id = 'ty-intro';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-label', TXT.aria);
    root.innerHTML = HTML;
    if (reduce) root.classList.add('ty-rm');
    document.body.appendChild(root);

    var prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';

    function q(s) { return root.querySelector(s); }
    var cv = q('.ty-cv'), ctx = cv.getContext('2d');
    var title = q('.ty-title'), laser = q('.ty-laser');
    var coord = q('.ty-tr'), status = q('.ty-status');
    var bar = q('.ty-bar i'), pctEl = q('.ty-pct b'), countEl = q('.ty-count');
    var logoBox = q('.ty-logo'), img = q('.ty-logo img');
    img.onerror = function () { logoBox.classList.add('noimg'); };
    img.src = CFG.logo;

    /* ---------- canvas ---------- */
    var W, H, dpr, grid;
    function buildGrid() {
      var g = document.createElement('canvas');
      g.width = W * dpr; g.height = H * dpr;
      var c = g.getContext('2d');
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      var cx = W / 2, cy = H / 2, s = 32, x, y;
      c.lineWidth = 1;
      c.strokeStyle = 'rgba(91,143,214,0.07)'; c.beginPath();
      for (x = cx % s; x < W; x += s) { c.moveTo(Math.round(x) + .5, 0); c.lineTo(Math.round(x) + .5, H); }
      for (y = cy % s; y < H; y += s) { c.moveTo(0, Math.round(y) + .5); c.lineTo(W, Math.round(y) + .5); }
      c.stroke();
      var S = s * 5;
      c.strokeStyle = 'rgba(91,143,214,0.15)'; c.beginPath();
      for (x = cx % S; x < W; x += S) { c.moveTo(Math.round(x) + .5, 0); c.lineTo(Math.round(x) + .5, H); }
      for (y = cy % S; y < H; y += S) { c.moveTo(0, Math.round(y) + .5); c.lineTo(W, Math.round(y) + .5); }
      c.stroke();
      c.setLineDash([4, 6]); c.strokeStyle = 'rgba(162,201,255,0.22)'; c.beginPath();
      c.moveTo(0, Math.round(cy) + .5); c.lineTo(W, Math.round(cy) + .5);
      c.moveTo(Math.round(cx) + .5, 0); c.lineTo(Math.round(cx) + .5, H);
      c.stroke(); c.setLineDash([]);
      var vg = c.createRadialGradient(cx, cy, Math.min(W, H) * .15, cx, cy, Math.max(W, H) * .75);
      vg.addColorStop(0, 'rgba(0,10,28,0)'); vg.addColorStop(1, 'rgba(0,5,16,.9)');
      c.fillStyle = vg; c.fillRect(0, 0, W, H);
      var m = 14, L = 22;
      c.strokeStyle = 'rgba(162,201,255,.55)'; c.lineWidth = 1.5; c.beginPath();
      c.moveTo(m, m + L); c.lineTo(m, m); c.lineTo(m + L, m);
      c.moveTo(W - m - L, m); c.lineTo(W - m, m); c.lineTo(W - m, m + L);
      c.moveTo(m, H - m - L); c.lineTo(m, H - m); c.lineTo(m + L, H - m);
      c.moveTo(W - m - L, H - m); c.lineTo(W - m, H - m); c.lineTo(W - m, H - m - L);
      c.stroke();
      return g;
    }
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      grid = buildGrid();
    }
    resize();
    window.addEventListener('resize', resize);

    var sparks = [], dust = [], i;
    for (i = 0; i < 45; i++) {
      dust.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + .3,
        v: Math.random() * .35 + .08, a: Math.random() * .4 + .1 });
    }
    function emit(x, y, n, power) {
      for (var j = 0; j < n; j++) {
        var ang = Math.random() * Math.PI * 2;
        var sp = (Math.random() * 6 + 1.5) * (power || 1);
        sparks.push({ x: x, y: y, vx: Math.cos(ang) * sp - 1.2, vy: Math.sin(ang) * sp - 1.5,
          life: 1, decay: .012 + Math.random() * .028, h: 18 + Math.random() * 32, w: Math.random() * 1.6 + .6 });
      }
      if (sparks.length > 900) sparks.splice(0, sparks.length - 900);
    }

    /* ---------- timeline (ms) ---------- */
    var TL = reduce
      ? { ring: 0, cutS: 0, cutE: 0, sub: 50, route: 100, cS: 150, cE: 150, welcome: 200, exit: 2200 }
      : { ring: 250, cutS: 950, cutE: 2400, sub: 2400, route: 2850, cS: 3050, cE: 3950, welcome: 3650, exit: 10000 };

    var done = {}, exiting = false, raf = 0, glowA = 0, glowX = 0, glowY = 0;
    var T0 = performance.now(), last = T0;

    function once(name, time, t, fn) { if (!done[name] && t >= time) { done[name] = 1; fn(); } }

    function frame(now) {
      var t = now - T0, k = Math.min(now - last, 50) / 16.67;
      last = now;

      once('ring', TL.ring, t, function () { root.classList.add('is-ring'); });

      /* laser cut */
      if (!done.cut && t >= TL.cutS) {
        var rect = title.getBoundingClientRect();
        var p = TL.cutE > TL.cutS ? Math.min(1, (t - TL.cutS) / (TL.cutE - TL.cutS)) : 1;
        var e = easeInOut(p), lx = e * rect.width;
        var clip = 'inset(-20% ' + ((1 - e) * 100).toFixed(2) + '% -20% -5%)';
        title.style.webkitClipPath = clip; title.style.clipPath = clip;
        laser.style.transform = 'translateX(' + lx.toFixed(1) + 'px)';
        laser.style.opacity = p < 1 ? '1' : '0';
        glowX = rect.left + lx; glowY = rect.top + rect.height / 2; glowA = 1;
        status.textContent = 'LASER CUTTING · 4000W';
        coord.textContent = 'X ' + pad((lx * .82).toFixed(2), 7) + ' · Y ' + pad((rect.height * .41 + Math.random() * 3).toFixed(2), 7);
        if (!reduce) {
          emit(glowX, rect.top + rect.height * (.12 + Math.random() * .76), Math.max(1, Math.round(6 * k)));
        }
        if (p >= 1) {
          done.cut = 1;
          title.style.webkitClipPath = 'none'; title.style.clipPath = 'none';
          root.classList.add('is-cut');
          status.textContent = 'CUT COMPLETE · READY';
          if (!reduce) emit(glowX, glowY, 90, 1.4);
        }
      }

      once('sub', TL.sub, t, function () { root.classList.add('is-sub'); });
      once('route', TL.route, t, function () { root.classList.add('is-route'); });
      once('years', TL.cS, t, function () { root.classList.add('is-years'); });
      if (t >= TL.cS && !done.count) {
        var cp = TL.cE > TL.cS ? Math.min(1, (t - TL.cS) / (TL.cE - TL.cS)) : 1;
        countEl.textContent = Math.round(easeOut(cp) * 50) + (cp >= 1 ? '+' : '');
        if (cp >= 1) done.count = 1;
      }
      once('welcome', TL.welcome, t, function () { root.classList.add('is-welcome'); });

      var pr = Math.min(1, t / TL.exit);
      bar.style.transform = 'scaleX(' + pr.toFixed(3) + ')';
      pctEl.textContent = pad(Math.round(pr * 100), 3);
      once('exit', TL.exit, t, function () { exit(false); });

      /* draw */
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = Math.min(1, t / 900);
      ctx.drawImage(grid, 0, 0, W, H);
      ctx.globalAlpha = 1;

      if (!reduce && t < 1900) { // scan beam
        var sy = easeInOut(Math.min(1, t / 1800)) * H;
        var sg = ctx.createLinearGradient(0, sy - 90, 0, sy);
        sg.addColorStop(0, 'rgba(162,201,255,0)'); sg.addColorStop(1, 'rgba(162,201,255,.10)');
        ctx.fillStyle = sg; ctx.fillRect(0, sy - 90, W, 90);
        ctx.fillStyle = 'rgba(162,201,255,.5)'; ctx.fillRect(0, sy, W, 1);
      }

      for (i = 0; i < dust.length; i++) {
        var d = dust[i];
        if (!reduce) { d.y -= d.v * k; if (d.y < -5) { d.y = H + 5; d.x = Math.random() * W; } }
        ctx.fillStyle = 'rgba(162,201,255,' + d.a + ')';
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 6.283); ctx.fill();
      }

      ctx.globalCompositeOperation = 'lighter';
      if (glowA > 0.01) {
        var gr = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, 170);
        gr.addColorStop(0, 'rgba(255,122,61,' + (.38 * glowA) + ')');
        gr.addColorStop(1, 'rgba(255,122,61,0)');
        ctx.fillStyle = gr; ctx.fillRect(glowX - 170, glowY - 170, 340, 340);
        if (done.cut) glowA *= Math.pow(.92, k);
      }
      for (i = sparks.length - 1; i >= 0; i--) {
        var s = sparks[i];
        s.vy += .17 * k; s.vx *= Math.pow(.985, k);
        s.x += s.vx * k; s.y += s.vy * k; s.life -= s.decay * k;
        if (s.life <= 0 || s.y > H + 20) { sparks.splice(i, 1); continue; }
        ctx.strokeStyle = 'hsla(' + s.h + ',100%,' + (55 + s.life * 40) + '%,' + s.life + ')';
        ctx.lineWidth = s.w;
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 2.4, s.y - s.vy * 2.4); ctx.stroke();
      }

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    /* ---------- exit ---------- */
    function exit(fast) {
      if (exiting) return;
      exiting = true;
      try { sessionStorage.setItem(CFG.key, '1'); } catch (err) {}
      root.classList.add('is-exit');
      var d1 = fast ? 200 : 420;
      setTimeout(function () {
        root.classList.add('is-open');
        html.style.overflow = prevOverflow;
        html.classList.add('ty-reveal');
      }, d1);
      setTimeout(cleanup, d1 + 1100);
    }
    function cleanup() {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('keydown', onKey);
      if (root.parentNode) root.parentNode.removeChild(root);
      running = false;
      setTimeout(function () { html.classList.remove('ty-reveal'); }, 1600);
      try { document.dispatchEvent(new CustomEvent('ty:intro-done')); } catch (err) {}
    }
    function onKey(ev) { if (ev.key === 'Escape' || ev.key === 'Enter') exit(true); }
    document.addEventListener('keydown', onKey);
    q('.ty-skip').addEventListener('click', function () { exit(true); });
  }

  /* public API: TYIntro.play() để phát lại */
  window.TYIntro = { play: function () { if (document.body) start(); } };

  var force = /[?&]intro=1(&|$)/.test(location.search) || window.TY_INTRO_FORCE === true;
  var seen = false;
  try { seen = !!sessionStorage.getItem(CFG.key); } catch (err) {}
  if (force || CFG.always || !seen) {
    if (document.body) start();
    else document.addEventListener('DOMContentLoaded', start);
  }
})();
