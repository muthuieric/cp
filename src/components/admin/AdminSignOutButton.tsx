"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function AdminSignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer border border-white/10 shadow-sm"
      title="Terminate admin session"
    >
      <LogOut className="w-3.5 h-3.5 text-[#14B8A6]" />
      <span>Sign Out</span>
    </button>
  );
}
