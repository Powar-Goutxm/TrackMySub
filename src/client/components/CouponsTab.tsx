import React, { useState } from 'react';
import { Tag, Copy, Check, Sparkles, Calendar, Search } from 'lucide-react';
import { Coupon, Subscription } from '../types';

interface CouponsTabProps {
  allCoupons: Coupon[];
  matchedCoupons: Coupon[];
  subscriptions: Subscription[];
}

export const CouponsTab: React.FC<CouponsTabProps> = ({
  allCoupons,
  matchedCoupons,
  subscriptions
}) => {
  const [activeTab, setActiveTab] = useState<'matched' | 'all'>('matched');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const displayList = activeTab === 'matched' ? matchedCoupons : allCoupons;
  const filtered = displayList.filter(
    (c) =>
      c.serviceName.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const userSubNames = subscriptions.map((s) => s.serviceName.toLowerCase());

  return (
    <div className="space-y-6 pb-14">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Deals & Partner Discounts</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-white font-display">Coupons & Savings Engine</h1>
        <p className="text-xs text-slate-400 mt-1">
          Automatically paired promotions and promotional codes verified for your recurring services.
        </p>
      </div>

      {/* Tabs and search bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-1.5 p-1 bg-[#0F131D] border border-white/10 rounded-2xl">
          <button
            onClick={() => setActiveTab('matched')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'matched'
                ? 'bg-[#FF5C38] text-white shadow-md shadow-[#FF5C38]/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Matched to My Subs ({matchedCoupons.length})
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#FF5C38] text-white shadow-md shadow-[#FF5C38]/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Available Deals ({allCoupons.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search deals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5C38]"
          />
        </div>
      </div>

      {/* Coupons Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((coupon) => {
            const isUserSubscribed = userSubNames.some(
              (name) =>
                name.includes(coupon.serviceName.toLowerCase()) ||
                coupon.serviceName.toLowerCase().includes(name)
            );

            return (
              <div
                key={coupon.id}
                className="relative overflow-hidden flex flex-col justify-between rounded-2xl bg-[#0F131D]/90 hover:bg-[#141824] border border-white/10 hover:border-emerald-500/40 p-5 shadow-lg backdrop-blur-md transition-all duration-200"
              >
                {/* Top badge */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-extrabold text-base text-white font-display">{coupon.serviceName}</h3>
                        {isUserSubscribed && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            In Your Subs
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 mt-1 font-medium">{coupon.description}</p>
                    </div>

                    <span className="shrink-0 text-xs font-black px-2.5 py-1 rounded-lg bg-[#FF5C38]/15 text-[#FF5C38] border border-[#FF5C38]/30 font-mono-numbers">
                      {coupon.discountPercentage >= 100 ? '100% FREE' : `${coupon.discountPercentage}% OFF`}
                    </span>
                  </div>

                  {/* Validity */}
                  <div className="mt-4 flex items-center space-x-1.5 text-xs text-slate-500 font-mono-numbers">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Valid until: {coupon.validUntil}</span>
                  </div>
                </div>

                {/* Bottom code box */}
                <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between gap-3">
                  <div className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 font-mono-numbers font-bold text-xs text-[#FF8B6B] tracking-wider">
                    {coupon.code}
                  </div>

                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer active:scale-98 ${
                      copiedCode === coupon.code
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border border-white/10'
                    }`}
                  >
                    {copiedCode === coupon.code ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl bg-[#0F131D]/60 border border-white/10 p-12 text-center backdrop-blur-md">
          <Tag className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white font-display">No promotional deals found</h3>
          <p className="text-xs text-slate-400 mt-1">
            {activeTab === 'matched'
              ? 'None of your active subscriptions currently match our promotional partner list.'
              : 'Try clearing your search query.'}
          </p>
          {activeTab === 'matched' && (
            <button
              onClick={() => setActiveTab('all')}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-[#FF5C38] hover:bg-[#ff6e4d] text-white shadow-lg shadow-[#FF5C38]/20 transition cursor-pointer"
            >
              Browse All Available Deals
            </button>
          )}
        </div>
      )}
    </div>
  );
};
