/*!
 * tars-mascot.js — a procedural TARS-style block robot that stands in the
 * corner of a website: four legs of three stacked blocks each (twelve blocks),
 * assembles itself on load, walks when the page scrolls.
 *
 * Requires three.js (r150+) as a global `THREE`, or pass it in: TarsMascot.mount({ THREE })
 * TarsMascot.build(THREE, opts) -> THREE.Group      TarsMascot.mount(opts) -> controller
 */
(function (global) {
  'use strict';

  // Colours. Each of the twelve blocks can be set on its own via `blocks`
  // (leg k, block i from the top => blocks[k*3+i]); otherwise the row colour applies.
  var PALETTE = {
    top:    '#5A6068',   // top row of blocks
    mid:    '#474C54',   // middle row
    low:    '#3A3E44',   // bottom row
    blocks: null,        // e.g. ['#fff','#1FA24A', ... 12 entries], null = use rows
    groove: '#202327',   // seams, the spine behind the blocks
    frame:  '#2B2F35',   // bevels and the screen frame
    foot:   '#2E3238',
    hinge:  '#8A9099',
    screen: '#0F1216',
    led:    '#6BFF8A',
    text:   '#E2453C'
  };
  var SLAB = { w: 0.36, h: 2.30, d: 0.30, gap: 0.03 };

  function mergeList(THREE, list) {
    var pos = [], nor = [], uv = [], idx = [], off = 0, hasUV = list.every(function (g) { return !!g.attributes.uv; });
    list.forEach(function (g) {
      var p = g.attributes.position, n = g.attributes.normal, u = g.attributes.uv;
      for (var i = 0; i < p.count; i++) { pos.push(p.getX(i), p.getY(i), p.getZ(i)); nor.push(n.getX(i), n.getY(i), n.getZ(i)); if (hasUV) uv.push(u.getX(i), u.getY(i)); }
      var ind = g.index;
      if (ind) for (var j = 0; j < ind.count; j++) idx.push(ind.getX(j) + off); else for (var j2 = 0; j2 < p.count; j2++) idx.push(j2 + off);
      off += p.count;
    });
    var out = new THREE.BufferGeometry();
    out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    out.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
    if (hasUV) out.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    out.setIndex(idx);
    return out;
  }
  function mergeStatic(THREE, group) {
    var mats = [], buckets = [];
    for (var i = group.children.length - 1; i >= 0; i--) {
      var c = group.children[i];
      if (!c.isMesh || c.userData.keep) continue;
      c.updateMatrix();
      var g = c.geometry.clone().applyMatrix4(c.matrix);
      var at = mats.indexOf(c.material);
      if (at < 0) { at = mats.length; mats.push(c.material); buckets.push([]); }
      buckets[at].push(g); group.remove(c);
    }
    for (var k = 0; k < mats.length; k++) group.add(new THREE.Mesh(mergeList(THREE, buckets[k]), mats[k]));
    return group;
  }

  function build(THREE, opts) {
    opts = opts || {};
    var C = Object.assign({}, PALETTE, opts.palette || {});
    function metal(color, rough, met) { return new THREE.MeshStandardMaterial({ color: color, roughness: rough, metalness: met }); }
    var M = {
      groove: metal(C.groove, 0.70, 0.30), frame: metal(C.frame, 0.55, 0.50), foot: metal(C.foot, 0.60, 0.40),
      hinge: metal(C.hinge, 0.35, 0.70), screen: metal(C.screen, 0.15, 0.60),
      led: new THREE.MeshStandardMaterial({ color: C.led, emissive: C.led, emissiveIntensity: 1.2, roughness: 0.3 }),
      text: new THREE.MeshBasicMaterial({ color: C.text })
    };
    var root = new THREE.Group(); root.name = 'TarsMascot';
    var parts = { materials: M, palette: C, slabs: [], blocks: [] };
    function add(parent, geo, mat, p, r, s) {
      var m = new THREE.Mesh(geo, mat);
      if (p) m.position.set(p[0], p[1], p[2]); if (r) m.rotation.set(r[0], r[1], r[2]); if (s) m.scale.set(s[0], s[1], s[2]);
      parent.add(m); return m;
    }
    var W = SLAB.w, H = SLAB.h, D = SLAB.d, pitch = W + SLAB.gap;
    var homes = [-1.5, -0.5, 0.5, 1.5].map(function (k) { return k * pitch; });
    var GAP = 0.05, BH = (H - 2 * GAP) / 3, rowKeys = ['top', 'mid', 'low'];

    homes.forEach(function (x, k) {
      var slab = new THREE.Group();
      slab.name = 'Leg' + k;
      slab.position.set(x, H / 2, 0);
      slab.userData.home = new THREE.Vector3(x, H / 2, 0);
      root.add(slab);
      add(slab, new THREE.BoxGeometry(W - 0.10, H, D - 0.10), M.groove);                        // dark spine the blocks sit on
      for (var i = 0; i < 3; i++) {
        var y = H / 2 - BH / 2 - i * (BH + GAP), idx = k * 3 + i;
        var mat = new THREE.MeshStandardMaterial({ color: (C.blocks && C.blocks[idx]) || C[rowKeys[i]], roughness: 0.48, metalness: 0.40 });
        var blk = add(slab, new THREE.BoxGeometry(W, BH, D), mat, [0, y, 0]);
        blk.userData.keep = true; blk.name = 'Block' + idx; parts.blocks.push(blk);
        [-1, 1].forEach(function (sx) { [-1, 1].forEach(function (sz) {                        // corner bevels
          add(slab, new THREE.BoxGeometry(0.025, BH - 0.02, 0.025), M.frame, [sx * (W / 2), y, sz * (D / 2)]);
        }); });
        add(slab, new THREE.BoxGeometry(W - 0.06, 0.012, 0.012), M.frame, [0, y + BH / 2 - 0.03, D / 2 + 0.004]);   // edge line on the face
      }
      add(slab, new THREE.BoxGeometry(W + 0.02, 0.06, D + 0.02), M.foot, [0, -H / 2 + 0.03, 0]);
      [0.62, -0.30].forEach(function (hy) { [-1, 1].forEach(function (sx) {
        add(slab, new THREE.BoxGeometry(0.05, 0.10, 0.10), M.hinge, [sx * (W / 2 + 0.02), hy, 0]);      // hinge cubes
      }); });
      if (k === 2) {                                                                            // screen on the top block of an inner leg
        var sy = H / 2 - BH / 2;
        add(slab, new THREE.BoxGeometry(W - 0.06, BH - 0.14, 0.03), M.frame, [0, sy, D / 2 + 0.008]);
        var scr = add(slab, new THREE.BoxGeometry(W - 0.11, BH - 0.30, 0.02), M.screen, [0, sy + 0.05, D / 2 + 0.024]);
        scr.userData.keep = true; parts.screen = scr;
        var led = add(slab, new THREE.BoxGeometry(0.03, 0.03, 0.012), M.led, [W / 2 - 0.09, sy + BH / 2 - 0.12, D / 2 + 0.036]);
        led.userData.keep = true; parts.led = led;
        if (typeof document !== 'undefined') {
          var tc = document.createElement('canvas'); tc.width = 256; tc.height = 96;
          var tx = tc.getContext('2d'); tx.fillStyle = C.groove; tx.fillRect(0, 0, 256, 96);
          tx.fillStyle = C.text; tx.font = '600 58px ui-monospace, Menlo, Consolas, monospace'; tx.textAlign = 'center'; tx.textBaseline = 'middle';
          if (tx.letterSpacing !== undefined) tx.letterSpacing = '10px';
          tx.fillText('TARS', 132, 52);
          var ttex = new THREE.CanvasTexture(tc); if ('colorSpace' in ttex) ttex.colorSpace = THREE.SRGBColorSpace;
          var label = add(slab, new THREE.PlaneGeometry(0.22, 0.08), new THREE.MeshBasicMaterial({ map: ttex }), [0, sy - BH / 2 + 0.14, D / 2 + 0.03]);
          label.userData.keep = true;
        }
      }
      mergeStatic(THREE, slab);
      parts.slabs.push(slab);
    });

    root.userData.parts = parts;
    root.userData.setPalette = function (next) {
      Object.assign(C, next || {});
      M.groove.color.set(C.groove); M.frame.color.set(C.frame); M.foot.color.set(C.foot); M.hinge.color.set(C.hinge);
      M.screen.color.set(C.screen); M.led.color.set(C.led); M.led.emissive.set(C.led); M.text.color.set(C.text);
      parts.blocks.forEach(function (b, idx) { b.material.color.set((C.blocks && C.blocks[idx]) || C[rowKeys[idx % 3]]); });
    };
    return root;
  }

  function envTexture(THREE) {
    var c = document.createElement('canvas'); c.width = 256; c.height = 128; var ctx = c.getContext('2d');
    var g = ctx.createLinearGradient(0, 0, 0, 128);
    g.addColorStop(0, '#f4f6f0'); g.addColorStop(0.5, '#a9aeb3'); g.addColorStop(0.55, '#5f646b'); g.addColorStop(1, '#1c1f24');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 128);
    var key = ctx.createRadialGradient(80, 30, 2, 80, 30, 46); key.addColorStop(0, 'rgba(255,255,255,1)'); key.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = key; ctx.fillRect(0, 0, 256, 128);
    var tex = new THREE.CanvasTexture(c); tex.mapping = THREE.EquirectangularReflectionMapping; if ('colorSpace' in tex) tex.colorSpace = THREE.SRGBColorSpace; return tex;
  }
  function shadowTexture(THREE) {
    var c = document.createElement('canvas'); c.width = c.height = 128; var ctx = c.getContext('2d');
    var g = ctx.createRadialGradient(64, 64, 4, 64, 64, 62);
    g.addColorStop(0, 'rgba(20,22,26,0.40)'); g.addColorStop(0.6, 'rgba(20,22,26,0.14)'); g.addColorStop(1, 'rgba(20,22,26,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
    var tex = new THREE.CanvasTexture(c); if ('colorSpace' in tex) tex.colorSpace = THREE.SRGBColorSpace; return tex;
  }

  function mount(options) {
    var o = Object.assign({ THREE: global.THREE, container: null, size: 132, position: 'bottom-right', offset: 24, zIndex: 2147483000,
      greeting: 'Need a hand?', label: 'Open chat', facing: -0.62, assemble: true, badge: false, palette: null, onClick: null }, options || {});
    var THREE = o.THREE;
    if (!THREE) throw new Error('tars-mascot: three.js not found. Load it first or pass { THREE }.');
    var reduced = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var floating = !o.container, onLeft = o.position.indexOf('left') > -1;

    var root = document.createElement('div'); root.className = 'tars-mascot';
    root.style.cssText = [floating ? 'position:fixed' : 'position:relative', 'width:' + o.size + 'px', 'height:' + o.size + 'px', 'z-index:' + o.zIndex, 'cursor:pointer', '-webkit-tap-highlight-color:transparent', 'touch-action:manipulation'].join(';');
    if (floating) { var vert = o.position.indexOf('top') === 0 ? 'top' : 'bottom'; root.style[vert] = 'calc(' + o.offset + 'px + env(safe-area-inset-' + vert + ', 0px))'; root.style[onLeft ? 'left' : 'right'] = o.offset + 'px'; }
    var btn = document.createElement('button'); btn.type = 'button'; btn.setAttribute('aria-label', o.label);
    btn.style.cssText = 'all:unset;display:block;width:100%;height:100%;cursor:pointer;border-radius:12px'; root.appendChild(btn);
    var bubble = document.createElement('div'); bubble.textContent = o.greeting; bubble.setAttribute('role', 'status');
    bubble.style.cssText = ['position:absolute', 'bottom:calc(100% - 10px)', (onLeft ? 'left:8px' : 'right:8px'), 'padding:7px 12px', 'border-radius:' + (onLeft ? '10px 10px 10px 3px' : '10px 10px 3px 10px'), 'background:#23262B', 'color:#F1F3EA', 'font:500 13px/1.3 ui-monospace,SFMono-Regular,Menlo,monospace', 'white-space:nowrap', 'pointer-events:none', 'box-shadow:0 8px 22px rgba(20,22,26,.30)', 'opacity:0', 'transform:translateY(6px)', 'transition:opacity .22s ease, transform .22s ease'].join(';');
    root.appendChild(bubble);
    var dot = document.createElement('span');
    dot.style.cssText = 'position:absolute;top:8px;' + (onLeft ? 'left' : 'right') + ':8px;width:10px;height:10px;border-radius:50%;background:#E2453C;box-shadow:0 0 0 2.5px rgba(255,255,255,.9);pointer-events:none;display:' + (o.badge ? 'block' : 'none');
    root.appendChild(dot);
    (o.container || document.body).appendChild(root);
    function showBubble(on) { bubble.style.opacity = on ? '1' : '0'; bubble.style.transform = on ? 'translateY(0)' : 'translateY(6px)'; }

    var renderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
    catch (err) {
      var P0 = Object.assign({}, PALETTE, o.palette || {});
      btn.innerHTML = '<svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">' + [14, 34, 54, 74].map(function (x) { return [12, 38, 64].map(function (y) { return '<rect x="' + x + '" y="' + y + '" width="14" height="24" rx="1.5" fill="' + P0.mid + '"/>'; }).join(''); }).join('') + '<rect x="56" y="16" width="10" height="12" fill="' + P0.screen + '"/></svg>';
      btn.addEventListener('click', function (e) { if (typeof o.onClick === 'function') o.onClick(e); });
      root.addEventListener('pointerenter', function () { showBubble(true); }); root.addEventListener('pointerleave', function () { showBubble(false); });
      return { el: root, robot: null, fallback: true, say: function (t) { bubble.textContent = t; showBubble(true); }, setBadge: function (on) { dot.style.display = on ? 'block' : 'none'; }, walk: function () {}, run: function () {}, assemble: function () {}, pause: function () {}, setPalette: function () {}, destroy: function () { root.remove(); } };
    }
    renderer.setPixelRatio(Math.min(global.devicePixelRatio || 1, 2)); renderer.setSize(o.size, o.size, false);
    if ('outputColorSpace' in renderer) renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;pointer-events:none'; btn.appendChild(renderer.domElement);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(24, 1, 0.1, 100); camera.position.set(0, 2.2, 8.6); camera.lookAt(0, 1.05, 0);
    try { var pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromEquirectangular(envTexture(THREE)).texture; pm.dispose(); } catch (e) {}
    scene.add(new THREE.HemisphereLight(0xffffff, 0x2a2d31, 0.55));
    var key = new THREE.DirectionalLight(0xffffff, 1.7); key.position.set(3.2, 5.5, 3.0); scene.add(key);
    var fill = new THREE.DirectionalLight(0xdfe6ee, 0.35); fill.position.set(-4, 2, 2.5); scene.add(fill);
    var robot = build(THREE, { palette: o.palette }); scene.add(robot);
    var P = robot.userData.parts;
    var shadow = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.3), new THREE.MeshBasicMaterial({ map: shadowTexture(THREE), transparent: true, depthWrite: false }));
    shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.01; scene.add(shadow);

    var st = { t: 0, hover: false, assemble: o.assemble && !reduced ? 0 : 1, speed: 0, dir: 1, phase: 0, flip: 0, lean: 0, splay: 0, clap: 0, tilt: 0, tiltV: 0, fidget: 3 + Math.random() * 3, blink: 0, nextBlink: 2 + Math.random() * 3, lastY: global.scrollY || 0, idleFor: 0 };
    var starts = P.slabs.map(function (s, i) { var h = s.userData.home; return { p: new THREE.Vector3(h.x, h.y + 2.4 + (i % 2) * 0.5, 0), r: new THREE.Euler(0, 0, 0) }; });

    function onScroll() { var y = global.scrollY || 0, dy = y - st.lastY; st.lastY = y; st.idleFor = 0; if (dy) st.dir = dy > 0 ? 1 : -1; st.speed = Math.min(1.8, st.speed + Math.abs(dy) * 0.035); }
    global.addEventListener('scroll', onScroll, { passive: true });
    root.addEventListener('pointerenter', function () { st.hover = true; showBubble(true); dot.style.display = 'none'; });
    root.addEventListener('pointerleave', function () { st.hover = false; showBubble(false); });
    btn.addEventListener('focus', function () { st.hover = true; showBubble(true); }); btn.addEventListener('blur', function () { st.hover = false; showBubble(false); });
    btn.addEventListener('click', function (e) { st.clap = 1; if (typeof o.onClick === 'function') o.onClick(e); });
    function easeOutBack(x) { var c1 = 0.55, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); }
    function damp(dt, rate) { return 1 - Math.pow(rate, dt); }

    var running = true, raf = 0, prev = performance.now();
    function frame(now) {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      var dt = Math.max(0, Math.min(0.05, (now - prev) / 1000)); prev = now; st.t += dt; st.idleFor += dt;
      st.speed *= Math.pow(0.03, dt); st.phase += st.speed * dt * 7.5;
      var amp = Math.min(0.55, st.speed * 0.55), run = Math.max(0, Math.min(1, (st.speed - 0.9) * 1.6));
      st.flip += (reduced ? 0 : run) * dt * 5.0;
      if (run < 0.05) { var tgt = Math.round(st.flip / (Math.PI * 2)) * Math.PI * 2; st.flip += (tgt - st.flip) * damp(dt, 0.02); }
      var bob = Math.abs(Math.sin(st.phase)) * amp * 0.14;
      st.lean += (st.dir * Math.min(0.22, st.speed * 0.18) - st.lean) * damp(dt, 0.01);
      st.fidget -= dt;
      if (st.fidget <= 0 && st.speed < 0.05 && st.assemble >= 1 && !reduced) { st.fidget = 3.5 + Math.random() * 4; st.tiltV += (Math.random() < 0.5 ? -1 : 1) * 1.4; }
      st.tiltV += (0 - st.tilt) * 30 * dt; st.tiltV *= Math.pow(0.03, dt); st.tilt += st.tiltV * dt;
      st.splay += ((st.hover ? 1 : 0) - st.splay) * damp(dt, 0.004); st.clap *= Math.pow(0.01, dt);
      st.assemble = Math.min(1, st.assemble + dt / 1.7);
      robot.rotation.set(st.lean, o.facing + Math.sin(st.t * 0.5) * 0.03 + st.tilt * 0.4, st.tilt * 0.35 + st.lean * 0.15); robot.position.y = bob;
      P.slabs.forEach(function (s, i) {
        var home = s.userData.home, outer = i === 0 || i === 3, side = i < 2 ? -1 : 1;
        var order = [1, 2, 0, 3].indexOf(i), pr = Math.max(0, Math.min(1, (st.assemble - order * 0.14) / 0.50)), e = easeOutBack(pr);
        var spread = 1 + st.splay * 0.26 - st.clap * 0.35, tx = home.x * spread, ty = home.y;
        var rx = (outer ? amp * Math.sin(st.phase) : -amp * Math.sin(st.phase) * 0.8) + (outer ? st.flip : 0), rz = st.splay * side * (outer ? 0.09 : 0.03);
        if (pr < 1) { var sp = starts[i]; s.position.set(sp.p.x + (tx - sp.p.x) * e, sp.p.y + (ty - sp.p.y) * e, 0); s.rotation.set(rx * e, 0, rz * e); }
        else { s.position.set(tx, ty + (outer ? 0 : Math.sin(st.t * 1.4 + i) * 0.004), 0); s.rotation.set(rx, 0, rz); }
      });
      st.nextBlink -= dt; if (st.nextBlink <= 0) { st.blink = 1; st.nextBlink = 1.8 + Math.random() * 3.5; } st.blink *= Math.pow(0.0005, dt);
      P.led.material.emissiveIntensity = 0.7 + Math.sin(st.t * 2.2) * 0.25 + st.blink * 1.4 + st.splay * 0.6 + st.speed * 0.4;
      shadow.scale.set(1 - bob * 0.6 + st.splay * 0.25, 1 - bob * 0.6, 1); shadow.material.opacity = st.assemble < 1 ? st.assemble : 1;
      if (st.idleFor > 30 && !st.hover) { st.idleFor = 0; st.speed = 0.6; }
      renderer.render(scene, camera);
    }
    raf = requestAnimationFrame(frame);
    function pause(p) { if (p && running) { running = false; cancelAnimationFrame(raf); } else if (!p && !running) { running = true; prev = performance.now(); raf = requestAnimationFrame(frame); } }
    document.addEventListener('visibilitychange', function () { pause(document.hidden); });
    return {
      el: root, robot: robot,
      walk: function (amount) { st.speed = Math.max(st.speed, amount == null ? 0.7 : amount); }, run: function () { st.speed = 1.8; }, assemble: function () { st.assemble = 0; },
      say: function (text, ms) { bubble.textContent = text; showBubble(true); if (ms !== 0) setTimeout(function () { if (!st.hover) showBubble(false); }, ms || 3200); },
      setBadge: function (on) { dot.style.display = on ? 'block' : 'none'; }, setPalette: function (p) { robot.userData.setPalette(p); }, pause: pause,
      __render: function () { renderer.render(scene, camera); }, __st: st,
      destroy: function () { running = false; cancelAnimationFrame(raf); global.removeEventListener('scroll', onScroll); renderer.dispose(); root.remove(); }
    };
  }
  var api = { build: build, mount: mount, PALETTE: PALETTE };
  if (typeof module === 'object' && module.exports) module.exports = api;
  global.TarsMascot = api;
})(typeof window !== 'undefined' ? window : globalThis);
