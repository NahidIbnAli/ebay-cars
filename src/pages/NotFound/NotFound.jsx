import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/404 Error.png";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl sm:text-4xl text-center font-medium pt-7">
        This route not found
      </h2>
      <img src={image} className="w-3/4 md:w-2/3 lg:w-3/6 xl:w-5/12" alt="" />
      <Link to="/">
        <button className="btn btn-secondary text-white">Go Back</button>
      </Link>
    </div>
  );
};

export default NotFound;
