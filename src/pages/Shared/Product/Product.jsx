import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { GoVerified } from "react-icons/go";
import { IoLocationSharp } from "react-icons/io5";

const Product = ({ product, setProduct }) => {
  const [isVerified, setIsVerified] = useState(false);
  const {
    name,
    image,
    resalePrice,
    originalPrice,
    location,
    date,
    yearsOfUse,
    sellerName,
    email,
  } = product;

  useEffect(() => {
    fetch(`https://ebay-cars-server.vercel.app/users/verify/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setIsVerified(data.isVerified);
      })
      .catch((error) => console.error(error));
  }, [email]);

  return (
    <div className="card bg-base-100 border">
      <figure style={{ height: "290px" }}>
        <img src={image} alt="" />
      </figure>
      <div className="p-6">
        <h2 className="text-xl font-medium mb-1">{name}</h2>
        <p className="text-gray-600 mb-1">
          Original Price:{" "}
          <span className="text-primary font-medium">${originalPrice}</span>
        </p>
        <p className="text-gray-600 mb-1">
          Used: {yearsOfUse} {parseInt(yearsOfUse) > 1 ? "years" : "year"}
        </p>
        <p className="text-gray-600 mb-1 flex items-center gap-1">
          <IoLocationSharp></IoLocationSharp> <span>{location}</span>
        </p>
        <div className="card-actions justify-between items-center mb-2">
          <p className="text-2xl text-primary font-bold">${resalePrice}</p>
          <label
            onClick={() => setProduct(product)}
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
            {isVerified && <GoVerified className="text-info"></GoVerified>}
          </p>
          <p>{date}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
