"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="relative py-24 bg-[hsl(var(--primary))] text-white overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--luxury-gold))] opacity-90" />

      <div className="relative container mx-auto px-6 text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">
          Find Your Dream Property Today
        </h2>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 animate-slide-up">
          Whether you’re looking to buy, rent, or invest — we’re here to guide
          you every step of the way with trusted expertise and a luxury
          experience.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {/* Browse Properties */}
          <Link href="/properties">
            <Button
              size="lg"
              className="bg-[hsl(var(--luxury-gold))] text-black hover:bg-[hsl(var(--luxury-gold-dark))] transition-all duration-300 hover:cursor-pointer"
            >
              Browse Properties
            </Button>
          </Link>

          {/* Contact Us */}
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="border-white bg-white text-black hover:bg-gray-200 transition-all duration-300 hover:cursor-pointer"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
