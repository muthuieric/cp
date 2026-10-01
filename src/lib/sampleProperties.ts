export interface PropertyData {
  id: string | number;
  title: string;
  location: string;
  price: number;
  type: string;
  status: "For Sale" | "For Rent" | string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  amenities: string[];
  images: string[];
  createdAt?: string | Date;
  featured?: boolean;
}

export const sampleProperties: PropertyData[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    title: "The Delta Pinnacle Office Tower",
    location: "Westlands, Nairobi",
    price: 1450000000,
    type: "Commercial Office",
    status: "Occupied (Yield-generating)",
    bedrooms: 0,
    bathrooms: 16,
    area: 120000,
    description: "Prime Grade A commercial office asset in Westlands commercial corridor. Weighted average unexpired lease term provides defensive cash flow with contractual annual rent escalations.",
    amenities: ["3-Phase Power", "Backup Generator", "Fiber Optic", "CCTV Surveillance", "24/7 Security", "Elevator", "Parking Garage", "Smart BMS"],
    images: [
      "/images/hq-commercial-tower.jpg",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop"
    ],
    featured: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    title: "Gateway Logistics & Cold Storage Hub",
    location: "Mombasa Road Corridor",
    price: 880000000,
    type: "Industrial Logistics",
    status: "Occupied (Yield-generating)",
    bedrooms: 0,
    bathrooms: 8,
    area: 250000,
    description: "Strategic high-bay distribution centre with integrated cold-chain bays and container staging aprons. Anchored by regional logistics and FMCG operators.",
    amenities: ["Heavy Vehicle Staging", "3-Phase Power", "Backup Generator", "Loading Docks", "Cold Storage", "CCTV Surveillance", "Fire Suppression"],
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1200&auto=format&fit=crop"
    ],
    featured: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    title: "The Pavilion Mall & Retail Center",
    location: "Kilimani Commercial Node",
    price: 2100000000,
    type: "Retail Center",
    status: "Occupied (Yield-generating)",
    bedrooms: 0,
    bathrooms: 24,
    area: 95000,
    description: "Institutional retail pavilion with tier-1 anchor supermarket, international fashion retailers, and rooftop executive dining.",
    amenities: ["Basement Parking (350 bays)", "Backup Generator", "High-Flow Escalators", "Central HVAC", "24/7 Security", "Fiber Optic"],
    images: [
      "https://images.unsplash.com/photo-1567449303078-57ad995bd301?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1200&auto=format&fit=crop"
    ],
    featured: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    title: "Apex Horizon Tech Park - Building A",
    location: "Upper Hill Financial District",
    price: 3200000000,
    type: "Commercial Office",
    status: "Vacant (Available immediately)",
    bedrooms: 0,
    bathrooms: 32,
    area: 180000,
    description: "LEED Gold certified corporate headquarters building designed for technology giants and financial institutions. Dual-feed substation, redundant power and telecom infrastructure.",
    amenities: ["Fiber Optic Dual Ring", "Redundant Generators (N+1)", "Helipad", "Executive Fitness Suite", "Auditorium", "Parking Garage"],
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop"
    ],
    featured: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    title: "Industrial Logistics Yard & Depot",
    location: "Embakasi Inland Container Depot",
    price: 650000000,
    type: "Industrial Logistics",
    status: "Vacant (Available immediately)",
    bedrooms: 0,
    bathrooms: 6,
    area: 140000,
    description: "Turnkey logistics yard with 5-acre reinforced hardstand paving, security perimeter, high-mast floodlights, and integrated customs clearance office.",
    amenities: ["Reinforced Paving", "High-Mast Lighting", "Weighbridge Facility", "CCTV Surveillance", "24/7 Security", "3-Phase Power"],
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop"
    ],
    featured: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    title: "Grand Azure Hospitality Suites",
    location: "Westlands Prime Node",
    price: 1750000000,
    type: "Hospitality",
    status: "Occupied (Yield-generating)",
    bedrooms: 64,
    bathrooms: 70,
    area: 88000,
    description: "Operating commercial hospitality asset with 64 extended-stay executive suites, conference facilities, heated pool, and rooftop cocktail lounge.",
    amenities: ["Rooftop Lounge", "Heated Pool", "Conference Facilities", "High-Speed Elevators", "Backup Generator", "Fiber Optic"],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop"
    ],
    featured: true,
  }
];

export function getSampleProperties(): PropertyData[] {
  return sampleProperties;
}

export function getSamplePropertyById(id: number | string): PropertyData | null {
  return (
    sampleProperties.find((p) => String(p.id) === String(id)) ||
    sampleProperties.find((p) => String(p.id).endsWith(String(id))) ||
    sampleProperties[0] ||
    null
  );
}
