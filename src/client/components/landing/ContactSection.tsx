import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, HelpCircle, Shield, FileText, Send, CheckCircle2, MessageSquare, X } from 'lucide-react';

interface ContactSectionProps {}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowContactModal(false);
      setEmail('');
      setMessage('');
    }, 2000);
  };

  return (
    <section id="about" className="py-16 md:py-24 relative border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column with Staggered Scroll Entrance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-4"
          >
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-slate-400 uppercase font-mono-numbers">
              <span className="text-white/60">07</span>
              <span>/</span>
              <span className="text-[#FF5C38] tracking-widest">GET IN TOUCH</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Questions? We're here.
            </h2>

            <p className="text-base text-slate-300 leading-relaxed max-w-lg">
              Have feedback, suggestions or need help? We'd love to hear from you.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="pt-2 flex flex-wrap gap-3"
            >
              <button
                onClick={() => setShowContactModal(true)}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/15 border border-white/10 transition cursor-pointer active:scale-98"
              >
                <MessageSquare className="w-4 h-4 text-[#FF5C38]" />
                <span>Contact us</span>
              </button>

              <a
                href="mailto:support@trackmysub.com"
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>support@trackmysub.com</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Links with Scroll Entrance */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col sm:items-end space-y-3 text-xs text-slate-400"
          >
            <a href="#help" className="flex items-center space-x-2 hover:text-white transition group">
              <HelpCircle className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
              <span>Help Center</span>
            </a>
            <a href="#privacy" className="flex items-center space-x-2 hover:text-white transition group">
              <Shield className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
              <span>Privacy Policy</span>
            </a>
            <a href="#terms" className="flex items-center space-x-2 hover:text-white transition group">
              <FileText className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
              <span>Terms of Service</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Quick Contact Form Modal with AnimatePresence */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-[#0F131D] border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-2">
                <h3 className="text-lg font-bold text-white">Send us a message</h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-400">Our team typically responds within 2 hours.</p>

              {submitted ? (
                <div className="py-8 text-center text-emerald-400 space-y-2">
                  <CheckCircle2 className="w-10 h-10 mx-auto" />
                  <p className="font-bold text-sm">Message received!</p>
                  <p className="text-xs text-slate-400">We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5C38]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="How can we help?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5C38]"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowContactModal(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#FF5C38] hover:bg-[#ff6e4d] cursor-pointer"
                    >
                      Send message
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
