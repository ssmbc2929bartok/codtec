Codtec.register({
    id: 'js',
    name: 'JavaScript',
    group: 'web',
    words: String.raw`
@@ basics
console.log("Hello, world!");  ※ コンソールに出力する
const name = "JS";  ※ const は再代入できない変数
let count = 0;  ※ let は再代入できる変数
function add(a, b) { return a + b; }  ※ 関数の定義
if (x === null) {  ※ === は型も含めて比較する
for (let i = 0; i < n; i++) {  ※ 基本の for 文
for (const item of items) {  ※ 配列などの全要素をたどる
const nums = [1, 2, 3];  ※ 配列
const user = { name: "Alice", age: 20 };  ※ オブジェクト。キーと値の対応
return true;  ※ 真偽値を返す
while (queue.length > 0) {  ※ キューが空になるまでくり返す
typeof value === "string"  ※ 型を文字列で調べる
document.getElementById("app")  ※ id を指定して HTML の要素を取得する
let total = 0;  ※ 合計などを入れていく変数の初期化

@@ stdlib
nums.push(4);  ※ 配列の末尾に追加する
nums.pop()  ※ 末尾を取り出す。スタックとして使える
nums.shift()  ※ 先頭を取り出す。キューとして使えるが O(n)
nums.unshift(0)  ※ 先頭に追加する
nums.length  ※ 要素数
nums.at(-1)  ※ 末尾の要素。負の添字が使える
nums.slice(1, 3)  ※ 一部を切り出した新しい配列を返す
nums.splice(1, 2)  ※ 元の配列から要素を取り除く
nums.indexOf(3)  ※ 値の位置。なければ -1
arr.includes(x)  ※ 含まれているか
nums.find(n => n > 1)  ※ 条件に合う最初の要素
nums.findIndex(n => n > 1)  ※ 条件に合う最初の位置
nums.some(n => n < 0)  ※ 1 つでも条件を満たせば true
nums.every(n => n > 0)  ※ 全部が条件を満たせば true
nums.sort((a, b) => a - b)  ※ 数値の昇順。比較関数がないと文字列順になる
nums.toSorted((a, b) => b - a)  ※ 元の配列を変えずに並べ替える
nums.reverse()  ※ その場で逆順にする
nums.join(", ")  ※ 区切り文字でつなげて文字列にする
nums.flat()  ※ 入れ子の配列を 1 段平らにする
nums.flatMap(n => [n, n * 2])  ※ 変換してから平らにする
nums.reduce((sum, n) => sum + n, 0)  ※ 畳み込み。ここでは合計
[...a, ...b]  ※ スプレッド構文で配列をつなげる
Array.isArray(value)  ※ 配列かどうか
new Array(5).fill(0)  ※ 0 で埋めた長さ 5 の配列
Math.max(...nums)  ※ 配列の最大値。スプレッドで引数に展開する
Math.floor(Math.random() * 6) + 1  ※ 1 から 6 の乱数。サイコロ
Math.round(x * 100) / 100  ※ 小数第 2 位に丸める
Number.parseInt("42px", 10)  ※ 先頭の数字を整数として読む
Number.isNaN(value)  ※ NaN かどうか
(0.1 + 0.2).toFixed(2)  ※ 小数第 2 位までの文字列にする
s.split("").reverse().join("")  ※ 文字列を逆順にする
s.trim().toLowerCase()  ※ 前後の空白を除いて小文字にする
s.startsWith("http")  ※ 指定した文字列で始まるか
s.replaceAll("a", "b")  ※ すべて置き換える
s.padStart(3, "0")  ※ 3 桁になるよう左を 0 で埋める
s.slice(0, 10)  ※ 先頭から 10 文字
/^\d+$/.test(s)  ※ 正規表現に合うか。数字だけかの判定
const map = new Map();  ※ キーに何でも使える連想配列。挿入順を保つ
map.set(key, value);  ※ Map に登録する
map.get(key) ?? 0  ※ 取り出す。なければ 0
map.has(key)  ※ キーがあるかどうか
for (const [k, v] of map) {  ※ Map のキーと値を順にたどる
const seen = new Set();  ※ 重複を持たない集合
seen.add(x).size  ※ 追加して、要素数を見る
[...new Set(nums)]  ※ 配列の重複を取り除く定番
Object.keys(obj).length  ※ オブジェクトのキーの数
Object.entries(obj).forEach(([k, v]) => {});  ※ キーと値の組を順に処理する
Object.fromEntries(pairs)  ※ キーと値の組からオブジェクトを作る
Object.assign({}, defaults, opts)  ※ オブジェクトを浅くマージする
JSON.stringify(obj, null, 2)  ※ 字下げつきの JSON 文字列にする
JSON.parse(JSON.stringify(obj))  ※ ディープコピーの古い定番
new Date().toISOString()  ※ 現在時刻を ISO 8601 形式の文字列にする
Date.now()  ※ 現在時刻をミリ秒で返す
setTimeout(() => {}, 100);  ※ 100 ミリ秒後に実行する
setInterval(tick, 1000)  ※ 1 秒ごとにくり返し実行する

@@ features
const add = (a, b) => a + b;  ※ アロー関数
const { name, age } = user;  ※ 分割代入
const [first, ...rest] = nums;  ※ 先頭と残りに分けて受け取る
console.log(\`Hello, \${name}!\`);  ※ テンプレートリテラル
nums.map(n => n * 2).filter(n => n > 2)  ※ 変換と絞り込みをつなげる
const copy = { ...user, age: 21 };  ※ スプレッド構文
user?.profile?.name ?? "guest"  ※ 途中が null でも落ちない。なければ既定値
el.addEventListener("click", onClick);  ※ イベントが起きたときの処理を登録する
export default class App {  ※ モジュールの既定のエクスポート
import { useState } from "react";  ※ 名前付きインポート
x == null  ※ null と undefined の両方に一致する
const fn = function () { return this; };  ※ function の this は呼び出し方で決まる
count ||= 1;  ※ 偽の値のときだけ代入する
const { data = [] } = res;  ※ 分割代入に既定値を付ける
label: for (;;) { break label; }  ※ ラベルつき break。入れ子のループを抜ける
if (!value) return;  ※ 偽の値なら早期リターン

@@ advanced
async function load() {  ※ 非同期関数。Promise を返す
const res = await fetch(url);  ※ HTTP リクエストの完了を待つ
await Promise.all(tasks);  ※ 複数の非同期処理を並行に実行して全部待つ
new Promise((resolve, reject) => {});  ※ Promise を自分で作る
try { } catch (err) { } finally { }  ※ 例外処理。finally は必ず実行される
function* gen() { yield 1; }  ※ ジェネレータ関数
for await (const chunk of stream) {  ※ 非同期に届く値を順に受け取る
class Foo extends Bar { #secret = 1; }  ※ 継承と、# で始まる非公開フィールド
static get instance() {  ※ 静的なゲッター。シングルトンで使う
Object.freeze(config);  ※ オブジェクトを変更できなくする
new Proxy(target, { get(t, k) { return t[k]; } })  ※ プロパティへのアクセスに処理を挟む
fn.call(this, ...args)  ※ this を指定して関数を呼ぶ
const cache = new WeakMap();  ※ キーが回収されると一緒に消えるマップ
Symbol.iterator  ※ for...of でたどれるようにするための鍵
structuredClone(state)  ※ ディープコピーする組み込み関数
queueMicrotask(() => flush());  ※ 今の処理の直後に実行する
Array.from({ length: n }, (_, i) => i)  ※ 0 から n-1 の連番の配列を作る
globalThis  ※ どの環境でも使えるグローバルオブジェクト

@@ ecosystem
const [count, setCount] = useState(0);  ※ React
useEffect(() => { load(); }, [id]);  ※ React。id が変わるたびに実行する副作用
return <Button onClick={handleClick} />;  ※ JSX。JavaScript の中に書く UI
export default function Page({ params }) {  ※ Next.js
const count = ref(0);  ※ Vue
<script setup>  ※ Vue の単一ファイルコンポーネントの書き方
app.get("/", (req, res) => res.send("ok"));  ※ Express
const express = require("express");  ※ CommonJS のモジュール読み込み
module.exports = { mode: "production" };  ※ CommonJS のエクスポート。設定ファイルでよく見る
npm install --save-dev vitest  ※ 開発用の依存として入れる
npx create-next-app@latest  ※ Next.js のひな形を作る
expect(add(2, 2)).toBe(4);  ※ Jest / Vitest
document.querySelectorAll(".item")  ※ CSS セレクタに合う要素をすべて取得する
localStorage.setItem("key", JSON.stringify(v));  ※ ブラウザにデータを保存する
const ctx = canvas.getContext("2d");  ※ Canvas に 2D で描くための準備
requestAnimationFrame(loop);  ※ 次の描画に合わせて呼ぶ。ゲームループの定番
$(".btn").on("click", handler);  ※ jQuery
const scene = new THREE.Scene();  ※ three.js
node --watch server.js  ※ ファイルが変わると自動で再起動する
process.env.NODE_ENV  ※ Node.js で環境変数を読む
client.on("messageCreate", (msg) => {});  ※ discord.js
`,
});
