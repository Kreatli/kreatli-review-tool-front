import React from 'react';

import { SignUpModal } from '../../auth/SignUpForm/SignUpModal';
import { CostCalculatorSection } from '../CostCalculator';
import { FaqSection } from '../Faq';
import { FeaturesSection } from '../Features';
import { FooterSection } from '../Footer/FooterSection';
import { HeroSection } from '../Hero';
import { HowItWorksSection } from '../HowItWorks';
import { KreatliForSection } from '../KreatliFor';
import { PricingSection } from '../PricingSection';

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
