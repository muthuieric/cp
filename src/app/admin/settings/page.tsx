"use client";

import { useState } from "react";
import Link from "next/link";
import {
  KeyRound,
  Shield,
  Lock,
  Check,
  AlertCircle,
  LayoutDashboard,
  Building2,
  Eye,
  EyeOff
} from "lucide-react";
import AdminAuthWrapper from "@/components/admin/AdminAuthWrapper";
import AdminSignOutButton from "@/components/admin/AdminSignOutButton";

export default function AdminSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setStatusMessage({ type: "error", text: "Please fill in all required password fields." });
      return;
    }

    if (newPassword.length < 6) {
      setStatusMessage({ type: "error", text: "New password must be at least 6 characters long." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatusMessage({ type: "error", text: "New password and confirmation password do not match." });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update credentials.");
      }

      setStatusMessage({
        type: "success",
        text: data.message || "Admin access credentials have been securely updated.",
      });

      // Clear fields on success
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "Network error updating credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminAuthWrapper requiredRole="ADMIN">
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pt-16 sm:pt-20 pb-16 sm:pb-20">
        {/* ── HEADER BANNER (Matching Admin / Header aesthetic) ── */}
        <div className="bg-[#0F172A] py-8 sm:py-14 px-4 sm:px-6 mb-6 sm:mb-10 border-b border-white/5">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-[#14B8A6]" />
                <span className="text-[#14B8A6] text-[10px] tracking-[0.35em] uppercase font-semibold">
                  Security Administration
                </span>
              </div>
              <h1
                className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
                style={{ fontFamily: "Cinzel, Georgia, serif" }}
              >
                Institutional Security & Credentials
              </h1>
              <p className="text-white/60 text-xs sm:text-sm mt-2 font-light max-w-xl">
                Manage cryptographic authentication credentials, rotate administrator passwords, and verify database access policies.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 self-start md:self-center">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-wider rounded-none transition-colors border border-white/10"
              >
                <Building2 className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>Asset Intake</span>
              </Link>
              <Link
                href="/admin-view"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-wider rounded-none transition-colors border border-white/10"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>Manage Properties</span>
              </Link>
              <AdminSignOutButton />
            </div>
          </div>
        </div>

        {/* ── MAIN SETTINGS CONTAINER ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            {/* Left Column: Form Card */}
            <div className="md:col-span-7 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-none shadow-sm">
              <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-slate-100">
                <div className="w-9 h-9 bg-[#0F766E]/10 flex items-center justify-center text-[#0F766E]">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h2
                    className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight"
                    style={{ fontFamily: "Cinzel, Georgia, serif" }}
                  >
                    Update Password
                  </h2>
                  <p className="text-xs text-slate-500 font-light mt-0.5">
                    
                  </p>
                </div>
              </div>

              {/* Status Alert */}
              {statusMessage && (
                <div
                  className={`p-4 mb-6 text-xs flex items-start gap-3 rounded-none border ${
                    statusMessage.type === "success"
                      ? "bg-[#0F766E]/10 border-[#0F766E]/30 text-[#0F766E]"
                      : "bg-rose-50 border-rose-200 text-rose-700"
                  }`}
                >
                  {statusMessage.type === "success" ? (
                    <Check className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Current Password */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#0F172A] font-bold mb-1.5">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      required
                      className="w-full bg-white border border-slate-200 px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#0F766E] rounded-none pr-11 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0F172A]"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#0F172A] font-bold mb-1.5">
                    New Secure Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      required
                      className="w-full bg-white border border-slate-200 px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#0F766E] rounded-none pr-11 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0F172A]"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#0F172A] font-bold mb-1.5">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-type new password"
                    required
                    className="w-full bg-white border border-slate-200 px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#0F766E] rounded-none transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold uppercase tracking-widest transition-colors rounded-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{loading ? "Saving Credentials..." : "Update Password"}</span>
                </button>
              </form>
            </div>

            {/* Right Column: Security Policy & Audit Info */}
            <div className="md:col-span-5 space-y-6">
              <div className="bg-white border border-slate-200/90 p-6 rounded-none shadow-sm">
                <span className="text-[10px] uppercase tracking-widest text-[#0F766E] font-bold block mb-2">
                  
                </span>
                <h3
                  className="text-base font-bold text-[#0F172A] mb-3"
                  style={{ fontFamily: "Cinzel, Georgia, serif" }}
                >
                  
                </h3>
                <ul className="space-y-3 text-xs text-slate-600 font-light leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-3.5 h-3.5 text-[#0F766E] shrink-0 mt-0.5" />
                    <span>Passwords are salted and hashed using industrial-grade <code>bcryptjs</code> (10 rounds).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-3.5 h-3.5 text-[#0F766E] shrink-0 mt-0.5" />
                    <span>Plaintext credentials are never committed, logged, or serialized to client-side bundles.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-3.5 h-3.5 text-[#0F766E] shrink-0 mt-0.5" />
                    <span>Session invalidation occurs across active JWT tokens upon authentication renegotiation.</span>
                  </li>
                </ul>
              </div>

              <div className="border border-slate-200 bg-white p-6 rounded-none shadow-sm">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-1">
                  Account Identifier
                </span>
                <p className="text-xs text-[#0F172A] font-mono font-medium">admin@pmcommercial.com</p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Role: Institutional Admin</span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminAuthWrapper>
  );
}
