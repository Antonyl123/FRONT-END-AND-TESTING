import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Heart, Star, Share2, Package, Shield, Truck, RotateCcw, Plus, Minus } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [adding, setAdding] = useState(false);

  const product = products.find((p) => p.id === id);
  if (!product) return (
    <div className="page-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="empty-state">
        <span className="empty-icon">😕</span>
        <h3>Product not found</h3>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: "20px" }}>Browse Products</Link>
      </div>
    </div>
  );

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 6);
  const inWishlist = isInWishlist(product.id);

  // Fake multiple images using different seeds
  const images = [
    product.image,
    `https://picsum.photos/seed/${product.id}-b/400/400`,
    `https://picsum.photos/seed/${product.id}-c/400/400`,
    `https://picsum.photos/seed/${product.id}-d/400/400`,
  ];

  const handleAddToCart = () => {
    setAdding(true);
    for (let i = 0; i < qty; i++) addToCart(product, i === 0 ? qty : 0);
    setTimeout(() => setAdding(false), 800);
  };

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
        {/* Breadcrumb */}
        <div className="product-detail__breadcrumb">
          <button onClick={() => navigate(-1)} className="btn-ghost product-detail__back"><ArrowLeft size={16} /> Back</button>
          <Link to="/products">Products</Link> / <Link to={`/category/${product.category}`}>{product.category}</Link> / <span>{product.name.slice(0, 30)}...</span>
        </div>

        {/* Main */}
        <div className="product-detail__main">
          {/* Images */}
          <div className="product-detail__images">
            <div className="product-detail__main-img-wrap">
              <img src={images[activeImg]} alt={product.name} className="product-detail__main-img" />
              {discount >= 10 && <span className="badge badge-hot product-detail__discount-badge">{discount}% OFF</span>}
            </div>
            <div className="product-detail__thumbnails">
              {images.map((img, i) => (
                <button key={i} className={`product-detail__thumb ${activeImg === i ? "product-detail__thumb--active" : ""}`} onClick={() => setActiveImg(i)}>
                  <img src={img} alt={`View ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="product-detail__info">
            <div className="product-detail__brand-cat">
              <span className="badge badge-primary">{product.brand}</span>
              <span className="product-detail__category">{product.category}</span>
            </div>
            <h1 className="product-detail__name">{product.name}</h1>

            {/* Rating */}
            <div className="product-detail__rating">
              <div className="stars">
                {[1,2,3,4,5].map((s) => <Star key={s} size={16} fill={s <= Math.round(product.rating) ? "currentColor" : "none"} strokeWidth={1.5} />)}
              </div>
              <strong>{product.rating}</strong>
              <span>({product.reviews?.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="product-detail__price-block">
              <span className="product-detail__price-current">₹{product.price.toLocaleString()}</span>
              <span className="price-original">₹{product.originalPrice.toLocaleString()}</span>
              {discount >= 5 && <span className="badge badge-danger">{discount}% OFF</span>}
            </div>

            {/* Stock */}
            <p className={`product-detail__stock ${product.stock > 0 ? "product-detail__stock--in" : "product-detail__stock--out"}`}>
              {product.stock > 10 ? "✅ In Stock" : product.stock > 0 ? `⚠️ Only ${product.stock} left!` : "❌ Out of Stock"}
            </p>

            {/* Description */}
            <p className="product-detail__desc">{product.description}</p>

            {/* Qty */}
            <div className="product-detail__qty">
              <span>Quantity:</span>
              <div className="product-detail__qty-controls">
                <button className="btn-icon" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus size={14} /></button>
                <span className="product-detail__qty-num">{qty}</span>
                <button className="btn-icon" onClick={() => setQty((q) => Math.min(product.stock, q + 1))}><Plus size={14} /></button>
              </div>
            </div>

            {/* Actions */}
            <div className="product-detail__actions">
              <button className={`btn btn-primary btn-lg ${adding ? "" : ""}`} onClick={handleAddToCart} disabled={product.stock === 0} style={{ flex: 1 }}>
                <ShoppingCart size={18} /> {adding ? "Added to Cart! ✓" : "Add to Cart"}
              </button>
              <button className={`btn btn-secondary btn-lg ${inWishlist ? "product-detail__wish--active" : ""}`} onClick={() => toggleWishlist(product)}>
                <Heart size={18} fill={inWishlist ? "currentColor" : "none"} /> {inWishlist ? "Wishlisted" : "Wishlist"}
              </button>
            </div>

            {/* Buy Now */}
            <button className="btn btn-secondary btn-lg" style={{ width: "100%" }} onClick={() => { addToCart(product, qty); navigate("/cart"); }}>
              ⚡ Buy Now
            </button>

            {/* Trust Badges */}
            <div className="product-detail__trust">
              {[
                { icon: <Truck size={16} />, text: "Free delivery above ₹999" },
                { icon: <RotateCcw size={16} />, text: "7-day easy returns" },
                { icon: <Shield size={16} />, text: "100% secure payment" },
                { icon: <Package size={16} />, text: "Original & authentic" },
              ].map((t) => (
                <div key={t.text} className="product-detail__trust-item">
                  {t.icon} {t.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginTop: "var(--space-2xl)" }}>
            <h2 className="section-title" style={{ marginBottom: "var(--space-lg)" }}>Related Products</h2>
            <div className="products-grid">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
