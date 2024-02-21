import React, { useState, useEffect } from "react";
import "../pages/MainPage.css";
import avatar from "../../src/assets/images/avatar.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faFileExcel,
  faFileWord,
  faFileImage
} from "@fortawesome/free-solid-svg-icons";
import APIService from "../Components/APIService";



function Profile({ handleSidebarItemClick }) {
  const [userData, setUserData] = useState(null);
  const [recentDocuments, setRecentDocuments] = useState([])
  const [recentHandwrittenDocuments, setRecentHandwrittenDocuments] = useState([])

  useEffect(() => {
    // Fetch user data when the component mounts
    APIService.GetUserData()
      .then((userData) => {
        setUserData(userData); // Save the fetched user data in state
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    fetchRecentDocuments();
    fetchHandwrittenData();
  }, []);

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
  const fetchHandwrittenData = () => {
    APIService.fetchHandwrittenData()
      .then((response) => {
        if (response.extracted_data) {
          const extractedData = response.extracted_data;
          // Sort documents based on upload date in descending order
          const sortedHandwrittenDocuments = extractedData.sort(
            (a, b) =>
              new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime()
          );
          const limitedRecentHandDocuments = sortedHandwrittenDocuments.slice(0, 4);
          setRecentHandwrittenDocuments(limitedRecentHandDocuments);
        }
      })
      .catch((error) => {
        console.error("Error fetching recent documents:", error)
      })
  }
  const baseUrl = "http://127.0.0.1:8000/";
  const profilePictureUrl = `${baseUrl}${userData?.profile_picture.replace('/', '')}`;

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = dateObject.getFullYear().toString().slice(-2); // Extract the last two digits of the year
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="cont-text">
      <div className="prof-top">
        <h2>Profile</h2>
        <button
          className="edit-btn"
          onClick={() => handleSidebarItemClick("edit-profile")}
        >
          Edit Profile
        </button>
      </div>
      <div className="profPage">
        <div className="upperSec">
          <div className="info">
            <div className="avatar">
              {console.log("Profile Picture:", profilePictureUrl)}
              {userData?.profile_picture ? (
                <img
                  src={profilePictureUrl}
                  className="avatar-pic"
                  alt="Profile"
                />
              ) : (
                <img src={avatar} className="avatar-pic" alt="Profile" />
              )}
            </div>
            <div className="name">
              <h3>{userData?.name}</h3>
            </div>
            <div className="userName">
              <p>{userData?.purpose}</p>
            </div>
            <div className="address">
              <p>{userData?.address}</p>
            </div>
          </div>
          <div className="details">
            <div className="in-detail">
              <div className="label">Full Name</div>
              <div className="value">{userData?.name}</div>
            </div>
            <div className="in-detail">
              <div className="label">Username</div>
              <div className="value">{userData?.username}</div>
            </div>
            <div className="in-detail">
              <div className="label">Email</div>
              <div className="value">{userData?.email}</div>
            </div>
            <div className="in-detail">
              <div className="label">Phone Number</div>
              <div className="value">{userData?.phone}</div>
            </div>
            <div className="in-detail">
              <div className="label">Password</div>
              <div className="value">***********</div>
            </div>
            <div className="in-detail last">
              <div className="label">Address</div>
              <div className="value">{userData?.address}</div>
            </div>
          </div>
        </div>
        <div className="lowerSec">
          <div className="firsthalf">


            <div className="prof-top">
              <h3>Recent Documents</h3>
              <button className="edit-btn">View All</button>
            </div>
            <div className="recentDocuments">
              {recentDocuments.map((doc) => (
                <div key={doc.id} className="documentCard">
                  <div className="docHeader">
                    <div className="docTitle">
                      <h4>{doc.name}</h4>
                      <p>{formatDate(doc.upload_date)}</p>
                    </div>
                    <div className="docIcons">
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
                      <button className="viewButton">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="customizeButton">
                        <i className="fas fa-cogs"></i>
                      </button>
                      {/* Add more action buttons */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="secondhalf">


            <div className="prof-top">
              <h3>Recent Handwritten Documents</h3>
              <button className="edit-btn">View All</button>
            </div>
            <div className="recentDocuments">
              {recentHandwrittenDocuments.map((doc) => (
                <div key={doc.id} className="documentCard">
                  <div className="docHeader">
                    <div className="docTitle">
                      <h4>{doc.name}</h4>
                      <p>{formatDate(doc.upload_date)}</p>
                    </div>
                    <div className="docIcons">
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
                      <button className="viewButton">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="customizeButton">
                        <i className="fas fa-cogs"></i>
                      </button>
                      {/* Add more action buttons */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
