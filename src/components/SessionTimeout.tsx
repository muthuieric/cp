"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const INACTIVITY_TIMEOUT_MS = 300000; // 5 minutes in milliseconds

export default function SessionTimeout() {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const handleLogout = useCallback(async () => {
    try {
      // 1. Clear Edge JWT cookie via logout API route
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      // 2. Also clear NextAuth client session if active
      try {
        await signOut({ redirect: false });
      } catch {
        // Ignore if next-auth is not in active session
      }
    } catch (err) {
      console.error("Session auto-logout error:", err);
    } finally {
      // 3. Force redirect to login page with timeout reason
      router.push("/login?reason=timeout");
      router.refresh();
    }
  }, [router]);

  const resetTimeout = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      handleLogout();
    }, INACTIVITY_TIMEOUT_MS);
  }, [handleLogout]);

  useEffect(() => {
    // Start initial 5-minute timer
    resetTimeout();

    // Standard user activity events
    const activityEvents = ["mousemove", "keydown", "click", "scroll"];

    // Throttled event listener to avoid unnecessary execution on high-frequency events
    const onUserActivity = () => {
      const now = Date.now();
      // Throttle reset calls to at most once per second
      if (now - lastActivityRef.current > 1000) {
        lastActivityRef.current = now;
        resetTimeout();
      }
    };

    activityEvents.forEach((event) => {
      window.addEventListener(event, onUserActivity, { passive: true });
    });

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      activityEvents.forEach((event) => {
        window.removeEventListener(event, onUserActivity);
      });
    };
  }, [resetTimeout]);

  return null;
}
