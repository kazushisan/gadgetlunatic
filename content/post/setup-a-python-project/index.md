---
title: "Node.js使いがPythonの環境構築をするお話 2020年版"
date: 2020-04-01T06:57:17+09:00
draft: true
toc: true
---

## TL;DR

普段主にNode.jsで開発する人が，Pythonでもいい感じにプロジェクトをセットアップできるように，Pythonの各種ツール類やセットアップ方法をまとめた個人的なメモです．

長すぎて読めないという人のためにざっくりとまとめると，
- Pythonのバージョンはpyenvで切り替え
- Jupyterやpandasなどシステムワイドで使用するライブラリはpipで管理
- プロジェクトのdependencyはPoetryで管理
- コードの治安はflake8とautopep8で守る

## Pythonのバージョン管理

Node.js同様，Pythonも複数のプロジェクトでPythonのバージョンを使いわけるためにPython自体のバージョンを切り替えるツールを使います．

[pyenv](https://github.com/pyenv/pyenv) がデファクトスタンダードなようなので，ここではpyenvを使ってバージョン管理を行います．

### インストール

```bash
brew install pyenv
```

インストールが終わったら，`~/.bashrc` なり `~/.zshrc` なりに次の内容を追加します．

```bash
if which pyenv > /dev/null; then
    eval "$(pyenv init -)";
fi
```

### バージョンのインストールと切り替え

任意のバージョンを次のようにしてインストールできます．　

```bash
pyenv install 3.8.1 ##インストール
pyenv global 3.8.1 ## デフォルトで使用するバージョンの切り替え　
```

