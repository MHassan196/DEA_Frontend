// RegisterForm.js

import React, { useState } from 'react';
import './LoginForm.css'
import APIService from './APIService'
import { redirect, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    phone: '',
    password: '',
    address: '',
    profile_picture: null, // New field for profile picture
    purpose: '',
    otherPurpose: '',

  });

  // const [successMessage, setSuccessMessage] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [profile_pictureError, setProfile_pictureError] = useState('');
  const [purposeError, setPurposeError] = useState('');
  const [otherPurpose, setOtherPurpose] = useState('');

  let navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous errors
    setNameError('');
    setEmailError('');
    setUsernameError('');
    setPhoneError('');
    setPasswordError('');
    setAddressError('');
    setProfile_pictureError('');
    setPurposeError('');

    if (!formData.name) {
      setNameError('Name is required.');
    }

    if (!formData.email) {
      setEmailError('Email is required.');
    } else if (!isEmailValid(formData.email)) {
      setEmailError('Please enter a valid email address.');
    }

    if (!formData.username) {
      setUsernameError('Username is required.');
    }

    if (!formData.phone) {
      setPhoneError('Phone is required.');
    } else if (formData.phone.length < 8) {
      setPhoneError('Phone number must be at least 8 digits.');
    }

    if (!formData.password) {
      setPasswordError('Password is required.');
    } else if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
    } else if (!/\d/.test(formData.password)) {
      setPasswordError('Password must contain at least one numeric digit.');
    } else if (!/[!@#$%^&*]/.test(formData.password)) {
      setPasswordError('Password must contain at least one special character (!@#$%^&*).');
    }

    if (!formData.address) {
      setAddressError('Address is required.');
    }
    if (!formData.purpose) {
      setPurposeError('Purpose is required.');
    }
    if (!formData.profile_picture) {
      setProfile_pictureError('Profile Picture is required.');
    }

    if (formData.name && formData.email && formData.username && formData.phone && formData.address && formData.purpose && formData.profile_picture && formData.password.length >= 8 &&
      /\d/.test(formData.password) &&
      /[!@#$%^&*]/.test(formData.password)) {

      if (formData.purpose === 'Other' && formData.otherPurpose) {
        setFormData({ ...formData, purpose: formData.otherPurpose });
      }
      console.log('Form Data to be sent:', formData);
      // const data = new FormData();
      // Object.keys(formData).forEach((key) => {
      //   data.append(key, formData[key]);
      // });

      // API call for user registration using the formData
      APIService.RegisterUser(formData)
        .then((response) => {
          if (response.status === 201) {
            // Successful registration
            return response.json();
          } else if (response.status === 400) {
            // Bad request: handle specific error cases
            return response.json().then((error) => {
              if (error.email) {
                setEmailError('Email already exists.');
              }
              if (error.username) {
                setUsernameError('Username already exists.');
              }
              // Handle other specific error cases if needed
              throw new Error('Bad request');
            });
          } else {
            throw new Error('Unexpected server response');
          }
        })
        .then((data) => {
          console.log('Registration successful:', data);
          window.location.href = '/';
          enqueueSnackbar('Registered Successfully', { variant: 'success' });
        })
        .catch((error) => {
          if (error.message === 'Bad request') {
            // Handle errors related to bad requests
            enqueueSnackbar('Error registering user', { variant: 'error' });
          } else {
            console.error('Registration failed:', error);
            enqueueSnackbar('Error registering user', { variant: 'error' });
          }
        });

    }

  };

  const isEmailValid = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const redirectLoginPage = () => {
    navigate('/')
  }

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profile_picture: file });
  };

  const handlePurposeChange = (e) => {
    const { value } = e.target;
    console.log('Selected purpose:', value);
    setFormData({ ...formData, purpose: value });
  };

  const handleOtherPurposeChange = (e) => {
    const newOtherPurposeValue = e.target.value;
    console.log('New otherPurpose value:', newOtherPurposeValue);
    setFormData({ ...formData, otherPurpose: newOtherPurposeValue });
  };



  return (
    <div className='container-fluid box regBox'>
      <div className="loginbox">
        {/* {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )} */}
        <form onSubmit={handleSubmit} >
          <h2 className='mb-4 loghead'>Registration Form</h2>
          <div className='row'>
            <div className='col-lg-6'>
              <label htmlFor="name" className='form-label'>Name</label>
              <input type="text" id="name" className='form-control mb-3 p-2' name="name" value={formData.name} onChange={handleChange} />
              {nameError && <div className="error-msg mb-2">{nameError}</div>}
            </div>

            <div className='col-lg-6'>
              <label htmlFor="email" className='form-label'>Email</label>
              <input type="text" id="email" className='form-control mb-3 p-2' name="email" value={formData.email} onChange={handleChange} />
              {emailError && <div className="error-msg mb-2">{emailError}</div>}
            </div>
          </div>
          <div className="row">
            <div className='col-lg-6'>
              <label htmlFor="username" className='form-label'>Username</label>
              <input type="text" id="username" className='form-control mb-3 p-2' name="username" value={formData.username} onChange={handleChange} />
              {usernameError && <div className="error-msg mb-2">{usernameError}</div>}
            </div>
            <div className='col-lg-6'>
              <label htmlFor="phone" className='form-label'>Phone Number</label>
              <input type="number" id="phone" className='form-control mb-3 p-2' name="phone" value={formData.phone} onChange={handleChange} />
              {phoneError && <div className="error-msg mb-2">{phoneError}</div>}
            </div>
          </div>

          <div>
            <label htmlFor="password" className='form-label'>Password</label>
            <input type="password" id="password" className='form-control mb-3 p-2' name="password" value={formData.password} onChange={handleChange} />
            {passwordError && <div className="error-msg mb-2">{passwordError}</div>}
          </div>

          <div>
            <label htmlFor="profile-picture" className="form-label">
              Profile Picture
            </label>
            <input
              type="file"
              id="profile-picture"
              className="form-control mb-3 p-2"
              name="profile_picture"
              onChange={handleProfilePictureChange}
            />
            {profile_pictureError && <div className="error-msg mb-2">{profile_pictureError}</div>}
          </div>
          <div>
            <label htmlFor="purpose" className="form-label">
              Purpose
            </label>

            <select
              id="purpose"
              className="form-control mb-3 p-2"
              name="purpose"
              value={formData.purpose}
              onChange={handlePurposeChange}
            >
              <option value="">Select Purpose</option>
              {/* Add dropdown options based on your requirements */}
              {/* Example options */}
              <option value="News and Media">News and Media</option>
              <option value="Health and Wellness">Health and Wellness</option>
              <option value="Non-profit / Charity">Non-profit / Charity</option>
              <option value="Food and Beverage">Food and Beverage</option>
              <option value="Technology / IT Services">Technology / IT Services</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Sports and Fitness">Sports and Fitness</option>
              <option value="Informational">Informational</option>
              <option value="Educational">Educational</option>
              {/* Add 'Other' option which will display an input field */}
              <option value="Other">Other</option>
            </select>
            {formData.purpose === 'Other' &&
              (
                <div>
                  <input
                    type="text"
                    className="form-control mb-3 p-2"
                    name="otherPurpose"
                    placeholder="Enter Other Purpose"
                    value={formData.otherPurpose}
                    onChange={handleOtherPurposeChange}
                  />
                  <button
                    type="button"
                    className="clearBtn"
                    onClick={() => setFormData({ ...formData, purpose: '', otherPurpose: '' })}
                  >
                    Clear
                  </button>
                </div>
              )}
            {/* Display input field for 'Other' option */}

            {purposeError && <div className="error-msg mb-2">{purposeError}</div>}

          </div>
          <div>
            <label htmlFor="address" className='form-label'>Address</label>
            <input type="text" id="address" className='form-control mb-3 p-2' name="address" value={formData.address} onChange={handleChange} />
            {addressError && <div className="error-msg mb-2">{addressError}</div>}
          </div>

          <button type="submit" className='loginbtn btn mb-3 p-2'>Register</button>
          <hr className='hrline' />
          <button className='btn regBtn mt-3 p-2' onClick={redirectLoginPage}>Already Have an Account?</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
