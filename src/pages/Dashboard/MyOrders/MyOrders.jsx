import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import SmallSpinner from "../../../components/SmallSpinner";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [booking, setBooking] = useState(null);

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/bookings?email=${user?.email}`,
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

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="text-base normal-case">Name</th>
              <th className="text-base normal-case">Email</th>
              <th className="text-base normal-case">Product</th>
              <th className="text-base normal-case">Price</th>
              <th className="text-base normal-case">Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id} className="font-medium">
                <th className="text-gray-400">{++index}</th>
                <td>{booking.buyer}</td>
                <td>{booking.email}</td>
                <td>{booking.name}</td>
                <td>${booking.price}</td>
                <td>
                  {booking?.paid ? (
                    <div>
                      <p className="text-primary">Paid</p>
                      <p className="text-gray-500">
                        id: {booking?.transactionId}
                      </p>
                    </div>
                  ) : (
                    <label
                      onClick={() => setBooking(booking)}
                      htmlFor="paymantModal"
                      className="btn btn-sm btn-primary text-white px-4"
                    >
                      Pay
                    </label>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
