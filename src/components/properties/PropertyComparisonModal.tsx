"use client";

import PropertyComparison from "@/components/PropertyComparison";

const PropertyComparisonModal = ({ isOpen, onClose }: any) => {
  return <PropertyComparison isOpen={isOpen} onClose={onClose} />;
};

export default PropertyComparisonModal;
