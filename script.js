let selectedLang = 'cpp';
let selectedMode = '';
let currentMode = '';
let wordIdx = 0;
let charIdx = 0;
let isPlaying = false;
let startTime;
let timerInterval;
let countdownInterval; // 追加：宣言を忘れずに
let missCount = 0;
let totalTyped = 0;

const menuScreen = document.getElementById('menu-screen');
const gameScreen = document.getElementById('game-screen');
const wordDisplay = document.getElementById('word-display');
const infoDisplay = document.getElementById('game-info');
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');

// --- 選択イベント ---

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.lang-btn.active').classList.remove('active');
        btn.classList.add('active');
        selectedLang = btn.dataset.lang;
    });
});

document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedMode = btn.dataset.mode;
        startBtn.disabled = false;
    });
});

// --- ゲーム制御 ---

window.startGame = function() {
    if (!selectedMode) return;
    menuScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    runCountdown();
};

function runCountdown() {
    let count = 3;
    isPlaying = false;
    wordDisplay.innerHTML = `<div style="font-size: 4rem;">${count}</div>`;
    timerDisplay.innerText = "READY...";

    if (countdownInterval) clearInterval(countdownInterval); // 二重起動防止

    countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            wordDisplay.innerHTML = `<div style="font-size: 4rem;">${count}</div>`;
        } else if (count === 0) {
            wordDisplay.innerHTML = `<div style="font-size: 4rem;">GO!</div>`;
        } else {
            clearInterval(countdownInterval);
            countdownInterval = null; // リセット
            initGameLogic();
        }
    }, 1000);
}

function initGameLogic() {
    isPlaying = true;
    currentMode = selectedMode;
    wordIdx = 0;
    charIdx = 0;
    missCount = 0;
    totalTyped = 0;

    setNextWord();
    startTime = performance.now();
    timerInterval = setInterval(updateTimer, 10);
}


let lastWord = "";
function setNextWord() {
    const pool = WORD_DATA[selectedLang];
    let target;

    // 前と同じ単語にならないように抽選（プールが2件以上ある場合）
    do {
        target = pool[Math.floor(Math.random() * pool.length)];
    } while (target === lastWord && pool.length > 1);

    lastWord = target; // 今回の単語を保存
    charIdx = 0;

    // 進捗表示の更新
    if (currentMode === 'time-trial') {
        infoDisplay.innerText = `PROGRESS: ${wordIdx + 1} / 10`;
    } else {
        infoDisplay.innerText = `WORDS CLEARED: ${wordIdx}`;
    }

    // 画面表示の生成
    wordDisplay.innerHTML = target.split('').map((c, i) =>
        `<span class="${i === 0 ? 'current' : ''}">${c}</span>`
    ).join('');
}

function updateTimer() {
    const elapsed = (performance.now() - startTime) / 1000;
    if (currentMode === 'time-trial') {
        timerDisplay.innerText = `TIME: ${elapsed.toFixed(2)}s`;
    } else {
        const remaining = Math.max(0, 30 - elapsed);
        timerDisplay.innerText = `REMAINING: ${remaining.toFixed(2)}s`;
        if (remaining <= 0) finishGame();
    }
}

function abortGame() {
    isPlaying = false;
    clearInterval(timerInterval);
    if (countdownInterval) clearInterval(countdownInterval);

    gameScreen.style.display = 'none';
    menuScreen.style.display = 'block';
    wordIdx = 0;
    charIdx = 0;
}

// --- キー入力（修正：二重リスナーを解消） ---

window.addEventListener('keydown', (e) => {
    // 1. 中断とカウントダウンのチェック
    if (isPlaying || countdownInterval) {
        // e.ctrlKey が true かつ、e.key が 'c'（大文字小文字問わず）の場合
      if (e.ctrlKey && e.key.toLowerCase() === 'c') {
          // ブラウザの「コピー」動作を防ぐ
          e.preventDefault();

          if (confirm('MISSION ABORTED. 中断しますか？')) {
              abortGame();
          }
          return;
      }
    }

    // ゲーム中でない時のメニュー操作
    if (!isPlaying) {
        if (e.key === '1') document.querySelector('[data-mode="time-trial"]').click();
        if (e.key === '2') document.querySelector('[data-mode="score-attack"]').click();
        if (e.key === 'Enter' && !startBtn.disabled) startGame();
        return;
    }

    // タイピング判定
    if (e.key.length !== 1) return;

    const spans = wordDisplay.querySelectorAll('span');
    const currentWordText = Array.from(spans).map(s => s.innerText).join('');
    const targetChar = currentWordText[charIdx];

    if (e.key === targetChar) {
        totalTyped++;
        spans[charIdx].className = 'correct';
        charIdx++;
        if (charIdx < currentWordText.length) {
            spans[charIdx].className = 'current';
        } else {
            wordIdx++;
            if (currentMode === 'time-trial' && wordIdx >= 10) {
                finishGame();
            } else {
                setNextWord();
            }
        }
    } else {
        missCount++;
        spans[charIdx].classList.add('incorrect');
        setTimeout(() => spans[charIdx].classList.remove('incorrect'), 200);
    }
});

function finishGame() {
    isPlaying = false;
    clearInterval(timerInterval);

    const endTime = performance.now();
    const finalTime = (endTime - startTime) / 1000;

    // 共通の計算
    const kpm = finalTime > 0 ? ((totalTyped / finalTime) * 60).toFixed(1) : 0;
    const accuracy = totalTyped + missCount > 0
        ? ((totalTyped / (totalTyped + missCount)) * 100).toFixed(1)
        : 0;

    // --- シェア用メッセージの作成 ---
    const scoreResult = currentMode === 'time-trial'
        ? `TIME: ${finalTime.toFixed(2)}s`
        : `SCORE: ${wordIdx} WORDS`;

    const shareText = encodeURIComponent(
        `DevType [${currentMode}] をクリアしました！\n` +
        `結果: ${scoreResult}\n` +
        `速度: ${kpm} KPM / 正確率: ${accuracy}%\n`
    );
    const shareUrl = encodeURIComponent("https://ssmbar.com/codtec/");
    const xLink = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}&hashtags=DevType,ssmbar`;

    // モードごとのタイトルとメインスコアの出し分け
    let mainScoreHTML = "";
    let subStatsHTML = "";

    if (currentMode === 'time-trial') {
        mainScoreHTML = `<div style="font-size: 2.5rem; color: #ffd700; margin-bottom: 10px;">TIME: ${finalTime.toFixed(2)}s</div>`;
        subStatsHTML = `
            <p> SPEED: ${kpm} KPM</p>
            <p> MISSES: ${missCount}</p>
            <p> ACCURACY: ${accuracy}%</p>
        `;
    } else {
        mainScoreHTML = `<div style="font-size: 2.5rem; color: #00ffcc; margin-bottom: 10px;">${wordIdx} WORDS</div>`;
        subStatsHTML = `
            <p> SPEED: ${kpm} KPM</p>
            <p> MISSES: ${missCount}</p>
            <p> ACCURACY: ${accuracy}%</p>
            <p> TOTAL TIME: 30.00s</p>
        `;
    }

    // リザルト画面の描画
    wordDisplay.innerHTML = `
        <div class="result-container" style="text-align: center;">
            <div style="font-size: 1.2rem; color: #aaa; letter-spacing: 2px;">MISSION COMPLETE</div>
            ${mainScoreHTML}
            <div style="font-size: 1.2rem; text-align: left; display: inline-block; border-top: 1px solid #444; padding: 15px 0;">
                ${subStatsHTML}
            </div>

            <div style="margin-top: 15px;">
                <a href="${xLink}" target="_blank" rel="noopener noreferrer"
                   style="display: inline-block; background: #000; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold; font-size: 0.9rem; border: 1px solid #444;">
                   𝕏 で結果をシェア
                </a>
            </div>

            <div style="margin-top: 25px; font-size: 1rem; color: #888; animation: blink 1s infinite;">
                Press Enter to Retry
            </div>
        </div>
    `;

    // Enterキーでリロード（再挑戦）
    const restartHandler = (e) => {
        if (e.key === 'Enter') {
            window.removeEventListener('keydown', restartHandler);
            location.reload();
        }
    };
    window.addEventListener('keydown', restartHandler);
}
