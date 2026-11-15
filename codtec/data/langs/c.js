Codtec.register({
    id: 'c',
    name: 'C',
    group: 'systems',
    words: String.raw`
@@ basics
#include <stdio.h>  ※ 標準入出力（printf など）を使うためのヘッダ
int main(void) {  ※ プログラムの入口。引数を取らない main 関数
printf("%d\n", x);  ※ 整数を 10 進数で表示して改行する
scanf("%d", &n);  ※ 整数を読み込む。変数のアドレスを渡す
return 0;  ※ main から 0 を返すと正常終了を表す
for (int i = 0; i < n; i++) {  ※ n 回くり返す基本の for 文
while (*p != '\0') p++;  ※ 文字列の終端までポインタを進める
char buf[256];  ※ 256 バイトの文字配列。文字列の入れ物
#define MAX_N 100000  ※ マクロで定数に名前を付ける
if (argc < 2) return 1;  ※ コマンドライン引数が足りなければ異常終了
switch (c) { case 'a': break; }  ※ 値で分岐する。break を忘れると次へ落ちる
unsigned long long  ※ 64 ビット以上の符号なし整数型
double avg = (double)sum / n;  ※ キャストして整数どうしの割り算を避ける
int a[3] = {1, 2, 3};  ※ 配列の宣言と初期化

@@ stdlib
#include <stdlib.h>  ※ malloc、qsort、exit などのヘッダ
#include <string.h>  ※ 文字列とメモリ操作のヘッダ
#include <math.h>  ※ 数学関数のヘッダ。リンク時に -lm が要ることがある
#include <stdbool.h>  ※ bool、true、false を使えるようにする
#include <ctype.h>  ※ 文字の種類を調べる関数のヘッダ
#include <limits.h>  ※ INT_MAX など、型の限界値
#include <assert.h>  ※ assert マクロのヘッダ
puts("done");  ※ 文字列と改行を出力する
putchar('\n');  ※ 1 文字出力する
int c = getchar();  ※ 1 文字読む。EOF を受けるため int で受ける
printf("%5.2f %s %c\n", x, s, ch);  ※ 小数・文字列・文字の書式指定
printf("%zu\n", sizeof(long));  ※ size_t は %zu で表示する
printf("%lld\n", big);  ※ long long は %lld で表示する
snprintf(buf, sizeof(buf), "%d-%d", a, b);  ※ 長さを指定して文字列を組み立てる。sprintf より安全
sscanf(line, "%d %d", &a, &b);  ※ 文字列から値を読み取る
strcpy(dst, src);  ※ 文字列をコピーする。dst の大きさに注意
strncpy(dst, src, sizeof(dst) - 1);  ※ 長さを制限してコピーする
strcat(buf, ".txt");  ※ 文字列を末尾につなげる
strcmp(a, b) == 0  ※ 文字列が等しいか。等しいと 0 を返す
strncmp(s, "http", 4) == 0  ※ 先頭の 4 文字を比べる
strchr(s, '/')  ※ 文字を探して、その位置へのポインタを返す
strstr(text, "needle")  ※ 部分文字列を探す
strtok(line, ",")  ※ 区切り文字で分ける。元の文字列を書き換える
strdup(s)  ※ 文字列を複製する。あとで free が要る
atoi(argv[1])  ※ 文字列を int にする。エラーは分からない
strtol(s, &end, 10)  ※ 文字列を long にする。失敗を検出できる
isdigit(c) || isalpha(c)  ※ 数字か英字かを調べる
toupper(c)  ※ 大文字にする
calloc(n, sizeof(int))  ※ 0 で初期化したメモリを確保する
realloc(p, new_size)  ※ 確保したメモリの大きさを変える
memmove(dst, src, n);  ※ 領域が重なっていても安全なコピー
memcmp(a, b, n) == 0  ※ メモリの内容が等しいか
abs(x)  ※ int の絶対値
sqrt(x) + pow(x, 2.0)  ※ 平方根とべき乗
floor(x) + ceil(x)  ※ 切り捨てと切り上げ
fabs(a - b) < 1e-9  ※ 浮動小数点数が等しいかの判定
rand() % 6 + 1  ※ 1 から 6 の乱数。サイコロ
srand(time(NULL));  ※ 乱数の種を現在時刻で初期化する
exit(EXIT_FAILURE);  ※ プログラムを異常終了させる
FILE *fp = fopen("data.txt", "r");  ※ ファイルを読み取り用に開く
if (fp == NULL) { perror("fopen"); }  ※ 開けなかったら理由を表示する
fclose(fp);  ※ ファイルを閉じる
fread(buf, 1, sizeof(buf), fp)  ※ バイト単位でまとめて読む
fwrite(data, sizeof(int), n, fp)  ※ バイナリのまま書き込む
fscanf(fp, "%d", &x)  ※ ファイルから書式つきで読む
fflush(stdout);  ※ たまっている出力をすぐに書き出す
while ((c = fgetc(fp)) != EOF) {  ※ ファイルの終わりまで 1 文字ずつ読む
clock() / CLOCKS_PER_SEC  ※ CPU 時間を秒にする
time_t now = time(NULL);  ※ 現在時刻を得る
assert(p != NULL);  ※ 条件が偽なら止まる。デバッグ用
bsearch(&key, a, n, sizeof(int), cmp)  ※ ソート済み配列の二分探索
INT_MAX  ※ int の最大値
size_t len = strlen(s);  ※ 大きさや添字を表す符号なし整数型
getenv("HOME")  ※ 環境変数を読む
system("ls");  ※ シェルのコマンドを実行する

@@ features
int *p = malloc(n * sizeof *p);  ※ 型ではなく *p のサイズを取る書き方
free(p); p = NULL;  ※ 解放後に NULL を入れて二重解放を防ぐ
typedef struct node Node;  ※ 構造体に短い別名を付ける
struct node *next;  ※ 自分と同じ型へのポインタ。連結リストの基本
p->next = head;  ※ ポインタ経由でメンバにアクセスする演算子
const char *argv[]  ※ 書き換えない文字列へのポインタの配列
memcpy(dst, src, sizeof(dst));  ※ メモリをバイト単位でコピーする
strlen(s) + 1  ※ 終端の '\0' の分を足す
int (*cmp)(const void *, const void *)  ※ 関数ポインタ
qsort(a, n, sizeof(int), cmp);  ※ 標準ライブラリのソート。比較関数を渡す
#ifndef HEADER_H  ※ インクルードガード。ヘッダの二重読み込みを防ぐ
static inline int max(int a, int b)  ※ ヘッダに置ける小さな関数の書き方
sizeof(arr) / sizeof(arr[0])  ※ 配列の要素数
memset(buf, 0, sizeof(buf));  ※ バッファ全体を 0 で埋める
fgets(line, sizeof(line), stdin)  ※ 長さを指定して 1 行読む。gets より安全
char **argv  ※ ポインタへのポインタ。文字列の配列を表す

@@ advanced
volatile uint32_t *reg;  ※ 最適化で読み書きを省かせない。レジスタ操作で使う
#pragma once  ※ インクルードガードの簡単な書き方（処理系の拡張）
__attribute__((packed))  ※ 構造体の詰め物をなくす GCC 拡張
fprintf(stderr, "%s\n", strerror(errno));  ※ エラー番号を文章にして標準エラーへ出す
union { float f; uint32_t u; } v;  ※ 共用体。同じメモリを別の型として読む
x & (1u << n)  ※ n 番目のビットが立っているかを調べる
do { } while (0)  ※ マクロを 1 文として扱わせる定番
va_start(ap, fmt);  ※ 可変長引数の読み取りを始める
_Static_assert(sizeof(int) == 4, "int");  ※ コンパイル時に条件を検査する（C11）
goto cleanup;  ※ 後始末の場所へ飛ぶ。エラー処理でよく使う
enum { BUF_SIZE = 4096 };  ※ 列挙体を整数定数として使う技
#define ARRAY_SIZE(a) (sizeof(a) / sizeof((a)[0]))  ※ 配列の要素数を求めるマクロ
void *restrict dst  ※ ほかのポインタと領域が重ならないという約束
extern int errno;  ※ 別のファイルで定義された変数を使う宣言
(void)unused;  ※ 未使用変数の警告を消す書き方
offsetof(struct packet, payload)  ※ 構造体の先頭からメンバまでのバイト数

@@ ecosystem
#include <unistd.h>  ※ POSIX のシステムコール（read、fork など）
pid_t pid = fork();  ※ プロセスを複製する。Unix の基本
int fd = open(path, O_RDONLY);  ※ ファイルを開いてファイル記述子を得る
pthread_create(&th, NULL, worker, NULL);  ※ POSIX スレッドを作る
pthread_mutex_lock(&mtx);  ※ ミューテックスで排他制御する
socket(AF_INET, SOCK_STREAM, 0)  ※ TCP のソケットを作る
#include <stdint.h>  ※ uint8_t などの幅が決まった整数型
HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);  ※ STM32 の HAL
printk(KERN_INFO "hello\n");  ※ Linux カーネル
module_init(hello_init);  ※ カーネルモジュールの初期化関数を登録する
SDL_Init(SDL_INIT_VIDEO);  ※ SDL。ゲームやマルチメディア用のライブラリ
gcc -Wall -Wextra -O2 -o main main.c  ※ 警告を多めに出して最適化つきでコンパイル
curl_easy_setopt(curl, CURLOPT_URL, url);  ※ libcurl で HTTP 通信の URL を設定する
sqlite3_open("test.db", &db);  ※ SQLite のデータベースを開く
mmap(NULL, len, PROT_READ, MAP_PRIVATE, fd, 0)  ※ ファイルをメモリに対応づけて読む
valgrind --leak-check=full ./main  ※ メモリリークを調べる定番ツール
`,
});
