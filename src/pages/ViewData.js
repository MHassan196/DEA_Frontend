import React from 'react';
import '../pages/MainPage.css';

const extractedData = [
  {
    id: "1",
    title: "Sales Data",
    date: "21/07/2023",
    type: "Pdf Type"
  },
  {
    id: "2",
    title: "Sales Data",
    date: "21/07/2023",
    type: "Pdf Type"
  },
  {
    id: "3",
    title: "Sales Data",
    date: "21/07/2023",
    type: "Pdf Type"
  },
]

function ViewData({handleSidebarItemClick}) {

  return (
    <div className='cont-text'>
      {/* Your ViewData content goes here */}
      <h2>Extracted Data</h2>
      <div className="extractedDataBox">
        {
          extractedData.map((doc) => (
            <div key={doc.id} className="dataCard">
              <div className="dataHeader">
                <div className="dataTitle">{doc.title}</div>
                <div className="dateType">
                  <div className="dataDate">{doc.date}</div>
                  <div className="dataDate">|</div>
                  <div className="dataType">{doc.type}</div>
                </div>
              </div>
              <div className="dataOptions">
                <button className="dataView" onClick={() => handleSidebarItemClick("data")}>
                  <i className="fas fa-eye"></i>
                </button>
                {/* <button className="dataCust">
                  <i className="fas fa-cogs"></i>
                </button> */}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default ViewData;
