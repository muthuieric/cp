"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";


interface FaqCategoriesProps {
  faqs: { category: string }[];
  activeCategory: number | null;
  setActiveCategory: (index: number) => void;
}

const FaqCategories = ({ faqs, activeCategory, setActiveCategory }: FaqCategoriesProps) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:col-span-1">
        <Card className="shadow-card sticky top-24">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
            <div className="space-y-2">
              {faqs.map((category, index) => (
                <button
                  key={index}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-luxury ${
                    activeCategory === index
                      ? "bg-[#0A0A0A] text-white"
                      : "text-muted-foreground hover:text-[#0A0A0A] hover:bg-[#0A0A0A]/10"
                  }`}
                  onClick={() => {
                    setActiveCategory(index);
                    document.getElementById(`category-${index}`)?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {category.category}
                </button>
              ))}
            </div>

            {/* Contact Box */}
            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Still have questions?
              </h4>
              <div className="space-y-2 hover:cursor-pointer">
                <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                  <a href="tel:+254700000000">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Us
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs hover:cursor-pointer"
                  onClick={() => window.open("https://wa.me/+254768096084", "_blank")}
                >
                  <FaWhatsapp className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Tabs */}
      <div className="lg:hidden mb-6 overflow-x-auto">
        <div className="flex space-x-3 pb-2">
          {faqs.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-luxury ${
                activeCategory === index
                  ? "bg-[#0A0A0A] text-white"
                  : "bg-muted text-foreground hover:bg-[#0A0A0A]/10 hover:text-[#0A0A0A]"
              }`}
              onClick={() => {
                setActiveCategory(index);
                document.getElementById(`category-${index}`)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {category.category}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default FaqCategories;
