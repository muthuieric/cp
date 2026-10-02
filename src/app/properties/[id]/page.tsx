import PropertyDetailPage from "./PropertyDetailsClient";
import prisma from "@/lib/prisma";
import { transformDbProperty, COMMERCIAL_ASSETS } from "@/lib/commercialAssets";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function PropertyDetailsPage({ params }: PropertyPageProps) {
  const { id } = await params;

  // 1. Check static assets first
  let initialProperty = COMMERCIAL_ASSETS.find(
    (p) => p.id === id || String(p.id).toLowerCase() === String(id).toLowerCase()
  );

  // 2. Query PostgreSQL database by UUID string
  if (!initialProperty) {
    try {
      const dbProp = await prisma.property.findUnique({
        where: { id: String(id) },
        include: { images: true },
      });
      if (dbProp) {
        initialProperty = transformDbProperty(dbProp);
      }
    } catch (err) {
      console.warn("Could not query property by UUID:", err);
    }
  }

  return <PropertyDetailPage propertyId={id} initialProperty={initialProperty || null} />;
}
