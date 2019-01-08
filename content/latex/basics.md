---
title: "基本"
date: 2019-01-08T19:17:07+09:00
draft: false
weight: 3
type: "documentation"
---
## はじめに

[導入](https://gadgetlunatic.com/latex/introduction/)で書いたように、以降ではLuaLaTeXの使用を前提とします。

まずは、最低限のソースファイルを作ってみます。仮に`article.tex`として、下の内容でテキストファイルを作成します。

```
\documentclass[12pt,a4j]{ltjsarticle}
% プリアンブル
\usepackage{luatexja}
\begin{document}
はじめてのLaTeX
\end{document}
```
基本的な構成は`html`などと変わりません。`\begin{document}`以前が`<head>`に相当するプリアンブル、`\begin{document} \end{document}`で囲まれた部分が`<body>`に相当します。
保存したディレクトリで`$ lualatex article`を実行すると`article.pdf`をはじめとしたファイルが作成されます。今後はこのファイルに追記していきます。

## タイトルの設定

`\begin{document}`の直後に
```
\title{タイトル}
\author{作者\thanks{所属}}
\date{2018年1月1日}
\maketitle
```
と入力してみましょう。

`\maketitle`コマンドを書くことによって実際にタイトルが生成されます。そのため、`\maketitle`がない場合にはタイトルは表示されません。`\date{}`コマンドによって日付を記入できます。`\date{\today}`で今日の日付を自動的に出力することもできます。[^1]

`\thanks{}`コマンドを使うことで、所属をいい感じに表示してみました。

## 見出し

主に使うのは以下のコマンドだと思います。

```
\section{}
\subsection{}
\subsubsection{}
\paragraph{}
\subsubparagraph{}
```

見出しのスタイルを変更したい時には、`\renewcommand`コマンドを使うことができます。私がよく使う例だと`subsection`に`section`の番号を表示させないようにすることがあります。これを実現するには、
```
\renewcommand{\thesubsection}{\arabic{subsection}}
```
と付け加えます。


[^1]: `\date{}`コマンドを省略した場合にも同じように今日の日付が出力されます。

