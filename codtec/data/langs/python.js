Codtec.register({
    id: 'python',
    name: 'Python',
    group: 'script',
    words: String.raw`
@@ basics
print("Hello, world!")  ※ 1 行出力する
n = int(input())  ※ 1 行読んで整数にする
for i in range(n):  ※ 0 から n-1 までくり返す
if x % 2 == 0:  ※ 偶数かどうかの判定。ブロックはインデントで表す
def add(a, b):  ※ 関数の定義
return a + b  ※ 値を返す
nums = [1, 2, 3]  ※ リスト。順序つきで書き換えられる
user = {"name": "Alice", "age": 20}  ※ 辞書。キーと値の対応
while True:  ※ 無限ループ。break で抜ける
import math  ※ 標準の数学モジュールを読み込む
class Dog:  ※ クラスの定義
def __init__(self, name):  ※ インスタンスを初期化する特殊メソッド
elif x is None:  ※ None との比較は == ではなく is
print(f"{name} is {age}")  ※ f-string

@@ stdlib
len(nums)  ※ 要素数を返す組み込み関数
nums.append(4)  ※ リストの末尾に追加する
nums.pop()  ※ 末尾を取り出して返す。スタックとして使える
nums.sort(reverse=True)  ※ その場で降順に並べ替える
nums.insert(0, x)  ※ 先頭に挿入。後ろをずらすので O(n)
nums[-1]  ※ 負の添字は後ろから数える。これは末尾
nums[1:3]  ※ スライス。1 番目から 2 番目までを取り出す
sum(nums) / len(nums)  ※ 平均を求める
max(nums, key=abs)  ※ key で比べ方を指定して最大を選ぶ
d.get(key, 0)  ※ キーがなければ既定値を返す
d.setdefault(key, []).append(v)  ※ キーがなければ空リストを作ってから追加
for k, v in d.items():  ※ 辞書のキーと値を同時にたどる
if key in d:  ※ キーがあるかどうか。平均 O(1)
seen = set()  ※ 空の集合。重複の判定に使う
seen.add(x)  ※ 集合に追加する
a & b  ※ 集合の共通部分（積集合）
s.split(",")  ※ 区切り文字で分けてリストにする
s.strip().lower()  ※ 前後の空白を除いて小文字にする
s.startswith("http")  ※ 指定した文字列で始まるか
s.replace("a", "b")  ※ 文字列を置き換えた新しい文字列を返す
"-" * 20  ※ 文字列のくり返し。区切り線を作るのに便利
str(n).zfill(3)  ※ 3 桁になるよう左を 0 で埋める
int("ff", 16)  ※ 16 進数の文字列を整数にする
round(3.14159, 2)  ※ 小数第 2 位に丸める
q, r = divmod(7, 2)  ※ 商と余りを同時に求める
any(x > 0 for x in nums)  ※ 1 つでも条件を満たせば True
all(x > 0 for x in nums)  ※ 全部が条件を満たせば True
for x in reversed(nums):  ※ 逆順にたどる
range(0, 10, 2)  ※ 0 から 2 つ飛ばしで 10 未満まで
isinstance(x, int)  ※ 型を判定する
sorted(users, key=lambda u: u.age)  ※ key を指定して並べ替えた新しいリストを返す
", ".join(map(str, nums))  ※ 数値のリストを区切り文字つきの文字列にする
from collections import defaultdict, deque  ※ 既定値つき辞書と両端キュー
dq = deque(maxlen=5)  ※ 両端キュー。maxlen で古い要素が自動で消える
dq.appendleft(x)  ※ 両端キューの先頭に追加。O(1)
dq.popleft()  ※ 先頭を取り出す。キューや BFS で使う
import heapq  ※ 優先度付きキュー（最小ヒープ）
heapq.heappush(h, x)  ※ リストを最小ヒープとして使い、要素を追加
heapq.heappop(h)  ※ ヒープから最小の要素を取り出す
Counter(words).most_common(3)  ※ 出現回数を数えて上位 3 つを返す
itertools.permutations(nums, 2)  ※ 順列を作る
itertools.accumulate(nums)  ※ 累積和を作る
bisect.bisect_left(a, x)  ※ ソート済みリストの二分探索
math.gcd(a, b)  ※ 最大公約数
random.choice(items)  ※ ランダムに 1 つ選ぶ
datetime.now().isoformat()  ※ 現在時刻を ISO 8601 形式の文字列にする
Path("data").glob("*.csv")  ※ pathlib でファイルを探す
json.dumps(obj, ensure_ascii=False)  ※ JSON 文字列にする。日本語をそのまま出す
re.findall(r"\d+", text)  ※ 正規表現に合う部分をすべて取り出す
os.path.join(base, name)  ※ OS に合った区切りでパスをつなぐ
sys.argv[1]  ※ コマンドライン引数の 1 つ目
time.sleep(1)  ※ 1 秒待つ

@@ features
if __name__ == "__main__":  ※ 直接実行されたときだけ動く部分
squares = [x * x for x in range(10)]  ※ リスト内包表記
a, b = b, a  ※ 値の入れ替え
with open(path, encoding="utf-8") as f:  ※ with を抜けると自動でファイルが閉じる
for i, x in enumerate(items):  ※ 添字つきでたどる
for a, b in zip(xs, ys):  ※ 2 つの列を同時にたどる
lambda x: x * 2  ※ 無名関数
first, *rest = items  ※ 先頭と残りに分けて受け取る
def f(*args, **kwargs):  ※ 任意個の位置引数とキーワード引数を受け取る
s[::-1]  ※ スライスで逆順にする
try: ... except ValueError as e:  ※ 例外を種類を指定して捕まえる
{k: v for k, v in d.items() if v}  ※ 辞書内包表記
if (n := len(data)) > 10:  ※ セイウチ演算子
x if cond else y  ※ 条件式（三項演算子にあたる）

@@ advanced
yield from inner()  ※ 別のジェネレータに処理を任せる
async def main():  ※ コルーチン（非同期関数）の定義
await asyncio.gather(*tasks)  ※ 複数の非同期処理を並行に実行して待つ
@functools.lru_cache(maxsize=None)  ※ 結果を記憶する。メモ化再帰で使う
@dataclass(frozen=True)  ※ 不変のデータクラスを自動で作る
def __enter__(self):  ※ with 文に入るときに呼ばれる特殊メソッド
@property  ※ メソッドを属性のように読めるようにする
@staticmethod  ※ self を取らないメソッド
@classmethod  ※ クラス自身を第 1 引数に取るメソッド
def f(x: int | None = None) -> list[str]:  ※ 型ヒント。実行時には強制されない
from typing import TypeVar, Generic  ※ ジェネリックな型を書くための部品
match cmd: case ["go", direction]:  ※ 構造的パターンマッチ（3.10 以降）
class Meta(type):  ※ メタクラス。クラスの作られ方を変える
__slots__ = ("x", "y")  ※ 属性を固定してメモリを節約する
nonlocal count  ※ 外側の関数の変数を書き換える宣言
raise ValueError("bad input") from err  ※ 元の例外を原因として付けて投げ直す
@contextlib.contextmanager  ※ ジェネレータから with 用のオブジェクトを作る
global _cache  ※ モジュールの変数を関数内で書き換える宣言

@@ ecosystem
import numpy as np  ※ NumPy。数値計算の土台
import pandas as pd  ※ pandas。表形式データの分析
df = pd.read_csv("data.csv")  ※ CSV を DataFrame として読み込む。pd は pandas の別名
df.groupby("user")["score"].mean()  ※ pandas。グループごとの平均。df は DataFrame を入れた変数
arr = np.zeros((3, 3), dtype=np.float32)  ※ 0 で埋めた 3x3 の配列。np は NumPy の別名
import matplotlib.pyplot as plt  ※ Matplotlib。グラフ描画の定番
plt.plot(x, y); plt.show()  ※ 折れ線グラフを描いて表示する。plt は matplotlib.pyplot の別名
import torch.nn as nn  ※ PyTorch
loss.backward(); optimizer.step()  ※ PyTorch の学習ループ。勾配計算と更新
model.fit(X_train, y_train)  ※ scikit-learn
from fastapi import FastAPI  ※ FastAPI。型ヒントを使う Web API フレームワーク
@app.get("/items/{item_id}")  ※ FastAPI のルーティング
from django.db import models  ※ Django のモデル（ORM）
python manage.py migrate  ※ Django。データベースに変更を反映する
requests.get(url, timeout=10).json()  ※ requests で HTTP GET して JSON を読む
list(map(int, input().split()))  ※ 競技プログラミングの入力
sys.setrecursionlimit(10**6)  ※ 再帰の上限を上げる。競プロの定番
pip install -r requirements.txt  ※ 依存パッケージをまとめて入れる
python -m venv .venv  ※ 仮想環境を作る
pytest -q tests/  ※ pytest でテストを実行する
@pytest.mark.parametrize("x", [1, 2, 3])  ※ 引数を変えて同じテストをくり返す
soup = BeautifulSoup(html, "html.parser")  ※ Beautiful Soup。HTML の解析
bpy.ops.mesh.primitive_cube_add()  ※ Blender
`,
});
