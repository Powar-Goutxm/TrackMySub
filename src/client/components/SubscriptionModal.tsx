import React, { useState, useEffect } from 'react';
import { X, Sparkles, Calendar, Layers, Plus, CreditCard } from 'lucide-react';
import {
  Subscription,
  SubscriptionRequest,
  SubscriptionCategory,
  BillingCycle,
  SubscriptionStatus
} from '../types';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: SubscriptionRequest, id?: string) => Promise<void>;
  subscriptionToEdit?: Subscription | null;
}

const PRESET_SERVICES = [
  { name: 'Netflix', category: 'STREAMING' as SubscriptionCategory, cost: 649, cycle: 'MONTHLY' as BillingCycle },
  { name: 'Spotify', category: 'STREAMING' as SubscriptionCategory, cost: 179, cycle: 'MONTHLY' as BillingCycle },
  { name: 'Notion', category: 'SOFTWARE' as SubscriptionCategory, cost: 500, cycle: 'MONTHLY' as BillingCycle },
  { name: 'Adobe CC', category: 'SOFTWARE' as SubscriptionCategory, cost: 1675, cycle: 'MONTHLY' as BillingCycle },
  { name: 'ChatGPT Plus', category: 'SOFTWARE' as SubscriptionCategory, cost: 1999, cycle: 'MONTHLY' as BillingCycle },
  { name: 'YouTube Premium', category: 'STREAMING' as SubscriptionCategory, cost: 149, cycle: 'MONTHLY' as BillingCycle },
  { name: 'Amazon Prime', category: 'UTILITIES' as SubscriptionCategory, cost: 299, cycle: 'MONTHLY' as BillingCycle },
  { name: 'Google One', category: 'UTILITIES' as SubscriptionCategory, cost: 130, cycle: 'MONTHLY' as BillingCycle },
  { name: 'Swiggy One', category: 'UTILITIES' as SubscriptionCategory, cost: 299, cycle: 'YEARLY' as BillingCycle }
];

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  subscriptionToEdit
}) => {
  const [serviceName, setServiceName] = useState('');
  const [category, setCategory] = useState<SubscriptionCategory>('STREAMING');
  const [cost, setCost] = useState<string>('499');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('MONTHLY');
  const [status, setStatus] = useState<SubscriptionStatus>('ACTIVE');
  const [nextRenewalDate, setNextRenewalDate] = useState<string>('');
  const [trialEndDate, setTrialEndDate] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (subscriptionToEdit) {
      setServiceName(subscriptionToEdit.serviceName);
      setCategory(subscriptionToEdit.category);
      setCost(subscriptionToEdit.cost.toString());
      setBillingCycle(subscriptionToEdit.billingCycle);
      setStatus(subscriptionToEdit.status);
      setNextRenewalDate(subscriptionToEdit.nextRenewalDate || '');
      setTrialEndDate(subscriptionToEdit.trialEndDate || '');
    } else {
      setServiceName('');
      setCategory('STREAMING');
      setCost('499');
      setBillingCycle('MONTHLY');
      setStatus('ACTIVE');
      // Default next renewal date: 30 days from now
      const nextMonth = new Date();
      nextMonth.setDate(nextMonth.getDate() + 30);
      setNextRenewalDate(nextMonth.toISOString().split('T')[0]);
      setTrialEndDate('');
    }
    setError(null);
  }, [subscriptionToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSelectPreset = (preset: typeof PRESET_SERVICES[0]) => {
    setServiceName(preset.name);
    setCategory(preset.category);
    setCost(preset.cost.toString());
    setBillingCycle(preset.cycle);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName.trim()) {
      setError('Service name is required');
      return;
    }
    const parsedCost = parseFloat(cost);
    if (isNaN(parsedCost) || parsedCost < 0) {
      setError('Cost must be a valid positive amount');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await onSave(
        {
          serviceName: serviceName.trim(),
          category,
          cost: parsedCost,
          billingCycle,
          status,
          nextRenewalDate: nextRenewalDate || null,
          trialEndDate: trialEndDate || null
        },
        subscriptionToEdit?.id
      );
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save subscription');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0F131D] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF5C38] to-[#FF8B6B] flex items-center justify-center text-white shadow-md shadow-[#FF5C38]/20">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white font-display">
                {subscriptionToEdit ? 'Edit Subscription' : 'Add Recurring Subscription'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Enter details to track upcoming charges and renewal alerts.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick presets (only for new) */}
        {!subscriptionToEdit && (
          <div className="my-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2 font-mono-numbers">
              Popular Indian Presets:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_SERVICES.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className="px-2.5 py-1 text-xs rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
                >
                  {preset.name} (₹{preset.cost})
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="my-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Service Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Service Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Netflix, Spotify, AWS"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5C38]"
            />
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SubscriptionCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-[#FF5C38] cursor-pointer"
              >
                <option value="STREAMING">Streaming</option>
                <option value="SOFTWARE">Software & SaaS</option>
                <option value="GAMING">Gaming</option>
                <option value="UTILITIES">Utilities & Cloud</option>
                <option value="FITNESS">Fitness & Health</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as SubscriptionStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-[#FF5C38] cursor-pointer"
              >
                <option value="ACTIVE">Active</option>
                <option value="TRIAL">Free Trial</option>
                <option value="PAUSED">Paused</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Cost & Cycle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Cost (₹) *</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">₹</span>
                <input
                  type="number"
                  step="1"
                  min="0"
                  required
                  placeholder="499"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-[#FF5C38] font-mono-numbers"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Billing Cycle</label>
              <select
                value={billingCycle}
                onChange={(e) => setBillingCycle(e.target.value as BillingCycle)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-[#FF5C38] cursor-pointer"
              >
                <option value="MONTHLY">Monthly</option>
                <option value="QUARTERLY">Quarterly (3 Mo)</option>
                <option value="YEARLY">Yearly</option>
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Next Renewal Date
              </label>
              <input
                type="date"
                value={nextRenewalDate}
                onChange={(e) => setNextRenewalDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-[#FF5C38]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Trial End Date (Optional)
              </label>
              <input
                type="date"
                value={trialEndDate}
                onChange={(e) => setTrialEndDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-[#FF5C38]"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-5 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-bold typo-button text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] transition cursor-pointer"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-1.5 px-6 py-2 rounded-full text-xs font-bold typo-button text-white bg-[#FF5C38] hover:bg-[#ff6e4d] shadow-lg shadow-[#FF5C38]/25 transition disabled:opacity-50 cursor-pointer active:scale-98"
            >
              <span>{isSubmitting ? 'SAVING...' : subscriptionToEdit ? 'UPDATE SUBSCRIPTION' : 'CREATE SUBSCRIPTION'}</span>
              <span className="w-3.5 h-3.5 rounded-full bg-black/20 flex items-center justify-center text-[7px] ml-0.5">↗</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
