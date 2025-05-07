// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDszTK90ZtPq__mb43EA6vi4n-ffp75zkA",
  authDomain: "lifeplannerapp-42ec1.firebaseapp.com",
  projectId: "lifeplannerapp-42ec1",
  storageBucket: "lifeplannerapp-42ec1.firebasestorage.app",
  messagingSenderId: "519526840125",
  appId: "1:519526840125:web:6f7939b2e14c952b16b754",
  measurementId: "G-CJSDL5ES3X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);