import React, { useState } from 'react';
import {
  Bell,
  Clock,
  AlertTriangle,
  Tag,
  Info,
  CheckCheck,
  Check,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { Notification, NotificationType } from '../types';

interface NotificationsTabProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
  onMarkAllRead: () => void;
  onRunAlertCheck: () => void;
  isCheckingAlerts: boolean;
}

export const NotificationsTab: React.FC<NotificationsTabProps> = ({
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllRead,
  onRunAlertCheck,
  isCheckingAlerts
}) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = notifications.filter((n) => (filter === 'unread' ? !n.isRead : true));

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'RENEWAL_REMINDER':
        return (
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
        );
      case 'TRIAL_EXPIRY':
        return (
          <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
        );
      case 'COUPON_AVAILABLE':
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <Tag className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-[#FF5C38]/15 text-[#FF5C38] border border-[#FF5C38]/30 flex items-center justify-center shrink-0">
            <Info className="w-4 h-4" />
          </div>
        );
    }
  };

  const formatTimestamp = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="space-y-6 pb-14">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autonomous Alert Engine</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white font-display">Alerts & Notifications</h1>
          <p className="text-xs text-slate-400 mt-1">
            Background alerts delivered before renewals or trial expirations.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          {/* Background scan trigger */}
          <button
            onClick={onRunAlertCheck}
            disabled={isCheckingAlerts}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isCheckingAlerts ? 'animate-spin' : ''}`} />
            <span>{isCheckingAlerts ? 'Checking...' : 'Run Alert Check'}</span>
          </button>

          {/* Mark all read */}
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllRead}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#FF5C38] hover:bg-[#ff6e4d] shadow-lg shadow-[#FF5C38]/25 transition cursor-pointer active:scale-98"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark All Read</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-white/[0.08] pb-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            filter === 'all'
              ? 'bg-[#141824] text-white border border-[#FF5C38]/40 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          All Notifications ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
            filter === 'unread'
              ? 'bg-[#141824] text-white border border-[#FF5C38]/40 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Unread</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-[#FF5C38] text-white font-mono-numbers">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notifications list */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-2xl border transition gap-3 backdrop-blur-md ${
                item.isRead
                  ? 'bg-[#0F131D]/70 border-white/[0.06] text-slate-300'
                  : 'bg-[#141824] border-[#FF5C38]/30 shadow-lg shadow-[#FF5C38]/10'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                {getNotifIcon(item.type)}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className={`text-sm font-bold font-display ${item.isRead ? 'text-slate-300' : 'text-white'}`}>
                      {item.title}
                    </h3>
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#FF5C38] ring-2 ring-[#FF5C38]/30 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.message}</p>
                  <p className="text-[11px] text-slate-500 mt-1.5 font-mono-numbers">{formatTimestamp(item.sentAt || item.createdAt)}</p>
                </div>
              </div>

              {!item.isRead && (
                <button
                  onClick={() => onMarkAsRead(item.id)}
                  className="self-end sm:self-center flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.06] hover:bg-white/[0.12] hover:text-white border border-white/10 transition shrink-0 cursor-pointer active:scale-98"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mark Read</span>
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-[#0F131D]/60 border border-white/10 p-12 text-center backdrop-blur-md">
          <Bell className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white font-display">No notifications</h3>
          <p className="text-xs text-slate-400 mt-1">
            {filter === 'unread' ? 'All caught up! No unread alerts.' : 'No alerts have been recorded yet.'}
          </p>
        </div>
      )}
    </div>
  );
};
