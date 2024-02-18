import React, { useState, useEffect, useRef } from 'react'
import { Table, Pagination, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../pages/MainPage.css'
import APIService from '../Components/APIService';
import { useSnackbar } from 'notistack';


function EditData({ collectionName, handleSidebarItemClick }) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [extractedData, setExtractedData] = useState([]);
    const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar
    const inputRefs = useRef([]);

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
    const columns = data.length > 0 ? Object.keys(data[0]) : [];

    // Filter extractedData based on collectionName
    const selectedDocument = extractedData.find(doc => doc.dynamic_collection_name.toLowerCase() === collectionName);

    const handleColumnNameChange = (index, value) => {
        const updatedColumns = [...columns];
        updatedColumns[index] = value;
        setData(data.map(row => {
            const updatedRow = {};
            updatedColumns.forEach((col, i) => {
                updatedRow[col] = row[columns[i]];
            });
            return updatedRow;
        }));
    };

    const getAbsoluteIndex = (relativeIndex) => {
        return (currentPage - 1) * recordsPerPage + relativeIndex;
    };

    const handleRowDataChange = (relativeRecordIndex, column, value) => {
        const absoluteRecordIndex = getAbsoluteIndex(relativeRecordIndex);
        const newData = [...data];
        newData[absoluteRecordIndex][column] = value;
        setData(newData);
        console.log(`Changed data in row ${absoluteRecordIndex}, column ${column}, new value: ${value}`);
    };
    const handleViewButton = (collectionName) => {
        // setSelectedCollection(collectionName);
        // // handleSidebarItemClick('data'); // Assuming 'data' corresponds to the route for SingleData
        // setSwitchTurn(true);

        // console.log(collectionName)
        handleSidebarItemClick('data', collectionName);

    };
    

    useEffect(() => {
        // Fetch data for the selected collection when the component mounts
        if (collectionName && selectedDocument) {
            // Parse the JSON string in extracted_data and set it as data
            const parsedData = JSON.parse(selectedDocument.extracted_data);
            setData(parsedData);
        }
    }, [collectionName, selectedDocument]);


    // const handleSaveChanges = () => {
    //     const updatedData = data.map(record => {
    //         const updatedRecord = {};
    //         Object.keys(record).forEach(column => {
    //             const inputValue = document.getElementById(`${column}_${record.id}`).value;
    //             updatedRecord[column] = inputValue;
    //         });
    //         return updatedRecord;
    //     });

    //     APIService.updateDocumentData(collectionName, updatedData)
    //         .then(response => {
    //             // Handle success, update state or perform other actions
    //             enqueueSnackbar('Data Updated Successfully', { variant: 'success' });
    //             console.log('Data updated successfully', response);
    //         })
    //         .catch(error => {
    //             // Handle error
    //             enqueueSnackbar('Error Updating data', { variant: 'error' });
    //             console.error('Error updating data:', error);
    //         });
    // };

    const handleSaveChanges = () => {

        const documentId = selectedDocument ? selectedDocument.id : null;

        const updatedData = data.map((record, recordIndex) => {
            const updatedRecord = { ...record };
            columns.forEach((column, columnIndex) => {
                const ref = inputRefs.current[`${recordIndex}-${columnIndex}`];
                if (ref) {
                    updatedRecord[column] = ref.value;

                }
            });
            return updatedRecord;
        });

        console.log('Updated Data:', updatedData);

        // Assume the API expects a single document for PATCH
        // const updatedDocument = updatedData[0];

        setData(updatedData);


        // Continue with your existing logic for API call and handling responses
        APIService.updateDocumentData(documentId, updatedData)
            .then(response => {
                // Handle success, update state or perform other actions
                enqueueSnackbar('Data Updated Successfully', { variant: 'success' });
                console.log('Data updated successfully', response);
            })
            .catch(error => {
                // Handle error
                enqueueSnackbar('Error Updating data', { variant: 'error' });
                console.error('Error updating data:', error);
            });
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
                        <button className="downloadBtn" onClick={() => handleViewButton(selectedDocument.dynamic_collection_name.toLowerCase())}>
                            View Data
                        </button>
                        <button className="downloadBtn" onClick={handleSaveChanges}>
                            Save Changes
                        </button>

                    </div>
                </div>

                <div className="mt-4">
                    <Form>
                        <Table striped responsive bordered hover variant="dark" className="custom-table">
                            <thead className="table-secondary">
                                <tr>
                                    {columns.map((column, index) => (
                                        <th key={index}>
                                            <Form.Control
                                                type="text"
                                                value={column}
                                                onChange={(e) => handleColumnNameChange(index, e.target.value)}
                                            />
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {currentRecords.map((record, recordIndex) => (
                                    <tr key={recordIndex}>
                                        {columns.map((column, columnIndex) => (
                                            <td key={columnIndex}>
                                                <Form.Control
                                                    type="text"
                                                    value={record[column]}
                                                    onChange={(e) => handleRowDataChange(recordIndex, column, e.target.value)}
                                                    ref={(el) => inputRefs.current[getAbsoluteIndex(recordIndex)] = el}

                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Form>
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

export default EditData
