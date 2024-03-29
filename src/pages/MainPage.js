import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Dashboard/Header';
import Sidebar from '../Components/Dashboard/Sidebar';
import Footer from '../Components/Dashboard/Footer';
import Content from '../Components/Dashboard/Content';
import UploadFile from './UploadFile';
import ViewData from './ViewData';
import CustomizeData from './CustomizeData';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import Faq from './Faq';
import './MainPage.css'
import Dashboard from './Dashboard';
import Profile from './Profile';
import EditProfile from './EditProfile';
import SingleData from './SingleData';
import CustSingleData from './CustSingleData';
import HandwrittenData from './HandwrittenData';
import EditData from './EditData';
import ViewHandwrittenData from './ViewHandwrittenData';
import SingleHandwrittenData from './SingleHandwrittenData';
import EditHandwrittenData from './EditHandwrittenData';
import ChangePassword from './ChangePassword';


function MainPage() {

  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState('dashboard');
  const [selectedCollection, setSelectedCollection] = useState(null);


  useEffect(() => {

    const isLoggedIn = !!localStorage.getItem('token'); // Check authentication
    if (!isLoggedIn) {
      navigate('/'); // Redirect to login if not authenticated
    }

    
  }, [navigate]); 


  const toggleSidebar = () => {
    setIsSidebarOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleSidebarItemClick = (item, collectionName = null) => {
    setSelectedItem(item);
    setSelectedCollection(collectionName);

  };


  // const handleSidebarItemClick = (item) => {
  //   setSelectedItem(item);
  // };

  // useEffect(() => {
  //   // Function to handle sidebar toggle based on screen size
  //   const handleResize = () => {
  //     if (window.innerWidth <= 768) {
  //       setIsSidebarOpen(false);
  //     } else {
  //       setIsSidebarOpen(true);
  //     }
  //   };

  //   // Add event listener for window resize
  //   window.addEventListener('resize', handleResize);

  //   // Call handleResize initially to set the initial state of the sidebar based on screen size
  //   handleResize();

  //   // Remove event listener on component unmount
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    // <div>
    //    <h1>Welcome to the Main Page!</h1>
    //   <p>This is your main page content.</p>
    //   <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
    // </div>
    <div className="app">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} handleSidebarItemClick={handleSidebarItemClick}/>
      <main className={`content ${isSidebarOpen ? '' : 'content-expanded'}`}>
        <Header handleSidebarItemClick={handleSidebarItemClick} />
        
        <div className="main-content">
          {selectedItem === 'dashboard' && <Dashboard handleSidebarItemClick={handleSidebarItemClick} />}
          {selectedItem === 'upload' && <UploadFile />}
          {selectedItem === 'handwritten' && <HandwrittenData />}
          {selectedItem === 'view' && <ViewData handleSidebarItemClick={handleSidebarItemClick} />}
          {selectedItem === 'customize' && <CustomizeData handleSidebarItemClick={handleSidebarItemClick} />}
          {selectedItem === 'contact' && <ContactUs />}
          {selectedItem === 'about' && <AboutUs />}
          {selectedItem === 'faq' && <Faq />}
          {selectedItem === 'profile' && <Profile handleSidebarItemClick={handleSidebarItemClick} />}
          {selectedItem === 'edit-profile' && <EditProfile handleSidebarItemClick={handleSidebarItemClick} />}
          {selectedItem === 'change-ps' && <ChangePassword handleSidebarItemClick={handleSidebarItemClick} />}
          {selectedItem === 'data' && <SingleData collectionName={selectedCollection} handleSidebarItemClick={handleSidebarItemClick} />}
          {selectedItem === 'editdata' && <EditData collectionName={selectedCollection} handleSidebarItemClick={handleSidebarItemClick} />}
          {selectedItem === 'custdata' && <CustSingleData collectionName={selectedCollection} handleSidebarItemClick={handleSidebarItemClick} />}
          {selectedItem === 'viewhanddata' && <ViewHandwrittenData handleSidebarItemClick={handleSidebarItemClick} />}
          {selectedItem === 'singlehanddata' && <SingleHandwrittenData collectionName={selectedCollection} handleSidebarItemClick={handleSidebarItemClick} />}
          {selectedItem === 'handeditdata' && <EditHandwrittenData collectionName={selectedCollection} handleSidebarItemClick={handleSidebarItemClick} />}
        </div>

        {/* <Content/> */}
        {/* <UploadFile/> */}
        <Footer  />
      </main>
    </div>
  )
}

export default MainPage
