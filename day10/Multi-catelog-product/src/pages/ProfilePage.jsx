import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { ShoppingCart, Heart, LogOut, User, Package, Star } from "lucide-react";
import "./ProfilePage.css";

const mockOrders = [
  { id: "ORD-001", date: "2026-07-01", status: "Delivered", total: 12990, items: 2 },
  { id: "ORD-002", date: "2026-06-25", status: "Shipped", total: 4599, items: 1 },
  { id: "ORD-003", date: "2026-06-18", status: "Processing", total: 29990, items: 3 },
];

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { cart, cartTotal } = useCart();
  const { wishlist } = useWishlist();

  if (!user) {
    return (
      <div className="page-wrapper">
        <div className="container" style={{ paddingTop: "60px" }}>
          <div className="empty-state">
            <span className="empty-icon"><User size={48} /></span>
            <h3>Not logged in</h3>
            <Link to="/login" className="btn btn-primary" style={{ marginTop: "20px" }}>Sign In</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
        {/* Profile Header */}
        <div className="profile-header card">
          <div className="profile-header__left">
            <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&size=120`} alt={user.displayName} className="profile-header__avatar" />
            <div>
              <h1 className="profile-header__name">{user.displayName}</h1>
              <p className="profile-header__email">{user.email}</p>
              <span className="badge badge-primary" style={{ marginTop: "8px" }}>✅ Verified Account</span>
            </div>
          </div>
          <button className="btn btn-secondary" onClick={logout}><LogOut size={15} /> Sign Out</button>
        </div>

        {/* Stats */}
        <div className="profile-stats">
          {[
            { label: "Cart Items", value: cart.length, icon: <ShoppingCart size={20} />, color: "#2563eb", link: "/cart" },
            { label: "Wishlist Items", value: wishlist.length, icon: <Heart size={20} />, color: "#ec4899", link: "/wishlist" },
            { label: "Total Orders", value: mockOrders.length, icon: <Package size={20} />, color: "#10b981", link: "#orders" },
            { label: "Cart Value", value: `₹${cartTotal.toLocaleString()}`, icon: <Star size={20} />, color: "#f59e0b", link: "/cart" },
          ].map((s) => (
            <Link key={s.label} to={s.link} className="profile-stat card">
              <div className="profile-stat__icon" style={{ background: s.color + "20", color: s.color }}>{s.icon}</div>
              <div className="profile-stat__value">{s.value}</div>
              <div className="profile-stat__label">{s.label}</div>
            </Link>
          ))}
        </div>

        {/* Order History */}
        <div id="orders">
          <h2 className="section-title" style={{ marginBottom: "var(--space-lg)" }}>Order History</h2>
          <div className="profile-orders">
            {mockOrders.map((order) => (
              <div key={order.id} className="profile-order card">
                <div className="profile-order__info">
                  <strong className="profile-order__id">{order.id}</strong>
                  <p className="profile-order__date">Placed on {order.date}</p>
                  <p className="profile-order__items">{order.items} item{order.items !== 1 ? "s" : ""}</p>
                </div>
                <div className="profile-order__right">
                  <span className={`badge ${order.status === "Delivered" ? "badge-success" : order.status === "Shipped" ? "badge-primary" : "badge-warning"}`}>
                    {order.status}
                  </span>
                  <p className="profile-order__total">₹{order.total.toLocaleString()}</p>
                  <button className="btn btn-secondary btn-sm">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
