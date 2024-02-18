import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import logo2 from '../../assets/images/logo2.png'

const Sidebar = ({handleSidebarItemClick}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    // const navigate = useNavigate()

    const handleToggleSidebar = () => {
        setIsSidebarOpen((prevState) => !prevState);
    };

    // const handleNavigation = (route) => {
    //     // Use the navigate function to programmatically navigate to the specified route
    //     navigate(route);
    // };

    useEffect(() => {
        const handleWindowResize = () => {
          if (window.innerWidth <= 1000) {
            setIsSidebarOpen(false);
          } else {
            setIsSidebarOpen(true);
          }
        };
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, []);

    return (
        <div className={`sidebar ${isSidebarOpen ? 'large' : 'small'}`}>
            {
                isSidebarOpen ?
                    <div className="logoapp-large">  
                        <img src={logo} alt="Logo" className='img-fluid' onClick={() => handleSidebarItemClick('dashboard')} />                 
                    </div> :
                    <div className="logoapp-small">
                        <img src={logo2} alt="Logo" width="250px" className='img-fluid' onClick={() => handleSidebarItemClick('dashboard')} />
                    </div>
            }

            <nav className={`navbar ${isSidebarOpen ? '' : 'centered'}`}>
                <ul>
                    <li className={`${isSidebarOpen ? '' : 'sm-li'}`} onClick={() => handleSidebarItemClick('dashboard')}>
                        <div >
                            <i className="fas fa-home"></i>
                            {isSidebarOpen && <span>Dashboard</span>}
                        </div>
                    </li>
                    <p className='category'>Data</p>
                    <li className={`${isSidebarOpen ? '' : 'sm-li'}`} onClick={() => handleSidebarItemClick('upload')}>
                        <div >
                            <i className="fas fa-upload"></i>
                            {isSidebarOpen && <span>Upload File</span>}
                        </div>
                    </li>
                    <li className={`${isSidebarOpen ? '' : 'sm-li'}`} onClick={() => handleSidebarItemClick('handwritten')}>
                        <div >
                            <i className="fas fa-file-lines"></i>
                            {isSidebarOpen && <span>Handwritten Data</span>}
                        </div>
                    </li>
                    <li className={`${isSidebarOpen ? '' : 'sm-li'}`} onClick={() => handleSidebarItemClick('view')}>
                        <div >
                            <i className="fas fa-eye"></i>
                            {isSidebarOpen && <span>View Data</span>}
                        </div>
                    </li>
                    <li className={`${isSidebarOpen ? '' : 'sm-li'}`} onClick={() => handleSidebarItemClick('viewhanddata')}>
                        <div >
                            <i className="fas fa-eye"></i>
                            {isSidebarOpen && <span>View Handwritten Data</span>}
                        </div>
                    </li>
                    <li className={`${isSidebarOpen ? '' : 'sm-li'}`} onClick={() => handleSidebarItemClick('customize')}>
                        <div >
                            <i className="fas fa-cogs"></i>
                            {isSidebarOpen && <span>Customize Data</span>}
                        </div>
                    </li>
                    <p className='category'>Pages</p>
                    <li className={`${isSidebarOpen ? '' : 'sm-li'}`} onClick={() => handleSidebarItemClick('contact')}>
                        <div >
                            <i className="fas fa-envelope"></i>
                            {isSidebarOpen && <span>Contact Us</span>}
                        </div>
                    </li>
                    <li className={`${isSidebarOpen ? '' : 'sm-li'}`} onClick={() => handleSidebarItemClick('about')}>
                        <div >
                            <i className="fas fa-info-circle"></i>
                            {isSidebarOpen && <span>About Us</span>}
                        </div>
                    </li>
                    <li className={`${isSidebarOpen ? '' : 'sm-li'}`} onClick={() => handleSidebarItemClick('faq')}>
                        <div >
                            <i className="fas fa-circle-question"></i>
                            {isSidebarOpen && <span>FAQs</span>}
                        </div>
                    </li>
                    {/* Add more navbar items with icons as needed */}
                </ul>
            </nav>
            <div className={`toggle-button${isSidebarOpen ? 'large' : 'small'}`} onClick={handleToggleSidebar}>
                {/* Use Font Awesome icon for the toggle button */}
                <i className={`fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
            </div>
        </div>
    );
}

export default Sidebar
