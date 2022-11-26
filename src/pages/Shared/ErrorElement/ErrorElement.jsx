import React, { useContext } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const ErrorElement = () => {
  const { logOut } = useContext(AuthContext);
  const error = useRouteError();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="text-center pt-10">
      <p className="text-3xl ">Something went wrong</p>
      <p className="text-red-500 py-2">{error.statusText || error.message}</p>
      <p>
        Please{" "}
        <button onClick={handleSignOut} className="btn btn-sm btn-secondary">
          Sign Out
        </button>{" "}
        and log back in
      </p>
    </div>
  );
};

export default ErrorElement;
