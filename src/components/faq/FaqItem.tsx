"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FaqItem = ({ question, answer, isOpen, onToggle }: FaqItemProps) => {
  return (
    <Card className="shadow-card">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <button className="w-full p-6 text-left hover:bg-muted/50 transition-luxury">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-foreground pr-4">{question}</h3>
              <ChevronDown
                className={`w-5 h-5 text-[#0A0A0A] transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </div>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="px-6 pb-6 pt-0">
            <p className="text-muted-foreground leading-relaxed">{answer}</p>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default FaqItem;
