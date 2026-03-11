import React, { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import { useNavigate } from "react-router-dom";
import CartDetail from "../../component-2/cartItem";

export default function ProductCart() {
  // Destructuring common cart actions from your context
  const { 
    cartItems, 
    handleAddToCart, 
    handleRemoveFromCart, 
    handleDeleteFromCart 
  } = useContext(ShoppingCartContext);

  const navigate = useNavigate();

  // Calculation Logic (Price * Quantity)
  const subtotal = cartItems.reduce((acc, curr) => acc + (curr.price * (curr.quantity || 1)), 0);
  const shipping = cartItems.length > 0 ? 15.00 : 0; 
  const total = subtotal + shipping;

  // USD Currency Formatter
  const formatUSD = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10  px-1 md:px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-10">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* List of Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((singleCartIt) => (
                <CartDetail 
                  key={singleCartIt.id} 
                  singleCartIt={singleCartIt}
                  // Passing functions down as props to the CartDetail component
                  onIncrement={() => handleAddToCart(singleCartIt)}
                  onDecrement={() => handleRemoveFromCart(singleCartIt)}
                  onDelete={() => handleDeleteFromCart(singleCartIt.id)}
                  formatUSD={formatUSD}
                />
              ))
            ) : (
              <div className="bg-white p-12 rounded-2xl shadow-sm text-center border-2 border-dashed border-gray-200">
                <p className="text-gray-500 text-lg mb-6">Your cart feels a bit light!</p>
                <button 
                  onClick={() => navigate("/")}
                  className="px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-8 sticky top-10 border border-gray-100">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Summary</h2>
              
              <div className="space-y-4 border-b border-gray-100 pb-6">
                <div className="flex justify-between text-gray-600">
                  <span className="font-medium">Subtotal</span>
                  <span className="text-gray-900 font-semibold">{formatUSD(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="font-medium">Shipping (Est.)</span>
                  <span className="text-gray-900 font-semibold">{formatUSD(shipping)}</span>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center mb-10">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-black text-gray-900">{formatUSD(total)}</span>
              </div>

              <div className="space-y-4">
                <button 
                  disabled={cartItems.length === 0}
                  className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="w-full py-4 text-gray-500 font-bold hover:text-black transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}