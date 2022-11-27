import React from "react";
import { ClipLoader } from "react-spinners";

const SmallSpinner = () => {
  return (
    <div className="flex justify-center pt-28 h-screen">
      <ClipLoader color="#3D4451" size={40} />
    </div>
  );
};

export default SmallSpinner;
