import LandingNav from "@/components/landing/LandingNav";
import CosmicFrame from "@/components/landing/CosmicFrame";
import Hero from "@/components/landing/Hero";
import TrustBar from "@/components/landing/TrustBar";
import HowItWorks from "@/components/landing/HowItWorks";
import SolutionsBento from "@/components/landing/SolutionsBento";
import BenefitsCross from "@/components/landing/BenefitsCross";
import ComparisonSection from "@/components/landing/ComparisonSection";
import CaseStudy from "@/components/landing/CaseStudy";
import ImpactStats from "@/components/landing/ImpactStats";
import Testimonials from "@/components/landing/Testimonials";
import SecuritySection from "@/components/landing/SecuritySection";
import PricingPreview from "@/components/landing/PricingPreview";
import FAQSection from "@/components/landing/FAQSection";
import ContactSection from "@/components/landing/ContactSection";
import FinalCTA from "@/components/landing/FinalCTA";
import LandingFooter from "@/components/landing/LandingFooter";

export default function Homepage() {
  return (
    <CosmicFrame>
      <LandingNav />
      <main>
        <Hero />
        <TrustBar />
        <HowItWorks />
        <SolutionsBento />
        <BenefitsCross />
        <ComparisonSection />
        <CaseStudy />
        <ImpactStats />
        <Testimonials />
        <SecuritySection />
        <PricingPreview />
        <FAQSection />
        <ContactSection id="contact" />
        <FinalCTA />
      </main>
      <LandingFooter />
    </CosmicFrame>
  );
}
