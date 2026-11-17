// theme.js
// 背景の切り替え。選んだ背景はブラウザに保存し、index.html と howto.html の両方で使う。
// 背景そのものの見た目は codtec.css の body[data-bg="…"] で決めている。
(function () {
    'use strict';

    // 背景の種類（ボタンを押すたびに、この順で切り替わる）
    const BACKGROUNDS = ['plain', 'grid', 'circuit', 'crt'];
    const STORAGE_KEY = 'codtec_bg';

    let current = null;
    try { current = localStorage.getItem(STORAGE_KEY); } catch (e) { /* 保存先が使えなければ既定のまま */ }
    if (!BACKGROUNDS.includes(current)) current = BACKGROUNDS[0];

    const button = document.getElementById('bg-btn');

    function apply() {
        document.body.dataset.bg = current;
        if (button) button.textContent = `BG: ${current.toUpperCase()}`;
    }

    if (button) {
        button.addEventListener('click', () => {
            current = BACKGROUNDS[(BACKGROUNDS.indexOf(current) + 1) % BACKGROUNDS.length];
            try { localStorage.setItem(STORAGE_KEY, current); } catch (e) { /* 保存できなくても切り替えは行う */ }
            apply();
            // プレイ中に切り替えたら、動く背景も切り替え先に合わせる
            if (window.CodtecBg && fx.active) {
                if (current === 'plain') { halt(); fx.warp = null; resetLayer(); } else applyLook(fx.now);
            }
            button.blur(); // プレイ中のキー入力でボタンが反応しないようにする
        });
    }

    apply();

    // ------------------------------------------------------------------
    // 進行に合わせて変化する背景（MARATHON と SUDDEN DEATH で script.js が呼ぶ）
    //   start()         : 変化を始める（PLAIN のときは何もしない）
    //   setLevel(words) : クリアした問題数を伝える。STAGE_EVERY 問ごとに、ワープして次の見た目へ移る
    //   pause() / resume() : 一時停止の間は動きを止める
    //   stop()          : もとの背景に戻す
    //
    // ふだんは止まっていて、区切りを越えた瞬間だけ動く。ワープの間は、模様が一気に拡大してから
    // 新しい細かさに落ち着き、色相が次の色へ移り、中心から外へ光の筋が走る。
    // ------------------------------------------------------------------
    const layer = document.querySelector('.bg-layer');
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const STAGE_EVERY = 10;   // 何問ごとにワープするか
    const WARP_MS = 1300;     // ワープにかける時間
    const BASE_HUE = { grid: 210, circuit: 140, crt: 165 }; // 光の筋の、背景ごとの基準の色相
    const STREAKS = 240;

    // 段階ごとの見た目。進むほど模様が細かく、明るくなり、色相が回る
    function look(stage) {
        return {
            hue: stage * 47,                                  // 1 段階ごとに色が変わる（度）
            scale: Math.max(0.42, 1 - 0.07 * stage),          // 模様の細かさ（小さいほど細かい）
            glow: 1 + Math.min(0.7, 0.07 * stage),            // 明るさ
        };
    }

    const fx = { active: false, paused: false, running: false, frame: 0, last: 0, stage: 0, now: look(0), warp: null, streaks: [] };

    function resizeCanvas() {
        if (!canvas) return;
        const ratio = Math.min(window.devicePixelRatio || 1, 1.5); // 描く負荷を抑えるため、細かさに上限を付ける
        canvas.width = Math.floor(window.innerWidth * ratio);
        canvas.height = Math.floor(window.innerHeight * ratio);
    }

    function applyLook(values) {
        if (!layer) return;
        layer.style.setProperty('--scale', values.scale.toFixed(3));
        layer.style.setProperty('--hue', `${(values.hue % 360).toFixed(1)}deg`);
        layer.style.setProperty('--glow', values.glow.toFixed(3));
    }

    function resetLayer() {
        if (layer) ['--scale', '--hue', '--glow'].forEach(name => layer.style.removeProperty(name));
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // ワープの 1 コマを描く。終わったら止まる
    function draw(now) {
        if (!fx.running || !fx.warp) return;
        const dt = Math.min((now - fx.last) / 1000, 0.1);
        fx.last = now;
        const warp = fx.warp;
        warp.t = Math.min(1, warp.t + (dt * 1000) / WARP_MS);
        const p = warp.t * warp.t * (3 - 2 * warp.t); // なめらかに始まり、なめらかに終わる
        const surge = Math.sin(Math.PI * warp.t);     // 途中でいちばん強くなる山

        // 模様は、いったん大きく拡大してから新しい細かさに落ち着く。色と明るさは次の段階へ移る
        fx.now = {
            hue: warp.from.hue + (warp.to.hue - warp.from.hue) * p,
            scale: (warp.from.scale + (warp.to.scale - warp.from.scale) * p) * (1 + 1.8 * surge),
            glow: warp.from.glow + (warp.to.glow - warp.from.glow) * p + 0.9 * surge,
        };
        applyLook(fx.now);

        // 中心から外へ走る光の筋
        if (ctx) {
            const w = canvas.width;
            const h = canvas.height;
            const maxR = Math.hypot(w, h) / 2;
            const hue = (BASE_HUE[current] || 200) + fx.now.hue;
            ctx.clearRect(0, 0, w, h);
            ctx.lineCap = 'round';
            for (const s of fx.streaks) {
                const depth = s.r / maxR; // 外側ほど速く、長く、明るい
                s.r += 2600 * (0.2 + depth * 1.8) * surge * dt;
                if (s.r > maxR) { s.r = Math.random() * 60; s.angle = Math.random() * Math.PI * 2; }
                const len = (10 + 220 * depth) * surge;
                const cos = Math.cos(s.angle);
                const sin = Math.sin(s.angle);
                ctx.strokeStyle = `hsla(${hue % 360}, 100%, 75%, ${((0.2 + 0.8 * depth) * surge).toFixed(3)})`;
                ctx.lineWidth = 1 + 2.5 * depth;
                ctx.beginPath();
                ctx.moveTo(w / 2 + cos * s.r, h / 2 + sin * s.r);
                ctx.lineTo(w / 2 + cos * (s.r + len), h / 2 + sin * (s.r + len));
                ctx.stroke();
            }
        }

        if (warp.t >= 1) {
            fx.warp = null;
            fx.now = warp.to;
            applyLook(fx.now);
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
            halt();
            return;
        }
        fx.frame = requestAnimationFrame(draw);
    }

    function run() {
        if (fx.running || !fx.warp) return;
        fx.running = true;
        fx.last = performance.now();
        fx.frame = requestAnimationFrame(draw);
    }

    function halt() {
        fx.running = false;
        cancelAnimationFrame(fx.frame);
    }

    // 次の段階へワープする
    function warpTo(stage) {
        fx.stage = stage;
        const to = look(stage);
        if (current === 'plain') { fx.now = to; return; }
        if (reduceMotion) { // 動きを出さない設定では、見た目だけを切り替える
            fx.now = to;
            applyLook(fx.now);
            return;
        }
        const maxR = canvas ? Math.hypot(canvas.width, canvas.height) / 2 : 1000;
        fx.streaks = Array.from({ length: STREAKS }, () => ({ angle: Math.random() * Math.PI * 2, r: Math.random() * maxR * 0.6 }));
        fx.warp = { t: 0, from: { ...fx.now }, to };
        if (!fx.paused) run();
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    window.CodtecBg = {
        start() {
            this.stop();
            fx.active = true;
        },
        setLevel(words) {
            if (!fx.active) return;
            const stage = Math.floor(words / STAGE_EVERY);
            if (stage > fx.stage) warpTo(stage);
        },
        pause() {
            fx.paused = true;
            halt();
        },
        resume() {
            fx.paused = false;
            if (fx.active && current !== 'plain') run();
        },
        stop() {
            halt();
            fx.active = false;
            fx.paused = false;
            fx.stage = 0;
            fx.now = look(0);
            fx.warp = null;
            fx.streaks = [];
            resetLayer();
        },
    };
})();
