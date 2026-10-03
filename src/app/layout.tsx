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
    default: "Karan Holdings – Commercial Spaces & Offices for Rent in Nairobi",
    template: "%s | Karan Holdings",
  },
  description:
    "Find and lease premium office and commercial spaces across Nairobi with Karan Holdings. Flexible workspaces, retail spaces, and offices ready for your business.",
  keywords: [
    "Commercial Real Estate Nairobi",
    "Offices for Rent Nairobi",
    "Commercial Space Nairobi",
    "Workspaces Kenya",
    "Office Leasing Nairobi",
    "Retail Space Nairobi",
    "Karan Holdings",
  ],
  authors: [{ name: "Karan Holdings", url: "https://karanholdings.com" }],
  creator: "Karan Holdings",
  publisher: "Karan Holdings",

  openGraph: {
    type: "website",
    url: "https://karanholdings.com",
    title: "Karan Holdings – Commercial Spaces & Offices for Rent in Nairobi",
    description:
      "Find and lease premium office and commercial spaces across Nairobi with Karan Holdings. Flexible workspaces, retail spaces, and offices ready for your business.",
    siteName: "Karan Holdings",
    images: [
      {
        url: "/og-pm-logo.png",
        width: 1200,
        height: 630,
        alt: "Karan Holdings Offices for Rent Nairobi",
      },
    ],
    locale: "en_US",
  },

  metadataBase: new URL("https://karanholdings.com"),
  alternates: {
    canonical: "https://karanholdings.com",
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

