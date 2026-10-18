import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CreditCard, ArrowRight, LayoutDashboard, Sparkles } from 'lucide-react';

interface LandingNavbarProps {
  onOpenAuth: () => void;
  onLaunchApp: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  onOpenAuth,
  onLaunchApp
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#08090D]/85 backdrop-blur-md border-b border-white/[0.07]">
      {/* Scrollytelling Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF5C38] via-[#FF8B6B] to-[#FFA07A] origin-left z-50"
        style={{ scaleX }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-2.5 text-white font-display font-extrabold text-xl tracking-tight shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF5C38] to-[#FF8B6B] flex items-center justify-center shadow-md shadow-[#FF5C38]/20 group-hover:scale-105 transition-transform">
            <CreditCard className="w-4 h-4 text-white" />
          </div>
          <span>TrackMySub</span>
        </a>

        {/* Zone 2: 4 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => scrollTo('features')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Features
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            How it works
          </button>
          <button
            onClick={() => scrollTo('pricing')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            About
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onLaunchApp}
            className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold typo-button text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 rounded-full transition whitespace-nowrap shrink-0 cursor-pointer active:scale-98"
            title="Open the full TrackMySub dashboard with live subscriptions"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
            <span>LAUNCH APP</span>
            <span className="w-3.5 h-3.5 rounded-full bg-white/10 flex items-center justify-center text-[7px] ml-0.5">↗</span>
          </button>

          <button
            onClick={onOpenAuth}
            className="text-xs font-bold typo-button text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0 px-2.5 py-1.5 cursor-pointer"
          >
            SIGN IN
          </button>

          <button
            onClick={onOpenAuth}
            className="flex items-center space-x-1.5 px-4 py-2 text-xs font-bold typo-button text-white bg-[#FF5C38] hover:bg-[#ff6e4d] rounded-full shadow-lg shadow-[#FF5C38]/25 transition whitespace-nowrap shrink-0 group cursor-pointer active:scale-98"
          >
            <span>GET STARTED — IT'S FREE</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
};
