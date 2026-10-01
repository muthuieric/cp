import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

function extractNumber(str: string) {
  const match = str.replace(/,/g, "").match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

async function main() {
  const json = JSON.parse(
    fs.readFileSync("public/data/properties.json", "utf8")
  );
  for (const p of json) {
    await prisma.property.create({
      data: {
        title: p.title,
        location: p.location,
        price: extractNumber(p.price),
        type: p.type,
        status: p.status,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        area: p.area ? extractNumber(p.area) : null,
        description: p.description,
        amenities: p.amenities,
        images: {
          create: p.images.map((url: string) => ({ url })),
        },
      },
    });
  }
}

main().finally(() => prisma.$disconnect());
