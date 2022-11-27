import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import SmallSpinner from "../../../components/SmallSpinner";
import { RiDeleteBin6Line } from "react-icons/ri";
import swal from "sweetalert";

const AllUsers = () => {
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users", {
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

  const handleMakeAdmin = (id, name) => {
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
      <h2 className="text-3xl font-bold mb-6">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="text-base normal-case">Name</th>
              <th className="text-base normal-case">Email</th>
              <th className="text-base normal-case">Status</th>
              <th className="text-base normal-case">Admin</th>
              <th className="text-base normal-case">Manage User</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="font-medium">
                <th className="text-gray-400">{++index}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <div
                    className={`badge ${
                      user.role === "Buyer"
                        ? "badge-warning"
                        : user.role === "Seller"
                        ? "badge-success"
                        : "badge-neutral"
                    } text-white`}
                  >
                    {user.role}
                  </div>
                </td>
                <td>
                  {user?.role !== "Admin" && (
                    <button
                      onClick={() => handleMakeAdmin(user._id, user.name)}
                      className="btn btn-sm btn-secondary text-white normal-case"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleRemoveUser(user._id, user.name)}
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

export default AllUsers;
