Codtec.register({
    id: 'csharp',
    name: 'C#',
    group: 'app',
    words: String.raw`
@@ basics
using System;  ※ Console などの基本機能を使えるようにする
static void Main(string[] args)  ※ プログラムの入口
Console.WriteLine("Hello, world!");  ※ 1 行出力する
int n = int.Parse(Console.ReadLine());  ※ 1 行読んで整数に変換する
var list = new List<int>();  ※ 可変長リスト。var は型推論
string[] parts = line.Split(' ');  ※ 空白で区切って配列にする
for (int i = 0; i < n; i++)  ※ n 回くり返す基本の for 文
foreach (var item in items)  ※ 全要素を順にたどる
if (x is null) return;  ※ null かどうかの判定
public class Player  ※ クラスの定義
private int _score;  ※ 非公開フィールド。_ で始める慣例
namespace Game.Core;  ※ ファイル全体に効く名前空間の宣言
var dict = new Dictionary<string, int>();  ※ 連想配列
return true;  ※ 真偽値を返す

@@ stdlib
list.Add(4);  ※ リストの末尾に追加する
list.Count  ※ リストの要素数。配列は Length
list.Remove(3);  ※ 値を指定して削除する
list.RemoveAt(0);  ※ 位置を指定して削除する
list.Insert(0, x);  ※ 位置を指定して挿入する
list.Contains(3)  ※ 含まれているか
list.IndexOf(3)  ※ 値の位置。なければ -1
list.Sort();  ※ その場で昇順に並べ替える
list.Reverse();  ※ その場で逆順にする
list.AddRange(other);  ※ ほかのコレクションをまとめて足す
list.ToArray()  ※ 配列に変換する
list.ForEach(Console.WriteLine);  ※ 各要素に処理を行う
list[^1]  ※ 末尾の要素。^ は後ろから数える
arr[1..3]  ※ 範囲を指定して一部を取り出す
Array.Sort(arr);  ※ 配列を昇順に並べ替える
Array.Fill(dp, -1);  ※ 配列を同じ値で埋める
new int[n, m]  ※ 二次元配列
nums.Sum()  ※ LINQ。合計
nums.Max()  ※ LINQ。最大値
nums.Average()  ※ LINQ。平均
nums.Count(x => x > 0)  ※ LINQ。条件に合う要素の個数
nums.Any(x => x < 0)  ※ LINQ。1 つでも条件を満たすか
nums.All(x => x > 0)  ※ LINQ。全部が条件を満たすか
nums.First()  ※ LINQ。先頭の要素。空だと例外
nums.FirstOrDefault(x => x > 1)  ※ LINQ。条件に合う最初の要素。なければ既定値
nums.OrderByDescending(x => x)  ※ LINQ。降順に並べる
nums.Distinct()  ※ LINQ。重複を取り除く
nums.Take(3).ToList()  ※ LINQ。先頭の 3 つをリストにする
nums.Skip(1)  ※ LINQ。先頭の 1 つを飛ばす
nums.GroupBy(x => x % 2)  ※ LINQ。キーごとにまとめる
nums.ToDictionary(x => x, x => x * x)  ※ LINQ。辞書に変換する
nums.Aggregate(0, (acc, x) => acc + x)  ※ LINQ。畳み込み
nums.Zip(names)  ※ LINQ。2 つの列を組にする
nums.Chunk(2)  ※ LINQ。2 個ずつに分ける
Enumerable.Range(1, 10)  ※ 1 から 10 個の連番
dict["key"] = 1;  ※ 辞書に登録する。あれば上書き
dict.TryGetValue("key", out var value)  ※ 例外を出さずに値を取り出す
dict.ContainsKey("key")  ※ キーがあるかどうか
dict.GetValueOrDefault("key", 0)  ※ なければ既定値を返す
foreach (var (key, value) in dict)  ※ キーと値を同時にたどる
var seen = new HashSet<int>();  ※ 重複を持たない集合
var stack = new Stack<int>();  ※ 後入れ先出しのスタック
stack.Push(x);  ※ スタックの一番上に積む
stack.Pop()  ※ 一番上を取り出す
stack.Peek()  ※ 一番上を見る。取り除きはしない
var queue = new Queue<int>();  ※ 先入れ先出しのキュー。BFS で使う
queue.Enqueue(x);  ※ キューの末尾に追加する
queue.Dequeue()  ※ キューの先頭を取り出す
var pq = new PriorityQueue<string, int>();  ※ 優先度の小さい順に出てくるキュー
pq.Enqueue("task", 1);  ※ 要素と優先度を渡して追加する
new SortedDictionary<string, int>()  ※ キーの順に並ぶ辞書
new LinkedList<int>()  ※ 双方向連結リスト
s.Length  ※ 文字列の長さ
s.Substring(0, 3)  ※ 部分文字列。開始位置と長さを渡す
s.Trim().ToLower()  ※ 前後の空白を除いて小文字にする
s.Contains("abc")  ※ 含まれているか
s.StartsWith("http")  ※ 指定した文字列で始まるか
s.Replace("a", "b")  ※ 文字列を置き換える
s.PadLeft(3, '0')  ※ 3 桁になるよう左を 0 で埋める
string.Join(", ", nums)  ※ 区切り文字でつなげる
string.IsNullOrWhiteSpace(s)  ※ null か、空白だけかどうか
new StringBuilder().Append("a").ToString()  ※ 文字列を効率よく組み立てる
x.ToString("F2")  ※ 小数第 2 位までの文字列にする
Convert.ToInt32("42")  ※ 整数に変換する
Math.Max(a, b)  ※ 大きいほうを返す
Math.Abs(a - b)  ※ 絶対値
Math.Round(x, 2)  ※ 小数第 2 位に丸める
Math.Sqrt(x)  ※ 平方根
int.MaxValue  ※ int の最大値
Random.Shared.Next(1, 7)  ※ 1 から 6 の乱数。上限は含まない
DateTime.Now.ToString("yyyy-MM-dd")  ※ 現在の日付を書式つきで文字列にする
TimeSpan.FromSeconds(30)  ※ 30 秒の時間間隔
File.ReadAllLines("data.txt")  ※ ファイルを行の配列として読む
Path.Combine(dir, name)  ※ OS に合った区切りでパスをつなぐ
JsonSerializer.Serialize(user)  ※ オブジェクトを JSON にする
Stopwatch.StartNew()  ※ 経過時間の計測を始める
Environment.Exit(1);  ※ 終了コードを指定して終わる

@@ features
public string Name { get; set; }  ※ 自動実装プロパティ
public int Count { get; private set; }  ※ 読むのは自由、書くのはクラス内だけ
var name = user?.Name ?? "guest";  ※ null 条件演算子と null 合体演算子
Console.WriteLine($"Hello, {name}!");  ※ 文字列補間
items.Where(x => x > 0).Select(x => x * 2)  ※ LINQ。絞り込みと変換をつなげる
public record Point(int X, int Y);  ※ レコード。値で比較される不変のデータ型
using var stream = File.OpenRead(path);  ※ スコープを抜けると自動で Dispose される
public event EventHandler? Changed;  ※ イベント。変更を購読者に通知する
if (obj is string { Length: > 0 } s)  ※ プロパティパターン。型と中身を同時に判定
public override string ToString() => Name;  ※ 式形式のメンバ。1 行で書ける
out var result  ※ 引数経由で結果を受け取り、その場で変数を宣言
int.TryParse(text, out var n)  ※ 失敗しても例外を投げない変換
public interface IRepository<T>  ※ ジェネリックなインターフェース。I で始める慣例
nameof(value)  ※ 変数名を文字列として得る。リネームに強い
var (x, y) = point;  ※ 分解。複数の値をまとめて取り出す
throw new ArgumentNullException(nameof(arg));  ※ 引数が null のときの定番の例外

@@ advanced
public async Task<string> GetAsync()  ※ 非同期メソッド。Task を返す
await Task.WhenAll(tasks);  ※ 複数の非同期処理がすべて終わるのを待つ
where T : class, new()  ※ ジェネリクスの型制約
IEnumerable<int> Range() { yield return 1; }  ※ イテレータ。値を 1 つずつ返す
Func<int, int> square = x => x * x;  ※ 関数を値として持つデリゲート型
Span<byte> buffer = stackalloc byte[256];  ※ スタック上のバッファ。GC の負担を避ける
lock (_gate) { _count++; }  ※ 排他制御
public static T Max<T>(T a, T b)  ※ ジェネリックメソッド
x switch { 0 => "zero", _ => "many" }  ※ switch 式。値を返すパターンマッチ
[Obsolete("Use NewMethod instead")]  ※ 非推奨の印。使うと警告が出る
ref readonly struct  ※ スタックにだけ置ける読み取り専用の構造体
await foreach (var item in stream)  ※ 非同期ストリームを順に受け取る
CancellationToken ct = default  ※ 処理の中断を伝える仕組み
Interlocked.Increment(ref _count);  ※ ロックなしで安全に 1 増やす
public static implicit operator int(Id id)  ※ 暗黙の型変換を定義する
typeof(T).GetProperties()  ※ リフレクションでプロパティ一覧を得る

@@ ecosystem
using UnityEngine;  ※ Unity の基本機能を読み込む
public class Player : MonoBehaviour  ※ Unity。ゲームオブジェクトに付けるスクリプト
void Update() {  ※ Unity の毎フレーム処理
[SerializeField] private float speed = 5f;  ※ Unity。非公開のままエディタで編集できる
transform.Translate(Vector3.forward * Time.deltaTime);  ※ Unity。フレームレートによらず前へ進める
GetComponent<Rigidbody>().AddForce(Vector3.up);  ※ Unity。物理コンポーネントに力を加える
Debug.Log("Hit!");  ※ Unity のコンソールにログを出す
StartCoroutine(Fade());  ※ Unity。数フレームにまたがる処理を始める
void OnCollisionEnter(Collision other)  ※ Unity。衝突した瞬間に呼ばれる
Instantiate(prefab, pos, Quaternion.identity);  ※ Unity。プレハブからオブジェクトを生成する
var builder = WebApplication.CreateBuilder(args);  ※ ASP.NET Core
app.MapGet("/", () => "Hello");  ※ ASP.NET Core の Minimal API
[ApiController]  ※ ASP.NET Core。Web API のコントローラの印
[HttpGet("{id}")]  ※ GET リクエストとパスをメソッドに結び付ける
services.AddDbContext<AppDbContext>();  ※ Entity Framework Core
dotnet new console -o MyApp  ※ コンソールアプリのひな形を作る
dotnet run --project src/Api  ※ プロジェクトをビルドして実行する
[Fact] public void Adds() => Assert.Equal(4, 2 + 2);  ※ xUnit のテスト
`,
});
