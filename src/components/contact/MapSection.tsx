import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const MapSection = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Find Us</h2>
          <p className="text-muted-foreground">
            Riverside Square, Riverside drive Nairobi, Kenya
          </p>
        </div>

        <Card className="shadow-lg rounded-xl overflow-hidden">
          <div className="bg-muted h-64 sm:h-96 flex flex-col items-center justify-center p-6">
            <MapPin className="w-16 h-16 text-[#0A0A0A] mb-4 " />
            <h3 className="text-xl font-semibold mb-2 ">Interactive Map</h3>
            <Button
              variant="outline"
              className="hover:cursor-pointer"
              onClick={() =>
                window.open("https://maps.google.com?q=Riverside+Square", "_blank")
              }
            >
              Open in Google Maps
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default MapSection;
