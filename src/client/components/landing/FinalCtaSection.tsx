import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Mail, CreditCard } from 'lucide-react';
import { api, tokenStorage } from '../../api';
import { User } from '../../types';

interface FinalCtaSectionProps {
  onSuccessAuth: (user: User) => void;
  onLaunchApp: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onSuccessAuth,
  onLaunchApp
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.login(email, password);
      try {
        const me = await api.getMe();
        onSuccessAuth(me);
      } catch (meErr: any) {
        tokenStorage.clearTokens();
        throw meErr;
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative pt-24 pb-16 overflow-hidden border-t border-white/[0.08]">
      
      {/* Background Atmosphere & Eclipse Sun Graphic with subtle breath */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-[600px] h-[600px] rounded-full bg-gradient-to-t from-[#FF5C38]/15 via-transparent to-transparent blur-[140px]"
        />
        {/* Subtle orange halo circle */}
        <div className="absolute bottom-10 w-72 h-72 rounded-full border border-[#FF5C38]/20 bg-gradient-to-t from-[#FF5C38]/10 to-transparent blur-sm" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text and CTA with Scroll Entrance */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-slate-400 uppercase font-mono-numbers">
              <span className="text-white/60">08</span>
              <span>/</span>
              <span className="text-[#FF5C38] tracking-widest">GET STARTED</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Stop silent renewals.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5C38] to-[#FFA07A]">
                Start smarter spending.
              </span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed max-w-lg">
              Join thousands who are finally in control of their recurring subscriptions. Free forever for up to 10 services.
            </p>

            <div className="pt-2">
              <button
                onClick={onLaunchApp}
                className="flex items-center space-x-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold typo-button text-white bg-[#FF5C38] hover:bg-[#ff6e4d] rounded-full shadow-xl shadow-[#FF5C38]/25 transition group cursor-pointer active:scale-98"
              >
                <span>GET STARTED — IT'S FREE</span>
                <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[8px]">↗</span>
              </button>
            </div>
          </motion.div>

          {/* Right Interactive Login & Launch Card with Scroll Entrance */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md rounded-3xl bg-[#0F131D]/95 border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-xl hover:border-white/20 transition duration-300">
              
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#FF5C38] to-[#FF8B6B] flex items-center justify-center text-white">
                  <CreditCard className="w-4 h-4" />
                </div>
                <span className="font-display font-extrabold text-white text-base">TrackMySub</span>
              </div>

              <h3 className="text-xl font-bold text-white mt-3">Welcome back</h3>
              <p className="text-xs text-slate-400 mt-0.5 mb-4">Sign in to continue to your dashboard.</p>

              {error && (
                <div className="mb-3 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5C38]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5C38]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-2.5 rounded-full text-xs font-bold typo-button text-white bg-[#FF5C38] hover:bg-[#ff6e4d] shadow-md shadow-[#FF5C38]/25 transition cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-1.5 active:scale-98"
                >
                  <span>{loading ? 'SIGNING IN...' : 'SIGN IN'}</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-black/20 flex items-center justify-center text-[7px] ml-0.5">↗</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Quiet Footer with Scroll Entrance */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4"
        >
          <div className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4 text-[#FF5C38]" />
            <span className="font-semibold text-slate-300">TrackMySub</span>
            <span>—</span>
            <span>Take control of your subscriptions.</span>
          </div>

          <p>© {new Date().getFullYear()} TrackMySub. All rights reserved.</p>
        </motion.div>
      </div>
    </section>
  );
};
