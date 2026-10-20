import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, TrendingUp, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface SocialProofSectionProps {}

const TESTIMONIALS = [
  {
    quote: 'Found 4 subscriptions I completely forgot about. Recovered almost ₹3,000 a year. Amazing!',
    author: 'Rohan K.',
    role: 'Student, Goa',
    avatar: 'RK'
  },
  {
    quote: 'The renewal calendar alone is worth it. So clean and easy to use.',
    author: 'Priya S.',
    role: 'Product Designer, Mumbai',
    avatar: 'PS'
  },
  {
    quote: 'TrackMySub caught a silent ₹1,999 auto-debit for a software tool I hadn’t touched in 4 months.',
    author: 'Arjun M.',
    role: 'Freelance Engineer, Bengaluru',
    avatar: 'AM'
  },
  {
    quote: 'Being able to see all 14 subscriptions in INR without converting USD every month is a lifesaver.',
    author: 'Sneha T.',
    role: 'Marketing Lead, Delhi',
    avatar: 'ST'
  }
];

export const SocialProofSection: React.FC<SocialProofSectionProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? TESTIMONIALS.length - 2 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx >= TESTIMONIALS.length - 2 ? 0 : prevIdx + 1));
  };

  return (
    <section className="py-20 md:py-28 relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header split with scroll trigger */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12"
        >
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-slate-400 uppercase font-mono-numbers">
              <span className="text-white/60">05</span>
              <span>/</span>
              <span className="text-[#FF5C38] tracking-widest">TRUSTED BY PEOPLE WHO TAKE CONTROL</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Join thousands spending smarter.
            </h2>

            <p className="text-base text-slate-300 leading-relaxed max-w-xl">
              TrackMySub has helped students, professionals and households save thousands by eliminating unnecessary subscriptions.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="lg:col-span-4 flex items-center lg:justify-end space-x-2">
            <button
              onClick={prev}
              className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
              title="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
              title="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* 3 Metric Stat Counters with Staggered Scroll Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 rounded-2xl bg-[#0F131D]/80 border border-white/10 flex items-center space-x-4"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-black text-white font-mono-numbers">4,200+</p>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">Active users</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 rounded-2xl bg-[#0F131D]/80 border border-white/10 flex items-center space-x-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[#FF5C38]/10 text-[#FF5C38] flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-black text-white font-mono-numbers">₹31,000+</p>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">Average savings yearly</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-6 rounded-2xl bg-[#0F131D]/80 border border-white/10 flex items-center space-x-4"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-black text-white font-mono-numbers">4.8/5</p>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">User satisfaction score</p>
            </div>
          </motion.div>
        </div>

        {/* Testimonials Grid with Animated Transition and Scroll Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[220px]"
        >
          <AnimatePresence mode="wait">
            {TESTIMONIALS.slice(currentIndex, currentIndex + 2).map((item, i) => (
              <motion.div
                key={item.author}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-[#0F131D]/90 border border-white/10 relative flex flex-col justify-between shadow-xl backdrop-blur-md"
              >
                <Quote className="w-8 h-8 text-[#FF5C38]/40 mb-4" />
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed italic">
                  "{item.quote}"
                </p>

                <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-white/[0.08]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF5C38] to-indigo-600 flex items-center justify-center font-bold text-xs text-white">
                    {item.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.author}</h4>
                    <p className="text-xs text-slate-400">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
