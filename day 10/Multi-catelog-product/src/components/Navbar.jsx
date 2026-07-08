import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Sun, Moon, Search, User, Menu, X, LogOut, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { user, signInWithGoogle, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/category/Electronics", label: "Electronics" },
    { to: "/category/Fashion", label: "Fashion" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <div className="notification-bar">
        🎉 Free Shipping on orders above ₹999 | Use code <strong>TONY10</strong> for 10% off!
      </div>
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="container navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-icon">T</span>
            <span className="navbar__logo-text">
              tony<span className="navbar__logo-dot">.</span>
            </span>
          </Link>

          {/* Search */}
          <form className="navbar__search" onSubmit={handleSearch}>
            <Search size={18} className="navbar__search-icon" />
            <input
              type="text"
              placeholder="Search products, brands, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar__search-input"
            />
            <button type="submit" className="navbar__search-btn">Search</button>
          </form>

          {/* Desktop Nav Links */}
          <div className="navbar__links">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`} end={l.to === "/"}>
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="navbar__actions">
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="btn-icon navbar__action-btn" title="Toggle dark mode">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="btn-icon navbar__action-btn navbar__badge-wrap" title="Wishlist">
              <Heart size={18} />
              {wishlist.length > 0 && <span className="navbar__badge navbar__badge--wishlist">{wishlist.length}</span>}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="btn-icon navbar__action-btn navbar__badge-wrap" title="Cart">
              <ShoppingCart size={18} />
              {cartCount > 0 && <span className="navbar__badge">{cartCount}</span>}
            </Link>

            {/* User */}
            {user ? (
              <div className="navbar__user" ref={userMenuRef}>
                <button className="navbar__user-btn" onClick={() => setUserMenuOpen((o) => !o)}>
                  <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt={user.displayName} className="navbar__avatar" />
                  <ChevronDown size={14} />
                </button>
                {userMenuOpen && (
                  <div className="navbar__dropdown scale-in">
                    <div className="navbar__dropdown-header">
                      <img src={user.photoURL} alt={user.displayName} className="navbar__dropdown-avatar" />
                      <div>
                        <p className="navbar__dropdown-name">{user.displayName}</p>
                        <p className="navbar__dropdown-email">{user.email}</p>
                      </div>
                    </div>
                    <div className="divider" />
                    <Link to="/profile" className="navbar__dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      <User size={15} /> My Profile
                    </Link>
                    <Link to="/wishlist" className="navbar__dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      <Heart size={15} /> My Wishlist ({wishlist.length})
                    </Link>
                    <Link to="/cart" className="navbar__dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      <ShoppingCart size={15} /> My Cart ({cartCount})
                    </Link>
                    <div className="divider" />
                    <button className="navbar__dropdown-item navbar__dropdown-item--danger" onClick={() => { logout(); setUserMenuOpen(false); }}>
                      <LogOut size={15} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={signInWithGoogle}>
                <User size={15} /> Login
              </button>
            )}

            {/* Mobile menu toggle */}
            <button className="navbar__hamburger btn-ghost" onClick={() => setMenuOpen((o) => !o)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="navbar__mobile slide-in-right">
            <form className="navbar__mobile-search" onSubmit={handleSearch}>
              <Search size={16} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => `navbar__mobile-link ${isActive ? "active" : ""}`} end={l.to === "/"} onClick={() => setMenuOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            {!user && (
              <button className="btn btn-primary" onClick={() => { signInWithGoogle(); setMenuOpen(false); }}>
                <User size={15} /> Sign in with Google
              </button>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
