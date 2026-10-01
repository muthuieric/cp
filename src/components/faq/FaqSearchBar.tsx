"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FaqSearchBarProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  totalResults: number;
}

const FaqSearchBar = ({ searchTerm, onSearch, totalResults }: FaqSearchBarProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-10 h-12 bg-background text-black"
        />
      </div>
      {searchTerm && (
        <p className="mt-3 text-sm text-primary-foreground/80 text-center">
          {totalResults} result{totalResults !== 1 ? "s" : ""} found
        </p>
      )}
    </div>
  );
};

export default FaqSearchBar;
