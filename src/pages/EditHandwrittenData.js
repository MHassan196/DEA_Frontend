import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../pages/MainPage.css'
import APIService from '../Components/APIService';
import { Form } from 'react-bootstrap';
import { enqueueSnackbar } from 'notistack';


function EditHandwrittenData({ collectionName, handleSidebarItemClick }) {
    const [extractedData, setExtractedData] = useState([]);
    const [editedText, setEditedText] = useState('');


    useEffect(() => {

        fetchHandwrittenData()

    }, []);

    console.log("collection name is ", collectionName)

    const fetchHandwrittenData = () => {
        // Call the fetchExtractedData method from your APIService
        APIService.fetchHandwrittenData()
            .then(response => {
                if (response.extracted_data) {
                    setExtractedData(response.extracted_data);
                } else {
                    console.error('Error fetching extracted data:', response.error);
                }
            })
            .catch(error => console.error('Error fetching extracted data:', error));
    };

    // Filter extractedData based on collectionName
    const selectedDocument = extractedData.find(doc => doc.id === collectionName);

    const handleEditIconClick = (collectionName) => {

        handleSidebarItemClick('handeditdata', collectionName);

    };

    const handleTextareaChange = (e) => {
        setEditedText(e.target.value);
    };

    const handleSaveChanges = () => {
        // Perform any logic you need to save the edited text
        console.log("Edited Text:", editedText);

        // Call the API to update the handwritten document
        const documentId = selectedDocument.id;
        APIService.updateHandwrittenDocument(documentId, editedText)
            .then(response => {
                enqueueSnackbar('Data Updated Successfully', { variant: 'success' });
                console.log('Update response:', response);
                // Handle success or show a message to the user
            })
            .catch(error => {
                console.error('Error updating handwritten document:', error);
                enqueueSnackbar('Error Updating data', { variant: 'error' });
                // Handle the error or show an error message to the user
            });
    }
    const handleViewButton = (collectionName) => {
        
        handleSidebarItemClick('singlehanddata', collectionName);

    };

    return (
        <div>
            <div className='cont-text'>
                <div className="dataHead">
                    <div>
                        {/* Display the name of the selected document */}
                        <h2>{selectedDocument ? selectedDocument.name : ''}</h2>
                    </div>
                    <div className="dataOptions">
                        <button className="downloadBtn" onClick={() => handleViewButton(selectedDocument.id)}>
                            View Data
                        </button>
                        <button className="downloadBtn" onClick={handleSaveChanges}>
                            Save Changes
                        </button>

                    </div>
                </div>

                <div className="mt-5">
                    <div className="dataCard">
                        <Form className='handdataform'>
                            <Form.Control
                                as="textarea"
                                rows={13}
                                value={editedText !== '' ? editedText : (selectedDocument ? selectedDocument.processed_text : '')}
                                onChange={handleTextareaChange}
                                className='handdatainp'
                            />
                        </Form>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditHandwrittenData
