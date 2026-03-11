import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductTile({ singleProdTile }) {
  const navigate = useNavigate();

  function navigateToDetailPage(productId) {
    navigate(`/product-details/${productId}`);
  }

  // USD Currency Formatter
  const formatUSD = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100 group h-full">
      
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-50 mb-6 flex items-center justify-center p-4">
        <img
          src={singleProdTile?.thumbnail}
          alt={singleProdTile?.title}
          className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        {/* Subtle Category Badge floating over the image */}
        <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full text-gray-700 shadow-sm">
          {singleProdTile?.category}
        </span>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-bold text-lg text-gray-900 line-clamp-1 mb-1" title={singleProdTile?.title}>
            {singleProdTile?.title}
          </h3>
          {/* Added a short description line clamp to fill space nicely */}
          <p className="text-gray-500 text-sm line-clamp-2 mb-4">
            {singleProdTile?.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <p className="text-xl font-black text-gray-900">
            {formatUSD(singleProdTile?.price)}
          </p>
          <div className="flex items-center gap-1 text-sm font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md">
            ★ {singleProdTile?.rating}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => navigateToDetailPage(singleProdTile?.id)}
        className="mt-6 w-full py-3 rounded-xl bg-[#1f2937] text-white font-bold hover:bg-black transition-colors active:scale-[0.98]"
      >
        View Details
      </button>
      
    </div>
  );
}