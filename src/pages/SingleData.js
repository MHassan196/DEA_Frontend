import React, { useState, useEffect } from 'react'
import { Table, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../pages/MainPage.css'
import APIService from '../Components/APIService';


function SingleData({ collectionName, handleSidebarItemClick }) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [extractedData, setExtractedData] = useState([]);

    // useEffect(() => {
    //     // const lowercaseCollectionName = collectionName.toLowerCase();
    //     // Fetch data for the selected collection when the component mounts
    //     if (collectionName) {
    //         fetchCollectionData(collectionName);
    //     }
    //     console.log(collectionName)

    //     fetchExtractedData()

    // }, [collectionName]);
    useEffect(() => {

        fetchExtractedData()

    }, []);
    // const lowercaseCollectionName = collectionName.toLowerCase();
    // console.log(lowercaseCollectionName)
    console.log("collection name is ", collectionName)

    const fetchExtractedData = () => {
        // Call the fetchExtractedData method from your APIService
        APIService.fetchExtractedData()
            .then(response => {
                if (response.extracted_data) {
                    setExtractedData(response.extracted_data);
                } else {
                    console.error('Error fetching extracted data:', response.error);
                }
            })
            .catch(error => console.error('Error fetching extracted data:', error));
    };

    // const fetchCollectionData = (collectionName) => {
    //     console.log("Fetch from ", collectionName)
    //     if (collectionName) {
    //         APIService.fetchDocumentData(collectionName)
    //             .then(response => {
    //                 if (response.collection_data) {
    //                     console.log(data)
    //                     setData(response.collection_data);
    //                 } else {
    //                     console.error('Error fetching collection data:', response.error || 'No data received');
    //                 }
    //             })
    //             .catch(error => console.error('Error fetching collection data:', error));
    //     }
    // };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Ensure that data is defined before attempting to map over it
    // const columns = data.length > 0 ? Object.keys(data[0]) : [];

    // Filter extractedData based on collectionName
    const selectedDocument = extractedData.find(doc => doc.dynamic_collection_name.toLowerCase() === collectionName);

    const handleEditIconClick = (collectionName) => {
        // setSelectedCollection(collectionName);
        // // handleSidebarItemClick('data'); // Assuming 'data' corresponds to the route for SingleData
        // setSwitchTurn(true);
    
        // console.log(collectionName)
        handleSidebarItemClick('editdata', collectionName);
    
      };
    const handleCogsIconClick = (collectionName) => {
      
        handleSidebarItemClick('custdata', collectionName);
    
      };

      useEffect(() => {
        if (collectionName && extractedData.length > 0) {
          // Find the selected document based on collectionName
          const selectedDocument = extractedData.find(
            doc => doc.dynamic_collection_name.toLowerCase() === collectionName
          );
    
          if (selectedDocument) {
            // Parse the JSON string in extracted_data and set it as data
            const parsedData = JSON.parse(selectedDocument.extracted_data);
    
            // Check if the data format includes 'columns' and 'data'
            if (parsedData.columns && parsedData.data) {
              // For image file format
              setData(parsedData.data);
            } else {
              // For PDF, Word, Excel file format
              setData(parsedData);
            }
          }
        }
      }, [collectionName, extractedData]);
    
      // Ensure that data is defined before attempting to map over it
      const columns = data.length > 0 ? Object.keys(data[0]) : [];

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
                        <button className="CustBtn" onClick={() => handleCogsIconClick(selectedDocument.dynamic_collection_name.toLowerCase())}>
                            <i className="fas fa-cogs"></i>
                        </button>
                        <button className="CustBtn" onClick={() => handleEditIconClick(selectedDocument.dynamic_collection_name.toLowerCase())}>
                            <i className="fas fa-edit"></i>
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    <Table striped bordered hover variant="dark" className="custom-table" >
                        <thead className="table-secondary">
                            <tr>
                                {columns.map((column, index) => (
                                    <th key={index}>{column}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((record, recordIndex) => (
                                <tr key={recordIndex}>
                                    {columns.map((column, columnIndex) => (
                                        <td key={columnIndex}>{record[column]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination className="justify-content-center custom-pagination mt-4">
                        {Array.from({ length: Math.ceil(data.length / recordsPerPage) }, (_, i) => (
                            <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)} className="custom-page-item">
                                {i + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>

                </div>
            </div>
        </div>
    )
}

export default SingleData
