// import React, { useState, useEffect } from 'react';
// import '../pages/MainPage.css';
// import avatar from '../../src/assets/images/avatar.jpg';
// import APIService from '../Components/APIService';
// import { useSnackbar } from 'notistack';


// function EditProfile({ handleSidebarItemClick }) {
//   const [formValues, setFormValues] = useState({});
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [userData, setUserData] = useState(null);

//   const { enqueueSnackbar } = useSnackbar()

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setProfilePicture(file);
//   };

//   useEffect(() => {
//     // Fetch user data when the component mounts
//     APIService.GetUserData()
//       .then((userData) => {
//         setUserData(userData); // Save the fetched user data in state
//       })
//       .catch((error) => {
//         console.error('Error fetching user data:', error);
//       });


//     console.log(userData)
//   }, []);

//   const baseUrl = "http://127.0.0.1:8000/";
//   const profilePictureUrl = `${baseUrl}${userData?.profile_picture.replace('/', '')}`;


//   const handleProfileUpdate = () => {
//     // // Create updatedData object based on formValues and other state variables
//     // const updatedData = {
//     //   name: formValues.name,
//     //   email: formValues.email,
//     //   phone: formValues.phone,
//     //   address: formValues.address,

//     // };

//     // // Check if profilePicture is set and add it to the updatedData
//     // if (profilePicture) {
//     //   updatedData.profile_picture = profilePicture;
//     // }

//     // const userId = userData ? userData.id : null
//     // console.log(userId)

//     // // Create a FormData object to send the data as a multipart/form-data
//     // const formData = new FormData();
//     // Object.entries(updatedData).forEach(([key, value]) => {
//     //   formData.append(key, value);
//     // });

//     // // Call the UpdateUserData function from APIService
//     // APIService.patchUserProfile(formData, userId)
//     //   .then((updatedUserData) => {
//     //     // Handle success
//     //     console.log('User data updated successfully:', updatedUserData);
//     //     enqueueSnackbar('Profile updated successfully!', { variant: 'success' });
//     //   })
//     //   .catch((error) => {
//     //     // Handle error
//     //     console.error('Error updating user data:', error);
//     //     enqueueSnackbar('Failed to update profile. Please try again.', { variant: 'error' });
//     //   });

//     // Create an empty object to store only the changed fields
//     const updatedData = {};

//     // Check each field to see if it has changed and add it to the updatedData object
//     if (formValues.name && formValues.name !== userData.name) {
//       updatedData.name = formValues.name;
//     }

//     if (formValues.email && formValues.email !== userData.email) {
//       updatedData.email = formValues.email;
//     }

//     if (formValues.phone && formValues.phone !== userData.phone) {
//       updatedData.phone = formValues.phone;
//     }

//     if (formValues.address && formValues.address !== userData.address) {
//       updatedData.address = formValues.address;
//     }

//     // Check if profilePicture is set and add it to the updatedData
//     if (profilePicture) {
//       updatedData.profile_picture = profilePicture;
//     }

//     // If no fields have changed, show a message to the user and return
//     if (Object.keys(updatedData).length === 0) {
//       enqueueSnackbar('No changes to save.', { variant: 'info' });
//       return;
//     }

//     const userId = userData ? userData.id : null;

//     // Create a FormData object to send the data as a multipart/form-data
//     const formData = new FormData();
//     Object.entries(updatedData).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     // Call the UpdateUserData function from APIService
//     APIService.patchUserProfile(formData, userId)
//       .then((updatedUserData) => {
//         // Handle success
//         console.log('User data updated successfully:', updatedUserData);
//         enqueueSnackbar('Profile updated successfully!', { variant: 'success' });
//       })
//       .catch((error) => {
//         // Handle error
//         console.error('Error updating user data:', error);
//         enqueueSnackbar('Failed to update profile. Please try again.', { variant: 'error' });
//       });
//   };



//   return (
//     <div className='cont-text'>
//       <div className="prof-top">
//         <h2>Edit Profile</h2>
//         <div className="opt-btns">
//           <button className='edit-btn' onClick={() => handleSidebarItemClick("profile")}>View Profile</button>
//           <button className='edit-btn' onClick={handleProfileUpdate}>Save Changes</button>
//         </div>
//       </div>
//       <div className="profPage">
//         <div className="upperSec">
//           <div className="info">
//             <div className="avatar edit-avatar" data-tooltip="Change Photo">
//               {/* Input field and text for uploading photo */}
//               <div className='in-avatar'>
//                 {
//                   userData?.profile_picture ? (
//                     <img
//                       src={profilePictureUrl}
//                       className="avatar-pic edit-avatar-pic"
//                       alt="Profile"
//                     />
//                   ) : (
//                     <img src={avatar} className="avatar-pic edit-avatar-pic" alt="Profile" />
//                   )
//                 }
//                 {/* <img src={userData?.profile_picture || avatar} className=' avatar-pic edit-avatar-pic' alt="" /> */}
//               </div>
//               <input type="file" id="avatar-upload" className="avatar-upload" accept="image/*" onChange={handleImageChange} />
//               <label htmlFor="avatar-upload" className="avatar-label">
//                 Upload Photo
//               </label>
//               {/* Display uploaded image */}

//             </div>
//           </div>
//           <div className="details">
//             <div className="in-detail">
//               <div className="label">Full Name</div>
//               <div className="value">
//                 <input type="text" name="name" defaultValue={userData?.name} onChange={handleInputChange} />
//               </div>
//             </div>
//             <div className="in-detail">
//               <div className="label">Username</div>
//               <div className="value">
//                 <input type="text" name="username" className='usernamedis' defaultValue={userData?.username} disabled onChange={handleInputChange} />
//               </div>
//             </div>
//             <div className="in-detail">
//               <div className="label">Email</div>
//               <div className="value">
//                 <input type="email" name="email" defaultValue={userData?.email} onChange={handleInputChange} />
//               </div>
//             </div>
//             <div className="in-detail">
//               <div className="label">Phone Number</div>
//               <div className="value">
//                 <input type="text" name="phone" defaultValue={userData?.phone} onChange={handleInputChange} />
//               </div>
//             </div>
//             <div className="in-detail ">
//               <div className="label">Address</div>
//               <div className="value">
//                 <textarea name="address" defaultValue={userData?.address} onChange={handleInputChange}></textarea>
//               </div>
//             </div>
//             <div className="in-detail last">
//               <div className="label">Password</div>
//               <div className="value btn-change">
//                 <button className='edit-btn change-ps' onClick={() => handleSidebarItemClick("change-ps")}>Change Password</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EditProfile;


import React, { useState, useEffect } from 'react';
import '../pages/MainPage.css';
import avatar from '../../src/assets/images/avatar.jpg';
import APIService from '../Components/APIService';
import { useSnackbar } from 'notistack';

function EditProfile({ handleSidebarItemClick }) {
  const [formValues, setFormValues] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [userData, setUserData] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);

    // Display the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePictureUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    // Fetch user data when the component mounts
    APIService.GetUserData()
      .then((userData) => {
        setUserData(userData); // Save the fetched user data in state
        setProfilePictureUrl(`${baseUrl}${userData?.profile_picture.replace('/', '')}`);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const baseUrl = "http://127.0.0.1:8000/";

  const handleProfileUpdate = () => {
    // Create an empty object to store only the changed fields
    const updatedData = {};

    // Check each field to see if it has changed and add it to the updatedData object
    if (formValues.name && formValues.name !== userData.name) {
      updatedData.name = formValues.name;
    }

    if (formValues.email && formValues.email !== userData.email) {
      updatedData.email = formValues.email;
    }

    if (formValues.phone && formValues.phone !== userData.phone) {
      updatedData.phone = formValues.phone;
    }

    if (formValues.address && formValues.address !== userData.address) {
      updatedData.address = formValues.address;
    }

    // Check if profilePicture is set and add it to the updatedData
    if (profilePicture) {
      updatedData.profile_picture = profilePicture;
    }

    // If no fields have changed, show a message to the user and return
    if (Object.keys(updatedData).length === 0) {
      enqueueSnackbar('No changes to save.', { variant: 'info' });
      return;
    }

    const userId = userData ? userData.id : null;

    // Create a FormData object to send the data as a multipart/form-data
    const formData = new FormData();
    Object.entries(updatedData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Call the UpdateUserData function from APIService
    APIService.patchUserProfile(formData, userId)
      .then((updatedUserData) => {
        // Handle success
        console.log('User data updated successfully:', updatedUserData);
        setProfilePictureUrl(`${baseUrl}${updatedUserData?.profile_picture.replace('/', '')}`);
        enqueueSnackbar('Profile updated successfully!', { variant: 'success' });
      })
      .catch((error) => {
        // Handle error
        console.error('Error updating user data:', error);
        enqueueSnackbar('Failed to update profile. Please try again.', { variant: 'error' });
      });
  };

  return (
    <div className='cont-text'>
      <div className="prof-top">
        <h2>Edit Profile</h2>
        <div className="opt-btns">
          <button className='edit-btn' onClick={() => handleSidebarItemClick("profile")}>View Profile</button>
          <button className='edit-btn' onClick={handleProfileUpdate}>Save Changes</button>
        </div>
      </div>
      <div className="profPage">
        <div className="upperSec">
          <div className="info">
            <div className="avatar edit-avatar" data-tooltip="Change Photo">
              {/* Input field and text for uploading photo */}
              <div className='in-avatar'>
                {
                  profilePictureUrl ? (
                    <img
                      src={profilePictureUrl}
                      className="avatar-pic edit-avatar-pic"
                      alt="Profile"
                    />
                  ) : (
                    <img src={avatar} className="avatar-pic edit-avatar-pic" alt="Profile" />
                  )
                }
              </div>
              <input type="file" id="avatar-upload" className="avatar-upload" accept="image/*" onChange={handleImageChange} />
              <label htmlFor="avatar-upload" className="avatar-label">
                Upload Photo
              </label>
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
                <input type="text" name="username" className='usernamedis' defaultValue={userData?.username} disabled onChange={handleInputChange} />
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
            <div className="in-detail ">
              <div className="label">Address</div>
              <div className="value">
                <textarea name="address" defaultValue={userData?.address} onChange={handleInputChange}></textarea>
              </div>
            </div>
            <div className="in-detail last">
              <div className="label">Password</div>
              <div className="value btn-change">
                <button className='edit-btn change-ps' onClick={() => handleSidebarItemClick("change-ps")}>Change Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile;
