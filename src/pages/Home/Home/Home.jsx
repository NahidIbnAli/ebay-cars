import React from "react";
import AdvertisedItems from "../AdvertisedItems/AdvertisedItems";
import CarCategories from "../CarCategories/CarCategories";
import Hero from "../Hero/Hero";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <AdvertisedItems></AdvertisedItems>
      <CarCategories></CarCategories>
    </div>
  );
};

export default Home;
