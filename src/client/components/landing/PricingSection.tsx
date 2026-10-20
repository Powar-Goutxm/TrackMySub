import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (plan: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 md:py-28 relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Toggle with Scroll Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14 space-y-4"
        >
          <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider text-slate-400 uppercase font-mono-numbers">
            <span className="text-white/60">06</span>
            <span>/</span>
            <span className="text-[#FF5C38] tracking-widest">PRICING</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Simple pricing.
          </h2>

          <p className="text-base text-slate-300">
            Start for free and upgrade when you need more.
          </p>

          {/* Billing Cadence Toggle */}
          <div className="pt-2 flex items-center justify-center">
            <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-4 py-2 rounded-lg transition cursor-pointer ${
                  !isYearly ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-4 py-2 rounded-lg transition flex items-center space-x-1.5 cursor-pointer ${
                  isYearly ? 'bg-[#FF5C38] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Yearly</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white">
                  2 months free
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* 3 Pricing Cards with Staggered Scroll Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Free */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="rounded-3xl bg-[#0F131D]/80 border border-white/10 p-7 flex flex-col justify-between hover:border-white/20 transition backdrop-blur-md"
          >
            <div>
              <h3 className="text-xl font-bold text-white">Free</h3>
              <p className="text-xs text-slate-400 mt-1">Get started with the essentials.</p>

              <div className="mt-6 flex items-baseline space-x-1">
                <span className="text-4xl font-black text-white font-mono-numbers">₹0</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>

              <div className="mt-8 space-y-3 pt-6 border-t border-white/[0.06] text-xs text-slate-300">
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#FF5C38] shrink-0" />
                  <span>Up to 10 subscriptions</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#FF5C38] shrink-0" />
                  <span>Renewal calendar view</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#FF5C38] shrink-0" />
                  <span>Basic spending analytics</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectPlan('free')}
              className="w-full mt-8 py-3 rounded-full font-bold text-xs typo-button text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer active:scale-98"
            >
              GET STARTED
            </button>
          </motion.div>

          {/* Card 2: Pro (Most popular) */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="relative rounded-3xl bg-[#141824] border-2 border-[#FF5C38] p-7 flex flex-col justify-between shadow-2xl coral-glow"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#FF5C38] text-white shadow-md">
              Most popular
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Pro</h3>
              </div>
              <p className="text-xs text-slate-300 mt-1">For individuals who want more control.</p>

              <div className="mt-6 flex items-baseline space-x-1">
                <span className="text-4xl font-black text-white font-mono-numbers">
                  {isYearly ? '₹79' : '₹99'}
                </span>
                <span className="text-xs text-slate-400">/ month</span>
                {isYearly && <span className="text-[11px] text-emerald-400 ml-1 font-mono-numbers">(billed ₹948/yr)</span>}
              </div>

              <div className="mt-8 space-y-3 pt-6 border-t border-white/[0.08] text-xs text-slate-200">
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#FF5C38] shrink-0" />
                  <span className="font-semibold text-white">Unlimited subscriptions</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#FF5C38] shrink-0" />
                  <span>Price change alerts</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#FF5C38] shrink-0" />
                  <span>Leak Sentinel trial warnings</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#FF5C38] shrink-0" />
                  <span>Advanced category insights</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#FF5C38] shrink-0" />
                  <span>Priority support</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectPlan('pro')}
              className="flex items-center justify-center space-x-1.5 w-full mt-8 py-3 rounded-full font-bold text-xs typo-button text-white bg-[#FF5C38] hover:bg-[#ff6e4d] shadow-lg shadow-[#FF5C38]/25 transition cursor-pointer active:scale-98"
            >
              <span>GET STARTED</span>
              <span className="w-3.5 h-3.5 rounded-full bg-black/20 flex items-center justify-center text-[7px]">↗</span>
            </button>
          </motion.div>

          {/* Card 3: Family */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="rounded-3xl bg-[#0F131D]/80 border border-white/10 p-7 flex flex-col justify-between hover:border-white/20 transition backdrop-blur-md"
          >
            <div>
              <h3 className="text-xl font-bold text-white">Family</h3>
              <p className="text-xs text-slate-400 mt-1">Share and manage together.</p>

              <div className="mt-6 flex items-baseline space-x-1">
                <span className="text-4xl font-black text-white font-mono-numbers">
                  {isYearly ? '₹119' : '₹149'}
                </span>
                <span className="text-xs text-slate-400">/ month</span>
                {isYearly && <span className="text-[11px] text-emerald-400 ml-1 font-mono-numbers">(billed ₹1,428/yr)</span>}
              </div>

              <div className="mt-8 space-y-3 pt-6 border-t border-white/[0.06] text-xs text-slate-300">
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#FF5C38] shrink-0" />
                  <span>Everything in Pro</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#FF5C38] shrink-0" />
                  <span>Up to 5 members</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#FF5C38] shrink-0" />
                  <span>Shared subscription view</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#FF5C38] shrink-0" />
                  <span>Group insights & split costs</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectPlan('family')}
              className="w-full mt-8 py-3 rounded-full font-bold text-xs typo-button text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer active:scale-98"
            >
              GET STARTED
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
