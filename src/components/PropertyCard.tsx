"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Square, Heart, Share2, GitCompare } from "lucide-react";
import { useState } from "react";
import { usePropertyComparison } from "@/hooks/usePropertyComparison";
// import { sendGAEvent } from "@/lib/ga";
import { sendGAEvent } from "@next/third-parties/google"


interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  status: "For Sale" | "For Rent";
  bedrooms: number;
  bathrooms: number;
  area: string;
  images: string[]; // multiple images
  featured?: boolean;
}

interface PropertyCardProps {
  property: Property;
  href?: string;
  showCompare?: boolean;
}

const PropertyCard = ({ property, href, showCompare = true }: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { addToComparison, removeFromComparison, isInComparison } = usePropertyComparison();

  const firstImage = property.images?.[0] ?? "/fallback.jpg"; // fallback if missing

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this ${property.type} in ${property.location}`,
        url: href || window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}${href || `/property/${property.id}`}`);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInComparison(property.id)) {
      removeFromComparison(property.id);
    } else {
      addToComparison(property);
    }
  };

  const CardContentWrapper = (
    <Card className="group overflow-hidden shadow-card hover:shadow-luxury transition cursor-pointer"
       onClick={() => {
          sendGAEvent({
            event: "property_card_click",
            value: property.id,
            property_title: property.title,
          });
        }}
      >
      {/* IMAGE */}
      <div className="relative">
        <Image
          src={firstImage}
          alt={property.title}
          
          width={400}
          height={256}
          className="w-full h-64 object-cover group-hover:scale-105 transition"
        />
        <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition" />

        {/* Status Badge */}
        <Badge
          className={`absolute top-4 left-4 ${
            property.status === "For Sale"
              ? "bg-success text-success-foreground"
              : "bg-[#0F766E] text-primary"
          }`}
        >
          {property.status}
        </Badge>

        {/* Featured Badge */}
        {property.featured && (
          <Badge className="absolute hover:cursor-pointer top-4 right-14 bg-[#0F766E] text-primary">
            Featured
          </Badge>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className={`p-2  hover:cursor-pointer bg-background/80 backdrop-blur-sm  ${
              isLiked ? "text-destructive" : "text-foreground"
            }`}
            onClick={handleLike}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </Button>
          {showCompare && (
            <Button
              variant="ghost"
              size="sm"
              className={`p-2 hover:cursor-pointer bg-background/80 backdrop-blur-sm  ${
                isInComparison(property.id) ? "text-[#0F766E]" : "text-foreground"
              }`}
              onClick={handleCompare}
            >
              <GitCompare className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-2xl font-bold text-[#0F766E]">
            {/* Ksh {property.price} */}
            Ksh {Number(property.price).toLocaleString("en-KE")}
            </div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition">
            {property.title}
          </h3>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{property.location}, Nairobi</span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Square className="w-4 h-4" />
              <span>{property.area} sqft</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">{property.type}</Badge>
            <Button
              variant="outline"
              size="lg"
              className="border-[hsl(var(--luxury-gold))] text-[hsl(var(--luxury-gold))] hover:bg-[hsl(var(--luxury-gold))] hover:text-black transition-colors duration-300 hover:cursor-pointer"
              // onClick={(e) => {
              //   e.preventDefault(); // prevents Link navigation firing too early
              //   sendGAEvent({
              //     event: "property_view_details",
              //     value: property.id,
              //     property_title: property.title,
              //   });
              //   // then navigate if needed:
              //   window.location.href = `/properties/${property.id}`;
              // }}
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return href ? <Link href={href} className="block">{CardContentWrapper}</Link> : CardContentWrapper;
};

export default PropertyCard;
export type { Property };
