import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  ArrowRight,
  Eye,
  AlertCircle,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
  onLaunchApp: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted, onLaunchApp }) => {
  const [activeView, setActiveView] = useState<'both' | 'perceived' | 'real'>('both');
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);

  // Stagger container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#FF5C38]/14 via-indigo-950/20 to-transparent blur-[120px] pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Narrative Copy with Staggered Entrance */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-6"
          >
            {/* Section Index Marker */}
            <motion.div variants={itemVariants} className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-slate-400 uppercase font-mono-numbers">
              <span className="text-white/60">01</span>
              <span>/</span>
              <span className="text-[#FF5C38] tracking-widest">SUBSCRIPTION MANAGEMENT</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] text-balance">
              You think you pay less.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5C38] via-[#FF7A59] to-[#FFA07A] block sm:inline">
                The truth renews silently.
              </span>
            </motion.h1>

            {/* Subhead */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Track, manage and optimize all your subscriptions. Find hidden costs, price hikes and unused services before they drain your money.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onGetStarted}
                className="flex items-center space-x-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold typo-button text-white bg-[#FF5C38] hover:bg-[#ff6e4d] rounded-full shadow-xl shadow-[#FF5C38]/25 transition group cursor-pointer active:scale-98"
              >
                <span>GET STARTED — IT'S FREE</span>
                <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[8px]">↗</span>
              </button>

              <button
                onClick={onLaunchApp}
                className="flex items-center space-x-2.5 px-5 py-3.5 text-xs sm:text-sm font-bold typo-button text-slate-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 rounded-full transition cursor-pointer active:scale-98 group"
              >
                <span>OPEN DASHBOARD</span>
                <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[8px] text-[#FF5C38]">↗</span>
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={itemVariants} className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-3 max-w-lg">
              <div className="flex items-center space-x-2 text-xs font-medium text-slate-300">
                <div className="w-5 h-5 rounded-md bg-[#FF5C38]/10 text-[#FF5C38] flex items-center justify-center shrink-0">
                  <Eye className="w-3 h-3" />
                </div>
                <span>Track everything</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-medium text-slate-300">
                <div className="w-5 h-5 rounded-md bg-[#FF5C38]/10 text-[#FF5C38] flex items-center justify-center shrink-0">
                  <AlertCircle className="w-3 h-3" />
                </div>
                <span>Find hidden costs</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-medium text-slate-300">
                <div className="w-5 h-5 rounded-md bg-[#FF5C38]/10 text-[#FF5C38] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3 h-3" />
                </div>
                <span>Cancel with confidence</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Comparative Cards & Handwritten Annotations */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            
            {/* View Filter Pill */}
            <div className="flex items-center justify-end space-x-2 mb-3">
              <span className="text-xs text-slate-400">View mode:</span>
              <div className="flex p-0.5 bg-black/40 border border-white/10 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setActiveView('both')}
                  className={`px-2.5 py-1 rounded-md transition ${activeView === 'both' ? 'bg-white/10 text-white font-bold' : 'text-slate-400'}`}
                >
                  Comparison
                </button>
                <button
                  onClick={() => setActiveView('perceived')}
                  className={`px-2.5 py-1 rounded-md transition ${activeView === 'perceived' ? 'bg-white/10 text-white font-bold' : 'text-slate-400'}`}
                >
                  What you think
                </button>
                <button
                  onClick={() => setActiveView('real')}
                  className={`px-2.5 py-1 rounded-md transition ${activeView === 'real' ? 'bg-[#FF5C38] text-white font-bold' : 'text-slate-400'}`}
                >
                  Silent reality
                </button>
              </div>
            </div>

            {/* Container for Overlapping Cards */}
            <div className="relative min-h-[500px]">

              {/* Handwritten Note: "Just the obvious ones..." */}
              <motion.div
                initial={{ opacity: 0, rotate: -8 }}
                animate={{ opacity: 1, rotate: -4 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -top-3 left-6 z-30 font-hand text-lg text-slate-400 flex items-center space-x-1 select-none pointer-events-none"
              >
                <span>Just the obvious ones...</span>
                <span className="text-xl">⤵</span>
              </motion.div>

              <AnimatePresence mode="popLayout">
                {/* CARD 1: What you think you pay */}
                {(activeView === 'both' || activeView === 'perceived') && (
                  <motion.div
                    key="card-think"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`rounded-2xl bg-[#0F131D]/90 border border-white/10 p-5 shadow-2xl backdrop-blur-md ${
                      activeView === 'both'
                        ? 'w-[85%] sm:w-[75%] absolute top-4 left-0 z-10 opacity-90'
                        : 'w-full relative z-20'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          What you think you pay
                        </span>
                        <div className="flex items-baseline space-x-1 mt-0.5">
                          <span className="text-2xl font-black text-white font-mono-numbers">₹1,840</span>
                          <span className="text-xs text-slate-400">/ month</span>
                        </div>
                      </div>
                      <div className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300 border border-white/5">
                        4 services
                      </div>
                    </div>

                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-black/20 text-xs">
                        <div className="flex items-center space-x-2.5">
                          <span className="w-5 h-5 rounded-md bg-[#1DB954]/20 text-[#1DB954] flex items-center justify-center text-[10px] font-bold">S</span>
                          <span className="font-medium text-slate-200">Spotify</span>
                        </div>
                        <span className="font-mono-numbers font-semibold text-slate-200">₹179</span>
                      </div>

                      <div className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-black/20 text-xs">
                        <div className="flex items-center space-x-2.5">
                          <span className="w-5 h-5 rounded-md bg-[#E50914]/20 text-[#E50914] flex items-center justify-center text-[10px] font-bold">N</span>
                          <span className="font-medium text-slate-200">Netflix</span>
                        </div>
                        <span className="font-mono-numbers font-semibold text-slate-200">₹649</span>
                      </div>

                      <div className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-black/20 text-xs">
                        <div className="flex items-center space-x-2.5">
                          <span className="w-5 h-5 rounded-md bg-white/10 text-white flex items-center justify-center text-[10px] font-bold">N</span>
                          <span className="font-medium text-slate-200">Notion</span>
                        </div>
                        <span className="font-mono-numbers font-semibold text-slate-200">₹500</span>
                      </div>

                      <div className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-black/20 text-xs">
                        <div className="flex items-center space-x-2.5">
                          <span className="w-5 h-5 rounded-md bg-[#10A37F]/20 text-[#10A37F] flex items-center justify-center text-[10px] font-bold">G</span>
                          <span className="font-medium text-slate-200">ChatGPT Plus</span>
                        </div>
                        <span className="font-mono-numbers font-semibold text-slate-200">₹512</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* CARD 2: What silently renews */}
                {(activeView === 'both' || activeView === 'real') && (
                  <motion.div
                    key="card-real"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`rounded-2xl bg-[#141824] border border-[#FF5C38]/40 p-5 sm:p-6 shadow-2xl backdrop-blur-xl ${
                      activeView === 'both'
                        ? 'w-[92%] sm:w-[82%] relative sm:absolute sm:top-14 sm:right-0 z-20 coral-glow mt-4 sm:mt-0'
                        : 'w-full relative z-20'
                    }`}
                  >
                    {/* Top Badge */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF5C38]">
                          What silently renews
                        </span>
                        <div className="flex items-baseline space-x-1.5 mt-0.5">
                          <span className="text-3xl font-black text-white font-mono-numbers">₹3,120</span>
                          <span className="text-xs text-slate-400">/ month</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-md text-xs font-black bg-[#FF5C38]/20 text-[#FF5C38] border border-[#FF5C38]/30">
                        +70% HIDDEN
                      </span>
                    </div>

                    {/* List of Real Charges */}
                    <div className="mt-3.5 space-y-2">
                      <div
                        onMouseEnter={() => setHoveredSub('spotify')}
                        onMouseLeave={() => setHoveredSub(null)}
                        className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-xs transition cursor-default"
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="w-5 h-5 rounded-md bg-[#1DB954]/20 text-[#1DB954] flex items-center justify-center text-[10px] font-bold">S</span>
                          <span className="font-medium text-white">Spotify</span>
                        </div>
                        <span className="font-mono-numbers font-semibold text-slate-200">₹179</span>
                      </div>

                      <div
                        onMouseEnter={() => setHoveredSub('netflix')}
                        onMouseLeave={() => setHoveredSub(null)}
                        className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-xs transition cursor-default"
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="w-5 h-5 rounded-md bg-[#E50914]/20 text-[#E50914] flex items-center justify-center text-[10px] font-bold">N</span>
                          <span className="font-medium text-white">Netflix</span>
                        </div>
                        <span className="font-mono-numbers font-semibold text-slate-200">₹649</span>
                      </div>

                      <div
                        onMouseEnter={() => setHoveredSub('notion')}
                        onMouseLeave={() => setHoveredSub(null)}
                        className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-xs transition cursor-default"
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="w-5 h-5 rounded-md bg-white/10 text-white flex items-center justify-center text-[10px] font-bold">N</span>
                          <span className="font-medium text-white">Notion</span>
                        </div>
                        <span className="font-mono-numbers font-semibold text-slate-200">₹500</span>
                      </div>

                      {/* Hidden charge: Adobe CC */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        onMouseEnter={() => setHoveredSub('adobe')}
                        onMouseLeave={() => setHoveredSub(null)}
                        className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-[#FF5C38]/10 border border-[#FF5C38]/30 text-xs transition cursor-default"
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="w-5 h-5 rounded-md bg-[#FF0000]/20 text-[#FF5C38] flex items-center justify-center text-[10px] font-bold">A</span>
                          <div>
                            <span className="font-bold text-white">Adobe CC</span>
                            <span className="block text-[10px] text-[#FF7A59]">Unused for 3 months</span>
                          </div>
                        </div>
                        <span className="font-mono-numbers font-bold text-[#FF5C38]">₹1,675</span>
                      </motion.div>

                      {/* Hidden charge: Google One */}
                      <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-white/[0.03] text-xs">
                        <div className="flex items-center space-x-2.5">
                          <span className="w-5 h-5 rounded-md bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold">G</span>
                          <span className="font-medium text-white">Google One</span>
                        </div>
                        <span className="font-mono-numbers font-semibold text-slate-200">₹130</span>
                      </div>

                      {/* Price hike: ChatGPT Plus */}
                      <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs">
                        <div className="flex items-center space-x-2.5">
                          <span className="w-5 h-5 rounded-md bg-[#10A37F]/20 text-[#10A37F] flex items-center justify-center text-[10px] font-bold">G</span>
                          <div>
                            <span className="font-bold text-white">ChatGPT Plus</span>
                            <span className="block text-[10px] text-amber-400">Silent GST hike (₹1,999)</span>
                          </div>
                        </div>
                        <span className="font-mono-numbers font-bold text-amber-400">₹1,999</span>
                      </div>

                      {/* Plus 4 more */}
                      <div className="flex items-center justify-between py-1.5 px-2.5 text-xs text-slate-400 border-t border-white/[0.06] pt-2">
                        <span className="flex items-center space-x-1">
                          <span>+ 4 more forgotten subs</span>
                        </span>
                        <span className="font-mono-numbers">₹732</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Handwritten Note: "That's ₹15,360 a year extra." */}
              <motion.div
                initial={{ opacity: 0, rotate: 6 }}
                animate={{ opacity: 1, rotate: 3 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="hidden sm:flex absolute -bottom-6 right-2 z-30 font-hand text-xl text-[#FFA07A] items-center space-x-2 select-none pointer-events-none"
              >
                <span className="text-2xl">⤴</span>
                <span>That's ₹15,360 a year extra.</span>
              </motion.div>

              {/* Handwritten Note: "3 subscriptions you haven't used in months." */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="hidden lg:block absolute top-1/2 -right-16 z-30 font-hand text-lg text-slate-400 max-w-[140px] select-none pointer-events-none rotate-[6deg]"
              >
                3 subscriptions you haven't used in months.
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
