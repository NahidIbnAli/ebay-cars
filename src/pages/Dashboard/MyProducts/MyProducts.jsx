import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import swal from "sweetalert";
import SmallSpinner from "../../../components/SmallSpinner";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/products?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <SmallSpinner></SmallSpinner>;
  }

  // remove product handler
  const handleRemoveProduct = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this product?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:5000/products/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            swal({
              title: "Successfully Deleted!",
              text: "Your product has been successfully Deleted",
              icon: "success",
            });
            refetch();
          });
      }
    });
  };

  // post advertisement handler
  const handleAdvertise = (id) => {
    fetch(`http://localhost:5000/advertisedItems?id=${id}`, {
      method: "POST",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          return toast.error(data.message);
        }
        toast.success("Advertised product has been successfully added!");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">My Products</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="text-base normal-case">Product</th>
              <th className="text-base normal-case">Product Name</th>
              <th className="text-base normal-case">Status</th>
              <th className="text-base normal-case">Category</th>
              <th className="text-base normal-case">Price</th>
              <th className="text-base normal-case">Advertisement</th>
              <th className="text-base normal-case">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} className="font-medium">
                <th className="text-gray-400">{++index}</th>
                <td>
                  <img className="w-14 rounded-lg" src={product.image} alt="" />
                </td>
                <td>{product.name}</td>
                <td>
                  {product?.paid ? (
                    <div className="badge badge-lg">
                      <sapn className="mr-1">Sold Out</sapn>
                    </div>
                  ) : (
                    <div className="badge badge-success text-white badge-lg">
                      Available
                    </div>
                  )}
                </td>
                <td>{product.category}</td>
                <td>${product.resalePrice}</td>
                <td>
                  <button
                    onClick={() => handleAdvertise(product._id)}
                    className="btn btn-sm btn-primary text-white text-base normal-case mr-3"
                  >
                    Advertise
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleRemoveProduct(product._id)}
                    className="btn btn-sm btn-error text-error bg-transparent hover:text-white normal-case"
                  >
                    <RiDeleteBin6Line></RiDeleteBin6Line>
                    <span className="ml-1">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
