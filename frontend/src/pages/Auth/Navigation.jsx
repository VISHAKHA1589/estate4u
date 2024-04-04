import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { mailOutline, locationOutline, logoFacebook, logoTwitter, logoInstagram, logoPinterest } from 'ionicons/icons';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/features/auth/authSlice.js';
import { useLogoutMutation } from '../../redux/api/UsersApiSlice.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const { userInfo } = useSelector(state => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="header" data-header>
      <div className="header-top">
        <div className="container">
          <ul className="header-top-list">
            <li>
              <a href="mailto:info@homeverse.com" className="header-top-link">
                <IonIcon icon={mailOutline}></IonIcon>
                <span>Estate4Uservices@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="#" className="header-top-link">
                <IonIcon icon={locationOutline}></IonIcon>
                <address>Agartala, Tripura</address>
              </a>
            </li>
          </ul>
          <div className="wrapper">
            <ul className="header-top-social-list">
              <li>
                <a href="#" className="header-top-social-link">
                  <IonIcon icon={logoFacebook}></IonIcon>
                </a>
              </li>
              <li>
                <a href="#" className="header-top-social-link">
                  <IonIcon icon={logoTwitter}></IonIcon>
                </a>
              </li>
              <li>
                <a href="#" className="header-top-social-link">
                  <IonIcon icon={logoInstagram}></IonIcon>
                </a>
              </li>
              <li>
                <a href="#" className="header-top-social-link">
                  <IonIcon icon={logoPinterest}></IonIcon>
                </a>
              </li>
            </ul>
            <button className="header-top-btn">Add Listing</button>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="container gap-4">
          <Link to="/">
            <img className="w-full lg:w-40 sm:w-1/5 md:w-1/2 h-auto" src="../src/assets/images/logo.png" alt="Logo" />
          </Link>
          <nav className="navbar" data-navbar>
            <div className="navbar-bottom">
              <ul className="navbar-list">
                <li>
                  <a href="#home" className="navbar-link" data-nav-link>Home</a>
                </li>
                <li>
                  <a href="#about" className="navbar-link" data-nav-link>About</a>
                </li>
                <li>
                  <a href="#service" className="navbar-link" data-nav-link>Service</a>
                </li>
                <li>
                  <a href="#property" className="navbar-link" data-nav-link>Property</a>
                </li>
                <li>
                  <a href="#blog" className="navbar-link" data-nav-link>Blog</a>
                </li>
                <li>
                  <a href="#contact" className="navbar-link" data-nav-link>Contact</a>
                </li>
              </ul>
            </div>
          </nav>
          <div className="header-bottom-actions">
            <div className="relative inline-block text-left">
              <div>
              <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-6 py-3 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onClick={toggleDropdown} id="menu-button" aria-expanded="true" aria-haspopup="true">
  {userInfo ? (userInfo.name.length > 8 ? userInfo.name.substring(0, 8) + '...' : userInfo.name) : "menu"}
  <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
  </svg>
</button>

              </div>
              {dropdownOpen && (
  <div className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
    {userInfo ? (
      // Links for authenticated users
      <>
        {userInfo.isAdmin ? (
          // Links for authenticated users who are admins
          <>
          <Link to="/admin/userlist" className="text-gray-700 block px-6 py-3 text-lg" role="menuitem" tabIndex="-1" id="menu-item-0">All users</Link> 
          <Link to="/admin/categorylist" className="text-gray-700 block px-6 py-3 text-lg" role="menuitem" tabIndex="-1" id="menu-item-1">All categories</Link> 
          <Link to="/admin/allpropertieslist" className="text-gray-700 block px-6 py-3 text-lg" role="menuitem" tabIndex="-1" id="menu-item-2">All properties</Link> 
          <Link to="/allproperties" className="text-gray-700 block px-6 py-3 text-lg" role="menuitem" tabIndex="-1" id="menu-item-3">All my properties</Link> 
          <Link to="/propertylist" className="text-gray-700 block px-6 py-3 text-lg" role="menuitem" tabIndex="-1" id="menu-item-2">post a property</Link> 
        </>
       
        ) : (
          // Links for authenticated users who are not admins
       

<>
<Link to="/property-list" className="text-gray-700 block px-6 py-3 text-lg" role="menuitem" tabIndex="-1" id="menu-item-0">Make a listing</Link> 
<Link to="/all-properties" className="text-gray-700 block px-6 py-3 text-lg" role="menuitem" tabIndex="-1" id="menu-item-1">All properties</Link> 
<Link to="/enquiry" className="text-gray-700 block px-6 py-3 text-lg" role="menuitem" tabIndex="-1" id="menu-item-2">Make an enquiry</Link> 
<Link to="/propertylist" className="text-gray-700 block px-6 py-3 text-lg" role="menuitem" tabIndex="-1" id="menu-item-2">post a property</Link> 
</>
        )}
        <Link onClick={logoutHandler} className="text-gray-700 block px-6 py-3 text-lg" role="menuitem" tabIndex="-1" id="menu-item-4">Logout</Link> 
      </>
    ) : (
      // Links for unauthorized users
      <>
        <Link to="/login" className="text-gray-700 block px-6 py-3 text-lg" role="menuitem" tabIndex="-1" id="menu-item-0">Login</Link> 
        <Link to="/register" className="text-gray-700 block px-6 py-3 text-lg" role="menuitem" tabIndex="-1" id="menu-item-1">Register</Link> 
        <Link to="/enquiry" className="text-gray-700 block px-6 py-3 text-lg" role="menuitem" tabIndex="-1" id="menu-item-2">Make an enquiry</Link> 
      </>
    )}
  </div>
)}








            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
