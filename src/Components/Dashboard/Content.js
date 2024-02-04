import React from 'react'
import { Routes, Route } from 'react-router-dom';
import UploadFile from '../../pages/UploadFile';
import ViewData from '../../pages/ViewData';
import CustomizeData from '../../pages/CustomizeData';
import ContactUs from '../../pages/ContactUs';
import AboutUs from '../../pages/AboutUs';
import Faq from '../../pages/Faq';
import MainPage from '../../pages/MainPage';
import Dashboard from '../../pages/Dashboard';
import Profile from '../../pages/Profile';


function Content() {
  return (
    <div>
      <Routes>
          <Route exact path="/main" Component={Dashboard} />
          <Route exact path="/upload" Component={UploadFile} />
          <Route exact path="/view" Component={ViewData} />
          <Route exact path="/customize" Component={CustomizeData} />
          <Route exact path="/contact" Component={ContactUs} />
          <Route exact path="/about" Component={AboutUs} />
          <Route exact path="/faq" Component={Faq} />
          <Route exact path="/profile" Component={Profile} />

        </Routes>
    </div>
  )
}

export default Content
