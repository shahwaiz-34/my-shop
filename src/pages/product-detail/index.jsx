import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../context';
import Navbar from '../../component-2/navbar';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { handleGoToCart, cartItems } = useContext(ShoppingCartContext);

  // Check if item is already in cart to change button state
  const isItemInCart = cartItems.some((item) => item.id === parseInt(id));

  async function fetchSingleProduct() {
    setLoading(true);
    try {
      const ApiResponse = await fetch(`https://dummyjson.com/products/${id}`);
      if (!ApiResponse.ok) throw new Error(`Product not found`);
      const result = await ApiResponse.json();
      setProduct(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-22 w-22 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center p-6 bg-red-50 rounded-xl">
        <p className="text-red-600 font-bold">Error: {error}</p>
        <button onClick={() => navigate('/')} className="mt-4 underline text-gray-600">Back to Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-1 md:px-4">
      
      <Navbar/>
      <div className="px-4 bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100 mt-2">
        <div className="flex flex-col md:flex-row">
          
          {/* Left: Image Gallery Style */}
          <div className="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center border-r border-gray-100">
            <div className="relative group">
              <img
                src={product?.thumbnail}
                alt={product?.title}
                className="w-full h-auto max-h-[500px] object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-0 right-0 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-500 shadow-sm uppercase tracking-widest">
                {product?.brand || 'Premium'}
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
            <nav className="flex mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <span>{product?.category}</span>
              <span className="mx-2">/</span>
              <span className="text-black">Product Details</span>
            </nav>

            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
              {product?.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${product?.price?.toLocaleString()}
              </span>
              <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-lg">
                <span className="text-yellow-700 font-bold text-sm">★ {product?.rating}</span>
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8 border-l-4 border-black pl-6 italic">
              {product?.description}
            </p>

            {/* Product Specifications Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Availability</p>
                <p className={`font-bold ${product?.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product?.stock > 0 ? `${product?.stock} in stock` : 'Out of stock'}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Shipping</p>
                <p className="font-bold text-gray-900">Calculated at checkout</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto space-y-4">
              <button
                onClick={() => handleGoToCart(product)}
                className={`w-full py-5 rounded-2xl font-bold text-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                  isItemInCart 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-black text-white hover:bg-gray-800 shadow-lg shadow-gray-200'
                }`}
              >
                {isItemInCart ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Added to Cart
                  </>
                ) : (
                  'Add to Cart'
                )}
              </button>
              
              <button 
                onClick={() => navigate('/cart')}
                className="w-full py-4 text-gray-500 font-bold hover:text-black transition-colors"
              >
                View Shopping Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}