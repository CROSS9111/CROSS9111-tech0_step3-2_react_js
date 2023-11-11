# Reactによる写真検索アプリケーション (Pixabayクローン)
このプロジェクトは、Reactを使用してPixabayの簡易版クローンを作成します。  
Pixabay：https://pixabay.com/ja/

下記リンクにある、動画教材(youtube)と合わせて確認してください。  
https://www.youtube.com/watch?v=-jx9PykKpYo&ab_channel=%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB

## 概要
Reactとは、WebサイトやWebアプリのUI部分を開発する際に活用するJavaScriptライブラリのことで、世界の多くのwebサイトでReactが採用されています。コンポーネント指向で拡張性が高く、宣言的でソースコードが理解しやすいという特徴があります。詳細は省きますが、レンダリングに特徴があり、高速に動作します。また昨今は画面遷移がないSPAが主流ですが、Reactを用いることでそれは容易に達成できるだけでなく、リッチなUIも作り込むことができます。

参考情報：https://www.gaji.jp/blog/2023/01/30/14069/  
メモ：ライブラリとよく比較されるものに「フレームワーク」があります。フレームワークとは、新しいプログラムを開発する際に使える枠組みです。フレームワークを使えばプログラムの枠組み（土台）まで用意される分だけ、ライブラリより効率的とは言えます。その反面、決まった枠組みに従わないといけないので、ライブラリより自由度は低いです。

## 1. Reactを体験してみよう！
何はともあれ、Reactを体験しましょう！ 
## 1.1 環境構築
Reactを動作する環境を構築しましょう。  
①. VScode起動  
②. 作業ディレクトリを選択  
③. ターミナルを開く  
④. `npx create-react-app my-app`と入力後、Enter(*1,*2)  
⑤. `Ok to proceed? (y)`と入力されたら、Enter  
*1:my-app＝フォルダ名になります。  
*2:npxが使えない場合は、`npm install npx -g`等でインストールしてください。

少し時間がかかりますが、my-appというフォルダが作成されます。  
`cd my-app`とターミナルに入力し、作業ディレクトリをmy-appに変更しましょう。

## 1.2 開発モードでの起動
ターミナルに、`npm start`と入力してみましょう。  
ブラウザ[http://localhost:3000]が立ち上がり、Reactのロゴが表示されていれば環境構築は完了です。  
なお、開発モードを起動中、コードを更新し保存すると、ブラウザ側も自動で更新されます。

## 1.3 ファイル構造
ファイル構成の中で重要な部分のみ示します。

```
my-app/             # プロジェクトフォルダ
├── node_modules/   # パッケージのインストール先
├── public/         # 静的ファイルが置かれるディレクトリ
├── src/            # メインのソースコードを格納する
│ └── index.js      # エントリーポイント。Appコンポーネントをレンダリングします
│ └── App.js        # アプリケーションのメインコンポーネント。アプリの大部分のUIがここで定義されます
│ └── index.css     # グローバルなスタイルを定義するCSSファイル
│ └── App.css       # Appコンポーネントのスタイルを定義するCSSファイル
│ └── ,,,
,,,
```
## 1.4 アプリケーションの変更体験(1)
次にアプリケーションの変更を行なってみましょう。App.jsを開いてください。  
```
my-app/             # プロジェクトフォルダ
├── src/            # メインのソースコードを格納する
│ └── App.css       # Appコンポーネントのスタイルを定義するCSSファイル
│ └── ,,,
,,,
```

App.jsの中身を下記のように変更しましょう。  
`return(<div classname ~~~)`の括弧内を全て消去し、`<h1>Hello,world</h1>` を追加し、保存します。 

*App.jsのサンプルを下記に示します。
```
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <h1>Hello,world</h1>
  );
}

export default App;
```
ブラウザに戻ると、Hello,worldと表示されます。

## 1.5 アプリケーションの変更体験(2)
定数を宣言し、それを表示するように変更してみましょう。
まず、`function App(){`の後に、定数（今回はmessage）を宣言します。
`const message = "Demo or Die";`と追記してください。  
定義した`message`を表示するために、`return()`内を変更します。  
ただし、Reactでは複数の要素を返す場合、親要素（`div`）で囲います。  
また`return()`内で`message`を参照する場合は`{}`で囲う必要があります。 
 
*App.jsのサンプルを下記に示します。

```
import logo from './logo.svg';
import './App.css';

function App() {
  const message = "Demo or Die";
  return (
    <div>
      <h1>Hello,world</h1>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
```

ブラウザに戻ると、Hello,worldに加えて、Demo or Dieが追加表示されます。

## 1.6 App.js内のイメージについて
ここで全体のイメージを掴むため、少し粗い概略を下記に示します。
```
function App() {
--(A部分)--
  const message = "Demo or Die";
--(A部分)--   
  return (
    --(B部分)-- 
    <div>
      <h1>Hello,world</h1>
      <h1>{message}</h1>
    </div>
    --(B部分)-- 
  );
}
```
- function App(): Appという名前の関数コンポーネントを定義しています。Reactでは、このような関数を使ってUIの一部を表すコンポーネントを作成します。
- A→状態や動作を定義する部分: コンポーネント内で、constを使ってローカル変数を定義したり、useStateやuseEffectなどのHooksを使って状態やライフサイクルを管理するコードを記述します。これらはコンポーネントの動作や状態を決定するための重要な部分です。
- B→画面表示の状態を記述する部分: return文の中で、コンポーネントがブラウザにどのように表示されるかを定義します。この部分は、Aの部分で定義された状態や変数を参照して、動的なUIを作成することができます。

全体イメージを掴めたと思いますので、Pixabayのクローンを実装してみましょう。

## 2. Pixabay簡易クローン構築前準備
## 2.1 環境構築
Githubのリンクからファイルをダウンロードしてください。

作成したmy-appフォルダの中身をダウンロードしたファイルと入れ替えてください。

## 2.2 ファイル構造
Pixabay簡易クローンに際して、変更したファイル構成を示します。

index.jsはエントリーポイントであり、アプリケーションのルートコンポーネントであるApp.jsをレンダリングします。App.jsはアプリケーションのメインコンポーネントで、アプリケーションの主要なUIの構造とロジックがここで定義されます。ImageGallery.jsは、App.jsから渡されるプロップス（データ）を使用して、画像ギャラリーのUIを構築します。

```
my-app/             
├── node_modules/  
├── public/         
├── src/            
│ └── index.js          # エントリーポイント。Appコンポーネントをレンダリングします
│ └── App.js            # アプリケーションのメインコンポーネント。アプリの大部分のUIがここで定義されます
│ └── index.css         # グローバルなスタイルを定義するCSSファイル
│ └── App.css           # Appコンポーネントのスタイルを定義するCSSファイル
│ └── ImageGallery.js  # 画像ギャラリーを表示するためのコンポーネント。App.jsが親コンポーネント。
│ └── ImageGallery.css # ImageGalleryのスタイルを定義するCSSファイル
,,,
```

<img width="565" alt="Reactimage_1" src="https://github.com/CROSS9111/CROSS9111-tech0_step3-2_react_js/assets/128927563/19c42b04-862e-42b2-9b87-a5698e665205">


## 2.3 完成イメージ
このプロジェクトの完成イメージを下図に示します。

<img width="496" alt="Reactimage_2" src="https://github.com/CROSS9111/CROSS9111-tech0_step3-2_react_js/assets/128927563/bd80f60a-015f-4312-86db-460208e0e383">

## 2.4 前準備 PixabayのAPI払出し
参考動画の`8:50〜`に従い、APIKeyを払い出してください。

# 3 Pixabay簡易クローン
## 3.1 App.js
```
import './App.css';
import ImageGallery from './ImageGallery';
import { useRef, useState } from 'react';
```
- App.js用のCSSスタイルシートであるApp.cssのインポート、App.jsの子コンポーネントであるImageGallery.jsをインポートします。
- Reactには、状態管理などを関数コンポーネントで実装できるようにするHooks（フック）があり、useRefとuseStateはHooksの一つです。簡単に言えば、状態管理などを簡単に実装することができます。
 - useStateは、コンポーネントの状態（state）を管理するために使われます。例えば、ユーザーの入力やAPIからのデータなど、コンポーネントのレンダリングに影響を与えるデータを保持・更新します。
 - useRefは、Reactのコンポーネントで特定の要素（例えばテキストボックスやボタンなど）に「タグ」を付けて、それらに簡単にアクセスするための機能です。例えば、ユーザーがフォームに入力したテキストを読み取るためにuseRefを使うことができます。


このコードブロックは、Pythonで書かれたFlaskアプリケーションをローカルサーバーで実行するためのものです。<br><br>
・127.0.0.1 のIPアドレスと 8080 のポートで実行する。    
・debug=True はデバッグモードを有効にする。
  
```python
@app.route('/') # ルートにアクセス
def index():
    return 'Hellow World!'

@app.route('/test') # 
def test():
    return "テストページです！"

@app.route('/html') #
def html():
    return html_page()
```

・起動後、http://127.0.0.1:8080/ にアクセス  
・起動後、http://127.0.0.1:8080/test にアクセス  
・起動後、http://127.0.0.1:8080/html にアクセス  
　➡ それぞれの表示の読み込みの違いを確認してみよう。

### その他：Jinja2テンプレートエンジン

```python
from flask import render_template
```
Jinja2を使用して、テンプレートファイル（今回の場合は index.html）をレンダリングします。Jinja2は、Pythonの辞書やオブジェクトをHTMLテンプレートに埋め込むことができる機能を提供している。

```python
@app.route('/html2')
def html2():
    my_dict = {
        'insert_something1': 'insert_something1部分です。',
        'insert_something2': 'insert_something2部分です。',
        'test_titles': ['タイトル1', 'タイトル2', 'タイトル3']
    }
    return render_template('index.html', my_dict=my_dict)  # render_templateを使用
```
・起動後、http://127.0.0.1:8080/html2 にアクセス  

my_dict という名前のPython辞書を render_template 関数に渡しています。この辞書には3つのキーがあり、それぞれ文字列やリストを値として持っています。render_template 関数は、この辞書をテンプレートエンジンに渡し、index.html テンプレート内の対応するプレースホルダーを辞書の値で置き換えを行います。  

<br>
<br>

## 2.Flaskによる掲示板アプリケーション:sample1 の導入
```python
from flask import Flask, request, redirect
import json, os, time, html
from datetime import datetime

logfile = 'bbs_log.json' # 保存先のファイル名を設定
logdata = {'lastid': 0, 'logs': []}
app = Flask(__name__) # Flaskアプリケーションを作成
```

ここでは、アプリケーションのために必要なモジュールをインポートし、ログファイルの名前を設定して、Flaskのインスタンスを生成しています。

![Image 1](https://imgur.com/2IZzJU3.jpg)

## ルートへのアクセス

```python
@app.route('/')
def index():
    return make_top_page_html()
```
ルート（/）へのアクセスがあった場合に、トップページのHTMLを生成して返します。

## HTMLメインページ
```python
def make_top_page_html():
    # 掲示板のメインページを生成して返す --- (※11)
    return '''
    <!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>掲示板</title>
    <link rel="stylesheet"
     href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    </head><body>
    <!-- タイトル -->
    <div class="hero is-dark"><div class="hero-body">
        <h1 class="title">掲示板</h1>
    </div></div>
    <!-- 書き込みフォーム -->
    <form class="box" action="/write" method="GET">
    <div class="field">
        <label class="label">お名前:</label>
        <div class="controll">
            <input class="input" type="text" name="name" value="名無し">
        </div>
    </div>
    <div class="field">
        <label class="label">メッセージ:</label>
        <div class="controll">
            <input class="input" type="text" name="msg">
        </div>
    </div>
    <div class="field">
        <div class="controll">
            <input class="button is-primary" type="submit" value="投稿">
        </div>
    </div>
    </form>
    ''' + make_logs() + '''</body></html>'''
```
トップページ全体のHTMLを生成する関数です。

```html
<form class="box" action="/write" method="GET">
    <div class="field">
        <label class="label">お名前:</label>
        <div class="control">
            <input class="input" type="text" name="name" value="名無し">
        </div>
    </div>
    <div class="field">
        <label class="label">メッセージ:</label>
        <div class="control">
            <input class="input" type="text" name="msg">
        </div>
    </div>
    <div class="field">
        <div class="control">
            <input class="button is-primary" type="submit" value="投稿">
        </div>
    </div>
</form>
```
action="/write": この属性は、フォームが送信されたときにデータを送信するURLを指定します。この場合、/writeエンドポイントにデータが送信されます。
method="GET": この属性は、フォームデータを送信するためのHTTPメソッドを指定します。GETメソッドは、データをURLの一部として送信します。


## 投稿機能
```python
@app.route('/write')
def form_write():
    name = request.args.get('name', '')
    msg = request.args.get('msg', '')
    ...
```

@app.route('/write'): は、/write URLにアクセスがあったときにform_write関数を呼び出します。
この書き込みフォームからのデータを受け取り、ログappend_log()に記録した後、トップページ'/'にリダイレクトします。
request.args.get('name', ''): request.argsはURLのクエリパラメータを辞書のようにアクセスできるオブジェクトです。nameとmsgは、HTMLフォームの各input要素のname属性に対応しています。GETメソッドを使用すると、これらの値はURLの一部として送信され、Flask側で簡単にアクセスできます。

### データの流れ
ユーザーがフォームにデータを入力し、「投稿」ボタンをクリックします。  
ブラウザは/writeエンドポイントに対してGETリクエストを送信し、クエリパラメータとしてnameとmsgの値を含めます。  
Flaskアプリケーションのform_write関数が呼び出され、request.argsを通じてこれらのパラメータにアクセスし、処理を行います。  
このメカニズムにより、HTMLフォームからFlaskアプリケーションへの値の受け渡しが可能になります。  

## ログデータの読み込みと更新
```python
def load_log():
    global logdata
    if os.path.exists(logfile):
        with open(logfile, encoding='utf-8') as fp:
            logdata = json.load(fp)

# JSONファイルにデータを追記する --- (※8)
def append_log(record):
    logdata['lastid'] += 1
    record['id'] = logdata['lastid']
    logdata['logs'].append(record) # データを追記
    with open(logfile, 'w', encoding='utf-8') as fp:
        json.dump(logdata, fp) # ファイルに書き込む
```
ログファイルからデータを読み込む関数と、新しいログエントリを追加する関数です。

## JSONログファイルの構造
掲示板アプリケーションで使用するJSONログファイルの例です。

```python
json
Copy code
{
    "lastid": 3,
    "logs": [
        {"name": "●●", "msg": "どうですか？", "time": 1690960437.9061089, "id": 1},
        {"name": "▼▼", "msg": "どうでしょ？", "time": 1698927471.596182, "id": 2},
        {"name": "■■", "msg": "どだい？", "time": 1699434818.6622488, "id": 3}
    ]
}
```

## HTML生成
```python
def make_logs():
    # 書き込まれたログを元にしてHTMLを生成して返す --- (※9)
    s = ''
    for log in reversed(logdata['logs']):
        name = html.escape(log['name']) # 名前をHTMLに変換 --- (※10)
        msg = html.escape(log['msg']) # メッセージをHTMLに変換
        t = datetime.fromtimestamp(log['time']).strftime('%m/%d %H:%M')
        s += '''
        <div class="box">
            <div class="has-text-info">({}) {} さん</div>
            <div>{}</div>
            <div class="has-text-right is-size-7">{}</div>
        </div>
        '''.format(log['id'], name, msg, t)
    return s
```
掲示板のログエントリからHTMLを生成する関数です。