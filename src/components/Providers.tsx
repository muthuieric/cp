"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ComparisonProvider } from "@/hooks/usePropertyComparison";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeChatBot from "@/components/chat/HomeChatBot";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ComparisonProvider>
            <Toaster />
            <Sonner />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <HomeChatBot />
          </ComparisonProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
