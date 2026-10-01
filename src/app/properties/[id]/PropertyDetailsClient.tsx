"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ArrowLeft,
  Check,
  ShieldCheck,
  Building2,
  Calendar,
  Maximize2,
  Users,
  Layers,
  Camera,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Receipt
} from "lucide-react";
import { COMMERCIAL_ASSETS, CommercialProperty } from "../page";

function getPropertyById(id: string): CommercialProperty | undefined {
  return (
    COMMERCIAL_ASSETS.find((p) => p.id === id) ||
    COMMERCIAL_ASSETS.find((p) => String(p.id).toLowerCase() === String(id).toLowerCase()) ||
    COMMERCIAL_ASSETS.find((p) => String(p.id).endsWith(String(id).padStart(4, "0"))) ||
    (!isNaN(Number(id)) && Number(id) >= 1 && Number(id) <= COMMERCIAL_ASSETS.length
      ? COMMERCIAL_ASSETS[Number(id) - 1]
      : undefined) ||
    COMMERCIAL_ASSETS[0]
  );
}

export default function PropertyDetailPage({ propertyId }: { propertyId: string }) {
  const property = getPropertyById(propertyId);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] text-[#0F172A] pt-24 px-6 text-center">
        <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: "Cinzel, Georgia, serif" }}>
          Commercial Asset Not Found
        </h1>
        <p className="text-slate-500 mb-6 text-sm max-w-md">
          The requested commercial asset dossier does not exist in the PM Commercial institutional registry.
        </p>
        <Link
          href="/properties"
          className="px-6 py-3 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs uppercase font-semibold tracking-wider rounded-lg transition-colors"
        >
          Return to Commercial Portfolio
        </Link>
      </div>
    );
  }

  const imagesList = property.images && property.images.length > 0 ? property.images : [property.image];
  const activeImage = imagesList[activeImageIndex] || property.image;

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % imagesList.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  const thesisParagraphs = property.investmentThesis.split("\n").filter((p) => p.trim());

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-xs uppercase font-semibold tracking-wider text-slate-500 hover:text-[#0F766E] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Commercial Assets</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT COLUMN — High-End Image Gallery, Financial Breakdown, Thesis, Amenities */}
          <div className="lg:col-span-2 space-y-10">
            {/* ─── HIGH-END IMAGE GALLERY ─────────────────────────── */}
            <div className="space-y-4">
              {/* Featured Large View */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 rounded-xl border border-slate-200/90 shadow-md group">
                <Image
                  src={activeImage}
                  alt={`${property.name} - View ${activeImageIndex + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover object-center transition-all duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-transparent opacity-40 pointer-events-none" />

                {/* Badges on Top */}
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
                  <span className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider bg-[#0F172A] text-white rounded-lg shadow-sm">
                    {property.category}
                  </span>
                  <span className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-sm text-[#0F766E] border border-slate-200 rounded-lg shadow-sm">
                    {property.status}
                  </span>
                </div>

                {/* Photo Counter Pill on Top Right */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md text-[#0F172A] border border-white/40 shadow-sm text-xs font-semibold z-10">
                  <Camera className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>
                    {activeImageIndex + 1} of {imagesList.length} Views
                  </span>
                </div>

                {/* Navigation Arrows */}
                {imagesList.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevImage}
                      aria-label="Previous view"
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white backdrop-blur-md text-[#0F172A] flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
                    >
                      <ChevronLeft className="w-5 h-5 text-[#0F172A]" />
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      aria-label="Next view"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white backdrop-blur-md text-[#0F172A] flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
                    >
                      <ChevronRight className="w-5 h-5 text-[#0F172A]" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Row */}
              {imagesList.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {imagesList.map((imgUrl, idx) => {
                    const isActive = idx === activeImageIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative aspect-[4/3] rounded-lg overflow-hidden border transition-all cursor-pointer bg-slate-100 ${
                          isActive
                            ? "border-[#0F766E] ring-2 ring-[#0F766E]/50 shadow-md"
                            : "border-slate-200 hover:border-slate-400 opacity-75 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={imgUrl}
                          alt={`${property.name} thumbnail ${idx + 1}`}
                          fill
                          sizes="180px"
                          className="object-cover"
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-[#0F766E]/15 border-2 border-[#0F766E] rounded-lg pointer-events-none" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ─── FINANCIAL METRICS & PRICING BREAKDOWN CARD ──────── */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-[#0F766E] rounded-full" />
                  <h2
                    className="text-xl font-bold uppercase tracking-wider text-[#0F172A]"
                    style={{ fontFamily: "Cinzel, Georgia, serif" }}
                  >
                    Financial Terms &amp; Pricing Breakdown
                  </h2>
                </div>
                <span className="text-xs font-semibold text-[#0F766E] bg-[#0F766E]/10 px-3 py-1 rounded-full">
                  {property.isLease ? "Leasehold Structure" : "Freehold Acquisition"}
                </span>
              </div>

              {/* Explicit Pricing Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {property.isLease ? (
                  <>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold mb-1">
                        Base Rent
                      </span>
                      <p className="text-lg font-bold text-[#0F172A]">
                        {property.baseRent || "Ksh 80 / sq.ft"}
                      </p>
                      <span className="text-[11px] text-slate-400">Exclusive of VAT</span>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold mb-1">
                        Service Charge
                      </span>
                      <p className="text-lg font-bold text-[#0F766E]">
                        {property.serviceCharge || "Ksh 20 / sq.ft"}
                      </p>
                      <span className="text-[11px] text-slate-400">Inc. security, generator, common water</span>
                    </div>

                    <div className="p-4 bg-[#0F172A] text-white rounded-lg">
                      <span className="text-[10px] text-[#14B8A6] uppercase tracking-wider block font-semibold mb-1">
                        Total Effective Rate
                      </span>
                      <p className="text-lg font-bold text-white">
                        {property.priceDisplay}
                      </p>
                      <span className="text-[11px] text-white/60">Payable quarterly in advance</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold mb-1">
                        Capital Valuation
                      </span>
                      <p className="text-lg font-bold text-[#0F172A]">
                        {property.priceDisplay}
                      </p>
                      <span className="text-[11px] text-slate-400">Verified by RICS valuation</span>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold mb-1">
                        Target Cap Rate
                      </span>
                      <p className="text-lg font-bold text-[#0F766E]">
                        {property.capRateDisplay}
                      </p>
                      <span className="text-[11px] text-slate-400">Based on passing net operating income</span>
                    </div>

                    <div className="p-4 bg-[#0F172A] text-white rounded-lg">
                      <span className="text-[10px] text-[#14B8A6] uppercase tracking-wider block font-semibold mb-1">
                        Projected Net Yield
                      </span>
                      <p className="text-lg font-bold text-white">
                        {property.yieldDisplay}
                      </p>
                      <span className="text-[11px] text-white/60">Annualized inflation indexed</span>
                    </div>
                  </>
                )}
              </div>

              {/* Floor Plate and Tenant Mix Summary Row */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <Layers className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#0F172A] block">Typical Floor Plate</span>
                    <span className="text-xs text-slate-600 font-light">{property.floorPlate}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <Users className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#0F172A] block">Tenant Mix Profile</span>
                    <span className="text-xs text-slate-600 font-light">{property.tenantMix}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── INVESTMENT THESIS ──────────────────────────────── */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="w-1.5 h-6 bg-[#0F766E] rounded-full" />
                <h2
                  className="text-xl font-bold uppercase tracking-wider text-[#0F172A]"
                  style={{ fontFamily: "Cinzel, Georgia, serif" }}
                >
                  Institutional Investment Thesis
                </h2>
              </div>
              <div className="space-y-4">
                {thesisParagraphs.map((para, i) => (
                  <p key={i} className="text-slate-600 text-[15px] leading-relaxed font-light">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* ─── COMMERCIAL INFRASTRUCTURE & AMENITIES ─────────── */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="w-1.5 h-6 bg-[#0F766E] rounded-full" />
                <h2
                  className="text-xl font-bold uppercase tracking-wider text-[#0F172A]"
                  style={{ fontFamily: "Cinzel, Georgia, serif" }}
                >
                  Commercial Infrastructure &amp; Technical Amenities
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {property.amenities.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200/80 rounded-lg"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-xs uppercase font-semibold tracking-wider text-[#0F172A]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── INSTITUTIONAL SAFEGUARDS ──────────────────────── */}
            <div className="bg-[#0F172A] p-8 rounded-xl text-white space-y-4 border border-white/5 shadow-md">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#14B8A6]" />
                <h3
                  className="text-base font-bold uppercase tracking-wider text-white"
                  style={{ fontFamily: "Cinzel, Georgia, serif" }}
                >
                  Due Diligence &amp; Commercial Fiduciary Governance
                </h3>
              </div>
              <ul className="space-y-3 pt-2">
                <li className="flex items-start gap-3">
                  <span className="text-[#0F766E] mt-1">&#9670;</span>
                  <span className="text-white/70 text-xs leading-relaxed font-light">
                    Title Deed authenticated with Nairobi Land Registry &amp; Ministry of Lands clearance.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0F766E] mt-1">&#9670;</span>
                  <span className="text-white/70 text-xs leading-relaxed font-light">
                    Complete structural, MEP, and civil engineering verification completed by accredited assessors.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0F766E] mt-1">&#9670;</span>
                  <span className="text-white/70 text-xs leading-relaxed font-light">
                    Commercial tenant leases verified with enforceable legal covenants and verified rent collection track record.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN — Sticky Summary Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-xl shadow-lg overflow-hidden">
              {/* Card Header */}
              <div className="bg-[#0F172A] px-6 py-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#14B8A6] text-[10px] tracking-[0.25em] uppercase font-bold">
                    {property.category}
                  </span>
                  <span className="border border-white/20 text-white/80 text-[10px] tracking-[0.15em] uppercase font-semibold px-2 py-0.5 rounded">
                    {property.status}
                  </span>
                </div>
                <h1
                  className="text-white text-lg font-bold leading-snug"
                  style={{ fontFamily: "Cinzel, Georgia, serif" }}
                >
                  {property.name}
                </h1>
                <div className="flex items-center gap-1.5 mt-2 text-white/60 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>{property.location}</span>
                </div>
              </div>

              {/* Price Row */}
              <div className="px-6 py-5 border-b border-slate-100 bg-white">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium mb-1">
                  {property.isLease ? "Commercial Lease Rate" : "Asking Capital Valuation"}
                </span>
                <span className="text-[#0F766E] text-2xl font-bold tracking-tight">
                  {property.priceDisplay}
                </span>
              </div>

              {/* 2x2 Metrics Grid */}
              <div className="grid grid-cols-2 border-b border-slate-100 bg-white">
                <div className="px-6 py-4 border-r border-b border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium mb-1">
                    Cap Rate
                  </span>
                  <span className="text-[#0F172A] text-xl font-bold">{property.capRateDisplay}</span>
                </div>
                <div className="px-6 py-4 border-b border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium mb-1">
                    Gross Lettable Area
                  </span>
                  <span className="text-[#0F172A] text-sm font-bold">{property.size}</span>
                </div>
                <div className="px-6 py-4 border-r border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium mb-1">
                    Year Commissioned
                  </span>
                  <span className="text-[#0F172A] text-sm font-bold">{property.yearBuilt}</span>
                </div>
                <div className="px-6 py-4">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium mb-1">
                    Occupancy Level
                  </span>
                  <span className="text-[#0F172A] text-sm font-bold">{property.occupancyRate}</span>
                </div>
              </div>

              {/* Asset UUID */}
              <div className="px-6 py-3.5 border-b border-slate-100 bg-slate-50">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium mb-0.5">
                  Asset UUID
                </span>
                <span className="text-slate-600 text-xs font-mono select-all">{property.id}</span>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-6 space-y-3 bg-white">
                <button
                  type="button"
                  className="w-full py-3.5 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  Request Offering Memorandum
                </button>
                <button
                  type="button"
                  className="w-full py-3.5 bg-white border border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white text-xs font-bold uppercase tracking-[0.2em] rounded-lg transition-colors cursor-pointer"
                >
                  Schedule Private Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
