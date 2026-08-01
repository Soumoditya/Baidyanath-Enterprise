import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase web config values are safe to ship to the client (security is enforced
// by Firestore rules + Auth, not by hiding these). Env vars override the defaults.
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "AIzaSyB2U4-QIzdzRB8GxT1vA9MIvZWyx4E4PQs",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "baidyanath-enterprise.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "baidyanath-enterprise",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "502554745917",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:502554745917:web:ff2164c46229faf2da5e54",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
