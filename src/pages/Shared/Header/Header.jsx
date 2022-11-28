import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import logo from "../../../assets/logo.png";
import useAdmin from "../../../hooks/useAdmin";
import useSeller from "../../../hooks/useSeller";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);

  const handleSignOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const menuItems = (
    <React.Fragment>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
      {user?.uid ? (
        <>
          <li>
            <Link
              to={
                isAdmin
                  ? "/dashboard/allbuyers"
                  : isSeller
                  ? "/dashboard/addproduct"
                  : "/dashboard"
              }
            >
              Dashboard
            </Link>
          </li>
          {user?.photoURL && (
            <Link className="hidden lg:inline lg:mr-4 lg:ml-1">
              <img src={user?.photoURL} alt="" className="w-10 rounded-full" />
            </Link>
          )}
          <button
            onClick={handleSignOut}
            className="btn btn-primary text-white"
          >
            Sign Out
          </button>
        </>
      ) : (
        <li>
          <Link to="/login" className="bg-primary text-white rounded-lg">
            Login
          </Link>
        </li>
      )}
    </React.Fragment>
  );
  return (
    <div className="container  mx-auto navbar bg-base-100">
      <div className="navbar-start">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl font-bold text-neutral"
        >
          <img className="w-10" src={logo} alt="" />
          <span className="ml-2">eBay Cars</span>
        </Link>
      </div>
      <div className="navbar-end w-4/5">
        <div className="dropdown dropdown-left">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <ul className="menu menu-horizontal p-0 hidden lg:flex items-center">
          {menuItems}
        </ul>
      </div>
    </div>
  );
};

export default Header;
