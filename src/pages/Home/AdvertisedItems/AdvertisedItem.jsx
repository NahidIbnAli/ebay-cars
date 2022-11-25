import React from "react";

const AdvertisedItem = ({ advertisedItem }) => {
  const {
    name,
    image,
    resalePrice,
    originalPrice,
    location,
    time,
    used,
    sellerName,
  } = advertisedItem;
  return (
    <div className="card bg-base-100 border">
      <figure>
        <img src={image} alt="" />
      </figure>
      <div className="p-6">
        <h2 className="text-xl font-medium mb-1">{name}</h2>
        <p className="text-gray-600">Original Price : ${originalPrice}</p>
        <p className="text-gray-600">Used : {used}</p>
        <p className="text-gray-600">Seller : {sellerName}</p>
        <div className="card-actions justify-between items-center mb-2">
          <p className="font-bold text-xl">Price : ${resalePrice}</p>
          <button className="btn btn-primary text-white xl:px-10">
            Buy Now
          </button>
        </div>
        <hr className="mt-5 mb-3" />
        <div className="flex justify-between text-gray-600">
          <p>Location : {location}</p>
          <p>{time}</p>
        </div>
      </div>
    </div>
  );
};

export default AdvertisedItem;
