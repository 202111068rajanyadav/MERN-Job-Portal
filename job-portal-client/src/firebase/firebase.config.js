// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBnFgGeAgm5mwqi_p_wEtoYYpnwuDUzTg",
  authDomain: "job-portal-demo-a3bdc.firebaseapp.com",
  projectId: "job-portal-demo-a3bdc",
  storageBucket: "job-portal-demo-a3bdc.appspot.com",
  messagingSenderId: "120892390406",
  appId: "1:120892390406:web:2a5e0a09db0a6428655787"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;