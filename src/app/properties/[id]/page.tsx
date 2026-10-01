import PropertyDetailPage from "./PropertyDetailsClient";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function PropertyDetailsPage({ params }: PropertyPageProps) {
  const { id } = await params;
  return <PropertyDetailPage propertyId={id} />;
}
