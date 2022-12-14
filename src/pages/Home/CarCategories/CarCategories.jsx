import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../../components/Loading";
import CarCategory from "./CarCategory";

const CarCategories = () => {
  const { data: carCategories = [], isLoading } = useQuery({
    queryKey: ["carCategories"],
    queryFn: async () => {
      const res = await fetch(
        `https://ebay-cars-server.vercel.app/carCategories`
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="pt-10 px-7">
      <div className="container max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">Categories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {carCategories.map((carCategory) => (
            <CarCategory
              key={carCategory._id}
              carCategory={carCategory}
            ></CarCategory>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarCategories;
