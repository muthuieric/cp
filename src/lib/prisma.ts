// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { getSampleProperties, getSamplePropertyById, PropertyData } from "./sampleProperties";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const isDatabaseConfigured = Boolean(
  process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== ""
);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function getPropertiesSafe(): Promise<PropertyData[]> {
  if (!isDatabaseConfigured) {
    return getSampleProperties();
  }

  try {
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: "desc" },
      include: { images: true },
    });

    if (!properties || properties.length === 0) {
      return getSampleProperties();
    }

    return properties.map((p) => ({
      ...p,
      price: Number(p.price),
      area: p.area ? Number(p.area) : 0,
      description: p.description || "",
      amenities: Array.isArray(p.amenities) ? (p.amenities as string[]) : [],
      status: p.status || "Available",
      images: p.images?.length > 0 ? p.images.map((img) => img.url) : ["/images/hero-villa.jpg"],
    }));
  } catch (err) {
    console.warn("Prisma query failed, falling back to sample properties:", err);
    return getSampleProperties();
  }
}

export async function getPropertyByIdSafe(id: number | string): Promise<PropertyData | null> {
  const idStr = String(id);
  const numId = Number(id) || 1;

  if (!isDatabaseConfigured) {
    return getSamplePropertyById(numId);
  }

  try {
    const property: any = await prisma.property.findUnique({
      where: { id: idStr },
      include: { images: true },
    });

    if (!property) {
      return getSamplePropertyById(numId);
    }

    return {
      ...property,
      price: Number(property.price),
      area: property.area ? Number(property.area) : 0,
      description: property.description || "",
      amenities: Array.isArray(property.amenities) ? (property.amenities as string[]) : [],
      status: property.status || "Available",
      images: property.images?.length > 0 ? property.images.map((img: any) => img.url) : ["/images/hero-villa.jpg"],
    };
  } catch (err) {
    console.warn("Prisma query failed, falling back to sample property:", err);
    return getSamplePropertyById(numId);
  }
}

export default prisma;
