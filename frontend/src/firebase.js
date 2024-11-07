// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyABW-llErHf20a_o-kVGHcSYStaAuj6p_0",
  authDomain: "launchleap-d932c.firebaseapp.com",
  projectId: "launchleap-d932c",
  storageBucket: "launchleap-d932c.firebasestorage.app",
  messagingSenderId: "181899503299",
  appId: "1:181899503299:web:3ee13390b7393e987ea476",
  measurementId: "G-CF50R1WNGW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// const firestore = getFirestore(app);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;