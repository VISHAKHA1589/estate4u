import React, { useState } from 'react';

const SearchBar = ({ properties, setFilteredProperties }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    setSearchQuery(e.target.value);
    const filtered = properties.filter(property =>
      property.address.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProperties(filtered);
  };

  return (
    <div className="my-10 w-full">
      <div className="flex flex-col">
        <div className="rounded-xl bg-white p-6 grid">
          <form className="grid grid-cols-6 gap-6">
            {/* Search Bar */}
            <div className='col-span-3'>
              <div className="col-span-3 md:col-span-1 relative">
                <label htmlFor="location" className="text-sm font-medium text-stone-600">
                  Location
                </label>
                <svg
                  className="absolute left-2 mt-6 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  name="search"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pl-10 pr-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Search by location"
                />
              </div>
            </div>

            {/* Manufacturer Dropdown/ Date of Entry */}
            <div className='col-span-2 grid grid-cols-2 gap-2'>
                <div className="col-span-3 md:col-span-1 flex flex-col">
                  <label htmlFor="manufacturer" className="text-sm font-medium text-stone-600">
                    Manufacturer
                  </label>
                  <select
                    id="manufacturer"
                    className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option>Cadberry</option>
                    <option>Starbucks</option>
                    <option>Hilti</option>
                  </select>
                </div>

                <div className="col-span-3 md:col-span-1 flex flex-col">
                  <label htmlFor="date" className="text-sm font-medium text-stone-600">
                    Date of Entry
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
            </div>
            
            {/* Buttons */}
            <div className='col-span-1 flex gap-2 items-end'> 
                <button 
                  className="h-3/5 rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-700 outline-none hover:opacity-80 focus:ring"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent form submission
                    const filtered = properties.filter(property =>
                      property.address.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    setFilteredProperties(filtered);
                  }}
                >
                  Reset
                </button>
                <button 
                  className="h-3/5 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none hover:opacity-80 focus:ring"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent form submission
                    const filtered = properties.filter(property =>
                      property.address.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    setFilteredProperties(filtered);
                  }}
                >
                  Search
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
