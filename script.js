// script.js
// ゲーム本体。問題データは data/ 以下にあり、ここでは扱い方だけを決める。
(function () {
    'use strict';

    const TRIAL_WORDS = 10;
    const COUNTDOWN_STEP_MS = 800;
    const GAME_OVER_MS = 1400; // ミスの上限で終わったあと、TERMINATED を見せておく時間

    const SITE_URL = 'https://ssmbc2929bartok.github.io/codtec/';
    const PORTAL_URL = 'https://ssmbar.com/';
    const FEEDBACK_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfiswxbXdiDrfv-ioF_M2Tyt3Vjkeo6WETMfemG2dpUdL4AQA/viewform';

    // モードの定義。どのモードも、次の 4 つのルールの組み合わせで動く（0 や省略は「なし」）。
    //   words   : この問題数を打ち切ったら終了
    //   seconds : 持ち時間（秒）。なくなったら終了
    //   bonus   : 1 問クリアするごとに持ち時間へ足す秒数
    //   lives   : ミスがこの回数に達したら終了
    // score は記録の種類（'time' は短いほど良い時間、'words' は多いほど良い問題数、'none' は記録なし）。
    // color はメニューの枠線と結果のスコアに使う色。
    const MODES = [
        { id: 'time-trial', label: `${TRIAL_WORDS} WORDS TRIAL`, desc: `${TRIAL_WORDS} 問を打ち切るまでの速さを競う`, rules: { words: TRIAL_WORDS }, score: 'time', color: '#ffd700' },
        { id: 'score-attack', label: '30s SCORE ATTACK', desc: '30 秒間で何問打てるかを競う', rules: { seconds: 30 }, score: 'words', color: '#00ffcc' },
        { id: 'score-attack-60', label: '60s SCORE ATTACK', desc: '60 秒間で何問打てるかを競う', rules: { seconds: 60 }, score: 'words', color: '#ff7ad9' },
        { id: 'score-attack-120', label: '120s SCORE ATTACK', desc: '120 秒間で何問打てるかを競う', rules: { seconds: 120 }, score: 'words', color: '#9d8cff' },
        { id: 'marathon', label: 'MARATHON', desc: '持ち時間 30 秒で開始。1 問クリアするごとに 10 秒増える。何問続けられるかを競う', rules: { seconds: 30, bonus: 10 }, score: 'words', color: '#ffa94d' },
        { id: 'sudden-death', label: 'SUDDEN DEATH', desc: '1 回でもミスしたら終了。何問続けられるかを競う', rules: { lives: 1 }, score: 'words', color: '#ff5555' },
        { id: 'custom', label: 'CUSTOM', desc: 'ルールを自分で決めて遊ぶ。記録は保存されない', rules: null, score: 'none', color: '#c9d1d9' },
    ];

    // CUSTOM モードの初期設定と、各項目の上限
    const CUSTOM_DEFAULT = { words: 0, seconds: 60, bonus: 5, lives: 3 };
    const CUSTOM_MAX = { words: 999, seconds: 3600, bonus: 60, lives: 99 };

    // ルールを { words, seconds, bonus, lives } の整数にそろえる
    function normalizeRules(raw) {
        const rules = {};
        Object.keys(CUSTOM_MAX).forEach(key => {
            const n = Math.floor(Number(raw && raw[key]));
            rules[key] = Number.isFinite(n) ? Math.min(Math.max(n, 0), CUSTOM_MAX[key]) : 0;
        });
        if (!rules.seconds) rules.bonus = 0; // 持ち時間がなければ追加もない
        // 終わる条件が 1 つもないと終われないので、10 問で終わるようにする
        if (!rules.words && !rules.seconds && !rules.lives) rules.words = TRIAL_WORDS;
        return rules;
    }

    // ルールを短い英語の説明にする（結果画面とシェア文面で使う）
    function ruleSummary(rules) {
        const parts = [];
        if (rules.words) parts.push(`${rules.words} words`);
        if (rules.seconds) parts.push(`${rules.seconds}s`);
        if (rules.bonus) parts.push(`+${rules.bonus}s/word`);
        if (rules.lives) parts.push(`${rules.lives} miss limit`);
        return parts.join(', ');
    }

    const $ = id => document.getElementById(id);
    const menuScreen = $('menu-screen');
    const gameScreen = $('game-screen');
    const resultScreen = $('result-screen');
    const wordDisplay = $('word-display');
    const noteDisplay = $('note-display');
    const infoDisplay = $('game-info');
    const timerDisplay = $('timer-display');
    const startBtn = $('start-btn');
    const pauseOverlay = $('pause-overlay');
    const menuMessage = $('menu-message');
    const courseTag = $('course-tag');
    const customPanel = $('custom-panel');

    // phase: 'loading' | 'menu' | 'countdown' | 'playing' | 'paused' | 'ending' | 'result'
    let phase = 'loading';
    let selection = { lang: 'cpp', course: 'all', mode: 'time-trial', custom: { ...CUSTOM_DEFAULT } };
    let game = null;
    let timerInterval = null;
    let countdownTimeout = null;

    // --- 保存（localStorage が使えない環境でも動くようにする） ---

    const store = {
        get(key) {
            try { return localStorage.getItem(key); } catch (e) { return null; }
        },
        set(key, value) {
            try { localStorage.setItem(key, value); } catch (e) { /* 保存できなくても続行 */ }
        },
    };

    // v1 の記録をそのまま引き継げるよう、全コースのときは従来と同じキーを使う
    function bestKey(sel) {
        return sel.course === 'all'
            ? `best_${sel.lang}_${sel.mode}`
            : `best_${sel.lang}_${sel.course}_${sel.mode}`;
    }

    function readBest(sel) {
        if (getMode(sel.mode).score === 'none') return null; // CUSTOM は記録を保存しない
        const raw = store.get(bestKey(sel));
        const value = raw === null ? NaN : parseFloat(raw);
        return Number.isFinite(value) ? value : null;
    }

    function formatScore(mode, value) {
        return mode.score === 'time' ? `${value.toFixed(2)}s` : `${value} WORDS`;
    }

    function getMode(id) {
        return MODES.find(m => m.id === id);
    }

    // 言語横断を必ず使うモード（問題切れを防ぐため、全言語から出題する）
    const MIX_ONLY_MODES = ['sudden-death'];

    // 実際に出題に使う言語。言語横断が必須のモードでは、選んだ言語にかかわらず全言語になる
    function activeLang(sel = selection) {
        return MIX_ONLY_MODES.includes(sel.mode) ? Codtec.MIX_ID : sel.lang;
    }

    const langName = id => Codtec.get(id).name;
    const courseLabel = id => (id === 'all' ? 'ALL' : Codtec.COURSES.find(c => c.id === id).label);

    // --- 画面の切り替え ---

    function show(screen) {
        menuScreen.hidden = screen !== 'menu';
        gameScreen.hidden = screen !== 'game';
        resultScreen.hidden = screen !== 'result';
    }

    // --- メニュー ---

    function makeChip(text, count, active, onClick, course) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chip' + (active ? ' active' : '');
        btn.textContent = text;
        if (course) btn.dataset.course = course; // コースの色を付ける
        if (count !== null) {
            const small = document.createElement('small');
            small.textContent = count;
            btn.appendChild(small);
        }
        btn.addEventListener('click', onClick);
        return btn;
    }

    function availableCourses(lang) {
        return ['all', ...Codtec.COURSES.filter(c => lang.sets[c.id] && lang.sets[c.id].length > 0).map(c => c.id)];
    }

    function makeLangRow(labelText, langs) {
        const row = document.createElement('div');
        row.className = 'lang-group';
        const label = document.createElement('span');
        label.className = 'group-label';
        label.textContent = labelText;
        const chips = document.createElement('div');
        chips.className = 'group-chips';
        langs.forEach(l => {
            chips.appendChild(makeChip(l.name, null, l.id === activeLang(), () => select({ lang: l.id })));
        });
        row.append(label, chips);
        return row;
    }

    function renderMenu() {
        const lang = Codtec.get(activeLang());
        const mixForced = MIX_ONLY_MODES.includes(selection.mode);

        // 言語（先頭は、全言語から出題する言語横断）
        const langBox = $('lang-selector');
        langBox.textContent = '';
        langBox.classList.toggle('lang-locked', mixForced);
        langBox.appendChild(makeLangRow('CROSS-LANGUAGE', [Codtec.get(Codtec.MIX_ID)]));
        $('lang-note').textContent = mixForced
            ? `${getMode(selection.mode).label} は、問題切れを防ぐために全言語から出題します`
            : '';
        Codtec.GROUPS.forEach(group => {
            const members = Codtec.languages.filter(l => l.group === group.id);
            if (members.length === 0) return;
            langBox.appendChild(makeLangRow(group.label, members));
        });
        const totalWords = Codtec.languages.reduce((n, l) => n + l.total, 0);
        $('lang-count').textContent = `(${Codtec.languages.length} 言語 / ${totalWords} 問)`;

        // コース
        const courseBox = $('course-selector');
        courseBox.textContent = '';
        availableCourses(lang).forEach(id => {
            const count = id === 'all' ? lang.total : lang.sets[id].length;
            courseBox.appendChild(makeChip(courseLabel(id), count, id === selection.course, () => select({ course: id }), id === 'all' ? null : id));
        });
        const course = Codtec.COURSES.find(c => c.id === selection.course);
        $('course-desc').textContent = course ? course.desc : 'すべてのコースからまとめて出題';

        // モード
        const modeBox = $('mode-selector');
        modeBox.textContent = '';
        MODES.forEach((m, i) => {
            const chip = makeChip(`${i + 1}. ${m.label}`, null, m.id === selection.mode, () => select({ mode: m.id }), 'mode');
            chip.style.setProperty('--course', m.color);
            modeBox.appendChild(chip);
        });
        const mode = getMode(selection.mode);
        $('mode-desc').textContent = mode.desc;

        // CUSTOM のときだけルールの入力欄を出す
        const isCustom = mode.id === 'custom';
        customPanel.hidden = !isCustom;
        if (isCustom) {
            Object.keys(CUSTOM_MAX).forEach(key => {
                const input = $(`custom-${key}`);
                if (document.activeElement !== input) input.value = selection.custom[key];
            });
            $('custom-summary').textContent = `RULE: ${ruleSummary(normalizeRules(selection.custom))}`;
        }

        const best = readBest({ ...selection, lang: activeLang() });
        if (isCustom) $('best-display').textContent = 'BEST: N/A';
        else $('best-display').textContent = best === null ? 'BEST: ---' : `BEST: ${formatScore(mode, best)}`;
    }

    // CUSTOM の入力欄が変わったら、設定を保存して説明を更新する
    function onCustomInput() {
        const custom = {};
        Object.keys(CUSTOM_MAX).forEach(key => {
            const n = Math.floor(Number($(`custom-${key}`).value));
            custom[key] = Number.isFinite(n) ? Math.min(Math.max(n, 0), CUSTOM_MAX[key]) : 0;
        });
        selection.custom = custom;
        store.set('codtec_selection', JSON.stringify(selection));
        $('custom-summary').textContent = `RULE: ${ruleSummary(normalizeRules(custom))}`;
    }

    function select(change) {
        selection = { ...selection, ...change };
        const lang = Codtec.get(activeLang());
        if (!availableCourses(lang).includes(selection.course)) selection.course = 'all';
        store.set('codtec_selection', JSON.stringify(selection));
        menuMessage.textContent = '';
        renderMenu();
    }

    function step(list, current, delta) {
        const i = list.indexOf(current);
        return list[(i + delta + list.length) % list.length];
    }

    function goToMenu(message) {
        stopTimers();
        game = null;
        phase = 'menu';
        pauseOverlay.hidden = true;
        renderMenu();
        menuMessage.textContent = message || '';
        show('menu');
    }

    // --- ゲームの進行 ---

    function stopTimers() {
        clearInterval(timerInterval);
        clearTimeout(countdownTimeout);
        timerInterval = null;
        countdownTimeout = null;
    }

    function shuffle(items) {
        const a = items.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function startGame() {
        const pool = Codtec.getPool(activeLang(), selection.course);
        if (pool.length === 0) return;
        if (document.activeElement) document.activeElement.blur();

        stopTimers();
        game = {
            sel: { ...selection, lang: activeLang() }, // 記録と表示には、実際に出題した言語を使う
            mixed: activeLang() === Codtec.MIX_ID,
            mode: getMode(selection.mode),
            rules: normalizeRules(selection.mode === 'custom' ? selection.custom : getMode(selection.mode).rules),
            dead: false,     // ミスの上限で終わったか
            pool,
            bag: [],
            target: null,
            spans: [],
            wordIdx: 0,
            charIdx: 0,
            missCount: 0,
            wordMiss: 0,     // いまの問題でのミス回数
            history: [],     // 振り返り用: { item, misses, done }
            totalTyped: 0,
            elapsedMs: 0,    // 一時停止までに経過した時間
            segmentStart: 0, // 再開した時刻
        };
        pauseOverlay.hidden = true;
        noteDisplay.textContent = '';
        noteDisplay.className = '';
        infoDisplay.textContent = `${Codtec.get(game.sel.lang).name} / ${courseLabel(game.sel.course)}`;
        show('game');
        runCountdown(3);
    }

    function runCountdown(count) {
        phase = 'countdown';
        wordDisplay.className = 'countdown';
        wordDisplay.removeAttribute('data-size');
        wordDisplay.removeAttribute('data-course');
        courseTag.textContent = '';
        wordDisplay.textContent = count > 0 ? String(count) : 'GO!';
        timerDisplay.className = '';
        timerDisplay.textContent = 'READY...';
        countdownTimeout = setTimeout(() => {
            if (count > 0) runCountdown(count - 1);
            else beginPlay();
        }, COUNTDOWN_STEP_MS);
    }

    function beginPlay() {
        phase = 'playing';
        wordDisplay.className = '';
        setNextWord();
        game.segmentStart = performance.now();
        timerInterval = setInterval(updateTimer, 30);
        updateTimer();
    }

    function elapsedSeconds() {
        const running = phase === 'playing' ? performance.now() - game.segmentStart : 0;
        return (game.elapsedMs + running) / 1000;
    }

    // 同じ問題が続かないよう、山札を切って上から順に出す
    function drawWord() {
        if (game.bag.length === 0) {
            game.bag = shuffle(game.pool);
            const last = game.bag[game.bag.length - 1];
            if (game.target && last.text === game.target.text && game.bag.length > 1) {
                [game.bag[0], game.bag[game.bag.length - 1]] = [last, game.bag[0]];
            }
        }
        return game.bag.pop();
    }

    function sizeFor(length) {
        if (length <= 12) return 'l';
        if (length <= 20) return 'm';
        if (length <= 30) return 's';
        if (length <= 42) return 'xs';
        return 'xxs';
    }

    function setNextWord() {
        game.target = drawWord();
        game.charIdx = 0;
        game.wordMiss = 0;
        updateProgress();

        // コースごとに文字色を変える
        wordDisplay.dataset.course = game.target.course;
        courseTag.dataset.course = game.target.course;
        courseTag.textContent = game.mixed
            ? `${langName(game.target.lang)} / ${courseLabel(game.target.course)}`
            : courseLabel(game.target.course);

        wordDisplay.textContent = '';
        wordDisplay.dataset.size = sizeFor(game.target.text.length);
        game.spans = Array.from(game.target.text, (ch, i) => {
            const span = document.createElement('span');
            span.textContent = ch;
            if (i === 0) span.className = 'current';
            wordDisplay.appendChild(span);
            return span;
        });
        noteDisplay.className = '';
        noteDisplay.textContent = game.target.note ? `# ${game.target.note}` : '';
    }

    function updateProgress() {
        const { rules } = game;
        const parts = [Codtec.get(game.sel.lang).name];
        parts.push(rules.words
            ? `PROGRESS: ${Math.min(game.wordIdx + 1, rules.words)} / ${rules.words}`
            : `WORDS CLEARED: ${game.wordIdx}`);
        if (rules.lives > 1) parts.push(`LIVES: ${Math.max(0, rules.lives - game.missCount)}`);
        infoDisplay.textContent = parts.join(' | ');
    }

    // いまの持ち時間（秒）。1 問クリアするごとに bonus 秒ずつ増える
    function timeAllowed() {
        return game.rules.seconds + game.rules.bonus * game.wordIdx;
    }

    function updateTimer() {
        const elapsed = elapsedSeconds();
        if (game.rules.seconds) {
            const remaining = Math.max(0, timeAllowed() - elapsed);
            timerDisplay.textContent = `REMAINING: ${remaining.toFixed(2)}s`;
            if (remaining <= 0 && phase === 'playing') finishGame();
        } else {
            timerDisplay.textContent = `TIME: ${elapsed.toFixed(2)}s`;
        }
    }

    // --- 一時停止 ---

    function pauseGame() {
        if (phase !== 'playing') return;
        game.elapsedMs += performance.now() - game.segmentStart;
        phase = 'paused';
        clearInterval(timerInterval);
        timerInterval = null;
        updateTimer();
        pauseOverlay.hidden = false; // 問題文はオーバーレイで隠れる
    }

    function resumeGame() {
        if (phase !== 'paused') return;
        pauseOverlay.hidden = true;
        phase = 'playing';
        game.segmentStart = performance.now();
        timerInterval = setInterval(updateTimer, 30);
    }

    function abortGame() {
        goToMenu('^C  MISSION ABORTED');
    }

    // --- 入力 ---

    function handleTyping(e) {
        // 日本語入力がオンだと文字が届かないので知らせる
        if (e.isComposing || e.key === 'Process' || e.keyCode === 229) {
            noteDisplay.className = 'warn';
            noteDisplay.textContent = '日本語入力（IME）をオフにしてください';
            return;
        }
        if (e.key.length !== 1) return;
        const altGraph = e.getModifierState && e.getModifierState('AltGraph');
        if ((e.ctrlKey || e.metaKey || e.altKey) && !altGraph) return;

        e.preventDefault(); // スペースでのスクロールやクイック検索を防ぐ

        const target = game.target.text;
        const span = game.spans[game.charIdx];

        if (e.key === target[game.charIdx]) {
            game.totalTyped++;
            span.className = 'cleared';
            game.charIdx++;

            if (game.charIdx < target.length) {
                game.spans[game.charIdx].className = 'current';
                return;
            }
            game.history.push({ item: game.target, misses: game.wordMiss, done: true });
            game.wordIdx++;
            if (game.rules.bonus) flashBonus();
            if (game.rules.words && game.wordIdx >= game.rules.words) finishGame();
            else setNextWord();
            return;
        }

        // スペースが不要な場所でのスペースはミスに数えない
        if (e.key === ' ') return;

        game.missCount++;
        game.wordMiss++;
        span.className = 'current';
        void span.offsetWidth; // アニメーションをやり直すための再描画
        span.className = 'current miss';
        if (game.rules.lives && game.missCount >= game.rules.lives) showGameOver();
        else updateProgress();
    }

    // 持ち時間が増えたことを、タイマーの色で一瞬知らせる
    function flashBonus() {
        timerDisplay.className = 'bonus';
        setTimeout(() => {
            if (timerDisplay.className === 'bonus') timerDisplay.className = '';
        }, 400);
    }

    // ミスの上限に達したとき: ミスした文字を見せたまま TERMINATED を出し、少し置いてから結果へ進む
    function showGameOver() {
        game.elapsedMs += performance.now() - game.segmentStart;
        game.dead = true;
        updateProgress();
        phase = 'ending';
        clearInterval(timerInterval);
        timerInterval = null;
        timerDisplay.className = 'game-over';
        timerDisplay.textContent = 'TERMINATED';
        noteDisplay.className = 'warn';
        noteDisplay.textContent = 'fatal: mistyped key. process terminated.';
        countdownTimeout = setTimeout(finishGame, GAME_OVER_MS);
    }

    window.addEventListener('keydown', e => {
        const key = e.key.toLowerCase();

        // Ctrl+C: カウントダウン中・プレイ中・一時停止中のどこからでも即座に中断
        if (e.ctrlKey && key === 'c' && ['countdown', 'playing', 'paused', 'ending'].includes(phase)) {
            e.preventDefault();
            abortGame();
            return;
        }

        switch (phase) {
            case 'menu':
                handleMenuKey(e);
                break;
            case 'countdown':
                if (e.key === 'Escape') goToMenu();
                break;
            case 'playing':
                if (e.key === 'Escape') pauseGame();
                else handleTyping(e);
                break;
            case 'paused':
                if (e.ctrlKey || e.metaKey || e.altKey) break;
                if (e.key === 'Escape' || e.key === 'Enter') { e.preventDefault(); resumeGame(); }
                else if (key === 'r') startGame();
                else if (key === 'q') goToMenu();
                break;
            case 'result':
                if (e.key === 'Enter') { e.preventDefault(); startGame(); }
                else if (e.key === 'Escape') goToMenu();
                break;
        }
    });

    function handleMenuKey(e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return;

        // CUSTOM の入力欄にいる間は、数字や矢印を入力欄に任せる
        if (e.target instanceof HTMLInputElement) {
            if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); startGame(); }
            else if (e.key === 'Escape') e.target.blur();
            return;
        }

        const lang = Codtec.get(activeLang());
        const langIds = [Codtec.MIX_ID, ...Codtec.GROUPS.flatMap(g => Codtec.languages.filter(l => l.group === g.id).map(l => l.id))];

        if (e.key === 'Enter') { e.preventDefault(); startGame(); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); select({ lang: step(langIds, selection.lang, 1) }); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); select({ lang: step(langIds, selection.lang, -1) }); }
        else if (e.key === 'ArrowDown') { e.preventDefault(); select({ course: step(availableCourses(lang), selection.course, 1) }); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); select({ course: step(availableCourses(lang), selection.course, -1) }); }
        else if (/^[1-9]$/.test(e.key) && MODES[Number(e.key) - 1]) select({ mode: MODES[Number(e.key) - 1].id });
    }

    // 別のタブやウィンドウに移ったら自動で一時停止する
    window.addEventListener('blur', pauseGame);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) pauseGame();
    });

    $('pause-btn').addEventListener('click', e => {
        e.currentTarget.blur();
        pauseGame();
    });
    pauseOverlay.addEventListener('click', e => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        btn.blur();
        if (btn.dataset.action === 'resume') resumeGame();
        else if (btn.dataset.action === 'restart') startGame();
        else goToMenu();
    });
    startBtn.addEventListener('click', startGame);
    customPanel.addEventListener('input', onCustomInput);

    // --- 結果 ---

    const X_LOGO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>';

    function finishGame() {
        const g = game;
        let finalTime = elapsedSeconds();
        if (g.rules.seconds) finalTime = Math.min(finalTime, timeAllowed());
        phase = 'result';
        stopTimers();

        // 打ちかけで終わった問題も振り返りに入れる
        const unfinished = g.target && g.charIdx < g.target.text.length && (g.charIdx > 0 || g.wordMiss > 0);
        if (unfinished) g.history.push({ item: g.target, misses: g.wordMiss, done: false });

        const kpm = finalTime > 0 ? ((g.totalTyped / finalTime) * 60).toFixed(1) : '0.0';
        const attempts = g.totalTyped + g.missCount;
        const accuracy = attempts > 0 ? ((g.totalTyped / attempts) * 100).toFixed(1) : '0.0';

        const score = g.mode.score === 'time' ? finalTime : g.wordIdx;
        const tracked = g.mode.score !== 'none';
        const scoreText = tracked
            ? formatScore(g.mode, score)
            : `${g.wordIdx} WORDS / ${finalTime.toFixed(2)}s`;

        // ハイスコア（CUSTOM はルールが毎回違うので保存しない）
        let isNewRecord = false;
        let bestText = `RULE: ${ruleSummary(g.rules)}`;
        if (tracked) {
            const prevBest = readBest(g.sel);
            isNewRecord = prevBest === null || (g.mode.score === 'time' ? score < prevBest : score > prevBest);
            if (isNewRecord) store.set(bestKey(g.sel), String(score));
            bestText = isNewRecord
                ? (prevBest === null ? 'NEW RECORD!' : `NEW RECORD!  (前回のベスト: ${formatScore(g.mode, prevBest)})`)
                : `BEST: ${formatScore(g.mode, prevBest)}`;
        }
        const modeText = tracked ? g.mode.id : `custom (${ruleSummary(g.rules)})`;

        const langName = Codtec.get(g.sel.lang).name;
        const langText = g.sel.course === 'all' ? langName : `${langName} (${courseLabel(g.sel.course)})`;

        const shareText = `[CODTEC_REPORT]
>> LANG: ${langText} / MODE: ${modeText}
>> RESULT: ${scoreText}
>> KPM: ${kpm} / ACC: ${accuracy}%
>> ERR_LOG: ${g.missCount} cases detected.

${SITE_URL}`;
        const xLink = `https://x.com/intent/post?text=${encodeURIComponent(shareText)}&hashtags=codtec`;

        resultScreen.innerHTML = `
            <div class="result-title">${g.dead ? 'MISSION FAILED' : 'MISSION COMPLETE'}</div>
            <div class="result-context"></div>
            <div class="result-score" style="color: ${g.mode.color}">${scoreText}</div>
            <div class="result-best${isNewRecord ? ' new' : ''}"></div>

            <div class="result-stats">
                <div class="stat"><div class="stat-value">${kpm}</div><div class="stat-label">KPM</div></div>
                <div class="stat"><div class="stat-value">${accuracy}%</div><div class="stat-label">ACCURACY</div></div>
                <div class="stat"><div class="stat-value">${g.missCount}</div><div class="stat-label">MISSES</div></div>
            </div>

            <div class="result-actions">
                <button class="btn-gradient" type="button" data-action="retry">もう一度 <kbd>Enter</kbd></button>
                <button class="btn-gradient btn-secondary" type="button" data-action="menu">メニューへ <kbd>Esc</kbd></button>
            </div>

            <div class="review">
                <div class="review-title">REVIEW</div>
                <ol class="review-list"></ol>
            </div>

            <div class="result-links">
                <a class="share-x" href="${xLink}" target="_blank" rel="noopener noreferrer">${X_LOGO}<span>結果をシェア</span></a>
                <a class="btn-ghost" href="${FEEDBACK_URL}" target="_blank" rel="noopener noreferrer">報告を送信</a>
                <a class="btn-ghost" href="${PORTAL_URL}">ポータルに戻る</a>
            </div>
        `;
        resultScreen.querySelector('.result-context').textContent = `${langText} / ${g.mode.label}`;
        resultScreen.querySelector('.result-best').textContent = bestText;
        renderReview(g.history, g.mixed);
        show('result');
    }

    // プレイした問題を、コース・ミス回数・解説つきで並べる
    function renderReview(history, mixed) {
        const box = resultScreen.querySelector('.review');
        const list = box.querySelector('.review-list');
        if (history.length === 0) {
            box.hidden = true;
            return;
        }
        history.forEach(entry => {
            const li = document.createElement('li');
            li.dataset.course = entry.item.course;

            const head = document.createElement('div');
            head.className = 'review-head';
            const tag = document.createElement('span');
            tag.className = 'course-tag';
            tag.dataset.course = entry.item.course;
            tag.textContent = courseLabel(entry.item.course);
            const code = document.createElement('code');
            code.textContent = entry.item.text;
            head.append(tag, code);
            if (mixed) {
                const lang = document.createElement('span');
                lang.className = 'review-flag review-lang';
                lang.textContent = langName(entry.item.lang);
                head.appendChild(lang);
            }

            if (!entry.done) {
                const undone = document.createElement('span');
                undone.className = 'review-flag';
                undone.textContent = '途中まで';
                head.appendChild(undone);
            }
            if (entry.misses > 0) {
                const miss = document.createElement('span');
                miss.className = 'review-flag miss';
                miss.textContent = `MISS x${entry.misses}`;
                head.appendChild(miss);
            }
            li.appendChild(head);

            if (entry.item.note) {
                const note = document.createElement('p');
                note.className = 'review-note';
                note.textContent = entry.item.note;
                li.appendChild(note);
            }
            list.appendChild(li);
        });
    }

    resultScreen.addEventListener('click', e => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        if (btn.dataset.action === 'retry') startGame();
        else goToMenu();
    });

    // --- 起動：manifest に書かれた言語ファイルを順番に読み込む ---

    function loadLanguages(files, done) {
        let index = 0;
        (function next() {
            if (index >= files.length) return done();
            const name = files[index++];
            const script = document.createElement('script');
            script.src = `data/langs/${name}.js?v=${Codtec.VERSION}`;
            script.onload = next;
            script.onerror = () => {
                console.warn(`[codtec] data/langs/${name}.js を読み込めませんでした`);
                next();
            };
            document.head.appendChild(script);
        })();
    }

    function init() {
        $('version-label').textContent = `v${Codtec.VERSION}`;
        if (Codtec.languages.length === 0) {
            menuMessage.textContent = '問題データを読み込めませんでした';
            return;
        }
        try {
            const saved = JSON.parse(store.get('codtec_selection') || 'null');
            if (saved && typeof saved === 'object') selection = { ...selection, ...saved };
        } catch (e) { /* 壊れた保存データは無視する */ }
        selection.custom = { ...CUSTOM_DEFAULT, ...(selection.custom && typeof selection.custom === 'object' ? selection.custom : {}) };
        if (!Codtec.get(selection.lang)) selection.lang = Codtec.languages[0].id;
        if (!getMode(selection.mode)) selection.mode = MODES[0].id;
        if (!availableCourses(Codtec.get(activeLang())).includes(selection.course)) selection.course = 'all';

        startBtn.disabled = false;
        goToMenu();
    }

    loadLanguages(window.CODTEC_LANG_FILES || [], init);
})();
