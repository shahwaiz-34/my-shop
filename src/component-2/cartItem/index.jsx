import React, { useContext } from "react";
import { ShoppingCartContext } from "../../context";

export default function CartDetail({ singleCartIt }) {
  const { handleRemoveFromCart, handleGoToCart } = useContext(ShoppingCartContext);

  // Helper to format as USD
  const formatUSD = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <div className="relative flex items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-gray-50 rounded-xl overflow-hidden p-2">
        <img
          className="w-full h-full object-contain"
          src={singleCartIt?.thumbnail}
          alt={singleCartIt?.title}
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 px-4 md:px-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-base md:text-lg font-bold text-gray-900 line-clamp-1">
              {singleCartIt?.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Unit Price: {formatUSD(singleCartIt?.price)}
            </p>
          </div>
          
          {/* Delete Button (Trash Icon Look) */}
          <button
            onClick={() => handleRemoveFromCart(singleCartIt, true)}
            className="text-red-400 hover:text-red-600 transition-colors p-1"
            title="Remove Item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              disabled={singleCartIt?.quantity === 1}
              onClick={() => handleRemoveFromCart(singleCartIt, false)}
              className="px-3 py-1 bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors text-xl font-medium"
            >
              −
            </button>
            <span className="px-4 py-1 text-sm font-bold text-gray-900 min-w-[40px] text-center">
              {singleCartIt?.quantity}
            </span>
            <button
              onClick={() => handleGoToCart(singleCartIt)}
              className="px-3 py-1 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors text-xl font-medium"
            >
              +
            </button>
          </div>

          {/* Item Total Price */}
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase font-semibold">Total</p>
            <p className="text-lg font-bold text-gray-900">
              {formatUSD(singleCartIt?.price * singleCartIt?.quantity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}