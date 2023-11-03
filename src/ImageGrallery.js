import React from 'react'
import "./imageGrallery.css"

const ImageGrallery = ({ fetchData }) => {
  return (
    <div>
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
    </div>
  )
}

export default ImageGrallery
