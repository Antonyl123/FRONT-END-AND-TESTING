import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Globe, Heart, MessageSquare, Play, ShoppingBag } from "lucide-react";
import "./Footer.css";

const footerLinks = {
  "Shop": [
    { label: "Electronics", to: "/category/Electronics" },
    { label: "Fashion", to: "/category/Fashion" },
    { label: "Home & Kitchen", to: "/category/Home & Kitchen" },
    { label: "Sports & Fitness", to: "/category/Sports & Fitness" },
    { label: "Books", to: "/category/Books" },
    { label: "Beauty", to: "/category/Beauty" },
  ],
  "Customer Service": [
    { label: "Contact Us", to: "/contact" },
    { label: "FAQ", to: "/contact" },
    { label: "Track Order", to: "/cart" },
    { label: "Return Policy", to: "/contact" },
    { label: "Shipping Info", to: "/contact" },
  ],
  "Account": [
    { label: "My Profile", to: "/profile" },
    { label: "My Cart", to: "/cart" },
    { label: "My Wishlist", to: "/wishlist" },
    { label: "Order History", to: "/profile" },
  ],
};

const socials = [
  { icon: <Heart size={18} />, href: "#", label: "Instagram" },
  { icon: <MessageSquare size={18} />, href: "#", label: "Twitter" },
  { icon: <Globe size={18} />, href: "#", label: "Facebook" },
  { icon: <Play size={18} />, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        {/* Brand Column */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-icon">T</span>
            <span className="footer__logo-text">tony<span>.</span></span>
          </Link>
          <p className="footer__tagline">
            Your premium destination for electronics, fashion, home goods, and more. Shop smart, shop tony.
          </p>
          <div className="footer__contact-list">
            <a href="mailto:antonyl@gmail.com" className="footer__contact-item">
              <Mail size={15} /> antonyl@gmail.com
            </a>
            <a href="tel:83794393" className="footer__contact-item">
              <Phone size={15} /> 83794393
            </a>
            <span className="footer__contact-item">
              <MapPin size={15} /> Chennai, Tamil Nadu, India
            </span>
          </div>
          <div className="footer__socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="footer__social-btn" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title} className="footer__col">
            <h4 className="footer__col-title">{title}</h4>
            <ul className="footer__links">
              {links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="footer__link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div className="footer__newsletter">
          <h4 className="footer__col-title">Stay Updated</h4>
          <p className="footer__newsletter-text">Get exclusive deals and new arrivals right in your inbox.</p>
          <div className="footer__newsletter-form">
            <input type="email" placeholder="Enter your email" className="input" />
            <button className="btn btn-primary">Subscribe</button>
          </div>
          <div className="footer__badges">
            <div className="footer__badge"><ShoppingBag size={14} /> 150+ Products</div>
            <div className="footer__badge">🚚 Free Shipping</div>
            <div className="footer__badge">🔒 Secure Payments</div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} Tony Catalog. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
