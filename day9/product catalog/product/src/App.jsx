import React, { useState } from "react";
import "./App.css";

function App() {
  const productsData = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      category: "Mobiles",
      price: 129999,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    },
    {
      id: 2,
      name: "Gaming Laptop",
      category: "Laptops",
      price: 89999,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
    },
    {
      id: 3,
      name: "Smart Watch",
      category: "Accessories",
      price: 15999,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
      id: 4,
      name: "Wireless Headphones",
      category: "Accessories",
      price: 8999,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 5,
      name: "DSLR Camera",
      category: "Cameras",
      price: 55999,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
    },
    {
      id: 6,
      name: "Bluetooth Speaker",
      category: "Accessories",
      price: 4999,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1589003077984-894e133dabab"
    }
  ];

  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = productsData.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🛍 Product Catalog</h1>
        <div className="cart">🛒 Cart ({cartCount})</div>
      </header>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p className="category">{product.category}</p>
            <p className="price">₹{product.price.toLocaleString()}</p>
            <p className="rating">⭐ {product.rating}</p>

            <button onClick={addToCart}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;