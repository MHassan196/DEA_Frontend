import React, { useState, useEffect } from "react";
import "../pages/MainPage.css";
import avatar from "../../src/assets/images/avatar.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faFileExcel,
  faFileWord,
} from "@fortawesome/free-solid-svg-icons";
import APIService from "../Components/APIService";

// Sample recent documents data
const recentDocuments = [
  {
    id: 1,
    name: "Document 1",
    date: "2023-12-20",
    type: "pdf",
    size: "2.5 MB",
  },
  {
    id: 2,
    name: "Document 2",
    date: "2023-12-18",
    type: "docx",
    size: "1.8 MB",
  },
  {
    id: 2,
    name: "Document 2",
    date: "2023-12-18",
    type: "docx",
    size: "1.8 MB",
  },
  {
    id: 2,
    name: "Document 2",
    date: "2023-12-18",
    type: "docx",
    size: "1.8 MB",
  },
  {
    id: 2,
    name: "Document 2",
    date: "2023-12-18",
    type: "docx",
    size: "1.8 MB",
  },
  {
    id: 2,
    name: "Document 2",
    date: "2023-12-18",
    type: "docx",
    size: "1.8 MB",
  },
  // Add more sample documents as needed
];

const limitedRecentDocuments = recentDocuments.slice(0, 4);

function Profile({ handleSidebarItemClick }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    APIService.GetUserData()
      .then((userData) => {
        setUserData(userData); // Save the fetched user data in state
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);
  const baseUrl = "http://127.0.0.1:8000/";
  const profilePictureUrl = `${baseUrl}${userData?.profile_picture.replace('/', '')}`;

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
          <div className="prof-top">
            <h3>Recent Documents</h3>
            <button className="edit-btn">View All</button>
          </div>
          <div className="recentDocuments">
            {limitedRecentDocuments.map((doc) => (
              <div key={doc.id} className="documentCard">
                <div className="docHeader">
                  <div className="docTitle">
                    <h4>{doc.name}</h4>
                    <p>{doc.date}</p>
                  </div>
                  <div className="docIcons">
                    {/* Add icons for different file types */}
                    {doc.type === "pdf" && <FontAwesomeIcon icon={faFilePdf} />}
                    {doc.type === "docx" && (
                      <FontAwesomeIcon icon={faFileWord} />
                    )}
                    {/* Add more icons for different file types */}
                  </div>
                </div>
                <div className="docDetails">
                  <div>
                    <p>{doc.size}</p>
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
  );
}

export default Profile;
