import React, { useContext } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { GoListUnordered } from "react-icons/go";
import { AiFillFileAdd } from "react-icons/ai";
import { FaUserShield, FaUsers } from "react-icons/fa";
import { IoMdCube } from "react-icons/io";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useBuyer from "../hooks/useBuyer";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isBuyer] = useBuyer(user?.email);

  return (
    <div>
      {/* navbar */}
      <div className="navbar bg-base-100 ">
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
          <label htmlFor="dashboardDrawer" className="btn btn-ghost lg:hidden">
            <MdSpaceDashboard className="text-2xl text-neutral"></MdSpaceDashboard>
          </label>
          <ul className="menu menu-horizontal p-0 hidden lg:flex items-center">
            <li>
              <Link to="/" className="font-medium">
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* dashboard main */}
      <div className="drawer drawer-mobile">
        <input id="dashboardDrawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-slate-100 p-7 lg:p-12">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboardDrawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 lg:bg-transparent text-base-content font-semibold">
            {isAdmin ? (
              <>
                <li>
                  <Link to="/dashboard/allbuyers">
                    <p className="flex items-center gap-1">
                      <FaUsers></FaUsers>
                      <span>All Buyers</span>
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/allsellers">
                    <p className="flex items-center gap-1">
                      <FaUserShield></FaUserShield>
                      <span>All Sellers</span>
                    </p>
                  </Link>
                </li>
              </>
            ) : isBuyer ? (
              <li>
                <Link to="/dashboard">
                  <p className="flex items-center gap-1">
                    <GoListUnordered></GoListUnordered>
                    <span>My Orders</span>
                  </p>
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/dashboard/myproducts">
                    <p className="flex items-center gap-2">
                      <IoMdCube></IoMdCube>
                      <span>My Products</span>
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/addproduct">
                    <p className="flex items-center gap-1">
                      <AiFillFileAdd></AiFillFileAdd>
                      <span>Add Product</span>
                    </p>
                  </Link>
                </li>
              </>
            )}
            <Link to="/" className="mx-auto mt-14 lg:hidden">
              <button className="btn btn-sm btn-primary text-white normal-case">
                Back to Home
              </button>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
