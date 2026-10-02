"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  MapPin,
  ArrowLeft,
  Check,
  Building2,
  Calendar,
  Maximize2,
  Users,
  Layers,
  Camera,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Receipt,
  Copy,
  Bookmark,
  BookmarkCheck,
  Share2,
  Loader2
} from "lucide-react";
import {
  COMMERCIAL_ASSETS,
  CommercialProperty,
  formatCompactPrice,
  transformDbProperty,
  stripHtml,
  decodeHtml,
  isGibberish,
} from "@/lib/commercialAssets";

function getStaticPropertyById(id: string): CommercialProperty | undefined {
  return (
    COMMERCIAL_ASSETS.find((p) => p.id === id) ||
    COMMERCIAL_ASSETS.find((p) => String(p.id).toLowerCase() === String(id).toLowerCase())
  );
}

export default function PropertyDetailPage({
  propertyId,
  initialProperty = undefined,
}: {
  propertyId: string;
  initialProperty?: CommercialProperty | null;
}) {
  const [property, setProperty] = useState<CommercialProperty | null>(() => {
    if (initialProperty) return initialProperty;
    return getStaticPropertyById(propertyId) || null;
  });
  const [loading, setLoading] = useState(initialProperty === undefined && !property);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isShortlisted, setIsShortlisted] = useState(false);

  useEffect(() => {
    if (initialProperty) {
      setProperty(initialProperty);
      setLoading(false);
      return;
    }

    const staticMatch = getStaticPropertyById(propertyId);
    if (staticMatch) {
      setProperty(staticMatch);
      setLoading(false);
      return;
    }

    let isMounted = true;
    async function fetchProperty() {
      try {
        const res = await fetch(`/api/properties?id=${encodeURIComponent(propertyId)}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        if (data.property && isMounted) {
          setProperty(transformDbProperty(data.property));
        }
      } catch (err) {
        console.warn("Could not load property details:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchProperty();

    return () => {
      isMounted = false;
    };
  }, [propertyId, initialProperty]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Asset link copied to clipboard", {
        description: `Reference UUID ${property?.id || ""} copied.`
      });
    }
  };

  const handleCopyRef = () => {
    if (typeof window !== "undefined" && property) {
      navigator.clipboard.writeText(property.id);
      toast.success("Asset reference UUID copied", {
        description: property.id
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] text-[#0F172A] pt-24 px-6 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0F766E] mb-4" />
        <p className="text-slate-500 text-sm">Loading commercial asset dossier...</p>
      </div>
    );
  }

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
                  Commercial Lease Structure
                </span>
              </div>

              {/* Explicit Leasing Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold mb-1">
                    Base Rent
                  </span>
                  <p className="text-lg font-bold text-[#0F172A]">
                    {property.baseRent || (property.priceNumeric ? formatCompactPrice(Math.round(property.priceNumeric * 0.85), true) : "Ksh 80 / sq.ft")}
                  </p>
                  <span className="text-[11px] text-slate-400">Exclusive of service charge &amp; VAT</span>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold mb-1">
                    Service Charge
                  </span>
                  <p className="text-lg font-bold text-[#0F766E]">
                    {property.serviceCharge || "Ksh 25 / sq.ft"}
                  </p>
                  <span className="text-[11px] text-slate-400">Security, generator, common facilities</span>
                </div>

                <div className="p-4 bg-[#0F172A] text-white rounded-lg">
                  <span className="text-[10px] text-[#14B8A6] uppercase tracking-wider block font-semibold mb-1">
                    Total Effective Rent
                  </span>
                  <p className="text-lg font-bold text-white">
                    {formatCompactPrice(property.priceNumeric, true)}
                  </p>
                  <span className="text-[11px] text-white/60">Payable quarterly in advance</span>
                </div>
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
                    <span className="text-xs text-slate-600 font-light">
                      {isGibberish(property.tenantMix) ? "Details available upon request." : stripHtml(property.tenantMix)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── INVESTMENT THESIS & SPECIFICATIONS ───────── */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="w-1.5 h-6 bg-[#0F766E] rounded-full" />
                <h2
                  className="text-xl font-bold uppercase tracking-wider text-[#0F172A]"
                  style={{ fontFamily: "Cinzel, Georgia, serif" }}
                >
                  Commercial Lease Specifications &amp; Overview
                </h2>
              </div>
              {isGibberish(property.descriptionHtml || property.investmentThesis || property.description) ? (
                <p className="text-slate-600 text-[15px] leading-relaxed font-light">
                  Details available upon request.
                </p>
              ) : (
                <div
                  className="prose max-w-none text-slate-700
                    break-words overflow-hidden whitespace-normal
                    [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:font-light [&_p]:text-[15px]
                    [&_strong]:font-semibold [&_strong]:text-[#0F172A]
                    [&_em]:italic
                    [&_u]:underline
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:space-y-1.5 [&_ul]:text-[15px]
                    [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_ol]:space-y-1.5 [&_ol]:text-[15px]
                    [&_li]:break-words [&_li]:font-light"
                  dangerouslySetInnerHTML={{
                    __html: decodeHtml(property.descriptionHtml || property.investmentThesis || property.description) || "<p>Details available upon request.</p>"
                  }}
                />
              )}
            </div>

            {/* ─── COMMERCIAL INFRASTRUCTURE & AMENITIES (Compact & Sleek) ─────────── */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-3">
                <div className="w-1.5 h-5 bg-[#0F766E] rounded-full" />
                <h2
                  className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#0F172A]"
                  style={{ fontFamily: "Cinzel, Georgia, serif" }}
                >
                  Commercial Infrastructure &amp; Technical Amenities
                </h2>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {(property.amenities || [])
                  .map((a) => stripHtml(String(a)))
                  .filter((a) => a && a.length >= 2 && !isGibberish(a))
                  .map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#0F172A] rounded-md text-xs font-medium transition-colors"
                    >
                      <div className="w-4 h-4 rounded-full bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Sticky Summary Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-xl shadow-lg overflow-hidden">
              {/* Card Header */}
              <div className="bg-[#0F172A] px-6 py-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#14B8A6] text-[10px] tracking-[0.25em] uppercase font-bold">
                      {property.category}
                    </span>
                    <span className="border border-white/20 text-white/80 text-[10px] tracking-[0.15em] uppercase font-semibold px-2 py-0.5 rounded">
                      {property.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      aria-label="Copy property link"
                      onClick={handleCopyLink}
                      className="p-1.5 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-md transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      aria-label={isShortlisted ? "Remove from watchlist" : "Shortlist asset"}
                      onClick={() => {
                        setIsShortlisted(!isShortlisted);
                        toast.success(isShortlisted ? "Removed from watchlist" : `Shortlisted ${property.name}`, {
                          description: isShortlisted ? "Asset removed." : "Asset saved to your acquisition watchlist."
                        });
                      }}
                      className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                        isShortlisted ? "bg-[#0F766E] text-white" : "bg-white/10 hover:bg-white/20 text-white/80 hover:text-white"
                      }`}
                    >
                      {isShortlisted ? <BookmarkCheck className="w-3.5 h-3.5 text-teal-300" /> : <Bookmark className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <h1
                  className="text-white text-lg font-bold leading-snug"
                  style={{ fontFamily: "Cinzel, Georgia, serif" }}
                >
                  {isGibberish(property.name)
                    ? (property.location ? `Commercial Space - ${property.location}` : "Executive Commercial Suite")
                    : property.name}
                </h1>
                <div className="flex items-center gap-1.5 mt-2 text-white/60 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>{property.location}</span>
                </div>
              </div>

              {/* Price Row (Asking Rent) */}
              <div className="px-6 py-5 border-b border-slate-100 bg-white">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium mb-1">
                  Asking Rent
                </span>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[#0F766E] text-2xl font-bold tracking-tight">
                    {formatCompactPrice(property.priceNumeric, true)}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {property.priceNumeric ? `Ksh ${property.priceNumeric.toLocaleString()}/mo` : property.priceDisplay}
                  </span>
                </div>
              </div>

              {/* Main Property Metrics (GLA & Availability) */}
              <div className="grid grid-cols-2 border-b border-slate-100 bg-white">
                <div className="px-6 py-4 border-r border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium mb-1">
                    Gross Lettable Area
                  </span>
                  <span className="text-[#0F172A] text-sm sm:text-base font-bold">{property.size}</span>
                </div>
                <div className="px-6 py-4">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium mb-1">
                    Tenancy Status
                  </span>
                  <span className="text-[#0F172A] text-sm sm:text-base font-bold">
                    {property.occupancy || property.status || "Available for Lease"}
                  </span>
                </div>
              </div>

              {/* Asset UUID with 1-Click Copy */}
              <div className="px-6 py-3.5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium mb-0.5">
                    Asset UUID
                  </span>
                  <span className="text-slate-600 text-xs font-mono select-all">{property.id}</span>
                </div>
                <button
                  type="button"
                  aria-label="Copy asset reference UUID"
                  onClick={handleCopyRef}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#0F766E] hover:bg-[#0F766E]/10 rounded border border-[#0F766E]/30 transition-colors cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-6 space-y-3 bg-white">
                <button
                  type="button"
                  onClick={() => toast.success("Leasing Brochure Requested", { description: `Tenancy dossier for ${property.name} has been dispatched to your email.` })}
                  className="w-full py-3.5 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  Request Leasing Brochure
                </button>
                <button
                  type="button"
                  onClick={() => toast.success("Tour Request Received", { description: "An executive leasing advisor will contact you within 2 business hours." })}
                  className="w-full py-3.5 bg-white border border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white text-xs font-bold uppercase tracking-[0.2em] rounded-lg transition-colors cursor-pointer"
                >
                  Schedule Private Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY MOBILE INQUIRY BAR */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0F172A]/95 backdrop-blur-md border-t border-[#0F766E]/40 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-white/50 uppercase tracking-wider block font-medium">
            Asking Rent
          </span>
          <span className="text-[#14B8A6] text-base font-bold">
            {formatCompactPrice(property.priceNumeric, true)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label="Copy property link"
            className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => toast.success("Tour request received", { description: "An executive leasing advisor will contact you within 2 business hours." })}
            className="px-4 py-2.5 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            Schedule Tour
          </button>
        </div>
      </div>
    </div>
  );
}
