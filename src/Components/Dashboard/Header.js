import React, { useState, useEffect } from 'react'
import APIService from '../APIService';
import { Link } from 'react-router-dom';
import onClickOutside from "react-onclickoutside";
import avatar from '../../assets/images/avatar.jpg'

function Header({ handleSidebarItemClick }) {
  const [userData, setUserData] = useState(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  // const toggleDropdown = () => {
  //   setIsDropdownOpen((prevIsOpen) => !prevIsOpen);
  // };

  Header.handleClickOutside = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    // Make the API call to log out the user
    APIService.LogoutUser()
      .then((response) => {
        console.log('Logout successful:', response.message);
        // Clear the token from localStorage
        localStorage.removeItem('token');
        // Redirect the user to the login page after successful logout
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

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
    //     <header className="header">
    //     <div className="user-button" onClick={toggleDropdown}>
    //       User
    //       {isDropdownOpen && (
    //         <div className="dropdown">
    //           <ul>
    //             <li onClick={handleLogout}>Logout</li>
    //             {/* Add more options here */}
    //           </ul>
    //         </div>
    //       )}
    //     </div>
    //   </header>
    <header className="header">
      <div className="app-head">
        {/* Replace 'logo.png' with your logo image */}
        <h4 className='heading'>Data Entry Automation</h4>
        <p className='sub-head'>Artificial Intelligence</p>
      </div>
      <div className="user-menu">
        <div className="user-btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          {userData?.profile_picture ? (
            <img
              src={profilePictureUrl}
              className="avatar-pic-header"
              alt="Profile"
            />
          ) : (
            <img src={avatar} className="avatar-pic-header" alt="Profile" />
          )}
          <div className="header-name">
              <h3>{userData?.name}</h3>
            </div>
          {/* Add the user name here */}
          {/* <span>User Name</span> */}
          <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i>
        </div>
        {isDropdownOpen && (
          <div className="user-dropdown">
            {/* Add your user dropdown content here */}
            <ul>
              <li>
                <div className='prof' onClick={() => handleSidebarItemClick('profile')}>
                  View Profile
                </div>
              </li>
              <li>
                <Link onClick={handleLogout} to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
const clickOutsideConfig = {
  handleClickOutside: () => Header.handleClickOutside,
};

export default onClickOutside(Header, clickOutsideConfig);
