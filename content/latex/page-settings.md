---
title: "ページの設定"
date: 2019-01-08T20:17:54+09:00
weight: 4
---
## ヘッダー・ページ番号

ヘッダーの設定を変更するには、[プリアンブル](https://gadgetlunatic.com/latex/basics/#はじめに)で`\pagestyle`コマンドを、特定のページのみのヘッダー設定を変更するには`\thispagestyle`コマンドを用います。

共通して利用できるオプションは以下の通りです。

|オプション|説明|
|---|---|
|empty|ページ番号含めなにも表示しない|
|plain|ページ番号のみ表示する|
|headings|既定のヘッダー|
|myheadings|自分でカスタマイズしたヘッダー|

例えば全てのページにページ番号のみを表示する場合には、プリアンブルに
```latex
\pagestyle{plain}
```
と記述します。`\pagestyle{myheadings}`を選んだ場合には、`\markright{右ページのヘッダー}`や`\markleft{左ページのヘッダー}`コマンドを用いて左右いづれかのヘッダーのみを指定するか、`\markboth{左ページのヘッダー}{右ページのヘッダー}`コマンドで左右両方のヘッダーを指定します。

## ページ余白の設定

普段よく使う四方25mmのマージンに設定するには、
```latex
% 縦
\setlength{\textheight}{\paperheight} % 本文の高さを紙面の高さにする
\setlength{\topmargin}{-0.4truemm}
% もともとLaTeXでは上からのオフセットが1インチに設定されているので、それを25mmにする。
\addtolength{\topmargin}{-\headheight} 
\addtolength{\topmargin}{-\headsep} % ヘッダーの分を上のマージンから減らす。
\addtolength{\textheight}{-50truemm} % 本文の高さから50mm引く
% 横
\setlength{\textwidth}{\paperwidth} % 本文の幅を紙面の高さにする
\setlength{\oddsidemargin}{-0.4truemm} % 左からのオフセットを25mmになおす。
\setlength{\evensidemargin}{-0.4truemm} % 左からのオフセットを25mmになおす。
\addtolength{\textwidth}{-50truemm} % 本文の幅から50mm引く
```
と記述します。
