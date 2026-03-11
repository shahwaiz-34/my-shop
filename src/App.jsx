import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { 
  ClerkProvider, 
  SignedIn, 
  SignedOut, 
  SignIn, 
  SignUp 
} from "@clerk/clerk-react";

import ShopingCartContextProvider from "./context";
import ProductListPage from "./pages/product-list";
import DetailPage from "./pages/product-detail";
import Cart from './pages/product-cart/index';
import SignInPage from "./component-2/signInPage";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function ClerkProviderWithNav({ children }) {
  const navigate = useNavigate();
  return (
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
      navigate={(to) => navigate(to)}
    >
      {children}
    </ClerkProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* The useNavigate hook must be inside a Router, 
        so we use a wrapper component for ClerkProvider 
      */}
      <ClerkProviderWithNav>
        <ShopingCartContextProvider>
        
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<ProductListPage />} />
            <Route path="/product-details/:id" element={<DetailPage />} />

            {/* Clerk Auth Routes */}
           <Route path="/sign-in/*" element={<SignInPage />} />
            <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />

            {/* Protected Route (Example: Cart) */}
            <Route 
              path="/cart" 
              element={
                <>
                  <SignedIn>
                    <Cart />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/sign-in" />
                  </SignedOut>
                </>
              } 
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ShopingCartContextProvider>
      </ClerkProviderWithNav>
    </BrowserRouter>
  );
}