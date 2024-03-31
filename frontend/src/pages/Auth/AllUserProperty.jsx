import { Link } from "react-router-dom";
import moment from "moment";
import { useAllPropertiesQuery } from '../../redux/api/propertyApiSlics';

import { useSelector } from 'react-redux';

const AllUserProperties = () => {
  const { data: properties, isLoading, isError } = useAllPropertiesQuery();
  const { userInfo } = useSelector((state) => state.auth);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading properties</div>;
  }

  // Filter properties created by the logged-in user
  const userProperties = properties.filter(property => property.owner === userInfo._id);

  return (
    <>
      <div className="container mx-[9rem]">
        <div className="flex flex-col  md:flex-row">
          <div className="p-3">
            <div className="ml-[2rem] text-xl font-bold h-12">
              All Properties ({userProperties.length})
            </div>
            <div className="flex flex-wrap justify-around items-center">
              {userProperties.map((property) => (
                <Link
                  key={property._id}
                  to={`/admin/property/update/${property._id}`}
                  className="block mb-4 overflow-hidden"
                >
                  <div className="flex">
                    <img
                      src={property.image.url}
                      alt={property.name}
                      className="w-[10rem] h-[10rem]  object-cover"
                    />
                    <div className="p-4 flex flex-col justify-around">
                      <div className="flex justify-between">
                        <h5 className="text-xl font-semibold mb-2">
                          {property?.name}
                        </h5>

                        <p className="text-gray-400 text-xs">
                          {moment(property.createdAt).format("MMMM Do YYYY")}
                        </p>
                      </div>

                      <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                        {property?.description?.substring(0, 160)}...
                      </p>

                      <div className="flex justify-between">
                        <Link
                          to={`/property/update/${property._id}`}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                        >
                          Update property
                          <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>
                        <p>$ {property?.price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="md:w-1/4 p-3 mt-2">
    
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUserProperties;
