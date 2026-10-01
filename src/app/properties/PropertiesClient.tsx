"use client";

import { useState } from "react";
import { usePropertyComparison } from "@/hooks/usePropertyComparison";
import SearchFilters from "@/components/properties/SearchFilters";
import PropertiesGrid from "@/components/properties/PropertiesGrid";
import PropertyComparisonModal from "@/components/properties/PropertyComparisonModal";
import { locationGroups } from "@/public/data/properties";

interface PropertiesClientProps {
  properties: any[];
}

export default function PropertiesClient({ properties }: PropertiesClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("all-status");
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [selectedBedrooms, setSelectedBedrooms] = useState("all-bedrooms");
  const [selectedBathrooms, setSelectedBathrooms] = useState("all-bathrooms");
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const { comparisonList } = usePropertyComparison();

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    // UPDATED: Uses .includes() to match strings like "Westlands, Brookside"
    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.some((selectedLoc) => {
        // Direct match (e.g., they searched "Brookside", and property is "Westlands, Brookside")
        if (property.location.toLowerCase().includes(selectedLoc.toLowerCase())) return true;
        
        // Category match (e.g., they searched "Westlands", include all old records too)
        const group = locationGroups.find(g => g.category === selectedLoc);
        if (group) {
          return group.items.some(item => property.location.toLowerCase().includes(item.toLowerCase()));
        }
        return false;
      });

    const matchesType =
      selectedType === "All Types" || property.type === selectedType;

    const matchesStatus =
      selectedStatus === "all-status" || property.status === selectedStatus;

    const matchesBedrooms =
      selectedBedrooms === "all-bedrooms" ||
      property.bedrooms.toString() === selectedBedrooms;

    const matchesBathrooms =
      selectedBathrooms === "all-bathrooms" ||
      property.bathrooms.toString() === selectedBathrooms;

    const matchesPrice =
      property.price >= priceRange[0] && property.price <= priceRange[1];

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesStatus &&
      matchesBedrooms &&
      matchesBathrooms &&
      matchesPrice
    );
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLocations([]);
    setSelectedType("All Types");
    setSelectedStatus("all-status");
    setSelectedBedrooms("all-bedrooms");
    setSelectedBathrooms("all-bathrooms");
    setPriceRange([0, 50000000]);
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            Find Your Perfect Property
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Browse our curated collection of premium properties in Nairobi’s most
            desirable locations.
          </p>
        </div>
      </section>

      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLocations={selectedLocations}
        setSelectedLocations={setSelectedLocations}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedBedrooms={selectedBedrooms}
        setSelectedBedrooms={setSelectedBedrooms}
        selectedBathrooms={selectedBathrooms}
        setSelectedBathrooms={setSelectedBathrooms}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        clearFilters={clearFilters}
      />

      <PropertiesGrid
        filteredProperties={filteredProperties}
        comparisonList={comparisonList}
        setShowComparison={setShowComparison}
        clearFilters={clearFilters}
      />

      <PropertyComparisonModal
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
      />
    </div>
  );
}