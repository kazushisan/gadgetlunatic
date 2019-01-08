---
title: "ページの設定"
date: 2019-01-08T20:17:54+09:00
draft: false
weight: 4
type: "documentation"
---
## ヘッダー

ヘッダーの設定を変更するには、[プリアンブル](https://gadgetlunatic.com/latex/basics/#はじめに)で`\pagestyle{}`コマンドを、特定のページのみのヘッダー設定を変更するには`\thispagestyle`コマンドを用います。

共通して利用できるオプションは、

|オプション|説明|
|---|---|
|empty|ページ番号含めなにも表示しない|
|plain|ページ番号のみ表示する
|headings|既定のヘッダー|
|myheadings|自分でカスタマイズしたヘッダー|



## ページ余白の設定

普段よく使う四方25mmのマージンに設定するには、
```
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
と記述します。マージンを他の値に設定したい場合も、コメントを読めば理解できると思います。