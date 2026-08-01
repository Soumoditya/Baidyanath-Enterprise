import { doc, getDoc } from "firebase/firestore";
import { db } from "./config";

export async function checkIsAdmin(uid: string): Promise<boolean> {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc.exists()) return false;
    return userDoc.data().role === "admin";
  } catch {
    return false;
  }
}
