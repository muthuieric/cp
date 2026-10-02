import prisma from "@/lib/prisma";
import {
  COMMERCIAL_ASSETS,
  transformDbProperty,
  CommercialProperty,
  formatCompactPrice,
} from "@/lib/commercialAssets";
import PropertiesClient from "./PropertiesClient";

export const dynamic = "force-dynamic";

// Re-export for any components that import from @/app/properties/page
export { COMMERCIAL_ASSETS, formatCompactPrice, transformDbProperty };
export type { CommercialProperty };

export default async function PropertiesPage() {
  let initialProperties: CommercialProperty[] = COMMERCIAL_ASSETS;
  try {
    const dbProps = await prisma.property.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });
    if (dbProps && dbProps.length > 0) {
      const liveProps = dbProps.map(transformDbProperty);
      const dbIds = new Set(liveProps.map((p) => p.id));
      const staticRemaining = COMMERCIAL_ASSETS.filter((p) => !dbIds.has(p.id));
      initialProperties = [...liveProps, ...staticRemaining];
    }
  } catch (err) {
    console.warn("Could not pre-fetch DB properties on server:", err);
  }

  return <PropertiesClient initialProperties={initialProperties} />;
}
