import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARmtGGpu8WDdR8_80dfmrHGuRaU1V7o2M",
  authDomain: "portfolio-d240a.firebaseapp.com",
  projectId: "portfolio-d240a",
  storageBucket: "portfolio-d240a.firebasestorage.app",
  messagingSenderId: "545284678492",
  appId: "1:545284678492:web:11e9452c8b05de5a815799",
  measurementId: "G-PM8QB2HF81"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
