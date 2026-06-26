import HeroSection from "@/components/home/HeroSection";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProductsShowcase from "@/components/home/ProductsShowcase";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import TechStack from "@/components/home/TechStack";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <ProductsShowcase />
      <WhyChooseUs />
      <TestimonialsCarousel />
      <TechStack />
      <CTABanner />
    </>
  );
}
