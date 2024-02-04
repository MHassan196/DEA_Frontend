import React, { useState, useEffect } from 'react';
import '../pages/MainPage.css';
import avatar from '../../src/assets/images/avatar.jpg';
import APIService from '../Components/APIService';
import { useSnackbar } from 'notistack';


function EditProfile({ handleSidebarItemClick }) {
  const [formValues, setFormValues] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);

  const { enqueueSnackbar } = useSnackbar()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    APIService.GetUserData()
      .then((userData) => {
        setUserData(userData); // Save the fetched user data in state
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const baseUrl = "http://127.0.0.1:8000/";
  const profilePictureUrl = `${baseUrl}${userData?.profile_picture.replace('/', '')}`;

  const handleSaveChanges = () => {
    const updatedUserData = { ...formValues };
  
    // Check if profile picture is changed
    if (profilePicture) {
      // Add profile picture to the updated data
      updatedUserData.profile_picture = profilePicture;
    }
  
    // Prepare form data to send to the backend
    const formData = new FormData();
    Object.keys(updatedUserData).forEach((key) => {
      formData.append(key, updatedUserData[key]);
    });
  
    // Call the function to update user data in the backend
    APIService.UpdateUserData(formData)
      .then((response) => {
        // Handle success response
        console.log('User data updated successfully:', response);
        // You might want to update the local state or show a success message
        enqueueSnackbar('Updated Successfully', { variant: 'success' });

      })
      .catch((error) => {
        // Handle error
        console.error('Error updating user data:', error);
        // Show an error message or perform error handling
        enqueueSnackbar('Error Updating Data', { variant: 'error' });
      });
  };
  


  return (
    <div className='cont-text'>
      <div className="prof-top">
        <h2>Edit Profile</h2>
        <div className="opt-btns">
        <button className='edit-btn' onClick={() => handleSidebarItemClick("profile")}>View Profile</button>
        <button className='edit-btn' onClick={handleSaveChanges}>Save Changes</button>
        </div>
      </div>
      <div className="profPage">
        <div className="upperSec">
          <div className="info">
          <div className="avatar edit-avatar" data-tooltip="Change Photo">
              {/* Input field and text for uploading photo */}
              <div className='in-avatar'>
                {
                  userData?.profile_picture ? (
                    <img
                      src={profilePictureUrl}
                      className="avatar-pic edit-avatar-pic"
                      alt="Profile"
                    />
                  ) : (
                    <img src={avatar} className="avatar-pic edit-avatar-pic" alt="Profile" />
                  )
                }
                {/* <img src={userData?.profile_picture || avatar} className=' avatar-pic edit-avatar-pic' alt="" /> */}
              </div>
                <input type="file" id="avatar-upload" className="avatar-upload" accept="image/*" onChange={handleImageChange} />
              <label htmlFor="avatar-upload" className="avatar-label">
                Upload Photo
              </label>
              {/* Display uploaded image */}
             
            </div>
          </div>
          <div className="details">
            <div className="in-detail">
              <div className="label">Full Name</div>
              <div className="value">
                <input type="text" name="name" defaultValue={userData?.name} onChange={handleInputChange} />
              </div>
            </div>
            <div className="in-detail">
              <div className="label">Username</div>
              <div className="value">
                <input type="text" name="username" defaultValue={userData?.username} onChange={handleInputChange} />
              </div>
            </div>
            <div className="in-detail">
              <div className="label">Email</div>
              <div className="value">
                <input type="email" name="email" defaultValue={userData?.email} onChange={handleInputChange} />
              </div>
            </div>
            <div className="in-detail">
              <div className="label">Phone Number</div>
              <div className="value">
                <input type="text" name="phone" defaultValue={userData?.phone} onChange={handleInputChange} />
              </div>
            </div>
            <div className="in-detail">
              <div className="label">Password</div>
              <div className="value">
                <input type="password" name="password" defaultValue="*************" onChange={handleInputChange} />
              </div>
            </div>
            <div className="in-detail last">
              <div className="label">Address</div>
              <div className="value">
                <textarea name="address" defaultValue={userData?.address} onChange={handleInputChange}></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile;
