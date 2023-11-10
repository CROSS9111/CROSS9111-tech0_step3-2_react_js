
### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

# Flaskによる掲示板アプリケーション (ファイル:sample1)

このプロジェクトは、PythonのFlaskフレームワークを使用して簡単な掲示板アプリケーションを作成します。


## 概要
Flaskではシンプルでカスタマイズ性が高いというメリットを活用し、簡単なWebアプリケーションやサービスを作成できたり、短いコードで手早く機能を実装したプロトタイプを作成したり、処理するリクエスト数が少ないBotなども作成ができます。大規模なシステムには向きませんが、小規模の環境で使うには小回りがきくマイクロウェブアプリケーションフレームワークです。

## ファイル構造
```
sample0/            # flask のsampleアプリフォルダ
├── templates/
│   └── index.html  # 'app' グループのテンプレートファイル
└── app.py          # sampleコード

sample1/            # flask の掲示板アプリフォルダ
├── bbs.py          # flask の掲示板アプリコード
└── bbs_log.json    # flask の掲示板アプリ書込・読込用jsonファイル
```
## 1. 初期導入 (ファイル:sample0)

```python
pip install Flask
```

・sample0 ディレクトリに移動  
・python app.py 起動  

```python
from flask import Flask
app = Flask(__name__) # Flaskアプリケーションを作成
```
Flaskのおまじない。 Flask クラスのインスタンスを作成し変数appに割当てている。  
__name__ は、現在のPythonスクリプトの名前を表す特別な変数です。Flask クラスにこの変数を渡すことで、Flaskはアプリケーションのルートディレクトリを正確に特定でき、テンプレートや静的ファイルを適切に見つけることができます。  

```python
if __name__ == '__main__': # Webサーバーを起動 
    app.run('127.0.0.1', 8080, debug=True)
```

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