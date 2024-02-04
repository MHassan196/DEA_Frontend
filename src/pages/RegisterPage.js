// RegisterPage.js

import React from 'react';
import RegisterForm from '../Components/RegisterForm';
import logo from '../assets/images/logo.png'

const RegisterPage = () => {
  return (
    <div>
      <div className='container-fluid loginpage'>
      <div className="img-container">
      <img src={logo} alt="Logo" className='img-fluid logo' />
      </div>
      <RegisterForm />
    </div>
    </div>
  );
};

export default RegisterPage;
