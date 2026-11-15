Codtec.register({
    id: 'ruby',
    name: 'Ruby',
    group: 'script',
    words: String.raw`
@@ basics
puts "Hello, world!"  ※ 1 行出力する。括弧は省略できる
n = gets.to_i  ※ 1 行読んで整数にする
def add(a, b)  ※ メソッドの定義。最後の式が戻り値になる
end  ※ def や if、do などのブロックを閉じる
if x > 0 then puts "plus" end  ※ 1 行で書く if 文
nums = [1, 2, 3]  ※ 配列
user = { name: "Alice", age: 20 }  ※ ハッシュ。キーはシンボル
nums.each do |n|  ※ ブロックで全要素をたどる。for より好まれる
class Dog  ※ クラスの定義
def initialize(name)  ※ new で呼ばれる初期化メソッド
@name = name  ※ @ で始まるのはインスタンス変数
puts "sum = #{a + b}"  ※ 式展開
require "json"  ※ ライブラリを読み込む
return nil if s.empty?  ※ 条件つきの早期リターン

@@ stdlib
nums.length  ※ 要素数。size でも同じ
nums << 4  ※ 配列の末尾に追加する
nums.push(5).pop  ※ 末尾に積んで取り出す。スタックとして使える
nums.shift  ※ 先頭を取り出す。キューとして使える
nums.unshift(0)  ※ 先頭に追加する
nums.first(2)  ※ 先頭から 2 つ取り出す
nums.last  ※ 末尾の要素
nums.sort.reverse  ※ 昇順に並べてから逆順にする
nums.sort_by { |n| -n }  ※ ブロックの値を基準に並べ替える
nums.sum / nums.size.to_f  ※ 平均。to_f で小数の割り算にする
nums.max  ※ 最大値
nums.uniq  ※ 重複を取り除いた配列を返す
nums.include?(3)  ※ 含まれているか。? で終わるメソッドは真偽値を返す
nums.reject(&:zero?)  ※ 条件に合う要素を除く
nums.find { |n| n > 1 }  ※ 条件に合う最初の要素
nums.count(&:even?)  ※ 条件に合う要素の個数
nums.each_slice(2).to_a  ※ 2 個ずつに分ける
nums.zip(names)  ※ 2 つの配列を組にする
nums.flatten.compact  ※ 入れ子を平らにして nil を除く
nums.group_by(&:odd?)  ※ ブロックの結果ごとにまとめたハッシュを作る
nums.partition(&:even?)  ※ 条件で 2 つの配列に分ける
nums.tally  ※ 要素ごとの出現回数をハッシュで返す
nums.min_by { |n| n.abs }  ※ ブロックの値が最小の要素
nums.each_cons(2)  ※ 隣り合う 2 個ずつを順に取り出す
(1..10).step(2).to_a  ※ 範囲を 2 つ飛ばしで配列にする
hash.fetch(:name, "guest")  ※ キーがなければ既定値を返す
hash.key?(:name)  ※ キーがあるかどうか
hash.each { |k, v| puts "#{k}: #{v}" }  ※ キーと値を同時にたどる
hash.map { |k, v| [k, v * 2] }.to_h  ※ 変換してハッシュに戻す
hash.select { |_, v| v > 0 }  ※ 条件に合う組だけ残す
hash.keys.sort  ※ キーの一覧を並べ替える
Hash.new(0)  ※ 既定値が 0 のハッシュ。数え上げに使う
Hash.new { |h, k| h[k] = [] }  ※ キーがなければ空配列を作るハッシュ
s.split(",").map(&:strip)  ※ 区切って前後の空白を除く
s.chars.reverse.join  ※ 文字ごとに分けて逆順にしてつなぐ
s.upcase.center(20, "*")  ※ 大文字にして中央寄せにする
s.gsub(/\d+/, "N")  ※ 正規表現に合う部分をすべて置き換える
s.start_with?("http")  ※ 指定した文字列で始まるか
s =~ /\A\d+\z/  ※ 正規表現に合うか。数字だけかの判定
s.to_sym  ※ 文字列をシンボルにする
"%05.2f" % 3.14159  ※ 書式を指定して文字列にする
10.digits.sum  ※ 各桁の数字の和
10.gcd(4)  ※ 最大公約数
3.14.round(1)  ※ 小数第 1 位に丸める
rand(1..6)  ※ 1 から 6 の乱数。サイコロ
Time.now.strftime("%Y-%m-%d")  ※ 現在の日付を書式つきで文字列にする
File.read("data.txt").lines  ※ ファイルを読んで行ごとの配列にする
File.write("out.txt", text)  ※ ファイルに書き込む
JSON.parse(body, symbolize_names: true)  ※ JSON をハッシュにする。キーはシンボル
Set.new([1, 2, 2]).size  ※ 集合。重複は 1 つにまとまる
ARGV.first  ※ コマンドライン引数の 1 つ目

@@ features
attr_accessor :name, :age  ※ 読み書き用のメソッドを自動で作る
nums.map { |n| n * 2 }.select(&:even?)  ※ メソッドチェーン。&: はメソッドを渡す略記
5.times { |i| puts i }  ※ 整数もオブジェクト。5 回くり返す
unless user.nil?  ※ if の逆。条件が偽のとき実行する
name ||= "guest"  ※ nil のときだけ代入する
user&.profile&.name  ※ ぼっち演算子
%w[apple banana cherry]  ※ 文字列の配列を短く書く記法
def valid? = !name.empty?  ※ 1 行で書くメソッド定義（エンドレスメソッド）
nums.each_with_index do |n, i|  ※ 添字つきでたどる
nums.inject(:+)  ※ 畳み込み。ここでは合計
case x when 1..5 then "low" else "high" end  ※ case 式。範囲にも使える
module Greetable  ※ モジュール。機能をまとめてクラスに混ぜ込める
include Comparable  ※ <=> を定義すれば比較演算子がすべて使える
a, b = gets.split.map(&:to_i)  ※ 空白区切りの入力を 2 つの整数にする
yield(self) if block_given?  ※ ブロックが渡されていれば呼び出す
puts "big" if x > 100  ※ 後置 if

@@ advanced
def method_missing(name, *args)  ※ 存在しないメソッドの呼び出しを受け止める
define_method(:hello) { puts "hi" }  ※ 実行時にメソッドを定義する
obj.send(:private_method)  ※ 名前を指定してメソッドを呼ぶ。private も呼べる
class << self  ※ 特異クラスを開く。クラスメソッドをまとめて書ける
Struct.new(:x, :y, keyword_init: true)  ※ 簡単なデータ用クラスを作る
begin; risky; rescue => e; retry; ensure; end  ※ 例外処理の全体像。retry でやり直せる
->(x) { x * 2 }.call(21)  ※ ラムダ（無名関数）を作って呼ぶ
def each(&block)  ※ ブロックを引数として受け取る
nums.lazy.select(&:odd?).first(3)  ※ 遅延評価。必要な分だけ計算する
obj.respond_to?(:each)  ※ そのメソッドを持つかを調べる（ダックタイピング）
freeze  ※ オブジェクトを変更できなくする
<=>  ※ 宇宙船演算子。大小を -1、0、1 で返す
refine String do  ※ 範囲を限定して既存クラスを拡張する
ObjectSpace.each_object(Class)  ※ 生きているオブジェクトを列挙する
case { name: "a" } in { name: String => n }  ※ パターンマッチ（Ruby 3）
Ractor.new { heavy_work }  ※ 並列実行の仕組み（Ruby 3）

@@ ecosystem
rails new blog --database=postgresql  ※ Rails アプリのひな形を作る
rails g model User name:string  ※ Rails。モデルとマイグレーションを生成する
bin/rails db:migrate  ※ Rails。データベースに変更を反映する
class User < ApplicationRecord  ※ Rails のモデル（Active Record）
has_many :posts, dependent: :destroy  ※ Rails。1 対多の関連。親を消すと子も消える
validates :email, presence: true, uniqueness: true  ※ Rails。必須と重複なしの検証
User.where(active: true).order(:name)  ※ Active Record で絞り込みと並べ替え
before_action :authenticate_user!  ※ Rails。アクションの前に認証を挟む（Devise）
resources :posts, only: %i[index show]  ※ Rails のルーティング
render json: @user, status: :ok  ※ Rails。JSON を返す
bundle exec rspec  ※ RSpec のテストを実行する
expect(user.name).to eq("Alice")  ※ RSpec
gem "rails", "~> 7.1"  ※ Gemfile。7.1 系の最新を使う指定
bundle install  ※ Gemfile の依存を入れる
get "/" do "Hello" end  ※ Sinatra
rubocop -A  ※ コードの書き方を検査して自動で直す
`,
});
