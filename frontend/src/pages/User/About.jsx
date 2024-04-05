import React from 'react';

import { IonIcon } from '@ionic/react';
import { homeOutline, leafOutline, wineOutline, shieldCheckmarkOutline } from 'ionicons/icons';
function About() {
  return (
  <section class="about" id="about">
    <div class="container">

      <figure class="about-banner">
        <img src="../src/assets/images/about-banner-1.png" alt="House interior"/>

        <img src="../src/assets/images/about-banner-2.jpg" alt="House interior" class="abs-img"/>
      </figure>

      <div class="about-content">

        <p class="section-subtitle">About Us</p>

        <h2 class="h2 section-title">The Leading Real Estate Rental Marketplace.</h2>

        <p class="about-text">
          Over 39,000 people work for us in more than 70 countries all over the This breadth of global coverage,
          combined with
          specialist services
        </p>

        <ul class="about-list">

          <li class="about-item">
            <div class="about-item-icon">
              <IonIcon icon={homeOutline}></IonIcon>
            </div>

            <p class="about-item-text">Smart Home Design</p>
          </li>

          <li class="about-item">
            <div class="about-item-icon">
            <IonIcon icon={leafOutline}></IonIcon>
            </div>

            <p class="about-item-text">Beautiful Scene Around</p>
          </li>

          <li class="about-item">
            <div class="about-item-icon">
            <IonIcon icon={wineOutline}></IonIcon>
            </div>

            <p class="about-item-text">Exceptional Lifestyle</p>
          </li>

          <li class="about-item">
            <div class="about-item-icon">
            <IonIcon icon={shieldCheckmarkOutline}></IonIcon>
            </div>

            <p class="about-item-text">Complete 24/7 Security</p>
          </li>

        </ul>

        <p class="callout">
          "Enimad minim veniam quis nostrud exercitation
          llamco laboris. Lorem ipsum dolor sit amet"
        </p>

        <a href="#service" class="btn">Our Services</a>

      </div>

    </div>
</section>

    
  );
}

export default About;
