// バージョン番号をまとめて書き換えるスクリプト。
// 使い方: node tools/release.mjs 2.0.1
//
// 次の 2 か所を同じ値にそろえる。
//   - data/registry.js の VERSION（画面右下の表示と、言語ファイルの読み込みに使う）
//   - index.html と howto.html の「?v=…」（CSS と JS の読み込みに付ける印）
// 「?v=」が前と同じままだと、ブラウザが古い CSS や JS を使い続けることがある。
// 公開する変更をコミットする前に、必ず新しい番号で実行する。
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const version = process.argv[2];

if (!/^\d+\.\d+\.\d+$/.test(version || '')) {
    console.error('使い方: node tools/release.mjs 2.0.1（数字.数字.数字 の形で指定します）');
    process.exit(1);
}

function rewrite(file, pattern, replacement, expected) {
    const path = join(root, file);
    const before = readFileSync(path, 'utf8');
    const count = (before.match(pattern) || []).length;
    if (count !== expected) {
        console.error(`${file}: 書き換える場所が ${expected} か所のはずが ${count} か所でした。中止します。`);
        process.exit(1);
    }
    writeFileSync(path, before.replace(pattern, replacement));
    console.log(`${file}: ${count} か所を ${version} にしました`);
}

rewrite('data/registry.js', /const VERSION = '[^']*';/g, `const VERSION = '${version}';`, 1);
rewrite('index.html', /\?v=[0-9.]+/g, `?v=${version}`, 5);
rewrite('howto.html', /\?v=[0-9.]+/g, `?v=${version}`, 2);
console.log('変更履歴（CHANGELOG.md）に、このバージョンの項目を書き足してください。');
