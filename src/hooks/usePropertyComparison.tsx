"use client";

import { useState, createContext, useContext, ReactNode } from 'react';
import { Property } from '@/components/PropertyCard';
import { toast } from 'sonner';

interface ComparisonContextType {
  comparisonList: Property[];
  addToComparison: (property: Property) => void;
  removeFromComparison: (propertyId: string) => void;
  clearComparison: () => void;
  isInComparison: (propertyId: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider = ({ children }: { children: ReactNode }) => {
  const [comparisonList, setComparisonList] = useState<Property[]>([]);

  const addToComparison = (property: Property) => {
    if (comparisonList.length >= 2) {
      toast.error('You can only compare up to 2 properties at a time');
      return;
    }
    if (comparisonList.find(p => p.id === property.id)) {
      toast.error('Property is already in comparison');
      return;
    }
    setComparisonList(prev => [...prev, property]);
    toast.success('Property added to comparison');
  };

  const removeFromComparison = (propertyId: string) => {
    setComparisonList(prev => prev.filter(p => p.id !== propertyId));
    toast.success('Property removed from comparison');
  };

  const clearComparison = () => {
    setComparisonList([]);
    toast.success('Comparison cleared');
  };

  const isInComparison = (propertyId: string) => {
    return comparisonList.some(p => p.id === propertyId);
  };

  return (
    <ComparisonContext.Provider value={{
      comparisonList,
      addToComparison,
      removeFromComparison,
      clearComparison,
      isInComparison
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const usePropertyComparison = () => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('usePropertyComparison must be used within a ComparisonProvider');
  }
  return context;
};