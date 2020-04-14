import * as React from 'react'
import { CLOUDINARY_URL } from '../config';
import { IoMdAddCircleOutline } from "react-icons/io";

function ImagePicker({ chooseImage }) {
  const [image, setImage] = React.useState('')
//   const [loading, setLoading] = React.useState(false)

  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'ml_default')
    // setLoading(true)
    const res = await fetch(
        CLOUDINARY_URL,
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()

    setImage(file.secure_url)
    chooseImage(file.secure_url)
    // setLoading(false)
  }

//   console.log(image);

    return (
        <div className="upload-btn-wrapper">
            <button className="btn" style={{backgroundColor: '#3FC184', 
            color: '#F1F3F5', 
            fontSize: 20, display: 'flex', 
            flexDirection: 'row', 
            margin: '5 10'}}>
                <div>Upload Image</div>
                <IoMdAddCircleOutline color={'#F1F3F5'} size={30} /> </button>
            <input
                type="file"
                name="file"
                placeholder="Upload an image"
                onChange={uploadImage}
            /> 
        </div>
    )
}

export default ImagePicker;
