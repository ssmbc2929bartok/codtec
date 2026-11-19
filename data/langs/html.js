Codtec.register({
    id: 'html',
    name: 'HTML',
    group: 'web',
    words: String.raw`
@@ basics
<!DOCTYPE html>  ※ HTML5 の文書であることを宣言する
<html lang="ja">  ※ 文書の言語を示す。読み上げや翻訳で使われる
<meta charset="UTF-8">  ※ 文字コードの指定。head の最初に書く
<title>My Page</title>  ※ タブや検索結果に出るページの題名
<h1>Hello, world!</h1>  ※ 最上位の見出し。原則 1 ページに 1 つ
<p class="lead">text</p>  ※ 段落。class は CSS や JavaScript から指すための名前
<a href="https://example.com">link</a>  ※ リンク
<img src="logo.png" alt="logo">  ※ alt は画像の代わりになる説明
<ul><li>item</li></ul>  ※ 順序のない箇条書き
<div id="app"></div>  ※ 意味を持たない汎用の箱。id はページ内で 1 つだけ
<br>  ※ 改行。閉じタグは要らない
<link rel="stylesheet" href="style.css">  ※ CSS ファイルを読み込む
<script src="main.js"></script>  ※ JavaScript ファイルを読み込む
<button type="button">OK</button>  ※ ボタン。type を書かないとフォームを送信する

@@ stdlib
<h2>Section</h2>  ※ 第 2 階層の見出し。階層を飛ばさずに使う
<ol><li>first</li></ol>  ※ 順序のある箇条書き
<span class="tag">new</span>  ※ 意味を持たないインラインの箱
<hr>  ※ 話題の区切りを表す水平線
<blockquote cite="https://example.com">  ※ 引用文のブロック
<pre><code>const x = 1;</code></pre>  ※ 整形済みのコードを表示する
<kbd>Ctrl</kbd> + <kbd>C</kbd>  ※ キーボード入力を表す
<abbr title="HyperText Markup Language">HTML</abbr>  ※ 略語と正式名称
<time datetime="2026-01-25">Jan 25</time>  ※ 機械が読める形の日時を添える
<mark>highlight</mark>  ※ 目立たせたい部分
<small>note</small>  ※ 注記や細目
<sub>2</sub> <sup>10</sup>  ※ 下付き文字と上付き文字
<del>old</del> <ins>new</ins>  ※ 削除した部分と追加した部分
<dl><dt>term</dt><dd>description</dd></dl>  ※ 用語と説明のリスト
<address>contact</address>  ※ 連絡先の情報
<aside>related</aside>  ※ 本筋から外れた補足
<input type="text" placeholder="Name">  ※ 1 行のテキスト入力欄
<input type="password" autocomplete="current-password">  ※ パスワード欄。自動入力の手がかりを付ける
<input type="number" min="0" max="100" step="5">  ※ 数値の入力欄。範囲と刻みを指定
<input type="date">  ※ 日付を選ぶ入力欄
<input type="file" accept="image/*" multiple>  ※ ファイル選択。画像だけ、複数可
<input type="radio" name="plan" value="pro">  ※ 同じ name の中から 1 つ選ぶ
<input type="range" min="0" max="10">  ※ スライダー
<input type="hidden" name="token">  ※ 画面に出さずに送る値
<input type="search" name="q">  ※ 検索用の入力欄
<button type="submit" disabled>Send</button>  ※ 送信ボタン。disabled で押せなくする
<fieldset><legend>Profile</legend></fieldset>  ※ フォームの項目をまとめて見出しを付ける
<optgroup label="Web">  ※ 選択肢をグループに分ける
<datalist id="langs"><option value="Go"></datalist>  ※ 入力候補の一覧
<progress value="30" max="100"></progress>  ※ 進み具合を表すバー
<meter value="0.7">70%</meter>  ※ 範囲の中での量を表すゲージ
<output name="result">0</output>  ※ 計算結果を表示する場所
<thead><tr><th scope="col">Name</th></tr></thead>  ※ 表の見出し行。scope で列の見出しと示す
<tbody><tr><td colspan="2">total</td></tr></tbody>  ※ 表の本体。colspan でセルを横につなぐ
<caption>Monthly sales</caption>  ※ 表の題名
<audio src="bgm.mp3" controls loop></audio>  ※ 音声を再生する
<source src="movie.webm" type="video/webm">  ※ 動画や音声の候補を並べる
<track kind="subtitles" srclang="ja" src="ja.vtt">  ※ 動画に字幕を付ける
<embed type="application/pdf" src="doc.pdf">  ※ PDF などを埋め込む
<base href="https://example.com/">  ※ 相対 URL の基準を決める
<noscript>Please enable JavaScript.</noscript>  ※ JavaScript が動かないときに表示する
<link rel="icon" href="favicon.ico">  ※ タブに出るアイコン
<meta name="description" content="about">  ※ 検索結果に出るページの説明文
<style>body { margin: 0; }</style>  ※ HTML の中に CSS を書く

@@ features
<header><nav></nav></header>  ※ 意味を持つ要素で骨組みを作る。ここではヘッダーの中にナビゲーション
<section aria-labelledby="title">  ※ 見出しを持つ内容のまとまり
<article>  ※ それだけで完結する内容。記事や投稿
<form action="/login" method="post">  ※ 入力を送信するフォーム
<input type="email" name="email" required>  ※ メールアドレス欄。required で必須にする
<label for="name">Name</label>  ※ 入力欄の名前。for で id と結び付ける
<select name="lang"><option>C</option></select>  ※ プルダウンの選択肢
<textarea rows="4"></textarea>  ※ 複数行のテキスト入力欄
<table><tr><th>ID</th><td>1</td></tr></table>  ※ 表。th は見出しセル、td はデータセル
<meta name="viewport" content="width=device-width">  ※ スマホで画面幅に合わせて表示させる
<a href="#top" target="_blank" rel="noopener">  ※ 新しいタブで開く。noopener は安全のため
<figure><figcaption>Fig. 1</figcaption></figure>  ※ 図とその説明文
<input type="checkbox" checked>  ※ チェックボックス。checked で最初から選択
<strong>important</strong> <em>stress</em>  ※ 重要さと強調を意味として表す
&lt;div&gt; &amp; &copy;  ※ 文字参照
<!-- comment -->  ※ コメント。画面には出ない

@@ advanced
<script type="module" src="app.js" defer></script>  ※ ES モジュールとして読み込む
<img loading="lazy" srcset="a.png 1x, b.png 2x">  ※ 遅延読み込みと、解像度に応じた画像の出し分け
<picture><source media="(min-width: 800px)">  ※ 画面幅で画像を切り替える
<template id="row"><tr></tr></template>  ※ 描画されないひな形。JavaScript で複製して使う
<slot name="title"></slot>  ※ Web Components で外から中身を差し込む場所
<dialog open>  ※ 標準のダイアログ要素
<details><summary>More</summary></details>  ※ JavaScript なしで開閉できる折りたたみ
<video controls autoplay muted playsinline>  ※ 動画。自動再生には muted が必要
<canvas id="stage" width="640" height="480">  ※ JavaScript で絵を描く領域
<link rel="preload" as="font" crossorigin>  ※ フォントを先に読み込ませる
<meta property="og:image" content="ogp.png">  ※ SNS でシェアされたときの画像（OGP）
<button aria-expanded="false" aria-controls="menu">  ※ 開閉の状態を支援技術に伝える
<div role="alert" aria-live="polite">  ※ 内容の変化をスクリーンリーダーに知らせる
<input pattern="[0-9]{3}-[0-9]{4}" inputmode="numeric">  ※ 正規表現で入力を検証し、数字キーボードを出す
<iframe sandbox="allow-scripts" title="demo">  ※ 別ページを制限つきで埋め込む
data-user-id="42"  ※ 独自のデータ属性。JavaScript から dataset で読める

@@ ecosystem
<div className="card" onClick={handleClick}>  ※ JSX
{items.map(item => <li key={item.id} />)}  ※ JSX でリストを描く。key が必要
<div v-if="visible" :class="{ active }">  ※ Vue
<li v-for="item in items" :key="item.id">  ※ Vue のくり返し表示
<button @click="count++">  ※ Vue のクリックイベント
<div class="flex items-center gap-4 p-6">  ※ Tailwind CSS
<div class="container"><div class="row">  ※ Bootstrap
{% for post in posts %}  ※ Jinja / Django テンプレート
{{ user.name | upper }}  ※ テンプレートの変数とフィルタ
{% extends "base.html" %}  ※ テンプレートの継承
<%= link_to "Home", root_path %>  ※ ERB（Rails）
<button hx-get="/items" hx-target="#list">  ※ htmx
<div x-data="{ open: false }">  ※ Alpine.js
<svg viewBox="0 0 24 24" fill="none">  ※ SVG。アイコンによく使うベクター画像
<path d="M4 6h16M4 12h16M4 18h16" />  ※ SVG のパス。これはハンバーガーメニュー
`,
});
