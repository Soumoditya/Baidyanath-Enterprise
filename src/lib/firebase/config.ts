import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, getFirestore } from "firebase/firestore";
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

const isNew = getApps().length === 0;
const app = isNew ? initializeApp(firebaseConfig) : getApp();

/*
 * Firestore's default WebChannel transport is often blocked or reset by
 * restrictive mobile networks and proxies, leaving customers on an apparently
 * empty store. Auto-detecting long-polling falls back to plain HTTP when that
 * happens, which matters on patchy connections.
 */
export const db = isNew
  ? initializeFirestore(app, { experimentalAutoDetectLongPolling: true })
  : getFirestore(app);

export const auth = getAuth(app);
