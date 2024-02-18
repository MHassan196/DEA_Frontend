import React, { useState, useEffect } from "react";
import "../pages/MainPage.css";
import APIService from "../Components/APIService";
import LoadingSkeleton from "../Components/LoadingSkeleton";
import { useSnackbar } from 'notistack';


function ViewHandwrittenData({ handleSidebarItemClick }) {
  const [extractedData, setExtractedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar


  useEffect(() => {
    // Fetch extracted data when the component mounts
    fetchHandwrittenData();
  }, []);

  const fetchHandwrittenData = () => {
    // Call the fetchExtractedData method from your APIService
    APIService.fetchHandwrittenData()
      .then((response) => {
        if (response.extracted_data) {
          setExtractedData(response.extracted_data);
        } else {
          console.error("Error fetching extracted data:", response.error);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching extracted data:", error);
        setLoading(false); // Set loading to false on error as well
      });
  };

  const handleEyeIconClick = (id) => {
    
    handleSidebarItemClick("singlehanddata", id);
  };
  const handleEditIconClick = (collectionName) => {
    
    handleSidebarItemClick("handeditdata", collectionName);
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = dateObject.getFullYear().toString().slice(-2); // Extract the last two digits of the year
    return `${day}/${month}/${year}`;
  };

  const handleDeleteIconClick = (documentId) => {
    // Call the deleteDocument API method from APIService
    APIService.deleteHandwrittenDocument(documentId)
      .then((response) => {
        if (response.message) {
          // Document deleted successfully
          enqueueSnackbar('Data Deleted Successfully', { variant: 'success' });

          // Refresh the extracted data after deletion
          fetchHandwrittenData();
        } else {
          enqueueSnackbar('Error Deleting Data', { variant: 'error' });
          console.error("Error deleting document:", response.error);
        }
      })
      .catch((error) => {
        console.error("Error deleting document:", error);
      });
  };

  return (

    <div className='cont-text'>
      <h2>Extracted Handwritten Data</h2>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="extractedDataBox">
          {extractedData.length > 0 ? (
            extractedData.map((doc) => (
              <div key={doc.id} className="dataCard">
                <div className="dataHeader">
                  <div className="dataTitle">{doc.name}</div>
                  <div className="dateType">
                    <div className="dataDate">{formatDate(doc.upload_date)}</div>
                    <div className="dataDate">|</div>
                    <div className="dataType">{doc.file_type} Type</div>
                  </div>
                </div>
                <div className="dataOptions">
                  <button
                    className="dataView"
                    onClick={() =>
                      handleEyeIconClick(
                        doc.id
                      )
                    // console.log(doc.id)
                    }
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button
                    className="dataView"
                    onClick={() =>
                      handleEditIconClick(
                        doc.id
                      )
                    }
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="dataView" onClick={() => handleDeleteIconClick(doc.id)}>
                    <i className="fas fa-trash"></i>

                  </button>
                  
                </div>
              </div>
            ))
          ) : (
            <div className="nodata">
              <h3>No Data Exist</h3>
            </div>
          )}
        </div>
      )}
      
    </div>
  );
}

export default ViewHandwrittenData;
