import logo from './logo.svg';
import './App.css';
import ImageGrallery from './ImageGrallery';
import { useRef, useState } from 'react';

function App() {
  // useState : 関数コンポーネント
  // 状態管理のためのフック。コンポーネントのレンダー間で値を保持し、その値を更新する。更新した時に再レンダリングする。
  const [fetchData,setFetchdata] = useState([]);
  // useRef : 関数コンポーネント
  // 参照（ref）を管理するためのフック。useRefを更新しても再レンダリングはされない。
  const ref = useRef(); // refに入力した値を取得する

  const handleSubmit = (e) => {
    e.preventDefault(); //リロード防止
    console.log(ref.current.value);
    
    //APIURL
    //テンプレートリテラルとして、Refの値で変更。
    //クエリパラメータとして入れている。
    //APIの中身の説明する
    
    const endpointURL = `https://pixabay.com/api/?key=xxxxxxxxxxxxxxxxxxxxx=${ref.current.value}&image_type=photo`;

    //apiを叩く（データフェッチング）
    //python:getと同じ
    fetch(endpointURL).then((res) => {
      return res.json();
      })
      .then((data) => {
        // {}->オブジェクト　今は配列を定義しているので配列が使えるhitsを指定する。
        console.log(data.hits);
        setFetchdata(data.hits); 
      });
  };
// HTMLの中身の説明を挟む
  return (
    <div className="container">
      <h2>My pix</h2>
      {/* 送信した際にrefを取得 */}
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* inputに入力した情報をuseRefに入れる */}
        <input type="text" placeholder='画像を探す' ref={ref}/>
      </form>
      {/* ImageGalleryというReactコンポーネントをレンダリングしている
      fetchDataにあるデータを`ImageGallery`に渡している。 */}
      <ImageGrallery fetchData={fetchData}/>

    </div>
  );
}

export default App;
