import { Link } from "react-router-dom";
import moment from "moment";
import { useAllPropertiesQuery } from '../../redux/api/propertyApiSlics';
import { useSelector } from 'react-redux';
import Navigation from "./Navigation";

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
  const userProperties = properties.filter(property => property.owner === userInfo.email || property.owner === userInfo._id);

  return (
    <>
    <Navigation/>
    <p className="section-title text-2xl">All Your Properties</p>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {userProperties.map((property) => (
            <Link
              key={property._id}
              to={`/property/update/${property._id}`}
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
            >
              <img
                src={property.image.url}
                alt={property.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h5 className="text-lg font-semibold mb-2">{property.name}</h5>
                <p className="text-sm text-gray-600 mb-4">{moment(property.createdAt).format("MMMM Do YYYY")}</p>
                <p className="text-sm text-gray-700 mb-4">{property.description.substring(0, 160)}...</p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/property/update/${property._id}`}
                    className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-md transition duration-300"
                  >
                    Update Property
                  </Link>
                  <p className="text-lg font-semibold text-gray-800">$ {property.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllUserProperties;
