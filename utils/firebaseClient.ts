import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAnalytics } from "firebase/analytics";

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

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
const db = getFirestore(app);
const analytics = getAnalytics(app);
export { db, analytics };
