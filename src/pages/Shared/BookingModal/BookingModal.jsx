import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const BookingModal = ({ product, setProduct, refetch }) => {
  const { user } = useContext(AuthContext);
  const { _id, name, resalePrice, image } = product;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const buyer = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const location = form.location.value;
    const booking = {
      name,
      image,
      price: resalePrice,
      buyer,
      email,
      phone,
      location,
      productId: _id,
    };
    fetch("https://ebay-cars-server.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setProduct(null);
          toast.success("Booking has been confirmed");
          refetch();
        } else {
          toast.error(data.message);
          setProduct(null);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle btn-primary text-white absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-semibold">{name}</h3>
          {user?.uid && (
            <h2 className="text-xl text-primary font-bold">${resalePrice}</h2>
          )}
          {user?.uid ? (
            <form onSubmit={handleSubmit} className="mt-5 grid gap-6">
              <input
                name="name"
                type="text"
                defaultValue={user?.displayName}
                className="input input-bordered w-full"
                placeholder="Full Name"
                required
                readOnly
              />
              <input
                name="email"
                type="email"
                defaultValue={user?.email}
                className="input input-bordered w-full"
                placeholder="Email"
                required
                readOnly
              />
              <input
                name="phone"
                type="text"
                className="input input-bordered w-full"
                placeholder="Phone Number"
                required
              />
              <input
                name="location"
                type="text"
                className="input input-bordered w-full"
                placeholder="Meeting Location"
                required
              />
              <button type="submit" className="btn btn-primary text-white">
                Submit
              </button>
            </form>
          ) : (
            <p className="text-center py-5">
              Welcome! Please{" "}
              <Link to="/login" className="font-semibold text-primary">
                Login
              </Link>{" "}
              to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
