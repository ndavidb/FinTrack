import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import React from "react";
import Brand from "@/components/Brand/Brand";
import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/Footer";
import FAQs from "@/components/FAQs/FAQs";
import PricingSection from "@/components/Pricing/PricingSection";

export default function Home(children : React.ReactNode) {
  return (
      <>
          <Navbar />
          <main>
              <Hero />
          </main>
          <PricingSection />
          <FAQs />
          <Footer/>
      </>
  );
}
