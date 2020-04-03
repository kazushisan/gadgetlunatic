---
title: "Gurobi + Pythonを使ってMacで最適化問題を解く"
date: 2020-04-03T23:26:37+09:00
draft: true
toc: true
---

## これは何

MacでGurobiのダウンロード・インストール・アカデミックライセンスの有効化する方法をまとめたメモです．最後に動作確認のためGurobi + Pythonで簡単な最適化問題を解きました．

## 環境

- macOS 10.14.6
- Python 3.8.2 (pyenvでインストールした状態)
- pip（宗教上の理由でanacondaは使えないので）
- インストールするGurobi: v9.0

## Gurobiのセットアップ

### 公式サイトに登録

https://pages.gurobi.com/registration からGurobiのアカウントを発行できます．`Academic` をプルダウンから選択した上で，メールアドレスには `.ac.jp` ドメインのものを設定しました．

![登録画面](gurobi-register.png)

指定したメールアドレスにパスワード設定用のリンクを含むメールが飛んできます．パスワードを設定したら https://www.gurobi.com/account/ にログインします．

### ライセンスの発行

Gurobiの公式サイトにログインできたら，右上のメニューより，`Download & Licenses` > `Academic License` を選択するか https://www.gurobi.com/downloads/end-user-license-agreement-academic/ にアクセスすることでアカデミックライセンスを発行できます．同意するとすぐにライセンスが発行されます．

![ライセンスの発行画面](gurobi-license.png)


### ダウンロード

http://www.gurobi.com/downloads/gurobi-optimizer からダウンロードできます．macOS用の `.pkg` ファイルをダウンロードして，実行します．

![インストーラの画面](gurobi-installer.png)

### ライセンスの有効化

https://www.gurobi.com/downloads/licenses/ にさきほど発行したライセンスがあるので，License IDをクリックして詳細画面に移動します．ページの下のほうに`grbgetkey`からはじまるコマンドが記載されているので，これをそのままコピーしてターミナルで実行します．

### 動作確認

ターミナルで

```bash
gurobi.sh
```

を実行して，Gurobiのインタラクティブシェルが問題なく起動することを確認します．

### Pythonスクリプト内でインポートして使えるようにする

Gurobi自体にもPythonのランタイムは付属しており，`gurobi.sh your-file-name.py` といった形で実行したり，Gurobiのインタラクティブシェルだけを使っている分にはなにもしなくていいのですが，自分で用意したPython環境内でGurobiを使いたいので次の手順を実行しました．

はじめに次のコマンドを実行してGurobiがインストールされているディレクトリを探します．

```bash
readlink `which gurobi.sh`
```

`//Library/gurobi901/mac64/bin/gurobi.sh` のような出力が得られるので，`bin/gurobi.sh` 以前の部分のパスに移動します．

```bash
cd /Library/gurobi901/mac64
```

最後に次のコマンドを実行して，自分で用意したPython環境内にGurobiのライブラリを追加します．

```bash
python setup.py install
```

問題なく追加できた場合，`pip list` を実行すると `gurobipy` が一覧に含まれているの確認できます．
