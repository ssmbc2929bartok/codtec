Codtec.register({
    id: 'css',
    name: 'CSS',
    group: 'web',
    words: String.raw`
@@ basics
color: #333;  ※ 文字の色
background-color: #f5f5f5;  ※ 背景の色
font-size: 16px;  ※ 文字の大きさ
margin: 0 auto;  ※ 上下 0、左右 auto。ブロックを中央に寄せる定番
padding: 8px 16px;  ※ 内側の余白。上下 8px、左右 16px
border: 1px solid #ccc;  ※ 枠線。太さ・種類・色
.card { width: 100%; }  ※ クラスセレクタ
#header { height: 60px; }  ※ ID セレクタ
text-align: center;  ※ 文字を中央にそろえる
display: block;  ※ ブロック要素として表示する
a:hover { text-decoration: underline; }  ※ マウスを乗せたときの見た目
font-weight: bold;  ※ 太字にする
line-height: 1.6;  ※ 行の高さ。単位なしで書くのが定番
h1, h2, h3 { margin: 0; }  ※ 複数のセレクタにまとめて指定する

@@ stdlib
display: none;  ※ 要素を表示せず、場所も取らない
display: inline-block;  ※ 横に並びつつ、幅と高さを持てる
visibility: hidden;  ※ 見えなくするが、場所は残る
opacity: 0.5;  ※ 不透明度
width: 100vw; height: 100vh;  ※ 画面の幅と高さいっぱい
max-width: 960px;  ※ 幅の上限
min-height: 100dvh;  ※ モバイルのアドレスバーを考慮した画面の高さ
margin-inline: auto;  ※ 左右のマージンを auto にする論理プロパティ
padding-block: 2rem;  ※ 上下のパディングを指定する論理プロパティ
font-family: "Helvetica Neue", sans-serif;  ※ フォントの指定。最後は総称にする
font-style: italic;  ※ 斜体にする
letter-spacing: 0.1em;  ※ 文字の間隔
text-transform: uppercase;  ※ 大文字で表示する
text-decoration: none;  ※ リンクの下線を消す
text-overflow: ellipsis;  ※ はみ出した文字を「…」で省略する
white-space: nowrap;  ※ 折り返さない
word-break: break-all;  ※ 単語の途中でも折り返す
vertical-align: middle;  ※ インライン要素の縦位置をそろえる
list-style: none;  ※ 箇条書きの記号を消す
cursor: pointer;  ※ マウスカーソルを指の形にする
pointer-events: none;  ※ クリックなどの操作を受け付けなくする
user-select: none;  ※ 文字を選択できなくする
outline: 2px solid blue;  ※ フォーカス時などの外側の線。場所を取らない
border-bottom: 2px dashed #999;  ※ 下だけの破線
border-collapse: collapse;  ※ 表のセルの枠線を重ねる
background: url("bg.png") no-repeat center / cover;  ※ 背景画像を全体に敷く
background: linear-gradient(to right, #70dafa, #937df7);  ※ 線形グラデーション
object-fit: cover;  ※ 画像を切り抜いて枠いっぱいに表示する
position: relative;  ※ 元の位置を基準にずらす。子の absolute の基準にもなる
position: fixed; bottom: 0;  ※ 画面に固定する
position: sticky; top: 0;  ※ スクロールすると上端に貼り付く
float: left;  ※ 左に寄せて文章を回り込ませる
flex-direction: column;  ※ フレックスの並びを縦にする
flex-wrap: wrap;  ※ 入りきらない項目を折り返す
flex: 1 1 0;  ※ 伸びる・縮む・基準の幅をまとめて指定する
align-self: flex-end;  ※ その項目だけ交差軸の位置を変える
place-items: center;  ※ グリッドの中身を縦横とも中央にする
grid-column: 1 / -1;  ※ 列の端から端まで広げる
color: rgb(0 0 0 / 50%);  ※ 透明度つきの色
color: hsl(210 100% 50%);  ※ 色相・彩度・明度で色を指定する
min(100%, 600px)  ※ 小さいほうの値を使う関数
font-size: 1.25rem;  ※ ルートの文字サイズを基準にした単位
filter: blur(4px) brightness(0.8);  ※ ぼかしや明るさの効果
transform: scale(1.05);  ※ 拡大する
transition: all 0.2s ease-out;  ※ 変化をなめらかにする
overflow-y: auto;  ※ はみ出したら縦にスクロールできるようにする
scroll-behavior: smooth;  ※ ページ内リンクをなめらかにスクロールする
content: "";  ※ 擬似要素の中身。空でも指定が必要
!important  ※ 優先順位を強制的に上げる。乱用は避ける

@@ features
display: flex;  ※ フレックスボックス。子要素を 1 方向に並べる
justify-content: space-between;  ※ 主軸方向に両端ぞろえで並べる
align-items: center;  ※ 交差軸方向の中央にそろえる
display: grid;  ※ グリッドレイアウト。行と列で配置する
grid-template-columns: repeat(3, 1fr);  ※ 同じ幅の 3 列を作る
gap: 1rem;  ※ 項目どうしの間隔
position: absolute; top: 0; left: 0;  ※ 基準の要素の左上に重ねて置く
box-sizing: border-box;  ※ 幅に padding と border を含める
border-radius: 8px;  ※ 角を丸める
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);  ※ 影を付ける
transition: opacity 0.3s ease;  ※ 透明度の変化を 0.3 秒かけて行う
@media (max-width: 768px) {  ※ メディアクエリ。画面幅で切り替える
.nav > li:first-child  ※ 直接の子のうち最初の要素
ul li:nth-child(2n + 1)  ※ 奇数番目の要素
z-index: 10;  ※ 重なりの順序。大きいほど手前
overflow: hidden;  ※ はみ出した部分を隠す

@@ advanced
:root { --accent: #58a6ff; }  ※ カスタムプロパティ（CSS 変数）を定義する
color: var(--accent, blue);  ※ カスタムプロパティ
width: calc(100% - 2rem);  ※ 単位の違う値どうしを計算する
font-size: clamp(1rem, 2.5vw, 2rem);  ※ 最小・推奨・最大を指定する可変サイズ
@keyframes fade { from { opacity: 0; } }  ※ アニメーションの動きを定義する
animation: fade 0.5s ease-in-out infinite;  ※ 定義したアニメーションをくり返し再生する
transform: translate(-50%, -50%) rotate(45deg);  ※ 移動と回転。中央寄せの定番にも使う
grid-template-areas: "header header" "side main";  ※ 名前でグリッドの配置を決める
.card:has(img) { padding: 0; }  ※ 中に img を持つ要素だけに当てる
:is(h1, h2):not(.plain)  ※ セレクタをまとめる :is と、除外する :not
@container (min-width: 400px) {  ※ コンテナクエリ。親の幅で切り替える
@supports (display: grid) {  ※ ブラウザが対応しているときだけ適用する
aspect-ratio: 16 / 9;  ※ 縦横比を保つ
inset: 0;  ※ top、right、bottom、left をまとめて 0 にする
@media (prefers-color-scheme: dark) {  ※ ダークモードのときのスタイル
input::placeholder { color: gray; }  ※ 入力欄の薄い案内文の見た目
backdrop-filter: blur(8px);  ※ 背後をぼかす。すりガラスの効果
@layer base, components;  ※ カスケードレイヤー。優先順位を層で管理する

@@ ecosystem
@import "tailwindcss";  ※ Tailwind CSS v4 の読み込み
@apply px-4 py-2 rounded-lg;  ※ Tailwind CSS
$primary: #3498db;  ※ Sass の変数
@mixin center { display: flex; }  ※ Sass。使い回すスタイルを定義する
@include center;  ※ Sass。mixin を呼び出す
&:hover { opacity: 0.8; }  ※ 入れ子（Sass / ネイティブ CSS）
@use "sass:math";  ※ Sass の組み込みモジュールを読み込む
.btn-primary { @extend .btn; }  ※ Sass。ほかのセレクタのスタイルを引き継ぐ
@font-face { font-family: "Fira Code"; }  ※ Web フォントを定義する
.block__element--modifier  ※ BEM
composes: base from "./base.css";  ※ CSS Modules
npx postcss src.css -o dist.css  ※ PostCSS で CSS を変換する
`,
});
