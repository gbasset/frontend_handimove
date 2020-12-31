import React from 'react'
import './ImagesContainer.css'
export default function ImagesContainer({ images }) {
    console.log("images", images);
    return (
        <>
            <div className="image-container">
                {images && images.length === 0 ?
                    <> Il n'y a pas encore d"images </> :
                    images.map(image =>
                        <img key={image.id} src={image.image_url} alt={` ${image.name}`} />
                    )
                }
            </div>
        </>
    )
}
