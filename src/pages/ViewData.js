import React, { useState, useEffect } from "react";
import "../pages/MainPage.css";
import APIService from "../Components/APIService";
import SingleData from "./SingleData";
import LoadingSkeleton from "../Components/LoadingSkeleton";
import { useSnackbar } from 'notistack';
import DeleteModal from '../Components/Dashboard/DeleteModal'


function ViewData({ handleSidebarItemClick }) {
  const [modalShow, setModalShow] = React.useState(false);
  const [extractedData, setExtractedData] = useState([]);
  const [documentIdToDelete, setDocumentIdToDelete] = useState(null); // New state to store the document ID to be deleted
  const [loading, setLoading] = useState(true);
  // const [selectedCollection, setSelectedCollection] = useState(null);
  // const [switchTurn, setSwitchTurn] = useState(false);

  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar


  const openModal = (documentId) => {
    setDocumentIdToDelete(documentId);
    setModalShow(true);
  };

  const handleDeleteIconClick = (documentId) => {
    openModal(documentId);
  };

  useEffect(() => {
    console.log(documentIdToDelete);
  }, [documentIdToDelete]);



  useEffect(() => {
    // Fetch extracted data when the component mounts
    fetchExtractedData();
  }, []);

  const fetchExtractedData = () => {
    // Call the fetchExtractedData method from your APIService
    APIService.fetchExtractedData()
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

  const handleEyeIconClick = (collectionName) => {
    // setSelectedCollection(collectionName);
    // // handleSidebarItemClick('data'); // Assuming 'data' corresponds to the route for SingleData
    // setSwitchTurn(true);

    // console.log(collectionName)
    handleSidebarItemClick("data", collectionName);
  };
  const handleEditIconClick = (collectionName) => {
    // setSelectedCollection(collectionName);
    // // handleSidebarItemClick('data'); // Assuming 'data' corresponds to the route for SingleData
    // setSwitchTurn(true);

    // console.log(collectionName)
    handleSidebarItemClick("editdata", collectionName);
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = dateObject.getFullYear().toString().slice(-2); // Extract the last two digits of the year
    return `${day}/${month}/${year}`;
  };

  // const handleDeleteIconClick = (documentId) => {
  //   // Call the deleteDocument API method from APIService
  //   APIService.deleteDocument(documentId)
  //     .then((response) => {
  //       if (response.message) {
  //         // Document deleted successfully
  //         enqueueSnackbar('Data Deleted Successfully', { variant: 'success' });

  //         // Refresh the extracted data after deletion
  //         fetchExtractedData();
  //       } else {
  //         enqueueSnackbar('Error Deleting Data', { variant: 'error' });
  //         console.error("Error deleting document:", response.error);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting document:", error);
  //     });
  // };

  return (
    // <div className="cont-text">
    //   {/* Your ViewData content goes here */}
    //   <h2>Extracted Data</h2>
    //   {
    //     loading ? (
    //       <LoadingSkeleton />
    //     ) : (
    //       {extractedData.length > 0 ? (
    //         <div className="extractedDataBox">
    //           {extractedData.map((doc) => (
    //             <div key={doc.id} className="dataCard">
    //               <div className="dataHeader">
    //                 <div className="dataTitle">{doc.name}</div>
    //                 <div className="dateType">
    //                   <div className="dataDate">{formatDate(doc.upload_date)}</div>
    //                   <div className="dataDate">|</div>
    //                   <div className="dataType">{doc.file_type} Type</div>
    //                 </div>
    //               </div>
    //               <div className="dataOptions">
    //                 <button
    //                   className="dataView"
    //                   onClick={() =>
    //                     handleEyeIconClick(
    //                       doc.dynamic_collection_name.toLowerCase()
    //                     )
    //                   }
    //                 >
    //                   <i className="fas fa-eye"></i>
    //                 </button>
    //                 <button
    //                   className="dataView"
    //                   onClick={() =>
    //                     handleEditIconClick(
    //                       doc.dynamic_collection_name.toLowerCase()
    //                     )
    //                   }
    //                 >
    //                   <i className="fas fa-edit"></i>
    //                 </button>
    //                 {/* <button className="dataCust">
    //                   <i className="fas fa-cogs"></i>
    //                 </button> */}
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       ) : (
    //         <div className="nodata">
    //           <h3>No Data Exist</h3>
    //         </div>
    //       )}

    //     )
    //   }
    //   {/* {switchTurn && (
    //     <SingleData
    //       collectionName={selectedCollection}
    //       handleSidebarItemClick={handleSidebarItemClick}
    //       extractedData={extractedData}
    //     />
    //   )} */}
    // </div>

    

    <div className='cont-text'>
      <h2>Extracted Data</h2>
      {
        modalShow && (
          <DeleteModal
            show={modalShow}
            onHide={() => {
              setModalShow(false);
              setDocumentIdToDelete(null); // Reset documentIdToDelete when modal is closed
            }}
            onConfirmDelete={() => {
              // Call the deleteDocument API method from APIService
              APIService.deleteDocument(documentIdToDelete)
                .then((response) => {
                  if (response.message) {
                    enqueueSnackbar('Data Deleted Successfully', { variant: 'success' });
                    // Refresh the extracted data after deletion
                    fetchExtractedData();
                  } else {
                    enqueueSnackbar('Error Deleting Data', { variant: 'error' });
                    console.error("Error deleting document:", response.error);
                  }
                })
                .catch((error) => {
                  console.error("Error deleting document:", error);
                })
                .finally(() => {
                  setModalShow(false); // Close the modal after deletion
                  setDocumentIdToDelete(null); // Reset documentIdToDelete
                });
            }}
          />
        )
      }
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
                        doc.dynamic_collection_name.toLowerCase()
                      )
                    }
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button
                    className="dataView"
                    onClick={() =>
                      handleEditIconClick(
                        doc.dynamic_collection_name.toLowerCase()
                      )
                    }
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  {/* <button className="dataView" onClick={() => handleDeleteIconClick(doc.id)}> */}
                  <button className="dataView" onClick={() =>
                    handleDeleteIconClick(doc.id) // Call handleDeleteIconClick on trash icon click
                  }>
                    <i className="fas fa-trash"></i>

                  </button>
                  {/* <button className="dataCust">
                    <i className="fas fa-cogs"></i>
                  </button> */}
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
      {/* {switchTurn && (
        <SingleData
          collectionName={selectedCollection}
          handleSidebarItemClick={handleSidebarItemClick}
          extractedData={extractedData}
        />
      )} */}
    </div>
  );
}

export default ViewData;
