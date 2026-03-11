import React, { useContext, useState } from 'react';
import { ShoppingCartContext } from '../../context';
import ProductTile from '../../component-2/product-tile';
import Navbar from '../../component-2/navbar';

export default function ProductListPage() {
  const { productsList, loading } = useContext(ShoppingCartContext);
  
  // State for the active category filter
  const [activeCategory, setActiveCategory] = useState('All');

  // Loading Skeleton/Spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-22 w-22 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  // Dynamically extract unique categories from the product list
  const categories = ['All', ...new Set(productsList?.map((product) => product.category))].filter(Boolean);

  // Filter products based on the clicked category button
  const filteredProducts = activeCategory === 'All' 
    ? productsList 
    : productsList?.filter((product) => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 md:px-4">
      <Navbar/>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-8">
          Our Featured Products
        </h2>

        {/* Dynamic Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-2 rounded-full text-sm font-bold capitalize transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-black text-white shadow-md scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((singleProdTile) => (
              <ProductTile key={singleProdTile.id} singleProdTile={singleProdTile} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <h2 className="text-2xl font-bold text-gray-400">No products found in this category.</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}