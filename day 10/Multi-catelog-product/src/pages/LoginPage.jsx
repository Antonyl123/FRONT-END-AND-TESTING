import React from "react";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

export default function LoginPage() {
  const { signInWithGoogle, loading } = useAuth();

  return (
    <div className="login-page page-wrapper">
      <div className="login-page__bg" />
      <div className="login-card card scale-in">
        {/* Logo */}
        <div className="login-card__logo">
          <div className="login-card__logo-icon">T</div>
          <span className="login-card__logo-text">tony<span>.</span></span>
        </div>

        <h1 className="login-card__title">Welcome Back</h1>
        <p className="login-card__subtitle">Sign in to access your cart, wishlist, and orders.</p>

        {/* Features preview */}
        <div className="login-card__features">
          {["🛒 Save your cart items", "❤️ Keep your wishlist", "📦 Track your orders", "🎁 Exclusive member deals"].map((f) => (
            <div key={f} className="login-card__feature">{f}</div>
          ))}
        </div>

        <button className="login-card__google-btn" onClick={signInWithGoogle} disabled={loading}>
          <img src="https://www.google.com/favicon.ico" alt="Google" width={20} height={20} />
          {loading ? "Signing in..." : "Continue with Google"}
        </button>

        <p className="login-card__terms">
          By signing in, you agree to Tony's <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
