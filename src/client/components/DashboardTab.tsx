import React from 'react';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Calendar,
  AlertCircle,
  Tag,
  ArrowRight,
  ShieldAlert,
  Clock,
  Sparkles,
  Tv,
  Cpu,
  Gamepad2,
  Zap,
  Dumbbell,
  Layers,
  Plus
} from 'lucide-react';
import { DashboardSummary, CategoryBreakdown, Subscription, Coupon } from '../types';

interface DashboardTabProps {
  summary: DashboardSummary | null;
  categories: CategoryBreakdown[];
  allSubscriptions: Subscription[];
  matchedCoupons: Coupon[];
  onOpenAddModal: () => void;
  onNavigateTab: (tab: 'dashboard' | 'subscriptions' | 'coupons' | 'notifications') => void;
  onSelectSubscription: (sub: Subscription) => void;
}

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'STREAMING':
      return <Tv className="w-4 h-4 text-purple-400" />;
    case 'SOFTWARE':
      return <Cpu className="w-4 h-4 text-[#38BDF8]" />;
    case 'GAMING':
      return <Gamepad2 className="w-4 h-4 text-[#FF5C38]" />;
    case 'UTILITIES':
      return <Zap className="w-4 h-4 text-amber-400" />;
    case 'FITNESS':
      return <Dumbbell className="w-4 h-4 text-emerald-400" />;
    default:
      return <Layers className="w-4 h-4 text-slate-400" />;
  }
};

export const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case 'STREAMING':
      return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
    case 'SOFTWARE':
      return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
    case 'GAMING':
      return 'bg-[#FF5C38]/15 text-[#FF5C38] border-[#FF5C38]/30';
    case 'UTILITIES':
      return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    case 'FITNESS':
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    default:
      return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
  }
};

export const DashboardTab: React.FC<DashboardTabProps> = ({
  summary,
  categories,
  allSubscriptions,
  matchedCoupons,
  onOpenAddModal,
  onNavigateTab,
  onSelectSubscription
}) => {
  const trialSubs = allSubscriptions.filter((s) => s.status === 'TRIAL');
  const pausedSubs = allSubscriptions.filter((s) => s.status === 'PAUSED');

  // Calculate days until date
  const getDaysDiff = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateStr);
    target.setHours(0, 0, 0, 0);
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const totalCategorySpend = categories.reduce((sum, c) => sum + c.totalSpend, 0);

  return (
    <div className="space-y-6 pb-14">
      {/* Hero / Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#141824] via-[#0F131D] to-[#0F131D] border border-white/10 p-6 md:p-8 backdrop-blur-md shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FF5C38]/15 text-[#FF5C38] border border-[#FF5C38]/30 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Recurring Expense Overview</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display">
              Stay in control of every subscription.
            </h1>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Track renewal countdowns, analyze monthly commitments across categories, and eliminate surprise billings before they happen.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenAddModal}
              className="px-4 py-2.5 rounded-full font-bold text-xs typo-button text-white bg-[#FF5C38] hover:bg-[#ff6e4d] shadow-lg shadow-[#FF5C38]/25 transition flex items-center space-x-2 cursor-pointer active:scale-98"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ TRACK NEW SERVICE</span>
              <span className="w-3.5 h-3.5 rounded-full bg-black/20 flex items-center justify-center text-[7px] ml-0.5">↗</span>
            </button>
            <button
              onClick={() => onNavigateTab('coupons')}
              className="px-4 py-2.5 rounded-full font-bold text-xs typo-button text-slate-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition flex items-center space-x-2 cursor-pointer active:scale-98"
            >
              <Tag className="w-3.5 h-3.5 text-emerald-400" />
              <span>EXPLORE DEALS ({matchedCoupons.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Monthly Spend */}
        <div className="rounded-2xl bg-[#0F131D]/90 border border-white/10 p-5 shadow-lg backdrop-blur-md hover:border-white/20 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono-numbers">Monthly Expense</span>
            <div className="w-8 h-8 rounded-lg bg-[#FF5C38]/15 flex items-center justify-center text-[#FF5C38]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-1.5">
            <span className="text-3xl font-black text-white font-mono-numbers">
              ₹{summary ? Math.round(summary.totalMonthlySpend).toLocaleString('en-IN') : '0'}
            </span>
            <span className="text-xs text-slate-400">/ month</span>
          </div>
          <p className="mt-1.5 text-xs text-slate-500">
            Annual run rate: <span className="font-bold text-slate-300 font-mono-numbers">₹{summary ? Math.round(summary.totalYearlySpend).toLocaleString('en-IN') : '0'}</span>
          </p>
        </div>

        {/* Active Subscriptions */}
        <div className="rounded-2xl bg-[#0F131D]/90 border border-white/10 p-5 shadow-lg backdrop-blur-md hover:border-white/20 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono-numbers">Active Subscriptions</span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/15 flex items-center justify-center text-sky-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-1.5">
            <span className="text-3xl font-black text-white font-mono-numbers">
              {summary ? summary.activeSubscriptionCount : 0}
            </span>
            <span className="text-xs text-slate-400">services active</span>
          </div>
          <p className="mt-1.5 text-xs text-slate-500">
            {trialSubs.length} in trial, {pausedSubs.length} paused
          </p>
        </div>

        {/* Upcoming Renewals */}
        <div className="rounded-2xl bg-[#0F131D]/90 border border-white/10 p-5 shadow-lg backdrop-blur-md hover:border-white/20 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono-numbers">Renewals in 7 Days</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-1.5">
            <span className="text-3xl font-black text-amber-400 font-mono-numbers">
              {summary?.upcomingRenewals ? summary.upcomingRenewals.length : 0}
            </span>
            <span className="text-xs text-slate-400">due this week</span>
          </div>
          <p className="mt-1.5 text-xs text-slate-500">
            Proactive renewal horizon
          </p>
        </div>

        {/* Matched Deals */}
        <div className="rounded-2xl bg-[#0F131D]/90 border border-white/10 p-5 shadow-lg backdrop-blur-md hover:border-white/20 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono-numbers">Matched Discounts</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <Tag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-1.5">
            <span className="text-3xl font-black text-emerald-400 font-mono-numbers">{matchedCoupons.length}</span>
            <span className="text-xs text-slate-400">available deals</span>
          </div>
          <p className="mt-1.5 text-xs text-slate-500">
            For Spotify, Netflix & more
          </p>
        </div>
      </div>

      {/* Main Grid: Renewals & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Upcoming Renewals Attention List (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#FF5C38]" />
              <h2 className="text-base font-bold text-white font-display">Upcoming Renewals (Next 7 Days)</h2>
            </div>
            <button
              onClick={() => onNavigateTab('subscriptions')}
              className="text-xs text-[#FF5C38] hover:text-[#ff7454] font-bold flex items-center space-x-1 cursor-pointer"
            >
              <span>View all ({allSubscriptions.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {summary?.upcomingRenewals && summary.upcomingRenewals.length > 0 ? (
            <div className="space-y-3">
              {summary.upcomingRenewals.map((sub) => {
                const diff = sub.nextRenewalDate ? getDaysDiff(sub.nextRenewalDate) : 0;
                const isUrgent = diff <= 2;

                return (
                  <div
                    key={sub.id}
                    onClick={() => onSelectSubscription(sub)}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-[#0F131D]/80 hover:bg-[#141824] border border-white/10 hover:border-[#FF5C38]/40 transition cursor-pointer gap-3 backdrop-blur-md"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                        {getCategoryIcon(sub.category)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-sm text-white group-hover:text-[#FF5C38] transition font-display">
                            {sub.serviceName}
                          </h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getCategoryBadgeClass(sub.category)}`}>
                            {sub.category}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
                          <span>{sub.billingCycle.toLowerCase()}</span>
                          <span>•</span>
                          <span>Renewal date: {sub.nextRenewalDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-4">
                      <div className="text-right">
                        <span className="font-black text-sm text-white font-mono-numbers">
                          ₹{Math.round(sub.cost).toLocaleString('en-IN')}
                        </span>
                        <div className="text-[11px]">
                          {isUrgent ? (
                            <span className="text-rose-400 font-bold">
                              {diff === 0 ? 'Due today!' : diff === 1 ? 'Due tomorrow!' : `Due in ${diff} days`}
                            </span>
                          ) : (
                            <span className="text-amber-400 font-medium">In {diff} days</span>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] typo-button px-2.5 py-1 rounded-full bg-white/[0.05] text-slate-300 border border-white/10 group-hover:border-[#FF5C38]/30 transition">
                        EDIT
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl bg-[#0F131D]/60 border border-white/10 p-8 text-center backdrop-blur-md">
              <Clock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-200">No renewals due in the next 7 days</p>
              <p className="text-xs text-slate-500 mt-1">Your subscriptions are fully up to date.</p>
            </div>
          )}

          {/* Trials Warning Section */}
          {trialSubs.length > 0 && (
            <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25">
              <div className="flex items-start space-x-3">
                <ShieldAlert className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono-numbers">
                    Active Free Trials ({trialSubs.length})
                  </h4>
                  <div className="mt-2 space-y-2">
                    {trialSubs.map((trial) => {
                      const diff = trial.trialEndDate ? getDaysDiff(trial.trialEndDate) : 0;
                      return (
                        <div key={trial.id} className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-200">{trial.serviceName}</span>
                          <span className="text-amber-300 font-medium">
                            {trial.trialEndDate ? `Expires on ${trial.trialEndDate} (${diff} days left)` : 'Trial active'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Category Spending Distribution */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center space-x-2 font-display">
              <TrendingUp className="w-4 h-4 text-[#FF5C38]" />
              <span>Spend by Category</span>
            </h2>
          </div>

          <div className="rounded-2xl bg-[#0F131D]/90 border border-white/10 p-5 space-y-4 backdrop-blur-md shadow-lg">
            {categories.length > 0 ? (
              <div className="space-y-4">
                {categories.map((cat) => {
                  const pct = totalCategorySpend > 0 ? Math.round((cat.totalSpend / totalCategorySpend) * 100) : 0;
                  return (
                    <div key={cat.category} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(cat.category)}
                          <span className="font-semibold text-slate-200 capitalize">
                            {cat.category.toLowerCase()}
                          </span>
                          <span className="text-slate-500 text-[11px]">({cat.count})</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-white font-mono-numbers">₹{Math.round(cat.totalSpend).toLocaleString('en-IN')}/mo</span>
                          <span className="text-[11px] text-slate-400 ml-1.5">({pct}%)</span>
                        </div>
                      </div>
                      {/* Bar */}
                      <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#FF5C38] to-[#FF8B6B] transition-all duration-500"
                          style={{ width: `${Math.max(pct, 4)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-500 text-center py-4">No active subscriptions categorized yet.</p>
            )}

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
              <span>Total calculated monthly:</span>
              <span className="font-black text-white text-base font-mono-numbers">
                ₹{Math.round(totalCategorySpend).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Quick Deals Teaser */}
          <div className="rounded-2xl bg-gradient-to-br from-[#141824] via-[#0F131D] to-[#0F131D] border border-emerald-500/25 p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>Featured Deals for Your Subs</span>
              </span>
              <button
                onClick={() => onNavigateTab('coupons')}
                className="text-[11px] text-emerald-400 hover:underline font-semibold cursor-pointer"
              >
                View all
              </button>
            </div>
            <div className="space-y-2 mt-2">
              {matchedCoupons.slice(0, 2).map((deal) => (
                <div key={deal.id} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">{deal.serviceName}</p>
                    <p className="text-[11px] text-slate-400">{deal.description}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-md font-mono-numbers font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                    {deal.code}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
