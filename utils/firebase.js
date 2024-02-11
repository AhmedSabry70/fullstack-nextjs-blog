// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const{STORAGE_BUCKET : nnn}= process.env

const firebaseConfig = {
  /* apiKey: process.env.FIREBASE,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID */
  apiKey: process.env.FIREBASE,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket:  "next-js-blog-2b9cf.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
