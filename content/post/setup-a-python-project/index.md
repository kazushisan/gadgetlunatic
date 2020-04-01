---
title: "Node.js使いがPythonの環境構築をするお話 2020年版"
date: 2020-04-01T06:57:17+09:00
draft: false
toc: true
---

## TL;DR

普段主にNode.jsで開発する人が，Pythonでもいい感じにプロジェクトをセットアップできるように，Pythonの各種ツール類やセットアップ方法をまとめた個人的なメモです．情報の正確さには気をつけましたが，Pythonエキスパートではないので間違った認識があるかもしれません．🙇‍♂️

長すぎて読めないという人のためにざっくりとまとめると，
- Pythonのバージョンはpyenvで切り替え
- Jupyterやpandasなどシステムワイドで使用するライブラリはpipで管理
- プロジェクトのdependencyはPoetryで管理
- コードの治安はflake8とautopep8で維持する

という感じの内容になっています．

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

## パッケージ管理

パッケージ管理にはpipやanacondaが使われます．anacondaはデータ分析を行う人たちの間ではよく使用されます．pandasやmatplotlibなど一通りのライブラリがあらかじめ用意されているため，なにも考えずにデータ分析などの作業を開始することができ便利ですが，

- ディスク容量をめっちゃ消費する
- anacondaのリポジトリに登録されていないライブラリを使うにはpipと併用する必要があり，そのためにいろいろとするのが面倒

などの問題があるので，ここではミニマルに使えるpipを採用します．

### システム全体で使うライブラリのインストール

```bash
pip install notebook # Jupyter Notebookのインストール
```

などのようにして，任意のライブラリをインストールして，使うことができます．

## プロジェクトの依存ライブラリ管理

Node.jsのプロジェクトであれば，npm/yarnを使ってプロジェクトディレクトリの　`node_modules/` 配下に依存ライブラリをインストールすると思いますが，Pythonではなかなかスタンダードな依存性の管理の方法が定まらず，複数の方法が存在します．

### pipでシステムに全部インストールする

一番な簡単な例では，さきほど使ったpipを使ってシステムにライブラリをインストールしてしまうことができます．必要とするパッケージの一覧は `pip freeze > requirements.txt` のような形でファイルに書き出して，新しく環境をセットアップする際にはこのファイルから依存性一覧をセットアップすることができます．

しかし，このようにシステム全体で依存性を管理すると，
- プロジェクトごとに依存性のバージョンを使い分けることができない
- 特定のプロジェクトでは必要としていないライブラリも他のプロジェクトで必要としていたらインストールされてしまう
- 依存するライブラリの一覧で管理するので，直接依存しているのか．使っているライブラリが依存するライブラリなのかわからない

などの問題があります．

### 仮想環境を使ってPythonの環境を使い分ける

そこで，Python標準で用意されているvenvを使って，プロジェクトに必要な依存性のみを管理する方法が生まれました．

```bash
python -m venv your-virtual-env-name
```

のようにして仮想環境を作って，開発の際にはこの環境の中に入ってdepsをインストール・Pythonのスクリプトを実行することで，他のプロジェクトの依存ライブラリに影響を受けずに開発できるという次第です．

### pipenvを使って仮想環境の設定と依存性の管理を自動化する

仮想環境を都度作るのは面倒なので，代わりにvenvとpipをまとめて使えるようにしたのが，pipenvです．pipenvを使ってプロジェクトの依存性を管理すると，プロジェクトルートに `Pipfile` と `Pipfile.lock` が生成されます．ちょうど `package.json` と　`package-lock.json` のような感じです．

しかし，pipenvは [If this project is dead, just tell us #4058
](https://github.com/pypa/pipenv/issues/4058) がissueとして挙がるぐらいには微妙な状態です．

### Poetryを使ってパッケージ管理を行う

pipenvの代替としてPoetryがあります．[PEP 518](https://www.python.org/dev/peps/pep-0518) の `pyproject.toml` でパッケージの管理を行います．一方で， `package.json` の　`scripts` のように，プロジェクトのタスクランナーとしては活用できないようです．一番将来性がありそうなので最近はこれを使っています．

#### インストール

基本的には[docs](https://python-poetry.org/docs/)にまとまっています．

```bash
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python
```

[この設定](https://github.com/python-poetry/poetry#enable-tab-completion-for-bash-fish-or-zsh) を行うことでターミナル上で補完が効くようになります．

#### プロジェクトでの使用

```bash
poetry init # プロジェクトルートで実行することで pyproject.toml が生成されます．
poetry install # yarn install のようにpyproject.tomlを参照して依存性をインストールします．
poetry add flask # yarn add のようにプロジェクトに依存ライブラリを追加します．
poetry add --dev autopep8 # 開発用の依存性もyarnと同じ雰囲気で追加できます，
```


## コードの治安を維持したい

Node.js環境でいうEslint/Prettier的なことをしたいと思いましたが，これもデファクトスタンダードはないようです．

### PEP 8のお話

[PEP 8](https://www.python.org/dev/peps/pep-0008/) というコードスタイルガイドが公式で定義されています．インデントサイズや改行などのスタイルが指定されています．コードがスタイルに沿っているかを判定するリンターが `pycodestyle`（旧 `pep8`）です．

### flake8でコードのチェックを行う

上記の `pycodestyle` に加えて，コードの論理的なエラーをチェックする `PyFlakes` と複雑度を判定する　`mccabe` をラップしているのがflake8です．さきほどのPoetryを使ってプロジェクトルートで次のようにしてインストールできます．

```bash
poetry add --dev flake8
```

Lint自体は次のようにして行えます．

```bash
flake8 --show-source .
```

ちなみにvscodeを使っている場合は，設定でデフォルトのpylintを無効にして，代わりにflake8を有効にすることで，エディタ上でエラーを確認できるようになります．

```json
{
	"python.linting.pylintEnabled": false,
	"python.linting.flake8Enabled": true
}
```

### autopep8で自動フォーマットする

ESLintのように，flake8にフォーマッターの機能までついていればいいのですが，あいにくありません！なので，別途`autopep8`というツールを追加します．

```bash
poetry add --dev autopep8
```

このツールを使うことによって，PEP 8沿うようにコードを自動でフォーマットしてくれます．

```bash
autopep8 -ivr .
```

## まとめ

いかがでしたか？（） 今回は触れませんでしたが，[mypy](http://mypy-lang.org/) を使って静的型チェックもしてみたいです．
