import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardTab } from './components/DashboardTab';
import { SubscriptionsTab } from './components/SubscriptionsTab';
import { CouponsTab } from './components/CouponsTab';
import { NotificationsTab } from './components/NotificationsTab';
import { SubscriptionModal } from './components/SubscriptionModal';
import { AuthModal } from './components/AuthModal';
import { LandingPage } from './components/landing/LandingPage';
import { api, tokenStorage } from './api';
import {
  User,
  Subscription,
  SubscriptionRequest,
  DashboardSummary,
  CategoryBreakdown,
  Notification,
  Coupon
} from './types';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export const App: React.FC = () => {
  // 'landing' is default as confirmed in the Phase 1 questionnaire
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'subscriptions' | 'coupons' | 'notifications'>('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [categories, setCategories] = useState<CategoryBreakdown[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [allCoupons, setAllCoupons] = useState<Coupon[]>([]);
  const [matchedCoupons, setMatchedCoupons] = useState<Coupon[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Modals
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [selectedSubForEdit, setSelectedSubForEdit] = useState<Subscription | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // State indicators
  const [loading, setLoading] = useState(true);
  const [isCheckingAlerts, setIsCheckingAlerts] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const loadAllData = async () => {
    try {
      // 1. Get current user if token exists or fallback
      try {
        const me = await api.getMe();
        setUser(me);
      } catch {
        setUser({
          id: '00000000-0000-0000-0000-000000000001',
          name: 'Jane Doe',
          email: 'jane@example.com',
          createdAt: new Date().toISOString()
        });
      }

      // 2. Fetch data in parallel
      const [sum, cats, subs, allCps, matchedCps, notifs, unread] = await Promise.all([
        api.getSummary().catch(() => null),
        api.getCategories().catch(() => []),
        api.getSubscriptions().catch(() => []),
        api.getCoupons().catch(() => []),
        api.getMySubscriptionCoupons().catch(() => []),
        api.getNotifications().catch(() => []),
        api.getUnreadCount().catch(() => ({ unreadCount: 0 }))
      ]);

      setSummary(sum);
      setCategories(cats);
      setSubscriptions(subs);
      setAllCoupons(allCps);
      setMatchedCoupons(matchedCps);
      setNotifications(notifs);
      setUnreadCount(unread.unreadCount);
    } catch (err: any) {
      console.error('Error loading TrackMySub data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleSaveSubscription = async (data: SubscriptionRequest, id?: string) => {
    if (id) {
      await api.updateSubscription(id, data);
      showToast(`Updated "${data.serviceName}" successfully`);
    } else {
      await api.createSubscription(data);
      showToast(`Added "${data.serviceName}" to subscriptions`);
    }
    await loadAllData();
  };

  const handleDeleteSubscription = async (id: string) => {
    const target = subscriptions.find((s) => s.id === id);
    if (confirm(`Are you sure you want to delete ${target?.serviceName || 'this subscription'}?`)) {
      try {
        await api.deleteSubscription(id);
        showToast('Subscription deleted');
        await loadAllData();
      } catch (err: any) {
        showToast(err.message, 'error');
      }
    }
  };

  const handleToggleStatus = async (sub: Subscription) => {
    const newStatus = sub.status === 'PAUSED' ? 'ACTIVE' : 'PAUSED';
    try {
      await api.updateSubscription(sub.id, { status: newStatus });
      showToast(`${sub.serviceName} marked as ${newStatus.toLowerCase()}`);
      await loadAllData();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await api.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.markAllRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
      showToast('All notifications marked as read');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleRunAlertCheck = async () => {
    setIsCheckingAlerts(true);
    try {
      const res = await api.triggerAlertCheck();
      showToast(
        `Alert sweep finished: ${res.renewalsFound} renewal alerts, ${res.trialsFound} trial warnings processed.`
      );
      await loadAllData();
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setIsCheckingAlerts(false);
    }
  };

  const handleLogout = () => {
    tokenStorage.clearTokens();
    setUser(null);
    showToast('Signed out of session', 'info');
    loadAllData();
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-slate-100 flex flex-col font-sans selection:bg-[#FF5C38] selection:text-white">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-2.5 px-4 py-3 rounded-xl bg-[#0F131D] border border-white/15 shadow-2xl text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span className="text-slate-200 font-medium">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="text-slate-500 hover:text-slate-300 ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Render View Mode */}
      {viewMode === 'landing' ? (
        <LandingPage
          onLaunchApp={() => {
            setViewMode('app');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onSuccessAuth={(loggedUser) => {
            setUser(loggedUser);
            setViewMode('app');
            showToast(`Welcome back, ${loggedUser.name}!`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : (
        <>
          {/* App Header Navigation with Return to Website */}
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            unreadCount={unreadCount}
            user={user}
            onOpenAddModal={() => {
              setSelectedSubForEdit(null);
              setIsSubModalOpen(true);
            }}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onLogout={handleLogout}
            onRunAlertCheck={handleRunAlertCheck}
            isCheckingAlerts={isCheckingAlerts}
            onBackToLanding={() => {
              setViewMode('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Main App Content Viewport */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
            {loading ? (
              <div className="flex items-center justify-center py-32 space-x-3">
                <div className="w-5 h-5 rounded-full border-2 border-[#FF5C38] border-t-transparent animate-spin" />
                <span className="text-sm font-semibold text-slate-400">Loading TrackMySub...</span>
              </div>
            ) : (
              <>
                {activeTab === 'dashboard' && (
                  <DashboardTab
                    summary={summary}
                    categories={categories}
                    allSubscriptions={subscriptions}
                    matchedCoupons={matchedCoupons}
                    onOpenAddModal={() => {
                      setSelectedSubForEdit(null);
                      setIsSubModalOpen(true);
                    }}
                    onNavigateTab={setActiveTab}
                    onSelectSubscription={(sub) => {
                      setSelectedSubForEdit(sub);
                      setIsSubModalOpen(true);
                    }}
                  />
                )}

                {activeTab === 'subscriptions' && (
                  <SubscriptionsTab
                    subscriptions={subscriptions}
                    onOpenAddModal={() => {
                      setSelectedSubForEdit(null);
                      setIsSubModalOpen(true);
                    }}
                    onEditSubscription={(sub) => {
                      setSelectedSubForEdit(sub);
                      setIsSubModalOpen(true);
                    }}
                    onDeleteSubscription={handleDeleteSubscription}
                    onToggleStatus={handleToggleStatus}
                  />
                )}

                {activeTab === 'coupons' && (
                  <CouponsTab
                    allCoupons={allCoupons}
                    matchedCoupons={matchedCoupons}
                    subscriptions={subscriptions}
                  />
                )}

                {activeTab === 'notifications' && (
                  <NotificationsTab
                    notifications={notifications}
                    unreadCount={unreadCount}
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAllRead={handleMarkAllRead}
                    onRunAlertCheck={handleRunAlertCheck}
                    isCheckingAlerts={isCheckingAlerts}
                  />
                )}
              </>
            )}
          </main>
        </>
      )}

      {/* Shared Modals */}
      <SubscriptionModal
        isOpen={isSubModalOpen}
        onClose={() => {
          setIsSubModalOpen(false);
          setSelectedSubForEdit(null);
        }}
        onSave={handleSaveSubscription}
        subscriptionToEdit={selectedSubForEdit}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(loggedUser) => {
          setUser(loggedUser);
          showToast(`Signed in as ${loggedUser.name}`);
          loadAllData();
        }}
      />
    </div>
  );
};
