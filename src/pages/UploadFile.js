import React, {useEffect, useState} from 'react'
import '../pages/MainPage.css';
import DropFileInput from '../Components/Dashboard/DropFileInput'
import UploadFileModal from '../Components/Dashboard/UploadFileModal';

function UploadFile() {
  const [modalShow, setModalShow] = React.useState(false);

  const openModal = () => {
    setModalShow(true);
  };

  useEffect(() => {
    // Open the modal when the component mounts
    openModal();
  }, []);

  const onFileChange = (files) => {
    console.log(files);
  }
  return (
    <div className='cont-text'>
      <h2>Upload File</h2>
     
      <UploadFileModal show={modalShow} onHide={() => setModalShow(false)} />
        <DropFileInput
          onFileChange={(files) => onFileChange(files)}
        />
        
    </div>
  )
}

export default UploadFile
