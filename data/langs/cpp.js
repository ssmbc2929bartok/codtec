Codtec.register({
    id: 'cpp',
    name: 'C++',
    group: 'systems',
    words: String.raw`
@@ basics
#include <iostream>  ※ 標準入出力ストリームのヘッダ
int main() {  ※ プログラムの入口
using namespace std;  ※ std:: を省略できる。ヘッダでは避ける
std::cout << "Hello" << std::endl;  ※ 標準出力に書いて改行する
std::cin >> n;  ※ 標準入力から値を読む
for (int i = 0; i < n; i++) {  ※ n 回くり返す基本の for 文
for (const auto& x : v) {  ※ 範囲 for。コピーせずに全要素をたどる
return 0;  ※ main から 0 を返すと正常終了
class Foo { public: };  ※ クラスの定義。public 以降が外から使える
bool operator<(const P& o) const  ※ 比較演算子の定義。ソートや set のキーに要る

@@ stdlib
std::map<std::string, int> mp;  ※ キーの順に並ぶ連想配列（平衡二分木）
v.push_back(x);  ※ 末尾に要素を追加する
std::vector<int> v(n);  ※ 可変長配列。要素数 n で作る
std::string s;  ※ 文字列クラス
std::sort(v.begin(), v.end());  ※ 範囲を昇順にソートする
std::sort(v.rbegin(), v.rend());  ※ 逆イテレータで降順ソート
std::lower_bound(v.begin(), v.end(), x)  ※ 二分探索。x 以上の最初の位置を返す
priority_queue<ll, vector<ll>, greater<ll>> pq;  ※ 最小値が先に出る優先度付きキュー。ll は long long の別名（using ll = long long;）
__builtin_popcountll(x)  ※ 立っているビットの数を数える GCC 組み込み関数
std::stack<int> st;  ※ 後入れ先出し（LIFO）のスタック。DFS や括弧の対応で使う
st.push(x);  ※ スタックの一番上に積む
st.top()  ※ 一番上の要素を見る。取り除きはしない
st.pop();  ※ 一番上を取り除く。値は返さないので先に top() で読む
std::queue<int> q;  ※ 先入れ先出し（FIFO）のキュー。幅優先探索で使う
q.front()  ※ 先頭（次に出てくる要素）を見る
q.push(x);  ※ キューの末尾に追加する
q.pop();  ※ 先頭を取り除く
while (!q.empty()) {  ※ 空になるまで取り出す。探索の定番の形
std::priority_queue<int> pq;  ※ 最大値が先に出る優先度付きキュー（二分ヒープ）
pq.push(x);  ※ ヒープに追加。O(log n)
pq.top()  ※ 最大の要素を見る。O(1)
pq.pop();  ※ 最大の要素を取り除く。O(log n)
pq.emplace(dist, v);  ※ 要素をその場で構築して入れる
std::deque<int> dq;  ※ 両端で出し入れできるキュー
dq.push_front(x);  ※ 先頭に追加する
dq.pop_back();  ※ 末尾を取り除く
dq.front() + dq.back()  ※ 先頭と末尾の要素を見る
std::set<int> s;  ※ 重複なしで昇順に並ぶ集合（平衡二分木）
s.insert(x);  ※ 集合に追加。O(log n)
s.erase(x);  ※ 値を指定して削除する
s.count(x)  ※ 含まれていれば 1、なければ 0
if (s.find(x) != s.end()) {  ※ 要素が見つかったかどうかの判定
*s.begin()  ※ 集合の最小値
*s.rbegin()  ※ 集合の最大値
auto it = s.lower_bound(x);  ※ x 以上の最初の要素。メンバ関数版は O(log n)
std::multiset<int> ms;  ※ 重複を許す順序つき集合
ms.erase(ms.find(x));  ※ multiset から 1 個だけ消す定番の書き方
std::unordered_map<std::string, int> um;  ※ ハッシュ表。順序はないが平均 O(1)
mp[key]++;  ※ キーがなければ 0 で作られてから加算される
mp.contains(key)  ※ キーがあるかを調べる（C++20）
for (auto& [k, v] : mp) {  ※ マップの全要素をキーと値でたどる
std::pair<int, int> p = {1, 2};  ※ 2 つの値の組
p.first + p.second  ※ pair の 1 つ目と 2 つ目
std::tuple<int, int, int> t;  ※ 3 つ以上の値の組
std::get<0>(t)  ※ タプルの 0 番目を取り出す
v.size()  ※ 要素数。符号なし整数なので引き算に注意
v.empty()  ※ 空かどうか
v.back()  ※ 末尾の要素
v.pop_back();  ※ 末尾を取り除く
v.emplace_back(a, b);  ※ 末尾にその場で構築して追加する
v.resize(n, 0);  ※ 要素数を n に変える。増えた分は 0
v.assign(n, -1);  ※ 全体を n 個の -1 に置き換える
v.insert(v.begin(), x);  ※ 先頭に挿入。後ろをずらすので O(n)
v.erase(v.begin() + i);  ※ i 番目を削除。O(n)
v.clear();  ※ 全要素を消す
v.reserve(n);  ※ あらかじめ容量を確保して再確保を減らす
std::array<int, 3> a = {1, 2, 3};  ※ 長さ固定の配列。生配列より安全
std::reverse(v.begin(), v.end());  ※ 範囲を逆順にする
std::accumulate(v.begin(), v.end(), 0LL)  ※ 合計。初期値の型で計算されるので 0LL
*std::max_element(v.begin(), v.end())  ※ 最大の要素。イテレータが返るので * を付ける
v.erase(std::unique(v.begin(), v.end()), v.end());  ※ 重複を消す定番。先にソートしておく
std::binary_search(v.begin(), v.end(), x)  ※ ソート済みの範囲に x があるか
std::next_permutation(v.begin(), v.end())  ※ 次の順列に並べ替える。全探索で使う
std::iota(v.begin(), v.end(), 0);  ※ 0, 1, 2, ... と連番で埋める
std::fill(v.begin(), v.end(), 0);  ※ 範囲を同じ値で埋める
std::count(v.begin(), v.end(), x)  ※ x に等しい要素の個数
std::swap(a, b);  ※ 2 つの値を入れ替える
std::max({a, b, c})  ※ 3 つ以上の最大値は波括弧で渡す
std::to_string(n)  ※ 数値を文字列に変換する
std::stoi(s)  ※ 文字列を int に変換する
s.substr(0, 3)  ※ 部分文字列。開始位置と長さを渡す
if (s.find("abc") != std::string::npos) {  ※ 文字列に含まれるかの判定
std::getline(std::cin, line);  ※ 空白を含む 1 行を読む
std::bitset<8> bits(x);  ※ 固定長のビット列
std::list<int> lst;  ※ 双方向連結リスト。途中の挿入と削除が O(1)

@@ features
nullptr ※ ヌルポインタを表すキーワード（NULL や 0 の代わり）
auto it = v.begin();  ※ auto で型を推論。it は先頭を指すイテレータ
std::unique_ptr<Foo> p;  ※ 所有者が 1 人のスマートポインタ。自動で解放する
std::make_shared<Foo>()  ※ 共有スマートポインタを安全に作る
std::move(x)  ※ ムーブ。コピーせずに中身を譲り渡す
template <typename T>  ※ テンプレート。型を引数にした汎用コード
[&](int x) { return x * 2; }  ※ 参照キャプチャのラムダ式
constexpr int N = 1 << 20;  ※ コンパイル時に決まる定数
static_cast<long long>(x)  ※ 明示的な型変換。オーバーフロー対策によく使う
virtual ~Base() = default;  ※ 継承される基底クラスには仮想デストラクタを書く
void f() const noexcept override;  ※ 状態を変えず、例外を投げず、仮想関数を上書き
auto [a, b] = p;  ※ 構造化束縛（C++17）
Foo(const Foo&) = delete;  ※ コピーを禁止する
namespace fs = std::filesystem;  ※ 長い名前空間に別名を付ける
explicit Foo(int x) : x_(x) {}  ※ 暗黙の変換を禁じたコンストラクタと初期化子リスト

@@ advanced
template <typename... Args>  ※ 可変長テンプレート。任意個の型を受け取る
std::forward<Args>(args)...  ※ 完全転送
requires std::integral<T>  ※ コンセプトで型に制約を付ける（C++20）
if constexpr (sizeof(T) == 8)  ※ コンパイル時の条件分岐
std::enable_if_t<std::is_integral_v<T>>  ※ SFINAE。条件に合う型だけ有効にする
decltype(auto)  ※ 参照や const を保ったまま型を推論する
std::optional<int> opt = std::nullopt;  ※ 値がないかもしれないことを型で表す
std::variant<int, std::string> var;  ※ 型安全な共用体。どれか 1 つの型を持つ
std::visit([](auto&& x) {}, var);  ※ variant の中身の型に応じて処理する
std::lock_guard<std::mutex> lock(mtx);  ※ スコープを抜けると自動で解錠する（RAII）
std::atomic<int> cnt{0};  ※ ロックなしでスレッド間共有できる整数
co_yield value;  ※ コルーチンで値を 1 つ返して中断する（C++20）
[[nodiscard]]  ※ 戻り値を無視すると警告を出す属性
std::span<const int> s  ※ 配列や vector の一部を指す軽いビュー（C++20）
std::ranges::sort(v);  ※ 範囲ライブラリ版。begin/end を書かずに済む
v | std::views::filter(pred)  ※ パイプでつなぐ遅延評価のビュー
reinterpret_cast<char*>(&x)  ※ ビット列を別の型として読む危険な変換
std::chrono::steady_clock::now()  ※ 経過時間の計測に使う単調な時計

@@ ecosystem
#include <bits/stdc++.h>  ※ 競技プログラミングの定番
ios::sync_with_stdio(false); cin.tie(nullptr);  ※ 競プロで入出力を速くする定番。using namespace std; が前提の書き方
#define rep(i, n) for (int i = 0; i < (n); i++)  ※ 競プロでおなじみのループマクロ
using ll = long long;  ※ long long に ll という短い別名を付ける。競プロの定番
#include <atcoder/all>  ※ AtCoder Library（ACL）をまとめて読み込む
atcoder::modint998244353  ※ ACL の剰余つき整数。mod 998244353 の計算用
cv::Mat img = cv::imread("a.png");  ※ OpenCV
Eigen::MatrixXd A(3, 3);  ※ Eigen。線形代数ライブラリの行列
boost::asio::io_context io;  ※ Boost.Asio。非同期 I/O の中心になるオブジェクト
QApplication app(argc, argv);  ※ Qt
QObject::connect(a, &A::sig, b, &B::slot);  ※ Qt のシグナルとスロットをつなぐ
UPROPERTY(EditAnywhere)  ※ Unreal Engine
UE_LOG(LogTemp, Warning, TEXT("Hello"));  ※ Unreal Engine のログ出力
Serial.begin(115200);  ※ Arduino
digitalWrite(LED_BUILTIN, HIGH);  ※ Arduino で基板上の LED を点ける
glfwMakeContextCurrent(window);  ※ GLFW。OpenGL の描画先ウィンドウを選ぶ
TEST(FooTest, Works) { EXPECT_EQ(f(), 1); }  ※ GoogleTest
cmake -B build && cmake --build build  ※ CMake でビルドする定番の 2 手順
g++ -std=c++20 -O2 -Wall main.cpp  ※ C++20・最適化・警告つきでコンパイル
ImGui::Begin("Debug");  ※ Dear ImGui。デバッグ用 GUI のウィンドウを開く
torch::Tensor t = torch::rand({2, 3});  ※ LibTorch（PyTorch の C++ API）
`,
});
