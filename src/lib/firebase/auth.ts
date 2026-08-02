import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "./config";

export async function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

/** Register a new customer account. Identity lives in Firebase Auth. */
export async function signUp(
  email: string,
  password: string,
  displayName: string
) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName.trim()) {
    await updateProfile(cred.user, { displayName: displayName.trim() });
  }
  return cred;
}

export async function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

export async function signOut() {
  return firebaseSignOut(auth);
}

export function onAuthChanged(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

/** Turn Firebase's error codes into plain language for non-technical users. */
export function authErrorMessage(err: unknown): string {
  const code =
    typeof err === "object" && err !== null && "code" in err
      ? String((err as { code: unknown }).code)
      : "";
  switch (code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Please sign in instead.";
    case "auth/weak-password":
      return "Password is too short. Please use at least 6 characters.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network problem. Please check your connection and try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}
