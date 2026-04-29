import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLLHB-MTwBtT0woZCVX91RJHnv466SHmg",
  authDomain: "dutarajacv.firebaseapp.com",
  databaseURL: "https://dutarajacv-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dutarajacv",
  storageBucket: "dutarajacv.firebasestorage.app",
  messagingSenderId: "655291521818",
  appId: "1:655291521818:web:cc27220d3d5e0218f52aa3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
