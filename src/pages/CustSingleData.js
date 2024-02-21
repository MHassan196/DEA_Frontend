import React, { useState, useEffect, useRef } from 'react'
import { Table, Pagination, Modal, Button, Form, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../pages/MainPage.css'
import APIService from '../Components/APIService';
import { useSnackbar } from 'notistack';


function CustSingleData({ collectionName, handleSidebarItemClick }) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [extractedData, setExtractedData] = useState([]);
    const [showFieldsModal, setShowFieldsModals] = useState(false);
    const [selectedFields, setSelectedFields] = useState([]);
    const [availableFields, setAvailableFields] = useState([]);

    const { enqueueSnackbar } = useSnackbar()

    const handleFieldsModalClose = () => {
        // setSelectedFields([])
        setShowFieldsModals(false);
    }
    const handleFieldsModalShow = () => {
        setAvailableFields(Object.keys(data[0]));
        console.log("Available Fields Now: ", availableFields)
        setSelectedFields([...selectedFields]);
        setShowFieldsModals(true);
    }

    const handleFieldSelect = (field) => {
        // Check if the field is already selected
        if (!selectedFields.includes(field)) {
            setSelectedFields([...selectedFields, field])
        }
    }

    const handleRemoveField = (fieldToRemove) => {
        setSelectedFields(selectedFields.filter((field) => field !== fieldToRemove));
    }

    const handleApplyFields = () => {
        console.log('Selected Fields ', selectedFields);

        // Update the UI to display selected fields
        const columnsToShow = selectedFields.length > 0 ? selectedFields : Object.keys(data[0]);
        setData((prevData) =>
            prevData.map((record) => {
                const filteredRecord = {};
                columnsToShow.forEach((column) => {
                    filteredRecord[column] = record[column];
                });
                return filteredRecord;
            })
        );

        // setAvailableFields(Object.keys(data[0]));
        // Close the modal
        handleFieldsModalClose();
    };

    const handleResetFields = () => {
        // Reset selected fields
        setSelectedFields([]);

        // Reset data to show all columns
        const initialData = JSON.parse(selectedDocument.extracted_data);
        setData(initialData);

        console.log("reset fields: ", columns)
    };

    useEffect(() => {

        fetchExtractedData()

    }, []);
    console.log("collection name is ", collectionName)
    console.log("Available Fields ", availableFields)

    const fetchExtractedData = () => {
        // Call the fetchExtractedData method from your APIService
        APIService.fetchExtractedData()
            .then(response => {
                if (response.extracted_data) {
                    setExtractedData(response.extracted_data);
                    // setAvailableFields(Object.keys(response.extracted_data[0]));
                } else {
                    console.error('Error fetching extracted data:', response.error);
                }
            })
            .catch(error => console.error('Error fetching extracted data:', error));
    };


    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Ensure that data is defined before attempting to map over it
    // const columns = data.length > 0 ? Object.keys(data[0]) : [];

    // Filter extractedData based on collectionName
    const selectedDocument = extractedData.find(doc => doc.dynamic_collection_name.toLowerCase() === collectionName);

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

    const handleSave = () => {
        const updatedData = data.map((record) => {
            const updatedRecord = {};
            selectedFields.forEach((field) => {
                updatedRecord[field] = record[field];
            });
            return updatedRecord;
        });

        const documentId = selectedDocument ? selectedDocument.id : null;

        // Make a PATCH request to update the document
        APIService.updateDocumentData(documentId, updatedData)
            .then(data => {
                if (data.message) {
                    console.log('Document updated successfully');
                    // Optionally, you can handle success scenarios
                    enqueueSnackbar('Updated Successfully', { variant: 'success' });

                } else {
                    console.error('Failed to update document:', data.error);
                    // Handle error scenarios
                    enqueueSnackbar('Error Updating Data', { variant: 'error' });
                }
            })
            .catch(error => console.error('Error updating document:', error));
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
                        <button className="downloadBtn" onClick={handleSave}>
                            Save
                        </button>
                        <button className="CustBtn" onClick={handleFieldsModalShow}>
                            Select Fields
                        </button>
                        <button className="CustBtn" onClick={handleResetFields}>
                            Reset
                        </button>

                    </div>

                    <Modal show={showFieldsModal} onHide={handleFieldsModalClose} size='lg'>
                        <Modal.Header closeButton>
                            <Modal.Title>Select Fields</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="fieldDropdown">
                                    <Form.Label>Select Fields</Form.Label>
                                    <Form.Control as="select" multiple onChange={(e) => handleFieldSelect(e.target.value)}>
                                        {availableFields.map((column, index) => (
                                            <option key={index} disabled={selectedFields.includes(column)}>{column}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="selectedFields" className='badges-list'>
                                    <Form.Label>Selected Fields</Form.Label>
                                    <div>
                                        {selectedFields.map((field, index) => (
                                            <Badge key={index} bg="secondary" className="mr-2 badge-custom">
                                                {field} <span onClick={() => handleRemoveField(field)}>&times;</span>
                                            </Badge>
                                        ))}
                                    </div>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleFieldsModalClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleApplyFields}>
                                Apply Fields
                            </Button>
                        </Modal.Footer>
                    </Modal>
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

export default CustSingleData
