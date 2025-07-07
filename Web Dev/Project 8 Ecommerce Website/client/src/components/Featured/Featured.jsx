import React from 'react';
import FeaturedCard from './FeaturedCard';
import featuredProducts from './featuredProducts';

const Featured = () => {
  return (
    <div className="px-4 sm:px-6 md:px-15 lg:px-20 xl:px-35 2xl:px-32 py-10">
      <h2 className="text-3xl font-bold text-center">Featured Products</h2>
      <p className="text-gray-500 text-center text-sm sm:text-base mb-8 mt-2">
        Discover handpicked clothing styles for comfort, fashion, and value.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <FeaturedCard
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            company={product.company}
            price={product.price}
            originalPrice={product.originalPrice}
            discountPercent={product.discountPercent}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default Featured;
