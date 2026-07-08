import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("tony-wishlist")) || []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("tony-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const isIn = prev.some((i) => i.id === product.id);
      if (isIn) {
        toast.success("Removed from wishlist.");
        return prev.filter((i) => i.id !== product.id);
      }
      toast.success("Added to wishlist! ❤️");
      return [...prev, product];
    });
  };

  const isInWishlist = (id) => wishlist.some((i) => i.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
