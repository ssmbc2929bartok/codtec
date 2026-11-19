Codtec.register({
    id: 'java',
    name: 'Java',
    group: 'app',
    words: String.raw`
@@ basics
public class Main {  ※ クラスの定義。ファイル名と同じ名前にする
public static void main(String[] args) {  ※ プログラムの入口になるメソッド
System.out.println("Hello");  ※ 標準出力に 1 行書く
int[] arr = new int[n];  ※ 長さ n の int 配列。0 で初期化される
Scanner sc = new Scanner(System.in);  ※ 標準入力を読むための定番クラス
String s = sc.nextLine();  ※ 1 行読み込む
for (int i = 0; i < n; i++) {  ※ n 回くり返す基本の for 文
for (String s : list) {  ※ 拡張 for 文。全要素を順にたどる
List<String> list = new ArrayList<>();  ※ 可変長リスト。型は List で受けるのが慣例
Map<String, Integer> map = new HashMap<>();  ※ ハッシュを使う連想配列
if (s.equals("yes")) {  ※ 文字列の比較は == ではなく equals
private final int id;  ※ 外から見えず、再代入もできないフィールド
return this.name;  ※ this は自分自身のインスタンス
import java.util.*;  ※ コレクションなどをまとめて読み込む

@@ stdlib
list.add("item");  ※ リストの末尾に追加する
list.get(0)  ※ 添字で取り出す
list.size()  ※ 要素数
list.isEmpty()  ※ 空かどうか
list.contains("item")  ※ 含まれているか
list.remove(list.size() - 1);  ※ 末尾を削除する
list.set(0, "first");  ※ 添字の位置を置き換える
list.indexOf("item")  ※ 値の位置。なければ -1
list.sort(Comparator.reverseOrder());  ※ 降順に並べ替える
list.forEach(System.out::println);  ※ 各要素に処理を行う。メソッド参照を渡す
List.of(1, 2, 3)  ※ 変更できないリストを作る
Arrays.asList(1, 2, 3)  ※ 配列からリストを作る
Arrays.sort(arr);  ※ 配列を昇順に並べ替える
Arrays.fill(dp, -1);  ※ 配列を同じ値で埋める
Arrays.toString(arr)  ※ 配列の中身を文字列にする
Arrays.stream(arr).sum()  ※ 配列の合計
Collections.sort(list);  ※ リストを昇順に並べ替える
Collections.reverse(list);  ※ リストを逆順にする
Collections.max(list)  ※ 最大値
Collections.swap(list, 0, 1);  ※ 2 つの位置の要素を入れ替える
map.put("key", 1);  ※ キーと値を登録する
map.get("key")  ※ 値を取り出す。なければ null
map.getOrDefault("key", 0)  ※ なければ既定値を返す
map.containsKey("key")  ※ キーがあるかどうか
map.merge(word, 1, Integer::sum);  ※ あれば足し、なければ入れる。数え上げの定番
map.computeIfAbsent(k, x -> new ArrayList<>()).add(v);  ※ なければ空リストを作ってから追加
for (var e : map.entrySet()) {  ※ キーと値の組をたどる
map.keySet()  ※ キーの集合
Set<Integer> seen = new HashSet<>();  ※ 重複を持たない集合
seen.add(x)  ※ 追加する。すでにあれば false を返す
new TreeMap<String, Integer>()  ※ キーの順に並ぶマップ（赤黒木）
new TreeSet<>(list).first()  ※ 順序つき集合の最小値
Deque<Integer> stack = new ArrayDeque<>();  ※ スタックやキューには ArrayDeque を使う
stack.push(x);  ※ スタックの一番上に積む
stack.pop()  ※ 一番上を取り出す
stack.peek()  ※ 一番上を見る。取り除きはしない
Queue<Integer> queue = new LinkedList<>();  ※ 先入れ先出しのキュー。BFS で使う
queue.offer(x);  ※ キューの末尾に追加する
queue.poll()  ※ キューの先頭を取り出す。空なら null
new PriorityQueue<Integer>()  ※ 最小値が先に出る優先度付きキュー
new PriorityQueue<>((a, b) -> b - a)  ※ 比較を逆にして最大ヒープにする
s.length()  ※ 文字列の長さ
s.charAt(0)  ※ 位置を指定して 1 文字取り出す
s.substring(0, 3)  ※ 部分文字列。終わりの位置は含まない
s.split(",")  ※ 区切り文字で分けて配列にする
s.trim().toLowerCase()  ※ 前後の空白を除いて小文字にする
s.contains("abc")  ※ 含まれているか
s.isBlank()  ※ 空か、空白だけかどうか
s.toCharArray()  ※ 文字の配列にする
String.join(", ", list)  ※ 区切り文字でつなげる
String.valueOf(42)  ※ 文字列に変換する
String.format("%05d %.2f", n, x)  ※ 書式つきで文字列を作る
sb.append("abc").reverse().toString()  ※ StringBuilder でつなげて逆順にする
Integer.MAX_VALUE  ※ int の最大値
Integer.toBinaryString(n)  ※ 2 進数の文字列にする
Long.parseLong(s)  ※ 文字列を long にする
Character.isDigit(c)  ※ 数字かどうか
Math.max(a, b)  ※ 大きいほうを返す
Math.abs(a - b)  ※ 絶対値
Math.pow(2, 10)  ※ べき乗。結果は double
Math.floorMod(x, m)  ※ 負の数でも 0 以上になる余り
new Random().nextInt(6) + 1  ※ 1 から 6 の乱数。サイコロ
System.currentTimeMillis()  ※ 現在時刻をミリ秒で返す
LocalDate.now().plusDays(7)  ※ 今日から 7 日後の日付
Files.readAllLines(Path.of("data.txt"))  ※ ファイルを行のリストとして読む
Thread.sleep(1000);  ※ 1 秒待つ
System.exit(1);  ※ 終了コードを指定して終わる

@@ features
@Override  ※ 親のメソッドを上書きしていることを示す注釈
public interface Runnable {  ※ インターフェース。実装すべきメソッドの約束
extends Thread implements Serializable  ※ 継承は 1 つ、インターフェースは複数実装できる
try {} catch (IOException e) {}  ※ 例外処理。検査例外は捕まえるか宣言が必要
throw new IllegalArgumentException(msg);  ※ 引数が不正なときに投げる定番の例外
try (var in = new FileReader(path)) {  ※ try-with-resources
public String toString() {  ※ 文字列表現を返す。出力やデバッグで使われる
static final long MOD = 1_000_000_007L;  ※ 定数の書き方。_ で桁を区切れる
Optional<String> opt = Optional.empty();  ※ null の代わりに「値がない」を表す型
list.stream().filter(x -> x > 0).toList();  ※ Stream API とラムダ式で絞り込む
record Point(int x, int y) {}  ※ レコード。不変のデータクラスを 1 行で定義
var sb = new StringBuilder();  ※ 文字列を効率よく連結する。var は型推論
enum Color { RED, GREEN, BLUE }  ※ 列挙型
Objects.requireNonNull(obj);  ※ null なら例外を投げて早めに気づく
if (obj instanceof String str) {  ※ 型の判定とキャストを同時に行う
public boolean equals(Object o) {  ※ 値の等しさを定義。hashCode とセットで書く

@@ advanced
synchronized (lock) {  ※ 排他制御。1 スレッドずつしか入れない
volatile boolean running;  ※ スレッド間で最新の値が見えることを保証する
Executors.newFixedThreadPool(4)  ※ スレッド 4 本のプールを作る
CompletableFuture.supplyAsync(() -> load());  ※ 非同期に計算して結果を後で受け取る
<T extends Comparable<T>> T max(List<T> xs)  ※ 比較できる型に限定したジェネリックメソッド
List<? super Integer>  ※ 下限境界ワイルドカード
sealed interface Shape permits Circle, Square  ※ 実装できるクラスを限定する（Java 17）
case String s -> s.length();  ※ switch のパターンマッチ
Collectors.groupingBy(User::getAge)  ※ ストリームをキーごとにまとめる
Thread.ofVirtual().start(task);  ※ 仮想スレッド（Java 21）
@FunctionalInterface  ※ ラムダ式で書けるインターフェースの印
Class<?> c = Class.forName(name);  ※ リフレクション。名前からクラスを得る
new ConcurrentHashMap<String, Long>()  ※ スレッドセーフなハッシュマップ
transient  ※ シリアライズの対象から外すフィールド修飾子
@SuppressWarnings("unchecked")  ※ コンパイラの警告を抑える

@@ ecosystem
@SpringBootApplication  ※ Spring Boot アプリの起点に付ける
@RestController  ※ Spring。JSON を返すコントローラ
@GetMapping("/users/{id}")  ※ Spring。GET リクエストをメソッドに結び付ける
@Autowired  ※ Spring。依存するオブジェクトを自動で注入する
@Entity @Table(name = "users")  ※ JPA。クラスをテーブルに対応させる
SpringApplication.run(App.class, args);  ※ Spring Boot を起動する
mvn clean package -DskipTests  ※ Maven。テストを飛ばしてビルドする
./gradlew build  ※ Gradle ラッパーでビルドする
@Test void addsNumbers() {  ※ JUnit
assertEquals(4, calc.add(2, 2));  ※ JUnit。期待値と実際の値を比べる
when(repo.findById(1L)).thenReturn(user);  ※ Mockito
@Data @Builder  ※ Lombok
new BufferedReader(new InputStreamReader(System.in))  ※ Scanner より速い入力。競プロの定番
Integer.parseInt(st.nextToken())  ※ 競技プログラミングの高速入力
setContentView(R.layout.activity_main);  ※ Android
findViewById(R.id.button)  ※ Android。レイアウト上の部品を取得する
extends JavaPlugin implements Listener  ※ Minecraft プラグイン
public void onEnable() {  ※ Minecraft プラグインが有効になったときの処理
@EventHandler  ※ Minecraft（Bukkit）のイベントを受け取るメソッドの印
`,
});
