import { prisma } from "@/lib/prisma";
import PropertiesClient from "@/app/properties/PropertiesClient";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const sampleArchitecturalProperties = [
  {
    id: "sample-1",
    title: "The Pavilion Minimalist Villa",
    location: "Karen, Nairobi",
    price: "85000000",
    type: "Villa",
    status: "For Sale" as const,
    bedrooms: 5,
    bathrooms: 6,
    area: "650 sqm",
    images: ["/images/hero-villa.jpg", "/images/villa-2.jpg"],
    featured: true,
  },
  {
    id: "sample-2",
    title: "Cantilever Modernist Residence",
    location: "Kitisuru, Nairobi",
    price: "120000000",
    type: "Villa",
    status: "For Sale" as const,
    bedrooms: 6,
    bathrooms: 7,
    area: "820 sqm",
    images: ["/images/villa-2.jpg", "/images/villa-3.jpg"],
    featured: true,
  },
  {
    id: "sample-3",
    title: "Atrium Skyline Penthouse",
    location: "Westlands, Nairobi",
    price: "45000000",
    type: "Penthouse",
    status: "For Sale" as const,
    bedrooms: 4,
    bathrooms: 4,
    area: "390 sqm",
    images: ["/images/apartment-1.jpg", "/images/interior-1.jpg"],
    featured: true,
  },
];

export default async function FeaturedPropertiesPage() {
  let transformed: any[] = [];
  try {
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: "desc" },
      include: { images: true },
    });

    transformed = properties.map((p) => ({
      ...p,
      images: p.images?.map((img) => img.url) ?? [],
    }));
  } catch (error) {
    console.warn("Using sample properties fallback:", error);
  }

  const displayProperties = transformed.length > 0 ? transformed : sampleArchitecturalProperties;

  return (
    <section className="py-20 sm:py-28 bg-neutral-50 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-900 border-b border-neutral-900 pb-1 inline-block">
              Curated Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-950 tracking-tight">
              Selected Architectural Works
            </h2>
            <p className="text-neutral-500 font-light text-sm sm:text-base max-w-xl">
              Discover prime residences and modernist developments handpicked for spatial refinement and lasting architectural value.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 hover:text-neutral-600 transition-colors group"
          >
            <span>Explore all projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Properties Listing */}
        <PropertiesClient properties={displayProperties} />

        {/* View All Bottom Button */}
        <div className="text-center mt-16">
          <Link href="/properties">
            <button className="px-8 py-3.5 border border-neutral-900 text-neutral-950 hover:bg-neutral-950 hover:text-white transition-all duration-300 text-xs uppercase tracking-[0.22em] font-semibold rounded-lg shadow-sm">
              View Complete Collection
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}
