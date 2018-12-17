import React from 'react'
import ImageGallery from 'react-image-gallery'
import "../../node_modules/react-image-gallery/styles/css/image-gallery.css"

const Images = (props) => {

  let imagesFetched
  if(props.advertId != null) {
    console.log(props.advertId.images)
    imagesFetched = props.advertId.images.map(function(item) {
      return {original: '../photos/' +  item,
              thumbnail: '../photos/' + item}
    })

  }

  return (
    <div>

    <p>{JSON.stringify(props.advertId)}</p>
    <ImageGallery items={imagesFetched} />
    </div>
  )
}

export default Images
