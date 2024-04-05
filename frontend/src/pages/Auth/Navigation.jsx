import React from 'react';
import { mailOutline, locationOutline, logoFacebook, logoTwitter, logoInstagram, logoPinterest, closeOutline, searchOutline, personOutline, cartOutline, menuOutline } from 'ionicons/icons';



function Navigation() {
  return (
    <header className="header" data-header>
      <div className="overlay" data-overlay></div>
      

      <div className="header-top">
        <div className="container">
          <ul className="header-top-list">
            <li>
              <a href="mailto:info@homeverse.com" className="header-top-link">
                <ion-icon icon={mailOutline}></ion-icon>
                <span>info@homeverse.com</span>
              </a>
            </li>
            <li>
              <a href="#" className="header-top-link">
                <ion-icon icon={locationOutline}></ion-icon>
                <address>15/A, Nest Tower, NYC</address>
              </a>
            </li>
          </ul>

          <div className="wrapper">
            <ul className="header-top-social-list">
              <li>
                <a href="#" className="header-top-social-link">
                  <ion-icon icon={logoFacebook}></ion-icon>
                </a>
              </li>
              <li>
                <a href="#" className="header-top-social-link">
                  <ion-icon icon={logoTwitter}></ion-icon>
                </a>
              </li>
              <li>
                <a href="#" className="header-top-social-link">
                  <ion-icon icon={logoInstagram}></ion-icon>
                </a>
              </li>
              <li>
                <a href="#" className="header-top-social-link">
                  <ion-icon icon={logoPinterest}></ion-icon>
                </a>
              </li>
            </ul>
            <button className="header-top-btn">Add Listing</button>
          </div>
        </div>
      </div>

      <div className="header-bottom ">
        <div className="container">
          <a href="#" className="logo">
            <img src="../src/assets/images/logo.png" className='w-[12rem]' alt="Homeverse logo" />
          </a>

          <nav className="navbar" data-navbar>
            <div className="navbar-top">
              <a href="#" className="logo ">
                <img src="frontend/src/assets/logo.png"  alt="Homeverse logo" />
              </a>
              <button className="nav-close-btn" data-nav-close-btn aria-label="Close Menu">
                <ion-icon icon={closeOutline}></ion-icon>
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
            <button className="header-bottom-actions-btn" aria-label="Search">
              <ion-icon icon={searchOutline}></ion-icon>
              <span>Search</span>
            </button>
            <button className="header-bottom-actions-btn" aria-label="Profile">
              <ion-icon icon={personOutline}></ion-icon>
              <span>Profile</span>
            </button>
            <button className="header-bottom-actions-btn" aria-label="Cart">
              <ion-icon icon={cartOutline}></ion-icon>
              <span>Cart</span>
            </button>
            <button className="header-bottom-actions-btn" data-nav-open-btn aria-label="Open Menu">
              <ion-icon icon={menuOutline}></ion-icon>
              <span>Menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
