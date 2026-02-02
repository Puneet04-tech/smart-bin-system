import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Smart E-Waste Bin System",
  description: "A comprehensive smart recycling experience with AI-powered waste detection and location-based bin finding",
  keywords: "e-waste, recycling, smart bin, sustainability, environment",
  authors: [{ name: "Smart Bin Team" }],
  openGraph: {
    title: "Smart E-Waste Bin System",
    description: "Revolutionary e-waste recycling with AI detection and rewards",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
