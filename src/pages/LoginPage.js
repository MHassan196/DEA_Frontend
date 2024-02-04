// LoginPage.js

import React from 'react';
import LoginForm from '../Components/LoginForm';
import logo from '../assets/images/logo.png'

const LoginPage = () => {
  return (
    <div className='container-fluid loginpage'>
      <div className="img-container">
      <img src={logo} alt="Logo" className='img-fluid logo' />
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
