import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  Edit2,
  Trash2,
  Pause,
  Play,
  CheckCircle,
  AlertTriangle,
  Clock,
  Calendar,
  XCircle,
  Sparkles
} from 'lucide-react';
import { Subscription, SubscriptionCategory, SubscriptionStatus } from '../types';
import { getCategoryIcon, getCategoryBadgeClass } from './DashboardTab';

interface SubscriptionsTabProps {
  subscriptions: Subscription[];
  onOpenAddModal: () => void;
  onEditSubscription: (sub: Subscription) => void;
  onDeleteSubscription: (id: string) => void;
  onToggleStatus: (sub: Subscription) => void;
}

export const SubscriptionsTab: React.FC<SubscriptionsTabProps> = ({
  subscriptions,
  onOpenAddModal,
  onEditSubscription,
  onDeleteSubscription,
  onToggleStatus
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'renewal' | 'cost_desc' | 'cost_asc' | 'name'>('renewal');

  const categories = ['ALL', 'STREAMING', 'SOFTWARE', 'GAMING', 'UTILITIES', 'FITNESS', 'OTHER'];
  const statuses = ['ALL', 'ACTIVE', 'TRIAL', 'PAUSED', 'CANCELLED'];

  // Filter & sort
  const filtered = subscriptions
    .filter((sub) => {
      const matchSearch = sub.serviceName.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory === 'ALL' || sub.category === selectedCategory;
      const matchStatus = selectedStatus === 'ALL' || sub.status === selectedStatus;
      return matchSearch && matchCat && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'cost_desc') return b.cost - a.cost;
      if (sortBy === 'cost_asc') return a.cost - b.cost;
      if (sortBy === 'name') return a.serviceName.localeCompare(b.serviceName);
      // default: renewal soonest
      const dateA = a.nextRenewalDate || a.trialEndDate || '9999-12-31';
      const dateB = b.nextRenewalDate || b.trialEndDate || '9999-12-31';
      return dateA.localeCompare(dateB);
    });

  const getStatusBadge = (status: SubscriptionStatus) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active</span>
          </span>
        );
      case 'TRIAL':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/25">
            <Clock className="w-3 h-3" />
            <span>Trial</span>
          </span>
        );
      case 'PAUSED':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-400 border border-slate-500/25">
            <Pause className="w-3 h-3" />
            <span>Paused</span>
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/25">
            <XCircle className="w-3 h-3" />
            <span>Cancelled</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-14">
      {/* Header & Stats bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white font-display">Subscription Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your {subscriptions.length} recurring services and payment cycles in one unified inventory.
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-full font-bold text-xs typo-button text-white bg-[#FF5C38] hover:bg-[#ff6e4d] shadow-lg shadow-[#FF5C38]/25 transition self-start sm:self-auto cursor-pointer active:scale-98"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ ADD SUBSCRIPTION</span>
          <span className="w-3.5 h-3.5 rounded-full bg-black/20 flex items-center justify-center text-[7px] ml-0.5">↗</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl bg-[#0F131D]/90 border border-white/10 p-5 space-y-4 backdrop-blur-md shadow-lg">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by service name (e.g. Netflix, Spotify)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5C38] transition"
            />
          </div>

          {/* Sort By */}
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-black/40 border border-white/10 rounded-xl text-xs sm:text-sm text-slate-200 py-2 px-3 focus:outline-none focus:border-[#FF5C38] cursor-pointer"
            >
              <option value="renewal">Soonest Renewal</option>
              <option value="cost_desc">Cost (High to Low)</option>
              <option value="cost_asc">Cost (Low to High)</option>
              <option value="name">Service Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-500 font-semibold uppercase tracking-wider mr-1 text-[11px] font-mono-numbers">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#FF5C38] text-white shadow-md shadow-[#FF5C38]/20'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
              }`}
            >
              {cat === 'ALL' ? 'All Categories' : cat.toLowerCase()}
            </button>
          ))}
        </div>

        {/* Status Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto text-xs">
          <span className="text-slate-500 font-semibold uppercase tracking-wider mr-1 text-[11px] font-mono-numbers">Status:</span>
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedStatus === st
                  ? 'bg-white/15 text-white font-bold border border-white/20'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {st === 'ALL' ? 'All Statuses' : st.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Subscriptions List */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((sub) => {
            const isYearly = sub.billingCycle === 'YEARLY';
            const isPaused = sub.status === 'PAUSED';

            return (
              <div
                key={sub.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-[#0F131D]/90 hover:bg-[#141824] border border-white/10 hover:border-[#FF5C38]/40 p-5 shadow-lg backdrop-blur-md transition-all duration-200"
              >
                <div>
                  {/* Top card row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                        {getCategoryIcon(sub.category)}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-white group-hover:text-[#FF5C38] transition font-display">
                          {sub.serviceName}
                        </h3>
                        <span className={`inline-block mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full border ${getCategoryBadgeClass(sub.category)}`}>
                          {sub.category}
                        </span>
                      </div>
                    </div>
                    {getStatusBadge(sub.status)}
                  </div>

                  {/* Pricing info */}
                  <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-baseline justify-between">
                    <div>
                      <span className="text-xl font-black text-white font-mono-numbers">
                        ₹{Math.round(sub.cost).toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">/ {sub.billingCycle.toLowerCase()}</span>
                    </div>
                    {isYearly && (
                      <span className="text-[11px] text-slate-400 font-mono-numbers">
                        (₹{Math.round(sub.cost / 12).toLocaleString('en-IN')}/mo)
                      </span>
                    )}
                  </div>

                  {/* Date details */}
                  <div className="mt-3 space-y-1 text-xs text-slate-400">
                    {sub.nextRenewalDate && (
                      <div className="flex items-center justify-between">
                        <span className="flex items-center space-x-1.5 text-slate-400">
                          <Calendar className="w-3.5 h-3.5 text-[#FF5C38]" />
                          <span>Next Renewal:</span>
                        </span>
                        <span className="font-semibold text-slate-200 font-mono-numbers">{sub.nextRenewalDate}</span>
                      </div>
                    )}
                    {sub.trialEndDate && (
                      <div className="flex items-center justify-between">
                        <span className="flex items-center space-x-1.5 text-amber-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Trial Ends:</span>
                        </span>
                        <span className="font-semibold text-amber-300 font-mono-numbers">{sub.trialEndDate}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom card actions */}
                <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between">
                  {/* Status quick toggle */}
                  <button
                    onClick={() => onToggleStatus(sub)}
                    className="text-xs font-semibold text-slate-400 hover:text-white flex items-center space-x-1 transition cursor-pointer"
                  >
                    {isPaused ? (
                      <>
                        <Play className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Resume</span>
                      </>
                    ) : (
                      <>
                        <Pause className="w-3.5 h-3.5 text-slate-400" />
                        <span>Pause</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => onEditSubscription(sub)}
                      title="Edit Subscription"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#FF5C38] hover:bg-white/5 transition cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteSubscription(sub.id)}
                      title="Delete Subscription"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl bg-[#0F131D]/60 border border-white/10 p-12 text-center backdrop-blur-md">
          <Filter className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white font-display">No subscriptions matched your filters</h3>
          <p className="text-xs text-slate-400 mt-1">Try adjusting your search query, status, or category filters.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('ALL');
              setSelectedStatus('ALL');
            }}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
