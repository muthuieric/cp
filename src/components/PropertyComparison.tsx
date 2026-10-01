"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePropertyComparison } from "@/hooks/usePropertyComparison";
import { MapPin, Bed, Bath, Square, X } from "lucide-react";

interface PropertyComparisonProps {
  isOpen: boolean;
  onClose: () => void;
}

const PropertyComparison = ({ isOpen, onClose }: PropertyComparisonProps) => {
  const { comparisonList, removeFromComparison, clearComparison } =
    usePropertyComparison();

  if (comparisonList.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg rounded-2xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Property Comparison
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-12">
            <div className="text-6xl mb-4"></div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Properties to Compare
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              Add properties to comparison by clicking the compare button on
              property cards.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg md:text-xl font-semibold">
              Property Comparison ({comparisonList.length}/2)
            </DialogTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={clearComparison}
              className="border-[hsl(var(--luxury-gold))] text-[hsl(var(--luxury-gold))] hover:bg-[hsl(var(--luxury-gold))] hover:text-black transition-colors duration-300"
            >
              Clear All
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {comparisonList.map((property) => (
            <Card
              key={property.id}
              className="relative overflow-hidden rounded-xl border border-border shadow-md"
            >
              {/* Remove Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full"
                onClick={() => removeFromComparison(property.id)}
              >
                <X className="w-4 h-4" />
              </Button>

              {/* Fixed Image Section */}
              <div className="relative w-full h-52 md:h-60">
                <Image
                  src={property.images?.[0] ?? "/fallback.jpg"}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <Badge
                  className={`absolute top-4 left-4 ${
                    property.status === "For Sale"
                      ? "bg-success text-success-foreground"
                      : "bg-[#0A0A0A] text-primary"
                  }`}
                >
                  {property.status}
                </Badge>
                {property.featured && (
                  <Badge className="absolute top-4 right-14 bg-[#0A0A0A] text-primary">
                    Featured
                  </Badge>
                )}
              </div>

              {/* Card Content */}
              <CardContent className="p-4 md:p-6 space-y-4">
                <div className="text-xl font-bold text-[#0A0A0A]">
                  {property.price}
                </div>

                <h3 className="text-base md:text-lg font-semibold text-foreground">
                  {property.title}
                </h3>

                <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-muted-foreground">Property Type:</span>
                      <p className="font-medium">{property.type}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <p className="font-medium">{property.status}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-1">
                      <Bed className="w-4 h-4 text-muted-foreground" />
                      <span>{property.bedrooms} beds</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Bath className="w-4 h-4 text-muted-foreground" />
                      <span>{property.bathrooms} baths</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Square className="w-4 h-4 text-muted-foreground" />
                      <span>{property.area}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-luxury text-black font-semibold hover:opacity-90 transition"
                  style={{ background: "var(--gradient-luxury)" }}
                  onClick={() =>
                    window.open(`/properties/${property.id}`, "_blank")
                  }
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}

          {/* Placeholder when only one property selected */}
          {comparisonList.length === 1 && (
            <Card className="border-2 border-dashed border-muted-foreground/30 flex items-center justify-center min-h-[400px] rounded-xl">
              <CardContent className="text-center p-6">
                <div className="text-5xl mb-4 text-muted-foreground">+</div>
                <p className="text-sm text-muted-foreground">
                  Add another property to compare
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyComparison;
