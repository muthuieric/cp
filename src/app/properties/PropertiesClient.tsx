"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  MapPin,
  Maximize2,
  Search,
  ChevronDown,
  SlidersHorizontal,
  X,
  Check,
  Building2,
  Layers,
  Camera,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  RotateCcw
} from "lucide-react";
import {
  CommercialStatus,
  AssetClass,
  PriceRange,
  StatusFilter,
  SortOption,
  AreaRange,
  AMENITIES_LIST,
  CommercialProperty,
  formatCompactPrice,
  COMMERCIAL_ASSETS,
  transformDbProperty,
  stripHtml,
  isGibberish,
} from "@/lib/commercialAssets";

export type ClientSortOption = "newest" | "oldest" | "rent-asc" | "rent-desc" | "size";

export default function PropertiesClient({
  initialProperties,
  properties: propProperties,
}: {
  initialProperties?: CommercialProperty[];
  properties?: any[];
}) {
  const seedProperties = initialProperties || (propProperties as CommercialProperty[]) || COMMERCIAL_ASSETS;
  const [properties, setProperties] = useState<CommercialProperty[]>(seedProperties);
  const [sortBy, setSortBy] = useState<ClientSortOption>("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<PriceRange>("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [areaRange, setAreaRange] = useState<AreaRange>("All");
  const [minSuites, setMinSuites] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);

  useEffect(() => {
    const updated = initialProperties || (propProperties as CommercialProperty[]);
    if (updated && updated.length > 0) {
      setProperties(updated);
    }
  }, [initialProperties, propProperties]);

  useEffect(() => {
    let isMounted = true;
    async function loadLiveProperties() {
      try {
        const res = await fetch("/api/properties", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (data.properties && Array.isArray(data.properties) && data.properties.length > 0) {
          const liveProps: CommercialProperty[] = data.properties.map(transformDbProperty);
          if (isMounted) {
            // Option 1: Display ONLY real database properties when available
            setProperties(liveProps);
          }
        }
      } catch (err) {
        console.warn("Could not sync live DB properties:", err);
      }
    }
    loadLiveProperties();

    const handleFocus = () => {
      loadLiveProperties();
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      isMounted = false;
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const toggleAmenity = (a: string) =>
    setSelectedAmenities((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));

  const activeFilterCount = [
    priceRange !== "All",
    statusFilter !== "All",
    areaRange !== "All",
    minSuites !== "",
    selectedAmenities.length > 0,
  ].filter(Boolean).length;

  const filteredAndSorted = useMemo(() => {
    let list = [...properties];
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.tenantMix.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "All") list = list.filter((p) => p.status === statusFilter);

    if (priceRange === "lease") list = list.filter((p) => p.isLease);
    else if (priceRange === "sale-under800") list = list.filter((p) => !p.isLease && p.priceNumeric < 800_000_000);
    else if (priceRange === "sale-over800") list = list.filter((p) => !p.isLease && p.priceNumeric >= 800_000_000);

    if (areaRange === "under50k") list = list.filter((p) => p.sizeNumeric < 50000);
    else if (areaRange === "50kto100k") list = list.filter((p) => p.sizeNumeric >= 50000 && p.sizeNumeric <= 100000);
    else if (areaRange === "100kto200k") list = list.filter((p) => p.sizeNumeric > 100000 && p.sizeNumeric <= 200000);
    else if (areaRange === "over200k") list = list.filter((p) => p.sizeNumeric > 200000);

    if (minSuites) list = list.filter((p) => p.suites >= Number(minSuites));
    if (selectedAmenities.length > 0)
      list = list.filter((p) => selectedAmenities.every((a) => p.amenities.includes(a)));

    if (sortBy === "newest") {
      list.sort((a, b) => {
        // Prioritize live database properties first
        if (a.isLive && !b.isLive) return -1;
        if (!a.isLive && b.isLive) return 1;
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return Number(b.id) - Number(a.id);
      });
    } else if (sortBy === "oldest") {
      list.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        return Number(a.id) - Number(b.id);
      });
    } else if (sortBy === "rent-asc") {
      list.sort((a, b) => a.priceNumeric - b.priceNumeric);
    } else if (sortBy === "rent-desc") {
      list.sort((a, b) => b.priceNumeric - a.priceNumeric);
    } else if (sortBy === "size") {
      list.sort((a, b) => b.sizeNumeric - a.sizeNumeric);
    }

    return list;
  }, [properties, sortBy, searchTerm, priceRange, statusFilter, areaRange, minSuites, selectedAmenities]);

  const clearAll = () => {
    setSearchTerm("");
    setPriceRange("All");
    setStatusFilter("All");
    setAreaRange("All");
    setMinSuites("");
    setSelectedAmenities([]);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pt-24 pb-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <div className="flex flex-col items-start mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm text-xs font-semibold text-[#0F766E] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#0F766E] animate-pulse" />
              <span>Showing {filteredAndSorted.length} of {properties.length} Available Spaces</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0F172A] mb-3"
              style={{ fontFamily: "Cinzel, Georgia, serif" }}
            >
              Available Offices &amp; Commercial Spaces
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
              Find and lease premium workspaces, corporate offices, retail spaces, and logistics hubs across Nairobi&apos;s top commercial corridors.
            </p>
          </div>

          {/* SEARCH & FILTERS BAR (STICKY) */}
          <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl p-4 sm:p-5 shadow-sm mb-4 transition-all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="relative sm:col-span-2 lg:col-span-2">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search spaces, locations, or building names..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-lg text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
                />
              </div>

              {/* Monthly Rent Filter */}
              <div className="relative">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value as PriceRange)}
                  className="w-full appearance-none px-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] cursor-pointer"
                >
                  <option value="All">All Monthly Rates</option>
                  <option value="lease">Commercial Lease Rates</option>
                  <option value="sale-under800">Under Ksh 300,000 / mo</option>
                  <option value="sale-over800">Ksh 300,000+ / mo</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Availability Status */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                  className="w-full appearance-none px-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] cursor-pointer"
                >
                  <option value="All">All Availability</option>
                  <option value="Vacant">Available Now</option>
                  <option value="Occupied">Rented</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Advanced Filter Button */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all cursor-pointer ${
                  showAdvanced
                    ? "bg-[#0F766E] text-white shadow-sm"
                    : "bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#0F172A]"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}</span>
              </button>
            </div>
          </div>

          {/* ACTIVE FILTER PILLS */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-4 pt-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">Active:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20">
                  &ldquo;{searchTerm}&rdquo;
                  <button
                    type="button"
                    aria-label="Remove search query"
                    onClick={() => setSearchTerm("")}
                    className="hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {priceRange !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20">
                  Pricing: {priceRange === "lease" ? "Leasehold" : priceRange === "sale-under800" ? "< Ksh 800M" : "Ksh 800M+"}
                  <button
                    type="button"
                    aria-label="Remove pricing filter"
                    onClick={() => setPriceRange("All")}
                    className="hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {statusFilter !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20">
                  Status: {statusFilter}
                  <button
                    type="button"
                    aria-label="Remove status filter"
                    onClick={() => setStatusFilter("All")}
                    className="hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {areaRange !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20">
                  GLA: {areaRange}
                  <button
                    type="button"
                    aria-label="Remove GLA filter"
                    onClick={() => setAreaRange("All")}
                    className="hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {minSuites && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20">
                  Suites: &ge;{minSuites}
                  <button
                    type="button"
                    aria-label="Remove suites filter"
                    onClick={() => setMinSuites("")}
                    className="hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedAmenities.map((amenity) => (
                <span
                  key={amenity}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20"
                >
                  {amenity}
                  <button
                    type="button"
                    aria-label={`Remove ${amenity} filter`}
                    onClick={() => toggleAmenity(amenity)}
                    className="hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-semibold text-slate-500 hover:text-[#0F766E] underline cursor-pointer ml-1"
              >
                Clear All
              </button>
            </div>
          )}

          {/* ADVANCED COMMERCIAL FILTERS PANEL */}
          {showAdvanced && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md mb-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block mb-2">
                    Floor Plate & Total GLA Sizing
                  </label>
                  <select
                    value={areaRange}
                    onChange={(e) => setAreaRange(e.target.value as AreaRange)}
                    className="w-full appearance-none px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 cursor-pointer"
                  >
                    <option value="All">All Floor Areas</option>
                    <option value="under50k">Under 50,000 sq ft GLA</option>
                    <option value="50kto100k">50,000 – 100,000 sq ft GLA</option>
                    <option value="100kto200k">100,000 – 200,000 sq ft GLA</option>
                    <option value="over200k">Over 200,000 sq ft GLA</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block mb-2">
                    Minimum Executive Suites / Tenant Capacity
                  </label>
                  <input
                    type="number"
                    value={minSuites}
                    onChange={(e) => setMinSuites(e.target.value)}
                    placeholder="e.g. 20"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block mb-3">
                  Infrastructure & Technical Specifications
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {AMENITIES_LIST.map((amenity) => {
                    const sel = selectedAmenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          sel
                            ? "bg-[#0F766E] text-white shadow-sm"
                            : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {sel && <Check className="w-3.5 h-3.5" />}
                        <span>{amenity}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  onClick={clearAll}
                  className="text-xs text-slate-500 hover:text-[#0F766E] transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
                {activeFilterCount > 0 && (
                  <span className="text-xs text-slate-500 font-medium">
                    {activeFilterCount} active filter{activeFilterCount > 1 ? "s" : ""} applied
                  </span>
                )}
              </div>
            </div>
          )}

          {/* SORTING CONTROLS */}
          <div className="flex items-center justify-end gap-5 pt-2">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/80 shadow-sm self-start sm:self-auto">
              <span className="text-slate-400">Sort by:</span>
              <button
                onClick={() => setSortBy("newest")}
                className={`transition-colors cursor-pointer px-1.5 py-0.5 rounded ${
                  sortBy === "newest" ? "text-[#0F766E] font-bold" : "text-slate-600 hover:text-[#0F172A]"
                }`}
              >
                Newest First
              </button>
              <span className="text-slate-300">&middot;</span>
              <button
                onClick={() => setSortBy("oldest")}
                className={`transition-colors cursor-pointer px-1.5 py-0.5 rounded ${
                  sortBy === "oldest" ? "text-[#0F766E] font-bold" : "text-slate-600 hover:text-[#0F172A]"
                }`}
              >
                Oldest First
              </button>
              <span className="text-slate-300">&middot;</span>
              <button
                onClick={() => setSortBy("rent-asc")}
                className={`transition-colors cursor-pointer px-1.5 py-0.5 rounded ${
                  sortBy === "rent-asc" ? "text-[#0F766E] font-bold" : "text-slate-600 hover:text-[#0F172A]"
                }`}
              >
                Rent: Low to High
              </button>
              <span className="text-slate-300">&middot;</span>
              <button
                onClick={() => setSortBy("rent-desc")}
                className={`transition-colors cursor-pointer px-1.5 py-0.5 rounded ${
                  sortBy === "rent-desc" ? "text-[#0F766E] font-bold" : "text-slate-600 hover:text-[#0F172A]"
                }`}
              >
                Rent: High to Low
              </button>
              <span className="text-slate-300">&middot;</span>
              <button
                onClick={() => setSortBy("size")}
                className={`transition-colors cursor-pointer px-1.5 py-0.5 rounded ${
                  sortBy === "size" ? "text-[#0F766E] font-bold" : "text-slate-600 hover:text-[#0F172A]"
                }`}
              >
                Space Size (Sq Ft)
              </button>
            </div>
          </div>
        </div>

        {/* ASSET CARDS GRID */}
        {filteredAndSorted.length === 0 ? (
          <div className="space-y-10">
            <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-12 sm:p-16 text-center shadow-sm max-w-2xl mx-auto">
              <div className="w-12 h-12 bg-[#0F766E]/10 text-[#0F766E] rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-2" style={{ fontFamily: "Cinzel, Georgia, serif" }}>
                No commercial assets match these exact parameters
              </h3>
              <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                Try broadening your criteria, removing specialized infrastructure filters, or reset all parameters to view our complete Grade A commercial portfolio.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs uppercase font-bold tracking-widest rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>

            {/* 2 Suggested Alternative Assets */}
            <div className="pt-4">
              <div className="text-center mb-6">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0F766E] block mb-1">
                  Featured Alternatives
                </span>
                <h4 className="text-xl font-bold text-[#0F172A]" style={{ fontFamily: "Cinzel, Georgia, serif" }}>
                  Institutional Grade A Highlights
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {COMMERCIAL_ASSETS.slice(0, 2).map((property) => (
                  <Link
                    key={`suggested-${property.id}`}
                    href={`/properties/${property.id}`}
                    className="bg-white border border-slate-200 shadow-md hover:shadow-lg transition-all rounded-xl overflow-hidden flex flex-col group cursor-pointer"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                      <Image
                        src={property.image}
                        alt={property.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-[#0F172A]/90 text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded">
                        {property.category}
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-[#0F766E] font-semibold">
                            {property.status === "Occupied" ? "Rented" : "Available"}
                          </span>
                        </div>
                        <h5 className="font-bold text-base text-[#0F172A] line-clamp-1 group-hover:text-[#0F766E] transition-colors" style={{ fontFamily: "Cinzel, Georgia, serif" }}>
                          {property.name}
                        </h5>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{property.location}</span>
                        </p>
                      </div>
                      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-sm font-bold text-[#0F766E]">
                          {formatCompactPrice(property.priceNumeric, property.isLease)}
                        </span>
                        <span className="text-xs text-[#0F766E] font-semibold flex items-center gap-1">
                          View Details &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSorted.map((property) => (
              <Link
                key={property.id}
                href={`/properties/${property.id}`}
                className="bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden flex flex-col group cursor-pointer"
              >
                {/* 4:3 Image Container with "X Photos" Frosted Glass Badge */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Category Tag & Availability Status Tag on Left */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-[#0F172A]/90 backdrop-blur-sm text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded">
                      {property.category}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded shadow-sm ${
                        property.status === "Vacant"
                          ? "bg-emerald-600 text-white"
                          : "bg-amber-600 text-white"
                      }`}
                    >
                      {property.status === "Vacant" ? "Available" : "Not Available"}
                    </span>
                  </div>

                  {/* Top Right Badges: Photos & Shortlist */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#0F172A] border border-white/40 shadow-sm text-[11px] font-semibold">
                      <Camera className="w-3.5 h-3.5 text-[#0F766E]" />
                      <span>{property.images?.length || 4}</span>
                    </div>
                    <button
                      type="button"
                      aria-label={shortlistedIds.includes(property.id) ? `Remove ${property.name} from watchlist` : `Shortlist ${property.name}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (shortlistedIds.includes(property.id)) {
                          setShortlistedIds((prev) => prev.filter((id) => id !== property.id));
                          toast.info(`Removed "${property.name}" from watchlist`);
                        } else {
                          setShortlistedIds((prev) => [...prev, property.id]);
                          toast.success(`Shortlisted "${property.name}"`, {
                            description: "Saved to your shortlisted spaces."
                          });
                        }
                      }}
                      className={`p-1.5 rounded-md transition-all cursor-pointer shadow-sm ${
                        shortlistedIds.includes(property.id)
                          ? "bg-[#0F766E] text-white"
                          : "bg-white/90 backdrop-blur-md text-slate-700 hover:text-[#0F766E] hover:bg-white"
                      }`}
                    >
                      {shortlistedIds.includes(property.id) ? (
                        <BookmarkCheck className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <Bookmark className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Space Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Status Badge + Lease Type */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded ${
                          property.status === "Vacant"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {property.status === "Vacant" ? "Available" : "Not Available"}
                      </span>
                      <span className="text-slate-400 text-xs font-medium">
                        {property.category} Space
                      </span>
                    </div>

                    {/* Space Title */}
                    <h2
                      className="text-[#0F172A] font-bold text-lg leading-snug mb-2 group-hover:text-[#0F766E] transition-colors line-clamp-1"
                      style={{ fontFamily: "Cinzel, Georgia, serif" }}
                    >
                      {property.name}
                    </h2>

                    {/* Location, Total Space, and Floor Size */}
                    <div className="space-y-1.5 mb-3 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{property.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Total Space: {property.size}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">Floor Size: {property.floorPlate}</span>
                      </div>
                    </div>

                    {/* Tenant Mix info snippet */}
                    <p className="text-[11px] text-slate-500 line-clamp-1 mb-4 italic font-light">
                      Tenant Mix: {isGibberish(property.tenantMix) ? "Details available upon request." : stripHtml(property.tenantMix)}
                    </p>
                  </div>

                  {/* Pricing Bottom Row */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                        Monthly Rent
                      </span>
                      <span className="text-[#0F766E] font-bold text-lg tracking-tight block">
                        {formatCompactPrice(property.priceNumeric, true)}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {property.serviceCharge ? "Inc. service charge & power" : "Flexible lease terms"}
                      </span>
                    </div>

                    <span className="text-[#0F766E] group-hover:text-[#0D9488] text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors duration-200">
                      <span>View Space</span>
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
