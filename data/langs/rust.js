Codtec.register({
    id: 'rust',
    name: 'Rust',
    group: 'systems',
    words: String.raw`
@@ basics
fn main() {  ※ プログラムの入口
println!("Hello, world!");  ※ 1 行出力するマクロ。! はマクロの印
let mut x = 5;  ※ 変数は既定で不変。mut を付けると書き換えられる
let v: Vec<i32> = Vec::new();  ※ 空の可変長配列を作る
for i in 0..n {  ※ 0 から n-1 までくり返す
if let Some(x) = opt {  ※ Option に値があるときだけ取り出して処理する
match x { 0 => "zero", _ => "other" }  ※ パターンマッチ。_ は「それ以外」
struct Point { x: f64, y: f64 }  ※ 構造体の定義
impl Point {  ※ 型にメソッドを実装するブロック
pub fn new() -> Self {  ※ コンストラクタにあたる関連関数の慣例
use std::collections::HashMap;  ※ ハッシュマップを使えるようにする
let s = String::from("hello");  ※ ヒープに置かれる所有権つきの文字列
loop { break; }  ※ 無限ループ。break で抜ける
v.iter().map(|x| x * 2).collect()  ※ イテレータで変換して集め直す

@@ stdlib
let mut v = vec![1, 2, 3];  ※ vec! マクロで可変長配列を作る
v.push(4);  ※ 末尾に追加する
v.pop()  ※ 末尾を取り出す。結果は Option。スタックとして使える
v.len()  ※ 要素数
v.is_empty()  ※ 空かどうか
v.sort();  ※ 昇順に並べ替える（安定ソート）
v.sort_by(|a, b| b.cmp(a));  ※ 比較関数を渡して降順に並べる
v.sort_unstable_by_key(|p| p.1);  ※ キーを基準に並べ替える。安定でない分だけ速い
v.dedup();  ※ 連続する重複を取り除く。先にソートしておく
v.reverse();  ※ その場で逆順にする
v.contains(&3)  ※ 含まれているか
v.first()  ※ 先頭の要素。結果は Option
v.last().unwrap()  ※ 末尾の要素。空だとパニックする
v.iter().sum::<i32>()  ※ 合計。型を指定する
v.iter().max()  ※ 最大値。結果は Option
v.iter().filter(|&&x| x > 0).count()  ※ 条件に合う要素の個数
v.iter().position(|&x| x == 3)  ※ 条件に合う最初の位置
v.iter().any(|&x| x < 0)  ※ 1 つでも条件を満たすか
v.iter().rev()  ※ 逆順にたどるイテレータ
v.iter().zip(w.iter())  ※ 2 つの列を同時にたどる
v.iter().fold(0, |acc, x| acc + x)  ※ 畳み込み
v.windows(2)  ※ 隣り合う 2 個ずつのスライス
v.chunks(3)  ※ 3 個ずつのスライスに分ける
v.binary_search(&x)  ※ ソート済みスライスの二分探索
v.extend_from_slice(&other);  ※ ほかのスライスを末尾に足す
v.retain(|&x| x % 2 == 0);  ※ 条件に合う要素だけ残す
v.swap(0, 1);  ※ 2 つの位置の要素を入れ替える
&v[1..3]  ※ スライス。1 番目から 2 番目までを借りる
let mut map = HashMap::new();  ※ ハッシュマップを作る
map.insert("key", 1);  ※ キーと値を登録する
map.get("key")  ※ 値を取り出す。結果は Option
*map.entry(key).or_insert(0) += 1;  ※ なければ 0 を入れてから加算。数え上げの定番
map.contains_key("key")  ※ キーがあるかどうか
for (k, v) in &map {  ※ キーと値をたどる。順序は決まっていない
let mut set = HashSet::new();  ※ ハッシュ集合
BTreeMap::new()  ※ キーの順に並ぶマップ
let mut dq = VecDeque::new();  ※ 両端キュー。BFS で使う
dq.push_back(x);  ※ 末尾に追加する
dq.pop_front()  ※ 先頭を取り出す
let mut heap = BinaryHeap::new();  ※ 最大値が先に出る優先度付きキュー
heap.push(Reverse(x));  ※ Reverse で包むと最小ヒープになる
s.len()  ※ 文字列のバイト数。文字数ではない
s.chars().count()  ※ 文字数
s.chars().rev().collect::<String>()  ※ 文字列を逆順にする
s.push_str("abc");  ※ 文字列の末尾に足す
s.split_whitespace()  ※ 空白で区切る
s.split(',').collect::<Vec<_>>()  ※ 区切り文字で分けてベクタにする
s.trim().to_lowercase()  ※ 前後の空白を除いて小文字にする
s.starts_with("http")  ※ 指定した文字列で始まるか
s.replace("a", "b")  ※ 置き換えた新しい文字列を返す
s.as_bytes()[0]  ※ バイト列として 1 バイト目を読む
format!("{:>5} {:.2}", name, x)  ※ 書式つきで文字列を作る。右寄せと小数第 2 位
x.to_string()  ※ 文字列に変換する
"42".parse::<i32>()  ※ 文字列を数値にする。結果は Result
opt.unwrap_or(0)  ※ None なら既定値を使う
opt.map(|x| x * 2)  ※ Some の中身に関数を当てる
opt.ok_or("missing")?  ※ Option を Result に変えて、None なら返す
res.expect("failed to read")  ※ Err ならメッセージつきでパニックする
if let Ok(n) = res {  ※ 成功したときだけ中身を取り出す
a.max(b)  ※ 大きいほうを返す
x.abs()  ※ 絶対値
x.pow(2)  ※ 整数のべき乗
(x as f64).sqrt()  ※ 浮動小数点数に変換して平方根を取る
i64::MAX  ※ i64 の最大値
x.checked_add(y)  ※ オーバーフローすると None を返す足し算
std::fs::read_to_string("data.txt")?  ※ ファイルを文字列として読む
std::env::args().collect::<Vec<_>>()  ※ コマンドライン引数をベクタにする
io::stdin().read_line(&mut buf)?;  ※ 標準入力から 1 行読む
eprintln!("error: {e}");  ※ 標準エラー出力に書く
dbg!(&value);  ※ 式と値をデバッグ表示する
std::time::Instant::now()  ※ 経過時間の計測に使う時刻
std::process::exit(1);  ※ 終了コードを指定して終わる

@@ features
&mut self  ※ 自分自身への可変参照。状態を変えるメソッドの引数
fn longest<'a>(a: &'a str) -> &'a str  ※ ライフタイム注釈
Option<Box<Node>>  ※ 「次の節があるかもしれない」連結リストの定番
Result<(), Box<dyn Error>>  ※ 成功か、任意のエラーかを返す戻り値の型
let y = s.clone();  ※ 所有権を移さずに複製する
#[derive(Debug, Clone, PartialEq)]  ※ よく使うトレイトを自動で実装させる
impl Drop for Guard {  ※ スコープを抜けるときの後始末を書く
let n: i32 = s.trim().parse()?;  ※ ? でエラーを呼び出し元へ返す
.unwrap_or_default()  ※ 値がなければその型の既定値を使う
enum Shape { Circle(f64), Rect(f64, f64) }  ※ データを持てる列挙型（直和型）
trait Animal { fn name(&self) -> String; }  ※ トレイト。型が持つべき振る舞いの定義
where T: Clone + Send + 'static  ※ ジェネリクスの型に付ける条件（トレイト境界）
let Some(x) = it.next() else { return };  ※ let-else。取り出せなければ早期リターン
let len = s.len() as u32;  ※ as で数値型を変換する
impl From<io::Error> for AppError {  ※ エラー型の変換を定義。? で自動変換される
for (i, x) in v.iter().enumerate() {  ※ 添字つきで要素をたどる

@@ advanced
Arc<Mutex<Vec<u8>>>  ※ スレッド間で共有して書き換える定番の組み合わせ
Rc<RefCell<T>>  ※ 単一スレッドでの共有と内部可変性
unsafe { *ptr }  ※ 生ポインタの参照外し。安全性は書き手が保証する
async fn fetch() -> Result<String>  ※ 非同期関数。Future を返す
.await?  ※ 完了を待ち、エラーなら呼び出し元へ返す
macro_rules! vec_of {  ※ 宣言的マクロの定義
impl Iterator<Item = u32>  ※ 具体的な型を隠して「イテレータ」を返す
Box<dyn Fn(i32) -> i32 + Send>  ※ ヒープに置いたクロージャ（トレイトオブジェクト）
std::thread::spawn(move || {  ※ スレッドを起動。move で変数の所有権を渡す
let (tx, rx) = mpsc::channel();  ※ スレッド間でメッセージを送るチャネル
#[cfg(test)] mod tests {  ※ テスト時だけコンパイルされるモジュール
Pin<Box<dyn Future<Output = ()>>>  ※ メモリ上で動かせない Future を持つ型
PhantomData<T>  ※ 実データなしで型引数を使っていることにする印
#![no_std]  ※ 標準ライブラリなし。組み込みや OS 開発で使う
extern "C" fn callback()  ※ C から呼べる関数。FFI で使う
std::mem::swap(&mut a, &mut b);  ※ 2 つの値を入れ替える

@@ ecosystem
cargo build --release  ※ 最適化つきでビルドする
cargo add serde --features derive  ※ 依存クレートを追加する
#[derive(Serialize, Deserialize)]  ※ serde
#[tokio::main]  ※ tokio の非同期ランタイムで main を動かす
tokio::spawn(async move {  ※ 非同期タスクを起動する
use anyhow::{Context, Result};  ※ anyhow。アプリ向けの手軽なエラー処理
#[derive(Parser)]  ※ clap
use proconio::input;  ※ 競技プログラミングの入力マクロ
input! { n: usize, a: [i64; n] }  ※ proconio で n と長さ n の配列を読む
Router::new().route("/", get(root))  ※ axum
reqwest::get(url).await?.text().await?  ※ reqwest で HTTP GET して本文を取る
#[wasm_bindgen]  ※ WebAssembly で JavaScript と行き来するための属性
App::new().add_plugins(DefaultPlugins)  ※ Bevy
#[error("not found: {0}")]  ※ thiserror
cargo clippy -- -D warnings  ※ リンター。警告をエラーとして扱う
v.par_iter().sum::<i64>()  ※ rayon
#[tauri::command]  ※ Tauri。フロントエンドから呼べる関数にする
`,
});
