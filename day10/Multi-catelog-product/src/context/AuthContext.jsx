import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db, googleProvider } from "../firebase/config";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Save/update user in Firestore
        try {
          const userRef = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(userRef);
          if (!snap.exists()) {
            await setDoc(userRef, {
              uid: firebaseUser.uid,
              name: firebaseUser.displayName,
              email: firebaseUser.email,
              photoURL: firebaseUser.photoURL,
              createdAt: serverTimestamp(),
            });
          }
        } catch (err) {
          // Firebase not configured yet — silent fail in demo mode
          console.warn("Firestore not configured:", err.message);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Welcome back! 🎉");
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") return;
      toast.error("Sign-in failed. Please configure Firebase first.");
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully.");
    } catch (err) {
      toast.error("Logout failed.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
