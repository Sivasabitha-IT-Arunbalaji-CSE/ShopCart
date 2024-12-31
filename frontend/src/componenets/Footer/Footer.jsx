import React from "react";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img className="mb-5 w-32" src={assets.logo} alt="logo" />
          <p className="w-full md:w-2/3 text-gray-600">
          Shopcart – Your one-stop destination for all your shopping needs.
          Explore top-quality products, amazing deals, and trusted brands, all at your fingertips.
          Stay connected with us for updates, offers, and more!
          © 2024 Shopcart. All rights reserved. | Privacy Policy | Terms & Conditions
          </p>
        </div>
        <div>
            <p className="text-xl font-medium mb-5 ">COMPANY</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>9043731376 </li>
                <li>arunbalaji200300u@gmail.com</li>
                <li>sivasabithak15@gmail.com</li>
            </ul>
          </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2024 @ ShopCart - All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
