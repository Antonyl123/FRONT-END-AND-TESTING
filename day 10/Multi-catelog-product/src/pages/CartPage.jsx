import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag } from "lucide-react";
import { useCart } from "../context/CartContext";
import "./CartPage.css";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  const savings = cart.reduce((sum, i) => sum + (i.originalPrice - i.price) * i.quantity, 0);
  const delivery = cartTotal >= 999 ? 0 : 99;
  const total = cartTotal + delivery;

  if (cart.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="container" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
          <div className="empty-state">
            <span className="empty-icon">🛒</span>
            <h3>Your cart is empty</h3>
            <p>Add some products to your cart and they'll appear here</p>
            <Link to="/products" className="btn btn-primary btn-lg" style={{ marginTop: "24px" }}>
              <ShoppingBag size={18} /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
        <div className="cart-header">
          <button className="btn-ghost" onClick={() => navigate(-1)} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <ArrowLeft size={16} /> Continue Shopping
          </button>
          <h1 className="section-title">My Cart <span className="cart-count-badge">({cartCount})</span></h1>
          <button className="btn btn-secondary btn-sm" onClick={clearCart}>Clear All</button>
        </div>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {cart.map((item, i) => {
              const itemDiscount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
              return (
                <div key={item.id} className="cart-item card fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <Link to={`/product/${item.id}`} className="cart-item__img-wrap">
                    <img src={item.image} alt={item.name} className="cart-item__img" />
                  </Link>
                  <div className="cart-item__info">
                    <Link to={`/product/${item.id}`}>
                      <span className="cart-item__brand">{item.brand}</span>
                      <h3 className="cart-item__name">{item.name}</h3>
                    </Link>
                    <span className="badge badge-primary" style={{ marginTop: "4px", fontSize: "0.72rem" }}>{item.category}</span>
                    {itemDiscount > 0 && <span className="price-discount">{itemDiscount}% off</span>}
                    <div className="cart-item__price-row">
                      <span className="price-current">₹{item.price.toLocaleString()}</span>
                      <span className="price-original">₹{item.originalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="cart-item__controls">
                    <div className="cart-item__qty">
                      <button className="btn-icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={13} /></button>
                      <span>{item.quantity}</span>
                      <button className="btn-icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={13} /></button>
                    </div>
                    <p className="cart-item__subtotal">₹{(item.price * item.quantity).toLocaleString()}</p>
                    <button className="btn-icon cart-item__remove" onClick={() => removeFromCart(item.id)}><Trash2 size={15} /></button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="cart-summary card">
            <h2 className="cart-summary__title">Order Summary</h2>
            <div className="divider" />

            <div className="cart-summary__rows">
              <div className="cart-summary__row"><span>Subtotal ({cartCount} items)</span><span>₹{cartTotal.toLocaleString()}</span></div>
              <div className="cart-summary__row cart-summary__row--savings"><span>💚 Total Savings</span><span>-₹{savings.toLocaleString()}</span></div>
              <div className="cart-summary__row"><span>Delivery Charges</span><span className={delivery === 0 ? "cart-summary__free" : ""}>{delivery === 0 ? "FREE" : `₹${delivery}`}</span></div>
            </div>

            {delivery > 0 && (
              <div className="cart-summary__shipping-msg">
                Add ₹{(999 - cartTotal).toLocaleString()} more for FREE delivery
                <div className="cart-summary__shipping-bar">
                  <div className="cart-summary__shipping-fill" style={{ width: `${Math.min(100, (cartTotal / 999) * 100)}%` }} />
                </div>
              </div>
            )}

            <div className="divider" />
            <div className="cart-summary__total"><span>Total Amount</span><span>₹{total.toLocaleString()}</span></div>
            <p className="cart-summary__savings-text">You save ₹{savings.toLocaleString()} on this order! 🎉</p>

            {/* Coupon */}
            <div className="cart-summary__coupon">
              <Tag size={15} />
              <input type="text" placeholder="Apply coupon code" className="input" style={{ flex: 1 }} />
              <button className="btn btn-primary btn-sm">Apply</button>
            </div>

            <button className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center" }}>
              Proceed to Checkout →
            </button>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "12px" }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" style={{ height: "24px", opacity: 0.6, objectFit: "contain" }} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" style={{ height: "24px", opacity: 0.6, objectFit: "contain" }} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/200px-UPI-Logo-vector.svg.png" alt="UPI" style={{ height: "24px", opacity: 0.6, objectFit: "contain" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
