// RegisterUser.js

import APIService from './APIService';

// Function to handle user registration
const handleRegistration = (userData) => {
  APIService.RegisterUser(userData)
    .then((response) => {
      if (response.ok) {
        // If registration is successful, fetch user data and save it in local storage
        APIService.GetUserData() // Make an API call to fetch user data
          .then((userData) => {
            localStorage.setItem('userProfile', JSON.stringify(userData)); // Save user data in local storage
            // Redirect or navigate to the profile page
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      } else {
        // Handle other cases or errors during registration
      }
    })
    .catch((error) => {
      console.error('Registration failed:', error);
      // Handle registration failure or other errors
    });
};
export default handleRegistration;