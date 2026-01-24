import { ISbStoryData } from '@storyblok/react';
import React from 'react';

import { PageStoryblok } from '../../../typings/storyblok';
import { SignUpModal } from '../../auth/SignUpForm/SignUpModal';
import { CostCalculatorSection } from '../CostCalculator';
import { FaqSection } from '../Faq';
import { FeaturesSection } from '../Features';
import { FooterSection } from '../Footer/FooterSection';
import { HeroSection } from '../Hero';
import { HowItWorksSection } from '../HowItWorks';
import { KreatliForSection } from '../KreatliFor';
import { PricingSection } from '../PricingSection';
import { ResourcesSection } from '../Resources';

interface Props {
  comparisons?: ISbStoryData<PageStoryblok>[];
}

export const Home = ({ comparisons }: Props) => {
  return (
    <main className="w-full">
      <HeroSection />
      <FeaturesSection />
      <CostCalculatorSection />
      <KreatliForSection />
      <HowItWorksSection />
      <ResourcesSection comparisons={comparisons} />
      <PricingSection />
      <FaqSection />
      <FooterSection />
      <SignUpModal />
    </main>
  );
};
