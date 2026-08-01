"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { onAuthChanged } from "@/lib/firebase/auth";
import { checkIsAdmin } from "@/lib/firebase/admin-check";

export function useAuth() {
  const { user, isAdmin, isLoading, setUser, setAdmin, setLoading } =
    useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const admin = await checkIsAdmin(firebaseUser.uid);
        setAdmin(admin);
      } else {
        setAdmin(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [setUser, setAdmin, setLoading]);

  return { user, isAdmin, isLoading };
}
