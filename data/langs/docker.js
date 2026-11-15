Codtec.register({
    id: 'docker',
    name: 'Docker',
    group: 'tools',
    words: String.raw`
@@ basics
docker run hello-world  ※ イメージからコンテナを作って動かす
docker ps -a  ※ 止まっているものも含めてコンテナを一覧する
docker images  ※ 手元にあるイメージの一覧
docker build -t myapp .  ※ Dockerfile からイメージを作って名前を付ける
docker stop web  ※ コンテナを止める
docker rm web  ※ コンテナを削除する
docker pull nginx:latest  ※ イメージをダウンロードする
docker logs -f web  ※ コンテナのログを見続ける
docker exec -it web bash  ※ 動いているコンテナの中でシェルを開く
FROM node:22-alpine  ※ もとにするイメージ。Dockerfile の最初に書く
WORKDIR /app  ※ 以降の命令を実行するディレクトリ
COPY . .  ※ 手元のファイルをイメージにコピーする
RUN npm ci  ※ ビルド中にコマンドを実行する
CMD ["node", "server.js"]  ※ コンテナの起動時に実行する既定のコマンド

@@ stdlib
docker start web  ※ 止まっているコンテナを起動する
docker restart web  ※ コンテナを再起動する
docker kill web  ※ コンテナを強制的に止める
docker rm -f $(docker ps -aq)  ※ 全部のコンテナを強制的に削除する
docker rmi myapp:old  ※ イメージを削除する
docker image prune -a  ※ 使っていないイメージをまとめて消す
docker container prune  ※ 止まっているコンテナをまとめて消す
docker volume prune  ※ 使っていないボリュームをまとめて消す
docker ps --format "{{.Names}}: {{.Status}}"  ※ 表示する項目を自分で決める
docker ps -q --filter status=exited  ※ 終了したコンテナの ID だけを出す
docker logs --tail 100 --since 10m web  ※ 直近 10 分のログの最後の 100 行
docker exec web env  ※ コンテナの中の環境変数を見る
docker exec -u root -it web sh  ※ root としてコンテナに入る
docker cp web:/app/log.txt ./log.txt  ※ コンテナからファイルを取り出す
docker top web  ※ コンテナの中のプロセスを見る
docker port web  ※ 公開しているポートの対応を見る
docker diff web  ※ コンテナの中で変わったファイルを見る
docker history myapp  ※ イメージのレイヤーの履歴を見る
docker image ls --filter dangling=true  ※ 名前のない不要なイメージを一覧する
docker inspect web  ※ コンテナの詳しい情報を JSON で見る
docker rename web web-old  ※ コンテナの名前を変える
docker pause web  ※ コンテナを一時停止する
docker wait web  ※ コンテナが終わるまで待ち、終了コードを出す
docker attach web  ※ コンテナの標準入出力につなぐ
docker commit web myapp:snapshot  ※ コンテナの状態からイメージを作る
docker login ghcr.io  ※ レジストリにログインする
docker search redis  ※ Docker Hub でイメージを探す
docker info  ※ Docker 全体の情報を表示する
docker version  ※ クライアントとサーバーのバージョン
docker system df  ※ Docker が使っているディスク容量を見る
docker events --since 1h  ※ コンテナの起動や停止などの出来事を見る
docker volume create pgdata  ※ 名前付きボリュームを作る
docker volume inspect pgdata  ※ ボリュームの場所などを調べる
docker network ls  ※ ネットワークの一覧
docker network connect backend web  ※ コンテナをネットワークにつなぐ
docker run --network backend --name db postgres  ※ ネットワークを指定して起動。名前で通信できる
docker run -v pgdata:/var/lib/postgresql/data postgres  ※ 名前付きボリュームでデータを残す
docker run --env-file .env myapp  ※ ファイルから環境変数を渡す
docker run --restart unless-stopped myapp  ※ 落ちたら自動で再起動する
docker run --entrypoint sh -it myapp  ※ 起動コマンドを差し替えて中を調べる
docker run -p 127.0.0.1:5432:5432 postgres  ※ 手元のマシンからだけつながるように公開する
docker run --read-only --cap-drop ALL myapp  ※ 書き込みと権限を絞って安全にする
docker load -i myapp.tar  ※ ファイルからイメージを読み込む
docker export web > web.tar  ※ コンテナのファイルシステムを書き出す
docker compose ps  ※ Compose のサービスの状態を見る
docker compose build --no-cache  ※ キャッシュを使わずにビルドし直す
docker compose exec api sh  ※ サービスのコンテナに入る
docker compose run --rm api npm test  ※ 1 回だけコマンドを実行して消す
docker compose pull  ※ サービスのイメージを更新する
docker compose restart api  ※ サービスを再起動する
docker compose up -d --build  ※ ビルドし直してから裏で起動する
docker compose config  ※ 設定を展開して確かめる
docker compose top  ※ サービスごとのプロセスを見る
docker context ls  ※ 接続先（コンテキスト）の一覧
LABEL org.opencontainers.image.source="repo"  ※ イメージに情報を付ける
ADD https://example.com/app.tar.gz /tmp/  ※ URL から取得してコピーする
VOLUME /data  ※ データを残す場所を宣言する
SHELL ["/bin/bash", "-c"]  ※ RUN で使うシェルを変える
ONBUILD COPY . /app  ※ このイメージをもとにしたビルドで実行される命令

@@ features
docker run -d -p 8080:80 --name web nginx  ※ ポートを公開して裏で動かす
docker run --rm -it ubuntu bash  ※ 終わったら消える使い捨てのコンテナで対話する
docker run -v "$(pwd)":/app -w /app node npm test  ※ 手元のディレクトリを見せてコマンドを実行する
docker run -e NODE_ENV=production myapp  ※ 環境変数を渡して起動する
EXPOSE 3000  ※ 使うポートを示す。公開はされない
ENV NODE_ENV=production  ※ イメージに環境変数を設定する
ENTRYPOINT ["python", "-m", "app"]  ※ 必ず実行するコマンド。CMD は引数になる
COPY package*.json ./  ※ 依存関係を先にコピーしてキャッシュを効かせる
ARG VERSION=1.0.0  ※ ビルド時だけ使う変数
USER node  ※ root ではないユーザーで動かす
docker compose up -d  ※ 複数のコンテナをまとめて裏で起動する
docker compose down -v  ※ まとめて止めて消す。ボリュームも消す
docker compose logs -f api  ※ サービスのログを見続ける
docker volume ls  ※ ボリュームの一覧
docker network create backend  ※ コンテナどうしをつなぐネットワークを作る
docker system prune -af  ※ 使っていないものをまとめて消す

@@ advanced
FROM golang:1.23 AS builder  ※ マルチステージビルド
COPY --from=builder /app/bin /usr/local/bin  ※ 前のステージから成果物だけをコピーする
RUN --mount=type=cache,target=/root/.npm npm ci  ※ ビルドの間でキャッシュを使い回す（BuildKit）
HEALTHCHECK CMD curl -f http://localhost/ || exit 1  ※ コンテナが正常かを定期的に確かめる
docker buildx build --platform linux/amd64,linux/arm64  ※ 複数の CPU 向けにまとめてビルドする
docker build --target test --no-cache .  ※ 途中のステージまでをキャッシュなしでビルドする
RUN apt-get update && apt-get install -y curl  ※ 更新とインストールを 1 つの層にまとめる
rm -rf /var/lib/apt/lists/*  ※ apt のキャッシュを消してイメージを小さくする
docker inspect -f '{{.State.Status}}' web  ※ 詳細から欲しい値だけを取り出す
docker stats --no-stream  ※ CPU やメモリの使用量を 1 回だけ表示する
docker save myapp | gzip > myapp.tar.gz  ※ イメージをファイルに書き出す
FROM scratch  ※ 空のイメージから始める。最小のイメージを作る
docker run --cpus=1 --memory=512m myapp  ※ CPU とメモリの上限を決める
docker tag myapp ghcr.io/user/myapp:1.0.0  ※ レジストリ向けの名前を付ける
docker push ghcr.io/user/myapp:1.0.0  ※ イメージをレジストリに送る
STOPSIGNAL SIGTERM  ※ 止めるときに送るシグナルを決める

@@ ecosystem
services:  ※ compose.yaml。動かすコンテナを並べる
image: postgres:16  ※ compose.yaml。使うイメージ
ports: ["5432:5432"]  ※ compose.yaml。ポートの公開
depends_on: [db]  ※ compose.yaml。先に起動するサービス
volumes: ["./data:/var/lib/postgresql/data"]  ※ compose.yaml。データを手元に残す
environment: { POSTGRES_PASSWORD: secret }  ※ compose.yaml。環境変数
restart: unless-stopped  ※ compose.yaml。自動で再起動する設定
build: { context: ., dockerfile: Dockerfile }  ※ compose.yaml。ビルドの設定
kubectl apply -f deployment.yaml  ※ Kubernetes
kubectl get pods -o wide  ※ Kubernetes。Pod を詳しく一覧する
kubectl rollout status deploy/api  ※ Kubernetes。更新の進み具合を見る
apiVersion: apps/v1  ※ Kubernetes のマニフェストの先頭
kind: Deployment  ※ Kubernetes。リソースの種類
replicas: 3  ※ Kubernetes。動かす Pod の数
helm install my-release ./chart  ※ Helm。Kubernetes のパッケージ管理
.dockerignore  ※ ビルドに含めないファイルを書く
`,
});
