import type { Metadata } from "next";
import { Inter as FontSans} from "next/font/google";
import "../styles/globals.css";
import React from "react";
import {cn} from "@/lib/utils";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata: Metadata = {
  title: "FinTrack",
  description: "Financial App to track and review performance of the top 100 NASDAQ stocks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased",
          fontSans.variable)}>{children}</body>
    </html>
  );
}
