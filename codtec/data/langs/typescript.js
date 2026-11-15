Codtec.register({
    id: 'ts',
    name: 'TypeScript',
    group: 'web',
    words: String.raw`
@@ basics
const name: string = "TS";  ※ 変数に型注釈を付ける
let count: number = 0;  ※ 数値型。整数と小数の区別はない
function add(a: number, b: number): number {  ※ 引数と戻り値に型を付ける
const nums: number[] = [1, 2, 3];  ※ 数値の配列
interface User { name: string; age: number; }  ※ オブジェクトの形を定義する
type Id = string | number;  ※ 型に別名を付ける。ここではユニオン型
const user: User = { name: "Alice", age: 20 };  ※ 型に合わないとコンパイルエラーになる
function log(msg: string): void {  ※ void は値を返さないことを表す
let value: unknown;  ※ 何でも入るが、使う前に型の確認が必要
age?: number;  ※ 省略できるプロパティ
export const PI = 3.14;  ※ 名前付きエクスポート
import type { User } from "./types";  ※ 型だけをインポートする
const done: boolean = false;  ※ 真偽値型
class Point { constructor(public x: number) {} }  ※ 引数でプロパティを宣言する書き方
const pair: [string, number] = ["a", 1];  ※ タプル型。位置ごとに型が決まる
let anything: any;  ※ 型検査を外す。できるだけ避ける

@@ stdlib
Array<string>  ※ string[] と同じ意味の書き方
ReadonlyArray<number>  ※ 書き換えられない配列
Map<string, number>  ※ キーと値の型を指定した Map
Set<string>  ※ 要素の型を指定した Set
Promise<User[]>  ※ いずれ User の配列になる値
Partial<User>  ※ 全プロパティを省略可能にする
Required<User>  ※ 全プロパティを必須にする
Readonly<User>  ※ 全プロパティを読み取り専用にする
Pick<User, "name" | "age">  ※ 一部のプロパティだけ取り出す
Omit<User, "password">  ※ 指定したプロパティを除く
Record<string, number>  ※ キーと値の型を指定したオブジェクト型
Exclude<Status, "idle">  ※ ユニオン型から一部を除く
Extract<Status, "idle" | "done">  ※ ユニオン型から一部だけ取り出す
NonNullable<T>  ※ null と undefined を除く
ReturnType<typeof fn>  ※ 関数の戻り値の型を取り出す
Parameters<typeof fn>[0]  ※ 関数の第 1 引数の型を取り出す
Awaited<ReturnType<typeof load>>  ※ Promise の中身の型を取り出す
InstanceType<typeof Foo>  ※ クラスからインスタンスの型を得る
Uppercase<"hello">  ※ 文字列リテラル型を大文字にする
keyof User  ※ プロパティ名のユニオン型
typeof config  ※ 値から型を取り出す
keyof typeof config  ※ 値のキーをユニオン型として取り出す
User["name"]  ※ プロパティの型を取り出す（インデックスアクセス型）
(typeof roles)[number]  ※ 配列の要素の型をユニオンとして取り出す
string | undefined  ※ 値がないかもしれないことを表すユニオン型
A & B  ※ 交差型。両方の性質を持つ
never  ※ 起こりえないことを表す型
(e: MouseEvent) => void  ※ 関数の型。イベントハンドラでよく書く
HTMLInputElement  ※ input 要素の DOM の型
Record<"a" | "b", boolean>  ※ キーを限定したオブジェクト型
document.querySelector<HTMLDivElement>(".box")  ※ 取得する要素の型を指定する
new Map<string, number[]>()  ※ 型引数を付けて Map を作る
Object.keys(obj) as (keyof typeof obj)[]  ※ キーの型を取り戻す定番のキャスト
Array.isArray(x)  ※ 配列かどうかの判定。型も絞り込まれる
x instanceof Date  ※ クラスで型を絞り込む
"name" in obj  ※ プロパティの有無で型を絞り込む
JSON.parse(text) as User  ※ JSON の結果は any。型を付けるが検証はされない
Number(value)  ※ 数値に変換する
String(value)  ※ 文字列に変換する
structuredClone(state)  ※ ディープコピーする。型もそのまま保たれる
Error | null  ※ エラーか、なしかを表す

@@ features
type Status = "idle" | "loading" | "done";  ※ 文字列リテラルのユニオン型
function first<T>(xs: T[]): T | undefined {  ※ ジェネリクス。型を引数にする
const el = document.querySelector("#app")!;  ※ null でないと言い切る（非 null アサーション）
value as string  ※ 型アサーション。型を言い切る
readonly id: number;  ※ 読み取り専用のプロパティ
type Props = { children: React.ReactNode };  ※ React コンポーネントの props の型
if (typeof x === "string") {  ※ 型の絞り込み
enum Direction { Up, Down }  ※ 列挙型
const roles = ["admin", "user"] as const;  ※ リテラルのまま読み取り専用にする
function greet(name: string, greeting = "Hi") {  ※ 既定値つきの引数。型は推論される
function sum(...nums: number[]): number {  ※ 可変長引数の型
type Point = { x: number } & { y: number };  ※ 交差型でオブジェクト型を合成する
const pos = { x: 0, y: 0 } as const;  ※ オブジェクト全体を読み取り専用のリテラルにする
user?.address?.city ?? "unknown"  ※ 途中が undefined でも落ちない。なければ既定値
let id: string | number = 1;  ※ ユニオン型の変数
interface Admin extends User { role: string; }  ※ インターフェースを継承する

@@ advanced
type Nullable<T> = T | null;  ※ ジェネリックな型エイリアス
T extends (infer U)[] ? U : never  ※ 条件型と infer で配列の要素の型を取り出す
{ [K in keyof T]?: T[K] }  ※ マップ型
function isUser(x: unknown): x is User {  ※ 型ガード関数
type Getters<T> = \`get\${Capitalize<string & keyof T>}\`  ※ テンプレートリテラル型
const cfg = { port: 3000 } satisfies Config;  ※ 型に合うか検査しつつ、推論された型を保つ
declare module "*.svg";  ※ 型定義のないモジュールを宣言する
abstract class Shape { abstract area(): number; }  ※ 抽象クラス
function assertNever(x: never): never {  ※ switch の網羅漏れをコンパイル時に見つける
<T extends { id: number }>(item: T) => T  ※ 制約つきのジェネリクス
export type { Config };  ※ 型だけをエクスポートする
// @ts-expect-error  ※ 次の行のエラーを想定どおりとして抑える
function f(x: string): string;  ※ オーバーロードのシグネチャ
type DeepReadonly<T> = { readonly [K in keyof T]: T[K] }  ※ マップ型で読み取り専用にする
declare global { interface Window { app: App } }  ※ グローバルの型を拡張する
type Fn = (...args: never[]) => unknown;  ※ どんな関数でも受け取れる型

@@ ecosystem
npx tsc --noEmit  ※ 出力せずに型検査だけ行う
"strict": true,  ※ tsconfig.json
const [user, setUser] = useState<User | null>(null);  ※ React。状態の型を指定する
const ref = useRef<HTMLInputElement>(null);  ※ React。DOM 要素への参照
export async function GET(req: Request) {  ※ Next.js
z.object({ name: z.string().min(1) })  ※ Zod
type Input = z.infer<typeof schema>;  ※ Zod のスキーマから型を作る
@Injectable()  ※ Angular / NestJS
@Component({ selector: "app-root" })  ※ Angular のコンポーネント
defineProps<{ title: string }>()  ※ Vue
const prisma = new PrismaClient();  ※ Prisma。型安全な ORM
await prisma.user.findMany({ where: { active: true } })  ※ Prisma で条件つきの検索
Deno.serve((req) => new Response("ok"));  ※ Deno で HTTP サーバーを立てる
bun run dev  ※ Bun で開発サーバーを動かす
app.get("/", (c) => c.text("Hello"));  ※ Hono
import { describe, it, expect } from "vitest";  ※ Vitest のテスト関数を読み込む
`,
});
