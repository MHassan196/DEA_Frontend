// ForgotPassword.js

import React, { useState } from 'react';
import APIService from './APIService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    APIService.ForgotPassword({ email })
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        console.error('Forgot Password Error:', error);
        setMessage('An error occurred. Please try again.');
      });
  };

  return (
    <div className='container-fluid box'>

    
    <div className="loginbox">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} required />
        <button type="submit">Continue</button>
      </form>
      <p className="message">{message}</p>
    </div>
    </div>
  );
};

export default ForgotPassword;
