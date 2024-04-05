import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications
import store from './redux/features/store.js';
import App from './App.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/register.jsx';
import PrivateRoutes from './components/PrivateRoutes.jsx';
import Profile from './pages/User/Profile.jsx';
import AdminRoutes from './pages/Admin/AdminRoutes.jsx';
import UserList from './pages/Admin/UserList.jsx';
import CategoryList from './pages/Admin/CategoryList.jsx';
import AllProperties from './pages/Admin/AllProperties.jsx';
import AllUserProperty from './pages/Auth/AllUserProperty.jsx';
import PropertyList from './pages/Auth/PropertyList.jsx';
import PropertyUpdate from './pages/Auth/PropertyUpdateAdmin.jsx';
import RentPage from './pages/User/rentPage.jsx';
import SellPage from './pages/User/sellPage.jsx';
import PropertyPage from './pages/Auth/PropertyPage.jsx';
import Home from './Home.jsx';
import EnquiryForm from './pages/Auth/enquiryForm.jsx';
import 'tailwindcss/tailwind.css';
import './index.css'; // or wherever your custom CSS is located
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications


ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain="dev-7aqfunz3tyq3gif8.us.auth0.com"
      clientId="oO1fi82DyEVTKxeNcyEdpYwq2ZQEr5yJ"
      redirectUri={window.location.origin}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}/>
          <Route path="/login" element={<Login />} />
          
          <Route path="/register" element={<Register />} />
          <Route path="/forRent" element={<RentPage />} />
          <Route path="/property/:id" element={<PropertyPage/>} />
          <Route path="/forSale" element={<SellPage />} />
          <Route index={true} path="/" element={<Home />} />
          
          {/* Define private routes with PrivateRoutes component */}
          <Route element={<PrivateRoutes />}>
            {/* Nested route for /profile */}
            <Route path="/profile" element={<Profile />} /><Route path='/propertylist/:pageNumber' element={<PropertyList/>}/>
            <Route path='/propertylist' element={<PropertyList/>}/>
            <Route path='/property/update/:_id'  element={<PropertyUpdate/>}/>
            <Route path='/allproperties'  element={<AllUserProperty/>}/>
            <Route path='/enquiry'  element={<EnquiryForm/>}/>

          </Route>
          
          <Route path='/admin/' element={<AdminRoutes/>}>
              <Route path='userlist' element={<UserList/>}/>
              <Route path='categorylist' element={<CategoryList/>}/>
              <Route path='allpropertieslist' element={<AllProperties/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer /> {/* Place ToastContainer here */}
    </Auth0Provider>
  </Provider>,
  document.getElementById('root')
);
