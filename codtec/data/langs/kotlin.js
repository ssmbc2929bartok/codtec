Codtec.register({
    id: 'kotlin',
    name: 'Kotlin',
    group: 'app',
    words: String.raw`
@@ basics
fun main() {  ※ プログラムの入口
println("Hello, world!")  ※ 1 行出力する
val name = "Kotlin"  ※ val は再代入できない変数
var count = 0  ※ var は再代入できる変数
val list = listOf(1, 2, 3)  ※ 読み取り専用のリスト
val map = mutableMapOf<String, Int>()  ※ 書き換えられるマップ
for (i in 0 until n) {  ※ 0 から n-1 までくり返す
if (x in 1..10) {  ※ 範囲に含まれるかを in で調べる
fun add(a: Int, b: Int): Int = a + b  ※ 式が 1 つの関数は = で書ける
class User(val name: String, var age: Int)  ※ コンストラクタとプロパティを同時に定義
val n = readln().toInt()  ※ 1 行読んで整数にする
println("sum = \${a + b}")  ※ 文字列テンプレート
while (i < n) i++  ※ 条件が真の間くり返す
return null  ※ null を返す。戻り値の型に ? が必要

@@ stdlib
val nums = mutableListOf(1, 2, 3)  ※ 書き換えられるリスト
nums.add(4)  ※ 末尾に追加する
nums.removeLast()  ※ 末尾を取り出す。スタックとして使える
nums.size  ※ 要素数
nums.isEmpty()  ※ 空かどうか
nums.first()  ※ 先頭の要素。空だと例外
nums.lastOrNull()  ※ 末尾の要素。空なら null
nums.sorted()  ※ 昇順に並べた新しいリストを返す
nums.sortedByDescending { it }  ※ 降順に並べた新しいリストを返す
nums.sortBy { it.age }  ※ その場で並べ替える
nums.reversed()  ※ 逆順のリストを返す
nums.sum()  ※ 合計
nums.average()  ※ 平均
nums.maxOrNull()  ※ 最大値。空なら null
nums.count { it > 0 }  ※ 条件に合う要素の個数
nums.any { it < 0 }  ※ 1 つでも条件を満たすか
nums.all { it > 0 }  ※ 全部が条件を満たすか
nums.find { it > 1 }  ※ 条件に合う最初の要素。なければ null
nums.indexOf(3)  ※ 値の位置。なければ -1
nums.distinct()  ※ 重複を取り除く
nums.take(3)  ※ 先頭から 3 つ
nums.drop(1)  ※ 先頭の 1 つを除く
nums.chunked(2)  ※ 2 個ずつに分ける
nums.windowed(2)  ※ 隣り合う 2 個ずつを取り出す
nums.zip(names)  ※ 2 つのリストを組にする
nums.fold(0) { acc, x -> acc + x }  ※ 畳み込み
nums.groupBy { it % 2 }  ※ 値ごとにまとめたマップを作る
nums.partition { it > 0 }  ※ 条件で 2 つのリストに分ける
nums.associateWith { it * it }  ※ 要素をキーにしたマップを作る
nums.joinToString(", ")  ※ 区切り文字でつなげて文字列にする
nums.forEachIndexed { i, x -> println("$i: $x") }  ※ 添字つきで各要素を処理する
nums.withIndex()  ※ 添字つきでたどれるようにする
nums.flatMap { listOf(it, it) }  ※ 変換してから平らにする
nums.toIntArray()  ※ プリミティブの配列に変換する
IntArray(n) { 0 }  ※ 0 で埋めた長さ n の int 配列
Array(3) { IntArray(3) }  ※ 3x3 の二次元配列
map["key"] = 1  ※ マップに登録する
map.getOrDefault("key", 0)  ※ なければ既定値を返す
map.getOrPut("key") { mutableListOf() }  ※ なければ作って入れてから返す
map.containsKey("key")  ※ キーがあるかどうか
for ((k, v) in map) {  ※ キーと値を同時にたどる
map.filterValues { it > 0 }  ※ 値の条件で絞る
map.toSortedMap()  ※ キーの順に並んだマップにする
val seen = mutableSetOf<Int>()  ※ 重複を持たない集合
val stack = ArrayDeque<Int>()  ※ 両端キュー。スタックにもキューにもなる
stack.addLast(x)  ※ 末尾に追加する
stack.removeFirst()  ※ 先頭を取り出す。キューとして使う
PriorityQueue<Int>(compareByDescending { it })  ※ 最大値が先に出る優先度付きキュー
s.length  ※ 文字列の長さ
s.split(",").map { it.trim() }  ※ 区切って前後の空白を除く
s.uppercase()  ※ 大文字にする
s.substring(0, 3)  ※ 部分文字列
s.startsWith("http")  ※ 指定した文字列で始まるか
s.replace("a", "b")  ※ 文字列を置き換える
s.reversed()  ※ 文字列を逆順にする
s.toIntOrNull() ?: 0  ※ 整数にできなければ既定値を使う
s.isNullOrBlank()  ※ null か、空白だけかどうか
s.padStart(3, '0')  ※ 3 桁になるよう左を 0 で埋める
"%.2f".format(x)  ※ 書式つきで文字列を作る
buildString { append("a"); append("b") }  ※ 文字列を組み立てる
maxOf(a, b)  ※ 大きいほうを返す
x.coerceIn(0, 100)  ※ 値を範囲の中に収める
(1..6).random()  ※ 1 から 6 の乱数。サイコロ
repeat(3) { println(it) }  ※ 3 回くり返す
for (i in n downTo 1 step 2) {  ※ n から 1 まで 2 つ飛ばしで逆順にたどる
readln().split(" ").map { it.toInt() }  ※ 空白区切りの入力を整数のリストにする
Pair("a", 1)  ※ 2 つの値の組
val (name, age) = "Alice" to 20  ※ to で Pair を作って分解する
check(x > 0) { "x must be positive" }  ※ 状態が正しくなければ例外を投げる
measureTimeMillis { work() }  ※ 処理にかかった時間をミリ秒で測る
File("data.txt").readLines()  ※ ファイルを行のリストとして読む
System.currentTimeMillis()  ※ 現在時刻をミリ秒で返す

@@ features
val len = s?.length ?: 0  ※ セーフコールとエルビス演算子
data class Point(val x: Int, val y: Int)  ※ equals や copy が自動で付くデータ用クラス
when (x) { is String -> x.length else -> 0 }  ※ when 式。型の判定後は自動でキャストされる
list.filter { it > 0 }.map { it * 2 }  ※ ラムダの引数が 1 つなら it で書ける
fun String.shout() = uppercase() + "!"  ※ 拡張関数
object Config {  ※ シングルトンを宣言する
companion object {  ※ クラスに属するメンバ。static の代わり
sealed class Result<out T>  ※ 継承先を限定したクラス。状態の表現に使う
user?.let { println(it.name) }  ※ null でないときだけブロックを実行する
val lazyValue by lazy { compute() }  ※ 最初に使うときまで計算を遅らせる
lateinit var adapter: Adapter  ※ あとで初期化することを宣言する
val (x, y) = point  ※ 分解宣言。複数の値をまとめて取り出す
requireNotNull(id) { "id is null" }  ※ null なら例外を投げる
apply { timeout = 30 }  ※ スコープ関数。設定をまとめて書いて自分を返す
name!!.length  ※ null でないと言い切る。null なら例外になる

@@ advanced
suspend fun fetch(): Response  ※ 中断できる関数。コルーチンの基本
launch(Dispatchers.IO) {  ※ I/O 用のスレッドでコルーチンを起動する
val result = async { load() }.await()  ※ 並行に実行して結果を待つ
inline fun <reified T> parse(json: String): T  ※ 実行時にも型引数を使える inline 関数
flow { emit(1) }.collect { println(it) }  ※ Flow。非同期に流れてくる値の列
operator fun plus(other: Vec) = Vec(x + other.x)  ※ 演算子オーバーロード。+ を定義する
infix fun Int.pow(e: Int): Int  ※ 「a pow b」と書ける中置関数
tailrec fun gcd(a: Int, b: Int): Int  ※ 末尾再帰をループに最適化させる
typealias Handler = (Event) -> Unit  ※ 関数型などに別名を付ける
fun <T : Comparable<T>> max(a: T, b: T): T  ※ 上限つきのジェネリクス
@JvmStatic  ※ Java から static メソッドとして呼べるようにする
withContext(Dispatchers.Main) {  ※ 実行スレッドを切り替える。UI 更新で使う
value class UserId(val raw: Long)  ※ 実行時の負担なしで型を区別するクラス
runCatching { risky() }.getOrNull()  ※ 例外を Result に包み、失敗なら null
by Delegates.observable(0) { _, old, new -> }  ※ 値が変わるたびに通知を受ける委譲プロパティ

@@ ecosystem
@Composable  ※ Jetpack Compose の UI 関数に付ける
var text by remember { mutableStateOf("") }  ※ Jetpack Compose
Column(modifier = Modifier.padding(16.dp)) {  ※ Compose。子要素を縦に並べる
class MainActivity : ComponentActivity() {  ※ Android の画面（Activity）
setContent { MyAppTheme { Greeting() } }  ※ Compose の UI を Activity に表示する
viewModelScope.launch {  ※ ViewModel と寿命を合わせたコルーチン
val uiState: StateFlow<UiState>  ※ 画面の状態を公開する定番の型
@HiltViewModel  ※ Hilt。ViewModel に依存性を注入する
@Serializable  ※ kotlinx.serialization で JSON などに変換できるようにする
implementation("io.ktor:ktor-server-core")  ※ Gradle（Kotlin DSL）で依存関係を足す
routing { get("/") { call.respondText("ok") } }  ※ Ktor
./gradlew assembleDebug  ※ Android のデバッグ版をビルドする
plugins { kotlin("jvm") version "2.0.0" }  ※ Gradle で Kotlin プラグインを有効にする
@Dao interface UserDao {  ※ Room
LazyColumn { items(users) { UserRow(it) } }  ※ Compose。画面に見える分だけ描くリスト
`,
});
