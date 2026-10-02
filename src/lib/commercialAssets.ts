export function stripHtml(input: string | null | undefined): string {
  if (!input) return "";
  return input
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\\+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function decodeHtml(input: string | null | undefined): string {
  if (!input) return "";
  let clean = input.replace(/\\+/g, "");
  if (clean.includes("&lt;") || clean.includes("&gt;")) {
    clean = clean
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/&amp;/gi, "&");
  }
  return clean;
}

export function formatCompactPrice(price: number, isLease: boolean): string {
  if (isLease) return `Ksh ${price.toLocaleString()}/mo`;
  if (price >= 1_000_000_000) {
    const val = price / 1_000_000_000;
    return `Ksh ${val % 1 === 0 ? val.toFixed(0) : val.toFixed(2)}B`;
  }
  if (price >= 1_000_000) {
    const val = price / 1_000_000;
    return `Ksh ${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}M`;
  }
  return `Ksh ${price.toLocaleString()}`;
}

export type CommercialStatus = "Vacant" | "Occupied";
export type AssetClass = "All" | "Office" | "Logistics" | "Hospitality" | "Retail";
export type PriceRange = "All" | "lease" | "sale-under800" | "sale-over800";
export type StatusFilter = "All" | "Vacant" | "Occupied";
export type SortOption = "newest" | "cap-rate" | "yield" | "size";
export type AreaRange = "All" | "under50k" | "50kto100k" | "100kto200k" | "over200k";

export const AMENITIES_LIST = [
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
  description?: string;
  descriptionHtml?: string;
  isLive?: boolean;
  createdAt?: string;
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
    status: "Occupied",
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
    status: "Occupied",
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
    status: "Vacant",
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
    status: "Occupied",
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
    status: "Occupied",
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
    status: "Vacant",
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
    status: "Occupied",
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
    status: "Occupied",
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
    status: "Vacant",
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
    status: "Occupied",
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
    status: "Occupied",
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
    status: "Vacant",
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

export function transformDbProperty(p: any): CommercialProperty {
  const isLease =
    p.status === "For Rent" ||
    (typeof p.status === "string" &&
      (p.status.toLowerCase().includes("rent") || p.status.toLowerCase().includes("lease")));

  const priceNum = Number(p.price) || 0;
  const areaNum = p.area ? Number(p.area) : 25000;

  let category: "Office" | "Logistics" | "Hospitality" | "Retail" = "Office";
  const typeStr = (p.type || "").toLowerCase();
  if (typeStr.includes("logist") || typeStr.includes("warehous") || typeStr.includes("industr")) {
    category = "Logistics";
  } else if (typeStr.includes("hosp") || typeStr.includes("hotel")) {
    category = "Hospitality";
  } else if (typeStr.includes("retail") || typeStr.includes("mall") || typeStr.includes("shop")) {
    category = "Retail";
  }

  let imageList: string[] = [];
  if (Array.isArray(p.images) && p.images.length > 0) {
    imageList = p.images.map((img: any) => (typeof img === "string" ? img : img.url)).filter(Boolean);
  }
  const defaultImage = "/images/hq-commercial-tower.jpg";
  const primaryImage = imageList[0] || defaultImage;
  const safeImages = imageList.length > 0 ? imageList : [defaultImage];

  let amenitiesList: string[] = ["24/7 Security", "Backup Generator", "Fiber Optic"];
  if (Array.isArray(p.amenities) && p.amenities.length > 0) {
    amenitiesList = p.amenities;
  } else if (typeof p.amenities === "string") {
    try {
      amenitiesList = JSON.parse(p.amenities);
    } catch {
      amenitiesList = [p.amenities];
    }
  }

  // Sanitize amenities — strip HTML and reject single-character entries
  amenitiesList = amenitiesList
    .map((a) => stripHtml(String(a)))
    .filter((a) => a && a.length >= 2);
  if (amenitiesList.length === 0) {
    amenitiesList = ["24/7 Security", "Backup Generator", "Fiber Optic"];
  }

  const isVacant = typeof p.status === "string" && p.status.toLowerCase().includes("vacant");
  const statusNorm: CommercialStatus = isVacant ? "Vacant" : "Occupied";
  const occupancyNorm = isVacant ? "Vacant" : "Fully Occupied";
  const yearBuilt = p.createdAt ? new Date(p.createdAt).getFullYear() : 2024;

  const cleanDescription = stripHtml(p.description);
  let cleanTenantMix = "Institutional commercial tenant occupancy";
  if (cleanDescription) {
    cleanTenantMix = cleanDescription.length > 120
      ? `${cleanDescription.slice(0, 117).trim()}...`
      : cleanDescription;
  }

  return {
    id: String(p.id),
    name: p.title || "Commercial Property Asset",
    category,
    location: p.location || "Nairobi, Kenya",
    size: `${areaNum.toLocaleString()} sq ft GLA`,
    sizeNumeric: areaNum,
    floorPlate: `${Math.round(areaNum / Math.max(1, p.bedrooms || 1)).toLocaleString()} sq ft floor plate`,
    capRate: 8.5,
    capRateDisplay: "8.5% Cap Rate",
    yieldDisplay: "9.2% Net Yield",
    isLease,
    priceNumeric: priceNum,
    priceDisplay: formatCompactPrice(priceNum, isLease),
    baseRent: isLease ? `Ksh ${Math.round(priceNum * 0.85).toLocaleString()}/mo` : undefined,
    serviceCharge: isLease ? `Ksh ${Math.round(priceNum * 0.15).toLocaleString()}/mo` : undefined,
    status: statusNorm,
    occupancy: occupancyNorm,
    image: primaryImage,
    images: safeImages,
    yearBuilt,
    occupancyRate: isVacant ? "0%" : "100%",
    suites: Number(p.bedrooms) || 1,
    tenantMix: cleanTenantMix,
    amenities: amenitiesList,
    investmentThesis:
      cleanDescription ||
      "Institutional-grade commercial asset offering strategic location advantages, strong tenant covenant, and predictable long-term yield generation.",
    description: cleanDescription,
    descriptionHtml: decodeHtml(p.description) || "",
    isLive: true,
    createdAt: p.createdAt ? String(p.createdAt) : new Date().toISOString(),
  };
}
