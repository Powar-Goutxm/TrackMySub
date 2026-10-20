import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  TrendingDown,
  CreditCard,
  PieChart,
  Calendar,
  CheckCircle,
  Bell,
  Sparkles
} from 'lucide-react';

interface HowItWorksSectionProps {
  onLaunchApp: () => void;
}

const CATEGORY_DATA = [
  { name: 'Entertainment', pct: 42, color: '#FF5C38', spend: 1066 },
  { name: 'Productivity', pct: 24, color: '#38BDF8', spend: 610 },
  { name: 'Design', pct: 14, color: '#A855F7', spend: 355 },
  { name: 'Utilities', pct: 12, color: '#F59E0B', spend: 305 },
  { name: 'Others', pct: 8, color: '#10B981', spend: 204 }
];

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onLaunchApp }) => {
  const [activeStep, setActiveStep] = useState<number>(3); // 3 = Manage
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const steps = [
    { num: '01', title: 'Connect', desc: 'Add recurring services or sync with statements in 60 seconds.' },
    { num: '02', title: 'Analyze', desc: 'Identify price hikes, silent trials, and unused monthly commitments.' },
    { num: '03', title: 'Manage', desc: 'Control billing dates, pause services, and set proactive renewal reminders.' },
    { num: '04', title: 'Save', desc: 'Apply matched coupon deals and recover thousands in forgotten charges.' }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header split with scroll trigger */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12"
        >
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-slate-400 uppercase font-mono-numbers">
              <span className="text-white/60">04</span>
              <span>/</span>
              <span className="text-[#FF5C38] tracking-widest">HOW IT WORKS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              From chaos to clarity in minutes.
            </h2>

            <p className="text-base text-slate-300 leading-relaxed max-w-xl">
              TrackMySub makes it simple to get visibility, find hidden costs and take action — all in a few easy steps.
            </p>
          </div>

          <div className="lg:col-span-5 flex lg:justify-end">
            <button
              onClick={onLaunchApp}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#FF5C38] hover:bg-[#ff6e4d] shadow-lg shadow-[#FF5C38]/25 transition group cursor-pointer"
            >
              <span>Explore all features</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Step Selector Chips with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
        >
          {steps.map((st, idx) => {
            const stepNum = idx + 1;
            const isActive = activeStep === stepNum;
            return (
              <button
                key={st.num}
                onClick={() => setActiveStep(stepNum)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer relative ${
                  isActive
                    ? 'bg-[#FF5C38] text-white shadow-lg shadow-[#FF5C38]/20'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
                }`}
              >
                <span className="font-mono-numbers text-xs">{st.num}</span>
                <span>{st.title}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Interactive Embedded Live Dashboard Sandbox with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-[#0C0F17] border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
        >
          
          {/* Mock App Window Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-bold text-slate-400 pl-2">Dashboard Preview</span>
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <span className="text-slate-300 font-medium">Good evening, Goutam 👋</span>
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-slate-300">
                <Bell className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Metric KPI cards with scroll entrance */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.15 }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ y: -2 }}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Monthly Spend</span>
                <span className="flex items-center text-emerald-400 font-bold">
                  <TrendingDown className="w-3 h-3 mr-0.5" /> -12%
                </span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white font-mono-numbers mt-1">₹2,540</p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ y: -2 }}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Active Subscriptions</span>
                <span className="text-slate-500">Normal</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white font-mono-numbers mt-1">12</p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ y: -2 }}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Total Annual Spend</span>
                <span className="text-slate-500">Run rate</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white font-mono-numbers mt-1">₹8,240</p>
            </motion.div>
          </motion.div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            
            {/* Monthly Spending Histogram with Animated Bars */}
            <div className="lg:col-span-7 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-white">Monthly Spending</span>
                <span className="text-[11px] text-slate-400">Last 6 months</span>
              </div>

              <div className="h-40 flex items-end justify-between gap-3 pt-4">
                {[
                  { m: 'Apr', h: 65, val: '₹2,100' },
                  { m: 'May', h: 72, val: '₹2,320' },
                  { m: 'Jun', h: 80, val: '₹2,480' },
                  { m: 'Jul', h: 90, val: '₹2,890' },
                  { m: 'Aug', h: 75, val: '₹2,400' },
                  { m: 'Sep', h: 85, val: '₹2,540' }
                ].map((col, i) => (
                  <div key={col.m} className="flex-1 flex flex-col items-center h-full justify-end group">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${col.h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full max-w-[32px] rounded-t-md bg-gradient-to-t from-slate-800 to-[#FF5C38] group-hover:to-[#FF8B6B] transition-colors"
                    />
                    <span className="mt-2 text-[11px] text-slate-400 font-medium">{col.m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spending by Category Donut / Breakdown */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">Spending by category</span>
              </div>

              <div className="space-y-2 mt-2">
                {CATEGORY_DATA.map((cat, i) => (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    onMouseEnter={() => setHoveredCategory(cat.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className="flex items-center justify-between py-1 text-xs transition cursor-default"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-slate-300 font-medium">{cat.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 font-mono-numbers">
                      <span className="font-bold text-white">{cat.pct}%</span>
                      <span className="text-slate-500 text-[10px]">₹{cat.spend}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                <span>Calculated savings potential:</span>
                <span className="font-bold text-[#FF5C38]">₹3,400/yr</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
