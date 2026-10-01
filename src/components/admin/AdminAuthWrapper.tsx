"use client";

import React, { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { ShieldAlert } from "lucide-react";

interface AdminAuthWrapperProps {
  children: ReactNode;
  requiredRole?: "SUPERADMIN" | "ADMIN" | "PORTFOLIO_MANAGER";
}

export default function AdminAuthWrapper({
  children,
  requiredRole = "ADMIN",
}: AdminAuthWrapperProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [status, router, pathname]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-9 h-9 border-2 border-[#0F766E] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs uppercase tracking-widest text-[#0F172A] font-semibold">
          Verifying Institutional Authorization...
        </p>
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-10 h-10 text-rose-600 mb-3" />
        <h2 className="text-xl font-bold text-[#0F172A] mb-1" style={{ fontFamily: "Cinzel, serif" }}>
          Authentication Required
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Redirecting to executive authentication portal...
        </p>
      </div>
    );
  }

  return <div className="admin-portal-auth-boundary">{children}</div>;
}
