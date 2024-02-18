import React, {useEffect} from 'react'
import HandwrittenFileInput from '../Components/Dashboard/HandwrittenFileInput';
import HandwrittenFileModal from '../Components/Dashboard/HandwrittenFileModal';

function HandwrittenData() {
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
      <h2>Upload Handwritten File</h2>
      {/* <div className="dragbox">
        <h2 className="dragdrop">
          Drag And Drop Files
        </h2> */}
      <HandwrittenFileModal show={modalShow} onHide={() => setModalShow(false)} />
      <HandwrittenFileInput
        onFileChange={(files) => onFileChange(files)}
      />
      {/* </div> */}
    </div>
  )
}

export default HandwrittenData
