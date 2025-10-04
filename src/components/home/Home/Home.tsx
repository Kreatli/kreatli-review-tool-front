import React from 'react';
import { HeroSection } from '../Hero';
import { FeaturesSection } from '../Features';
import { KreatliForSection } from '../KreatliFor';
import { FaqSection } from '../Faq';
import { FooterSection } from '../Footer/FooterSection';
import { HowItWorksSection } from '../HowItWorks';
import { PricingSection } from '../PricingSection';
import { SignUpModal } from '../../auth/SignUpForm/SignUpModal';
import { CostCalculatorSection } from '../CostCalculator';

export const Home = () => {
  return (
    <main className="w-full">
      <HeroSection />
      <FeaturesSection />
      <CostCalculatorSection />
      <KreatliForSection />
      <HowItWorksSection />
      <PricingSection />
      <FaqSection />
      <FooterSection />
      <SignUpModal />
    </main>
  );
};
