import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import 'bootstrap/dist/css/bootstrap.min.css'
import MainPage from './pages/MainPage';
import './global-styles.css';
import { SnackbarProvider } from 'notistack';
import ForgotPassword from './Components/ForgotPassword';

function Router() {
  return(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={LoginPage} />
        <Route exact path="/register" Component={RegisterPage} />
        <Route exact path="/forgot" Component={ForgotPassword} />
        <Route exact path="/main" Component={MainPage} />
        
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider>
      <Router />
    </SnackbarProvider>
  </React.StrictMode>
);

reportWebVitals();
