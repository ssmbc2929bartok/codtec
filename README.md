# Codtec

Terminal-Style Typing Game

プログラマーやエンジニアのために設計された、ターミナル風の Web タイピングゲームです。実際のコードやコマンドを打って練習できます。

現在のバージョンは v2.0.0 です。変更の内容は [CHANGELOG.md](CHANGELOG.md) にあります。

## 🚀 Live Demo

https://ssmbc2929bartok.github.io/codtec/

## ✨ 特徴

### 24 言語・2900 問以上

どの言語にも 100 問以上あり、すべての問題に短い解説が付いています。

| 分類 | 言語 |
|---|---|
| SYSTEMS | C / C++ / Rust / Go |
| APP / JVM | Java / Kotlin / Swift / C# / Dart |
| SCRIPT | Python / Ruby / PHP / Lua |
| WEB | JavaScript / TypeScript / HTML / CSS |
| DATA / FUNCTIONAL | SQL / R / Haskell / Elixir |
| TOOLS / INFRA | Shell / Linux / Git / Docker |

言語の先頭にある ALL LANGS を選ぶと、全言語をまたいで出題します。PICK LANGS を選ぶと、自分で選んだ複数の言語だけから出題します。MARATHON は問題切れを防ぐため、選んだ言語にかかわらず全言語から出題します。

### 5 つのコース

言語ごとに、出題する範囲を選べます。コースごとに文字の色が変わります。

| コース | 色 | 内容 |
|---|---|---|
| BASICS | 緑 | 基礎の構文 |
| STDLIB | 黄 | 標準ライブラリ・データ構造・組み込みの機能（C++ なら stack や priority_queue のメソッドなど） |
| IDIOMS | 青 | その言語らしい書き方 |
| ADVANCED | 紫 | 応用・上級者向け |
| LIBS | 橙 | ライブラリ・各界隈の定番（競技プログラミング、Web、機械学習、ゲーム開発、組み込みなど） |
| ALL | | 全コースからまとめて出題 |

### 7 つのゲームモード

| モード | 内容 |
|---|---|
| 10 WORDS TRIAL | 10 問をどれだけ速く打ち切れるか |
| 30s SCORE ATTACK | 30 秒間で何問打てるか |
| 60s SCORE ATTACK | 60 秒間で何問打てるか |
| 120s SCORE ATTACK | 120 秒間で何問打てるか |
| MARATHON | 持ち時間 30 秒で開始。1 問クリアするごとに 10 秒増える。50 問クリア以降は、1 回ミスするごとに 0.1 秒減る。何問続けられるか。全言語から出題 |
| SUDDEN DEATH | 1 回でもミスしたら終了。何問続けられるか |
| CUSTOM | 問題数・持ち時間・1 問ごとの追加時間・1 ミスごとの減少時間・ミスの上限を自分で決めて遊ぶ。記録は保存されない |

### そのほか

- 開始前の 3 カウント
- プレイ中の一時停止（タイマーが止まり、問題文は隠れます）
- KPM（Keys Per Minute）、ミス回数、正確性（Accuracy）の表示
- 結果画面での振り返り（プレイした問題のコース、ミス回数、解説）
- 言語・コース・モードごとの自己ベストの保存
- 結果を X でシェア

## 🛠 操作方法

ゲーム内の HOW TO PLAY（メニューの右上）にも、同じ内容と入力の決まりを載せています。

| 場面 | キー | 動作 |
|---|---|---|
| メニュー | `←` `→` | 言語を選ぶ |
| メニュー | `↑` `↓` | コースを選ぶ |
| メニュー | `1` 〜 `7` | モードを選ぶ |
| メニュー | `Enter` | ゲーム開始 |
| プレイ中 | `Esc` | 一時停止 |
| 一時停止中 | `Esc` / `Enter` | 再開 |
| 一時停止中 | `R` | 最初からやり直す |
| 一時停止中 | `Q` | メニューへ戻る |
| プレイ中・一時停止中 | `Ctrl + C` | すぐに中断してメニューへ戻る（Mission Abort） |
| 結果画面 | `Enter` | もう一度 |
| 結果画面 | `Esc` | メニューへ戻る |

## 📝 問題を足す

問題は 1 言語 1 ファイル、1 行 1 問で書いてあります。足し方は [data/README.md](data/README.md) を見てください。

```bash
node tools/validate.mjs
```

で、問題データに誤りがないか確かめられます。

## 🛠 技術スタック

- Frontend: HTML5, CSS3, JavaScript (Vanilla JS)。ビルドは不要です。
- Engine: AI-Assisted Development

手元で動かすには、このフォルダで次を実行して http://localhost:8765 を開きます。

```bash
python3 -m http.server 8765
```

## 🚚 公開のしかた

main ブランチにプッシュすると、GitHub Pages が https://ssmbc2929bartok.github.io/codtec/ に公開します。

## 📂 今後のアップデート予定

- [x] 対応言語の追加
- [ ] Firebase によるグローバルランキングの実装
- [ ] ダークモード / エディタテーマの変更機能

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。全文は [LICENSE](LICENSE) にあります。著作権表示とライセンスの文面を残せば、誰でも自由に使用、改変、再配布ができます。

v1 は CC0 (Creative Commons Zero) で公開していました。v2.0.0 から MIT ライセンスに変えています。
