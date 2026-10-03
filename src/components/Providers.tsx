"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeChatBot from "@/components/chat/HomeChatBot";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <HomeChatBot />
      </TooltipProvider>
    </SessionProvider>
  );
}
