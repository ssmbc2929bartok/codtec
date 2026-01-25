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
let currentTargetWord = "";

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

    do {
        target = pool[Math.floor(Math.random() * pool.length)];
    } while (target === lastWord && pool.length > 1);

    lastWord = target;
    currentTargetWord = target;
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
    // 1. 強制終了 (Ctrl+C) の判定
    // カウントダウン中、またはプレイ中のどちらでも中断できるようにします
    if (isPlaying || countdownInterval) {
        if (e.ctrlKey && e.key.toLowerCase() === 'c') {
            e.preventDefault(); // ブラウザのコピー動作を防止
            if (confirm('MISSION ABORTED. 中断しますか？')) {
                abortGame();
            }
            return;
        }
    }

    // 2. ゲーム中ではない時のメニュー操作
    if (!isPlaying && !countdownInterval) {
        if (e.key === '1') {
            const btn = document.querySelector('[data-mode="time-trial"]');
            if (btn) btn.click();
        }
        if (e.key === '2') {
            const btn = document.querySelector('[data-mode="score-attack"]');
            if (btn) btn.click();
        }
        if (e.key === 'Enter' && !startBtn.disabled) {
            startGame();
        }
        return;
    }

    // 3. タイピング判定（ゲーム中のみ）
    if (!isPlaying) return;
    if (e.key.length !== 1) return; // 修飾キーなどは無視

    const spans = wordDisplay.querySelectorAll('span');
    const targetChar = currentTargetWord[charIdx];

    if (e.key === targetChar) {
        // 正解時：従来どおりの処理
        totalTyped++;
        spans[charIdx].classList.remove('miss');
        spans[charIdx].classList.remove('current');
        spans[charIdx].classList.add('cleared');
        charIdx++;

        if (charIdx < currentTargetWord.length) {
            spans[charIdx].classList.add('current');
        } else {
            wordIdx++;
            if (currentMode === 'time-trial' && wordIdx >= 10) {
                finishGame();
            } else {
                setNextWord();
            }
        }
    }
    // 【追加】スペースがない場所でスペースを押した場合は「無視」する
    else if (e.key === ' ' && targetChar !== ' ') {
        return;
    }
    else if (!['Shift', 'Control', 'Alt', 'CapsLock', 'Tab'].includes(e.key)) {
        // 不正解時：スペースが必要な場所で打たなかった場合などはここに来る
        spans[charIdx].classList.add('miss');
        missCount++;
    }
});

//言語追加時はlangNamesも追加すること
const langNames = { 'cpp': 'C++', 'js': 'JavaScript', 'python': 'Python' };
const displayName = langNames[selectedLang] || selectedLang;
function finishGame() {
    isPlaying = false;
    clearInterval(timerInterval);

    const endTime = performance.now();
    const finalTime = (endTime - startTime) / 1000;

    const kpm = finalTime > 0 ? ((totalTyped / finalTime) * 60).toFixed(1) : 0;
    const accuracy = totalTyped + missCount > 0
        ? ((totalTyped / (totalTyped + missCount)) * 100).toFixed(1)
        : 0;

    // --- ハイスコアの処理 ---
    const scoreKey = `best_${selectedLang}_${currentMode}`;
    const savedBest = localStorage.getItem(scoreKey);
    let isNewRecord = false;

    if (currentMode === 'time-trial') {
        if (!savedBest || finalTime < parseFloat(savedBest)) {
            localStorage.setItem(scoreKey, finalTime);
            isNewRecord = true;
        }
    } else {
        if (!savedBest || wordIdx > parseInt(savedBest)) {
            localStorage.setItem(scoreKey, wordIdx);
            isNewRecord = true;
        }
    }

    const bestScoreDisplay = isNewRecord ? "NEW RECORD!" : `BEST: ${savedBest || '-'}`;
    // ------------------------

    const scoreResult = currentMode === 'time-trial' ? `${finalTime.toFixed(2)}s` : `${wordIdx} WORDS`;

    const feedbackUrl = "https://docs.google.com/forms/d/e/https://forms.gle/2Ex9pZE9cnRG2DBB9/viewform";

    const shareText = `codtec (${displayName}) (${currentMode}) の結果

        SCORE: ${scoreResult}
        SPEED: ${kpm} KPM
        ACCURACY: ${accuracy}%
        MISSES: ${missCount}`;

    const xLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent('https://ssmbar.com/codtec/')}&hashtags=codtec`;


    wordDisplay.innerHTML = `
        <div class="result-container" style="text-align: center;">
            <div style="font-size: 1.2rem; color: #aaa; letter-spacing: 2px;">MISSION COMPLETE</div>
            <div style="font-size: 2.5rem; color: ${currentMode === 'time-trial' ? '#ffd700' : '#00ffcc'}; margin-bottom: 5px;">${scoreResult}</div>
            <div style="font-size: 1rem; color: #ff00ff; margin-bottom: 10px; font-weight: bold;">${bestScoreDisplay}</div>

            <div style="font-size: 1.2rem; text-align: left; display: inline-block; border-top: 1px solid #444; padding: 15px 0;">
                <p>SPEED: ${kpm} KPM</p>
                <p>MISSES: ${missCount}</p>
                <p>ACCURACY: ${accuracy}%</p>
            </div>

            <div style="margin-top: 15px; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
                <a href="${xLink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #000; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold; font-size: 0.9rem; border: 1px solid #444;">
                   X で結果をシェア
                </a>

                <a href="${feedbackUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #222; color: #00ffcc; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold; font-size: 0.9rem; border: 1px solid #00ffcc;">
                   フィードバックを送る
                </a>
            </div>

            <div style="margin-top: 25px; font-size: 1rem; color: #888; animation: blink 1s infinite;">Press Enter to Retry</div>
        </div>
    `;

    const restartHandler = (e) => {
        if (e.key === 'Enter') {
            window.removeEventListener('keydown', restartHandler);
            location.reload();
        }
    };
    window.addEventListener('keydown', restartHandler);
}
