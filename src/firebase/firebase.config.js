// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8y4hrQ9bs7kLzpKUL_xrzcOa4JE8zxGY",
  authDomain: "ebay-cars.firebaseapp.com",
  projectId: "ebay-cars",
  storageBucket: "ebay-cars.appspot.com",
  messagingSenderId: "314226381611",
  appId: "1:314226381611:web:a8a18ca651ada9fe186b6e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
