import React from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="container" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
          <div className="empty-state">
            <span className="empty-icon">❤️</span>
            <h3>Your wishlist is empty</h3>
            <p>Save your favourite products here to buy them later</p>
            <Link to="/products" className="btn btn-primary btn-lg" style={{ marginTop: "24px" }}>
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-xl)", flexWrap: "wrap", gap: "var(--space-md)" }}>
          <div>
            <h1 className="section-title">My Wishlist <span style={{ color: "#ec4899" }}>❤️</span></h1>
            <p className="section-subtitle">{wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}</p>
          </div>
          <button className="btn btn-primary" onClick={() => { wishlist.forEach((p) => addToCart(p)); }}>
            <ShoppingCart size={16} /> Add All to Cart
          </button>
        </div>
        <div className="products-grid">
          {wishlist.map((p, i) => (
            <div key={p.id} style={{ animationDelay: `${i * 40}ms` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
