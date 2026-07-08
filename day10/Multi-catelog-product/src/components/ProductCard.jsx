import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Star, Eye } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./ProductCard.css";

function StarRating({ rating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={12} fill={s <= Math.round(rating) ? "currentColor" : "none"} strokeWidth={1.5} />
      ))}
      <span className="product-card__rating-num">{rating}</span>
    </div>
  );
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [imgError, setImgError] = useState(false);
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addToCart(product);
    setTimeout(() => setAdding(false), 600);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleEyeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card card" draggable={false}>
      {/* Image */}
      <div className="product-card__img-wrap">
        <img
          src={imgError ? `https://picsum.photos/seed/${product.id}/400/400` : product.image}
          alt={product.name}
          className="product-card__img"
          onError={() => setImgError(true)}
          loading="lazy"
        />
        {/* Badges */}
        <div className="product-card__badges">
          {product.badge && <span className="badge badge-hot">{product.badge}</span>}
          {discount >= 10 && <span className="badge badge-danger">{discount}% OFF</span>}
        </div>
        {/* Actions */}
        <div className="product-card__actions">
          <button
            className={`product-card__action-btn ${inWishlist ? "product-card__action-btn--active-wish" : ""}`}
            onClick={handleWishlist}
            title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={16} fill={inWishlist ? "currentColor" : "none"} />
          </button>
          <button className="product-card__action-btn" onClick={handleEyeClick} title="Quick view">
            <Eye size={16} />
          </button>
        </div>
        {/* Out of stock */}
        {product.stock === 0 && (
          <div className="product-card__out-of-stock">Out of Stock</div>
        )}
      </div>

      {/* Info */}
      <div className="product-card__info">
        <p className="product-card__brand">{product.brand}</p>
        <h3 className="product-card__name">{product.name}</h3>
        <StarRating rating={product.rating} />
        <p className="product-card__reviews">({product.reviews?.toLocaleString()} reviews)</p>

        {/* Price */}
        <div className="product-card__price-row">
          <span className="price-current">&#8377;{product.price.toLocaleString()}</span>
          <span className="price-original">&#8377;{product.originalPrice.toLocaleString()}</span>
        </div>

        {/* Add to Cart */}
        <button
          className={`btn btn-primary product-card__cart-btn ${adding ? "product-card__cart-btn--adding" : ""}`}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <ShoppingCart size={15} />
          {adding ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
}
