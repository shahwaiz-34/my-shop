import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingCartContext } from "../../context";
import { UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";

export default function Navbar() {
  const { cartItems } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  const totalItems = cartItems?.reduce((acc, curr) => acc + (curr.quantity || 1), 0) || 0;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-black tracking-tighter text-gray-900 hover:opacity-80 transition-opacity">
          MY SHOP
        </Link>

        <div className="flex items-center gap-6">
          <button onClick={() => navigate("/cart")} className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-800 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                {totalItems}
              </span>
            )}
          </button>

          <div className="flex items-center border-l pl-6 border-gray-200">
            <SignedIn>
              {/* UserButton handles profile management automatically */}
              <UserButton 
                afterSignOutUrl="/" 
                appearance={{ elements: { avatarBox: "h-9 w-9" } }} 
              />
            </SignedIn>

            <SignedOut>
              <button 
                onClick={() => navigate("/sign-in")}
                className="bg-black text-white shadow-md scale-105 px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer"
              >
                Log In
              </button>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}