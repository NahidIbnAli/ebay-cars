import React from "react";
import AdvertisedItems from "../AdvertisedItems/AdvertisedItems";
import CarCategories from "../CarCategories/CarCategories";
import Hero from "../Hero/Hero";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <AdvertisedItems></AdvertisedItems>
      <CarCategories></CarCategories>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
