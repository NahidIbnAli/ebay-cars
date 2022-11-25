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
          <p className="md:w-3/4">
            eBay Cars is the leading search <br></br> car venture in Bangladesh,{" "}
            that <br></br> helps users buy cars that are right for them.
          </p>
        </div>
        <div>
          <span className="footer-title">Quick Links</span>
          <Link className="link link-hover">Home</Link>
          <Link className="link link-hover">Dashboard</Link>
          <Link className="link link-hover">Login</Link>
          <Link className="link link-hover">Sign Up</Link>
        </div>
        <div>
          <span className="footer-title">Resources</span>
          <Link className="link link-hover">Blog</Link>
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
