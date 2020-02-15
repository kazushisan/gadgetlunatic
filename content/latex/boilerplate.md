---
title: "ボイラープレート"
date: 2019-01-08T22:07:05+09:00
draft: false
type: "documentation"
weight: 5
---
## 短いレポート
私が普段短いレポート課題を提出するときに使う設定をまとめたボイラープレートです。

```latex
\documentclass[12pt,a4j]{ltjsarticle}
\usepackage{amsmath,amssymb}
\usepackage{luatexja}
\usepackage{enumitem}
\pagestyle{plain}
% マージンは四方25mm
\setlength{\textheight}{\paperheight}
\setlength{\topmargin}{-0.4truemm}
\addtolength{\topmargin}{-\headheight} 
\addtolength{\topmargin}{-\headsep}
\addtolength{\textheight}{-50truemm}
\setlength{\textwidth}{\paperwidth}
\setlength{\oddsidemargin}{-0.4truemm}
\setlength{\evensidemargin}{-0.4truemm}
\addtolength{\textwidth}{-50truemm}
\begin{document}
\subsection*{レポートのタイトル}
\noindent 所属\\
名前

\begin{enumerate}[label=\textbf{\arabic*}, leftmargin=*]
\item 問題
\item 問題
\end{enumerate}
\end{document}
```
