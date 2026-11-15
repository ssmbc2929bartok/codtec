// 公開用フォルダ codtec/ を、ルートのファイルから作り直すスクリプト。
// 使い方: node tools/sync-public.mjs          … codtec/ を更新する
//         node tools/sync-public.mjs --check  … 更新せず、ずれがあるかだけ調べる
//
// ssmbar.com/codtec/ は、このリポジトリの codtec/ フォルダの中身を配信している。
// ルートのファイルを直したら、コミットの前にこのスクリプトを実行する。
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'codtec');
const checkOnly = process.argv.includes('--check');

// 公開するファイル（ルートからの相対パス）
const files = ['index.html', 'howto.html', 'codtec.css', 'script.js', 'data/registry.js', 'data/manifest.js'];
for (const name of readdirSync(join(root, 'data/langs'))) {
    if (name.endsWith('.js')) files.push(`data/langs/${name}`);
}

const NOTE = `# codtec/（公開用の写し）

このフォルダは ssmbar.com/codtec/ で配信するための写しです。
ルートのファイルから \`node tools/sync-public.mjs\` で作り直します。直接は編集しないでください。
`;
const expected = new Map(files.map(f => [f, readFileSync(join(root, f))]));
expected.set('README.md', Buffer.from(NOTE));

function listFiles(dir) {
    if (!existsSync(dir)) return [];
    return readdirSync(dir).flatMap(name => {
        const path = join(dir, name);
        return statSync(path).isDirectory() ? listFiles(path) : [relative(out, path)];
    });
}

const problems = [];
for (const [file, content] of expected) {
    const target = join(out, file);
    if (!existsSync(target)) problems.push(`codtec/${file} がありません`);
    else if (!readFileSync(target).equals(content)) problems.push(`codtec/${file} がルートの内容と違います`);
}
const stale = listFiles(out).filter(f => !expected.has(f));
for (const file of stale) problems.push(`codtec/${file} は公開しないファイルです`);

if (checkOnly) {
    if (problems.length > 0) {
        console.error(`公開用フォルダ codtec/ にずれが ${problems.length} 件あります。node tools/sync-public.mjs を実行してください:`);
        for (const p of problems) console.error(`  - ${p}`);
        process.exit(1);
    }
    console.log('公開用フォルダ codtec/ はルートと一致しています。');
} else {
    for (const file of stale) rmSync(join(out, file));
    for (const [file, content] of expected) {
        mkdirSync(dirname(join(out, file)), { recursive: true });
        if (file === 'README.md') writeFileSync(join(out, file), content);
        else cpSync(join(root, file), join(out, file));
    }
    console.log(`codtec/ を更新しました（${expected.size} ファイル、削除 ${stale.length} ファイル）。`);
}
