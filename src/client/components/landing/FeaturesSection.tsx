import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Bell,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Tv,
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';

interface FeaturesSectionProps {
  onExplore: () => void;
}

type FeatureTab = 'horizon' | 'ledger' | 'alerts' | 'sentinel';

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onExplore }) => {
  const [activeTab, setActiveTab] = useState<FeatureTab>('horizon');
  const [selectedDay, setSelectedDay] = useState<number>(15);

  const days = [
    { day: 'Sun', date: 11, hasRenewal: false },
    { day: 'Mon', date: 12, hasRenewal: true, count: 1 },
    { day: 'Tue', date: 13, hasRenewal: false },
    { day: 'Wed', date: 14, hasRenewal: false },
    { day: 'Thu', date: 15, hasRenewal: true, count: 2 },
    { day: 'Fri', date: 16, hasRenewal: false },
    { day: 'Sat', date: 17, hasRenewal: true, count: 1 }
  ];

  return (
    <section id="features" className="py-20 md:py-28 relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-slate-400 uppercase font-mono-numbers">
              <span className="text-white/60">03</span>
              <span>/</span>
              <span className="text-[#FF5C38] tracking-widest">FEATURES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Everything you need in one place.
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              A complete set of tools to help you track, understand and take control of your recurring commitments.
            </p>

            {/* Feature Vertical Navigation Tabs with scroll entrance */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.2 }
                }
              }}
              className="space-y-2 pt-4"
            >
              {[
                { id: 'horizon' as const, label: 'Renewal Horizon', icon: Calendar },
                { id: 'ledger' as const, label: 'Subscription Ledger', icon: Layers },
                { id: 'alerts' as const, label: 'Price Change Alerts', icon: Bell },
                { id: 'sentinel' as const, label: 'Leak Sentinel', icon: ShieldAlert }
              ].map((f) => {
                const IconComponent = f.icon;
                const isActive = activeTab === f.id;
                return (
                  <motion.button
                    key={f.id}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                    }}
                    onClick={() => setActiveTab(f.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#141824] border-[#FF5C38]/50 text-white shadow-lg'
                        : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-[#FF5C38]/20 text-[#FF5C38]' : 'bg-white/5 text-slate-400'}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-sm">{f.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-[#FF5C38]" />}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Showcase Component with Smooth Scroll Entrance & Tab Transitions */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              {activeTab === 'horizon' && (
                <motion.div
                  key="horizon"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl bg-[#0F131D]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-md space-y-6"
                >
                  {/* Horizon Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                    <div>
                      <h3 className="text-xl font-bold text-white">Renewal horizon</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Next 7 days schedule</p>
                    </div>
                    <button
                      onClick={onExplore}
                      className="text-xs font-bold text-[#FF5C38] hover:text-[#ff7454] flex items-center space-x-1 cursor-pointer"
                    >
                      <span>View calendar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 7-Day Calendar Strip with Animated Entry */}
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                      Select Day to Inspect
                    </span>
                    <div className="grid grid-cols-7 gap-2">
                      {days.map((d, i) => {
                        const isSelected = selectedDay === d.date;
                        return (
                          <motion.button
                            key={d.date}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            onClick={() => setSelectedDay(d.date)}
                            className={`flex flex-col items-center py-2.5 px-1 rounded-xl transition cursor-pointer ${
                              isSelected
                                ? 'bg-[#FF5C38] text-white shadow-lg shadow-[#FF5C38]/25 scale-105'
                                : d.hasRenewal
                                ? 'bg-white/[0.06] text-white hover:bg-white/[0.1] border border-[#FF5C38]/30'
                                : 'bg-white/[0.02] text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <span className="text-[10px] uppercase font-bold">{d.day}</span>
                            <span className="text-base font-black font-mono-numbers mt-0.5">{d.date}</span>
                            {d.hasRenewal && !isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C38] mt-1" />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Service Cards for the Selected Day */}
                  <div className="pt-2 space-y-2.5">
                    <span className="text-xs font-bold text-slate-300">
                      Renewals due around {selectedDay}th:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="w-7 h-7 rounded-lg bg-[#1DB954]/20 text-[#1DB954] flex items-center justify-center font-bold text-xs">S</span>
                          <div>
                            <p className="text-xs font-bold text-white">Spotify</p>
                            <p className="text-[10px] text-slate-400">Due Mon 12</p>
                          </div>
                        </div>
                        <span className="font-mono-numbers text-xs font-bold text-slate-200">₹179</span>
                      </motion.div>

                      <motion.div
                        whileHover={{ y: -2 }}
                        className="p-3 rounded-xl bg-[#FF5C38]/10 border border-[#FF5C38]/30 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="w-7 h-7 rounded-lg bg-[#E50914]/20 text-[#E50914] flex items-center justify-center font-bold text-xs">N</span>
                          <div>
                            <p className="text-xs font-bold text-white">Netflix</p>
                            <p className="text-[10px] text-[#FF7A59]">Due Thu 15</p>
                          </div>
                        </div>
                        <span className="font-mono-numbers text-xs font-bold text-[#FF5C38]">₹649</span>
                      </motion.div>

                      <motion.div
                        whileHover={{ y: -2 }}
                        className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center font-bold text-xs">N</span>
                          <div>
                            <p className="text-xs font-bold text-white">Notion</p>
                            <p className="text-[10px] text-slate-400">Due Thu 15</p>
                          </div>
                        </div>
                        <span className="font-mono-numbers text-xs font-bold text-slate-200">₹500</span>
                      </motion.div>

                      <motion.div
                        whileHover={{ y: -2 }}
                        className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs">A</span>
                          <div>
                            <p className="text-xs font-bold text-white">Adobe CC</p>
                            <p className="text-[10px] text-slate-400">Due Sat 17</p>
                          </div>
                        </div>
                        <span className="font-mono-numbers text-xs font-bold text-slate-200">₹1,675</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Sub-Feature Checkmarks */}
                  <div className="pt-4 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-center space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#FF5C38] shrink-0" />
                      <span>7-day and 30-day views</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#FF5C38] shrink-0" />
                      <span>Calendar sync & iCal</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#FF5C38] shrink-0" />
                      <span>Email & push notices</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'ledger' && (
                <motion.div
                  key="ledger"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl bg-[#0F131D]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-md space-y-4"
                >
                  <h3 className="text-xl font-bold text-white">Centralized Subscription Ledger</h3>
                  <p className="text-sm text-slate-300">
                    Every recurring service in one synchronized inventory. Filter by category, track billing cycle, and view monthly normalized costs.
                  </p>
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2 text-xs">
                    <div className="flex justify-between font-semibold text-slate-400 pb-2 border-b border-white/[0.06]">
                      <span>SERVICE</span>
                      <span>CYCLE</span>
                      <span>MONTHLY EQUIV</span>
                    </div>
                    <div className="flex justify-between text-slate-200">
                      <span>Swiggy One</span>
                      <span className="text-slate-400">Yearly</span>
                      <span className="font-mono-numbers font-bold">₹25/mo</span>
                    </div>
                    <div className="flex justify-between text-slate-200">
                      <span>Google One (2TB)</span>
                      <span className="text-slate-400">Monthly</span>
                      <span className="font-mono-numbers font-bold">₹650/mo</span>
                    </div>
                    <div className="flex justify-between text-slate-200">
                      <span>Claude Pro</span>
                      <span className="text-slate-400">Monthly</span>
                      <span className="font-mono-numbers font-bold">₹1,999/mo</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'alerts' && (
                <motion.div
                  key="alerts"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl bg-[#0F131D]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-md space-y-4"
                >
                  <h3 className="text-xl font-bold text-white">Price Change Alerts</h3>
                  <p className="text-sm text-slate-300">
                    Services frequently increase prices without prominent warnings. TrackMySub monitors your billing amounts and highlights deviations.
                  </p>
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
                    <div className="flex items-center space-x-2 text-amber-300 font-bold">
                      <Bell className="w-4 h-4" />
                      <span>Price Spike Detected</span>
                    </div>
                    <p className="text-slate-300">
                      Netflix increased from ₹499 to ₹649 (+30%). An alert was delivered 3 days before renewal.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'sentinel' && (
                <motion.div
                  key="sentinel"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl bg-[#0F131D]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-md space-y-4"
                >
                  <h3 className="text-xl font-bold text-white">Leak Sentinel</h3>
                  <p className="text-sm text-slate-300">
                    Flags free trials that are about to convert into full recurring charges, and surfaces unused subscriptions you haven't opened in months.
                  </p>
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs space-y-2">
                    <div className="flex items-center space-x-2 text-rose-300 font-bold">
                      <ShieldAlert className="w-4 h-4" />
                      <span>Free Trial Expiring</span>
                    </div>
                    <p className="text-slate-300">
                      Apple Fitness+ 30-day trial expires in 2 days. Cancel now to avoid ₹990/month charge.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
