// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUjB9jhuXN0GKAX8CaXFuJcWCBddWIVMI",
  authDomain: "podcast-app-c47df.firebaseapp.com",
  projectId: "podcast-app-c47df",
  storageBucket: "podcast-app-c47df.appspot.com",
  messagingSenderId: "99171360090",
  appId: "1:99171360090:web:b6a8659f693825dc5e6763",
  measurementId: "G-01MFCJX9B1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// firebase database
const db = getFirestore(app);
// firebase storage
const storage = getStorage(app);
// firebase authentication
const auth = getAuth(app);

export { db, storage, auth };
