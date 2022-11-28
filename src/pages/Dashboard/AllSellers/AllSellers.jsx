import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { GoVerified } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import swal from "sweetalert";
import SmallSpinner from "../../../components/SmallSpinner";

const AllSellers = () => {
  const {
    data: sellers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users?role=Seller", {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <SmallSpinner></SmallSpinner>;
  }

  const handleMakeAdmin = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to make admin this user?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:5000/users/admin/${id}`, {
          method: "PUT",
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              return toast.error("You don't have admin role");
            }
            swal("Make admin successful", {
              icon: "success",
            });
            refetch();
          });
      }
    });
  };

  // verify user handler
  const handleVerifyUser = (id, name) => {
    fetch(`http://localhost:5000/users/verify/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          return toast.error("You don't have admin role");
        }
        toast.success(`${name} has been verified`);
        refetch();
      });
  };

  // remove user handler
  const handleRemoveUser = (id, name) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this user?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:5000/users/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            swal(`${name} has been Removed!`, {
              icon: "success",
            });
            refetch();
          });
      }
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">All Sellers</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="text-base normal-case">Name</th>
              <th className="text-base normal-case">Email</th>
              <th className="text-base normal-case">Status</th>
              <th className="text-base normal-case">Admin</th>
              <th className="text-base normal-case">Verify</th>
              <th className="text-base normal-case">Action</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, index) => (
              <tr key={seller._id} className="font-medium">
                <th className="text-gray-400">{++index}</th>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td>
                  <div className={`badge badge-success text-white`}>
                    {seller.role}
                  </div>
                </td>
                <td>
                  {seller?.role !== "Admin" && (
                    <button
                      onClick={() => handleMakeAdmin(seller._id)}
                      className="btn btn-sm btn-secondary text-white normal-case"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  {seller?.verified ? (
                    <div className="badge badge-lg">
                      <span className="mr-1">Verified</span>{" "}
                      <GoVerified></GoVerified>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleVerifyUser(seller._id, seller.name)}
                      className="btn btn-sm btn-info text-white normal-case"
                    >
                      Verify Now
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleRemoveUser(seller._id, seller.name)}
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

export default AllSellers;
