import Navigation from "./pages/Auth/Navigation";
import Hero from "./pages/User/Hero";
import './App.css'
import About from "./pages/User/About";
import Services from "./pages/User/Services";
import SellSmall from "./pages/User/sellSmall";
import Features from "./pages/User/features";
import Flats from "./pages/User/rentsmall";
import Container from "./pages/User/container";
import Footer from "./pages/User/Footer";



function App() {
  

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

export default App;
