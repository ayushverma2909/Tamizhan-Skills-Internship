import React, { useEffect, useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import featuredProduct from '../components/Featured/featuredProducts';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';

const AddToCart = () => {
  const [addToCartItems, setAddToCartItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const startX = useRef(0);
  const endX = useRef(0);

  useEffect(() => {
    const cartIds = JSON.parse(localStorage.getItem("addtocart")) || [];
    const items = featuredProduct.filter(product => cartIds.includes(product.id));
    setAddToCartItems(items);
  }, []);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    endX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (startX.current - endX.current > 50 && activeIndex < addToCartItems.length - 1) {
      setActiveIndex(prev => prev + 1);
    } else if (endX.current - startX.current > 50 && activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const calculateTotal = () => {
    return addToCartItems.reduce((acc, item) => acc + item.price, 0);
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = addToCartItems.filter(item => item.id !== id);
    setAddToCartItems(updatedCart);
    localStorage.setItem("addtocart", JSON.stringify(updatedCart.map(item => item.id)));
    if (activeIndex >= updatedCart.length && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const activeItem = addToCartItems[activeIndex] || null;

  return (
    <>
      <NavBar />
      <div className="flex flex-col lg:flex-row gap-8 px-4 sm:px-6 md:px-15 lg:px-20 xl:px-35 2xl:px-32 py-10">
        
        <div className=" w-60 mx-auto">
          {activeItem ? (
            <div className="bg-white rounded-md shadow-md overflow-hidden">
              <div
                className="relative "
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className='h-64 sm:h-72 md:h-80'>
                    <img
                        src={Array.isArray(activeItem.image) ? activeItem.image[0] : activeItem.image}
                        alt={activeItem.name}
                        className="w-full h-full object-cover object-top"
                    />

                </div>
                
                
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {addToCartItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`w-3 h-3 rounded-full border border-black ${activeIndex === index ? 'bg-black' : 'bg-transparent'}`}
                    ></button>
                  ))}
                </div>
              </div>
              <div className="p-4 space-y-1 text-center">
                <h3 className="text-lg font-semibold">{activeItem.name}</h3>
                <p className="text-sm text-gray-600">{activeItem.company}</p>
                <p className="text-base font-bold">₹{activeItem.price}</p>
                <p className="text-xs text-gray-500 line-through">₹{activeItem.originalPrice}</p>
                <p className="text-xs text-green-600">{activeItem.discountPercent}% OFF</p>
                <p className="text-sm text-yellow-500">⭐ {activeItem.rating} / 5</p>

                <div className="flex justify-between">
                  <button className=" flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm py-1 rounded-md px-2 cursor-pointer">
                    BUY NOW
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(activeItem.id)}
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-md cursor-pointer"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">No items in Cart.</p>
          )}
        </div>

        <div className="lg:w-1/3 w-full bg-white p-6 rounded-md shadow-md h-fit sticky top-6">
          <h3 className="text-xl font-semibold mb-4">Price Details</h3>
          <div className="flex justify-between text-sm border-b pb-2 mb-2">
            <span>Items ({addToCartItems.length})</span>
            <span>₹{calculateTotal()}</span>
          </div>
          <div className="flex justify-between text-sm border-b pb-2 mb-2">
            <span>Delivery</span>
            <span className="text-green-600">FREE</span>
          </div>
          <div className="flex justify-between text-base font-bold mb-4">
            <span>Total</span>
            <span>₹{calculateTotal()}</span>
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm">
            Click to Buy
          </button>
        </div>

      </div>
    </>
  );
};

export default AddToCart;
