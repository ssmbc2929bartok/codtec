Codtec.register({
    id: 'go',
    name: 'Go',
    group: 'systems',
    words: String.raw`
@@ basics
package main  ※ 実行ファイルになるパッケージの宣言
import "fmt"  ※ 書式つき入出力のパッケージ
func main() {  ※ プログラムの入口
fmt.Println("Hello, world!")  ※ 1 行出力する
x := 42  ※ 型推論つきの短い変数宣言
var s []string  ※ 文字列のスライス（可変長配列）。初期値は nil
for i := 0; i < n; i++ {  ※ Go のループは for だけ
for i, v := range xs {  ※ 添字と値を同時に取り出してたどる
if err != nil {  ※ Go のエラー処理の基本形
return nil, err  ※ 値とエラーの 2 つを返す
m := make(map[string]int)  ※ マップ（連想配列）を作る
s = append(s, "go")  ※ スライスに追加。戻り値を代入し直す
type User struct {  ※ 構造体の定義
func (u *User) Name() string {  ※ ポインタレシーバのメソッド

@@ stdlib
len(s)  ※ スライス・マップ・文字列の長さ
cap(s)  ※ スライスの容量
s := make([]int, 0, 10)  ※ 長さ 0、容量 10 のスライスを作る
s = s[:len(s)-1]  ※ 末尾を取り除く。スタックの pop
s = s[1:]  ※ 先頭を取り除く。キューの取り出し
s[len(s)-1]  ※ 末尾の要素
copy(dst, src)  ※ スライスの中身をコピーする
s = append(s, other...)  ※ ほかのスライスを展開して足す
delete(m, key)  ※ マップからキーを消す
for k := range m {  ※ マップのキーをたどる。順序は毎回変わる
clear(m)  ※ マップを空にする（Go 1.21）
min(a, b)  ※ 小さいほうを返す組み込み関数（Go 1.21）
sort.Ints(nums)  ※ int のスライスを昇順に並べ替える
sort.Sort(sort.Reverse(sort.IntSlice(nums)))  ※ 降順に並べ替える
slices.Sort(nums)  ※ ジェネリクス版のソート（Go 1.21）
slices.Contains(nums, 3)  ※ 含まれているか
slices.Reverse(nums)  ※ その場で逆順にする
slices.Max(nums)  ※ 最大値
slices.Index(nums, 3)  ※ 値の位置。なければ -1
slices.BinarySearch(nums, x)  ※ ソート済みスライスの二分探索
maps.Keys(m)  ※ マップのキーをたどるイテレータ
strings.Split(line, ",")  ※ 区切り文字で分ける
strings.Join(parts, ", ")  ※ 区切り文字でつなげる
strings.TrimSpace(s)  ※ 前後の空白を取り除く
strings.ToUpper(s)  ※ 大文字にする
strings.Contains(s, "abc")  ※ 含まれているか
strings.HasPrefix(url, "https")  ※ 指定した文字列で始まるか
strings.ReplaceAll(s, "a", "b")  ※ すべて置き換える
strings.Fields(line)  ※ 空白で区切る
strings.Repeat("-", 20)  ※ 文字列をくり返す
var sb strings.Builder  ※ 文字列を効率よく組み立てる
sb.WriteString("abc")  ※ Builder に文字列を足す
strconv.Itoa(42)  ※ 整数を文字列にする
strconv.Atoi(s)  ※ 文字列を整数にする。エラーも返る
strconv.ParseFloat(s, 64)  ※ 文字列を float64 にする
fmt.Sprintf("%05d %.2f %v", n, x, v)  ※ 書式つきで文字列を作る
fmt.Printf("%+v\n", user)  ※ 構造体をフィールド名つきで表示する
fmt.Scan(&n)  ※ 標準入力から値を読む
fmt.Fprintln(os.Stderr, "error")  ※ 標準エラー出力に書く
[]byte("hello")  ※ 文字列をバイト列に変換する
[]rune(s)  ※ 文字単位で扱うために rune 列にする
utf8.RuneCountInString(s)  ※ 文字数。len はバイト数
math.Sqrt(x)  ※ 平方根
math.MaxInt64  ※ int64 の最大値
math.Abs(a - b)  ※ 絶対値
rand.Intn(6) + 1  ※ 1 から 6 の乱数。サイコロ
time.Now().Format("2006-01-02")  ※ 日時の書式は決まった基準の日時で書く
time.Since(start)  ※ 経過時間
time.Sleep(time.Second)  ※ 1 秒待つ
time.After(3 * time.Second)  ※ 3 秒後に値が届くチャネル。タイムアウトで使う
os.Args[1]  ※ コマンドライン引数の 1 つ目
os.Getenv("HOME")  ※ 環境変数を読む
os.ReadFile("data.txt")  ※ ファイルをまとめて読む
os.WriteFile("out.txt", data, 0644)  ※ ファイルに書き込む。権限も指定する
os.Exit(1)  ※ 終了コードを指定して終わる
bufio.NewScanner(os.Stdin)  ※ 入力を 1 行ずつ読むスキャナー
for scanner.Scan() { line := scanner.Text() }  ※ 入力がなくなるまで 1 行ずつ処理する
bufio.NewWriter(os.Stdout)  ※ 出力をまとめて書く。競プロの高速出力
json.Marshal(user)  ※ 構造体を JSON にする
json.Unmarshal(data, &user)  ※ JSON を構造体に読み込む
filepath.Join(dir, name)  ※ OS に合った区切りでパスをつなぐ
errors.New("not found")  ※ エラーを作る
regexp.MustCompile("^[0-9]+$")  ※ 正規表現をコンパイルする。失敗するとパニック
log.Fatal(err)  ※ エラーを出力して終了する
heap.Push(h, x)  ※ container/heap。優先度付きキューに追加する
list.New()  ※ container/list。双方向連結リスト
flag.Int("port", 8080, "listen port")  ※ コマンドラインのフラグを定義する
io.Copy(dst, src)  ※ 読み取り元から書き込み先へ流し込む

@@ features
defer f.Close()  ※ 関数を抜けるときに必ず実行する。後始末の定番
go worker(ch)  ※ ゴルーチン（軽量スレッド）で並行に実行する
ch := make(chan int, 10)  ※ バッファ 10 のチャネル。ゴルーチン間の通信路
select { case v := <-ch: }  ※ 複数のチャネルを同時に待つ
v, ok := m[key]  ※ キーがあるかどうかを ok で受け取る
type Stringer interface { String() string }  ※ メソッドを持っていれば自動で満たすインターフェース
fmt.Errorf("open %s: %w", path, err)  ※ %w でエラーを包む
errors.Is(err, os.ErrNotExist)  ※ 包まれたエラーの中身を調べる
var wg sync.WaitGroup  ※ 複数のゴルーチンの終了を待つ
func(w http.ResponseWriter, r *http.Request)  ※ HTTP ハンドラの決まった形
switch v := x.(type) {  ※ 型スイッチ。インターフェースの実際の型で分岐
Sunday Weekday = iota  ※ iota で連番の定数を作る。const ( ) の中の最初の行に書く
Name string \`json:"name,omitempty"\`  ※ 構造体タグ
if v, err := f(); err != nil {  ※ if の中で代入と判定をまとめて書く
_ = x  ※ 値を捨てる。未使用エラーを避ける書き方

@@ advanced
ctx, cancel := context.WithCancel(ctx)  ※ キャンセルを伝えられるコンテキストを作る
func Map[T, U any](xs []T, f func(T) U) []U  ※ ジェネリクス
var mu sync.RWMutex  ※ 読み取りは同時に、書き込みは排他にするロック
atomic.AddInt64(&n, 1)  ※ ロックなしで安全に加算する
//go:embed static/*  ※ ファイルを実行ファイルに埋め込む
runtime.GOMAXPROCS(0)  ※ 並列実行に使う CPU 数を調べる
unsafe.Pointer(&x)  ※ 型安全を外す生ポインタ
t.Run(name, func(t *testing.T) {  ※ サブテスト。テーブル駆動テストで使う
func BenchmarkFoo(b *testing.B) {  ※ ベンチマーク関数の形
errgroup.WithContext(ctx)  ※ 並行処理のエラーをまとめて扱う
defer func() { recover() }()  ※ panic を受け止めて落ちないようにする
reflect.TypeOf(x).Kind()  ※ リフレクションで実行時に型を調べる
once.Do(func() { initialized = true })  ※ 1 回だけ実行する。初期化で使う
<-ctx.Done()  ※ キャンセルやタイムアウトを待つ

@@ ecosystem
go mod init example.com/app  ※ モジュールを作る最初のコマンド
go test ./... -race  ※ 全テストをデータ競合の検出つきで実行
go build -o bin/app ./cmd/app  ※ 出力先を指定してビルドする
http.ListenAndServe(":8080", nil)  ※ 標準ライブラリだけで HTTP サーバーを立てる
http.HandleFunc("/", handler)  ※ パスにハンドラを登録する
r := gin.Default()  ※ Gin
e := echo.New()  ※ Echo
db, err := sql.Open("postgres", dsn)  ※ database/sql でデータベースに接続する
gorm.Open(sqlite.Open("test.db"))  ※ GORM。Go の定番 ORM
rootCmd.AddCommand(serveCmd)  ※ Cobra
json.NewDecoder(r.Body).Decode(&req)  ※ リクエスト本文の JSON を構造体に読み込む
slog.Info("started", "port", port)  ※ 標準の構造化ログ
grpc.NewServer()  ※ gRPC のサーバーを作る
go vet ./... && gofmt -l .  ※ 静的解析と整形のチェック
clientset.CoreV1().Pods(ns)  ※ Kubernetes の client-go
`,
});
