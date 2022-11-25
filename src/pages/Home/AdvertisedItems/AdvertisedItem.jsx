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
      <div className="card-body gap-1 p-6">
        <div className="flex justify-between items-center">
          <h2 className="card-title">{name}</h2>
          <small>{time}</small>
        </div>
        <p className="text-gray-500">Original Price: ${originalPrice}</p>
        <p className="text-gray-500">Used : {used}</p>
        <p className="text-gray-500">Seller : {sellerName}</p>
        <div className="card-actions justify-center items-center mb-2">
          <p className="font-bold text-xl">Price : ${resalePrice}</p>
          <button className="btn btn-primary text-white px-10">Buy Now</button>
        </div>
        <hr />
        <div className="flex justify-between">
          <small className="text-gray-500">Location : {location}</small>
        </div>
      </div>
    </div>
  );
};

export default AdvertisedItem;
