import React from 'react'
import "./imageGrallery.css"

const ImageGrallery = ({ fetchData }) => {
  return (
    <div>
        <div className='images-wrapper'>
            {/* fetchDataにある配列をmapメソッドで処理する。
            mapを用いることで、各配列を一度ずつdataにオブジェクトとして引き渡し、div要素を実行する。 */}
            {fetchData.map((data) => (
                <div className='image' key={data.id}>
                    <a href={data.pageURL} target='_blank'>
                        <img src={data.largeImageURL} 
                            alt=''/>
                    </a>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ImageGrallery
