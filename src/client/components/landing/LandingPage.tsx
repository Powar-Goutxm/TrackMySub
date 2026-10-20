import React from 'react';
import { useLenis } from '../../hooks/useLenis';
import { LandingNavbar } from './LandingNavbar';
import { HeroSection } from './HeroSection';
import { CostOfForgettingSection } from './CostOfForgettingSection';
import { FeaturesSection } from './FeaturesSection';
import { HowItWorksSection } from './HowItWorksSection';
import { SocialProofSection } from './SocialProofSection';
import { PricingSection } from './PricingSection';
import { ContactSection } from './ContactSection';
import { FinalCtaSection } from './FinalCtaSection';
import { User } from '../../types';

interface LandingPageProps {
  onLaunchApp: () => void;
  onOpenAuth: () => void;
  onSuccessAuth: (user: User) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchApp,
  onOpenAuth,
  onSuccessAuth
}) => {
  // Initialize Lenis smooth momentum scrolling
  useLenis(true);

  const handleScrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlan = (plan: string) => {
    if (plan === 'free') {
      onLaunchApp();
    } else {
      onOpenAuth();
    }
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-slate-100 selection:bg-[#FF5C38] selection:text-white">
      {/* Fixed Header */}
      <LandingNavbar
        onOpenAuth={onOpenAuth}
        onLaunchApp={onLaunchApp}
      />

      {/* 01 Hero Section */}
      <HeroSection
        onGetStarted={onOpenAuth}
        onLaunchApp={onLaunchApp}
      />

      {/* 02 Cost of Forgetting */}
      <CostOfForgettingSection
        onExplore={handleScrollToPricing}
      />

      {/* 03 Features Horizon */}
      <FeaturesSection
        onExplore={onLaunchApp}
      />

      {/* 04 How It Works Live Sandbox */}
      <HowItWorksSection
        onLaunchApp={onLaunchApp}
      />

      {/* 05 Social Proof & Testimonials */}
      <SocialProofSection />

      {/* 06 Pricing */}
      <PricingSection
        onSelectPlan={handleSelectPlan}
      />

      {/* 07 Contact & Support */}
      <ContactSection />

      {/* 08 Final CTA & Integrated Auth Widget */}
      <FinalCtaSection
        onSuccessAuth={onSuccessAuth}
        onLaunchApp={onLaunchApp}
      />
    </div>
  );
};
