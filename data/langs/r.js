Codtec.register({
    id: 'r',
    name: 'R',
    group: 'data',
    words: String.raw`
@@ basics
x <- 42  ※ 代入は <- が慣例
v <- c(1, 2, 3)  ※ ベクトルを作る。R の基本のデータ構造
print("Hello, world!")  ※ 値を表示する
for (i in 1:10) {  ※ 1 から 10 までくり返す
if (x > 0) {  ※ 条件分岐
add <- function(a, b) a + b  ※ 関数の定義。最後の式が戻り値
df <- data.frame(x = 1:3, y = c("a", "b", "c"))  ※ データフレーム。表形式のデータ
df$x  ※ 列を名前で取り出す
head(df)  ※ 先頭の 6 行を見る
library(ggplot2)  ※ パッケージを読み込む
TRUE & FALSE  ※ 論理値。& は要素ごとの論理積
v[1]  ※ 添字は 1 から始まる
x == 3  ※ 等しいかの比較
# comment  ※ コメントは # で始める

@@ stdlib
mean(v)  ※ 平均
length(v)  ※ 要素数
summary(df)  ※ 列ごとの要約統計量
median(v)  ※ 中央値
sd(v)  ※ 標準偏差
var(v)  ※ 分散
sum(v) / length(v)  ※ 合計を個数で割る。平均の計算
max(v) - min(v)  ※ 範囲（最大と最小の差）
range(v)  ※ 最小値と最大値
quantile(v, 0.9)  ※ 分位点。ここでは 90 パーセンタイル
cumsum(v)  ※ 累積和
round(x, 2)  ※ 小数第 2 位に丸める
sqrt(x)  ※ 平方根
x %% 2 == 0  ※ %% は余り。偶数の判定
x %/% 2  ※ 整数の割り算
sort(v, decreasing = TRUE)  ※ 降順に並べ替える
order(df$age)  ※ 並べ替えたときの行番号。データフレームの並べ替えに使う
rev(v)  ※ 逆順にする
unique(v)  ※ 重複を取り除く
table(df$group)  ※ 値ごとの度数を数える
which(v > 2)  ※ 条件に合う位置を返す
which.max(v)  ※ 最大値の位置
any(v < 0)  ※ 1 つでも条件を満たせば TRUE
all(v > 0)  ※ 全部が条件を満たせば TRUE
x %in% c(1, 2, 3)  ※ 候補に含まれているか
rep(0, times = 10)  ※ 同じ値をくり返したベクトル
seq_len(n)  ※ 1 から n の連番。n が 0 でも安全
seq_along(v)  ※ ベクトルの添字の連番
append(v, 4)  ※ 末尾に追加したベクトルを返す
head(v, -1)  ※ 末尾の 1 つを除く
tail(v, 3)  ※ 末尾の 3 つ
nchar(s)  ※ 文字数
toupper(s)  ※ 大文字にする
substr(s, 1, 3)  ※ 1 文字目から 3 文字目まで
paste("a", "b", sep = "-")  ※ 区切り文字を挟んで文字列をつなげる
sprintf("%.2f", x)  ※ 書式を指定して文字列を作る
strsplit(s, ",")[[1]]  ※ 区切り文字で分ける。結果はリストで返る
gsub("a", "b", s)  ※ 文字列をすべて置き換える
grepl("^abc", s)  ※ 正規表現に合うか
as.numeric("3.14")  ※ 数値に変換する
as.character(42)  ※ 文字列に変換する
as.Date("2026-01-25")  ※ 日付型に変換する
is.null(x)  ※ NULL かどうか
class(df)  ※ オブジェクトのクラスを調べる
str(df)  ※ 構造を短く表示する。中身の確認の定番
dim(m)  ※ 行数と列数
colnames(df)  ※ 列名の一覧
cbind(a, b)  ※ 列方向に結合する
merge(a, b, by = "id")  ※ キーで 2 つのデータフレームを結合する
mean(v, na.rm = TRUE)  ※ 欠損値を除いて平均を求める
sample(1:6, 1)  ※ ランダムに 1 つ選ぶ。サイコロ
rnorm(100, mean = 0, sd = 1)  ※ 正規分布に従う乱数を 100 個
runif(10)  ※ 0 から 1 の一様乱数を 10 個
read.csv("data.csv")  ※ CSV を読み込む
write.csv(df, "out.csv", row.names = FALSE)  ※ CSV に書き出す。行番号は付けない
plot(x, y)  ※ 散布図を描く
hist(v)  ※ ヒストグラムを描く
cor(x, y)  ※ 相関係数

@@ features
v[v > 2]  ※ 条件でベクトルを絞り込む
v * 2  ※ ベクトル全体に演算がかかる
df[df$age >= 20, c("name", "age")]  ※ 行を条件で、列を名前で選ぶ
sapply(v, function(x) x^2)  ※ 各要素に関数を当ててベクトルで返す
lapply(files, read.csv)  ※ 各要素に関数を当ててリストで返す
seq(0, 1, by = 0.1)  ※ 0 から 1 まで 0.1 刻みの数列
paste0("id_", 1:3)  ※ 区切りなしで連結。ベクトルにも効く
is.na(x)  ※ 欠損値（NA）かどうか
names(v) <- c("a", "b", "c")  ※ 要素に名前を付ける
l <- list(name = "Alice", scores = c(90, 80))  ※ リスト。型の違う値をまとめられる
l[["name"]]  ※ リストの要素そのものを取り出す
apply(m, 1, sum)  ※ 行列の行ごとに関数を当てる
factor(c("low", "high"), levels = c("low", "high"))  ※ 因子。カテゴリと順序を持つ
nrow(df); ncol(df)  ※ 行数と列数
ifelse(x > 0, "pos", "neg")  ※ ベクトルに効く条件分岐
set.seed(42)  ※ 乱数の種を固定して結果を再現できるようにする

@@ advanced
lm(y ~ x1 + x2, data = df)  ※ 線形回帰
t.test(score ~ group, data = df)  ※ 2 群の平均の差の検定
glm(y ~ x, family = binomial, data = df)  ※ ロジスティック回帰
tryCatch(risky(), error = function(e) NULL)  ※ 例外処理。エラーなら NULL を返す
do.call(rbind, results)  ※ リストの中身を引数として関数に渡す
Reduce(\`+\`, v, accumulate = TRUE)  ※ 畳み込み。途中経過も残す
vapply(v, sqrt, numeric(1))  ※ 戻り値の型を指定する安全な sapply
\(x) x + 1  ※ 無名関数の短い書き方
setClass("Person", representation(name = "character"))  ※ S4 クラスを定義する
UseMethod("print")  ※ S3 の総称関数。クラスに応じて処理を振り分ける
stopifnot(is.numeric(x))  ※ 条件を満たさなければエラーで止める
matrix(1:6, nrow = 2) %*% t(m)  ※ 行列の積と転置
Sys.time()  ※ 現在の日時
on.exit(close(con))  ※ 関数を抜けるときに必ず実行する

@@ ecosystem
library(tidyverse)  ※ dplyr や ggplot2 などをまとめて読み込む
df %>% filter(age >= 20) %>% select(name)  ※ dplyr
df |> group_by(team) |> summarise(n = n())  ※ ネイティブのパイプでグループごとに集計
mutate(bmi = weight / height^2)  ※ dplyr。新しい列を作る
ggplot(df, aes(x, y)) + geom_point()  ※ ggplot2 で散布図を描く
geom_histogram(bins = 30) + theme_minimal()  ※ ggplot2。ヒストグラムとテーマ
read_csv("data.csv")  ※ readr。速くて型の推測が賢い CSV 読み込み
pivot_longer(cols = -id)  ※ tidyr。横持ちを縦持ちに変える
left_join(users, orders, by = "user_id")  ※ dplyr の左外部結合
install.packages("data.table")  ※ パッケージをインストールする
dt[, .(mean = mean(x)), by = group]  ※ data.table
shinyApp(ui = ui, server = server)  ※ Shiny
knitr::kable(df)  ※ データフレームをきれいな表にする
Rscript analysis.R  ※ コマンドラインからスクリプトを実行する
`,
});
