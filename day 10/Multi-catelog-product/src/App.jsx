import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <div className="app-container">
                <Navbar />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/category/:name" element={<CategoryPage />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/contact" element={<ContactPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: "var(--bg-card)",
                    color: "var(--txt-primary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--border-radius-sm)",
                    fontFamily: "'Inter', sans-serif",
                  },
                }}
              />
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

