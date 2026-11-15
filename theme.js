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
            button.blur(); // プレイ中のキー入力でボタンが反応しないようにする
        });
    }

    apply();
})();
