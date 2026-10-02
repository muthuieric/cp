"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { SlidersHorizontal, Search, RotateCcw, Building, Filter } from "lucide-react";
import { propertyTypes } from "@/public/data/properties";
import { MultiSelectLocation } from "@/components/custom/MultiSelectLocation";

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedLocations: string[];
  setSelectedLocations: (val: string[]) => void;
  selectedType: string;
  setSelectedType: (val: string) => void;
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
  selectedBedrooms: string;
  setSelectedBedrooms: (val: string) => void;
  selectedBathrooms: string;
  setSelectedBathrooms: (val: string) => void;
  priceRange: number[];
  setPriceRange: (val: number[]) => void;
  showFilters: boolean;
  setShowFilters: (val: boolean | ((prev: boolean) => boolean)) => void;
  clearFilters: () => void;
}

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  selectedLocations,
  setSelectedLocations,
  selectedType,
  setSelectedType,
  selectedStatus,
  setSelectedStatus,
  priceRange,
  setPriceRange,
  showFilters,
  setShowFilters,
  clearFilters,
}: SearchFiltersProps) => {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
      <Card className="bg-white border border-slate-200/90 shadow-[0_10px_35px_-5px_rgba(11,25,44,0.08)] rounded-[2px]">
        <CardContent className="p-5 lg:p-7 space-y-5">
          {/* Main Filter Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="lg:col-span-4 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                placeholder="Search towers, corridors, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 pl-10 border-slate-300 focus:border-[#0B192C] focus:ring-1 focus:ring-[#0B192C] rounded-[2px] text-sm text-[#0B192C] placeholder:text-slate-400"
              />
            </div>

            {/* Commercial Corridor Multi-Select */}
            <div className="lg:col-span-3">
              <MultiSelectLocation
                selectedLocations={selectedLocations}
                onChange={setSelectedLocations}
                max={4}
              />
            </div>

            {/* Space Type */}
            <div className="lg:col-span-3">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="h-12 border-slate-300 focus:border-[#0B192C] focus:ring-1 focus:ring-[#0B192C] rounded-[2px] text-sm text-[#0B192C]">
                  <SelectValue placeholder="Space Type" />
                </SelectTrigger>
                <SelectContent className="rounded-[2px] border-slate-200 bg-white">
                  {propertyTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-xs font-medium cursor-pointer">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Advanced Filters & Reset */}
            <div className="lg:col-span-2 flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters((prev: boolean) => !prev)}
                className="h-12 flex-1 border-slate-300 text-[#0B192C] hover:bg-slate-50 font-semibold text-xs uppercase tracking-wider rounded-[2px]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 mr-2 text-[#C5A059]" />
                <span>Filters</span>
              </Button>

              <Button
                variant="ghost"
                onClick={clearFilters}
                aria-label="Reset all filters"
                className="h-12 px-3 text-slate-500 hover:text-[#0B192C] hover:bg-slate-100 rounded-[2px]"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

          </div>

          {/* Collapsible Advanced Filters Drawer */}
          {showFilters && (
            <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-end animate-in fade-in-50 duration-200">
              
              {/* Transaction Type / Status */}
              <div className="lg:col-span-4 space-y-2">
                <label className="text-xs uppercase tracking-[0.18em] font-bold text-slate-700 block">
                  Lease Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedStatus("For Rent")}
                    className={`h-11 px-4 text-xs uppercase font-bold tracking-wider rounded-[2px] border transition-colors ${
                      selectedStatus === "For Rent"
                        ? "bg-[#0B192C] text-white border-[#0B192C]"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    Available
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedStatus("Occupied")}
                    className={`h-11 px-4 text-xs uppercase font-bold tracking-wider rounded-[2px] border transition-colors ${
                      selectedStatus === "Occupied"
                        ? "bg-[#0B192C] text-white border-[#0B192C]"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    Rented
                  </button>
                </div>
              </div>

              {/* Valuation & Capital Allocation Slider */}
              <div className="lg:col-span-8 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="uppercase tracking-[0.18em] font-bold text-slate-700">
                    Monthly Rent Range
                  </span>
                  <span className="font-bold text-[#0B192C]">
                    Ksh {(priceRange[0] / 1000000).toFixed(0)}M &mdash; Ksh {(priceRange[1] / 1000000).toFixed(0)}M+
                  </span>
                </div>
                <div className="pt-2">
                  <Slider
                    defaultValue={[0, 2000000000]}
                    max={2000000000}
                    step={25000000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="cursor-pointer"
                  />
                </div>
              </div>

            </div>
          )}

          {/* Active Corridor Filter Chips Reflow (per UI/UX Pro Max Guideline) */}
          {selectedLocations.length > 0 && (
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mr-1">
                Selected Corridors:
              </span>
              {selectedLocations.map((loc) => (
                <span
                  key={loc}
                  className="bg-slate-100 text-[#0B192C] border border-slate-300 text-xs font-medium px-2.5 py-1 rounded-[2px] flex items-center gap-1.5"
                >
                  <span>{loc}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedLocations(selectedLocations.filter((l) => l !== loc))}
                    className="text-slate-500 hover:text-black font-bold ml-1"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}

        </CardContent>
      </Card>
    </section>
  );
};

export default SearchFilters;