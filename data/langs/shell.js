Codtec.register({
    id: 'shell',
    name: 'Shell / Linux',
    group: 'tools',
    words: String.raw`
@@ basics
ls -la  ※ 隠しファイルも含めて詳しく一覧する
cd ~/dev  ※ ディレクトリを移動する。~ はホーム
pwd  ※ いまいるディレクトリを表示する
mkdir -p src/lib  ※ 途中のディレクトリもまとめて作る
cp -r src backup  ※ ディレクトリごとコピーする
mv old.txt new.txt  ※ 移動する。名前の変更にも使う
rm -rf node_modules  ※ 確認なしでディレクトリごと消す。取り消せない
cat README.md  ※ ファイルの中身を表示する
echo "Hello, world!"  ※ 文字列を出力する
touch index.html  ※ 空のファイルを作る
grep -rn "TODO" src/  ※ ディレクトリの中を検索して行番号つきで表示する
chmod +x run.sh  ※ 実行権限を付ける
sudo apt update  ※ 管理者権限でパッケージ一覧を更新する（Debian / Ubuntu）
man ls  ※ コマンドのマニュアルを読む

@@ stdlib
head -n 20 access.log  ※ 先頭の 20 行を表示する
tail -n 5 access.log  ※ 末尾の 5 行を表示する
less /var/log/syslog  ※ 長いファイルをスクロールしながら読む
wc -l *.py  ※ 行数を数える
sort -k2 -n scores.txt  ※ 2 列目を数値として並べ替える
uniq -c  ※ 連続する同じ行をまとめて数える。先に sort する
tr 'a-z' 'A-Z'  ※ 文字を置き換える。ここでは大文字にする
tee output.log  ※ 画面に出しながらファイルにも書く
diff -u old.txt new.txt  ※ 2 つのファイルの差分を見る
find . -type f -name "*.js"  ※ 条件に合うファイルを探す
which python3  ※ コマンドの実体がどこにあるか調べる
ln -s /opt/app/current app  ※ シンボリックリンクを作る
du -sh *  ※ ファイルやディレクトリの大きさを見る
df -h  ※ ディスクの空き容量を見る
free -h  ※ メモリの使用状況を見る
uname -a  ※ カーネルやマシンの情報を表示する
whoami  ※ いまのユーザー名を表示する
id -u  ※ ユーザー ID を表示する。0 なら root
hostname -I  ※ このマシンの IP アドレスを表示する
date +%Y-%m-%d  ※ 日付を書式つきで表示する
uptime  ※ 起動からの時間と負荷を表示する
top -o %CPU  ※ プロセスを CPU 使用率の順に表示する
ps -ef --forest  ※ プロセスを親子関係つきで一覧する
pgrep -f "node server"  ※ コマンドラインで探してプロセス ID を得る
kill -TERM 1234  ※ プロセスに終了を頼む。行儀のよい止め方
pkill -f gunicorn  ※ 名前で探してプロセスを止める
jobs  ※ このシェルで動かしているジョブの一覧
bg %1  ※ 止めたジョブを裏で再開する
fg  ※ 裏のジョブを表に戻す
chown -R www-data:www-data /var/www  ※ 所有者とグループをまとめて変える
chmod 644 config.yml  ※ 所有者は読み書き、ほかは読み取りだけ
chmod 700 ~/.ssh  ※ 所有者だけが使えるようにする
umask 022  ※ 新しく作るファイルの権限の既定を決める
useradd -m -s /bin/bash deploy  ※ ホームつきでユーザーを作る
passwd deploy  ※ パスワードを変える
su - postgres  ※ 別のユーザーに切り替える
env | sort  ※ 環境変数を並べて表示する
printenv HOME  ※ 環境変数を 1 つ表示する
unset DEBUG  ※ 変数を消す
ping -c 4 example.com  ※ 4 回だけ疎通を確かめる
ss -tlnp  ※ 待ち受けている TCP ポートを調べる
ip addr show  ※ ネットワークインターフェースの情報を表示する
dig +short example.com  ※ DNS を引いて結果だけ表示する
nc -zv localhost 5432  ※ ポートが開いているか確かめる
wget -O file.zip https://example.com/file.zip  ※ ファイルをダウンロードして名前を付ける
mount /dev/sdb1 /mnt/data  ※ デバイスをディレクトリに取り付ける
lsblk  ※ ディスクとパーティションの一覧
dmesg | tail  ※ カーネルのメッセージの最後のほうを見る
gzip -d archive.gz  ※ gzip を解凍する
unzip -q release.zip -d dist  ※ zip を指定したディレクトリに展開する
tar -xzf backup.tar.gz -C /tmp  ※ tar.gz を指定したディレクトリに展開する
sha256sum file.iso  ※ ファイルのハッシュ値を求める
base64 -d secret.txt  ※ Base64 を元に戻す
watch -n 1 nvidia-smi  ※ 1 秒ごとにコマンドを実行し直して表示する
time ./build.sh  ※ 実行にかかった時間を測る
sleep 5 && echo done  ※ 5 秒待ってから次を実行する
yes | head -3  ※ 同じ行を出し続ける。確認への自動応答に使う
seq 1 10  ※ 1 から 10 の連番を出力する
basename /path/to/file.txt .txt  ※ パスからファイル名だけを取り出す
dirname "$0"  ※ スクリプト自身のあるディレクトリ
realpath ../data  ※ 絶対パスに直す
stat -c %s file.txt  ※ ファイルの大きさをバイトで表示する
file image.png  ※ ファイルの種類を調べる
xxd file.bin | head  ※ バイナリを 16 進数で見る
clear  ※ 画面を消す
shutdown -h now  ※ いますぐ電源を切る
reboot  ※ 再起動する

@@ features
#!/bin/bash  ※ シバン。スクリプトを実行するプログラムを指定する
cat log.txt | grep ERROR | wc -l  ※ パイプでつなぐ
echo "done" >> log.txt  ※ ファイルの末尾に追記する
command > out.log 2>&1  ※ 標準エラー出力もまとめて保存
make && ./app  ※ 前が成功したときだけ次を実行する
export PATH="$HOME/bin:$PATH"  ※ コマンドを探す場所を追加する
name="\${1:-guest}"  ※ 引数がなければ既定値を使う
if [ -f "$file" ]; then  ※ ファイルがあるかを調べる
for f in *.txt; do echo "$f"; done  ※ ファイルごとにくり返す
while read -r line; do  ※ 入力を 1 行ずつ読む
files=$(ls | wc -l)  ※ コマンド置換
alias ll="ls -la"  ※ コマンドに別名を付ける
source ~/.bashrc  ※ 設定をいまのシェルに読み込み直す
echo $?  ※ 直前のコマンドの終了ステータス
tail -f /var/log/syslog  ※ 追記されていくログを見続ける
history | tail -20  ※ 最近実行したコマンドを見る

@@ advanced
set -euo pipefail  ※ エラーで止まる安全なスクリプトの定番
trap 'rm -f "$tmp"' EXIT  ※ 終了時に必ず後始末をする
find . -name "*.log" -mtime +7 -delete  ※ 7 日より古いログを探して消す
xargs -P 4 -I {} gzip {}  ※ 入力を引数にして 4 並列で実行する
awk -F, '{ sum += $2 } END { print sum }' data.csv  ※ CSV の 2 列目を合計する
sed -i 's/foo/bar/g' config.yml  ※ ファイルの中身を直接置き換える
sort | uniq -c | sort -rn | head  ※ 出現回数の多い順に上位を出す定番
[[ "$s" =~ ^[0-9]+$ ]]  ※ 正規表現で数字だけかを判定する
"\${arr[@]}"  ※ 配列の全要素を 1 つずつ展開する
case "$1" in start) run ;; *) usage ;; esac  ※ 引数で処理を分ける
diff <(sort a.txt) <(sort b.txt)  ※ プロセス置換
nohup ./server > /dev/null 2>&1 &  ※ ログアウトしても動き続けるよう裏で起動する
cut -d: -f1 /etc/passwd  ※ 区切り文字で分けて 1 列目を取り出す
tar -czf backup.tar.gz ./data  ※ ディレクトリを tar.gz にまとめる
ps aux | grep nginx  ※ 動いているプロセスを名前で探す
kill -9 $(lsof -ti :3000)  ※ ポート 3000 を使っているプロセスを強制終了する

@@ ecosystem
ssh -i ~/.ssh/id_ed25519 user@host  ※ 鍵を指定してリモートに接続する
scp file.txt user@host:/tmp/  ※ SSH でファイルを送る
rsync -avz --delete src/ dest/  ※ 差分だけを転送して同期する
curl -fsSL https://example.com | sh  ※ スクリプトを取得してそのまま実行する。中身に注意
curl -X POST -H "Content-Type: application/json"  ※ JSON を送る HTTP リクエスト
jq '.items[] | .name' data.json  ※ JSON を加工して取り出す
systemctl restart nginx  ※ systemd のサービスを再起動する
journalctl -u app -f  ※ サービスのログを見続ける
crontab -e  ※ 定期実行の設定を編集する
0 3 * * * /usr/local/bin/backup.sh  ※ cron の書式。毎日 3 時に実行する
brew install ripgrep  ※ macOS の Homebrew
kubectl get pods -n production  ※ Kubernetes の Pod を一覧する
kubectl logs -f deploy/api  ※ Kubernetes のログを見続ける
terraform plan -out=tfplan  ※ Terraform。変更の計画を作って保存する
aws s3 sync ./dist s3://my-bucket  ※ AWS CLI で S3 に同期する
tmux new -s work  ※ tmux のセッションを作る。切断しても続く
vim +42 main.c  ※ 42 行目を開いた状態で Vim を起動する
htop  ※ 見やすいプロセスモニター
`,
});
