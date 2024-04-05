import { useGetNewPropertiesQuery } from "../../redux/api/propertyApiSlics";
import { IoIosArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";

export const RentSmall = () => {
  const { data, isLoading, error } = useGetNewPropertiesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Filter properties by category "rent"
  const rentProperties = data.filter(property => property.category === '6603e6c8efb63894b3663278');

  return (
   <div className="bg-white">
  <div className="mx-12 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900 section-title">
      <span className="inline-block">Properties for Rent</span> {/* Wrapper for text */}
      <span className="inline-block ml-2"> {/* Margin added between text and icon */}
        <button className="h-full w-full object-cover object-center lg:h-full lg:w-full">
          <Link to= '/forRent'>
          <IoIosArrowDropright /></Link>
        </button>
      </span>
    </h2>



        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-8">
          {rentProperties.slice(0, 5).map((property) => (
            <div key={property.id} className="group relative border border-gray-200 p-2 rounded-lg">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-80">
              {property.image1 && property.image1.url && ( 
                  <img
                    src={property.image1.url}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    alt={property.name}
                  />)}
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                  <Link to={`/property/${property._id}`}> {/* Use Link with proper 'to' attribute */}
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

export default RentSmall;
