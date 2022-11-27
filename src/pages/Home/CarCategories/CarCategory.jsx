import React from "react";
import { Link } from "react-router-dom";

const CarCategory = ({ carCategory }) => {
  const { name, image } = carCategory;
  return (
    <Link to={`/category/${name}`}>
      <div className="card bg-base-100 shadow-xl image-full h-52">
        <figure>
          <img src={image} alt="Shoes" className="w-full" />
        </figure>
        <div className="card-body justify-center items-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">{name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default CarCategory;
