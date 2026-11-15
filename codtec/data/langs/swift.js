Codtec.register({
    id: 'swift',
    name: 'Swift',
    group: 'app',
    words: String.raw`
@@ basics
print("Hello, world!")  ※ 1 行出力する
let name = "Swift"  ※ let は定数
var count = 0  ※ var は変数
let nums: [Int] = [1, 2, 3]  ※ 整数の配列
var dict = [String: Int]()  ※ 空の辞書（連想配列）を作る
for i in 0..<n {  ※ 0 から n-1 までくり返す半開区間
func add(_ a: Int, _ b: Int) -> Int {  ※ _ を付けると呼び出し側でラベルを省ける
if x > 0 { return x }  ※ 条件に括弧は不要。波括弧は必須
struct Point { var x: Double; var y: Double }  ※ 構造体。値型でコピーされる
class ViewModel {  ※ クラス。参照型で共有される
let s = "sum = \(a + b)"  ※ 文字列補間
while let line = readLine() {  ※ 入力がなくなるまで 1 行ずつ読む
import Foundation  ※ 日付や文字列処理などの基本ライブラリ
switch value { case 1: break; default: break }  ※ switch は全パターンを網羅する必要がある

@@ stdlib
nums.append(4)  ※ 配列の末尾に追加する
nums.removeLast()  ※ 末尾を取り出す。スタックとして使える
nums.removeFirst()  ※ 先頭を取り出す。O(n)
nums.insert(0, at: 0)  ※ 位置を指定して挿入する
nums.count  ※ 要素数
nums.isEmpty  ※ 空かどうか
nums.first  ※ 先頭の要素。結果はオプショナル
nums.last ?? 0  ※ 末尾の要素。空なら 0
nums.contains(3)  ※ 含まれているか
nums.sorted()  ※ 昇順に並べた新しい配列を返す
nums.sort(by: >)  ※ その場で降順に並べ替える
nums.sorted { $0.age < $1.age }  ※ 比べ方を指定して並べ替える
nums.reversed()  ※ 逆順にたどれるようにする
nums.reduce(0, +)  ※ 畳み込み。ここでは合計
nums.max()  ※ 最大値。結果はオプショナル
nums.firstIndex(of: 3)  ※ 値の位置。結果はオプショナル
nums.first(where: { $0 > 1 })  ※ 条件に合う最初の要素
nums.allSatisfy { $0 > 0 }  ※ 全部が条件を満たすか
nums.contains(where: { $0 < 0 })  ※ 1 つでも条件を満たすか
nums.prefix(3)  ※ 先頭から 3 つ
nums.dropFirst()  ※ 先頭の 1 つを除く
nums.suffix(2)  ※ 末尾の 2 つ
nums.shuffled()  ※ ランダムに並べ替えた配列を返す
nums.randomElement()  ※ ランダムに 1 つ選ぶ
nums.enumerated()  ※ 添字つきでたどれるようにする
nums.compactMap { Int($0) }  ※ 変換して nil を取り除く
nums.flatMap { [$0, $0] }  ※ 変換してから平らにする
nums.joined(separator: ", ")  ※ 文字列の配列を区切り文字でつなげる
nums.swapAt(0, 1)  ※ 2 つの位置の要素を入れ替える
nums.removeAll { $0 < 0 }  ※ 条件に合う要素をすべて取り除く
nums[1...2]  ※ 範囲を指定して一部を取り出す
Array(repeating: 0, count: 10)  ※ 0 で埋めた長さ 10 の配列
zip(names, ages)  ※ 2 つの列を組にしてたどる
stride(from: 0, to: 10, by: 2)  ※ 0 から 2 つ飛ばしで 10 未満まで
dict["key"] = 1  ※ 辞書に登録する
dict["key", default: 0] += 1  ※ なければ 0 から加算。数え上げの定番
dict.removeValue(forKey: "key")  ※ キーを削除する
dict.keys.sorted()  ※ キーの一覧を並べ替える
for (key, value) in dict {  ※ キーと値を同時にたどる。順序は決まっていない
dict.mapValues { $0 * 2 }  ※ 値だけを変換した辞書を作る
Dictionary(grouping: users, by: \.team)  ※ キーごとにまとめた辞書を作る
var seen = Set<Int>()  ※ 重複を持たない集合
seen.insert(x)  ※ 集合に追加する
a.intersection(b)  ※ 集合の共通部分
s.count  ※ 文字数
s.isEmpty  ※ 空の文字列かどうか
s.uppercased()  ※ 大文字にする
s.hasPrefix("http")  ※ 指定した文字列で始まるか
s.split(separator: ",")  ※ 区切り文字で分ける
s.replacingOccurrences(of: "a", with: "b")  ※ 文字列を置き換える（Foundation）
s.trimmingCharacters(in: .whitespaces)  ※ 前後の空白を取り除く（Foundation）
String(s.reversed())  ※ 文字列を逆順にする
String(format: "%.2f", x)  ※ 書式つきで文字列を作る
String(42)  ※ 文字列に変換する
Double(text) ?? 0.0  ※ 小数に変換する。失敗したら 0.0
Array(s)  ※ 文字の配列にする
s[s.startIndex]  ※ 最初の文字。添字は整数ではなく Index
max(a, b)  ※ 大きいほうを返す
abs(a - b)  ※ 絶対値
Int.random(in: 1...6)  ※ 1 から 6 の乱数。サイコロ
Int.max  ※ Int の最大値
x.isMultiple(of: 2)  ※ 倍数かどうか。偶数の判定
sqrt(Double(x))  ※ 平方根。Double に変換してから
pow(2.0, 10.0)  ※ べき乗
(x * 100).rounded() / 100  ※ 小数第 2 位に丸める
Date().timeIntervalSince1970  ※ 現在時刻を秒で得る
readLine()!.split(separator: " ").map { Int($0)! }  ※ 空白区切りの入力を整数の配列にする
precondition(x > 0, "x must be positive")  ※ 条件を満たさなければ止まる
print(a, b, separator: ", ", terminator: "")  ※ 区切りと行末を指定して出力する
debugPrint(value)  ※ デバッグ向けの詳しい表示
type(of: value)  ※ 値の実際の型を調べる
swap(&a, &b)  ※ 2 つの値を入れ替える

@@ features
if let user = user {  ※ オプショナル束縛
guard let url = URL(string: text) else { return }  ※ 条件を満たさなければ早期リターン
let n = Int(text) ?? 0  ※ nil のときの既定値を ?? で与える
user?.profile?.name  ※ オプショナルチェーン。途中が nil なら nil
enum State { case idle, loading, failed(Error) }  ※ 値を持てる列挙型（関連値）
protocol Drawable { func draw() }  ※ プロトコル。型が持つべき機能の約束
extension String {  ※ 既存の型に機能を足す
nums.map { $0 * 2 }.filter { $0 > 2 }  ※ クロージャの引数を $0 で省略できる
[weak self] in  ※ 循環参照を避けるキャプチャ
do { try save() } catch { print(error) }  ※ エラー処理。try を付けて呼び、catch で受ける
init?(rawValue: String) {  ※ 失敗するかもしれないイニシャライザ
mutating func reset() {  ※ 構造体の中身を変えるメソッドの印
defer { lock.unlock() }  ※ スコープを抜けるときに必ず実行する
case let .failed(error):  ※ 列挙型の関連値をパターンマッチで取り出す
private(set) var items: [Item] = []  ※ 読むのは自由、書くのは内部だけ
typealias Completion = (Result<Data, Error>) -> Void  ※ 完了ハンドラの型に別名を付ける

@@ advanced
func load() async throws -> Data {  ※ 非同期で、エラーも投げる関数
let data = try await fetch()  ※ 非同期処理の完了を待つ
Task { await refresh() }  ※ 同期のコードから非同期処理を始める
actor Counter {  ※ アクター。データ競合を防ぐ参照型
@MainActor  ※ メインスレッドで実行させる。UI 更新で使う
func max<T: Comparable>(_ a: T, _ b: T) -> T  ※ 比較できる型に限定したジェネリクス
some View  ※ 不透明型。具体的な型を隠して返す
any Shape  ※ 存在型。プロトコルに合う任意の型を入れる
associatedtype Element  ※ プロトコルの中の型の穴。実装側が決める
where Element: Equatable  ※ ジェネリクスの型に条件を付ける
@escaping (Int) -> Void  ※ 関数の終了後も生き残るクロージャの印
@propertyWrapper struct Clamped {  ※ プロパティの読み書きに処理を挟む仕組み
withTaskGroup(of: Int.self) { group in  ※ 複数の非同期タスクを並行に走らせる
unowned let owner: Owner  ※ 所有しない参照。相手が先に消えない前提
static func == (lhs: Self, rhs: Self) -> Bool  ※ Equatable に準拠するための等値演算子
indirect enum Tree { case leaf, node(Tree, Tree) }  ※ 再帰的な列挙型。木構造を表せる

@@ ecosystem
import SwiftUI  ※ 宣言的 UI フレームワーク
struct ContentView: View {  ※ SwiftUI の画面は View に準拠した構造体
var body: some View {  ※ 画面の中身を返すプロパティ
@State private var isOn = false  ※ SwiftUI。変わると画面が再描画される状態
@Published var items: [Item] = []  ※ 変更を画面に通知するプロパティ
VStack(alignment: .leading, spacing: 8) {  ※ SwiftUI。子要素を縦に並べる
Button("Save") { save() }  ※ SwiftUI のボタン
.padding().background(.blue)  ※ モディファイアをつなげて見た目を整える
NavigationStack { List(items) { Row($0) } }  ※ 画面遷移つきのリスト
@Environment(\.dismiss) private var dismiss  ※ 画面を閉じる操作を環境から受け取る
override func viewDidLoad() {  ※ UIKit
@IBOutlet weak var label: UILabel!  ※ UIKit。Storyboard の部品とコードをつなぐ
URLSession.shared.data(from: url)  ※ 標準の HTTP 通信
JSONDecoder().decode(User.self, from: data)  ※ JSON を Codable な型に変換する
@Model final class Note {  ※ SwiftData
swift build -c release  ※ Swift Package Manager でリリースビルド
XCTAssertEqual(sum(2, 2), 4)  ※ XCTest。値が等しいことを確かめる
`,
});
