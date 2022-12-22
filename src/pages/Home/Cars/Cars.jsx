import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Loading from "../../../components/Loading";
import BookingModal from "../../Shared/BookingModal/BookingModal";
import Product from "../../Shared/Product/Product";

const Cars = () => {
  const [product, setProduct] = useState(null);
  const {
    data: cars = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const res = await fetch(`https://ebay-cars-server.vercel.app/cars`);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="py-10 px-7">
      <div className="container max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">Cars</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cars.map((product) => (
            <Product
              key={product._id}
              product={product}
              setProduct={setProduct}
            ></Product>
          ))}
        </div>
        {product && (
          <BookingModal
            product={product}
            setProduct={setProduct}
            refetch={refetch}
          ></BookingModal>
        )}
      </div>
    </div>
  );
};

export default Cars;
