import React from 'react'
import '../pages/MainPage.css';
import DropFileInput from '../Components/Dashboard/DropFileInput'

function UploadFile() {
  const onFileChange = (files) => {
    console.log(files);
  }
  return (
    <div className='cont-text'>
      <h2>Upload File</h2>
      {/* <div className="dragbox">
        <h2 className="dragdrop">
          Drag And Drop Files
        </h2> */}
        <DropFileInput
          onFileChange={(files) => onFileChange(files)}
        />
      {/* </div> */}
    </div>
  )
}

export default UploadFile
