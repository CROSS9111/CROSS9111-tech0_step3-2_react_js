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
`return(・・・)`の括弧内を全て消去し、`<h1>Hello,world</h1>` を追加し、保存します。 

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
まず、`function App({`の後に、定数（今回はmessage）を宣言します。  
`const message = "Demo or Die";`と追記してください。  
定義した`message`を表示するために、`return(・・・)`内を変更します。  
ただし、Reactでは複数の要素を返す場合、親要素（`div`）で囲います。  
また`return(・・・)`内で`message`を参照する場合は`{}`で囲う必要があります。

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
Githubの`Code`をクリック、`Download ZIP`からファイルをダウンロードし、作成したmy-appフォルダの中身をと入れ替えてください。

<img width="1026" alt="Reactimage_4" src="https://github.com/CROSS9111/CROSS9111-tech0_step3-2_react_js/assets/128927563/b131e580-06b5-480e-b041-940e82933de2">

## 2.2 ファイル構造
Pixabay簡易クローンに際して、変更したファイル構成を示します。

index.jsはエントリーポイントであり、アプリケーションのルートコンポーネントであるApp.jsをレンダリングします。App.jsはアプリケーションのメインコンポーネントで、アプリケーションの主要なUIの構造とロジックがここで定義されます。ImageGallery.jsは、App.jsから渡されるProps（データ）を使用して、画像ギャラリーのUIを構築します。

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

## 2.3 完成イメージ
このプロジェクトの完成イメージを下図に示します。

textを入力すると検索結果が画像で表示されます。また画像をクリックすると画像提供先に飛びます。

<img width="496" alt="Reactimage_2" src="https://github.com/CROSS9111/CROSS9111-tech0_step3-2_react_js/assets/128927563/bd80f60a-015f-4312-86db-460208e0e383">

## 2.4 前準備 PixabayのAPI払出し
参考動画の`8:50〜`に従い、APIKeyを払い出してください。

# 3 Pixabay簡易クローン
ここから、Pixabay簡易クローンを構築します。  
コードを差し替えることで、動作はできますが、各コードがどのような役割を持っているのかを3.1,3.2で説明します。
また簡易クローン内での全体のデータの流れについてを下図に示します。

<img width="1064" alt="Reactimage_3" src="https://github.com/CROSS9111/CROSS9111-tech0_step3-2_react_js/assets/128927563/60de11c4-bccd-4841-ae64-0fd68a13dc43">



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

```
function App() {
  const [fetchData,setFetchdata] = useState([]);
  const ref = useRef(); // refに入力した値を取得する
```
- `function App() { ... }`はReactの関数コンポーネントを作成するための方法です。この構文では、Appという名前の関数コンポーネントを定義しています。
- 状態管理をしたい変数をuseState()とuseRef()を用いて宣言しています。
    - useStateについて
        - useStateは上述の通り、アプリケーションの特定のデータ（状態）を管理するためのものです。この行は、空の配列[]で初期化されたfetchDataという名前の状態を作成しています。この状態は、アプリケーションが何かデータを取得したときに使用されることが想定されています。
        - setFetchdataは、fetchDataの値を更新するための関数です。データが変更された場合、この関数を呼び出してfetchDataを新しいデータに更新します。
    - useRefについて
        - useRefは、アプリケーション内の特定のHTML要素（例えば入力フィールド）に直接アクセスするための「参照（ref）」を作成します。
        - このコードは、新しい参照を作成し、それをref変数に格納します。これを使って、特定のHTML要素の値を読み取ったり、その要素にフォーカスを当てたりすることができます。

```
  const handleSubmit = (e) => {・・・};  
```
- handleSubmit は、ユーザーがフォームを送信するときに実行される関数です。

```
e.preventDefault();
const endpointURL = `https://pixabay.com/api/?key=xxxxxxxxxxxxxxxxxxxxx=${ref.current.value}&image_type=photo`;
fetch(endpointURL).then((res) => {
    return res.json();
    })
    .then((data) => {
    console.log(data.hits); 
    setFetchdata(data.hits); 
    });
```
- e.preventDefault()は、フォーム送信時のデフォルトの動作（ページのリロード）を防ぎます。これにより、ページがリロードされずに、フォームのデータを処理することができます。
- useRefを使用し、フォームに入力された値を取得し、API用のURLを作成します（`https://・・・{ref.current.value}・・・`）。
- fetch(endpointURL)は、Pixabay APIにリクエストを送るためのコードです。fetch 関数を使って、指定されたURLからデータを非同期に取得します。取得したデータはJSON形式で受け取り、data.hits をコンソールに出力し、setFetchdata 関数を使ってアプリケーションの状態を更新します。

```
return (
    <div className="container">
      <h2>My pix</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder='画像を探す' ref={ref}/>
      </form>
      <ImageGallery fetchData={fetchData}/>
    </div>
  );
}
```
return内のJSXについて説明します。
- `<form onSubmit={(e) => handleSubmit(e)}>` では、formにonSubmit属性を追加しています。formが送信されたときに、handleSubmit関数が呼び出されます。
- `<input type="text" placeholder='画像を探す' ref={ref}/>` ユーザーがここに入力すると、その値はuseRefフックを使って参照されます。
- `<ImageGallery fetchData={fetchData}/>` この行は、ImageGalleryコンポーネントをレンダリングします。fetchDataプロパティを通して、このコンポーネントにデータを渡しています。ImageGalleryは、これらのデータを使用して画像を表示します。

## 3.2 ImageGallery.js
Reactでは関数コンポーネント内で別のコンポーネントを呼び出すことが可能です。これはReactのコンポジション（組み合わせ）の原則の一部であり、アプリケーションをより管理しやすくモジュール化するのに役立ちます。

またコンポーネント間にデータを引き渡す仕込みをPropsと呼びます。親コンポーネントから子コンポーネントへ値や関数を渡す際に使用され、子コンポーネントではこれらの値を使用して表示や挙動を制御します。

今回は、App.jsの中で、ImageGallery.jsを呼び出して使用しています。また、 App.jsからfetchDataを受け取っています。
ImageGallery.js内では、渡されたfetchData内の画像を表示します。

```
const ImageGallery = ({ fetchData })
```
- fetchDataという名前のプロパティを通じて親コンポーネントからデータを受け取ります。このデータはAPIから取得した配列です。


```
<div className='images-wrapper'>
    {fetchData.map((data) => (
        <div className='image' key={data.id}>
            <a href={data.pageURL} target='_blank'>
                <img src={data.largeImageURL} 
                    alt=''/>
                </a>
        </div>
        ))}
</div>
```
- `{fetchData.map((data) => ( ... ))}`ではmapメソッドを使って、fetchDataに含まれる各データに対して処理を行います。このメソッドは配列の各要素に対して同じ操作を行い、新しい要素の集合を作成します。具体的には、fetchDataの配列[0]がdataに格納、( ... )内の処理が実施された後、次に配列[1]がdataに格納される。そしてこれが全ての配列に完了するまで繰り返します。


```
export default ImageGallery
```
- このように記載することで、外部からImageGallery.jsを使用可能とする。
