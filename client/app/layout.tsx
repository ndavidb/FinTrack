import type { Metadata } from "next";
import { Inter as FontSans} from "next/font/google";
import "../styles/globals.css";
import React from "react";
import {cn} from "@/lib/utils";
import {ToastProvider} from "@/components/ToastProvider";
import { SpeedInsights } from "@vercel/speed-insights/next"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata: Metadata = {
  title: "FinTrack",
  description: "Financial App to track and review performance of NASDAQ stocks",
  icons : {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={cn("min-h-screen bg-background font-sans antialiased",
        fontSans.variable)}>
    <link rel="icon" href="./favicon.ico" sizes="any"/>

    {children}
    <ToastProvider/>
    </body>
    </html>
  );
}
