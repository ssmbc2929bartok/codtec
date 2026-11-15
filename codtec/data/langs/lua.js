Codtec.register({
    id: 'lua',
    name: 'Lua',
    group: 'script',
    words: String.raw`
@@ basics
print("Hello, world!")  ※ 1 行出力する
local x = 10  ※ local を付けないとグローバル変数になる
local function add(a, b)  ※ ローカル関数の定義
return a + b  ※ 値を返す
end  ※ 関数や if、ループのブロックを閉じる
if x > 0 then  ※ 条件分岐。then が必要
elseif x == 0 then  ※ elseif は 1 語で書く
for i = 1, 10 do  ※ 1 から 10 までくり返す
while n > 0 do  ※ 条件が真の間くり返す
local t = {1, 2, 3}  ※ テーブル。配列としても辞書としても使う
local user = { name = "Alice", age = 20 }  ※ キーつきのテーブル
print("name: " .. user.name)  ※ 文字列の連結は ..
x = x + 1  ※ += はないので、こう書く
-- comment  ※ コメントは -- で始める
local done = false  ※ 偽になるのは false と nil だけ
local s = nil  ※ nil は「値がない」ことを表す

@@ stdlib
table.insert(t, value)  ※ 配列の末尾に追加する
table.insert(t, 1, value)  ※ 先頭に挿入する
table.remove(t)  ※ 末尾を取り出す。スタックとして使える
table.remove(t, 1)  ※ 先頭を取り出す。キューとして使える
table.sort(t)  ※ 昇順に並べ替える
table.sort(t, function(a, b) return a > b end)  ※ 比較関数を渡して降順に並べる
table.concat(t, ", ")  ※ 要素を区切り文字でつなげる
table.unpack(t)  ※ テーブルの要素を複数の値として展開する
#t  ※ テーブルの長さ
t[#t + 1] = value  ※ 末尾に追加するもう 1 つの書き方
t[#t]  ※ 末尾の要素
t[key] = nil  ※ nil を代入すると要素が消える
next(t) == nil  ※ テーブルが空かどうかの判定
string.format("%d items", n)  ※ 書式を指定して文字列を作る
string.format("%5.2f", x)  ※ 小数第 2 位までの表示にする
string.len(s)  ※ 文字列の長さ。#s でも同じ
string.sub(s, 1, 3)  ※ 1 文字目から 3 文字目まで
string.upper(s)  ※ 大文字にする
string.rep("-", 20)  ※ 文字列を 20 回くり返す
string.reverse(s)  ※ 文字列を逆順にする
string.find(s, "lua", 1, true)  ※ 位置を探す。true でパターンを使わない
string.byte(s, 1)  ※ 1 文字目の文字コード
string.char(65)  ※ 文字コードから文字を作る
s:match("^%d+$")  ※ パターンに合うか。数字だけかの判定
s:gsub("%s+", " ")  ※ 連続する空白を 1 つにまとめる
tostring(42)  ※ 文字列に変換する
tonumber("3.14")  ※ 数値に変換する。失敗すると nil
type(x) == "table"  ※ 型を文字列で調べる
math.floor(x / 2)  ※ 小数点以下を切り捨てる
math.max(a, b)  ※ 大きいほうを返す
math.random(1, 6)  ※ 1 から 6 の乱数。サイコロ
math.sqrt(x)  ※ 平方根
math.abs(x)  ※ 絶対値
math.pi  ※ 円周率
math.huge  ※ 無限大。最小値探しの初期値に使う
x // 2  ※ 整数の割り算（Lua 5.3 以降）
x % 2 == 0  ※ 偶数かどうか
os.time()  ※ 現在時刻を秒で返す
os.date("%Y-%m-%d")  ※ 日付を書式つきで文字列にする
os.clock()  ※ CPU 時間。処理時間の計測に使う
os.getenv("HOME")  ※ 環境変数を読む
io.write("no newline")  ※ 改行なしで出力する
io.read("n")  ※ 数値を 1 つ読む
local f = io.open("data.txt", "r")  ※ ファイルを開く
for line in io.lines("data.txt") do  ※ ファイルを 1 行ずつ読む
f:close()  ※ ファイルを閉じる
require("module")  ※ モジュールを読み込む
assert(x > 0, "x must be positive")  ※ 条件が偽ならエラーにする

@@ features
for i, v in ipairs(t) do  ※ 配列は 1 から始まる
for k, v in pairs(t) do  ※ テーブルの全要素をたどる。順序は決まっていない
local name = opts.name or "guest"  ※ or で既定値を与える定番
if x ~= nil then  ※ 「等しくない」は ~=
local a, b = f()  ※ 複数の値を返せる
function obj:method() return self.x end  ※ コロンで定義すると self が自動で渡る
local M = {}  ※ モジュール用のテーブルを作る
return M  ※ ファイルの最後でモジュールを返す
repeat n = n - 1 until n == 0  ※ 後判定のループ
select("#", ...)  ※ 可変長引数の個数
s:sub(1, 3):upper()  ※ 文字列のメソッドをコロンでつなげる
local function sum(...)  ※ 可変長引数を受け取る関数
local t2 = { [1] = "a", ["key"] = "b" }  ※ キーを角括弧で明示する書き方
a, b = b, a  ※ 多重代入で値を入れ替える
local n = cond and 1 or 0  ※ and と or で三項演算子の代わりにする
local add = function(a, b) return a + b end  ※ 関数は値。変数に入れられる

@@ advanced
setmetatable(obj, { __index = Class })  ※ メタテーブル。クラスや継承を作る土台
Class.__index = Class  ※ クラス風の書き方の定番
__add = function(a, b) return a.x + b.x end  ※ + 演算子の動作を定義するメタメソッド
local co = coroutine.create(fn)  ※ コルーチンを作る
coroutine.yield(value)  ※ コルーチンを中断して値を返す
coroutine.resume(co)  ※ コルーチンを再開する
local ok, err = pcall(risky)  ※ 保護つきで呼び出す。例外処理にあたる
error("invalid state", 2)  ※ エラーを起こす。2 は呼び出し元を指す
local unpack = table.unpack or unpack  ※ Lua 5.1 と 5.2 以降の違いを吸収する
string.gsub(s, "%s+", " ")  ※ パターンで置換する。正規表現とは少し違う
for word in s:gmatch("%a+") do  ※ パターンに合う部分を順に取り出す
rawget(t, key)  ※ メタテーブルを通さずに値を読む
goto continue  ※ continue がないので goto で代用する
::continue::  ※ goto の飛び先になるラベル
local _ENV = { print = print }  ※ 使えるグローバルを制限する（サンドボックス）
__tostring = function(self) return self.name end  ※ tostring の結果を決めるメタメソッド
__call = function(self, x) return x * 2 end  ※ テーブルを関数のように呼べるようにする
collectgarbage("count")  ※ 使用中のメモリ量を調べる

@@ ecosystem
function love.load()  ※ LOVE（2D ゲーム）
function love.update(dt)  ※ LOVE。毎フレームの更新処理
love.graphics.print("Score", 10, 10)  ※ LOVE。画面に文字を描く
love.keyboard.isDown("space")  ※ LOVE。キーが押されているか
vim.keymap.set("n", "<leader>w", ":w<CR>")  ※ Neovim
vim.opt.number = true  ※ Neovim。行番号を表示する設定
require("lazy").setup(plugins)  ※ Neovim のプラグイン管理 lazy.nvim
vim.api.nvim_create_autocmd("BufWritePre", {})  ※ Neovim。保存の直前に動く処理を登録する
game.Players.PlayerAdded:Connect(onJoin)  ※ Roblox
local part = Instance.new("Part")  ※ Roblox。ブロックを生成する
script.Parent.Touched:Connect(onTouch)  ※ Roblox。触れられたときの処理をつなぐ
ngx.say("hello")  ※ OpenResty
redis.call("INCR", KEYS[1])  ※ Redis のスクリプト
luarocks install busted  ※ LuaRocks でテストツール busted を入れる
`,
});
