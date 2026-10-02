import { getPropertiesSafe } from "@/lib/prisma";
import AdminPropertiesTable from "@/components/AdminPropertiesTable";
import AdminAuthWrapper from "@/components/admin/AdminAuthWrapper";
import AdminSignOutButton from "@/components/admin/AdminSignOutButton";
import Link from "next/link";
import { Building2, DollarSign, Maximize2, PlusCircle, KeyRound } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminViewPage() {
  const properties = await getPropertiesSafe();

  const formatted = properties.map((p) => ({
    id: p.id,
    title: p.title,
    location: p.location,
    price: p.price,
    type: p.type,
    status: p.status,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: p.area || 0,
    images: p.images || [],
  }));

  const totalAssets = formatted.length;
  const pipelineValuation = formatted.reduce((sum, p) => sum + Number(p.price), 0);
  const totalSqFt = formatted.reduce((sum, p) => sum + Number(p.area || 0), 0);

  const formatVal = (n: number) => {
    if (n >= 1_000_000_000) return `Ksh ${(n / 1_000_000_000).toFixed(2)}B`;
    if (n >= 1_000_000) return `Ksh ${(n / 1_000_000).toFixed(0)}M`;
    return `Ksh ${n.toLocaleString()}`;
  };

  return (
    <AdminAuthWrapper requiredRole="ADMIN">
      <div className="min-h-screen bg-[#F8FAFC] pt-16 sm:pt-20 pb-16 sm:pb-20">
        {/* Header */}
        <div className="bg-[#0F172A] py-8 sm:py-14 px-4 sm:px-6 mb-6 sm:mb-10 border-b border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[#14B8A6] text-[10px] tracking-[0.35em] uppercase font-semibold block mb-2">
                Properties Dashboard
              </span>
              <h1
                className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
                style={{ fontFamily: "Cinzel, Georgia, serif" }}
              >
                Commercial Properties
              </h1>
              <p className="text-white/60 text-xs sm:text-sm mt-2 font-light">
                Overview of commercial properties for rent, floor area, and monthly lease pricing.
              </p>
            </div>

            {/* Navigation & Sign Out controls */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 self-start md:self-center">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold uppercase tracking-wider rounded-none sm:rounded-lg transition-colors shadow-sm"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Property</span>
              </Link>
              <Link
                href="/admin/settings"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-wider rounded-none sm:rounded-lg transition-colors border border-white/10"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>Settings</span>
              </Link>
              <AdminSignOutButton />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-10">
            <div className="bg-white border border-slate-200/90 rounded-none sm:rounded-xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-none sm:rounded-lg bg-[#0F172A] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#14B8A6]" />
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Total Properties
                </span>
              </div>
              <span
                className="text-[#0F766E] text-2xl sm:text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "Cinzel, Georgia, serif" }}
              >
                {totalAssets}
              </span>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-none sm:rounded-xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-none sm:rounded-lg bg-[#0F172A] flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[#14B8A6]" />
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Total Monthly Rent
                </span>
              </div>
              <span
                className="text-[#0F766E] text-2xl sm:text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "Cinzel, Georgia, serif" }}
              >
                {formatVal(pipelineValuation)}
              </span>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-none sm:rounded-xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-none sm:rounded-lg bg-[#0F172A] flex items-center justify-center">
                  <Maximize2 className="w-5 h-5 text-[#14B8A6]" />
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Total Space
                </span>
              </div>
              <span
                className="text-[#0F766E] text-2xl sm:text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "Cinzel, Georgia, serif" }}
              >
                {totalSqFt.toLocaleString()} sqft
              </span>
            </div>
          </div>

          {/* Full Admin Table with Control Bar, Edit, and Delete */}
          <AdminPropertiesTable properties={formatted} />
        </div>
      </div>
    </AdminAuthWrapper>
  );
}
