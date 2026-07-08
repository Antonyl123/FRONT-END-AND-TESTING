import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Grid, List, ChevronDown, X, Search } from "lucide-react";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";
import "./ProductsPage.css";

const ITEMS_PER_PAGE = 24;

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const searchQ = searchParams.get("search") || "";
  const categoryQ = searchParams.get("category") || "";
  const sortQ = searchParams.get("sort") || "featured";
  const minPrice = Number(searchParams.get("min")) || 0;
  const maxPrice = Number(searchParams.get("max")) || 200000;

  const setParam = (key, val) => {
    const p = new URLSearchParams(searchParams);
    if (val) p.set(key, val); else p.delete(key);
    setSearchParams(p);
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (searchQ) list = list.filter((p) => p.name.toLowerCase().includes(searchQ.toLowerCase()) || p.brand.toLowerCase().includes(searchQ.toLowerCase()) || p.category.toLowerCase().includes(searchQ.toLowerCase()));
    if (categoryQ) list = list.filter((p) => p.category === categoryQ);
    list = list.filter((p) => p.price >= minPrice && p.price <= maxPrice);
    switch (sortQ) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "discount": list.sort((a, b) => ((b.originalPrice - b.price) / b.originalPrice) - ((a.originalPrice - a.price) / a.originalPrice)); break;
      default: list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [searchQ, categoryQ, sortQ, minPrice, maxPrice]);

  const paginated = filtered.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
        {/* Header */}
        <div className="products-page__header">
          <div>
            <h1 className="section-title">
              {searchQ ? `Results for "${searchQ}"` : categoryQ || "All Products"}
            </h1>
            <p className="section-subtitle">{filtered.length} products found</p>
          </div>
          <div className="products-page__controls">
            {/* Sort */}
            <div className="products-page__sort">
              <select className="input" style={{ width: "auto" }} value={sortQ} onChange={(e) => setParam("sort", e.target.value)}>
                <option value="featured">Featured</option>
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Best Discount</option>
              </select>
            </div>
            {/* Filter toggle */}
            <button className={`btn btn-secondary ${filtersOpen ? "btn-primary" : ""}`} onClick={() => setFiltersOpen((o) => !o)}>
              <SlidersHorizontal size={16} /> Filters
            </button>
            {/* View toggle */}
            <div className="products-page__view-toggle">
              <button className={`btn-ghost ${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")}><Grid size={18} /></button>
              <button className={`btn-ghost ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")}><List size={18} /></button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(searchQ || categoryQ || sortQ !== "featured") && (
          <div className="products-page__active-filters">
            <span style={{ fontSize: "0.82rem", color: "var(--txt-muted)" }}>Active:</span>
            {searchQ && <span className="chip active">Search: {searchQ} <X size={12} onClick={() => setParam("search", "")} /></span>}
            {categoryQ && <span className="chip active">{categoryQ} <X size={12} onClick={() => setParam("category", "")} /></span>}
            <button className="btn btn-secondary btn-sm" onClick={() => { setSearchParams({}); setPage(1); }}>Clear All</button>
          </div>
        )}

        <div className={`products-page__layout ${filtersOpen ? "products-page__layout--with-sidebar" : ""}`}>
          {/* Sidebar Filters */}
          {filtersOpen && (
            <aside className="products-page__sidebar card scale-in">
              <div className="products-page__sidebar-header">
                <h3>Filters</h3>
                <button className="btn-ghost" onClick={() => setFiltersOpen(false)}><X size={18} /></button>
              </div>

              {/* Category */}
              <div className="filter-group">
                <h4 className="filter-group__title">Category</h4>
                <div className="filter-group__options">
                  <label className={`filter-option ${!categoryQ ? "active" : ""}`} onClick={() => setParam("category", "")}>
                    All Categories <span>{products.length}</span>
                  </label>
                  {categories.map((c) => (
                    <label key={c.name} className={`filter-option ${categoryQ === c.name ? "active" : ""}`} onClick={() => setParam("category", c.name)}>
                      {c.icon} {c.name} <span>{c.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="filter-group">
                <h4 className="filter-group__title">Price Range</h4>
                {[
                  { label: "Under ₹500", min: 0, max: 500 },
                  { label: "₹500 – ₹2,000", min: 500, max: 2000 },
                  { label: "₹2,000 – ₹10,000", min: 2000, max: 10000 },
                  { label: "₹10,000 – ₹50,000", min: 10000, max: 50000 },
                  { label: "Above ₹50,000", min: 50000, max: 200000 },
                ].map((r) => (
                  <label key={r.label} className={`filter-option ${minPrice === r.min && maxPrice === r.max ? "active" : ""}`}
                    onClick={() => { setParam("min", r.min); setParam("max", r.max); }}>
                    {r.label}
                  </label>
                ))}
              </div>

              {/* Rating */}
              <div className="filter-group">
                <h4 className="filter-group__title">Min Rating</h4>
                {[4.5, 4, 3.5].map((r) => (
                  <label key={r} className="filter-option" onClick={() => setParam("sort", "rating")}>
                    {"⭐".repeat(Math.floor(r))} {r}+
                  </label>
                ))}
              </div>
            </aside>
          )}

          {/* Product Grid */}
          <div className="products-page__main">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">🔍</span>
                <h3>No products found</h3>
                <p>Try adjusting your search or filters</p>
                <button className="btn btn-primary" style={{ marginTop: "20px" }} onClick={() => setSearchParams({})}>Clear Filters</button>
              </div>
            ) : (
              <>
                <div className={viewMode === "list" ? "products-list" : "products-grid"}>
                  {paginated.map((p, i) => (
                    <div key={p.id} style={{ animationDelay: `${(i % 24) * 30}ms` }}>
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
                {hasMore && (
                  <div style={{ textAlign: "center", marginTop: "var(--space-xl)" }}>
                    <button className="btn btn-primary btn-lg" onClick={() => setPage((p) => p + 1)}>
                      Load More ({filtered.length - paginated.length} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
