import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreatePropertyMutation } from '../../../src/redux/api/propertyApiSlics.js';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice.js';
import Navigation from './Navigation.jsx';

const PropertyList = () => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const { data: categories } = useFetchCategoriesQuery();
  const { userInfo } = useSelector((state) => state.auth);

  const [createProperty] = useCreatePropertyMutation();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  }

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    }
  }

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      setFileToBase(file);
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const propertyData = new FormData();
      propertyData.append("owner", userInfo.email);
      propertyData.append("ownerName", userInfo.name);
      propertyData.append("image", image);
      propertyData.append("name", name);
      propertyData.append("description", description);
      propertyData.append("price", price);
      propertyData.append("category", category);
      propertyData.append("address", address);
      propertyData.append("phoneNumber", phoneNumber);
  
      const { data } = await createProperty(propertyData);
      if (data && data.error) {
        toast.error("Property create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Property create failed. Try Again.");
    }
  };
  
  return (
    <div>
      <Navigation />
      <div className="flex justify-center items-center h-full lg:ml-60">
        <div className="container xl:mx-[9rem] sm:mx-[0]">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-3/4 p-3">
              <div className="h-12 section-title text-2xl">post a property</div>

              {imageUrl && (
                <div className="text-center">
                  <img
                    src={imageUrl}
                    alt="property"
                    className="block mx-auto max-h-[200px]"
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="border text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                  {image ? image.name : "Upload Image"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={uploadFileHandler}
                    className={!image ? "hidden" : "text-black"}
                  />
                </label>
              </div>

              <div className="p-3 ">
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 md:pr-3 mb-3">
                    <label htmlFor="name block" className="">Name</label><br />
                    <input type="text" className='p-4 w-full border rounded-lg bg-white text-black' value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div className="w-full md:w-1/2 md:pl-3 mb-3">
                    <label htmlFor="price" className="lg:pl-5">Price</label><br />
                    <input type="text" className='p-4 w-full border rounded-lg bg-white text-black' value={price} onChange={e => setPrice(e.target.value)} />
                  </div>

                  <div className="w-full md:w-1/2 pr-3 mb-3">
                    <label htmlFor="number block" className="">Phone Number</label><br />
                    <input type="number" className='p-4 w-full border rounded-lg bg-white text-black' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                  </div>

                  <div className="w-full md:w-1/2 md:pl-3 mb-3">
                    <label htmlFor="address block" className="lg:pl-5">Address</label><br />
                    <input type="text" className='p-4 w-full border rounded-lg bg-white text-black' value={address} onChange={e => setAddress(e.target.value)} />
                  </div>
                </div>
                <label htmlFor="" className="my-5">Description</label>
                <textarea
                  type="text"
                  className="p-2 mb-3 border rounded-lg w-full"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                {categories && (
                  <div>
                    <label htmlFor="">Category</label><br />
                    <select placeholder='Select category' className='p-4 w-full border rounded-lg bg-white text-black' onChange={e => setCategory(e.target.value)}>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <button onClick={handleSubmit} className='bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full section-title cursor-pointer'>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
