import React from "react";
import { Link, useLocation } from "react-router-dom";

const CardPopular = ({ service }) => {
  const {
    _id,
    image,
    serviceName,
    description,
    serviceProviderImage,
    serviceProviderName,
  } = service;

  const location = useLocation()
  return (
    <div className="card card-side bg-base-100 shadow-xl  flex-col lg:flex-row">
 
    <img
    className="w-[250px] p-5 rounded-3xl"
      src={image}
      alt="image" />
  
  <div className="card-body">
    <h2 className="card-title">{serviceName}</h2>
    <p className="text-left text-gray-500 h-[100px]">
          {description.length > 100
            ? `${description.slice(0, 100)}...`
            : description}
        </p>
    <div className="flex  items-center gap-2">
        <img className="w-16 rounded-3xl" src={`${serviceProviderImage}`} alt="providerImage" />
        <div className="flex flex-col text-sm text-gray-500">
        <p className="font-bold">{serviceProviderName}</p>
        <p className={location.pathname === "/" ? "hidden" : "block"}>{service.serviceArea}</p>
        </div>

    </div>
    <hr />
    
    <div className="card-actions flex justify-between items-center">
    <div>
      <p className=" font-medium text-blue-700">Price: {service.price} BDT</p>
    </div>
      <Link to={`/services/${_id}`}><button className="btn btn-primary">See More</button></Link>
    </div>
  </div>
</div>
  );
};

export default CardPopular;
