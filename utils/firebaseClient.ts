// Import the functions you need from the SDKs you need
// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
import admin from "firebase-admin";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvqNbgQ7uNJcXkKa6S1XPA89NaQLHhjxo",
  authDomain: "nativai.firebaseapp.com",
  projectId: "nativai",
  storageBucket: "nativai.appspot.com",
  messagingSenderId: "1075824541262",
  appId: "1:1075824541262:web:99d03a1d5adc9f75954d1f",
  measurementId: "G-R2CNCP57QV",
};

// // Initialize Firebase
// if (!getApps().length) {
//   const app = initializeApp(firebaseConfig);
// } else {
//   const app = getApp(); // if already initialized, use that one
// }
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);

// export { db };

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });
  } catch (error) {
    console.log("Firebase admin initialization error", error.stack);
  }
}
export default admin.firestore();
