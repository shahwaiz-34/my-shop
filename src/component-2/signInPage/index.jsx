import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 px-4 py-12">
      <SignIn 
        routing="path" 
        path="/sign-in" 
        appearance={{
          variables: {
            colorPrimary: "#2563eb", // Matches the blue in your logo/links
            colorText: "#111827",    // Dark gray/black for high contrast
            colorBackground: "#ffffff",
            borderRadius: "0.75rem", // Soft rounded corners like your cart cards
            fontFamily: "Inter, sans-serif",
          },
          elements: {
            rootBox: "mx-auto shadow-2xl",
            card: "border border-gray-100 shadow-none",
            headerTitle: "text-2xl font-black tracking-tighter text-gray-900",
            headerSubtitle: "text-gray-500",
            socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50 transition-all",
            formButtonPrimary: 
              "bg-gray-900 hover:bg-black text-sm font-bold uppercase tracking-widest py-3 transition-all", 
              // Matches the "Proceed to Checkout" button style
            footerActionLink: "text-blue-600 hover:text-blue-700 font-semibold",
            formFieldInput: "border-gray-200 focus:ring-blue-600 focus:border-blue-600",
            dividerLine: "bg-gray-100",
            dividerText: "text-gray-400 text-xs uppercase font-bold",
          }
        }}
      />
    </div>
  );
}