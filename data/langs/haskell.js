Codtec.register({
    id: 'haskell',
    name: 'Haskell',
    group: 'data',
    words: String.raw`
@@ basics
main :: IO ()  ※ main の型。入出力を行い、値は返さない
main = putStrLn "Hello, world!"  ※ 1 行出力するプログラム
add :: Int -> Int -> Int  ※ 型シグネチャ。Int を 2 つ取って Int を返す
add x y = x + y  ※ 関数の定義。引数は空白で区切る
let xs = [1, 2, 3]  ※ リスト。同じ型の値の並び
if x > 0 then "pos" else "neg"  ※ if は式。else を省略できない
import Data.List (sort)  ※ モジュールから名前を指定して読み込む
print (sum [1..100])  ※ 1 から 100 の合計を表示する
module Main where  ※ モジュールの宣言
x <- getLine  ※ do の中で入力を 1 行読んで束縛する
double x = x * 2  ※ 引数 1 つの関数
-- comment  ※ コメントは -- で始める
True && not False  ※ 論理演算
"abc" ++ "def"  ※ リスト（文字列）の連結

@@ stdlib
map (* 2) xs  ※ 各要素に関数を当てる。(* 2) はセクション
filter even [1..10]  ※ 条件に合う要素だけ残す
length xs  ※ リストの長さ。O(n)
head xs : tail xs  ※ 先頭と残り。: は先頭に付け足す
zip xs ys  ※ 2 つのリストを組にする
foldr (+) 0 xs  ※ 右からの畳み込み。ここでは合計
sum xs  ※ 合計
product [1..5]  ※ 積。5 の階乗
maximum xs  ※ 最大値
reverse xs  ※ 逆順にする
last xs  ※ 末尾の要素
init xs  ※ 末尾を除いたリスト
null xs  ※ 空かどうか
xs !! 2  ※ 添字で取り出す。O(n)
elem 3 xs  ※ 含まれているか
take 3 xs  ※ 先頭から 3 つ
drop 3 xs  ※ 先頭の 3 つを除く
takeWhile (< 10) xs  ※ 条件を満たす間だけ取る
dropWhile even xs  ※ 条件を満たす間は捨てる
splitAt 2 xs  ※ 位置で 2 つに分ける
span even xs  ※ 条件を満たす先頭部分と残りに分ける
concat [[1, 2], [3]]  ※ リストのリストを平らにする
concatMap show xs  ※ 変換してからつなげる
replicate 3 'a'  ※ 同じ値を 3 つ並べる
zipWith (+) xs ys  ※ 2 つのリストを関数で合わせる
unzip pairs  ※ 組のリストを 2 つのリストに分ける
lookup key pairs  ※ 組のリストから値を探す。結果は Maybe
all even xs  ※ 全部が条件を満たすか
any odd xs  ※ 1 つでも条件を満たすか
words "hello world"  ※ 空白で区切って単語のリストにする
unwords ["a", "b"]  ※ 単語を空白でつなげる
lines text  ※ 改行で区切って行のリストにする
show 42  ※ 値を文字列にする
read "42" :: Int  ※ 文字列を値にする。型を指定する
fst (1, "a")  ※ 組の 1 つ目
snd pair  ※ 組の 2 つ目
div 7 2  ※ 整数の割り算
7 \`mod\` 2  ※ 余り。バッククォートで中置にできる
fromIntegral n / 2  ※ 整数を別の数値型に変換して割る
sort xs  ※ 昇順に並べ替える（Data.List）
sortBy (comparing snd) pairs  ※ 比べ方を指定して並べ替える
nub xs  ※ 重複を取り除く。O(n^2)
group (sort xs)  ※ 並べ替えてから同じ値をまとめる
partition even xs  ※ 条件で 2 つのリストに分ける
intercalate ", " names  ※ 区切り文字を挟んでつなげる
isPrefixOf "ab" "abc"  ※ 前方一致かどうか
maybe 0 (+ 1) m  ※ Maybe を既定値と関数で処理する
fromMaybe 0 m  ※ Nothing なら既定値を使う
mapM_ print xs  ※ 各要素に入出力の処理を行う。結果は捨てる
getLine >>= putStrLn  ※ 入力した行をそのまま出力する
interact (map toUpper)  ※ 標準入力を変換して標準出力に書く
M.fromList [(1, "a")]  ※ 組のリストから Map を作る。M は Data.Map に付けた別名
M.lookup key m  ※ Map から値を探す。結果は Maybe
M.insert key value m  ※ 追加した新しい Map を返す。元は変わらない
S.member x set  ※ Set に含まれているか。S は Data.Set に付けた別名

@@ features
[x * x | x <- [1..10], even x]  ※ リスト内包表記
data Maybe a = Nothing | Just a  ※ 値がないかもしれないことを表す型
case xs of [] -> 0; (x : _) -> x  ※ パターンマッチ
\x -> x + 1  ※ ラムダ式
f . g $ x  ※ 関数合成と適用
where go acc n = acc + n  ※ 補助の関数を後ろで定義する
data Shape = Circle Double | Rect Double Double  ※ 代数的データ型
class Eq a where  ※ 型クラスの定義。インターフェースにあたる
instance Show Color where  ※ 型を型クラスのインスタンスにする
fmap (+ 1) (Just 2)  ※ 箱の中の値に関数を当てる（Functor）
take 5 (iterate (* 2) 1)  ※ 無限リストと遅延評価
deriving (Show, Eq, Ord)  ※ 型クラスのインスタンスを自動で作らせる
type Name = String  ※ 型の別名
abs' x | x < 0 = -x | otherwise = x  ※ ガード
let (q, r) = divMod 7 2  ※ 組をパターンで分解して受け取る
flip div 2 10  ※ 引数の順序を入れ替える
map (\(a, b) -> a + b) pairs  ※ ラムダの引数でパターンマッチする
sumTo n = foldl (+) 0 [1..n]  ※ 部分適用と畳み込みで関数を組み立てる

@@ advanced
(>>=) :: Monad m => m a -> (a -> m b) -> m b  ※ モナドの bind の型
do { x <- xs; return (x * 2) }  ※ do 記法。モナドの計算を順に書く
pure f <*> a <*> b  ※ アプリカティブ。箱の中の関数を箱の中の値に当てる
newtype Parser a = Parser { runParser :: String }  ※ 既存の型を包んだ新しい型
foldl' (+) 0 xs  ※ 正格な畳み込み
{-# LANGUAGE OverloadedStrings #-}  ※ 言語拡張を有効にする
forall a. a -> a  ※ 全称量化。どんな型でも成り立つ
sequence [Just 1, Just 2]  ※ 箱のリストをリストの箱に変える
traverse readMaybe ["1", "2"]  ※ 各要素を変換し、失敗が 1 つでもあれば全体が失敗
instance Functor Tree where  ※ 木を Functor にして fmap を使えるようにする
either show id result  ※ Either の Left と Right を別々の関数で処理する
seq a b  ※ a を評価してから b を返す。正格評価に使う
liftA2 (+) (Just 1) (Just 2)  ※ 2 引数の関数を箱の中の値に当てる
class Monad m => MonadState s m | m -> s  ※ 関数従属つきの多引数型クラス
import qualified Data.Map.Strict as M  ※ 名前の衝突を避けて別名で読み込む

@@ ecosystem
stack new my-project  ※ Stack でプロジェクトのひな形を作る
cabal build && cabal run  ※ Cabal でビルドして実行する
ghci> :type map  ※ 対話環境 GHCi で式の型を調べる
import Data.Text (Text)  ※ text。効率のよい文字列型
M.insertWith (+) key 1 m  ※ containers。あれば足し、なければ入れる。M は Data.Map の別名
import Control.Monad.State  ※ mtl。状態を持つ計算のモナド
runStateT action initial  ※ 状態つきの計算を実行する
import Test.Hspec  ※ Hspec。テストフレームワーク
it "adds" $ add 1 2 \`shouldBe\` 3  ※ Hspec
quickCheck prop_reverse  ※ QuickCheck
get "/" $ text "Hello"  ※ Scotty
type API = "users" :> Get '[JSON] [User]  ※ Servant
decode <$> BL.readFile "data.json"  ※ aeson で JSON を読む。BL は Data.ByteString.Lazy の別名
xmonad def { modMask = mod4Mask }  ※ xmonad
`,
});
