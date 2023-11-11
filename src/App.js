import logo from './logo.svg';
import './App.css';
import ImageGrallery from './ImageGrallery';
import { useRef, useState } from 'react';

// React Hooksについて:
// Hooksは、Reactの関数コンポーネントで状態やライフサイクルなどのReactの機能を使うための関数です。
// useStateやuseRefなどの標準Hooksがあり、これらを使って様々な機能を実装できます。

function App() {
  // useStateフック: コンポーネントの状態（state）を管理するためのフック。
  // この場合、fetchDataはAPIから取得したデータを保持し、setFetchDataはそのデータを更新する関数。
  const [fetchData,setFetchdata] = useState([]);

  // useRefフック: コンポーネントで参照を保持するためのフック。
  // この例では、テキスト入力フィールドへの参照を保持している。
  const ref = useRef(); // refに入力した値を取得する

  // handleSubmit関数: フォーム送信時に実行される。
  const handleSubmit = (e) => {
    e.preventDefault(); // フォーム送信によるページリロードを防ぐ
    console.log(ref.current.value); // 現在のテキスト入力値をログに出力
    
    // Pixabay APIへのリクエストURLを組み立てる
    const endpointURL = `https://pixabay.com/api/?key=xxxxxxxxxxxxxxxxxxxxx=${ref.current.value}&image_type=photo`;

    // Fetch APIを使用してデータを非同期で取得
    fetch(endpointURL).then((res) => {
      return res.json();
      })
      .then((data) => {
        // data内のhitsを指定する。
        console.log(data.hits); // 取得したデータのログ出力
        setFetchdata(data.hits);  // 状態を更新し、コンポーネントを再レンダリング
      });
  };

  return (
    <div className="container">
      <h2>My pix</h2>
      {/* フォーム送信時にhandleSubmit関数が呼ばれる */}
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* テキスト入力フィールド。入力値はuseRefで参照される */}
        <input type="text" placeholder='画像を探す' ref={ref}/>
      </form>
      {/* ImageGalleryンポーネント)のレンダリング */}
      {/* fetchDataを`ImageGallery`に渡している。 */}
      <ImageGrallery fetchData={fetchData}/>

    </div>
  );
}

export default App;
