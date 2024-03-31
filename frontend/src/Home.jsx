import Navigation from "./pages/Auth/Navigation";
import Hero from "./pages/User/Hero";
import './App.css'
import About from "./pages/User/About";
import Services from "./pages/User/Services";

import Features from "./pages/User/features";
import Flats from "./pages/User/rentsmall";
import Container from "./pages/User/container";
import Footer from "./pages/User/Footer";
import SellSmall from "./pages/User/sellSmall";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";




function Home() {

  

  return (
  <>

  <Navigation/>
  <Hero/>
  <About/>
  <Services/>
 <SellSmall/>
  <Features/>
  <Flats/>

  <Container/>
  <Footer/>
  </>
  )
}

export default Home;
