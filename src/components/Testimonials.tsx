"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Kimani",
      role: "Property Investor",
      content:
        "PM Consult helped me find the perfect investment property in Karen. Their expertise and professionalism are unmatched.",
      rating: 5,
    },
    {
      name: "John Mwangi",
      role: "First-time Buyer",
      content:
        "The team made my first property purchase seamless. They guided me through every step of the process.",
      rating: 5,
    },
    {
      name: "Grace Achieng",
      role: "Commercial Client",
      content:
        "Found the ideal office space for our growing business. PM Consult delivered beyond our expectations.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-secondary relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 " />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-3 sm:mb-4">
            What Our Clients Say
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Don’t just take our word for it — here’s what our satisfied clients
            have to say.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 5000 })]}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 px-2 sm:px-4"
              >
                <Card className="shadow-card border border-border hover:border-[#0A0A0A] transition-all duration-300 bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A0A0A] fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 sm:mb-6 italic">
                      “{testimonial.content}”
                    </p>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious className="left-2 bg-background/70 hover:bg-background border border-border shadow-md" />
          <CarouselNext className="right-2 bg-background/70 hover:bg-background border border-border shadow-md" />
        </Carousel>
      </div>
    </section>
  );
}
