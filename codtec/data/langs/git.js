Codtec.register({
    id: 'git',
    name: 'Git',
    group: 'tools',
    words: String.raw`
@@ basics
git init  ※ いまのディレクトリをリポジトリにする
git clone https://github.com/user/repo.git  ※ リモートのリポジトリを手元に複製する
git status  ※ 変更の状態を確かめる
git add .  ※ いまのディレクトリ以下の変更をステージする
git commit -m "first commit"  ※ メッセージを付けてコミットする
git push origin main  ※ main ブランチをリモートに送る
git pull  ※ リモートの変更を取り込む（fetch と merge）
git log --oneline  ※ 履歴を 1 行ずつ表示する
git diff  ※ まだステージしていない変更を見る
git branch  ※ ブランチの一覧
git switch -c feature/login  ※ ブランチを作って切り替える
git merge feature/login  ※ ブランチをいまのブランチに取り込む
git remote -v  ※ リモートの名前と URL を表示する
git fetch  ※ リモートの変更を取得する。手元のブランチは変えない

@@ stdlib
git add src/main.c  ※ ファイルを指定してステージする
git add -A  ※ 削除も含めて全部の変更をステージする
git commit -am "fix typo"  ※ 追跡中のファイルの変更をまとめてコミットする
git switch main  ※ ブランチを切り替える
git switch -  ※ 1 つ前のブランチに戻る
git branch -a  ※ リモートも含めたブランチの一覧
git branch -m old-name new-name  ※ ブランチの名前を変える
git branch -D experiment  ※ マージしていないブランチも強制的に消す
git branch --merged  ※ マージ済みのブランチの一覧
git merge --no-ff feature/login  ※ マージコミットを必ず作る
git merge --abort  ※ 衝突したマージを取りやめる
git log -p -2  ※ 直近 2 件を差分つきで見る
git log --stat  ※ 変更したファイルと行数つきの履歴
git log --author="Alice"  ※ 作者で履歴を絞る
git log main..feature  ※ feature にあって main にないコミット
git log --follow README.md  ※ 名前の変更をまたいでファイルの履歴を追う
git diff main...feature  ※ 分岐点からの feature 側の変更を見る
git diff --name-only HEAD~3  ※ 変更されたファイル名だけを表示する
git diff --word-diff  ※ 単語単位で差分を見る
git show --stat HEAD  ※ 最新のコミットの概要を見る
git show main:README.md  ※ 別のブランチにあるファイルの中身を見る
git stash push -m "wip"  ※ 作業中の変更を名前を付けて退避する
git stash list  ※ 退避した変更の一覧
git stash apply stash@{1}  ※ 退避を指定して戻す。一覧には残る
git stash drop  ※ 退避を捨てる
git tag -a v2.0.0 -m "release"  ※ 注釈つきのタグを打つ
git push origin --tags  ※ タグをまとめてリモートに送る
git push origin --delete feature/login  ※ リモートのブランチを消す
git fetch --prune  ※ リモートで消されたブランチの記録を掃除する
git pull origin main  ※ リモートとブランチを指定して取り込む
git remote add upstream https://github.com/org/repo.git  ※ リモートを追加する。フォーク元を登録する定番
git remote set-url origin git@github.com:user/repo.git  ※ リモートの URL を変える
git clone --depth 1 https://github.com/user/repo.git  ※ 最新の履歴だけを取得する浅いクローン
git mv old.txt new.txt  ※ ファイル名の変更を Git に記録する
git rm old.txt  ※ ファイルを消して、削除をステージする
git restore --source=HEAD~2 file.txt  ※ 2 つ前のコミットの内容に戻す
git checkout -b hotfix origin/main  ※ リモートのブランチから新しいブランチを作る
git reset HEAD file.txt  ※ ステージを取り消す。変更は残る
git rev-parse --short HEAD  ※ いまのコミットの短いハッシュ
git rev-parse --abbrev-ref HEAD  ※ いまのブランチ名
git describe --tags  ※ 直近のタグからの位置で版を表す
git ls-files  ※ 追跡しているファイルの一覧
git grep -n "TODO"  ※ 追跡中のファイルを検索する
git status -sb  ※ 状態を短く表示する
git config --list  ※ 設定の一覧
git config --global core.editor "code --wait"  ※ 既定のエディタを設定する
git config --global alias.st status  ※ コマンドに別名を付ける
git help rebase  ※ コマンドの説明を読む
git archive -o src.zip HEAD  ※ 最新の内容を zip にまとめる
git cherry -v main  ※ まだ main に入っていないコミットを見る
git count-objects -vH  ※ リポジトリの大きさを調べる
git gc  ※ 不要なデータを整理して容量を減らす

@@ features
git add -p  ※ 変更を部分ごとに選んでステージする
git commit --amend --no-edit  ※ 直前のコミットに変更を足す。メッセージはそのまま
git stash  ※ 作業中の変更をいったん退避する
git stash pop  ※ 退避した変更を戻して、一覧から消す
git restore --staged file.txt  ※ ステージを取り消す
git restore .  ※ 作業ツリーの変更を捨てる。取り消せない
git log --graph --oneline --all  ※ 全ブランチの履歴を枝分かれつきで見る
git diff --staged  ※ ステージした変更を見る
git branch -d feature/login  ※ マージ済みのブランチを消す
git push -u origin HEAD  ※ いまのブランチを送り、追跡先に設定する
git pull --rebase  ※ マージコミットを作らずに取り込む
git tag v1.0.0  ※ コミットに名前を付ける。リリースで使う
git checkout -- file.txt  ※ ファイルの変更を捨てる古い書き方
git show HEAD~1  ※ 1 つ前のコミットの内容を見る
git blame main.c  ※ 行ごとに誰がいつ変えたかを見る
git rm --cached secret.env  ※ ファイルは残したまま追跡をやめる

@@ advanced
git rebase -i HEAD~3  ※ 直近 3 コミットを整理する
git cherry-pick abc1234  ※ ほかのブランチのコミットを 1 つだけ取り込む
git reset --hard origin/main  ※ リモートと同じ状態に戻す。手元の変更は消える
git reset --soft HEAD~1  ※ コミットだけ取り消す。変更はステージに残る
git revert HEAD  ※ 打ち消すコミットを作る。共有済みの履歴で使う
git reflog  ※ 消したはずのコミットを探せる
git bisect start  ※ 二分探索でバグが入ったコミットを探す
git push --force-with-lease  ※ 他人の変更を消さない強制プッシュ
git worktree add ../hotfix main  ※ 別のディレクトリに別のブランチを展開する
git submodule update --init --recursive  ※ サブモジュールをまとめて取得する
git log -S "keyword" --since="2 weeks ago"  ※ ある文字列が増減したコミットを探す
git clean -fd  ※ 追跡していないファイルとディレクトリを消す
git rebase --onto main dev feature  ※ ブランチの根元を付け替える
git config --global pull.rebase true  ※ pull を常に rebase にする
git commit --fixup abc1234  ※ あとで自動的にまとめるための修正コミット
git shortlog -sn  ※ 作者ごとのコミット数

@@ ecosystem
gh pr create --fill  ※ GitHub CLI
gh pr checkout 123  ※ プルリクエストのブランチを手元に取り出す
gh repo clone owner/repo  ※ GitHub CLI でクローンする
gh issue list --label bug  ※ ラベルで絞って Issue を一覧する
feat: add login form  ※ Conventional Commits
fix(api): handle empty response  ※ Conventional Commits。括弧の中は対象の範囲
node_modules/  ※ .gitignore
*.log  ※ .gitignore。拡張子でまとめて無視する
!.gitkeep  ※ .gitignore。無視の対象から外す
git lfs track "*.psd"  ※ Git LFS で大きなファイルを扱う
on: [push, pull_request]  ※ GitHub Actions
uses: actions/checkout@v4  ※ GitHub Actions。リポジトリを取り出すステップ
runs-on: ubuntu-latest  ※ GitHub Actions。実行する環境
Co-authored-by: Name <name@example.com>  ※ コミットの共同作者を記録する
git config user.name "Your Name"  ※ コミットに記録する名前を設定する
ssh-keygen -t ed25519 -C "you@example.com"  ※ SSH の鍵を作る。GitHub の認証で使う
`,
});
