import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDCTEbILAwX5OYe7xWEfKT87EEoK6cDjc",
  authDomain: "ai-lit.firebaseapp.com",
  projectId: "ai-lit",
  storageBucket: "ai-lit.appspot.com",
  messagingSenderId: "1062536378260",
  appId: "1:1062536378260:web:4bdbad82dc90f6f39f8181",
  measurementId: "G-NCC0620GMK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const functions = getFunctions(app);
const db = getFirestore();

if (window.location.hostname === "localhost") {
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectFirestoreEmulator(db, "localhost", 8080);
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
