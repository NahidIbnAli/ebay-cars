import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

const PaymentModal = ({ booking, refetch }) => {
  const { buyer, name, price } = booking;
  return (
    <div>
      <input type="checkbox" id="paymantModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="paymantModal"
            className="btn btn-sm btn-circle btn-primary text-white absolute right-2 top-2"
          >
            ✕
          </label>
          <h4 className="font-bold text-lg text-primary mb-1">
            Hello, {buyer}
          </h4>
          <h3 className="font-bold text-xl">Please Pay for {name}</h3>
          <h3 className="font-bold text-xl">
            Please Pay: <span className="text-primary">${price}</span>
          </h3>
          <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm booking={booking} refetch={refetch}></CheckoutForm>
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
