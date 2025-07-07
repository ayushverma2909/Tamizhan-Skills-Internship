import React from 'react'
import NavBar from '../components/NavBar'
import featuredProduct from '../components/Featured/featuredProducts'
import FeaturedCard from '../components/Featured/FeaturedCard';

const Wishlist = () => {
  
  const wishlistIds = JSON.parse(localStorage.getItem("wishlist")) || [];
  const wishlistedItems = featuredProduct.filter(product =>
    wishlistIds.includes(product.id)
  );
  

  return (
    <>
        <NavBar />
        <div className="px-4 sm:px-6 md:px-15 lg:px-20 xl:px-35 2xl:px-32 py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
              wishlistedItems.length > 0 ? (
                wishlistedItems.map(item => (
                  <FeaturedCard 
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    company={item.company}
                    price={item.price}
                    originalPrice={item.originalPrice}
                    discountPercent={item.discountPercent}
                    rating={item.rating}
                  />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-600">No items in wishlist.</p>
              )
            }

          </div>
        </div>
    </>
  )
}

export default Wishlist