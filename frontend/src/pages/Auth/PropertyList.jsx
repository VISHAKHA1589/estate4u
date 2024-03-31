import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreatePropertyMutation } from '../../../src/redux/api/propertyApiSlics.js';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice.js';

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
      // Assuming you have the URL of the uploaded image available from the server response
      const imageUrl = URL.createObjectURL(file); // Create a local URL for preview
      setImageUrl(imageUrl); // Update the imageUrl state
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const propertyData = new FormData();
      propertyData.append("image", image);
      propertyData.append("name", name);
      propertyData.append("description", description);
      propertyData.append("price", price);
      propertyData.append("category", category);
      propertyData.append("address", address);
      propertyData.append("phoneNumber", phoneNumber);
      propertyData.append("owner", userInfo._id);
      propertyData.append("ownerName", userInfo.username);

      const { data } = await createProperty(propertyData);
      if (data.error) {
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
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>

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
              <div className="one">
                <label htmlFor="name block" className="">name</label><br />
                <input type="text" className='p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black' value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="two ">
                <label htmlFor="price" className="lg:pl-5">price</label><br />
                <input type="text" className='p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black lg:ml-5' value={price} onChange={e => setPrice(e.target.value)} />
              </div>

              <div className="three">
                <label htmlFor="number block" className="">Phone number</label><br />
                <input type="number" className='p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
              </div>

              <div className="three">
                <label htmlFor="address block" className="lg:ml-5">address</label><br />
                <input type="text" className='p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black lg:ml-5' value={address} onChange={e => setAddress(e.target.value)} />
              </div>
            </div>
            <label htmlFor="" className="my-5">
              Description
            </label>
            <textarea
              type="text"
              className="p-2 mb-3  border rounded-lg w-[95%]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            {categories && (
              <div>
                <label htmlFor="">Category</label><br />
                <select placeholder='select category' className='p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black ' onChange={e => setCategory(e.target.value)}>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <button onClick={handleSubmit} className=' bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full section-title cursor-pointer'>submit</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
