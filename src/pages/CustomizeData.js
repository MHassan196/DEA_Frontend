import React, { useState, useEffect } from "react";
import "../pages/MainPage.css";
import APIService from "../Components/APIService";
import LoadingSkeleton from "../Components/LoadingSkeleton";

function CustomizeData({ handleSidebarItemClick }) {
  const [extractedData, setExtractedData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleCogsIconClick = (collectionName) => {

    handleSidebarItemClick("custdata", collectionName);
  };
  

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = dateObject.getFullYear().toString().slice(-2); // Extract the last two digits of the year
    return `${day}/${month}/${year}`;
  };

  return (
    

    <div className='cont-text'>
      <h2>Customize Data</h2>
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
                      handleCogsIconClick(
                        doc.dynamic_collection_name.toLowerCase()
                      )
                    }
                  >
                    <i className="fas fa-cogs"></i>
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
     
    </div>
  );
}

export default CustomizeData;
