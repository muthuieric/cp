"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Building2, Lock, Mail, ShieldCheck, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin-view";

  const [email, setEmail] = useState("admin@pmcommercial.com");
  const [password, setPassword] = useState("admin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (res?.error) {
        setError("Invalid institutional credentials. Please check your corporate email and password.");
      } else if (res?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: any) {
      setError("An unexpected authentication error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <Link href="/" className="flex flex-col items-center group cursor-pointer mb-3">
            <span
              className="text-[#0F766E] font-bold tracking-widest text-3xl group-hover:text-[#14B8A6] transition-colors"
              style={{ fontFamily: "Cinzel, Georgia, serif" }}
            >
              PM
            </span>
            <span className="text-[#0F172A]/70 text-[11px] tracking-[0.3em] uppercase mt-[-3px]">
              Commercial
            </span>
          </Link>  
  
          <h2
            className="text-2xl font-bold text-[#0F172A] tracking-tight"
            style={{ fontFamily: "Cinzel, Georgia, serif" }}
          >
            Access Gate
          </h2>
       
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/90 backdrop-blur-md py-8 px-6 sm:px-10 border border-slate-200/90 rounded-2xl shadow-xl">
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700 animate-in fade-in-50">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@pmcommercial.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-lg text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-lg text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
                />
              </div>
            </div>

            {/* Quick-credentials helper pill */}
            {/* <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-[11px] text-slate-600 space-y-1"> */}
              {/* <div className="flex items-center gap-1.5 font-semibold text-[#0F766E]"> */}
                {/* <CheckCircle2 className="w-3.5 h-3.5" /> */}
                {/* <span>Authorized Admin Credentials:</span> */}
              {/* </div> */}
              {/* <p className="font-mono text-[10px] text-slate-500"> */}
                {/* Email: <span className="text-[#0F172A] font-bold">admin@pmcommercial.com</span> &middot; Password: <span className="text-[#0F172A] font-bold">admin</span> */}
              {/* </p> */}
            {/* </div> */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-lg transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? "Authenticating Session..." : "Authorize Access"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="mt-2 pt-5 border-t border-slate-100 text-center">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-[#0F766E] transition-colors font-medium inline-flex items-center gap-1"
            >
              <span>&larr; Return to PM Commercial Public Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
