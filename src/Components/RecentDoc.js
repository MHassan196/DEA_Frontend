import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFilePdf,
    faFileExcel,
    faFileWord,
    faFileImage
} from "@fortawesome/free-solid-svg-icons";
import APIService from './APIService';

function RecentDoc({ handleSidebarItemClick }) {
    const [recentDocuments, setRecentDocuments] = useState([])

    const handleEyeIconClick = (collectionName) => {

        handleSidebarItemClick("data", collectionName);
    };

    const handleCogsIconClick = (collectionName) => {

        handleSidebarItemClick('custdata', collectionName);

    };

    const fetchRecentDocuments = () => {
        APIService.fetchExtractedData()
            .then((response) => {
                if (response.extracted_data) {
                    const extractedData = response.extracted_data;
                    // Sort documents based on upload date in descending order
                    const sortedDocuments = extractedData.sort(
                        (a, b) =>
                            new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime()
                    );
                    const limitedRecentDocuments = sortedDocuments.slice(0, 4);
                    setRecentDocuments(limitedRecentDocuments);
                }
            })
            .catch((error) => {
                console.error("Error fetching recent documents:", error)
            })
    }

    useEffect(() => {

        fetchRecentDocuments();
    }, []);

    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        const day = dateObject.getDate().toString().padStart(2, "0");
        const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
        const year = dateObject.getFullYear().toString().slice(-2); // Extract the last two digits of the year
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="recentDocPart">





            <div className="prof-top dash-prof-top">
                <h3>Recent Documents</h3>
                <button className="edit-btn" onClick={() => handleSidebarItemClick('view')}>View All</button>
            </div>
            <div className="recentDocuments">
                {recentDocuments.map((doc) => (
                    <div key={doc.id} className="documentCard dash-part">
                        <div className="docHeader">
                            <div className="docTitle dash-title">
                                <h4>{doc.name}</h4>
                                <p>{formatDate(doc.upload_date)}</p>
                            </div>
                            <div className="docIcons dash-icons">
                                {/* Add icons for different file types */}
                                {doc.file_type === "pdf" && <FontAwesomeIcon icon={faFilePdf} />}
                                {doc.file_type === "docx" && (
                                    <FontAwesomeIcon icon={faFileWord} />
                                )}
                                {doc.file_type === "xlsx" && (
                                    <FontAwesomeIcon icon={faFileExcel} />
                                )}
                                {doc.file_type === "xls" && (
                                    <FontAwesomeIcon icon={faFileExcel} />
                                )}
                                {doc.file_type === "png" && (
                                    <FontAwesomeIcon icon={faFileImage} />
                                )}
                                {doc.file_type === "jpg" && (
                                    <FontAwesomeIcon icon={faFileImage} />
                                )}

                                {/* Add more icons for different file types */}
                            </div>
                        </div>
                        <div className="docDetails">
                            <div>
                                <p>{doc.file.size}</p>
                            </div>
                            <div className="docActions">
                                <button className="viewButton dash-view" onClick={() =>
                                    handleEyeIconClick(
                                        doc.dynamic_collection_name.toLowerCase()
                                    )
                                }>
                                    <i className="fas fa-eye"></i>
                                </button>
                                <button className="customizeButton dash-cogs" onClick={() => handleCogsIconClick(doc.dynamic_collection_name.toLowerCase())}>
                                    <i className="fas fa-cogs"></i>
                                </button>
                                {/* Add more action buttons */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default RecentDoc
