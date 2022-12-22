import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="hero "
      style={{ backgroundImage: `url("heroImage.jpg")`, minHeight: "500px" }}
    >
      <div className="hero-overlay bg-opacity-80"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="hero-text text-white">
          <h1 className="mb-2 text-5xl font-bold leading-tight">
            Find the Car You Want, Your Way
          </h1>
          <p className="mb-8 text-xl">
            Then, build your deal to fit your needs.
          </p>
          <Link to="/cars">
            <button className="btn btn-primary text-white">Shop Used</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
