import React, { useState } from 'react';
import { useGetNewPropertiesQuery } from "../../redux/api/propertyApiSlics";
import Navigation from "../Auth/Navigation";
import { Link } from "react-router-dom";

export const RentPage = () => {
  const { data, isLoading, error } = useGetNewPropertiesQuery();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const sellProperties = data.filter(property => property.category === '6603e6c8efb63894b3663278');

  let filteredProperties = sellProperties.filter(property => {
    const matchesSearchQuery = property.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !category || property.name.toLowerCase().includes(category.toLowerCase());
    let matchesPriceRange = true;
    if (priceRange === '0-50lakh') {
      matchesPriceRange = property.price <= 5000000;
    } else if (priceRange === '50lakh-1cr') {
      matchesPriceRange = property.price > 5000000 && property.price <= 10000000;
    } else if (priceRange === '1cr-more') {
      matchesPriceRange = property.price > 10000000;
    }
    return matchesSearchQuery && matchesCategory && matchesPriceRange;
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
  };

  const handleReset = () => {
    setSearchQuery('');
    setCategory('');
    setPriceRange('');
  };

  return (
    <div className="bg-white">
      <Navigation />
      <div className="flex justify-center">
        <h2 className="text-3xl tracking-tight text-gray-500 font-semibold">PROPERTIES FOR RENT</h2>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-10 w-full">
          <div className="rounded-xl bg-white p-6 grid">
            <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="location" className="text-sm font-medium text-stone-600 block">Location</label>
                <input
                  type="text"
                  name="search"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-2 px-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Search by location"
                />
              </div>
              <div>
                <label htmlFor="category" className="text-sm font-medium text-stone-600 block">Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={handleCategoryChange}
                  className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-4 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="">All</option>
                  <option value="1bhk">1 BHK</option>
                  <option value="2bhk">2 BHK</option>
                  <option value="3bhk">3 BHK</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div>
                <label htmlFor="priceRange" className="text-sm font-medium text-stone-600 block">Price Range</label>
                <select
                  id="priceRange"
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-4 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="">All</option>
                  <option value="0-50lakh">0 - 50 Lakh</option>
                  <option value="50lakh-1cr">50 Lakh - 1 Crore</option>
                  <option value="1cr-more">1 Crore and more</option>
                </select>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="group relative border border-gray-200 p-2 rounded-lg">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-80">
                <img
                  src={property.image.url}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  alt={property.name}
                />
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/property/${property._id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {property.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{property.address}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">₹{property.price} / month</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentPage;
