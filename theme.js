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
                if (current === 'plain') { halt(); resetLayer(); } else if (!fx.paused) run();
            }
            button.blur(); // プレイ中のキー入力でボタンが反応しないようにする
        });
    }

    apply();

    // ------------------------------------------------------------------
    // 進行に合わせて変化する背景（MARATHON と SUDDEN DEATH で script.js が呼ぶ）
    //   start()         : 変化を始める（PLAIN のときは何もしない）
    //   setLevel(words) : クリアした問題数を伝える。見た目は、この値へ向かって少しずつ変わる
    //   pause() / resume() : 一時停止の間は動きを止める
    //   stop()          : もとの動かない背景に戻す
    // ------------------------------------------------------------------
    const layer = document.querySelector('.bg-layer');
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 流れる光の、背景ごとの基準の色相
    const BASE_HUE = { grid: 210, circuit: 140, crt: 165 };
    const MAX_STREAKS = 260;

    const fx = { active: false, paused: false, running: false, frame: 0, last: 0, target: 0, level: 0, ox: 0, oy: 0, time: 0, streaks: [] };

    function resizeCanvas() {
        if (!canvas) return;
        const ratio = Math.min(window.devicePixelRatio || 1, 1.5); // 描く負荷を抑えるため、細かさに上限を付ける
        canvas.width = Math.floor(window.innerWidth * ratio);
        canvas.height = Math.floor(window.innerHeight * ratio);
    }

    function resetLayer() {
        if (layer) ['--ox', '--oy', '--scale', '--hue', '--glow'].forEach(name => layer.style.removeProperty(name));
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function draw(now) {
        if (!fx.running) return;
        const dt = Math.min((now - fx.last) / 1000, 0.1);
        fx.last = now;
        fx.time += dt;

        // 問題数が増えても見た目が飛ばないよう、目標の値へ少しずつ近づける
        fx.level += (fx.target - fx.level) * Math.min(1, dt * 1.2);
        const intensity = 1 - Math.exp(-fx.level / 30); // 0（開始時）から 1 に近づく

        if (layer && current !== 'plain') {
            const speed = reduceMotion ? 0 : 12 + 360 * intensity; // 模様が流れる速さ（px/秒）
            fx.oy = (fx.oy + speed * dt) % 4400;
            fx.ox = (fx.ox + speed * 0.35 * dt) % 4400;
            layer.style.setProperty('--oy', `${fx.oy.toFixed(1)}px`);
            layer.style.setProperty('--ox', `${current === 'circuit' ? fx.ox.toFixed(1) : 0}px`);
            // 進むほど模様が細かくなり、ゆっくり脈打つ。色相は問題数に合わせて回る
            layer.style.setProperty('--scale', (1 - 0.35 * intensity + 0.04 * Math.sin(fx.time * 0.7)).toFixed(3));
            layer.style.setProperty('--hue', `${((fx.level * 4) % 360).toFixed(1)}deg`);
            layer.style.setProperty('--glow', (1 + 0.6 * intensity).toFixed(3));
        }

        // 中心から外へ流れる光の筋（ワープの表現）
        if (ctx) {
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);
            const count = reduceMotion || current === 'plain' ? 0 : Math.floor(MAX_STREAKS * intensity);
            const maxR = Math.hypot(w, h) / 2;
            const hue = (BASE_HUE[current] || 200) + fx.level * 4;
            while (fx.streaks.length < count) fx.streaks.push({ angle: Math.random() * Math.PI * 2, r: Math.random() * maxR });
            fx.streaks.length = count;
            ctx.lineCap = 'round';
            for (const s of fx.streaks) {
                const depth = s.r / maxR; // 外側ほど速く、長く、明るい
                s.r += (40 + 900 * intensity) * (0.25 + depth * 1.75) * dt;
                if (s.r > maxR) { s.r = Math.random() * 40; s.angle = Math.random() * Math.PI * 2; continue; }
                const len = 6 + 120 * intensity * depth;
                const cos = Math.cos(s.angle);
                const sin = Math.sin(s.angle);
                ctx.strokeStyle = `hsla(${hue % 360}, 100%, 72%, ${(0.15 + 0.7 * depth).toFixed(3)})`;
                ctx.lineWidth = 1 + 2 * depth;
                ctx.beginPath();
                ctx.moveTo(w / 2 + cos * s.r, h / 2 + sin * s.r);
                ctx.lineTo(w / 2 + cos * (s.r + len), h / 2 + sin * (s.r + len));
                ctx.stroke();
            }
        }
        fx.frame = requestAnimationFrame(draw);
    }

    function run() {
        if (fx.running) return;
        fx.running = true;
        fx.last = performance.now();
        fx.frame = requestAnimationFrame(draw);
    }

    function halt() {
        fx.running = false;
        cancelAnimationFrame(fx.frame);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    window.CodtecBg = {
        start() {
            this.stop();
            fx.active = true;
            fx.paused = false;
            if (current !== 'plain') run();
        },
        setLevel(words) {
            fx.target = words;
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
            fx.target = 0;
            fx.level = 0;
            fx.ox = 0;
            fx.oy = 0;
            fx.streaks = [];
            resetLayer();
        },
    };
})();
