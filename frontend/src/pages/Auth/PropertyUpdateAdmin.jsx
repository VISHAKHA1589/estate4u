import React, { useEffect } from 'react'
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useUpdatePropertyMutation, useDeletePropertyMutation, useGetPropertyByIdQuery, useUploadPropertyImageMutation} from '../../redux/api/propertyApiSlics';

import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice';
import {toast} from 'react-toastify'

import AdminMenu from '../Admin/AdminMenu';

const PropertyUpdate = () => {
  const params= useParams()
  const {data: propertyData}= useGetPropertyByIdQuery(params._id)
  const [image,setImage]= useState(propertyData?.image || "")
  const [name, setName]= useState(propertyData?.name || "")
  const [description, setDescription]= useState(propertyData?.description || "")
  const [price, setPrice]= useState(propertyData?.price || "")
  const [address, setAddress]= useState(propertyData?.address || "")
  const [category, setCategory]= useState(propertyData?.category || "")
  const [phoneNumber, setPhoneNumber]= useState(propertyData?.phoneNumber || "")



  const navigate=useNavigate()

  const {data: categories=[]}= useFetchCategoriesQuery()
  const [updateProperty]= useUpdatePropertyMutation()
  const [deleteProperty]= useDeletePropertyMutation()



  useEffect(()=>{
    if(propertyData && propertyData._id){
      setName(propertyData.name)
      setDescription(propertyData.description)
      setAddress(propertyData.address)
    
      setPrice(propertyData.price)
      setPhoneNumber(propertyData.phoneNumber)
      setCategory(propertyData.category)
      setImage(propertyData.image)
    }

  }, [propertyData]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("address", address);
      formData.append("phoneNumber", phoneNumber);
      const data = await updateProperty({ propertyId: params._id, formData });

      if (data?.error) {
        toast.error(data.error, {
         
          autoClose: 2000,
        });
      } else {
        toast.success(`property successfully updated`, {
      
          autoClose: 2000,
        });
        navigate("/admin/allpropertieslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("property update failed. Try again.", {
      
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this property?"
      );
      if (!answer) return;

      const { data } = await deleteProperty(params._id);
      toast.success(`"${data.name}" is deleted`, {
    
        autoClose: 2000,
      });
      navigate("/admin/allpropertieslist");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };


  return (
    <>
    <div className="container  xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Update / Delete Property</div>

         {image && (
            <div className="text-center">
              <img
                src={image}
                alt="property"
                className="block mx-auto w-full h-[40%]"
              />
            </div>
          )}

        

          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="two">
                <label htmlFor="name block">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              <div>
                <label htmlFor="name block">phone number</label> <br />
                <input
                  type="number"
                  min="1"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="name block">Brand</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="" className="my-5">
              Description
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 bg-[#101011]  border rounded-lg w-[95%] text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            

              <div>
                <label htmlFor="">Category</label> <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="">
              <button
                onClick={handleSubmit}
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-green-600 mr-6"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-pink-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
 
  </>
  )
}

export default PropertyUpdate;