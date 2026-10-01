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
    default: "PM Consult – Luxury Real Estate in Kenya",
    template: "%s | PM Consult",
  },
  description:
    "Discover luxury homes, apartments, and commercial properties with PM Consult. Premium real estate in Nairobi and across Kenya.",
  keywords: [
    "Luxury Real Estate Kenya",
    "Houses for Sale Nairobi",
    "Apartments Nairobi",
    "PM Consult Properties",
    "Real Estate Kenya",
    "Luxury Apartments Nairobi",
  ],
  authors: [{ name: "PM Consult", url: "https://pm-consult.com" }],
  creator: "PM Consult",
  publisher: "PM Consult",

  openGraph: {
    type: "website",
    url: "https://pm-consult.com",
    title: "PM Consult – Luxury Real Estate in Kenya",
    description:
      "Find your dream home with PM Consult. Luxury houses, apartments, and commercial properties in Kenya.",
    siteName: "PM Consult",
    images: [
      {
        url: "/og-pm-logo.png",
        width: 1200,
        height: 630,
        alt: "PM Consult Luxury Real Estate Kenya",
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
      >
            <Analytics />
      {/* <body className="flex flex-col min-h-screen"> */}
      <Providers>{children}</Providers>
      </body>
            <GoogleAnalytics gaId="G-6MRR4F7L4W" />

    </html>
  );
}

