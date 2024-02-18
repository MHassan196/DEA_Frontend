import React, { useState, useEffect } from 'react'
import { Table, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../pages/MainPage.css'
import APIService from '../Components/APIService';


function SingleHandwrittenData({ collectionName, handleSidebarItemClick }) {
    const [data, setData] = useState([]);
    const [extractedData, setExtractedData] = useState([]);

   
    
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

    //   useEffect(() => {
    //     // Fetch data for the selected collection when the component mounts
    //     if (collectionName && selectedDocument) {
    //       // Parse the JSON string in extracted_data and set it as data
    //       const parsedData = JSON.parse(selectedDocument.extracted_data);
    //       setData(parsedData);
    //     }
    //   }, [collectionName, selectedDocument]);

    return (
        <div>
            <div className='cont-text'>
                <div className="dataHead">
                    <div>
                        {/* Display the name of the selected document */}
                        <h2>{selectedDocument ? selectedDocument.name : ''}</h2>
                    </div>
                    <div className="dataOptions">
                        <button className="downloadBtn">
                            <i className="fas fa-download"></i>
                        </button>
                        <button className="CustBtn">
                            <i className="fas fa-cogs"></i>
                        </button>
                        <button className="CustBtn" onClick={() => handleEditIconClick(selectedDocument.id)}>
                            <i className="fas fa-edit"></i>
                        </button>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="dataCard">
                        {
                            selectedDocument ? selectedDocument.processed_text : ''
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SingleHandwrittenData
