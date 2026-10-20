import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';

interface CostOfForgettingSectionProps {
  onExplore: () => void;
}

interface MonthData {
  month: string;
  spend: number;
  waste: number;
  hikes?: { name: string; oldPrice: number; newPrice: number };
  breakdown: Array<{ name: string; cost: number; unused?: boolean }>;
}

const RAW_MONTHS: Array<Omit<MonthData, 'spend'> & { breakdown: Array<{ name: string; cost: number; unused?: boolean }> }> = [
  { month: 'Jan', waste: 300, breakdown: [{ name: 'Spotify', cost: 179 }, { name: 'Netflix', cost: 499 }, { name: 'Gym Membership', cost: 1200, unused: true }, { name: 'Google One', cost: 130 }, { name: 'Notion', cost: 142 }] },
  { month: 'Feb', waste: 300, breakdown: [{ name: 'Spotify', cost: 179 }, { name: 'Netflix', cost: 499 }, { name: 'Gym Membership', cost: 1200, unused: true }, { name: 'Google One', cost: 130 }, { name: 'Notion', cost: 142 }] },
  { month: 'Mar', waste: 350, breakdown: [{ name: 'Spotify', cost: 179 }, { name: 'Netflix', cost: 499 }, { name: 'Gym Membership', cost: 1200, unused: true }, { name: 'Google One', cost: 130 }, { name: 'Notion', cost: 272 }] },
  { month: 'Apr', waste: 350, breakdown: [{ name: 'Spotify', cost: 179 }, { name: 'Netflix', cost: 499 }, { name: 'Gym Membership', cost: 1200, unused: true }, { name: 'Hotstar', cost: 442 }] },
  { month: 'May', waste: 400, breakdown: [{ name: 'Spotify', cost: 179 }, { name: 'Netflix', cost: 499 }, { name: 'Gym Membership', cost: 1200, unused: true }, { name: 'Swiggy One', cost: 299 }, { name: 'Notion', cost: 273 }] },
  { month: 'Jun', waste: 450, breakdown: [{ name: 'Spotify', cost: 179 }, { name: 'Netflix', cost: 499 }, { name: 'Gym Membership', cost: 1200, unused: true }, { name: 'Swiggy One', cost: 299 }, { name: 'Adobe CC', cost: 323, unused: true }] },
  { month: 'Jul', waste: 500, hikes: { name: 'Netflix', oldPrice: 499, newPrice: 649 }, breakdown: [{ name: 'Netflix (Hiked)', cost: 649 }, { name: 'Spotify', cost: 179 }, { name: 'Gym Membership', cost: 1200, unused: true }, { name: 'Adobe CC', cost: 622, unused: true }] },
  { month: 'Aug', waste: 550, breakdown: [{ name: 'Netflix', cost: 649 }, { name: 'Spotify', cost: 179 }, { name: 'Gym Membership', cost: 1200, unused: true }, { name: 'Google One', cost: 210 }, { name: 'Adobe CC', cost: 562, unused: true }] },
  { month: 'Sep', waste: 600, breakdown: [{ name: 'Netflix', cost: 649 }, { name: 'Spotify', cost: 179 }, { name: 'Gym Membership', cost: 1200, unused: true }, { name: 'Zomato Gold', cost: 249 }, { name: 'Adobe CC', cost: 573, unused: true }] },
  { month: 'Oct', waste: 650, breakdown: [{ name: 'Netflix', cost: 649 }, { name: 'Spotify', cost: 179 }, { name: 'Gym Membership', cost: 1200, unused: true }, { name: 'Apple One', cost: 365 }, { name: 'Adobe CC', cost: 557, unused: true }] },
  { month: 'Nov', waste: 700, breakdown: [{ name: 'Netflix', cost: 649 }, { name: 'Spotify', cost: 179 }, { name: 'Gym Membership', cost: 1200, unused: true }, { name: 'YouTube Prem', cost: 299 }, { name: 'Adobe CC', cost: 723, unused: true }] },
  { month: 'Dec', waste: 750, breakdown: [{ name: 'Netflix', cost: 649 }, { name: 'Spotify', cost: 179 }, { name: 'Gym Membership', cost: 1200, unused: true }, { name: 'Swiggy One', cost: 299 }, { name: 'Adobe CC', cost: 793, unused: true }] }
];

const MONTHS_DATA: MonthData[] = RAW_MONTHS.map((m) => ({
  ...m,
  spend: m.breakdown.reduce((sum, item) => sum + item.cost, 0)
}));

export const CostOfForgettingSection: React.FC<CostOfForgettingSectionProps> = ({ onExplore }) => {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(6); // July (the hike month)

  const activeMonth = MONTHS_DATA[selectedMonthIndex];
  const maxSpend = 3300;

  return (
    <section id="cost-of-forgetting" className="py-20 md:py-28 relative border-t border-white/[0.06] overflow-hidden">
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
              <span className="text-white/60">02</span>
              <span>/</span>
              <span className="text-[#FF5C38] tracking-widest">THE COST OF FORGETTING</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Small charges.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                Big impact.
              </span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed max-w-xl">
              What seems like little payments add up. Many subscriptions go unused, renew at higher prices, and quietly drain your money every month.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end items-start sm:items-center gap-4">
            <button
              onClick={onExplore}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl font-bold text-sm text-[#FF5C38] bg-[#FF5C38]/10 hover:bg-[#FF5C38]/20 border border-[#FF5C38]/30 transition group cursor-pointer"
            >
              <span>See the bigger picture</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Interactive Chart Container with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-[#0F131D]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-md"
        >
          
          {/* Handwritten Annotation top */}
          <motion.div
            initial={{ opacity: 0, rotate: -6 }}
            whileInView={{ opacity: 1, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden sm:flex absolute -top-5 left-1/4 z-20 font-hand text-xl text-slate-400 items-center space-x-2 select-none pointer-events-none"
          >
            <span>It adds up faster than you think.</span>
            <span className="text-xl">⤵</span>
          </motion.div>

          {/* Chart Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Spending Dynamics
              </span>
              <h3 className="text-lg font-extrabold text-white">Your spending over time</h3>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs">
                <span className="w-3 h-3 rounded-sm bg-[#FF5C38]" />
                <span className="text-slate-300">Total Recurring Spend</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <span className="w-3 h-3 rounded-sm bg-slate-700" />
                <span className="text-slate-400">Baseline</span>
              </div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="relative pt-12 pb-6">
            
            {/* Price Hike Milestone Flag with Spring Animation */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
              className="absolute top-2 left-[58%] -translate-x-1/2 z-20 hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#FF5C38]/15 border border-[#FF5C38]/40 shadow-lg shadow-[#FF5C38]/10"
            >
              <span className="w-4 h-4 rounded bg-[#E50914] text-white flex items-center justify-center text-[10px] font-bold">N</span>
              <span className="text-xs font-bold text-white">Price increased</span>
              <span className="text-xs font-mono-numbers text-slate-300">₹499 →</span>
              <span className="text-xs font-mono-numbers font-black text-[#FF5C38]">₹649</span>
            </motion.div>

            {/* Annual Waste Stat Tag */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute top-2 right-2 sm:right-6 z-20 flex flex-col items-end"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Annual waste</span>
              <span className="text-2xl font-black text-[#FF5C38] font-mono-numbers">₹4,200</span>
            </motion.div>

            {/* SVG Trendline connecting the tops of bars */}
            <div className="h-48 sm:h-64 flex items-end justify-between gap-1 sm:gap-3 relative">
              
              {/* Horizontal Reference Gridlines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-b border-white border-dashed w-full" />
                <div className="border-b border-white border-dashed w-full" />
                <div className="border-b border-white border-dashed w-full" />
              </div>

              {MONTHS_DATA.map((item, idx) => {
                const heightPercent = Math.round((item.spend / maxSpend) * 100);
                const isSelected = selectedMonthIndex === idx;
                const hasHike = !!item.hikes;

                return (
                  <button
                    type="button"
                    key={item.month}
                    aria-pressed={isSelected}
                    aria-label={`${item.month}: ₹${item.spend}`}
                    onClick={() => setSelectedMonthIndex(idx)}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF5C38] rounded"
                  >
                    {/* Tooltip on active */}
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-10 z-30 px-2 py-1 rounded bg-slate-900 border border-white/20 text-[11px] font-mono-numbers font-bold text-white whitespace-nowrap shadow-lg"
                      >
                        ₹{item.spend}
                      </motion.div>
                    )}

                    {/* Bar Pillar with Animated Grow-in */}
                    <div className="w-full max-w-[40px] flex flex-col justify-end h-full">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${heightPercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className={`w-full rounded-t-lg transition-colors duration-200 relative ${
                          isSelected
                            ? 'bg-gradient-to-t from-[#FF5C38] to-[#FF8B6B] shadow-lg shadow-[#FF5C38]/30'
                            : hasHike
                            ? 'bg-gradient-to-t from-slate-800 to-[#FF5C38]/70 hover:to-[#FF5C38]'
                            : 'bg-slate-800 hover:bg-slate-700'
                        }`}
                      >
                        {hasHike && (
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#FF5C38] ring-2 ring-white/20 animate-ping" />
                        )}
                      </motion.div>
                    </div>

                    {/* Month Label */}
                    <span
                      className={`mt-2.5 text-[11px] sm:text-xs font-semibold transition ${
                        isSelected ? 'text-white font-bold' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {item.month}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Month Inspector Drawer */}
          <div className="mt-4 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white">{activeMonth.month} Breakdown:</span>
              <span className="text-slate-300">Total ₹{activeMonth.spend}</span>
              <span className="text-slate-500">·</span>
              <span className="text-[#FF5C38]">₹{activeMonth.waste} identified as unused/leakage</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {activeMonth.breakdown.map((b) => (
                <span
                  key={b.name}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono-numbers ${
                    b.unused
                      ? 'bg-[#FF5C38]/20 text-[#FF5C38] border border-[#FF5C38]/30'
                      : 'bg-white/5 text-slate-300'
                  }`}
                >
                  {b.name}: ₹{b.cost}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
