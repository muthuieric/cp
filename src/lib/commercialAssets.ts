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

export function isGibberish(text: string | null | undefined): boolean {
  if (!text) return true;
  const stripped = stripHtml(text).trim().toLowerCase();
  if (stripped.length < 3) return true;
  if (
    stripped.includes("mn,jmk") ||
    stripped.includes("drftgyjh") ||
    stripped === "nm" ||
    stripped === "asdf" ||
    stripped === "f" ||
    stripped === "fg" ||
    stripped === "fdv" ||
    stripped === "gfhj" ||
    stripped === "fghb" ||
    stripped === "fdfret" ||
    stripped === "cvxds"
  ) {
    return true;
  }
  if (/^[bcdfghjklmnpqrstvwxyz\s,.-]{4,}$/i.test(stripped)) {
    return true;
  }
  return false;
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

export const COMMERCIAL_ASSETS: CommercialProperty[] = [];

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

  const isOccupied = typeof p.status === "string" && (p.status.toLowerCase().includes("occupied") || p.status.toLowerCase().includes("rented"));
  const isVacant = !isOccupied;
  const statusNorm: CommercialStatus = isOccupied ? "Occupied" : "Vacant";
  const occupancyNorm = isOccupied ? "Fully Occupied" : "Vacant";
  const yearBuilt = p.createdAt ? new Date(p.createdAt).getFullYear() : 2024;

  const rawTitle = p.title || "";
  const cleanTitle = isGibberish(rawTitle)
    ? (p.location ? `Commercial Space - ${p.location}` : "Executive Commercial Suite")
    : rawTitle;

  const cleanDescription = stripHtml(p.description);
  let cleanTenantMix = "Details available upon request.";
  if (cleanDescription && !isGibberish(cleanDescription)) {
    cleanTenantMix = cleanDescription.length > 120
      ? `${cleanDescription.slice(0, 117).trim()}...`
      : cleanDescription;
  }

  const thesisText = (!cleanDescription || isGibberish(cleanDescription))
    ? "Details available upon request."
    : cleanDescription;

  const htmlContent = (!p.description || isGibberish(p.description))
    ? "<p>Details available upon request.</p>"
    : (decodeHtml(p.description) || "<p>Details available upon request.</p>");

  return {
    id: String(p.id),
    name: cleanTitle,
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
    investmentThesis: thesisText,
    description: thesisText,
    descriptionHtml: htmlContent,
    isLive: true,
    createdAt: p.createdAt ? String(p.createdAt) : new Date().toISOString(),
  };
}
