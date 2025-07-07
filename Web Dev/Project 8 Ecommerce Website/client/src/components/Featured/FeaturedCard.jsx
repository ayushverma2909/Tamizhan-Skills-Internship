import React, { useState, useEffect } from 'react';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";


const FeaturedCard = ({ id,image, name, company, price, originalPrice, discountPercent, rating }) => {

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddToCart, setIsAddToCart] = useState(false)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsWishlisted(stored.includes(id));
  }, [id]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("addtocart")) || [];
    setIsAddToCart(stored.includes(id));
  }, [id])
  
  const toggleWishlist = () => {
    let stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    let updated;

    if (stored.includes(id)) {
      updated = stored.filter(item => item !== id);
    } else {
      updated = [...stored, id];
    }

    if (Array.isArray(updated)) {
      localStorage.setItem("wishlist", JSON.stringify(updated));
    }

    setIsWishlisted(!isWishlisted);
    window.dispatchEvent(new Event("wishlist-updated"));
  };

  const toggleAddToCart = () => {
    let stored = JSON.parse(localStorage.getItem("addtocart")) || [];
    let updated;

    if (stored.includes(id)){
      updated = stored.filter(item => item!==id);
    } else {
      updated = [...stored, id]
    }

    if(Array.isArray(updated)){
      localStorage.setItem("addtocart", JSON.stringify(updated));
    }
    
    setIsAddToCart(!isAddToCart);
    window.dispatchEvent(new Event("cart-updated"));
  }


  return (
    <div className="bg-white shadow-lg overflow-hidden rounded-md">
      <div className='relative h-64 sm:h-72 md:h-80'>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top"
        />
        <button onClick={toggleWishlist} className='absolute top-2 right-3 text-2xl'>
          {isWishlisted ? <FaHeart className='cursor-pointer text-red-600' />: <CiHeart className='cursor-pointer' />}
        </button>
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold truncate">{name}</h3>
        <p className="text-xs sm:text-sm text-gray-600">{company}</p>

        <div className="flex items-center space-x-2 mt-2">
          <span className="text-base sm:text-lg font-bold text-black">₹{price}</span>
          <span className="text-xs sm:text-sm text-gray-500 line-through">₹{originalPrice}</span>
          <span className="text-[8px] sm:text-sm text-green-600">({discountPercent}% OFF)</span>
        </div>

        <div className="mt-2">
          <span className="text-xs sm:text-sm text-yellow-500 font-medium">⭐ {rating} / 5</span>
        </div>

        <div onClick={toggleAddToCart} className={`mt-4 flex gap-2 flex-wrap justify-center border-1 border-gray-400 items-center hover:border-black hover:bg-gray-100 cursor-pointer
          ${isAddToCart
              ? 'bg-gray-100 border border-black '
              : ''}
          `}>

          {/* <button
            className="flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-2 rounded-sm whitespace-nowrap"
          >
            BUY NOW
          </button> */}

          <button
            
            className={`flex items-center justify-center gap-1 text-black text-sm sm:text-md px-2 sm:px-3 py-2 rounded-sm whitespace-nowrap cursor-pointer`}
          >
            <FaShoppingCart className="text-sm" />
            {isAddToCart ? 'REMOVE FROM CART' : 'ADD TO CART'}
          </button>
        </div>


      </div>
    </div>
  );
};

export default FeaturedCard;
