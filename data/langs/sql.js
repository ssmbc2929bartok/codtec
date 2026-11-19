Codtec.register({
    id: 'sql',
    name: 'SQL',
    group: 'data',
    words: String.raw`
@@ basics
SELECT * FROM users;  ※ テーブルの全行・全列を取り出す
SELECT name, age FROM users WHERE age >= 20;  ※ 列を選び、条件で行を絞る
INSERT INTO users (name, age) VALUES ('Alice', 20);  ※ 行を追加する
UPDATE users SET age = 21 WHERE id = 1;  ※ 行を更新する。WHERE を忘れると全行が変わる
DELETE FROM users WHERE id = 1;  ※ 行を削除する。WHERE を忘れると全行が消える
ORDER BY created_at DESC  ※ 新しい順に並べる
LIMIT 10 OFFSET 20  ※ 21 件目から 10 件。ページ分けで使う
WHERE name LIKE 'A%'  ※ 前方一致。% は任意の文字列
WHERE id IN (1, 2, 3)  ※ 候補のどれかに一致する
WHERE deleted_at IS NULL  ※ NULL との比較は = ではなく IS
SELECT COUNT(*) FROM orders;  ※ 行数を数える
SELECT DISTINCT country FROM users;  ※ 重複を除いて取り出す
WHERE price BETWEEN 100 AND 500  ※ 範囲で絞る。両端を含む
AND status <> 'done'  ※ <> は「等しくない」

@@ stdlib
SUM(amount)  ※ 合計を求める集約関数
AVG(score)  ※ 平均を求める
MAX(price) - MIN(price)  ※ 最大と最小の差
COUNT(DISTINCT user_id)  ※ 重複を除いた件数
ROUND(price * 1.1, 2)  ※ 小数第 2 位に丸める
ABS(diff)  ※ 絶対値
MOD(id, 2) = 0  ※ 余りを求める。偶数の判定
CEIL(total / 10.0)  ※ 切り上げ。ページ数の計算で使う
FLOOR(score)  ※ 切り捨て
POWER(2, 10)  ※ べき乗
UPPER(name)  ※ 大文字にする
LOWER(email)  ※ 小文字にする
LENGTH(name)  ※ 文字列の長さ
TRIM(name)  ※ 前後の空白を取り除く
CONCAT(first_name, ' ', last_name)  ※ 文字列をつなげる
first_name || ' ' || last_name  ※ 標準 SQL の文字列連結
SUBSTRING(name FROM 1 FOR 3)  ※ 部分文字列を取り出す
REPLACE(phone, '-', '')  ※ 文字列を置き換える
LEFT(zip, 3)  ※ 先頭から 3 文字
POSITION('@' IN email)  ※ 文字列の中での位置
CAST(price AS INTEGER)  ※ 型を変換する
NULLIF(total, 0)  ※ 等しければ NULL を返す。0 除算を避ける定番
IFNULL(nickname, 'none')  ※ NULL なら別の値を返す（MySQL / SQLite）
GREATEST(a, b)  ※ 引数のうち最大の値
CURRENT_DATE  ※ 今日の日付
NOW()  ※ 現在の日時
EXTRACT(YEAR FROM created_at)  ※ 日時から年を取り出す
DATE_TRUNC('month', created_at)  ※ 月の初めに切りそろえる（PostgreSQL）
created_at + INTERVAL '7 days'  ※ 日時に期間を足す
DATE_FORMAT(created_at, '%Y-%m')  ※ 日時を書式つきで文字列にする（MySQL）
STRING_AGG(name, ', ')  ※ グループ内の文字列をつなげる（PostgreSQL）
GROUP_CONCAT(name)  ※ グループ内の文字列をつなげる（MySQL）
ARRAY_AGG(id ORDER BY id)  ※ グループ内の値を配列にまとめる
JSON_EXTRACT(data, '$.name')  ※ JSON から値を取り出す
price DECIMAL(10, 2) NOT NULL  ※ 桁数を決めた数値の型。金額には DECIMAL を使う
body TEXT NOT NULL  ※ 長さを決めない文字列の型
created_at TIMESTAMP NOT NULL  ※ 日時の型。日付だけなら DATE を使う
BOOLEAN DEFAULT FALSE  ※ 真偽値の型と既定値
CHECK (price >= 0)  ※ 値の条件を決める制約
WHERE name ILIKE '%alice%'  ※ 大文字小文字を区別しない部分一致（PostgreSQL）
WHERE email ~ '^[a-z]+@'  ※ 正規表現で絞る（PostgreSQL）
ORDER BY score DESC NULLS LAST  ※ NULL を最後に並べる
SELECT 1 + 1 AS two;  ※ 列に別名を付ける
TRUNCATE TABLE logs;  ※ 全行を高速に削除する
ALTER TABLE users RENAME COLUMN name TO full_name;  ※ 列の名前を変える
ALTER TABLE users DROP COLUMN age;  ※ 列を削除する

@@ features
INNER JOIN orders o ON o.user_id = u.id  ※ 両方のテーブルに一致する行だけを結合する
LEFT JOIN profiles p ON p.user_id = u.id  ※ 左のテーブルの行は一致がなくても残す
GROUP BY user_id HAVING COUNT(*) > 1  ※ グループ化し、集約結果で絞る
SELECT user_id, SUM(amount) AS total  ※ グループごとの合計に別名を付ける
CREATE TABLE users (id INT PRIMARY KEY);  ※ テーブルを作る。主キーは行を一意に決める
name VARCHAR(255) NOT NULL UNIQUE  ※ 必須で、重複を許さない列
FOREIGN KEY (user_id) REFERENCES users(id)  ※ 外部キー。ほかのテーブルの行を指す
ALTER TABLE users ADD COLUMN email TEXT;  ※ 列を追加する
CREATE INDEX idx_users_email ON users (email);  ※ 索引を作る。検索が速くなる
DROP TABLE IF EXISTS tmp;  ※ あれば削除する
CASE WHEN age < 20 THEN 'minor' ELSE 'adult' END  ※ 条件分岐の式
COALESCE(nickname, name)  ※ 最初の NULL でない値を返す
WHERE EXISTS (SELECT 1 FROM orders)  ※ 副問い合わせに行があるかで絞る
UNION ALL  ※ 2 つの結果を重複を残してつなげる
BEGIN TRANSACTION;  ※ トランザクションを始める。COMMIT で確定、ROLLBACK で取り消す
DEFAULT CURRENT_TIMESTAMP  ※ 既定値を現在の日時にする

@@ advanced
WITH recent AS (SELECT * FROM orders)  ※ 共通テーブル式（CTE）
ROW_NUMBER() OVER (PARTITION BY user_id)  ※ ウィンドウ関数
RANK() OVER (ORDER BY score DESC)  ※ 順位を付ける。同点は同じ順位
LAG(price) OVER (ORDER BY day)  ※ 1 つ前の行の値を参照する
WITH RECURSIVE tree AS (  ※ 再帰 CTE。階層や木構造をたどる
EXPLAIN ANALYZE SELECT * FROM users;  ※ 実行計画と実際の時間を調べる
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name  ※ あれば更新、なければ追加（UPSERT）
SELECT * FROM jobs FOR UPDATE SKIP LOCKED  ※ 行をロックし、ロック済みは飛ばす。ジョブキューで使う
CREATE VIEW active_users AS  ※ ビュー。問い合わせに名前を付けて保存する
ROLLBACK TO SAVEPOINT sp1;  ※ トランザクションの途中まで戻す
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;  ※ 分離レベルを最も厳しくする
GRANT SELECT ON users TO readonly;  ※ 権限を与える
CREATE TRIGGER trg AFTER INSERT ON orders  ※ 行の追加をきっかけに処理を動かす
CROSS JOIN LATERAL  ※ 左の行ごとに右の副問い合わせを評価する
SUM(amount) FILTER (WHERE paid)  ※ 条件に合う行だけ集約する
ON DELETE CASCADE  ※ 親の行を消すと子の行も消える

@@ ecosystem
psql -U postgres -d mydb  ※ PostgreSQL
\dt  ※ psql でテーブルの一覧を見る
data->>'name'  ※ PostgreSQL の JSON 演算子
SERIAL PRIMARY KEY  ※ PostgreSQL の自動採番の主キー
RETURNING id;  ※ 追加や更新した行の値を返す（PostgreSQL）
mysql -u root -p  ※ MySQL
SHOW TABLES;  ※ MySQL でテーブルの一覧を見る
AUTO_INCREMENT  ※ MySQL の自動採番
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;  ※ MySQL のテーブル設定。絵文字も入る文字コード
sqlite3 app.db ".schema"  ※ SQLite
PRAGMA foreign_keys = ON;  ※ SQLite で外部キー制約を有効にする
SELECT TOP 10 * FROM users;  ※ SQL Server
SELECT * FROM \`project.dataset.table\`  ※ BigQuery
pg_dump mydb > backup.sql  ※ PostgreSQL のバックアップを取る
`,
});
