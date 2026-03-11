/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);

export default function ShopingCartContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [productsList, setProductsList] = useState([]);
  const [productDetail, setProductDetail] = useState(null);
  const [error, setEror] = useState(null);
  
  // 1. Initialize from localStorage immediately
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("shopping_cart_data");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const navigate = useNavigate();

  // 2. Sync to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("shopping_cart_data", JSON.stringify(cartItems));
  }, [cartItems]);

  async function feachProductList() {
    try {
      const ApiResponse = await fetch("https://dummyjson.com/products");
      const result = await ApiResponse.json();
      if (result && result?.products) {
        setProductsList(result.products);
        setLoading(false);
      }
    } catch (error) {
      setEror(error);
    }
  }

  useEffect(() => {
    feachProductList();
  }, []);

  function handleGoToCart(singleProdDetai) {
    let copyEC = [...cartItems];
    const findIndexOfCurrentItem = copyEC.findIndex(
      (cartItem) => cartItem.id === singleProdDetai.id
    );

    if (findIndexOfCurrentItem === -1) {
      copyEC.push({
        ...singleProdDetai,
        quantity: 1,
        totalPrice: singleProdDetai?.price,
      });
    } else {
      copyEC[findIndexOfCurrentItem] = {
        ...copyEC[findIndexOfCurrentItem],
        quantity: copyEC[findIndexOfCurrentItem].quantity + 1,
        totalPrice: (copyEC[findIndexOfCurrentItem].quantity + 1) * copyEC[findIndexOfCurrentItem].price,
      };
    }

    setCartItems(copyEC);
    navigate("/cart");
  }

  function handleRemoveFromCart(getProductDetail, isFullyRemove) {
    let cpyExistingCartItems = [...cartItems];
    const findIndexOfCurrentCartItem = cpyExistingCartItems.findIndex(item => item.id === getProductDetail.id);

    if (findIndexOfCurrentCartItem === -1) return;

    if (isFullyRemove || cpyExistingCartItems[findIndexOfCurrentCartItem].quantity <= 1) {
      cpyExistingCartItems.splice(findIndexOfCurrentCartItem, 1);
    } else {
      const currentItem = cpyExistingCartItems[findIndexOfCurrentCartItem];
      const newQuantity = currentItem.quantity - 1;
      
      cpyExistingCartItems[findIndexOfCurrentCartItem] = {
        ...currentItem,
        quantity: newQuantity,
        totalPrice: newQuantity * currentItem.price
      };
    }

    setCartItems(cpyExistingCartItems);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        productsList,
        loading,
        productDetail,
        setProductDetail,
        handleGoToCart,
        cartItems,
        handleRemoveFromCart
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}