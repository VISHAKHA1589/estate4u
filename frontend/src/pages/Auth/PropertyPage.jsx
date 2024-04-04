import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetPropertyDetailsQuery } from '../../redux/api/propertyApiSlics';
import { useNavigate, useParams } from 'react-router';
import { FaLocationArrow } from 'react-icons/fa';
import Navigation from './Navigation';
import './PropertyPage.css';
import EmailForm from './Emailform';

const PropertyPage = () => {
  const { id: propertyId } = useParams();
  const [showCard, setShowCard] = useState(false);
  const navigate = useNavigate();
  const { data: property, isLoading, isError } = useGetPropertyDetailsQuery(propertyId);
  const cardRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setShowCard(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Redirect to login if userInfo is not available
  const { userInfo } = useSelector(state => state.auth);
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  if (!property) {
    return <div>No data found for the provided ID</div>;
  }

  const handleButtonClick = () => {
    setShowCard(!showCard);
  };

  return (
    <div className={`${showCard ? 'blurred' : ''}`}>
      <Navigation className="nav" />
      <section class="py-12 sm:py-16">
        <div class="container mx-auto px-4">
          <div class="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16 ">
            <div class="lg:col-span-3 lg:row-end-1">
              <div class="lg:flex lg:items-start">
                <div class="lg:order-2 lg:ml-5">
                  <div class="max-w-xl overflow-hidden rounded-lg lg:ml-10 ">
                    <img class=" w-full max-w-full object-cover " src={property.image.url} alt="" />
                  </div>
                </div>
              </div>
            </div>

            <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2 lg:mt-10">
              <h1 class="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{property.name}</h1>

              <div class="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                <div class="flex items-end">
                  <h1 class="text-3xl font-bold">₹{property.price}</h1>
                  <span class="text-base">{property.category === "6603e6c8efb63894b3663278" ? '/month' : ""}</span>
                </div>

                <button type="button" class="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800" onClick={handleButtonClick}>
                  &nbsp;&nbsp;Get Owner Details
                </button>

                {showCard && (
                  <div className="card-overlay">
                    <div ref={cardRef} className="card">
                      <div>
                        <EmailForm />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <ul class="mt-8 space-y-2">
                <li class="flex items-center text-left text-sm font-medium text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  &nbsp;&nbsp;{property.address}
                </li>
                <li class="flex items-center text-left text-sm font-medium text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  &nbsp;&nbsp;Verified Owner
                </li>
              </ul>
              <div class="lg:col-span-3">
                <div class="border-b border-gray-300">
                  <nav class="flex gap-4">
                    <a href="#" title="" class="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"> Description </a>
                  </nav>
                </div>

                <div class="mt-8 flow-root sm:mt-12">
                  <h1 class="text-3xl font-bold">DESCRIPTION</h1>
                  <p class="mt-4">{property.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyPage;
