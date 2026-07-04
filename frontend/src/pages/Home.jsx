import { useEffect } from "react";
import HeroSection from "@/sections/HeroSection";
import TrustSection from "@/sections/TrustSection";
import IndustriesSection from "@/sections/IndustriesSection";
import ServicesSection from "@/sections/ServicesSection";
import WhyMeSection from "@/sections/WhyMeSection";
import ProjectsSection from "@/sections/ProjectsSection";
import ProcessSection from "@/sections/ProcessSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import FAQSection from "@/sections/FAQSection";
import AboutSection from "@/sections/AboutSection";
import TechStackSection from "@/sections/TechStackSection";
import BlogPreviewSection from "@/sections/BlogPreviewSection";
import ContactSection from "@/sections/ContactSection";

export default function Home() {
  useEffect(() => {
    document.title = "Swar Shah — AI & Full Stack Consultant";
  }, []);

  return (
    <div data-testid="home-page">
      <HeroSection />
      <TrustSection />
      <IndustriesSection />
      <ServicesSection />
      <WhyMeSection />
      <ProjectsSection />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <AboutSection />
      <TechStackSection />
      <BlogPreviewSection />
      <ContactSection />
    </div>
  );
}
