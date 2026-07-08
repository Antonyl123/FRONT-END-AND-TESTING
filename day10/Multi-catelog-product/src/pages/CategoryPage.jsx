import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function CategoryPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const catName = decodeURIComponent(name);
  const catProducts = products.filter((p) => p.category === catName);
  const catInfo = categories.find((c) => c.name === catName);

  return (
    <div className="page-wrapper">
      <div style={{ background: catInfo?.gradient || "var(--gradient-hero)", padding: "60px 0 40px" }}>
        <div className="container">
          <button className="btn btn-secondary btn-sm" onClick={() => navigate(-1)} style={{ marginBottom: "16px", background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}>
            <ArrowLeft size={15} /> Back
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{ fontSize: "3.5rem" }}>{catInfo?.icon}</span>
            <div>
              <h1 style={{ fontSize: "2.5rem", fontWeight: 900, color: "white", letterSpacing: "-0.03em" }}>{catName}</h1>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem" }}>{catProducts.length} products available</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container section">
        {catProducts.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">😕</span>
            <h3>No products in this category</h3>
          </div>
        ) : (
          <div className="products-grid">
            {catProducts.map((p, i) => (
              <div key={p.id} style={{ animationDelay: `${i * 40}ms` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
