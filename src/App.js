import './App.css';
import MainPage from './pages/MainPage';
import LoginForm from './Components/LoginForm';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to set isLoggedIn state when user is successfully logged in
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {/* If isLoggedIn is true, display MainPage, otherwise display the login form */}
      {isLoggedIn ? <MainPage /> : <LoginForm onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
}

export default App;
