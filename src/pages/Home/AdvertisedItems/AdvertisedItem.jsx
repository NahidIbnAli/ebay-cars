import React from "react";
import { HiBadgeCheck } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";

const AdvertisedItem = ({ advertisedItem, setAdvertisedItem }) => {
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
        <p className="text-gray-600 mb-1">
          Original Price:{" "}
          <span className="text-primary font-medium">${originalPrice}</span>
        </p>
        <p className="text-gray-600 mb-1">Used: {used}</p>
        <p className="text-gray-600 mb-1 flex items-center gap-1">
          <IoLocationSharp></IoLocationSharp> <span>{location}</span>
        </p>
        <div className="card-actions justify-between items-center mb-2">
          <p className="text-2xl text-primary font-bold">${resalePrice}</p>
          <label
            // disabled={slots.length === 0}
            onClick={() => setAdvertisedItem(advertisedItem)}
            htmlFor="booking-modal"
            className="btn btn-primary text-white xl:px-10"
          >
            Book Now
          </label>
        </div>
        <hr className="mt-5 mb-3" />
        <div className="flex justify-between text-gray-600">
          <p className="text-gray-600 flex items-center gap-1">
            <AiOutlineUser></AiOutlineUser> <span>{sellerName}</span>
            <HiBadgeCheck className="text-info text-lg"></HiBadgeCheck>
          </p>
          <p>{time}</p>
        </div>
      </div>
    </div>
  );
};

export default AdvertisedItem;
