import React, { useRef, useState } from 'react';
import { useSnackbar } from 'notistack'; // Import useSnackbar from notistack
import { ImageConfig } from '../../config/ImageConfig';
import uploadImg from '../../assets/images/cloud-upload-regular-240.png';
import APIService from '../APIService';

const HandwrittenFileInput = ({ onFileChange }) => {

    const wrapperRef = useRef(null);
    const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar
    const [fileList, setFileList] = useState([]);
    const [fileName, setFileName] = useState(""); // New state for the name input field
    const [loading, setLoading] = useState(false);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            if (fileList.length === 0) {
                const allowedExtensions = ['png', 'jpg']
                const fileExtension = newFile.name.split('.').pop().toLowerCase();

                if (allowedExtensions.includes(fileExtension)) {
                    // If no file is already present, add the new file
                    setFileList([newFile]);
                    onFileChange([newFile]);
                    setFileName(""); // Clear the name input field

                }
                else {
                    enqueueSnackbar('Invalid file type. Please upload file with extensions: png, jpga', { variant: 'error' });
                }
            } else {
                // If a file is already present, show an error message
                enqueueSnackbar('You can upload only 1 file.', { variant: 'error' });
            }
        }
    }

    const onUploadButtonClick = () => {
        if (!fileName.trim()) {
            // Display an error if the name field is empty
            enqueueSnackbar('Please enter a name for the file.', { variant: 'error' });
            return;
        }

        setLoading(true);

        // Perform any additional logic before making the API call if needed
        console.log(`Uploading file with name: ${fileName}`);

        // Now you can call the appropriate API based on the file type
        if (fileList.length > 0) {
            const file = fileList[0];
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', fileName);
      
            APIService.uploadHandwrittenAPI(formData)
              .then(response => {
                // Handle the response as needed
                enqueueSnackbar('Data Extracted Successfully', { variant: 'success' });
                setFileName("");
                setFileList([]);
              })
              .catch(error => {
                enqueueSnackbar('No data extracted or invalid data format. Please try again.', { variant: 'error' });
              })
              .finally(() => {
                setLoading(false);
            });
          } else {
            setLoading(false);
            enqueueSnackbar('Please upload a file before clicking the Upload button.', { variant: 'error' });
          }
    }

   

    const fileRemove = () => {
        setFileList([]);  // Clear the file list
        onFileChange([]);
    }

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p>Drag & Drop your file here </p>

                </div>
                <input type="file" value="" onChange={onFileDrop} accept='.png, .jpg' />
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Uploaded File
                        </p>
                        {
                            fileList.map((item, index) => {
                                const fileExtension = item.type.split('/')[1];
                                console.log('File Extension:', fileExtension);

                                return (
                                    <div key={index} className="drop-file-preview__item">
                                        <img src={ImageConfig[fileExtension] || ImageConfig['default']} alt="" />
                                        <div className="drop-file-preview__item__info">
                                            <p>{item.name}</p>
                                            <p>{item.size} bytes</p>
                                        </div>
                                        <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                                    </div>
                                );
                            })
                        }
                        <input
                            type="text"
                            placeholder="Enter file name"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            className="name-input"
                        />

                        <div className='upload'>
                            <div className='upload-btn' onClick={onUploadButtonClick}>{loading ? (
                                // Display a spinner when loading
                                <div className="spinner-border text-dark" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : (
                                // Display text
                                'Upload'
                            )}
                            </div>
                            {
                                loading && (
                                    <div className="waitingText">
                                        <h3>Please Wait Until The data is extracted</h3>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ) : (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Uploaded File
                        </p>
                        <p>No Uploaded File Yet</p>
                    </div>
                )
            }
        </>
    );
}


export default HandwrittenFileInput;
