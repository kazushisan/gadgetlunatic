---
title: "Arch LinuxにLaTeXをインストール"
date: 2018-10-22T17:52:36+09:00
draft: false
weight: 2
type: "documentation"
---
## はじめに

Arch Linuxでpacmanを使わずにTex Liveインストーラから（ミニマルな）LaTeXの環境を構築してみました．

Linuxの場合pacmanなどパッケージマネージャーで管理することもできるのですが，（Macと同じように）tlmgrでTeXのパッケージを管理したかったのでTex Liveインストーラを選びました．

## TeX関連のパッケージをpacmanの管理下からはずす

[TeX Wiki](https://texwiki.texjp.org/?texlive-dummy#archlinux)によると，

> Linux で TeX Live 公式パッケージをインストールした場合は TeX Live に依存するパッケージによって各種 Linux ディストリビューションが提供している TeX Live がインストールされないように TeX Live の dummy パッケージをインストールします．

ですが，dummyパッケージについてはあまりきれいな解決方法ではないため，議論が起き現在はAURから削除されているようです．ここでは`pacman --assume-installed`を使ってを解決してみました．

[texlive-dummyのソースコード](https://github.com/zhou13/aur/blob/master/texlive-dummy/PKGBUILD)を見てみると，

```:PKGBUILD
conflicts=('texlive-bin' $(pacman -Sgq texlive-most texlive-lang))
provides=('texlive-bin' $(pacman -Sgq texlive-most texlive-lang))
```
この部分で調整しているようなので，texlive関連のパッケージが常にpacmanに無視されるように以下を`~/.bashrc`に追加しました．

```:.bashrc
alias pacman="pacman --assume-installed texlive-bin $(\pacman -Sgq texlive-most texlive-lang)"
```

読み込むために一度ターミナルで`$ source ~/.bashrc`を実行．

## インストール

参考：[Linux - TeX Wiki](https://texwiki.texjp.org/?Linux#texliveinstall)

インストーラをダウンロードして実行．

```
$ curl -OL http://mirror.ctan.org/systems/texlive/tlnet/install-tl-unx.tar.gz
$ tar xvf install-tl-unx.tar.gz
$ cd install-tl-20*
$ sudo ./install-tl --repository http://ftp.jaist.ac.jp/pub/CTAN/systems/texlive/tlnet/
```
インストーラにしたがって、オプションを選択します．今回は普段使っているMacのBasicTeXに準じている`small scheme`を選びました．他のオプションはそのままでインストール．

インストーラの動作が終了したらしたら，パスを通して，日本語環境とghostscriptをインストール．

```
$ sudo /usr/local/texlive/????/bin/*/tlmgr path add
$ sudo tlmgr update --self -all
$ sudo tlmgr install collection-langjapanese
$ sudo pacman -S ghostscript
```
## 実行

LuaLaTeXを使用する場合は

```
$ lualatex ファイル名
```
実行の途中で`! LaTeX Error: File [パッケージ名].sty' not found.`などとパッケージがないというエラーが出た場合は適宜`$ sudo tlmgr install [パッケージ名]`でインストールします．
