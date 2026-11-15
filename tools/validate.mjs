// 問題データの検査スクリプト。
// 使い方: node tools/validate.mjs
// 文字数オーバー・打てない文字・重複・manifest の書き漏れを見つけて知らせる。
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sandbox = { window: {}, console: { warn() {} } };
sandbox.window = sandbox;
vm.createContext(sandbox);

const run = file => vm.runInContext(readFileSync(join(root, file), 'utf8'), sandbox, { filename: file });

run('data/registry.js');
run('data/manifest.js');

const listed = sandbox.CODTEC_LANG_FILES;
const onDisk = readdirSync(join(root, 'data/langs')).filter(f => f.endsWith('.js')).map(f => f.slice(0, -3));
const problems = [];

for (const name of onDisk) {
    if (!listed.includes(name)) problems.push(`data/langs/${name}.js が manifest.js に書かれていません`);
}
for (const name of listed) {
    if (!onDisk.includes(name)) {
        problems.push(`manifest.js の '${name}' に対応するファイルがありません`);
        continue;
    }
    run(`data/langs/${name}.js`);
}

const { Codtec } = sandbox;
problems.push(...Codtec.warnings);

let total = 0;
for (const lang of Codtec.languages) {
    const counts = Codtec.COURSES.map(c => `${c.id} ${(lang.sets[c.id] || []).length}`).join(' / ');
    console.log(`${lang.name.padEnd(12)} ${String(lang.total).padStart(4)} 問  (${counts})`);
    total += lang.total;
}
console.log(`\n合計: ${Codtec.languages.length} 言語 / ${total} 問`);

if (problems.length > 0) {
    console.error(`\n問題が ${problems.length} 件見つかりました:`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
}
console.log('問題は見つかりませんでした。');
