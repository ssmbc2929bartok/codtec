// languages.js
const WORD_DATA = {
    cpp: [
        "#include <iostream>",
        "int main() {",
        "std::",
        "cout <<",
        "vector<int>",
        "using namespace std;",
        "nullptr",
        "static_cast<int>",
        "template<typename T>",
        "for(int i=0; i<n; i++)",
        "return 0;"
    ],
    java: [
        "public static void main",
        "System.out.println",
        "public class Main {",
        "ArrayList<String> list",
        "@Override",
        "implements Serializable",
        "try { } catch (Exception e)",
        "interface",
        "volatile",
        "synchronized"
    ],
    python: [
        "def __init__(self):",
        "import numpy as np",
        "if __name__ == '__main__':",
        "yield from",
        "lambda x: x * 2",
        "with open(path) as f:",
        "async def",
        "list(map(int, input().split()))",
        "try: ... except:",
        "classmethod"
    ],
    javascript: [
        "const",
        "let",
        "export default class",
        "await Promise.all()",
        "document.getElementById",
        "addEventListener",
        "() => { }",
        "JSON.parse()",
        "console.log(`Debug: ${v}`)",
        "setTimeout(() => {}, 100)"
    ]
};
