import React from "react";

const Testimonial = ({ testimonial }) => {
  const { name, avatar, location, review } = testimonial;
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body text-center gap-1">
        <div className="avatar justify-center">
          <div className="w-20 mask mask-squircle">
            <img src={avatar} alt="" />
          </div>
        </div>
        <h2 className="text-xl font-medium">{name}</h2>
        <small className="text-gray-600">{location}</small>
        <p className="text-gray-600">{review}</p>
      </div>
    </div>
  );
};

export default Testimonial;
