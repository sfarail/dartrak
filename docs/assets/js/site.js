/* ═══════════════════════════════════════════════════════════════════════
   Pixware Studio — site.js
   i18n · preloader · header · split-text · reveal · compteurs · marquee ·
   scramble · curseur · magnétisme · tilt · parallaxe · champ de pixels WebGL
   Zéro dépendance. Tout est désactivé proprement en prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════════════════ */
(() => {
  "use strict";
  const d = document, w = window, root = d.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(pointer: fine)").matches;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => Array.from(c.querySelectorAll(s));

  /* ── i18n ─────────────────────────────────────────────────────────── */
  const pageLangs = (root.dataset.langs || "fr").split(",");
  function applyLang(l, persist) {
    if (!pageLangs.includes(l)) return;
    root.dataset.lang = l; root.lang = l;
    const t = root.getAttribute(`data-title-${l}`); if (t) d.title = t;
    const md = root.getAttribute(`data-desc-${l}`), m = $('meta[name="description"]'); if (m && md) m.content = md;
    $$("[data-i18n-attr]").forEach(el => el.dataset.i18nAttr.split(",").forEach(a => {
      const v = el.getAttribute(`data-${a}-${l}`); if (v != null) el.setAttribute(a, v);
    }));
    $$("[data-lang-btn]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.langBtn === l)));
    if (persist) { try { localStorage.setItem("pw_lang", l); } catch (_) {} runScramble(); }
  }
  if (pageLangs.length > 1) {
    applyLang(root.dataset.lang || pageLangs[0], false);
    $$("[data-lang-btn]").forEach(b => b.addEventListener("click", () => applyLang(b.dataset.langBtn, true)));
  }

  /* ── preloader ────────────────────────────────────────────────────── */
  const pre = $("#preloader");
  let seen = false;
  try { seen = sessionStorage.getItem("pw_seen") === "1"; sessionStorage.setItem("pw_seen", "1"); } catch (_) {}
  const introDelay = pre && !seen && !reduce ? 700 : 0;
  function finishIntro() {
    pre.classList.add("done"); root.classList.add("loaded");
    pre.addEventListener("transitionend", () => pre.remove(), { once: true });
    setTimeout(() => pre.remove(), 1600);
  }
  if (pre) {
    if (introDelay === 0) { pre.remove(); root.classList.add("loaded"); }
    else setTimeout(() => {
      // le P du preloader vient se poser sur la marque du header (FLIP), puis lui passe le relais
      const grid = $(".pre-grid", pre), mark = $(".brand-mark");
      if (grid && mark) {
        const a = grid.getBoundingClientRect(), b = mark.getBoundingClientRect();
        grid.style.transformOrigin = "top left";
        grid.style.transition = "transform .7s cubic-bezier(.65,0,.35,1), opacity .25s";
        grid.style.transform = `translate(${(b.left - a.left).toFixed(1)}px, ${(b.top - a.top).toFixed(1)}px) scale(${(b.width / a.width).toFixed(3)})`;
        root.classList.add("from-pre");
        setTimeout(finishIntro, 680);
      } else finishIntro();
    }, introDelay);
  } else root.classList.add("loaded");

  /* ── marque : index des lettres + halo du champ de pixels sous le logo ── */
  $$(".brand-word i").forEach((el, i) => el.style.setProperty("--i", i));
  const brandEl = $(".brand");
  if (brandEl && fine) {
    brandEl.addEventListener("pointerenter", e => $$("canvas.pixel-field").forEach(c => c.pixelGlow && c.pixelGlow(e.clientX, e.clientY)));
    brandEl.addEventListener("pointerleave", () => $$("canvas.pixel-field").forEach(c => c.pixelRelease && c.pixelRelease()));
  }

  /* ── header, progression, menu ────────────────────────────────────── */
  const header = $(".site-header"), prog = $("#progress");
  function onScroll() {
    const y = w.scrollY;
    if (header) header.classList.toggle("scrolled", y > 24);
    if (prog) { const h = root.scrollHeight - w.innerHeight; prog.style.setProperty("--p", h > 0 ? (y / h).toFixed(4) : 0); }
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const burger = $(".burger");
  if (burger) {
    burger.addEventListener("click", () => {
      const open = d.body.classList.toggle("menu-open"); burger.setAttribute("aria-expanded", String(open));
    });
    $$(".site-nav a").forEach((a, i) => { a.style.setProperty("--i", i); a.addEventListener("click", () => { d.body.classList.remove("menu-open"); burger.setAttribute("aria-expanded", "false"); }); });
    addEventListener("keydown", e => { if (e.key === "Escape") { d.body.classList.remove("menu-open"); burger.setAttribute("aria-expanded", "false"); } });
  }

  /* ── split-text : mots > caractères, index --i pour le stagger ────── */
  $$("[data-split]").forEach(el => {
    const text = el.textContent.trim(); el.setAttribute("aria-label", text); el.textContent = "";
    let i = 0;
    text.split(/(\s+)/).forEach(tok => {
      if (!tok) return;
      if (/^\s+$/.test(tok)) { el.appendChild(d.createTextNode(" ")); return; }
      const word = d.createElement("span"); word.className = "word"; word.setAttribute("aria-hidden", "true");
      for (const ch of tok) { const c = d.createElement("span"); c.className = "char"; c.textContent = ch; c.style.setProperty("--i", i++); word.appendChild(c); }
      el.appendChild(word);
    });
  });

  /* ── reveal au scroll ─────────────────────────────────────────────── */
  $$("[data-stagger]").forEach(p => Array.from(p.children).forEach((c, i) => c.style.setProperty("--i", i)));
  const revealEls = $$(".reveal");
  if (reduce || !("IntersectionObserver" in w)) revealEls.forEach(e => e.classList.add("in"));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: .12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(e => io.observe(e));
  }

  /* ── compteurs ────────────────────────────────────────────────────── */
  const counters = $$("[data-count]");
  function runCounter(el) {
    const end = parseFloat(el.dataset.count), dur = 1500, t0 = performance.now();
    const tick = t => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(end * e); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }
  if (counters.length) {
    if (reduce) counters.forEach(c => c.textContent = c.dataset.count);
    else { const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { runCounter(e.target); io.unobserve(e.target); } }), { threshold: .5 }); counters.forEach(c => io.observe(c)); }
  }

  /* ── marquee : on double la piste pour une boucle sans couture ────── */
  $$(".marquee-track").forEach(t => Array.from(t.children).forEach(c => t.appendChild(c.cloneNode(true))));

  /* ── scramble : le texte se "décode" ──────────────────────────────── */
  const GLYPHS = "█▓▒░#%&@01<>/|=+*";
  function scramble(el) {
    const final = el.dataset.final || (el.dataset.final = el.textContent), n = final.length, dur = +el.dataset.scramble || 900, t0 = performance.now();
    el.style.minWidth = el.getBoundingClientRect().width + "px";
    const tick = t => {
      const p = Math.min(1, (t - t0) / dur); let out = "";
      for (let i = 0; i < n; i++) { const ch = final[i]; out += ch === " " ? " " : (i / n < p ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]); }
      el.textContent = out; if (p < 1) requestAnimationFrame(tick); else el.style.minWidth = "";
    };
    requestAnimationFrame(tick);
  }
  function runScramble() { if (reduce) return; $$("[data-scramble]").forEach(el => { if (el.offsetParent !== null) scramble(el); }); }
  setTimeout(runScramble, introDelay + 120);

  /* ── curseur ──────────────────────────────────────────────────────── */
  if (fine && !reduce) {
    const cur = d.createElement("div"); cur.id = "cursor"; cur.innerHTML = '<div class="cursor-ring"></div><div class="cursor-dot"></div>';
    d.body.appendChild(cur); d.body.classList.add("has-cursor");
    let x = w.innerWidth / 2, y = w.innerHeight / 2, rx = x, ry = y;
    addEventListener("pointermove", e => { x = e.clientX; y = e.clientY; cur.classList.add("visible"); }, { passive: true });
    addEventListener("pointerdown", () => cur.classList.add("is-pressing"));
    addEventListener("pointerup", () => cur.classList.remove("is-pressing"));
    d.addEventListener("mouseleave", () => cur.classList.remove("visible"));
    const HOVER = "a, button, [data-magnetic], .tilt, input, textarea, select, label, summary";
    d.addEventListener("pointerover", e => { if (e.target.closest(HOVER)) cur.classList.add("is-hovering"); });
    d.addEventListener("pointerout", e => { if (e.target.closest(HOVER)) cur.classList.remove("is-hovering"); });
    (function loop() {
      rx += (x - rx) * .16; ry += (y - ry) * .16;
      cur.style.setProperty("--x", rx.toFixed(1) + "px"); cur.style.setProperty("--y", ry.toFixed(1) + "px");
      cur.style.setProperty("--dx", x + "px"); cur.style.setProperty("--dy", y + "px");
      requestAnimationFrame(loop);
    })();
  }

  /* ── boutons magnétiques ──────────────────────────────────────────── */
  if (fine && !reduce) $$("[data-magnetic]").forEach(el => {
    const k = parseFloat(el.dataset.magnetic) || .3;
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect(), mx = e.clientX - (r.left + r.width / 2), my = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${(mx * k).toFixed(1)}px, ${(my * k).toFixed(1)}px)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transform = ""; });
  });

  /* ── tilt 3D + projecteur ─────────────────────────────────────────── */
  $$(".tilt").forEach(card => {
    const max = parseFloat(card.dataset.tilt) || 6;
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", (px * 100).toFixed(1) + "%"); card.style.setProperty("--my", (py * 100).toFixed(1) + "%");
      if (fine && !reduce) card.style.transform = `perspective(900px) rotateX(${((.5 - py) * max).toFixed(2)}deg) rotateY(${((px - .5) * max).toFixed(2)}deg) translateY(-4px)`;
    }, { passive: true });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });

  /* ── parallaxe légère ─────────────────────────────────────────────── */
  const par = $$("[data-speed]");
  if (par.length && !reduce) {
    let queued = false;
    const upd = () => { const vh = w.innerHeight; par.forEach(el => { const r = el.getBoundingClientRect(), c = (r.top + r.height / 2) - vh / 2; el.style.transform = `translate3d(0, ${(c * -parseFloat(el.dataset.speed)).toFixed(1)}px, 0)`; }); queued = false; };
    addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(upd); } }, { passive: true }); upd();
  }

  /* ── champ de pixels WebGL (hero, 404) ────────────────────────────
     Rendu à 1 fragment par cellule (canvas de ~130×60 px agrandi en CSS,
     image-rendering:pixelated) : ~200× moins de travail GPU qu'en plein écran.
     Les interstices entre cellules sont dessinés en CSS (.hero::before).
     Garde-fou : si les frames dépassent le budget, l'effet se retire. */
  const CELL = 14;
  function pixelField(canvas) {
    const gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: "low-power" });
    if (!gl) return false;
    const VS = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
    const FS = `precision mediump float;
uniform vec2 u_res;uniform float u_time;uniform vec2 u_mouse;uniform vec3 u_c1;uniform vec3 u_c2;uniform float u_bias;
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1));return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
  vec2 cell=floor(gl_FragCoord.xy);
  vec2 uv=(cell+.5)/u_res;
  vec2 asp=vec2(u_res.x/u_res.y,1.);
  float t=u_time*.09;
  float n=fbm(uv*asp*3.4+vec2(t,-t*.6));
  float glow=1.-smoothstep(0.,.42,length((uv-u_mouse)*asp));
  float v=smoothstep(.5,.82,n+glow*.5);
  v*=mix(1.,.18+.82*smoothstep(-.15,.95,uv.x),u_bias);
  float flicker=.8+.2*hash(cell+floor(u_time*1.5));
  vec3 col=mix(u_c1,u_c2,smoothstep(.56,.86,n+glow*.6));
  float a=v*flicker*.85;
  gl_FragColor=vec4(col*a,a);
}`;
    const sh = (type, src) => { const o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(o)); return null; } return o; };
    const vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS); if (!vs || !fs) return false;
    const prg = gl.createProgram(); gl.attachShader(prg, vs); gl.attachShader(prg, fs); gl.linkProgram(prg);
    if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) return false;
    gl.useProgram(prg);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prg, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = n => gl.getUniformLocation(prg, n);
    const uRes = U("u_res"), uTime = U("u_time"), uMouse = U("u_mouse");
    const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
    const cs = getComputedStyle(root);
    gl.uniform3fv(U("u_c1"), hex((canvas.dataset.c1 || cs.getPropertyValue("--acc")).trim()));
    gl.uniform3fv(U("u_c2"), hex((canvas.dataset.c2 || cs.getPropertyValue("--acc-2")).trim()));
    gl.uniform1f(U("u_bias"), canvas.dataset.bias === "0" ? 0 : 1);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const host = canvas.parentElement;
    let mx = -10, my = -10, tmx = mx, tmy = my, running = true, raf = 0, alive = true;
    const t0 = performance.now();
    function resize() {
      const r = host.getBoundingClientRect();
      const cols = Math.max(1, Math.ceil(r.width / CELL)), rows = Math.max(1, Math.ceil(r.height / CELL));
      canvas.width = cols; canvas.height = rows;
      canvas.style.width = cols * CELL + "px"; canvas.style.height = rows * CELL + "px";   // grille CSS alignée
      gl.viewport(0, 0, cols, rows); gl.uniform2f(uRes, cols, rows);
    }
    resize(); addEventListener("resize", resize);
    let moved = false;
    canvas.pixelGlow = (cx, cy) => { const r = host.getBoundingClientRect(); tmx = (cx - r.left) / r.width; tmy = 1 - (cy - r.top) / r.height; };
    canvas.pixelRelease = () => { tmx = -10; tmy = -10; };
    host.addEventListener("pointermove", e => { moved = true; canvas.pixelGlow(e.clientX, e.clientY); }, { passive: true });
    host.addEventListener("pointerleave", () => { if (moved) canvas.pixelRelease(); });
    // au chargement, le champ s'allume sous le logo puis s'éteint (sauf si la souris a pris le relais)
    const mark = d.querySelector(".brand-mark");
    if (mark && canvas.dataset.bias !== "0") {
      const m = mark.getBoundingClientRect(); canvas.pixelGlow(m.left + m.width / 2, m.top + m.height / 2); mx = tmx; my = tmy;
      setTimeout(() => { if (!moved) canvas.pixelRelease(); }, 2400 + introDelay);
    }
    let last = 0, ema = 16, frames = 0;
    function frame(now) {
      if (!alive || !running || d.hidden) return;
      if (last) { ema += ((now - last) - ema) * .1; frames++; if (frames > 40 && ema > 60) { alive = false; canvas.remove(); return; } }
      last = now;
      mx += (tmx - mx) * .08; my += (tmy - my) * .08;
      gl.uniform1f(uTime, (now - t0) / 1000); gl.uniform2f(uMouse, mx, my);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(frame);
    }
    const start = () => { cancelAnimationFrame(raf); last = 0; raf = requestAnimationFrame(frame); };
    new IntersectionObserver(es => { running = es[0].isIntersecting; if (running) start(); }).observe(canvas);
    d.addEventListener("visibilitychange", () => { if (!d.hidden && running) start(); });
    start();
    return true;
  }
  $$("canvas.pixel-field").forEach(c => { if (reduce || !pixelField(c)) c.remove(); else c.classList.add("on"); });
})();
