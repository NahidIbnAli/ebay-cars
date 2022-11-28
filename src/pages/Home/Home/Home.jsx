import React from "react";
import CarCategories from "../CarCategories/CarCategories";
import Hero from "../Hero/Hero";
import Products from "../Products/Products";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <Products></Products>
      <CarCategories></CarCategories>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
