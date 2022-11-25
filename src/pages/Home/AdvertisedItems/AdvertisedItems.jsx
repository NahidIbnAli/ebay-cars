import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../../components/Loading";
import AdvertisedItem from "./AdvertisedItem";

const AdvertisedItems = () => {
  const { data: advertisedItems = [], isLoading } = useQuery({
    queryKey: ["advertisedItmes"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/advertisedItems`);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="py-10 px-7">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6">Used Cars</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {advertisedItems.map((advertisedItem) => (
            <AdvertisedItem
              key={advertisedItem._id}
              advertisedItem={advertisedItem}
            ></AdvertisedItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvertisedItems;
