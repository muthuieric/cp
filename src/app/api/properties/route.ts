// app/api/properties/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

// Increase the timeout for this function
// Vercel Hobby: 60s max
// Vercel Pro: 300s max
export const maxDuration = 60; // 60 seconds

// CREATE Property
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      location,
      price,
      type,
      status,
      bedrooms,
      bathrooms,
      area,
      description,
      amenities,
      imageUrls, // Array of uploaded Cloudflare R2 URLs
    } = body;

    // Validate required fields for commercial assets
    if (!title || !location || price === undefined || price === null || !type || !status) {
      return NextResponse.json(
        { error: "Missing required fields (title, location, price, type, status)" },
        { status: 400 }
      );
    }

    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      );
    }

    // Step 1: Create property with transaction to ensure atomicity
    const result = await prisma.$transaction(
      async (tx) => {
        // Create the property
        const property = await tx.property.create({
          data: {
            title,
            location,
            price: Number(price),
            type,
            status,
            bedrooms: typeof bedrooms === "number" ? bedrooms : 1,
            bathrooms: typeof bathrooms === "number" ? bathrooms : 1,
            area: area ? Number(area) : null,
            description: description || "",
            amenities: amenities || [],
          },
        });

        // Create all image records linked to the property
        const images = await tx.image.createMany({
          data: imageUrls.map((url: string) => ({
            url,
            propertyId: property.id,
          })),
        });

        // Fetch the created images to return them
        const createdImages = await tx.image.findMany({
          where: { propertyId: property.id },
        });

        return { property, images: createdImages };
      },
      {
        maxWait: 5000, // Wait up to 5 seconds to start transaction
        timeout: 10000, // Transaction timeout of 10 seconds
      }
    );

    // Revalidate the properties pages so new data shows immediately
    revalidatePath('/properties');
    revalidatePath('/');
    revalidatePath('/admin-view');
    revalidatePath('/admin');

    return NextResponse.json({
      success: true,
      property: result.property,
      images: result.images,
    });
  } catch (error) {
    console.error("Property creation error:", error);
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    );
  }
}

// UPDATE Property (PUT)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      title,
      location,
      price,
      type,
      status,
      bedrooms,
      bathrooms,
      area,
      description,
      amenities,
      imageUrls, 
    } = body;

    if (!id) return NextResponse.json({ error: "Property ID is required" }, { status: 400 });

    const result = await prisma.$transaction(async (tx) => {
      // 1. Update basic details
      const property = await tx.property.update({
        where: { id: String(id) },
        data: {
          title,
          location,
          price: Number(price),
          type,
          status,
          bedrooms: typeof bedrooms === "number" ? bedrooms : 1,
          bathrooms: typeof bathrooms === "number" ? bathrooms : 1,
          area: area ? Number(area) : null,
          description: description || "",
          amenities: amenities || [],
        },
      });

      // 2. Sync Images: Delete old ones and re-add the current list
      // This is a simple strategy to handle added/removed images
      await tx.image.deleteMany({ where: { propertyId: String(id) } });
      
      if (imageUrls && imageUrls.length > 0) {
        await tx.image.createMany({
          data: imageUrls.map((url: string) => ({
            url,
            propertyId: String(id),
          })),
        });
      }

      return property;
    });

    revalidatePath("/properties");
    revalidatePath("/");
    revalidatePath("/admin-view");
    revalidatePath("/admin");

    return NextResponse.json({ success: true, property: result });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const property = await prisma.property.findUnique({
        where: { id: String(id) },
        include: { images: true },
      });
      if (property) {
        return NextResponse.json({ property });
      }
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    const properties = await prisma.property.findMany({
      orderBy: { createdAt: "desc" },
      include: { images: true },
    });

    return NextResponse.json({ properties });
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

// DELETE Property
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const propertyId = searchParams.get("id");

    if (!propertyId) {
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 }
      );
    }

    // Delete property and related images (cascade delete if configured in schema)
    await prisma.property.delete({
      where: { id: String(propertyId) },
    });

    // Revalidate after deleting
    revalidatePath('/properties');
    revalidatePath('/');
    revalidatePath('/admin-view');
    revalidatePath('/admin');

    return NextResponse.json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete property:", error);
    return NextResponse.json(
      { error: "Failed to delete property" },
      { status: 500 }
    );
  }
}