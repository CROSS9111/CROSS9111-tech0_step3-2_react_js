import React from 'react'
import "./imageGallery.css"

// Propsについて:
// Propsは、Reactコンポーネント間でデータを渡すための仕組みです。
// 親コンポーネントから子コンポーネントへ値や関数を渡す際に使用され、
// 子コンポーネントではこれらの値を使用して表示や挙動を制御します。

// ImageGalleryコンポーネント: 外部から受け取った画像データ（fetchData）を表示するためのコンポーネント。
// ({ fetchData }) と書くことで参照することができる。
const ImageGallery = ({ fetchData }) => {
  return (
    <div>
        {/* 画像を格納するためのコンテナー */}
        <div className='images-wrapper'>
            {/* fetchDataにある配列をmapメソッドで処理する。
            mapを用いることで、各配列を一度ずつdataにオブジェクトとして引き渡し、div要素を実行する。 */}
            {fetchData.map((data) => (
                <div className='image' key={data.id}>
                    {/* 各画像を囲むdiv要素。キーはユニークな値であるdata.idを使用。 */}
                    <a href={data.pageURL} target='_blank'>
                        {/* a要素でラップされたimg要素。クリックすると画像の元のページに遷移する。 */}
                        <img src={data.largeImageURL} 
                            alt=''/>
                    </a>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ImageGallery
