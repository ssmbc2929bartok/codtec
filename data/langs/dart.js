Codtec.register({
    id: 'dart',
    name: 'Dart',
    group: 'app',
    words: String.raw`
@@ basics
void main() {  ※ プログラムの入口
print('Hello, world!');  ※ 1 行出力する
final name = 'Dart';  ※ final は一度だけ代入できる変数
var count = 0;  ※ 型推論つきの変数
List<int> nums = [1, 2, 3];  ※ 整数のリスト
Map<String, int> scores = {};  ※ 空のマップ（連想配列）
for (var i = 0; i < n; i++) {  ※ n 回くり返す基本の for 文
for (final item in items) {  ※ 全要素を順にたどる
int add(int a, int b) => a + b;  ※ 式が 1 つの関数はアロー記法で書ける
class User {  ※ クラスの定義
if (x == null) return;  ※ null なら早期リターン
print('sum = \${a + b}');  ※ 文字列補間
import 'dart:math';  ※ 標準の数学ライブラリ
const pi = 3.14159;  ※ コンパイル時定数

@@ stdlib
nums.add(4);  ※ リストの末尾に追加する
nums.addAll([5, 6]);  ※ 複数の要素をまとめて足す
nums.removeLast()  ※ 末尾を取り出す。スタックとして使える
nums.removeAt(0)  ※ 位置を指定して取り出す
nums.insert(0, x);  ※ 位置を指定して挿入する
nums.length  ※ 要素数
nums.isEmpty  ※ 空かどうか
nums.first  ※ 先頭の要素。空だと例外
nums.last  ※ 末尾の要素
nums.contains(3)  ※ 含まれているか
nums.indexOf(3)  ※ 値の位置。なければ -1
nums.sort();  ※ その場で昇順に並べ替える
nums.sort((a, b) => b.compareTo(a));  ※ 比較関数を渡して降順に並べる
nums.reversed.toList()  ※ 逆順のリストを作る
nums.map((n) => n * 2).toList()  ※ 各要素を変換してリストにする
nums.reduce((a, b) => a + b)  ※ 畳み込み。ここでは合計
nums.fold<int>(0, (sum, n) => sum + n)  ※ 初期値つきの畳み込み
nums.any((n) => n < 0)  ※ 1 つでも条件を満たすか
nums.every((n) => n > 0)  ※ 全部が条件を満たすか
nums.firstWhere((n) => n > 1, orElse: () => -1)  ※ 条件に合う最初の要素。なければ既定値
nums.take(3)  ※ 先頭から 3 つ
nums.skip(1)  ※ 先頭の 1 つを飛ばす
nums.sublist(1, 3)  ※ 一部を切り出す
nums.toSet().toList()  ※ 重複を取り除く定番
nums.join(', ')  ※ 区切り文字でつなげて文字列にする
nums.expand((n) => [n, n])  ※ 変換してから平らにする
nums.asMap().entries  ※ 添字つきでたどれるようにする
nums.shuffle();  ※ その場でランダムに並べ替える
nums.clear();  ※ 全要素を消す
List.filled(10, 0)  ※ 0 で埋めた長さ 10 のリスト
List.generate(5, (i) => i * i)  ※ 添字から要素を作ってリストにする
for (var i = 0; i < nums.length; i++) {  ※ 添字を使ってたどる
scores['math'] = 90;  ※ マップに登録する
scores['math'] ?? 0  ※ 値を取り出す。なければ 0
scores.containsKey('math')  ※ キーがあるかどうか
scores.putIfAbsent('art', () => 0);  ※ なければ値を入れる
scores.update('math', (v) => v + 1, ifAbsent: () => 1);  ※ あれば更新、なければ初期値を入れる
scores.forEach((k, v) => print('$k: $v'));  ※ キーと値を順に処理する
scores.keys.toList()  ※ キーの一覧
scores.entries.map((e) => e.value)  ※ キーと値の組を変換する
scores.remove('math');  ※ キーを削除する
final seen = <int>{};  ※ 空の集合。重複を持たない
seen.add(x)  ※ 追加する。すでにあれば false を返す
a.intersection(b)  ※ 集合の共通部分
final queue = Queue<int>();  ※ dart:collection の両端キュー
queue.addLast(x);  ※ 末尾に追加する
queue.removeFirst()  ※ 先頭を取り出す。BFS で使う
s.length  ※ 文字列の長さ
s.toUpperCase()  ※ 大文字にする
s.trim()  ※ 前後の空白を取り除く
s.split(',')  ※ 区切り文字で分ける
s.substring(0, 3)  ※ 部分文字列
s.startsWith('http')  ※ 指定した文字列で始まるか
s.replaceAll('a', 'b')  ※ すべて置き換える
s.padLeft(3, '0')  ※ 3 桁になるよう左を 0 で埋める
s.split('').reversed.join()  ※ 文字列を逆順にする
s.codeUnitAt(0)  ※ 1 文字目の文字コード
int.parse('42')  ※ 整数に変換する。失敗すると例外
int.tryParse(text) ?? 0  ※ 整数にできなければ既定値を使う
x.toStringAsFixed(2)  ※ 小数第 2 位までの文字列にする
x.clamp(0, 100)  ※ 値を範囲の中に収める
x ~/ 2  ※ 整数の割り算
x.isEven  ※ 偶数かどうか
max(a, b)  ※ 大きいほうを返す（dart:math）
sqrt(x)  ※ 平方根（dart:math）
Random().nextInt(6) + 1  ※ 1 から 6 の乱数。サイコロ
DateTime.now().toIso8601String()  ※ 現在時刻を ISO 8601 形式の文字列にする
Duration(seconds: 3)  ※ 3 秒の時間の長さ
Future.delayed(const Duration(seconds: 1))  ※ 1 秒後に完了する Future
jsonEncode(user)  ※ JSON 文字列にする（dart:convert）
jsonDecode(body) as Map<String, dynamic>  ※ JSON をマップにする
stdin.readLineSync()  ※ 標準入力から 1 行読む（dart:io）
File('data.txt').readAsStringSync()  ※ ファイルをまとめて読む
identical(a, b)  ※ 同じオブジェクトかどうか
x.runtimeType  ※ 実行時の型を調べる
assert(x > 0, 'x must be positive');  ※ 開発時だけ条件を検査する
Stopwatch()..start()  ※ 経過時間の計測を始める

@@ features
String? name;  ※ null を許す型
final len = name?.length ?? 0;  ※ null なら 0 を使う
late final String token;  ※ あとで一度だけ初期化する
User({required this.name, this.age = 0});  ※ 名前付き引数
nums.where((n) => n.isEven).toList()  ※ 条件で絞り込んでリストにする
[...a, ...b]  ※ スプレッド演算子でリストをつなげる
if (flag) 'extra',  ※ コレクション内の if
Future<void> load() async {  ※ 非同期関数。Future を返す
final data = await fetch();  ※ 非同期処理の完了を待つ
factory User.fromJson(Map<String, dynamic> json)  ※ JSON からオブジェクトを作る定番の形
enum Status { idle, loading, done }  ※ 列挙型
extension on String {  ※ 既存の型にメソッドを足す
obj..x = 1..y = 2;  ※ カスケード記法
typedef Callback = void Function(int);  ※ 関数型に別名を付ける
@override  ※ 親のメソッドを上書きする印
name!.length  ※ null でないと言い切る。null なら例外

@@ advanced
Stream<int> count() async* { yield 1; }  ※ 非同期ジェネレータ。値を次々に流す
await for (final event in stream) {  ※ ストリームの値を順に受け取る
sealed class Shape {}  ※ サブクラスを限定。switch で網羅を検査できる
switch (shape) { Circle(:final r) => r * r }  ※ パターンマッチで中身を取り出す（Dart 3）
mixin Logger on Object {  ※ ミックスイン。機能をクラスに混ぜ込む
abstract interface class Repository {  ※ 実装専用のインターフェースを宣言する
final (x, y) = point;  ※ レコードを分解して受け取る（Dart 3）
T first<T extends Comparable<T>>(List<T> xs)  ※ 上限つきのジェネリクス
Isolate.run(() => heavyWork());  ※ 別のアイソレートで重い処理を走らせる
covariant Animal other  ※ 引数の型をサブクラスで狭めることを許す
try {} on FormatException catch (e) {}  ※ 例外の型を指定して捕まえる
await Future.wait([a(), b()]);  ※ 複数の非同期処理をまとめて待つ
operator ==(Object other)  ※ 等値演算子の定義。hashCode もそろえる
static const instance = Config._();  ※ 非公開コンストラクタで作るシングルトン

@@ ecosystem
import 'package:flutter/material.dart';  ※ Flutter のマテリアルデザイン部品
void main() => runApp(const MyApp());  ※ Flutter アプリを起動する
class MyApp extends StatelessWidget {  ※ 状態を持たないウィジェット
Widget build(BuildContext context) {  ※ 画面の見た目を返すメソッド
return Scaffold(appBar: AppBar());  ※ 画面の基本の骨組み
setState(() { _count++; });  ※ 状態を変えて画面を再描画させる
const SizedBox(height: 16)  ※ 余白を空けるのによく使う
Navigator.of(context).pop();  ※ 前の画面へ戻る
ElevatedButton(onPressed: _save, child: Text('OK'))  ※ 押せるボタン
ListView.builder(itemCount: items.length)  ※ 見える分だけ作るスクロールリスト
final theme = Theme.of(context);  ※ 上位のウィジェットからテーマを受け取る
ref.watch(counterProvider)  ※ Riverpod
flutter pub get  ※ 依存パッケージを取得する
flutter run -d chrome  ※ ブラウザでアプリを動かす
flutter build apk --release  ※ Android 向けのリリース版をビルドする
dart format . && dart analyze  ※ 整形と静的解析
`,
});
