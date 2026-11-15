Codtec.register({
    id: 'elixir',
    name: 'Elixir',
    group: 'data',
    words: String.raw`
@@ basics
IO.puts("Hello, world!")  ※ 1 行出力する
defmodule Math do  ※ モジュールの定義。関数はモジュールの中に書く
def add(a, b), do: a + b  ※ 1 行で書く関数の定義
end  ※ do で始まるブロックを閉じる
x = 42  ※ 変数への束縛
list = [1, 2, 3]  ※ リスト。連結リストなので先頭の操作が速い
map = %{name: "Alice", age: 20}  ※ マップ。キーと値の対応
if x > 0 do  ※ 条件分岐
"Hello, #{name}!"  ※ 文字列への埋め込み
:ok  ※ アトム。名前そのものが値の定数
{:error, reason}  ※ タプル。失敗を表す定番の形
x == 1 and y != 2  ※ 比較と論理演算
# comment  ※ コメントは # で始める
nil  ※ 値がないことを表す

@@ stdlib
Enum.map(list, fn x -> x * 2 end)  ※ 各要素に関数を当てる
Enum.filter(list, &(&1 > 1))  ※ 条件に合う要素だけ残す
Enum.reduce(list, 0, &+/2)  ※ 畳み込み。ここでは合計
Enum.sum(list)  ※ 合計
Enum.count(list)  ※ 要素数
Enum.max(list)  ※ 最大値
Enum.sort(list, :desc)  ※ 降順に並べ替える
Enum.sort_by(users, & &1.age)  ※ 関数の値を基準に並べ替える
Enum.reverse(list)  ※ 逆順にする
Enum.member?(list, 3)  ※ 含まれているか
Enum.find(list, &(&1 > 1))  ※ 条件に合う最初の要素
Enum.any?(list, &(&1 < 0))  ※ 1 つでも条件を満たすか
Enum.all?(list, &is_integer/1)  ※ 全部が条件を満たすか
Enum.take(list, 3)  ※ 先頭から 3 つ
Enum.drop(list, 1)  ※ 先頭の 1 つを除く
Enum.at(list, 0)  ※ 添字で取り出す。O(n)
Enum.uniq(list)  ※ 重複を取り除く
Enum.zip(a, b)  ※ 2 つのリストを組にする
Enum.with_index(list)  ※ 添字つきの組にする
Enum.chunk_every(list, 2)  ※ 2 個ずつに分ける
Enum.group_by(users, & &1.team)  ※ 関数の値ごとにまとめたマップを作る
Enum.frequencies(words)  ※ 要素ごとの出現回数をマップで返す
Enum.join(list, ", ")  ※ 区切り文字でつなげて文字列にする
Enum.each(list, &IO.puts/1)  ※ 各要素に処理を行う。結果は使わない
Enum.flat_map(list, &[&1, &1])  ※ 変換してから平らにする
Enum.into(pairs, %{})  ※ 組の列をマップに変える
hd(list)  ※ リストの先頭
tl(list)  ※ 先頭を除いた残り
length(list)  ※ リストの長さ。O(n)
[0 | list]  ※ 先頭に追加。O(1)
list ++ [4]  ※ 末尾に連結。O(n)
List.first(list)  ※ 先頭の要素。空なら nil
List.last(list)  ※ 末尾の要素
List.flatten([[1], [2, 3]])  ※ 入れ子のリストを平らにする
Map.get(map, :name, "guest")  ※ キーがなければ既定値を返す
Map.put(map, :age, 21)  ※ 追加した新しいマップを返す。元は変わらない
Map.update(map, :count, 1, &(&1 + 1))  ※ あれば更新、なければ初期値を入れる
Map.has_key?(map, :name)  ※ キーがあるかどうか
Map.keys(map)  ※ キーの一覧
Map.merge(a, b)  ※ 2 つのマップを合わせる
map.name  ※ アトムのキーはドットで読める
MapSet.new([1, 2, 2])  ※ 集合。重複は 1 つにまとまる
Keyword.get(opts, :timeout, 5000)  ※ オプション用のキーワードリストから読む
String.upcase("hello")  ※ 大文字にする
String.split(line, ",")  ※ 区切り文字で分ける
String.trim(input)  ※ 前後の空白を取り除く
String.length(s)  ※ 文字数
String.replace(s, "a", "b")  ※ 文字列を置き換える
String.contains?(s, "abc")  ※ 含まれているか
String.to_integer("42")  ※ 整数に変換する
Integer.to_string(42)  ※ 文字列に変換する
rem(x, 2) == 0  ※ 余り。偶数の判定
div(7, 2)  ※ 整数の割り算
elem(tuple, 0)  ※ タプルの要素を位置で取り出す
1..10  ※ 範囲
IO.inspect(value, label: "debug")  ※ 値を表示してそのまま返す。パイプの途中で使える
File.read!("data.txt")  ※ ファイルを読む。失敗したら例外
DateTime.utc_now()  ※ 現在の UTC の日時
Regex.match?(~r/^\d+$/, s)  ※ 正規表現に合うか
is_binary(s)  ※ 文字列（バイナリ）かどうか

@@ features
list |> Enum.filter(&(&1 > 1)) |> Enum.sum()  ※ パイプ演算子
{:ok, value} = fetch(key)  ※ = はパターンマッチ
[head | tail] = list  ※ リストを先頭と残りに分解する
case result do {:ok, v} -> v; _ -> nil end  ※ パターンで分岐する
def fact(0), do: 1  ※ 引数のパターンで関数を分ける
def fact(n) when n > 0, do: n * fact(n - 1)  ※ ガード節つきの再帰
%{user | age: 21}  ※ マップの一部を更新した新しいマップを作る
&String.length/1  ※ 関数をキャプチャして値として渡す
defp helper(x), do: x  ※ モジュールの外から呼べない関数
for x <- 1..10, rem(x, 2) == 0, do: x * x  ※ 内包表記
with {:ok, a} <- f(), {:ok, b} <- g(a) do  ※ 成功が続く間だけ先へ進む
cond do x > 0 -> :pos; true -> :neg end  ※ 条件を上から順に試す
defstruct [:name, age: 0]  ※ 構造体の定義
~w(apple banana cherry)  ※ 文字列のリストを短く書く記法
@moduledoc false  ※ モジュールのドキュメントを付けないと明示する
%{name: name} = user  ※ マップから必要なキーだけ取り出す

@@ advanced
spawn(fn -> send(parent, {:done, self()}) end)  ※ プロセスを起動してメッセージを送る
receive do {:done, pid} -> pid after 1000 -> nil end  ※ メッセージを待つ。1 秒でタイムアウト
use GenServer  ※ 状態を持つサーバープロセスの定番の仕組み
def handle_call(:get, _from, state) do  ※ 同期の呼び出しを処理する GenServer のコールバック
{:reply, state, state}  ※ 返す値と次の状態を返す
GenServer.start_link(__MODULE__, :ok, name: __MODULE__)  ※ GenServer を起動して名前を付ける
Supervisor.start_link(children, strategy: :one_for_one)  ※ 落ちた子プロセスだけを再起動する監視役
Task.async(fn -> work() end) |> Task.await()  ※ 別プロセスで実行して結果を待つ
defmacro unless(cond, do: block) do  ※ マクロの定義。コードを生成するコード
quote do: unquote(x) + 1  ※ コードを構文木として扱う
defprotocol Size do  ※ プロトコル。型ごとに実装を変える仕組み
defimpl Size, for: BitString do  ※ プロトコルを文字列に対して実装する
@spec add(integer, integer) :: integer  ※ 関数の型の仕様を書く
<<a::8, rest::binary>> = data  ※ バイナリのパターンマッチ。先頭 8 ビットを取り出す
Stream.iterate(1, &(&1 * 2)) |> Enum.take(5)  ※ 遅延評価の無限ストリーム
Agent.update(pid, &(&1 + 1))  ※ Agent。状態を持つだけの簡単なプロセス

@@ ecosystem
mix new my_app --sup  ※ 監視ツリーつきのプロジェクトを作る
mix deps.get  ※ 依存パッケージを取得する
mix test  ※ テストを実行する
iex -S mix  ※ プロジェクトを読み込んで対話環境を起動する
mix phx.new blog  ※ Phoenix
mix phx.server  ※ Phoenix の開発サーバーを起動する
get "/users", UserController, :index  ※ Phoenix のルーティング
def mount(_params, _session, socket) do  ※ LiveView
{:noreply, assign(socket, count: 0)}  ※ LiveView。状態を更新して画面を再描画させる
<.button phx-click="inc">+</.button>  ※ LiveView のテンプレート。クリックでイベントを送る
Repo.all(from u in User, where: u.age > 18)  ※ Ecto
mix ecto.migrate  ※ Ecto。データベースに変更を反映する
cast(user, attrs, [:name]) |> validate_required([:name])  ※ Ecto のチェンジセット。入力の検証
{:phoenix, "~> 1.7"}  ※ mix.exs の依存の指定
assert add(1, 2) == 3  ※ ExUnit
`,
});
