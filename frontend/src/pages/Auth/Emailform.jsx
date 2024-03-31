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
import { useParams } from 'react-router';
export function EmailForm() {
  const { id: propertyId } = useParams();
  const { data: property, isLoading, isError } = useGetPropertyDetailsQuery(propertyId);
  const [notSubmit, setNotSubmit] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    email: userInfo.email,
    phoneNumber: '',
    propertyOwner: property.ownerName,
    propertyPhoneNumber: property.phoneNumber,
    propertyName: property.name
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setNotSubmit(true);
    e.preventDefault();
    try {
      // Assuming `axios.post` returns a promise similar to `login({ email, password })`
      const response = await axios.post('http://localhost:5000/send-email', formData);
     
    } catch (error) {
      console.error(error);
      // Handle error
      alert('Failed to send email');
    }
  };
  

  return (
    <>
      {notSubmit ? (
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <div>the owner will get in contact with you soon..</div>
        </div>
      ) : (
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
                placeholder='john doe'
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
              <Typography>
                {userInfo && userInfo.email}
              </Typography>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Phone number
              </Typography>
              <Input
                type="tel"
                size="lg"
                placeholder='+919876543210'
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <Button onClick={handleSubmit} className="mt-6" fullWidth>
              send enquiry
            </Button>
          </form>
        </Card>
      )}
    </>
  );
}

export default EmailForm;
