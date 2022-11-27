import React from "react";
import { PuffLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center pt-28 h-screen">
      <PuffLoader color="#f1562b" size={120} />
    </div>
  );
};

export default Loading;
