// script.js
// ゲーム本体。問題データは data/ 以下にあり、ここでは扱い方だけを決める。
(function () {
    'use strict';

    const TRIAL_WORDS = 10;
    const COUNTDOWN_STEP_MS = 800;
    // ゲームが終わったとき、結果画面へ進む前に見せる表示（kind ごとの文面と、見せておく時間）
    const ENDINGS = {
        finish: { title: 'FINISH!', note: 'all tasks completed. exit code 0.', ms: 1100 },
        timeup: { title: 'TIME UP!', note: 'timeout: time limit exceeded.', ms: 1100 },
        dead: { title: 'TERMINATED', note: 'fatal: mistyped key. process terminated.', ms: 1400 },
    };

    const SITE_URL = 'https://ssmbc2929bartok.github.io/codtec/';
    const PORTAL_URL = 'https://ssmbar.com/';
    const FEEDBACK_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfiswxbXdiDrfv-ioF_M2Tyt3Vjkeo6WETMfemG2dpUdL4AQA/viewform';

    // モードの定義。どのモードも、次の 4 つのルールの組み合わせで動く（0 や省略は「なし」）。
    //   words   : この問題数を打ち切ったら終了
    //   seconds : 持ち時間（秒）。なくなったら終了
    //   bonus   : 1 問クリアするごとに持ち時間へ足す秒数
    //   penalty : 1 回ミスするごとに持ち時間から引く秒数（0.1 秒きざみ）
    //   penaltyCurve : クリアした問題数に応じて、1 回のミスで引く秒数を変える表（missPenalty を参照）
    //   lives   : ミスがこの回数に達したら終了
    // score は記録の種類（'time' は短いほど良い時間、'words' は多いほど良い問題数、'none' は記録なし）。
    // milestone を付けたモードでは、その問題数をクリアするごとに短い知らせを出す。
    // short は、メニューのボタンと X のシェア文面に書く短い名前。color はメニューの枠線と結果のスコアに使う色。
    // MARATHON のミスのペナルティ。start 問クリアしたら base 秒になり、
    // そのあとは every 問クリアするごとに増える（増える量は、何問目までかで steps から選ぶ）。
    //   10 問: 0.1 秒 → 20〜50 問: +0.1 秒ずつ → 60〜100 問: +0.2 秒ずつ → 110 問以降: +0.3 秒ずつ
    // max 秒より重くはならない（220 問で 5 秒に届く）。
    const MARATHON_PENALTY = {
        start: 10,
        base: 0.1,
        every: 10,
        max: 5,
        steps: [
            { until: 50, add: 0.1 },
            { until: 100, add: 0.2 },
            { until: Infinity, add: 0.3 },
        ],
    };

    const MODES = [
        { id: 'time-trial', label: `${TRIAL_WORDS} WORDS TRIAL`, short: '10W TRIAL', desc: `${TRIAL_WORDS} 問を打ち切るまでの速さを競う`, rules: { words: TRIAL_WORDS }, score: 'time', color: '#ffd700' },
        { id: 'score-attack', label: '30s SCORE ATTACK', short: '30s ATTACK', desc: '30 秒間で何問打てるかを競う', rules: { seconds: 30 }, score: 'words', color: '#00ffcc' },
        { id: 'score-attack-60', label: '60s SCORE ATTACK', short: '60s ATTACK', desc: '60 秒間で何問打てるかを競う', rules: { seconds: 60 }, score: 'words', color: '#ff7ad9' },
        { id: 'score-attack-120', label: '120s SCORE ATTACK', short: '120s ATTACK', desc: '120 秒間で何問打てるかを競う', rules: { seconds: 120 }, score: 'words', color: '#9d8cff' },
        { id: 'marathon', label: 'MARATHON', short: 'MARATHON', desc: '持ち時間 30 秒で開始。1 問クリアするごとに 10 秒増える。10 問目から、ミスすると時間が減り、10 問ごとに重くなる', rules: { seconds: 30, bonus: 10, penaltyCurve: MARATHON_PENALTY }, milestone: 10, score: 'words', color: '#ffa94d' },
        { id: 'sudden-death', label: 'SUDDEN DEATH', short: 'SUDDEN DEATH', desc: '1 回でもミスしたら終了。何問続けられるかを競う', rules: { lives: 1 }, score: 'words', color: '#ff5555' },
        { id: 'custom', label: 'CUSTOM', short: 'CUSTOM', desc: 'ルールを自分で決めて遊ぶ。記録は保存されない', rules: null, score: 'none', color: '#c9d1d9' },
    ];

    // CUSTOM モードの初期設定と、各項目の上限
    const CUSTOM_DEFAULT = { words: 0, seconds: 60, bonus: 5, penalty: 0, lives: 3 };
    const CUSTOM_MAX = { words: 999, seconds: 3600, bonus: 60, penalty: 10, lives: 99 };

    // ルールの値を 0 以上・上限以下の数にする。penalty だけは 0.1 秒きざみ、ほかは整数
    function clampRule(key, value) {
        const raw = Number(value);
        if (!Number.isFinite(raw)) return 0;
        const n = key === 'penalty' ? Math.round(raw * 10) / 10 : Math.floor(raw);
        return Math.min(Math.max(n, 0), CUSTOM_MAX[key]);
    }

    // ルールを { words, seconds, bonus, penalty, lives } の数にそろえる
    function normalizeRules(raw) {
        const rules = {};
        Object.keys(CUSTOM_MAX).forEach(key => {
            rules[key] = clampRule(key, raw && raw[key]);
        });
        if (!rules.seconds) { rules.bonus = 0; rules.penalty = 0; } // 持ち時間がなければ増減もない
        rules.penaltyCurve = (raw && raw.penaltyCurve) || null;
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
        if (rules.penalty) parts.push(`-${rules.penalty}s/miss`);
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
    const toast = $('toast');

    // phase: 'loading' | 'menu' | 'countdown' | 'playing' | 'paused' | 'ending' | 'result'
    let phase = 'loading';
    // 入力のしかた。editor では、開きの括弧や引用符を打つと、対応する閉じ側が自動で入る
    const INPUTS = [
        { id: 'normal', label: 'NORMAL', desc: '表示されたとおりに、すべての文字を自分で打つ' },
        { id: 'editor', label: 'EDITOR', desc: '( [ { " \' ` を打つと、対応する閉じ側が自動で入る。記録は NORMAL と別に保存する' },
    ];

    let selection = { lang: 'cpp', course: 'all', mode: 'time-trial', input: 'normal', custom: { ...CUSTOM_DEFAULT } };
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
    // エディタモードは打つキーが少ないので、記録を別に保存する
    function bestKey(sel) {
        const base = sel.course === 'all'
            ? `best_${sel.lang}_${sel.mode}`
            : `best_${sel.lang}_${sel.course}_${sel.mode}`;
        return sel.input === 'editor' ? `${base}_editor` : base;
    }

    function readBest(sel) {
        if (getMode(sel.mode).score === 'none') return null; // CUSTOM は記録を保存しない
        const raw = store.get(bestKey(sel));
        const value = raw === null ? NaN : parseFloat(raw);
        return Number.isFinite(value) ? value : null;
    }

    function formatScore(mode, value) {
        return mode.score === 'time' ? `${value.toFixed(2)}s` : wordsText(value);
    }

    // 「1 WORD」「2 WORDS」のように、数に合わせて書く
    function wordsText(count) {
        return `${count} ${count === 1 ? 'WORD' : 'WORDS'}`;
    }

    function getMode(id) {
        return MODES.find(m => m.id === id);
    }

    // 言語横断を必ず使うモード（問題切れを防ぐため、全言語・全コースから出題する）
    const MIX_ONLY_MODES = ['marathon'];

    // 実際に出題に使うコース。言語横断が必須のモードでは、選んだコースにかかわらず全コースになる
    function activeCourse(sel = selection) {
        return MIX_ONLY_MODES.includes(sel.mode) ? 'all' : sel.course;
    }

    // 「選んだ複数の言語から出題する」ことを表す、言語の id
    const PICK_ID = 'pick';

    // 実際に出題に使う言語の id。言語横断が必須のモードでは、選んだ言語にかかわらず全言語になる
    function activeLang(sel = selection) {
        return MIX_ONLY_MODES.includes(sel.mode) ? Codtec.MIX_ID : sel.lang;
    }

    // PICK LANGS で選ばれている言語の id（登録されている言語だけ、メニューと同じ並び順）
    function pickedIds(sel = selection) {
        const picked = Array.isArray(sel.picked) ? sel.picked : [];
        return Codtec.languages.map(l => l.id).filter(id => picked.includes(id));
    }

    // 実際に出題に使う言語（問題のまとまり）を返す
    function activeLangData(sel = selection) {
        const id = activeLang(sel);
        if (id !== PICK_ID) return Codtec.get(id);
        const ids = pickedIds(sel);
        return Codtec.combine(PICK_ID, `${ids.length} LANGS`, ids);
    }

    // 記録を保存するときの言語の名前。PICK LANGS は言語の組み合わせごとに分ける
    function recordLang(sel = selection) {
        const id = activeLang(sel);
        return id === PICK_ID ? `pick-${pickedIds(sel).join('+')}` : id;
    }

    const langName = id => Codtec.get(id).name;
    // コースの選択は 1 つの文字列で持つ。'all' か、コースの id を「+」でつないだもの（'basics' や 'basics+stdlib'）
    const courseIds = course => (course === 'all' ? [] : course.split('+'));
    const courseLabel = course => (course === 'all'
        ? 'ALL'
        : courseIds(course).map(id => Codtec.COURSES.find(c => c.id === id).label).join(' + '));

    // 選んだコースを、その言語にあるものだけにして並び順をそろえる。何も残らないときと全部選んだときは 'all'
    function normalizeCourse(lang, course) {
        const available = availableCourses(lang).filter(id => id !== 'all');
        const wanted = typeof course === 'string' ? courseIds(course) : [];
        const ids = available.filter(id => wanted.includes(id));
        return ids.length === 0 || ids.length === available.length ? 'all' : ids.join('+');
    }

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
            const picking = activeLang() === PICK_ID && Codtec.languages.includes(l);
            const chip = makeChip(l.name, null, l.id === activeLang(), () => (picking ? togglePick(l.id) : select({ lang: l.id })));
            if (picking && pickedIds().includes(l.id)) chip.classList.add('picked');
            chips.appendChild(chip);
        });
        row.append(label, chips);
        return row;
    }

    // PICK LANGS の間は、言語を押すたびに出題する言語へ入れたり外したりする（最後の 1 つは外せない）
    function togglePick(id) {
        const ids = pickedIds();
        const next = ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id];
        if (next.length === 0) {
            menuMessage.textContent = '少なくとも 1 つの言語を選んでください';
            return;
        }
        select({ picked: next });
    }

    // PICK COURSES の間は、コースを押すたびに出題するコースへ入れたり外したりする（最後の 1 つは外せない）
    // 全部選ぶと ALL になり、PICK COURSES は終わる
    function toggleCourse(id) {
        const ids = courseIds(selection.course);
        const next = ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id];
        if (next.length === 0) {
            menuMessage.textContent = '少なくとも 1 つのコースを選んでください';
            return;
        }
        select({ course: next.join('+') });
    }

    // PICK COURSES を押すと複数選択に入る。もう一度押すと、1 コースの選択に戻る
    function toggleCoursePick() {
        const ids = courseIds(selection.course);
        if (selection.coursePick) select({ coursePick: false, course: ids[0] || 'all' });
        // ALL から入ったときは、先頭のコースから始める
        else select({ coursePick: true, course: ids[0] || availableCourses(activeLangData())[1] || 'all' });
    }

    function renderMenu() {
        const lang = activeLangData();
        const mixForced = MIX_ONLY_MODES.includes(selection.mode);
        const picking = activeLang() === PICK_ID;

        // 言語（先頭は、全言語から出題する言語横断）
        const langBox = $('lang-selector');
        langBox.textContent = '';
        langBox.classList.toggle('lang-locked', mixForced);
        langBox.appendChild(makeLangRow('CROSS-LANGUAGE', [Codtec.get(Codtec.MIX_ID), { id: PICK_ID, name: 'PICK LANGS' }]));
        if (mixForced) $('lang-note').textContent = `${getMode(selection.mode).label} は、問題切れを防ぐために全言語・全コースから出題します`;
        else if (picking) $('lang-note').textContent = `${pickedIds().length} 言語を選択中。言語を押すと、出題する言語に入れたり外したりできます`;
        else $('lang-note').textContent = '';
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
        courseBox.classList.toggle('lang-locked', mixForced);
        const chosen = courseIds(activeCourse());
        const pickingCourse = !mixForced && selection.coursePick;
        availableCourses(lang).forEach(id => {
            const count = id === 'all' ? lang.total : lang.sets[id].length;
            const active = id === 'all' ? chosen.length === 0 : chosen.includes(id);
            const onClick = id !== 'all' && selection.coursePick ? () => toggleCourse(id) : () => select({ course: id });
            courseBox.appendChild(makeChip(courseLabel(id), count, active, onClick, id === 'all' ? null : id));
            // ALL の次に、複数選択に入るための PICK COURSES を置く
            if (id === 'all') courseBox.appendChild(makeChip('PICK COURSES', null, pickingCourse, toggleCoursePick));
        });
        if (pickingCourse) $('course-desc').textContent = `${chosen.length} コースを選択中（${Codtec.getPool(lang, activeCourse()).length} 問）。コースを押すと、出題するコースに入れたり外したりできます`;
        else if (chosen.length === 0) $('course-desc').textContent = 'すべてのコースからまとめて出題';
        else $('course-desc').textContent = Codtec.COURSES.find(c => c.id === chosen[0]).desc;

        // モード
        const modeBox = $('mode-selector');
        modeBox.textContent = '';
        MODES.forEach((m, i) => {
            // 7 つを 1 行に収めるため、ボタンには短い名前を書く（正式な名前は下の説明と結果画面に出る）
            const chip = makeChip(`${i + 1}. ${m.short}`, null, m.id === selection.mode, () => select({ mode: m.id }), 'mode');
            chip.title = m.label;
            chip.style.setProperty('--course', m.color);
            modeBox.appendChild(chip);
        });
        const mode = getMode(selection.mode);
        $('mode-desc').textContent = `${mode.label}: ${mode.desc}`;

        // 入力のしかた
        const inputBox = $('input-selector');
        inputBox.textContent = '';
        INPUTS.forEach(input => {
            inputBox.appendChild(makeChip(input.label, null, input.id === selection.input, () => select({ input: input.id })));
        });
        $('input-desc').textContent = INPUTS.find(i => i.id === selection.input).desc;

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

        const best = readBest({ ...selection, lang: recordLang(), course: activeCourse() });
        if (isCustom) $('best-display').textContent = 'BEST: N/A';
        else $('best-display').textContent = best === null ? 'BEST: ---' : `BEST: ${formatScore(mode, best)}`;
    }

    // CUSTOM の入力欄が変わったら、設定を保存して説明を更新する
    function onCustomInput() {
        const custom = {};
        Object.keys(CUSTOM_MAX).forEach(key => {
            custom[key] = clampRule(key, $(`custom-${key}`).value);
        });
        selection.custom = custom;
        store.set('codtec_selection', JSON.stringify(selection));
        $('custom-summary').textContent = `RULE: ${ruleSummary(normalizeRules(custom))}`;
    }

    function select(change) {
        // PICK LANGS をもう一度押したら、1 言語の選択に戻る
        if (change.lang === PICK_ID && selection.lang === PICK_ID) change = { lang: pickedIds()[0] };
        const prevLang = selection.lang;
        selection = { ...selection, ...change };
        // PICK LANGS に入ったとき、まだ何も選ばれていなければ直前の言語から始める
        if (selection.lang === PICK_ID && pickedIds().length === 0) {
            selection.picked = [Codtec.languages.some(l => l.id === prevLang) ? prevLang : Codtec.languages[0].id];
        }
        fixCourse();
        store.set('codtec_selection', JSON.stringify(selection));
        menuMessage.textContent = '';
        renderMenu();
    }

    // コースの選択を、いまの言語に合うように直す。PICK COURSES は、ALL になったら終わり、複数選ばれていれば入る
    function fixCourse() {
        selection.course = normalizeCourse(activeLangData(), selection.course);
        const count = courseIds(selection.course).length;
        selection.coursePick = count > 1 || (count === 1 && selection.coursePick === true);
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
        gameScreen.classList.remove('paused');
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
        const langData = activeLangData();
        const pool = Codtec.getPool(langData, activeCourse());
        if (pool.length === 0) return;
        if (document.activeElement) document.activeElement.blur();

        stopTimers();
        game = {
            sel: { ...selection, lang: recordLang(), course: activeCourse() }, // 記録には、実際に出題した言語とコースを使う
            langData,
            mixed: langData.id === Codtec.MIX_ID || langData.id === PICK_ID,
            mode: getMode(selection.mode),
            rules: normalizeRules(selection.mode === 'custom' ? selection.custom : getMode(selection.mode).rules),
            dead: false,     // ミスの上限で終わったか
            penaltyTotal: 0, // ミスで減った持ち時間の合計（秒）
            editor: selection.input === 'editor',
            pairs: {},       // いまの問題の、開きの位置 → 閉じの位置
            autoFilled: new Set(),
            typeOver: [],    // 飛び越えた閉じ側の文字（打ち直されたら見逃す）
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
        gameScreen.classList.remove('paused');
        hideToast();
        noteDisplay.textContent = '';
        noteDisplay.className = '';
        infoDisplay.textContent = `${game.langData.name} / ${courseLabel(game.sel.course)}`;
        show('game');
        runCountdown(3);
    }

    function runCountdown(count) {
        phase = 'countdown';
        wordDisplay.className = 'countdown';
        wordDisplay.style.fontSize = '';
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

    // 問題文の文字サイズを、1 行に収まる範囲でできるだけ大きくする
    const WORD_SIZE_MIN = 20;
    const WORD_SIZE_MAX = 54;
    const CHAR_WIDTH_RATIO = 0.62; // 等幅フォントの 1 文字の幅 ÷ 文字サイズ（少し余裕を見た値）

    function fitWordSize() {
        if (!game || !game.target) return;
        const width = wordDisplay.clientWidth || 800;
        const size = Math.floor(width / (game.target.text.length * CHAR_WIDTH_RATIO));
        wordDisplay.style.fontSize = `${Math.min(WORD_SIZE_MAX, Math.max(WORD_SIZE_MIN, size))}px`;
    }

    function setNextWord() {
        game.target = drawWord();
        game.charIdx = 0;
        game.wordMiss = 0;
        game.pairs = game.editor ? Codtec.findPairs(game.target) : {};
        game.autoFilled = new Set(); // 自動で入った閉じ側の位置
        updateProgress();

        // コースごとに文字色を変える
        wordDisplay.dataset.course = game.target.course;
        courseTag.dataset.course = game.target.course;
        courseTag.textContent = game.mixed
            ? `${langName(game.target.lang)} / ${courseLabel(game.target.course)}`
            : courseLabel(game.target.course);

        wordDisplay.textContent = '';
        fitWordSize();
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
        const parts = [game.langData.name];
        if (game.editor) parts.push('EDITOR');
        parts.push(rules.words
            ? `PROGRESS: ${Math.min(game.wordIdx + 1, rules.words)} / ${rules.words}`
            : `WORDS CLEARED: ${game.wordIdx}`);
        if (rules.lives > 1) parts.push(`LIVES: ${Math.max(0, rules.lives - game.missCount)}`);
        infoDisplay.textContent = parts.join(' | ');
    }

    // いまの持ち時間（秒）。1 問クリアするごとに bonus 秒ずつ増え、
    // ミスするたびに missPenalty() 秒ずつ減る
    function timeAllowed() {
        const { seconds, bonus } = game.rules;
        return seconds + bonus * game.wordIdx - game.penaltyTotal;
    }

    // いま 1 回ミスしたときに減る秒数。penaltyCurve があれば、クリアした問題数に応じて増える
    function missPenalty(words = game.wordIdx) {
        const { penalty, penaltyCurve } = game.rules;
        if (!penaltyCurve) return penalty;
        if (words < penaltyCurve.start) return 0;
        let seconds = penaltyCurve.base;
        for (let at = penaltyCurve.start + penaltyCurve.every; at <= words; at += penaltyCurve.every) {
            seconds += penaltyCurve.steps.find(step => at <= step.until).add;
        }
        return Math.round(Math.min(seconds, penaltyCurve.max) * 10) / 10;
    }

    // 決まった問題数をクリアするごとに、プレイの邪魔にならない短い知らせを出す
    function showMilestone() {
        const every = game.mode.milestone;
        if (!every || game.wordIdx === 0 || game.wordIdx % every !== 0) return;
        // この区切りでペナルティが重くなったら、その値も知らせる
        const penaltyUp = missPenalty() > missPenalty(game.wordIdx - 1);
        showToast(
            penaltyUp ? `${game.wordIdx} WORDS  |  MISS PENALTY -${missPenalty().toFixed(1)}s` : `${game.wordIdx} WORDS CLEARED`,
            penaltyUp ? 'warn' : ''
        );
    }

    function showToast(text, kind) {
        toast.textContent = text;
        toast.className = 'toast';
        void toast.offsetWidth; // アニメーションをやり直すための再描画
        toast.className = `toast show ${kind}`;
    }

    function hideToast() {
        toast.className = 'toast';
        toast.textContent = '';
    }

    function updateTimer() {
        const elapsed = elapsedSeconds();
        if (game.rules.seconds) {
            const remaining = Math.max(0, timeAllowed() - elapsed);
            timerDisplay.textContent = `REMAINING: ${remaining.toFixed(2)}s`;
            if (remaining <= 0 && phase === 'playing') showEnding('timeup');
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
        gameScreen.classList.add('paused');
    }

    function resumeGame() {
        if (phase !== 'paused') return;
        pauseOverlay.hidden = true;
        gameScreen.classList.remove('paused');
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
            game.typeOver = []; // 先へ進んだので、打ち直しの見逃しは終わり
            span.className = 'cleared';

            // エディタモード: 開きを打ったら、対応する閉じ側を入力済みにする
            const close = game.pairs[game.charIdx];
            if (close !== undefined) {
                game.autoFilled.add(close);
                game.spans[close].className = 'auto';
            }
            game.charIdx++;

            // 自動で入った閉じ側は飛び越える。癖で打ち直しても見逃せるよう、文字を覚えておく
            while (game.autoFilled.has(game.charIdx)) {
                game.spans[game.charIdx].className = 'cleared auto';
                game.typeOver.push(target[game.charIdx]);
                game.charIdx++;
            }

            if (game.charIdx < target.length) {
                game.spans[game.charIdx].className = 'current';
                return;
            }
            game.history.push({ item: game.target, misses: game.wordMiss, done: true });
            game.wordIdx++;
            if (game.rules.bonus) flashBonus();
            showMilestone();
            if (game.rules.words && game.wordIdx >= game.rules.words) showEnding('finish');
            else setNextWord();
            return;
        }

        // スペースが不要な場所でのスペースはミスに数えない
        if (e.key === ' ') return;

        // エディタモード: 自動で入った閉じ側を、いつもの癖で打ち直したぶんは見逃す
        if (game.typeOver.length > 0 && e.key === game.typeOver[0]) {
            game.typeOver.shift();
            return;
        }

        game.missCount++;
        game.wordMiss++;
        span.className = 'current';
        void span.offsetWidth; // アニメーションをやり直すための再描画
        span.className = 'current miss';
        if (game.rules.lives && game.missCount >= game.rules.lives) showEnding('dead');
        else {
            const lost = missPenalty();
            if (lost > 0) {
                game.penaltyTotal += lost;
                flashTimer('penalty');
            }
            updateProgress();
        }
    }

    // 持ち時間が増えたことを、タイマーの色で一瞬知らせる
    function flashBonus() {
        flashTimer('bonus');
    }

    // 持ち時間が増えた（bonus）・減った（penalty）ことを、タイマーの色で一瞬知らせる
    function flashTimer(kind) {
        timerDisplay.className = kind;
        setTimeout(() => {
            if (timerDisplay.className === kind) timerDisplay.className = '';
        }, 400);
    }

    // ゲームが終わったとき: 最後の問題文を見せたまま終了の表示を出し、少し置いてから結果へ進む
    //   finish … 決めた問題数を打ち切った / timeup … 持ち時間がなくなった / dead … ミスの上限に達した
    function showEnding(kind) {
        const ending = ENDINGS[kind];
        game.elapsedMs += performance.now() - game.segmentStart; // 表示している間は時間を進めない
        game.dead = kind === 'dead';
        game.endKind = kind;
        phase = 'ending';
        clearInterval(timerInterval);
        timerInterval = null;
        updateProgress();
        timerDisplay.className = `ending ${kind}`;
        timerDisplay.textContent = ending.title;
        noteDisplay.className = kind === 'dead' ? 'warn' : 'ending-note';
        noteDisplay.textContent = ending.note;
        countdownTimeout = setTimeout(finishGame, ending.ms);
    }

    // ウィンドウの幅が変わったら、問題文の大きさを合わせ直す
    window.addEventListener('resize', () => {
        if (phase === 'playing' || phase === 'paused') fitWordSize();
    });

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

        const lang = activeLangData();
        // 矢印キーはコースを 1 つずつ切り替える。PICK COURSES の間に押すと、先頭のコースから数えて 1 コースの選択に戻る
        const courseCursor = courseIds(selection.course)[0] || 'all';
        const langIds = [Codtec.MIX_ID, PICK_ID, ...Codtec.GROUPS.flatMap(g => Codtec.languages.filter(l => l.group === g.id).map(l => l.id))];

        if (e.key === 'Enter') { e.preventDefault(); startGame(); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); select({ lang: step(langIds, selection.lang, 1) }); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); select({ lang: step(langIds, selection.lang, -1) }); }
        else if (e.key === 'ArrowDown') { e.preventDefault(); select({ coursePick: false, course: step(availableCourses(lang), courseCursor, 1) }); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); select({ coursePick: false, course: step(availableCourses(lang), courseCursor, -1) }); }
        else if (/^[1-9]$/.test(e.key) && MODES[Number(e.key) - 1]) select({ mode: MODES[Number(e.key) - 1].id });
        else if (e.key.toLowerCase() === 'e') select({ input: selection.input === 'editor' ? 'normal' : 'editor' });
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
            : `${wordsText(g.wordIdx)} / ${finalTime.toFixed(2)}s`;

        // ハイスコア（CUSTOM はルールが毎回違うので保存しない）
        let isNewRecord = false;
        let bestText = `RULE: ${ruleSummary(g.rules)}`;
        if (tracked) {
            const prevBest = readBest(g.sel);
            isNewRecord = prevBest === null || (g.mode.score === 'time' ? score < prevBest : score > prevBest);
            if (g.mode.score === 'words' && score === 0) isNewRecord = false; // 1 問も打てなかったときは記録にしない
            if (isNewRecord) store.set(bestKey(g.sel), String(score));
            bestText = isNewRecord
                ? (prevBest === null ? 'NEW RECORD!' : `NEW RECORD!  (前回のベスト: ${formatScore(g.mode, prevBest)})`)
                : (prevBest === null ? 'BEST: ---' : `BEST: ${formatScore(g.mode, prevBest)}`);
        }
        const modeText = tracked ? g.mode.short : `${g.mode.short} (${ruleSummary(g.rules)})`;

        // PICK LANGS のときは、選んだ言語の名前も並べる
        const baseName = g.langData.id === PICK_ID
            ? `${g.langData.name}: ${g.langData.members.map(langName).join(', ')}`
            : g.langData.name;
        const langText = g.sel.course === 'all' ? baseName : `${baseName} (${courseLabel(g.sel.course)})`;

        // X にシェアする文面。画面と同じ呼び名（モード名・コース名・終わり方）で書く
        // 複数の言語から出題されたときは、いちばん多く出た言語の名前に「+N」を付ける
        // （N は、ほかに出題された言語の数。同数なら、メニューで先に並ぶ言語を書く）
        const langCounts = {};
        g.history.forEach(entry => { langCounts[entry.item.lang] = (langCounts[entry.item.lang] || 0) + 1; });
        const playedLangs = Codtec.languages.map(l => l.id).filter(id => langCounts[id]);
        let shareBase = g.langData.name;
        if (playedLangs.length > 0) {
            const top = playedLangs.reduce((best, id) => (langCounts[id] > langCounts[best] ? id : best));
            shareBase = playedLangs.length > 1 ? `${langName(top)} +${playedLangs.length - 1}` : langName(top);
        }
        // 実際に出題されたコースを、略称で並べる（1 つでも略称。全コースが出たら ALL）
        const playedIds = new Set(g.history.map(entry => entry.item.course));
        const played = Codtec.COURSES.filter(c => playedIds.has(c.id));
        // 1 問も記録がないときは、選んだコースを書く
        const selectedIds = courseIds(g.sel.course);
        let shareCourse = selectedIds.length > 0
            ? Codtec.COURSES.filter(c => selectedIds.includes(c.id)).map(c => c.short).join('/')
            : 'ALL';
        if (played.length === Codtec.COURSES.length) shareCourse = 'ALL';
        else if (played.length > 0) shareCourse = played.map(c => c.short).join('/');
        const errLog = g.missCount === 0
            ? 'no errors detected.'
            : `${g.missCount} ${g.missCount === 1 ? 'case' : 'cases'} detected.`;
        const exitText = g.endKind ? ENDINGS[g.endKind].title.replace('!', '') : 'FINISH';

        // X の上限（280 文字。URL は 23 文字と数えられる）を超えるときは、後ろの行から省く
        // 全言語・全コースから出すと決まっているモードでは、言語とコースの行を書かない
        // 代わりに、時間切れまで生き残った長さを書く
        const fixedPool = MIX_ONLY_MODES.includes(g.mode.id);
        const minutes = Math.floor(finalTime / 60);
        const survived = minutes > 0 ? `${minutes}m ${Math.floor(finalTime % 60)}s` : `${Math.floor(finalTime)}s`;
        const lines = [
            '[CODTEC_REPORT]',
            ...(fixedPool ? [] : [`>> LANG: ${shareBase}`, `>> COURSE: ${shareCourse}`]),
            `>> MODE: ${modeText}`,
            ...(g.editor ? ['>> INPUT: EDITOR'] : []),
            `>> RESULT: ${scoreText}${isNewRecord ? ' [NEW]' : ''}`,
            ...(fixedPool ? [`>> TIME: ${survived}`] : []),
            `>> KPM: ${kpm} / ACC: ${accuracy}%`,
            `>> ERR_LOG: ${errLog}`,
            `>> EXIT: ${exitText}`,
        ];
        const tweetLength = () => lines.join('\n').length + '\n\n#codtec\n'.length + 23;
        while (tweetLength() > 280 && lines.length > 4) lines.pop();
        // ハッシュタグは文面に書く。hashtags= で渡すと URL のうしろに付いてしまう
        const shareText = `${lines.join('\n')}\n\n#codtec\n${SITE_URL}`;
        const xLink = `https://x.com/intent/post?text=${encodeURIComponent(shareText)}`;

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
        resultScreen.querySelector('.result-context').textContent = `${langText} / ${g.mode.label}${g.editor ? ' / EDITOR' : ''}`;
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
        if (selection.lang !== PICK_ID && !Codtec.get(selection.lang)) selection.lang = Codtec.languages[0].id;
        selection.picked = pickedIds();
        if (selection.lang === PICK_ID && selection.picked.length === 0) selection.lang = Codtec.languages[0].id;
        if (!getMode(selection.mode)) selection.mode = MODES[0].id;
        if (!INPUTS.some(i => i.id === selection.input)) selection.input = INPUTS[0].id;
        fixCourse();

        startBtn.disabled = false;
        goToMenu();
    }

    loadLanguages(window.CODTEC_LANG_FILES || [], init);
})();
