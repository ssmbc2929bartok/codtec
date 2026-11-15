Codtec.register({
    id: 'php',
    name: 'PHP',
    group: 'script',
    words: String.raw`
@@ basics
<?php  ※ PHP のコードの始まり
echo "Hello, world!";  ※ 文字列を出力する
$name = "PHP";  ※ 変数は $ で始まる
$nums = [1, 2, 3];  ※ 配列
foreach ($nums as $n) {  ※ 配列の全要素をたどる
for ($i = 0; $i < $n; $i++) {  ※ 基本の for 文
function add($a, $b) {  ※ 関数の定義
return $a + $b;  ※ 値を返す
if ($x === null) {  ※ === は型も含めて比較する
$user = ["name" => "Alice", "age" => 20];  ※ 連想配列。キーと値の対応
echo "Hello, {$user['name']}";  ※ 二重引用符の中では変数が展開される
class User {  ※ クラスの定義
$this->name = $name;  ※ 自分自身のプロパティに代入する
require_once "config.php";  ※ ファイルを 1 度だけ読み込む

@@ stdlib
count($nums)  ※ 配列の要素数
$nums[] = 4;  ※ 配列の末尾に追加する
array_push($stack, $x);  ※ 末尾に追加。スタックに積む
array_pop($stack)  ※ 末尾を取り出す
array_shift($queue)  ※ 先頭を取り出す。キューとして使う
array_unshift($nums, 0);  ※ 先頭に追加する
array_sum($nums) / count($nums)  ※ 平均を求める
max($nums)  ※ 最大値
sort($nums);  ※ 昇順に並べ替える。配列そのものが変わる
rsort($nums);  ※ 降順に並べ替える
ksort($scores);  ※ キーの順に並べ替える
arsort($scores);  ※ 値の降順に並べ替える。キーとの対応は保つ
in_array($x, $nums, true)  ※ 含まれているか。true で型も比べる
array_key_exists("name", $user)  ※ キーがあるかどうか
array_keys($user)  ※ キーの一覧
array_values($user)  ※ 値の一覧。添字を振り直すのにも使う
array_merge($a, $b)  ※ 配列をつなげる
array_slice($nums, 0, 3)  ※ 先頭から 3 つを切り出す
array_unique($nums)  ※ 重複を取り除く
array_reverse($nums)  ※ 逆順にした配列を返す
array_search($x, $nums)  ※ 値を探して、見つかったキーを返す
array_column($users, "name")  ※ 配列の配列から 1 列を取り出す
array_reduce($nums, fn($c, $n) => $c + $n, 0)  ※ 畳み込み。ここでは合計
array_combine($keys, $values)  ※ キーの配列と値の配列から連想配列を作る
array_fill(0, 5, 0)  ※ 同じ値で埋めた配列を作る
range(1, 10)  ※ 1 から 10 の連番の配列
compact("name", "age")  ※ 変数名から連想配列を作る
[$a, $b] = [$b, $a];  ※ 分割代入で値を入れ替える
strlen($s)  ※ バイト数。日本語は mb_strlen を使う
mb_strlen($s)  ※ 文字数。マルチバイト文字に対応
mb_substr($s, 0, 10)  ※ 先頭から 10 文字を取り出す
str_replace("a", "b", $s)  ※ 文字列を置き換える
explode(",", $csv)  ※ 区切り文字で分けて配列にする
trim($line)  ※ 前後の空白を取り除く
strtoupper($s)  ※ 大文字にする
str_contains($s, "abc")  ※ 含まれているか（PHP 8）
str_starts_with($url, "https")  ※ 指定した文字列で始まるか（PHP 8）
sprintf("%05.2f", $price)  ※ 書式を指定して文字列を作る
number_format($price)  ※ 3 桁ごとにカンマで区切る
preg_match("/^\d+$/", $s)  ※ 正規表現に合うか
intval($s)  ※ 整数に変換する
is_numeric($s)  ※ 数値として読めるか
date("Y-m-d H:i:s")  ※ 現在の日時を書式つきで文字列にする
strtotime("+1 week")  ※ 文章の日時をタイムスタンプにする
json_decode($body, true)  ※ JSON を連想配列にする
file_get_contents("data.json")  ※ ファイルの中身をまとめて読む
file_put_contents("log.txt", $line, FILE_APPEND);  ※ ファイルに追記する
var_dump($value);  ※ 型と中身を表示する。デバッグの定番
random_int(1, 6)  ※ 安全な乱数。サイコロ
new SplStack()  ※ 標準のスタック
new SplPriorityQueue()  ※ 標準の優先度付きキュー

@@ features
$name = $_GET["name"] ?? "guest";  ※ null 合体演算子
foreach ($users as $id => $user) {  ※ キーと値を同時にたどる
array_map(fn($x) => $x * 2, $nums)  ※ アロー関数
htmlspecialchars($s, ENT_QUOTES, "UTF-8")  ※ XSS 対策の基本
public function __construct(private string $name)  ※ 引数でプロパティを宣言する（PHP 8）
declare(strict_types=1);  ※ 型を厳密に検査するモードにする
$user?->profile?->name  ※ null セーフ演算子。途中が null なら null
count($items) === 0  ※ 配列が空かどうかの判定
implode(", ", $names)  ※ 配列を区切り文字でつなげる
isset($_POST["email"])  ※ 変数や要素が存在して null でないか
namespace App\Models;  ※ 名前空間の宣言
use App\Models\User;  ※ ほかの名前空間のクラスを使う
function find(int $id): ?User  ※ 引数と戻り値の型宣言。? は null を許す
json_encode($data, JSON_UNESCAPED_UNICODE)  ※ JSON にする。日本語をそのまま出す
<?= $title ?>  ※ 値を出力する短い書き方。テンプレートで使う
$a <=> $b  ※ 宇宙船演算子。大小を -1、0、1 で返す

@@ advanced
match ($status) { 200 => "ok", default => "ng" }  ※ match 式。厳密に比較して値を返す
enum Suit: string { case Hearts = "H"; }  ※ 値つきの列挙型（PHP 8.1）
readonly class Point  ※ 全プロパティが読み取り専用のクラス
abstract public function handle(): void;  ※ 抽象メソッド。子クラスが実装する
trait Loggable {  ※ トレイト。メソッドをクラスに混ぜ込む
static::create()  ※ 遅延静的束縛
function gen() { yield 1; yield 2; }  ※ ジェネレータ。値を 1 つずつ返す
try { } catch (PDOException $e) { }  ※ データベースの例外を捕まえる
#[Route("/users", methods: ["GET"])]  ※ アトリビュート。Symfony のルーティング
array_filter($a, fn($v) => $v > 0)  ※ 条件に合う要素だけ残す
public function __get(string $key)  ※ 存在しないプロパティの読み取りを受ける
$pdo->prepare("SELECT * FROM users WHERE id = ?")  ※ プリペアドステートメント。SQL インジェクション対策
interface HasName { public function name(): string; }  ※ インターフェース
usort($users, fn($a, $b) => $a->age <=> $b->age);  ※ 比較関数を渡して並べ替える
password_hash($pw, PASSWORD_DEFAULT)  ※ パスワードを安全にハッシュ化する

@@ ecosystem
composer require laravel/framework  ※ Composer でパッケージを入れる
php artisan make:model Post -m  ※ Laravel。モデルとマイグレーションを作る
php artisan migrate  ※ Laravel。データベースに変更を反映する
Route::get("/users", [UserController::class, "index"]);  ※ Laravel のルーティング
User::where("active", true)->get();  ※ Eloquent
return view("home", ["user" => $user]);  ※ Laravel。ビューに値を渡して返す
$request->validate(["email" => "required|email"]);  ※ Laravel の入力検証
@foreach ($posts as $post)  ※ Blade
{{ $post->title }}  ※ Blade。エスケープして出力する
Schema::create("posts", function (Blueprint $table) {  ※ Laravel のマイグレーションでテーブルを作る
$table->foreignId("user_id")->constrained();  ※ 外部キーの列を作る
add_action("init", "register_post_types");  ※ WordPress
get_template_part("content", "page");  ※ WordPress。テンプレートの部品を読み込む
the_title();  ※ WordPress。投稿のタイトルを出力する
vendor/bin/phpunit  ※ PHPUnit のテストを実行する
$this->assertSame(4, add(2, 2));  ※ PHPUnit。型も含めて等しいか確かめる
`,
});
