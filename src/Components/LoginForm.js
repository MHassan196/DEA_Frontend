// LoginForm.js

import React, { useState, useEffect } from 'react';
import './LoginForm.css'
import APIService from './APIService'
import { useNavigate } from 'react-router-dom';


const LoginForm = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token');
    if (isLoggedIn) {
      navigate('/main', {replace: true});
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous errors
    setUsernameError('');
    setPasswordError('');

    if (!formData.username) {
      setUsernameError('Username is required.');
    }

    if (!formData.password) {
      setPasswordError('Password is required.');
    }

    if (formData.username && formData.password) {

      // console.log('FormData:', formData);
      APIService.LoginUser(formData)
      .then((response) => {
        console.log('Login Response:', response);
        const token = response.token;
        localStorage.setItem('token', token);

        // Call the onLoginSuccess function to set isLoggedIn to true
        if (response.status === 'success') {
          // Redirect to the main page after successful login
          window.location.href = '/main';
          // navigate.replace('/main');
        } else {
          // Handle the case of unsuccessful login
          setLoginError('Invalid username or password.');
        }
      })
      .catch((error) => {
        console.error('Login Error:', error);
        setLoginError('An error occurred during login.');
      });
    }

  };

  // Function to handle the redirection to the registration page
  const redirectToRegisterPage = () => {
    navigate('/register'); // Navigate to the registration page
  };
  // Function to handle the redirection to the Forgot Password page
  const redirectToForgotPage = () => {
    navigate('/forgot'); // Navigate to the Forgot Password page
  };

  return (
    <div className='container-fluid box'>
      <div className="loginbox">
        <form onSubmit={handleSubmit} >
          <h2 className='mb-4 loghead'>Login</h2>
          
            {loginError && <div className='loginerr mb-2'>{loginError}</div>}
          
          <div>
            <label htmlFor="username" className='form-label'>Username</label>
            <input type="text" id="username" className='form-control mb-3 p-2' name="username" value={formData.username} onChange={handleChange} />
            {usernameError && <div className="error-msg mb-2">{usernameError}</div>}
          </div>
          <div>
            <label htmlFor="password" className='form-label'>Password</label>
            <input type="password" id="password" className='form-control mb-2 p-2' name="password" value={formData.password} onChange={handleChange} />
            {passwordError && <div className="error-msg mb-2">{passwordError}</div>}
          </div>
          <div className='mb-5'>
            <a href="" className='forgot-password-link' onClick={redirectToForgotPage}>Forgot Password?</a>
          </div>
          <div>
            <input type="checkbox" className='form-check-input mb-4' name="" id="remember" />
            <label htmlFor="remember" className='form-label mx-2'>Remember Me</label>
          </div>
          <button type="submit" className='loginbtn btn mb-3 p-2'>Login</button>
          <hr className='hrline' />
          <button className='btn regBtn mt-3 p-2' onClick={redirectToRegisterPage}>Create New Account</button>
        </form>
        
      </div>
    </div>
  );
};

export default LoginForm;