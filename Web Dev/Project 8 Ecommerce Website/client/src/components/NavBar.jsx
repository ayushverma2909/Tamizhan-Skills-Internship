import React, { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import SearchBox from "./SearhBox";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const updateCounts = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const cart = JSON.parse(localStorage.getItem("addtocart")) || [];
      setWishlistCount(wishlist.length);
      setCartCount(cart.length);
    };

    updateCounts();

    window.addEventListener("wishlist-updated", updateCounts);
    window.addEventListener("cart-updated", updateCounts);

    return () => {
      window.removeEventListener("wishlist-updated", updateCounts);
      window.removeEventListener("cart-updated", updateCounts);
    };
  }, []);

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-[60px] items-center">
          <div className="flex-1/6 text-2xl font-bold text-start md:text-center">
            <Link to="/">Brand</Link>
          </div>

          <div className="justify-between flex-5/6 items-center hidden md:flex">
            <ul className="flex gap-8 text-[15px] text-gray-600 font-medium">
              <li className="hover:text-black cursor-pointer">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-black cursor-pointer">Shop</li>
              <li className="hover:text-black cursor-pointer">About</li>
              <li className="hover:text-black cursor-pointer">Blog</li>
              <li className="hover:text-black cursor-pointer"><a href="#contact">Contact</a></li>
            </ul>

            <ul className="flex gap-6 items-center text-xl">

              {/* <li className="flex items-center text-sm cursor-pointer ">
                <span className="pr-1 text-[18px]">
                  <BsPerson />
                </span>
                Login / Register
              </li> */}

              <li className="cursor-pointer relative flex items-center">
                {showSearch ? (
                  <SearchBox onClose={() => setShowSearch(false)} />
                ) : (
                  <IoSearchOutline
                    onClick={() => setShowSearch(true)}
                    className="hover:text-blue-700 transition-colors"
                  />
                )}
              </li>

              <li className="cursor-pointer relative">
                <Link to="/addtocart">
                  <FaShoppingCart className="text-gray-600 hover:text-gray-500 hover:scale-110 transition-transform duration-300" />
                  {cartCount > 0 && (
                    <span className="absolute top-[-10px] right-[-10px] w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-[12px]">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>

              <li className="cursor-pointer relative">
                <Link to="/wishlist">
                  <FaHeart className="text-2xl mr-1 text-red-500 hover:scale-110 transition-transform duration-300" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-[-10px] right-[-5px] w-5 h-5 flex items-center justify-center rounded-full bg-red-700 text-white text-[12px]">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </li>

            </ul>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl text-gray-700 focus:outline-none"
            >
              {isOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE VIEW */}

      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md px-6 pb-4">
          <ul className="space-y-4 text-gray-700 mt-4">
            <li className="hover:text-black cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-black cursor-pointer">Shop</li>
            <li className="hover:text-black cursor-pointer">About</li>
            <li className="hover:text-black cursor-pointer">Blog</li>
            <li className="hover:text-black cursor-pointer">Contact</li>
          </ul>
          <hr className="my-4" />
          <ul className="flex gap-6 text-xl">

            {/* <li className="flex items-center text-sm cursor-pointer hover:text-blue-700">
              <span className="pr-1 text-[18px]">
                <BsPerson />
              </span>
              Login / Register
            </li> */}

            <li className="cursor-pointer relative flex items-center">
              {showSearch ? (
                <SearchBox onClose={() => setShowSearch(false)} />
              ) : (
                <IoSearchOutline
                  onClick={() => setShowSearch(true)}
                  className="hover:text-blue-700 transition-colors"
                />
              )}
            </li>

            <li className="cursor-pointer relative">
              <Link to="/addtocart">
                <FaShoppingCart className="text-gray-600 hover:text-gray-500 hover:scale-110 transition-transform duration-300" />
                {cartCount > 0 && (
                  <span className="absolute top-[-10px] right-[-10px] w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-[12px]">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>

            <li className="relative">
              <Link to="/wishlist">
                <FaHeart className="text-red-500 hover:scale-110 transition-transform duration-300" />
                {wishlistCount > 0 && (
                  <span className="absolute top-[-10px] right-[-5px] w-5 h-5 flex items-center justify-center rounded-full bg-red-700 text-white text-[12px]">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </li>

          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
