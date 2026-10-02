import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "react-phone-input-2/lib/style.css";
import { Providers } from "@/components/Providers";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PM Commercial – Commercial Spaces & Offices for Rent in Nairobi",
    template: "%s | PM Commercial",
  },
  description:
    "Find and lease premium office and commercial spaces across Nairobi. Flexible workspaces, retail spaces, and offices ready for your business.",
  keywords: [
    "Commercial Real Estate Nairobi",
    "Offices for Rent Nairobi",
    "Commercial Space Nairobi",
    "Workspaces Kenya",
    "Office Leasing Nairobi",
    "Retail Space Nairobi",
  ],
  authors: [{ name: "PM Commercial", url: "https://pm-consult.com" }],
  creator: "PM Commercial",
  publisher: "PM Commercial",

  openGraph: {
    type: "website",
    url: "https://pm-consult.com",
    title: "PM Commercial – Commercial Spaces & Offices for Rent in Nairobi",
    description:
      "Find and lease premium office and commercial spaces across Nairobi. Flexible workspaces, retail spaces, and offices ready for your business.",
    siteName: "PM Commercial",
    images: [
      {
        url: "/og-pm-logo.png",
        width: 1200,
        height: 630,
        alt: "PM Commercial Offices for Rent Nairobi",
      },
    ],
    locale: "en_US",
  },

  metadataBase: new URL("https://pm-consult.com"),
  alternates: {
    canonical: "https://pm-consult.com",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
            <Analytics />
      {/* <body className="flex flex-col min-h-screen"> */}
      <Providers>{children}</Providers>
      </body>
            <GoogleAnalytics gaId="G-6MRR4F7L4W" />

    </html>
  );
}

