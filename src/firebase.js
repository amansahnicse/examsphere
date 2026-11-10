import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAANdgdFIgT4RU-BPgQ80ZVpl1C4ZiD_w4",
  authDomain: "examshpere.firebaseapp.com",
  projectId: "examshpere",
  storageBucket: "examshpere.firebasestorage.app",
  messagingSenderId: "737122421675",
  appId: "1:737122421675:web:734b51b0e23f1f948ba0ee",
  measurementId: "G-YTJLNNNPQJ"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;