"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
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
  ArrowRight
} from "lucide-react";

export type CommercialStatus = "Vacant (Available immediately)" | "Occupied (Yield-generating)";
export type AssetClass = "All" | "Office" | "Logistics" | "Hospitality" | "Retail";
export type PriceRange = "All" | "lease" | "sale-under800" | "sale-over800";
export type StatusFilter = "All" | "Vacant (Available immediately)" | "Occupied (Yield-generating)";
export type SortOption = "cap-rate" | "yield" | "size";
export type AreaRange = "All" | "under50k" | "50kto100k" | "100kto200k" | "over200k";

const AMENITIES_LIST = [
  "3-Phase Power", "Backup Generator", "Fiber Optic", "Helipad",
  "CCTV Surveillance", "24/7 Security", "Fire Suppression", "Elevator",
  "Loading Docks", "Cold Storage", "Parking Garage", "Rooftop Access",
  "Conference Facilities", "Gym / Wellness", "Cafeteria", "Smart BMS",
];

export interface CommercialProperty {
  id: string;
  name: string;
  category: "Office" | "Logistics" | "Hospitality" | "Retail";
  location: string;
  size: string;
  sizeNumeric: number;
  floorPlate: string;
  capRate: number;
  capRateDisplay: string;
  yieldDisplay: string;
  isLease: boolean;
  priceNumeric: number;
  priceDisplay: string;
  baseRent?: string;
  serviceCharge?: string;
  status: CommercialStatus;
  occupancy: "Fully Occupied" | "Vacant" | "Partially Leased";
  image: string;
  images: string[];
  yearBuilt: number;
  occupancyRate: string;
  suites: number;
  tenantMix: string;
  amenities: string[];
  investmentThesis: string;
}

export const COMMERCIAL_ASSETS: CommercialProperty[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "The Delta Pinnacle Office Tower",
    category: "Office",
    location: "Westlands, Nairobi",
    size: "120,000 sq ft GLA",
    sizeNumeric: 120000,
    floorPlate: "18,000 sq ft typical floor plate",
    capRate: 8.8,
    capRateDisplay: "8.8% Cap Rate",
    yieldDisplay: "9.4% Net Yield",
    isLease: false,
    priceNumeric: 1450000000,
    priceDisplay: "Ksh 1,450,000,000",
    status: "Occupied (Yield-generating)",
    occupancy: "Fully Occupied",
    image: "/images/hq-commercial-tower.jpg",
    images: [
      "/images/hq-commercial-tower.jpg",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop"
    ],
    yearBuilt: 2019,
    occupancyRate: "94%",
    suites: 42,
    tenantMix: "Tier-1 multinational tech & banking anchors (WALE 5.2 yrs)",
    amenities: ["3-Phase Power", "Backup Generator", "Fiber Optic", "CCTV Surveillance", "24/7 Security", "Elevator", "Parking Garage", "Smart BMS"],
    investmentThesis: "Prime Grade A commercial office asset in Westlands commercial corridor. Weighted average unexpired lease term provides defensive cash flow with contractual annual rent escalations."
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Gateway Logistics & Cold Storage Hub",
    category: "Logistics",
    location: "Mombasa Road Corridor",
    size: "250,000 sq ft GLA",
    sizeNumeric: 250000,
    floorPlate: "50,000 sq ft clear-span warehouse bays",
    capRate: 9.6,
    capRateDisplay: "9.6% Cap Rate",
    yieldDisplay: "10.2% Net Yield",
    isLease: false,
    priceNumeric: 890000000,
    priceDisplay: "Ksh 890,000,000",
    status: "Occupied (Yield-generating)",
    occupancy: "Fully Occupied",
    image: "/images/architectural-1.jpg",
    images: [
      "/images/architectural-1.jpg",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1200&auto=format&fit=crop"
    ],
    yearBuilt: 2021,
    occupancyRate: "100%",
    suites: 8,
    tenantMix: "Global FMCG distributor on a 12-year indexed NNN lease",
    amenities: ["3-Phase Power", "Backup Generator", "Fire Suppression", "Loading Docks", "Cold Storage", "CCTV Surveillance", "24/7 Security"],
    investmentThesis: "Purpose-engineered commercial logistics hub on the primary Nairobi-Mombasa freight artery. Long-term corporate covenant with zero landlord capex obligations under NNN lease terms."
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "The Sovereign Grand Corporate Suites",
    category: "Hospitality",
    location: "Kilimani, Nairobi",
    size: "65,000 sq ft GLA",
    sizeNumeric: 65000,
    floorPlate: "12,000 sq ft typical floor plate",
    capRate: 8.2,
    capRateDisplay: "8.2% Cap Rate",
    yieldDisplay: "8.7% Projected Yield",
    isLease: true,
    priceNumeric: 120,
    priceDisplay: "Ksh 120 / sq.ft / month",
    baseRent: "Ksh 95 / sq.ft",
    serviceCharge: "Ksh 25 / sq.ft",
    status: "Vacant (Available immediately)",
    occupancy: "Vacant",
    image: "/images/hero-modern-villa.jpg",
    images: [
      "/images/hero-modern-villa.jpg",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop"
    ],
    yearBuilt: 2022,
    occupancyRate: "0%",
    suites: 48,
    tenantMix: "Available for single corporate operator or master lease",
    amenities: ["Backup Generator", "Fiber Optic", "Elevator", "Parking Garage", "Gym / Wellness", "Conference Facilities", "Rooftop Access"],
    investmentThesis: "Newly commissioned commercial hospitality asset in diplomatic enclave. Immediately available for corporate headquarters or institutional hospitality operator."
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: "Capital Square Commercial Promenade",
    category: "Retail",
    location: "Karen, Nairobi",
    size: "85,000 sq ft GLA",
    sizeNumeric: 85000,
    floorPlate: "20,000 sq ft open retail floor plate",
    capRate: 9.1,
    capRateDisplay: "9.1% Cap Rate",
    yieldDisplay: "9.8% Net Yield",
    isLease: false,
    priceNumeric: 980000000,
    priceDisplay: "Ksh 980,000,000",
    status: "Occupied (Yield-generating)",
    occupancy: "Fully Occupied",
    image: "/images/pillar-commercial.jpg",
    images: [
      "/images/pillar-commercial.jpg",
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567449303078-57ad995bd301?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=1200&auto=format&fit=crop"
    ],
    yearBuilt: 2018,
    occupancyRate: "97%",
    suites: 36,
    tenantMix: "Anchor organic grocer, commercial banking hubs & executive dining",
    amenities: ["3-Phase Power", "Backup Generator", "CCTV Surveillance", "24/7 Security", "Parking Garage", "Fire Suppression", "Cafeteria"],
    investmentThesis: "High-barrier-to-entry commercial retail asset in Karen. Strong affluent catchment generating stable turnover rents and sustainable foot traffic."
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    name: "Upper Hill Prime Financial Tower",
    category: "Office",
    location: "Upper Hill, Nairobi",
    size: "140,000 sq ft GLA",
    sizeNumeric: 140000,
    floorPlate: "22,000 sq ft column-free floor plate",
    capRate: 8.4,
    capRateDisplay: "8.4% Cap Rate",
    yieldDisplay: "9.1% Net Yield",
    isLease: true,
    priceNumeric: 140,
    priceDisplay: "Ksh 140 / sq.ft / month",
    baseRent: "Ksh 110 / sq.ft",
    serviceCharge: "Ksh 30 / sq.ft",
    status: "Occupied (Yield-generating)",
    occupancy: "Partially Leased",
    image: "/images/architectural-2.jpg",
    images: [
      "/images/architectural-2.jpg",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop"
    ],
    yearBuilt: 2020,
    occupancyRate: "91%",
    suites: 56,
    tenantMix: "Regional banking institutions & legal advisory practices",
    amenities: ["3-Phase Power", "Backup Generator", "Fiber Optic", "Elevator", "Smart BMS", "Parking Garage", "Conference Facilities", "Gym / Wellness", "Cafeteria", "Helipad"],
    investmentThesis: "Landmark corporate headquarters tower in Nairobi financial node. Column-free floor plates allow maximum occupational efficiency for corporate tenants."
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    name: "Athi River Special Economic Fulfillment Center",
    category: "Logistics",
    location: "Athi River SEZ, Machakos",
    size: "320,000 sq ft GLA",
    sizeNumeric: 320000,
    floorPlate: "80,000 sq ft high-bay industrial bays",
    capRate: 10.2,
    capRateDisplay: "10.2% Cap Rate",
    yieldDisplay: "11.0% Potential Yield",
    isLease: true,
    priceNumeric: 75,
    priceDisplay: "Ksh 75 / sq.ft / month",
    baseRent: "Ksh 60 / sq.ft",
    serviceCharge: "Ksh 15 / sq.ft",
    status: "Vacant (Available immediately)",
    occupancy: "Vacant",
    image: "/images/apartment-1.jpg",
    images: [
      "/images/apartment-1.jpg",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1200&auto=format&fit=crop"
    ],
    yearBuilt: 2023,
    occupancyRate: "0%",
    suites: 4,
    tenantMix: "Engineered for regional e-commerce & cross-border freight operators",
    amenities: ["3-Phase Power", "Backup Generator", "Loading Docks", "Fire Suppression", "CCTV Surveillance", "24/7 Security"],
    investmentThesis: "Brand-new Grade A distribution infrastructure situated within a designated Special Economic Zone (SEZ), offering corporate tenants substantial fiscal incentives."
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    name: "The Azure Executive Business Hotel",
    category: "Hospitality",
    location: "Parklands, Nairobi",
    size: "72,000 sq ft GLA",
    sizeNumeric: 72000,
    floorPlate: "14,000 sq ft floor plate",
    capRate: 7.9,
    capRateDisplay: "7.9% Cap Rate",
    yieldDisplay: "8.4% Net Yield",
    isLease: true,
    priceNumeric: 130,
    priceDisplay: "Ksh 130 / sq.ft / month",
    baseRent: "Ksh 105 / sq.ft",
    serviceCharge: "Ksh 25 / sq.ft",
    status: "Occupied (Yield-generating)",
    occupancy: "Fully Occupied",
    image: "/images/hero-villa.jpg",
    images: [
      "/images/hero-villa.jpg",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop"
    ],
    yearBuilt: 2017,
    occupancyRate: "88%",
    suites: 96,
    tenantMix: "International business travel operator on a 15-year master lease",
    amenities: ["Backup Generator", "Fiber Optic", "Elevator", "Parking Garage", "Conference Facilities", "Gym / Wellness", "Cafeteria", "Rooftop Access"],
    investmentThesis: "Turnkey commercial hospitality asset with stable corporate booking pipelines driven by proximity to Aga Khan University Hospital and diplomatic missions."
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    name: "Limuru Road Commercial Retail Pavilion",
    category: "Retail",
    location: "Two Rivers Corridor, Ruaka",
    size: "95,000 sq ft GLA",
    sizeNumeric: 95000,
    floorPlate: "25,000 sq ft retail floor plate",
    capRate: 9.4,
    capRateDisplay: "9.4% Cap Rate",
    yieldDisplay: "10.1% Net Yield",
    isLease: false,
    priceNumeric: 840000000,
    priceDisplay: "Ksh 840,000,000",
    status: "Occupied (Yield-generating)",
    occupancy: "Fully Occupied",
    image: "/images/interior-1.jpg",
    images: [
      "/images/interior-1.jpg",
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567449303078-57ad995bd301?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=1200&auto=format&fit=crop"
    ],
    yearBuilt: 2020,
    occupancyRate: "96%",
    suites: 28,
    tenantMix: "Regional supermarket chain, medical diagnostics & pharmacy anchors",
    amenities: ["3-Phase Power", "Backup Generator", "CCTV Surveillance", "24/7 Security", "Parking Garage", "Elevator"],
    investmentThesis: "Prime commercial frontage on Limuru Road benefiting from continuous dual-carriageway commuter traffic and high density residential developments."
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440009",
    name: "Kilimani Tech Hub & Modular Office Suites",
    category: "Office",
    location: "Kilimani, Nairobi",
    size: "58,000 sq ft GLA",
    sizeNumeric: 58000,
    floorPlate: "10,000 sq ft modular tech floor plate",
    capRate: 8.9,
    capRateDisplay: "8.9% Cap Rate",
    yieldDisplay: "9.5% Potential Yield",
    isLease: true,
    priceNumeric: 100,
    priceDisplay: "Ksh 100 / sq.ft / month",
    baseRent: "Ksh 80 / sq.ft",
    serviceCharge: "Ksh 20 / sq.ft",
    status: "Vacant (Available immediately)",
    occupancy: "Vacant",
    image: "/images/architectural-commercial.jpg",
    images: [
      "/images/architectural-commercial.jpg",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop"
    ],
    yearBuilt: 2022,
    occupancyRate: "0%",
    suites: 24,
    tenantMix: "Available for technology companies, scale-ups, and corporate regional suites",
    amenities: ["3-Phase Power", "Backup Generator", "Fiber Optic", "Elevator", "Smart BMS", "Parking Garage"],
    investmentThesis: "High-spec Cat-A corporate office building designed with high ceilings and heavy fiber redundancy to cater to Nairobi's expanding technology sector."
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    name: "Northlands Industrial Logistics Depot",
    category: "Logistics",
    location: "Thika Highway Corridor",
    size: "180,000 sq ft GLA",
    sizeNumeric: 180000,
    floorPlate: "45,000 sq ft industrial bays",
    capRate: 9.8,
    capRateDisplay: "9.8% Cap Rate",
    yieldDisplay: "10.5% Net Yield",
    isLease: false,
    priceNumeric: 760000000,
    priceDisplay: "Ksh 760,000,000",
    status: "Occupied (Yield-generating)",
    occupancy: "Fully Occupied",
    image: "/images/villa-2.jpg",
    images: [
      "/images/villa-2.jpg",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1200&auto=format&fit=crop"
    ],
    yearBuilt: 2019,
    occupancyRate: "100%",
    suites: 12,
    tenantMix: "Manufacturing supply chain, cold storage & building materials suppliers",
    amenities: ["3-Phase Power", "Backup Generator", "Loading Docks", "Fire Suppression", "CCTV Surveillance", "24/7 Security", "Parking Garage"],
    investmentThesis: "Defensive industrial real estate asset with 100% occupancy history. Heavy power allocation and 40ft container access make it an essential node for manufacturers."
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440011",
    name: "Lavington Green Corporate Professional Plaza",
    category: "Retail",
    location: "Lavington, Nairobi",
    size: "48,000 sq ft GLA",
    sizeNumeric: 48000,
    floorPlate: "12,000 sq ft boutique floor plate",
    capRate: 8.7,
    capRateDisplay: "8.7% Cap Rate",
    yieldDisplay: "9.2% Net Yield",
    isLease: false,
    priceNumeric: 470000000,
    priceDisplay: "Ksh 470,000,000",
    status: "Occupied (Yield-generating)",
    occupancy: "Fully Occupied",
    image: "/images/villa-3.jpg",
    images: [
      "/images/villa-3.jpg",
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567449303078-57ad995bd301?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=1200&auto=format&fit=crop"
    ],
    yearBuilt: 2021,
    occupancyRate: "92%",
    suites: 18,
    tenantMix: "Private wealth family offices, executive medical practices, law firms",
    amenities: ["Backup Generator", "CCTV Surveillance", "24/7 Security", "Parking Garage", "Elevator"],
    investmentThesis: "Boutique commercial asset in mature Lavington node. Long tenant retention with strong covenant private wealth and professional practice tenants."
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440012",
    name: "Great Rift Commercial Conference Resort",
    category: "Hospitality",
    location: "Naivasha Panorama Corridor",
    size: "110,000 sq ft GLA",
    sizeNumeric: 110000,
    floorPlate: "25,000 sq ft convention floor plate",
    capRate: 8.1,
    capRateDisplay: "8.1% Cap Rate",
    yieldDisplay: "8.8% Potential Yield",
    isLease: true,
    priceNumeric: 85,
    priceDisplay: "Ksh 85 / sq.ft / month",
    baseRent: "Ksh 65 / sq.ft",
    serviceCharge: "Ksh 20 / sq.ft",
    status: "Vacant (Available immediately)",
    occupancy: "Vacant",
    image: "/images/hero-modern-villa.jpg",
    images: [
      "/images/hero-modern-villa.jpg",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop"
    ],
    yearBuilt: 2016,
    occupancyRate: "0%",
    suites: 200,
    tenantMix: "Available for MICE corporate conference & executive hospitality operators",
    amenities: ["Backup Generator", "Fiber Optic", "Conference Facilities", "Gym / Wellness", "Parking Garage", "Rooftop Access", "Cafeteria"],
    investmentThesis: "Substantial commercial convention and hotel complex with comprehensive amenities. Significant upside via repositioning as a corporate executive retreat center."
  },
];

const CATEGORIES: AssetClass[] = ["All", "Office", "Logistics", "Hospitality", "Retail"];

export default function PropertiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<AssetClass>("All");
  const [sortBy, setSortBy] = useState<SortOption>("cap-rate");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<PriceRange>("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [areaRange, setAreaRange] = useState<AreaRange>("All");
  const [minSuites, setMinSuites] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

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
    let list = [...COMMERCIAL_ASSETS];
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
    if (selectedCategory !== "All") list = list.filter((p) => p.category === selectedCategory);
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

    if (sortBy === "cap-rate") list.sort((a, b) => b.capRate - a.capRate);
    else if (sortBy === "yield") list.sort((a, b) => parseFloat(b.yieldDisplay) - parseFloat(a.yieldDisplay));
    else if (sortBy === "size") list.sort((a, b) => b.sizeNumeric - a.sizeNumeric);

    return list;
  }, [selectedCategory, sortBy, searchTerm, priceRange, statusFilter, areaRange, minSuites, selectedAmenities]);

  const clearAll = () => {
    setSelectedCategory("All");
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
              <span>{filteredAndSorted.length} Institutional Assets Available</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0F172A] mb-3"
              style={{ fontFamily: "Cinzel, Georgia, serif" }}
            >
              Commercial Assets & Opportunities
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
              Prime commercial real estate portfolios, corporate floor plates, high-yield logistics hubs, and core-plus investments across Nairobi.
            </p>
          </div>

          {/* SEARCH & FILTERS BAR */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-sm mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="relative sm:col-span-2 lg:col-span-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search assets, tenants, or corridors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-lg text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
                />
              </div>

              {/* Asset Class */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as AssetClass)}
                  className="w-full appearance-none px-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] cursor-pointer"
                >
                  <option value="All">All Asset Classes</option>
                  <option value="Office">Office Towers</option>
                  <option value="Retail">Retail Promenades</option>
                  <option value="Logistics">Logistics Hubs</option>
                  <option value="Hospitality">Corporate Hospitality</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Pricing Structure */}
              <div className="relative">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value as PriceRange)}
                  className="w-full appearance-none px-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] cursor-pointer"
                >
                  <option value="All">All Valuations & Lease Rates</option>
                  <option value="lease">Lease Opportunities (sq.ft/mo)</option>
                  <option value="sale-under800">Acquisitions &lt; Ksh 800M</option>
                  <option value="sale-over800">Acquisitions Ksh 800M+</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Commercial Status */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                  className="w-full appearance-none px-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] cursor-pointer"
                >
                  <option value="All">All Commercial Statuses</option>
                  <option value="Occupied (Yield-generating)">Occupied (Yield-generating)</option>
                  <option value="Vacant (Available immediately)">Vacant (Available immediately)</option>
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

          {/* ASSET CLASS PILLS + SORTING */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pt-2">
            <div className="flex flex-wrap items-center gap-2.5">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                      active
                        ? "bg-[#0F766E] text-white shadow-sm ring-2 ring-[#0F766E]/20"
                        : "bg-white/80 backdrop-blur-md border border-slate-200/90 text-slate-700 hover:bg-white hover:text-[#0F766E] hover:border-[#0F766E]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/80 shadow-sm self-start md:self-auto">
              <span className="text-slate-400">Sort by:</span>
              <button
                onClick={() => setSortBy("cap-rate")}
                className={`transition-colors cursor-pointer px-1.5 py-0.5 rounded ${
                  sortBy === "cap-rate" ? "text-[#0F766E] font-bold" : "text-slate-600 hover:text-[#0F172A]"
                }`}
              >
                Cap rate
              </button>
              <span className="text-slate-300">&middot;</span>
              <button
                onClick={() => setSortBy("yield")}
                className={`transition-colors cursor-pointer px-1.5 py-0.5 rounded ${
                  sortBy === "yield" ? "text-[#0F766E] font-bold" : "text-slate-600 hover:text-[#0F172A]"
                }`}
              >
                Projected Yield
              </button>
              <span className="text-slate-300">&middot;</span>
              <button
                onClick={() => setSortBy("size")}
                className={`transition-colors cursor-pointer px-1.5 py-0.5 rounded ${
                  sortBy === "size" ? "text-[#0F766E] font-bold" : "text-slate-600 hover:text-[#0F172A]"
                }`}
              >
                GLA Size
              </button>
            </div>
          </div>
        </div>

        {/* ASSET CARDS GRID */}
        {filteredAndSorted.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-xl p-16 text-center shadow-sm">
            <h3 className="text-xl font-bold text-[#0F172A] mb-2" style={{ fontFamily: "Cinzel, Georgia, serif" }}>
              No Commercial Assets Found
            </h3>
            <p className="text-slate-500 text-sm mb-6">No properties matched the selected parameters.</p>
            <button
              onClick={clearAll}
              className="px-6 py-2.5 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs uppercase font-semibold tracking-wider rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
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
                  
                  {/* Category Tag on Left */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-[#0F172A]/90 backdrop-blur-sm text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded">
                      {property.category}
                    </span>
                  </div>

                  {/* Frosted Glass "X Photos" Badge with Camera Icon on Right */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/85 backdrop-blur-md text-[#0F172A] border border-white/40 shadow-sm text-[11px] font-semibold">
                    <Camera className="w-3.5 h-3.5 text-[#0F766E]" />
                    <span>{property.images?.length || 4} Photos</span>
                  </div>
                </div>

                {/* Dossier Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Status Badge + Yield/Cap Rate */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-[#0F766E]">
                        {property.status}
                      </span>
                      <span className="text-[#0F766E] font-bold text-xs tracking-tight">
                        {property.capRateDisplay}
                      </span>
                    </div>

                    {/* Asset Title */}
                    <h2
                      className="text-[#0F172A] font-bold text-lg leading-snug mb-2 group-hover:text-[#0F766E] transition-colors line-clamp-1"
                      style={{ fontFamily: "Cinzel, Georgia, serif" }}
                    >
                      {property.name}
                    </h2>

                    {/* Corridor, GLA, and Floor Plate */}
                    <div className="space-y-1.5 mb-3 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{property.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{property.size}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{property.floorPlate}</span>
                      </div>
                    </div>

                    {/* Tenant Mix info snippet */}
                    <p className="text-[11px] text-slate-500 line-clamp-1 mb-4 italic font-light">
                      Tenant Mix: {property.tenantMix}
                    </p>
                  </div>

                  {/* Pricing Bottom Row */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                        {property.isLease ? "Commercial Lease Rate" : "Asking Capital Valuation"}
                      </span>
                      <span className="text-[#0F172A] font-bold text-base tracking-tight">
                        {property.priceDisplay}
                      </span>
                    </div>

                    <span className="text-[#0F766E] group-hover:text-[#0D9488] text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors duration-200">
                      <span>View dossier</span>
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
