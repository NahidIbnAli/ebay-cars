import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AdvertisedItem from "../../Home/AdvertisedItems/AdvertisedItem";
import BookingModal from "../BookingModal/BookingModal";

const AllAdvertisedItems = () => {
  const allAdvertisedItems = useLoaderData();
  const [advertisedItem, setAdvertisedItem] = useState(null);

  const activeItem = allAdvertisedItems.find(
    (advertisedItem) =>
      advertisedItem.category === "Electric" ||
      advertisedItem.category === "Luxury" ||
      advertisedItem.category === "Adventure"
  );

  return (
    <div className="py-10 px-7">
      <div className="container max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">{activeItem?.category} Cars</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {allAdvertisedItems.map((advertisedItem) => (
            <AdvertisedItem
              key={advertisedItem._id}
              setAdvertisedItem={setAdvertisedItem}
              advertisedItem={advertisedItem}
            ></AdvertisedItem>
          ))}
        </div>
        {advertisedItem && (
          <BookingModal
            advertisedItem={advertisedItem}
            setAdvertisedItem={setAdvertisedItem}
          ></BookingModal>
        )}
      </div>
    </div>
  );
};

export default AllAdvertisedItems;
