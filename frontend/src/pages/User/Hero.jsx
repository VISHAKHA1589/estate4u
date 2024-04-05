import React from 'react';
import './hero.css';
import { IonIcon } from '@ionic/react';
import { homeOutline } from 'ionicons/icons';
import EnquiryForm from '../Auth/enquiryForm';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <p className="hero-subtitle">
            <IonIcon icon={homeOutline} />
            <span>Real Estate Agency</span>
          </p>
          <h2 className="h1 hero-title font-bold">Find Your Dream <br/> House By Us</h2>
          <p className="hero-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
          </p>
          <button className="btn">Make An Enquiry</button>
        </div>
        <figure className="hero-banner">
          <img src="../src/assets/images/hero-banner.png" alt="Modern house model" className="w-100" />
        </figure>
      </div>
    </section>
  );
}

export default Hero;
