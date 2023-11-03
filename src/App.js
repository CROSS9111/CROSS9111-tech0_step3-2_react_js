import logo from './logo.svg';
import './App.css';
import ImageGrallery from './ImageGrallery';
import { useRef, useState } from 'react';

function App() {
  const [fetchData,setFetchdata] = useState([]);
  const ref = useRef(); // refに入力した値を取得する

  const handleSubmit = (e) => {
    e.preventDefault(); //リロード防止
    console.log(ref.current.value);
    
    //APIURL
    //バッククォーテーション　テンプレートリテラル
    const endpointURL = `https://pixabay.com/api/?key=XXXXXXXXXXXXXXXXX=${ref.current.value}&image_type=photo`;

    //apiを叩く（データフェッチング）
    fetch(endpointURL).then((res) => {
      return res.json();
      })
      .then((data) => {
        // {}->オブジェクト　今は配列を定義しているので配列が使えるhitsを指定する。
        console.log(data.hits);
        setFetchdata(data.hits); 
      });
  };

  return (
    <div className="container">
      <h2>My pix</h2>
      {/* 提出した際にrefを取得 */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder='画像を探す' ref={ref}/>
      </form>
      <ImageGrallery fetchData={fetchData}/>

    </div>
  );
}

export default App;
