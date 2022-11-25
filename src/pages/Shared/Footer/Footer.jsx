import React from "react";
import { Link } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import logo from "../../../assets/logo.png";

const Footer = () => {
  return (
    <div>
      <footer className="footer container mx-auto justify-between py-10 px-6 text-neutral">
        <div>
          <Link className="link link-hover">
            <img className="w-20" src={logo} alt="" />
          </Link>
          <p className="">
            eBay Cars is is the most <br></br> trusted way of buying
            <br></br> and selling used cars.
          </p>
        </div>
        <div>
          <span className="footer-title">Quick Links</span>
          <Link className="link link-hover">Home</Link>
          <Link className="link link-hover">Blog</Link>
          <Link className="link link-hover">Login</Link>
          <Link className="link link-hover">Sign Up</Link>
        </div>
        <div>
          <span className="footer-title">Contact us</span>
          <Link className="link link-hover flex items-center gap-1">
            <FiSend></FiSend> eBay@cars.com{" "}
          </Link>
        </div>
      </footer>
      <p className="text-center text-neutral pb-8">
        Copyright 2022 All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
