"use client";

import PropertyForm from "@/components/PropertyForm";
import AdminAuthWrapper from "@/components/admin/AdminAuthWrapper";
import AdminSignOutButton from "@/components/admin/AdminSignOutButton";
import Link from "next/link";
import { Building2, LayoutDashboard, KeyRound } from "lucide-react";

export default function AdminPage() {
  return (
    <AdminAuthWrapper requiredRole="ADMIN">
      <div className="min-h-screen bg-[#F8FAFC] pt-16 sm:pt-20 pb-16 sm:pb-20">
        {/* Header matching Header/Footer/Homepage aesthetic */}
        <div className="bg-[#0F172A] py-8 sm:py-14 px-4 sm:px-6 mb-6 sm:mb-10 border-b border-white/5">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#14B8A6] text-[10px] tracking-[0.35em] uppercase font-semibold">
                  Institutional Management
                </span>
              </div>
              <h1
                className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
                style={{ fontFamily: "Cinzel, Georgia, serif" }}
              >
                Add New Commercial Property
              </h1>
              <p className="text-white/60 text-xs sm:text-sm mt-2 font-light max-w-2xl">
                Register Grade A commercial real estate assets into the PM Commercial portfolio. Enter floor plates, pricing structures, and upload high-resolution media.
              </p>
            </div>

            {/* Navigation & Sign Out controls */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 self-start md:self-center">
              <Link
                href="/admin-view"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-wider rounded-none transition-colors border border-white/10"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>Manage Properties</span>
              </Link>
              <Link
                href="/admin/settings"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-wider rounded-none transition-colors border border-white/10"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>Security</span>
              </Link>
              <AdminSignOutButton />
            </div>
          </div>
        </div>

        {/* Form Container with responsive padding */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <PropertyForm />
        </div>
      </div>
    </AdminAuthWrapper>
  );
}
