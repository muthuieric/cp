"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GitCompare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";

interface PropertiesGridProps {
  filteredProperties: any[];
  comparisonList: any[];
  setShowComparison: (val: boolean) => void;
  clearFilters: () => void;
  disablePagination?: boolean;
}

const PropertiesGrid = ({
  filteredProperties,
  comparisonList,
  setShowComparison,
  clearFilters,
  disablePagination = false,
}: PropertiesGridProps) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const currentProperties = disablePagination
    ? filteredProperties
    : filteredProperties.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h2 className="text-lg md:text-2xl font-semibold text-foreground">
            {filteredProperties.length} Properties Found
          </h2>

          {comparisonList.length > 0 && (
            <Button
              variant="outline"
              onClick={() => setShowComparison(true)}
              className="border-[#0F766E] text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition-colors duration-300"
            >
              <GitCompare className="w-4 h-4 mr-2" />
              Compare
              <Badge className="ml-2 bg-[#0F172A] text-white">
                {comparisonList.length}
              </Badge>
            </Button>
          )}
        </div>

        {filteredProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {currentProperties.map((property: any) => (
                <Link key={property.id} href={`/properties/${property.id}`}>
                  <PropertyCard property={property} />
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {!disablePagination && filteredProperties.length > itemsPerPage && (
              <div className="flex justify-center mt-10 space-x-2 hover:cursor-pointer">
                <Button
                  variant="outline"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "secondary" : "ghost"}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  className="hover:cursor-pointer"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4"></div>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">
              No Properties Found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or filters to see more results.
            </p>
            <Button
              onClick={clearFilters}
              className="bg-[#0F766E] hover:bg-[#0D9488] text-white tracking-wider uppercase text-xs font-semibold px-6 py-2.5 transition-colors"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesGrid;
