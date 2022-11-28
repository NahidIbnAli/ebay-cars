import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Product from "../../Home/Products/Product";
import BookingModal from "../BookingModal/BookingModal";

const AllProducts = () => {
  const allProducts = useLoaderData();
  const [product, setProduct] = useState(null);

  const activeItem = allProducts.find(
    (product) =>
      product.category === "Electric" ||
      product.category === "Luxury" ||
      product.category === "Adventure"
  );

  return (
    allProducts.length > 0 && (
      <div className="py-10 px-7">
        <div className="container max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            {activeItem?.category} Cars
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {allProducts.map((product) => (
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
            ></BookingModal>
          )}
        </div>
      </div>
    )
  );
};

export default AllProducts;
