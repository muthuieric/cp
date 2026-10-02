"use client";

import { useState } from "react";
import Image from "next/image";
import PropertyForm from "@/components/PropertyForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Search, ChevronDown, Edit3, Trash2, ArrowUpDown } from "lucide-react";

export interface AdminProperty {
  id: string | number;
  title: string;
  location: string;
  price: number | string;
  type: string;
  status: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  images: string[] | any[];
}

interface AdminPropertiesTableProps {
  properties: AdminProperty[];
}

const STATUS_TABS = [
  { label: "All Properties", value: "All" },
  { label: "Available", value: "Available" },
  { label: "Rented", value: "Rented" },
];

export default function AdminPropertiesTable({ properties }: AdminPropertiesTableProps) {
  const [propsList, setPropsList] = useState<AdminProperty[]>(properties);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const [editingProperty, setEditingProperty] = useState<AdminProperty | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Control bar filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusTab, setSelectedStatusTab] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this property? This action cannot be undone.")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/properties?id=${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok || data.success) {
        setPropsList((prev) => prev.filter((p) => p.id !== id));
      } else {
        setPropsList((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.warn("API delete fallback:", err);
      setPropsList((prev) => prev.filter((p) => p.id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProperties = propsList
    .filter((property) => {
      const idStr = String(property.id).toLowerCase();
      const titleStr = (property.title || "").toLowerCase();
      const locStr = (property.location || "").toLowerCase();
      const q = searchTerm.toLowerCase();

      const matchesSearch = !q || titleStr.includes(q) || locStr.includes(q) || idStr.includes(q);
      const isRented = property.status === "Occupied" || property.status === "Rented";
      const isAvailable = !isRented;

      const matchesStatus =
        selectedStatusTab === "All" ||
        (selectedStatusTab === "Rented" && isRented) ||
        (selectedStatusTab === "Available" && isAvailable);

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const priceA = Number(a.price) || 0;
      const priceB = Number(b.price) || 0;
      if (sortBy === "price-asc") return priceA - priceB;
      if (sortBy === "price-desc") return priceB - priceA;
      if (sortBy === "oldest") return String(a.id).localeCompare(String(b.id));
      return String(b.id).localeCompare(String(a.id));
    });

  return (
    <div className="space-y-6">
      {/* ─── ADMIN OPERATIONS CONTROL BAR ─────────────────────────── */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-4">
        {/* Top row: Status Tabs + Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-none sm:rounded-lg w-full lg:w-auto">
            {STATUS_TABS.map((tab) => {
              const active = selectedStatusTab === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setSelectedStatusTab(tab.value)}
                  className={`px-3.5 py-1.5 text-xs uppercase font-bold tracking-wider rounded-md transition-colors cursor-pointer ${
                    active
                      ? "bg-[#0F766E] text-white shadow-sm"
                      : "text-slate-600 hover:text-[#0F172A] hover:bg-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Right controls: Sort */}
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative min-w-[190px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort properties"
                className="w-full appearance-none bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-xs uppercase font-semibold tracking-wider text-[#0F172A] focus:outline-none focus:border-[#0F766E] cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-desc">Rent: High to Low</option>
                <option value="price-asc">Rent: Low to High</option>
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Bottom row: Live Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Property Title, Location, or UUID..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#0F766E]"
          />
        </div>
      </div>

      {/* ─── INVENTORY LIST / TABLE ─────────────────────────────────── */}
      <div className="bg-white border border-slate-200/90 rounded-none sm:rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/60">
          <h2
            className="text-xs uppercase font-bold tracking-widest text-[#0F172A]"
            style={{ fontFamily: "Cinzel, Georgia, serif" }}
          >
            Properties List
          </h2>
          <span className="text-xs font-mono text-slate-500">
            Showing {filteredProperties.length} of {propsList.length} properties
          </span>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <p className="text-sm uppercase tracking-wider font-semibold">No properties matched your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedStatusTab("All");
              }}
              className="mt-4 px-4 py-2 bg-[#0F766E] text-white text-xs uppercase font-semibold tracking-wider rounded-lg hover:bg-[#0D9488] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <div className="divide-y divide-slate-100 min-w-full">
            {filteredProperties.map((prop) => {
              const rawImg = prop.images && prop.images.length > 0 ? prop.images[0] : null;
              const imageUrl = typeof rawImg === "string" ? rawImg : rawImg?.url || "/images/hq-commercial-tower.jpg";
              const isPropRented = prop.status === "Occupied" || prop.status === "Rented";

              return (
                <div
                  key={String(prop.id)}
                  className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-slate-50/70 transition-colors"
                >
                  {/* Left: Thumbnail & Main Details */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="relative w-24 h-20 bg-slate-100 rounded-lg border border-slate-200 shrink-0 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={prop.title}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-[#0F172A] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded">
                          {prop.type}
                        </span>
                        <span className={`border text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded ${
                          isPropRented
                            ? "bg-amber-50 border-amber-200 text-amber-700"
                            : "bg-[#0F766E]/10 border-[#0F766E]/20 text-[#0F766E]"
                        }`}>
                          {isPropRented ? "Rented" : "Available"}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          UUID: {String(prop.id).substring(0, 13)}...
                        </span>
                      </div>

                      <h3
                        className="text-base font-bold text-[#0F172A] truncate tracking-tight"
                        style={{ fontFamily: "Cinzel, Georgia, serif" }}
                      >
                        {prop.title}
                      </h3>

                      <p className="text-xs text-slate-500">
                        {prop.location} &middot;{" "}
                        <span className="font-semibold text-[#0F766E]">
                          Ksh {Number(prop.price).toLocaleString()} /mo
                        </span>
                        {prop.area ? ` · ${Number(prop.area).toLocaleString()} sq ft` : ""}
                      </p>
                    </div>
                  </div>

                  {/* Right: ACTION BUTTONS (Edit + Delete) */}
                  <div className="flex items-center gap-2.5 self-stretch sm:self-end lg:self-center justify-end shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    {/* EDIT BUTTON */}
                    <Dialog
                      open={isEditOpen && editingProperty?.id === prop.id}
                      onOpenChange={(open) => {
                        setIsEditOpen(open);
                        if (!open) setEditingProperty(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProperty(prop);
                            setIsEditOpen(true);
                          }}
                          className="flex-1 sm:flex-initial justify-center inline-flex items-center gap-1.5 px-4 py-2 border border-[#0F766E] text-[#0F766E] hover:bg-[#0F766E] hover:text-white rounded-lg text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                      </DialogTrigger>

                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6 bg-white border border-slate-200 rounded-xl">
                        <PropertyForm
                          initialData={editingProperty}
                          onSuccess={() => {
                            setIsEditOpen(false);
                            setEditingProperty(null);
                            window.location.reload();
                          }}
                        />
                      </DialogContent>
                    </Dialog>

                    {/* DELETE BUTTON */}
                    <button
                      type="button"
                      onClick={() => handleDelete(prop.id)}
                      disabled={deletingId === prop.id}
                      className="flex-1 sm:flex-initial justify-center inline-flex items-center gap-1.5 px-4 py-2 bg-[#0F172A] hover:bg-rose-700 text-white rounded-lg text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{deletingId === prop.id ? "Deleting..." : "Delete"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
