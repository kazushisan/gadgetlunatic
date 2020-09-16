---
title: "最適化ソルバーSCIP，モデリング言語Pyomoを使ってPythonで最適化問題を解いてみた"
date: 2020-09-16T21:11:56+09:00
draft: true
toc: true
---

## tl;dr

最適化ソルバーSCIPとPythonベースのモデリング言語をPyomoを使ってPython上で最適化問題を解く方法をまとめました．Macでのインストールを想定していますが，UNIXライクなOSであれば，ほぼほぼ同じ手順で再現できると思います．

## SCIP とは

> SCIP is currently one of the fastest non-commercial solvers for mixed integer programming (MIP) and mixed integer nonlinear programming (MINLP). It is also a framework for constraint integer programming and branch-cut-and-price. It allows for total control of the solution process and the access of detailed information down to the guts of the solver.

[公式サイト](https://www.scipopt.org/)より

との通り，SCIPは非商用・無料で使える高速な最適化ソルバーです．混合整数計画問題と混合整数非線形計画問題に対応しています．

## Pyomo とは

> Pyomo is a Python-based open-source software package that supports a diverse set of optimization capabilities for formulating and analyzing optimization models.

[Github](https://github.com/Pyomo/pyomo)より

との通り，PyomoはPythonのライブラリで，最適化問題の記述を行うことができます．

Pythonで最適化問題を解くためには，Pyomoによってモデルを記述した上で，SCIPのソルバーを使って実際に問題を解きます．SCIPはネイティブコードとして実行されるので，Python上のPyomoとSCIPのやりとりのためにAMPLというモデリング言語がインタフェースの役割を果たします．

## インストール



