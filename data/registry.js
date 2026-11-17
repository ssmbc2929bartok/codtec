// registry.js
// 問題データの登録窓口。各言語ファイル（data/langs/*.js）は Codtec.register() を呼ぶだけでよい。
// 書式の説明は data/README.md を参照。
(function (global) {
    'use strict';

    const VERSION = '2.7.3';

    // 1 問の長さの上限（これを超える行は読み込み時に除外して警告する）
    const MAX_LENGTH = 56;

    // 言語のグループ（メニューでの並び順）
    const GROUPS = [
        { id: 'systems', label: 'SYSTEMS' },
        { id: 'app', label: 'APP / JVM' },
        { id: 'script', label: 'SCRIPT' },
        { id: 'web', label: 'WEB' },
        { id: 'data', label: 'DATA / FUNCTIONAL' },
        { id: 'tools', label: 'TOOLS / INFRA' },
    ];

    // コース（問題セット）の種類。言語ファイルの「@@ 名前」と対応する。
    // short は、シェア文面で複数のコースを並べるときの略称。
    const COURSES = [
        { id: 'basics', label: 'BASICS', short: 'BAS', desc: '基礎の構文' },
        { id: 'stdlib', label: 'STDLIB', short: 'STD', desc: '標準ライブラリ・データ構造・組み込みの機能' },
        { id: 'features', label: 'IDIOMS', short: 'IDM', desc: 'その言語らしい書き方' },
        { id: 'advanced', label: 'ADVANCED', short: 'ADV', desc: '応用・上級者向け' },
        { id: 'ecosystem', label: 'LIBS', short: 'LIB', desc: 'ライブラリ・各界隈の定番' },
    ];

    const languages = [];
    const byId = {};

    // 全言語をまとめた「言語横断」の id と、その中身（言語が登録されるたびに作り直す）
    const MIX_ID = 'mix';
    let mixCache = null;

    // テキストブロックを { コースID: [{ text, note, course, lang }] } に変換する
    function parse(langId, source) {
        const sets = {};
        const seen = new Set();
        let current = null;

        source.split('\n').forEach((rawLine, lineNo) => {
            const line = rawLine.trim();
            if (!line) return;

            if (line.startsWith('@@')) {
                current = line.slice(2).trim();
                if (!COURSES.some(c => c.id === current)) {
                    warn(langId, lineNo, `未定義のコース名です: ${current}`);
                    current = null;
                } else if (!sets[current]) {
                    sets[current] = [];
                }
                return;
            }
            if (!current) {
                warn(langId, lineNo, `コース見出し（@@ basics など）より前に問題があります: ${line}`);
                return;
            }

            // 「※」より後ろは解説（任意）
            const parts = line.split('※');
            // String.raw の中で書けない 2 つだけ、エスケープを元に戻す
            const text = parts[0].trim().replace(/\\`/g, '`').replace(/\\\$\{/g, '${');
            const note = parts.length > 1 ? parts.slice(1).join('※').trim() : '';

            if (!/^[\x20-\x7e]+$/.test(text)) {
                warn(langId, lineNo, `キーボードで直接打てない文字が含まれています: ${text}`);
                return;
            }
            if (text.length > MAX_LENGTH) {
                warn(langId, lineNo, `長すぎます（${text.length} 文字、上限 ${MAX_LENGTH}）: ${text}`);
                return;
            }
            if (seen.has(text)) {
                warn(langId, lineNo, `同じ問題が重複しています: ${text}`);
                return;
            }
            seen.add(text);
            sets[current].push({ text, note, course: current, lang: langId });
        });

        return sets;
    }

    const warnings = [];
    function warn(langId, lineNo, message) {
        const entry = `[codtec] ${langId} (${lineNo + 1} 行目): ${message}`;
        warnings.push(entry);
        if (global.console) console.warn(entry);
    }

    function register(def) {
        if (!def || !def.id || !def.name || typeof def.words !== 'string') {
            warn(def && def.id ? def.id : '?', 0, 'id / name / words が必要です');
            return;
        }
        if (byId[def.id]) {
            warn(def.id, 0, '同じ id の言語がすでに登録されています');
            return;
        }
        const sets = parse(def.id, def.words);
        const total = Object.values(sets).reduce((n, items) => n + items.length, 0);
        if (total === 0) {
            warn(def.id, 0, '問題が 1 つもありません');
            return;
        }
        const lang = {
            id: def.id,
            name: def.name,
            group: GROUPS.some(g => g.id === def.group) ? def.group : 'tools',
            sets,
            total,
        };
        languages.push(lang);
        byId[lang.id] = lang;
        mixCache = null;
    }

    // 全言語の問題をコースごとにまとめた、言語横断用の「言語」を返す
    function getMix() {
        if (!mixCache) mixCache = combine(MIX_ID, 'ALL LANGS', languages.map(l => l.id));
        return mixCache;
    }

    // 指定した言語の問題をコースごとにまとめて、1 つの「言語」として返す
    function combine(id, name, langIds) {
        const members = languages.filter(l => langIds.includes(l.id));
        const sets = {};
        COURSES.forEach(c => {
            const items = members.flatMap(l => l.sets[c.id] || []);
            if (items.length > 0) sets[c.id] = items;
        });
        return {
            id,
            name,
            group: null,
            members: members.map(l => l.id),
            sets,
            total: members.reduce((n, l) => n + l.total, 0),
        };
    }

    function get(id) {
        return id === MIX_ID ? getMix() : byId[id];
    }

    // --- エディタモード用: 括弧と引用符の対を見つける ---
    const BRACKETS = { '(': ')', '[': ']', '{': '}' };
    const BRACKET_CLOSERS = new Set(Object.values(BRACKETS));
    const QUOTES = new Set(['"', "'", '`']);

    // Rust のライフタイム（'a や 'static）が入っている問題かどうか。
    // 入っていると ' が引用符ではないので、その問題では ' を対にしない
    function hasLifetime(item) {
        return item.lang === 'rust' && /'[A-Za-z_]\w*(?!\w|')/.test(item.text);
    }

    // 問題文の中の対を { 開きの位置: 閉じの位置 } で返す。
    //   - 対象は () [] {} と、"" '' ``（閉じる相手が同じ問題文の中にあるものだけ）
    //   - 引用符の中にある括弧は対にしない
    //   - don't のような単語の途中の ' は開きにしない
    function findPairs(item) {
        if (item.pairs) return item.pairs;
        const text = item.text;
        const skipApostrophe = hasLifetime(item);
        const pairs = {};
        const stack = [];
        let quote = null;
        let quoteAt = -1;

        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            if (quote) {
                if (ch === '\\') { i++; continue; } // \" のようなエスケープは閉じにしない
                if (ch === quote) { pairs[quoteAt] = i; quote = null; }
                continue;
            }
            if (QUOTES.has(ch)) {
                if (ch === "'" && (skipApostrophe || /\w/.test(text[i - 1] || ''))) continue;
                if (text.indexOf(ch, i + 1) === -1) continue; // 閉じる相手がない
                quote = ch;
                quoteAt = i;
            } else if (BRACKETS[ch]) {
                stack.push(i);
            } else if (BRACKET_CLOSERS.has(ch)) {
                const open = stack[stack.length - 1];
                if (open !== undefined && BRACKETS[text[open]] === ch) {
                    stack.pop();
                    pairs[open] = i;
                }
            }
        }
        item.pairs = pairs;
        return pairs;
    }

    // コースを指定して問題の配列を取り出す（'all' なら全コース）
    // lang には言語の id か、get() や combine() が返した言語を渡す
    // courseId には 1 つのコースの id か、複数を「+」でつないだもの（'basics+stdlib'）を渡す
    function getPool(langOrId, courseId) {
        const lang = typeof langOrId === 'string' ? get(langOrId) : langOrId;
        if (!lang) return [];
        const ids = courseId && courseId !== 'all' ? courseId.split('+').filter(id => lang.sets[id]) : [];
        const picked = ids.length > 0 ? COURSES.filter(c => ids.includes(c.id)) : COURSES;
        return picked.flatMap(c => lang.sets[c.id] || []);
    }

    global.Codtec = {
        VERSION,
        MAX_LENGTH,
        GROUPS,
        COURSES,
        languages,
        warnings,
        register,
        MIX_ID,
        get,
        combine,
        getPool,
        findPairs,
        hasLifetime,
    };
})(typeof window !== 'undefined' ? window : globalThis);
