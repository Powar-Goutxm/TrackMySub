import React from 'react';
import { CreditCard, Bell, Plus, Tag, LayoutDashboard, ListOrdered, Sparkles, LogOut, User as UserIcon, ArrowLeft } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  activeTab: 'dashboard' | 'subscriptions' | 'coupons' | 'notifications';
  setActiveTab: (tab: 'dashboard' | 'subscriptions' | 'coupons' | 'notifications') => void;
  unreadCount: number;
  user: User | null;
  onOpenAddModal: () => void;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  onRunAlertCheck: () => void;
  isCheckingAlerts: boolean;
  onBackToLanding?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  unreadCount,
  user,
  onOpenAddModal,
  onOpenAuthModal,
  onLogout,
  onRunAlertCheck,
  isCheckingAlerts,
  onBackToLanding
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#08090D]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => setActiveTab('dashboard')}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF5C38] to-[#FF8B6B] flex items-center justify-center shadow-lg shadow-[#FF5C38]/25 group-hover:scale-105 transition-transform">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-display font-extrabold text-xl tracking-tight text-white">TrackMySub</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FF5C38]/15 text-[#FF5C38] border border-[#FF5C38]/30 font-mono-numbers">
                    App
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">Subscription Intelligence & Savings</p>
              </div>
            </div>

            {onBackToLanding && (
              <button
                onClick={onBackToLanding}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold typo-button text-[#FF5C38] hover:text-white bg-[#FF5C38]/10 hover:bg-[#FF5C38] border border-[#FF5C38]/30 transition ml-2 cursor-pointer"
                title="Return to the marketing landing presentation"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>WEBSITE</span>
              </button>
            )}
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#141824] text-white shadow-md border border-[#FF5C38]/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <LayoutDashboard className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-[#FF5C38]' : 'text-slate-400'}`} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
                activeTab === 'subscriptions'
                  ? 'bg-[#141824] text-white shadow-md border border-[#FF5C38]/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <ListOrdered className={`w-4 h-4 ${activeTab === 'subscriptions' ? 'text-[#FF5C38]' : 'text-slate-400'}`} />
              <span>Subscriptions</span>
            </button>

            <button
              onClick={() => setActiveTab('coupons')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
                activeTab === 'coupons'
                  ? 'bg-[#141824] text-white shadow-md border border-[#FF5C38]/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <Tag className={`w-4 h-4 ${activeTab === 'coupons' ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>Deals & Coupons</span>
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`relative flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
                activeTab === 'notifications'
                  ? 'bg-[#141824] text-white shadow-md border border-[#FF5C38]/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <Bell className={`w-4 h-4 ${activeTab === 'notifications' ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>Alerts</span>
              {unreadCount > 0 && (
                <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-black rounded-full bg-[#FF5C38] text-white font-mono-numbers">
                  {unreadCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* Background alert scan test */}
            <button
              onClick={onRunAlertCheck}
              disabled={isCheckingAlerts}
              title="Trigger AlertScheduler sweep"
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold typo-button text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition cursor-pointer"
            >
              <Sparkles className={`w-3 h-3 text-amber-400 ${isCheckingAlerts ? 'animate-spin' : ''}`} />
              <span>{isCheckingAlerts ? 'SCANNING...' : 'SCAN ALERTS'}</span>
            </button>

            {/* Add Subscription Button */}
            <button
              onClick={onOpenAddModal}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-bold typo-button text-white bg-[#FF5C38] hover:bg-[#ff6e4d] shadow-lg shadow-[#FF5C38]/25 transition cursor-pointer active:scale-98"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ ADD SUBSCRIPTION</span>
              <span className="w-3.5 h-3.5 rounded-full bg-black/20 flex items-center justify-center text-[7px] ml-0.5">↗</span>
            </button>

            {/* User profile / Auth */}
            {user ? (
              <div className="flex items-center space-x-2.5 pl-2 border-l border-white/10">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-bold text-white font-display">{user.name}</p>
                  <p className="text-[11px] text-slate-400 truncate max-w-[120px]">{user.email}</p>
                </div>
                <button
                  onClick={onLogout}
                  title="Log out"
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-white/5 transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center space-x-1 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition cursor-pointer"
              >
                <UserIcon className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-around py-2.5 border-t border-white/[0.08]">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center py-1 px-2 text-xs font-semibold ${
              activeTab === 'dashboard' ? 'text-[#FF5C38]' : 'text-slate-400'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 mb-0.5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`flex flex-col items-center py-1 px-2 text-xs font-semibold ${
              activeTab === 'subscriptions' ? 'text-[#FF5C38]' : 'text-slate-400'
            }`}
          >
            <ListOrdered className="w-4 h-4 mb-0.5" />
            <span>Subs</span>
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`flex flex-col items-center py-1 px-2 text-xs font-semibold ${
              activeTab === 'coupons' ? 'text-emerald-400' : 'text-slate-400'
            }`}
          >
            <Tag className="w-4 h-4 mb-0.5" />
            <span>Deals</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`relative flex flex-col items-center py-1 px-2 text-xs font-semibold ${
              activeTab === 'notifications' ? 'text-amber-400' : 'text-slate-400'
            }`}
          >
            <div className="relative">
              <Bell className="w-4 h-4 mb-0.5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-2 flex items-center justify-center min-w-[14px] h-[14px] px-0.5 text-[9px] font-bold rounded-full bg-[#FF5C38] text-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <span>Alerts</span>
          </button>
        </div>
      </div>
    </header>
  );
};
