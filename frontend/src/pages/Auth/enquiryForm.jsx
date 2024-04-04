import React, { useState } from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useGetPropertyDetailsQuery } from '../../redux/api/propertyApiSlics';
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 
import Navigation from './Navigation';

export function EnquiryForm() {
  
  const { userInfo } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    email: userInfo.email,
    phoneNumber: '',
    message: '',
    category: ''
  });

  const [loading, setLoading] = useState(false); // Introduce loading state
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true during form submission
    try {
      await axios.post('http://localhost:5000/send-enquiry-email', formData);
      // Redirect to home page after successful submission
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error(error);
      alert('Failed to send email');
    } finally {
      setLoading(false); // Reset loading state after form submission
    }
  };  

  return (
    <div className="flex flex-col h-screen w-screen"> 

      <Navigation />
      <div className="flex-grow flex justify-center items-center border border-"> {/* Make the content flex-grow to occupy remaining height */}
        <Card color="transparent" shadow={false} className="flex justify-center items-center">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            The following details will be sent to the owner
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Name
              </Typography>
              <Input
                type="text"
                size="lg"
                placeholder='John Doe'
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Email
              </Typography>
              <Input
                type="email"
                size="lg"
                placeholder='john@example.com'
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Phone Number
              </Typography>
              <Input
                type="tel"
                size="lg"
                placeholder='+1234567890'
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Category
              </Typography>
              <Input
                type="text"
                size="lg"
                placeholder='Buy/Rent/Sell'
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Message
              </Typography>
              <Input
                type="text"
                size="lg"
                placeholder='Write your message here'
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <Button 
              onClick={handleSubmit} 
              className="mt-6" 
              fullWidth 
              disabled={loading} // Disable button when loading
            >
              {loading ? 'Sending...' : 'Send Enquiry'} {/* Show loading text if loading */}
            </Button>
            <Button 
              onClick={() => {
                const phoneNumber = '9774573178'; // Replace with the actual phone number
                const message = encodeURIComponent(`Hello, I am ${formData.name}, i am enquiring abour ${formData.category} and my message is: ${formData.message}`); // Encode the message
                const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
                window.open(whatsappUrl, '_blank');
              }} 
              className="mt-6" 
              fullWidth 
              disabled={loading} // Disable button when loading
            >
              Contact Us on WhatsApp
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default EnquiryForm;
