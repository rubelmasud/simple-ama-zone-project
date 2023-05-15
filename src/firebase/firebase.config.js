// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfxkMzJAU6I_BEV9A3XkCCzBiZ1K8m8c8",
    authDomain: "ema-john-firebase-auth-21c3f.firebaseapp.com",
    projectId: "ema-john-firebase-auth-21c3f",
    storageBucket: "ema-john-firebase-auth-21c3f.appspot.com",
    messagingSenderId: "1025532490711",
    appId: "1:1025532490711:web:8aad40c3e8892b75775192"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app