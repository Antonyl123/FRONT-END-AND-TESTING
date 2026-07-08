import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Star, Zap, Shield, Truck, ArrowRight, TrendingUp } from "lucide-react";
import { categories, products } from "../data/products";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const deals = products.filter((p) => ((p.originalPrice - p.price) / p.originalPrice) >= 0.2).slice(0, 8);
const featured = products.filter((p) => p.rating >= 4.7).slice(0, 10);
const newArrivals = [...products].sort(() => Math.random() - 0.5).slice(0, 8);

const heroSlides = [
  {
    badge: "New Launch 2026",
    title: "Next-Gen Electronics",
    subtitle: "Discover the latest smartphones, laptops, and gadgets at unbeatable prices.",
    cta: "Shop Electronics",
    link: "/category/Electronics",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #7c3aed 100%)",
    emoji: "📱",
  },
  {
    badge: "Trending Now",
    title: "Premium Fashion",
    subtitle: "Explore exclusive styles from top brands — from casuals to ethnic wear.",
    cta: "Shop Fashion",
    link: "/category/Fashion",
    gradient: "linear-gradient(135deg, #be185d 0%, #ec4899 50%, #f43f5e 100%)",
    emoji: "👗",
  },
  {
    badge: "Best Deals",
    title: "Home & Kitchen",
    subtitle: "Transform your living space with premium appliances and décor.",
    cta: "Shop Home",
    link: "/category/Home & Kitchen",
    gradient: "linear-gradient(135deg, #92400e 0%, #f59e0b 50%, #f97316 100%)",
    emoji: "🏠",
  },
];

const features = [
  { icon: <Truck size={24} />, title: "Free Shipping", desc: "On all orders above ₹999", color: "#2563eb" },
  { icon: <Shield size={24} />, title: "Secure Payments", desc: "100% protected transactions", color: "#10b981" },
  { icon: <Star size={24} />, title: "Top Rated", desc: "4.7+ avg customer rating", color: "#f59e0b" },
  { icon: <Zap size={24} />, title: "Fast Delivery", desc: "2-5 business days", color: "#7c3aed" },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <div className="page-wrapper">
      {/* ── Hero ── */}
      <section className="hero" style={{ background: slide.gradient }}>
        <div className="container hero__inner">
          <div className="hero__content fade-in" key={currentSlide}>
            <span className="hero__badge">{slide.badge}</span>
            <h1 className="hero__title">{slide.title}</h1>
            <p className="hero__subtitle">{slide.subtitle}</p>
            <div className="hero__ctas">
              <Link to={slide.link} className="btn btn-primary btn-lg hero__cta-primary">
                <ShoppingBag size={20} /> {slide.cta}
              </Link>
              <Link to="/products" className="btn hero__cta-secondary btn-lg">
                View All Products <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hero__stats">
              <div className="hero__stat"><strong>150+</strong><span>Products</span></div>
              <div className="hero__stat-divider" />
              <div className="hero__stat"><strong>8</strong><span>Categories</span></div>
              <div className="hero__stat-divider" />
              <div className="hero__stat"><strong>50K+</strong><span>Customers</span></div>
            </div>
          </div>
          <div className="hero__graphic" key={`g-${currentSlide}`}>
            <div className="hero__emoji-wrap">
              <span className="hero__emoji">{slide.emoji}</span>
            </div>
            <div className="hero__glow" />
          </div>
        </div>
        {/* Slide dots */}
        <div className="hero__dots">
          {heroSlides.map((_, i) => (
            <button key={i} className={`hero__dot ${i === currentSlide ? "hero__dot--active" : ""}`} onClick={() => setCurrentSlide(i)} />
          ))}
        </div>
      </section>

      {/* ── Features Bar ── */}
      <section className="features-bar">
        <div className="container features-bar__grid">
          {features.map((f) => (
            <div key={f.title} className="features-bar__item">
              <div className="features-bar__icon" style={{ background: f.color + "20", color: f.color }}>
                {f.icon}
              </div>
              <div>
                <p className="features-bar__title">{f.title}</p>
                <p className="features-bar__desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Shop by Category</h2>
              <p className="section-subtitle">Explore our wide range of product categories</p>
            </div>
            <Link to="/products" className="btn btn-secondary">View All <ArrowRight size={15} /></Link>
          </div>
          <div className="categories-grid">
            {categories.map((cat) => (
              <Link key={cat.name} to={`/category/${encodeURIComponent(cat.name)}`} className="category-card" style={{ "--cat-gradient": cat.gradient }}>
                <div className="category-card__icon">{cat.icon}</div>
                <div className="category-card__info">
                  <h3 className="category-card__name">{cat.name}</h3>
                  <p className="category-card__count">{cat.count} items</p>
                </div>
                <div className="category-card__arrow"><ArrowRight size={16} /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deals of the Day ── */}
      <section className="section deals-section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="deals-label"><Zap size={16} /> Deals of the Day</div>
              <h2 className="section-title">Hot Offers</h2>
              <p className="section-subtitle">Limited time deals — grab them before they're gone!</p>
            </div>
            <Link to="/products?sort=discount" className="btn btn-secondary">All Deals <ArrowRight size={15} /></Link>
          </div>
          <div className="products-grid">
            {deals.map((p, i) => (
              <div key={p.id} style={{ animationDelay: `${i * 50}ms` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Banner ── */}
      <section className="promo-banner">
        <div className="container promo-banner__inner">
          <div className="promo-banner__content">
            <span className="promo-banner__tag">Limited Time</span>
            <h2 className="promo-banner__title">Get 10% Off Your First Order!</h2>
            <p>Use code <strong>TONY10</strong> at checkout. Valid on all categories.</p>
            <Link to="/products" className="btn btn-primary btn-lg">Shop Now <ArrowRight size={18} /></Link>
          </div>
          <div className="promo-banner__graphic">
            <div className="promo-banner__circle">🎁</div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="deals-label"><TrendingUp size={16} /> Trending Now</div>
              <h2 className="section-title">Top Rated Products</h2>
              <p className="section-subtitle">Hand-picked by our customers with 4.7+ star ratings</p>
            </div>
            <Link to="/products?sort=rating" className="btn btn-secondary">See More <ArrowRight size={15} /></Link>
          </div>
          <div className="products-grid">
            {featured.map((p, i) => (
              <div key={p.id} style={{ animationDelay: `${i * 50}ms` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className="section" style={{ background: "var(--bg-card)" }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">New Arrivals</h2>
              <p className="section-subtitle">Fresh products just added to our catalog</p>
            </div>
            <Link to="/products" className="btn btn-secondary">View All <ArrowRight size={15} /></Link>
          </div>
          <div className="products-grid">
            {newArrivals.map((p, i) => (
              <div key={p.id} style={{ animationDelay: `${i * 50}ms` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: "center" }}>What Our Customers Say</h2>
          <p className="section-subtitle" style={{ textAlign: "center" }}>Trusted by 50,000+ happy customers</p>
          <div className="testimonials-grid">
            {[
              { name: "Priya S.", review: "Best shopping experience ever! The products are exactly as described and delivery was super fast. Will definitely order again!", rating: 5, product: "Samsung Galaxy S24", avatar: "https://i.pravatar.cc/60?img=47" },
              { name: "Rahul M.", review: "Tony catalog has become my go-to store for electronics. Amazing deals and the dark mode on the website is so cool!", rating: 5, product: "Sony WH-1000XM5", avatar: "https://i.pravatar.cc/60?img=12" },
              { name: "Anitha K.", review: "Huge variety of products at competitive prices. The fashion collection is outstanding. Loved my kurti purchase!", rating: 5, product: "Embroidered Kurti", avatar: "https://i.pravatar.cc/60?img=32" },
              { name: "Vikram P.", review: "Secure payment and easy returns. Customer service is excellent. Highly recommend Tony for all your shopping needs!", rating: 5, product: "Atomic Habits Book", avatar: "https://i.pravatar.cc/60?img=65" },
            ].map((t) => (
              <div key={t.name} className="testimonial-card card">
                <div className="testimonial-card__stars">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="testimonial-card__text">"{t.review}"</p>
                <div className="testimonial-card__footer">
                  <img src={t.avatar} alt={t.name} className="testimonial-card__avatar" />
                  <div>
                    <p className="testimonial-card__name">{t.name}</p>
                    <p className="testimonial-card__product">Bought: {t.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
