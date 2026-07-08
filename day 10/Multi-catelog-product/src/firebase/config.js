// ============================================================
// FIREBASE CONFIG — Replace these values with your own!
// Steps:
// 1. Go to https://console.firebase.google.com
// 2. Create a project named "tony-catalog"
// 3. Add a Web App to the project
// 4. Copy the firebaseConfig object and paste below
// 5. Enable Authentication → Google Sign-In method
// 6. Enable Firestore Database (start in test mode)
// ============================================================

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export default app;
