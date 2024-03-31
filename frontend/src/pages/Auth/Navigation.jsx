import React from 'react';
import { IonIcon } from '@ionic/react';
import { mailOutline, locationOutline, closeOutline, logoFacebook, logoTwitter, logoInstagram, logoPinterest } from 'ionicons/icons';
import './Navigation.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/features/auth/authSlice.js';
import { useLogoutMutation } from '../../redux/api/UsersApiSlice.js';
import { useNavigate } from 'react-router-dom';

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
      <div className="overlay" data-overlay></div>
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
        <div className="container">
          <Link to="/">
            <img className="w-full h-auto" src="../src/assets/images/logo.png" alt="Homeverse logo" />
          </Link>
          <nav className="navbar" data-navbar>
            <div className="navbar-top ">
              <a href="#" className="logo ">
                <img className="w-8 h-auto" src="./assets/images/logo.png" alt="Homeverse logo" />
              </a>
              <button className="nav-close-btn" data-nav-close-btn aria-label="Close Menu">
                <IonIcon icon={closeOutline}></IonIcon>
              </button>
            </div>
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
                  {userInfo ? userInfo.name : "menu"}
                  <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                  <div className="py-2" role="none">
                    {!userInfo ? <Link to="/register" className="text-gray-700 block px-6 py-3 text-lg" role="menuitem" tabIndex="-1" id="menu-item-0">Register</Link> : <Link to="/allProperties" className="text-gray-700 block px-6 py-3 text-lg" role="menuitem" tabIndex="-1" id="menu-item-0">your properties</Link>}
                    {!userInfo ? <Link to="/login" className="text-gray-700 block px-6 py-3 text-lg" role="menuitem" tabIndex="-1" id="menu-item-0">Login</Link> : <Link to="/propertyList" className="text-gray-700 block px-6 py-3 text-lg" role="menuitem" tabIndex="-1" id="menu-item-0">post your property</Link>}
                    {userInfo ? <Link to="/logout" className="text-gray-700 block px-6 py-3 text-lg" role="menuitem" tabIndex="-1" id="menu-item-0">Logout</Link> : ""}
                    {userInfo && userInfo.isAdmin ? <Link to="/allusers" className="text-gray-700 block px-6 py-3 text-lg" role="menuitem" tabIndex="-1" id="menu-item-0">All users</Link> : null}

                    {!userInfo ? <Link to="/logout" className="text-gray-700 block px-6 py-3 text-lg" role="menuitem" tabIndex="-1" id="menu-item-0">Login</Link> : <Link to="/enquiry" className="text-gray-700 block px-6 py-3 text-lg" role="menuitem" tabIndex="-1" id="menu-item-0">Make an enquiry</Link>}
                    <button type="submit" className="text-gray-700 block w-full px-6 py-3 text-left text-lg" role="menuitem" tabIndex="-1" id="menu-item-3" onClick={logoutHandler}>Sign out</button>
                  </div>
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
