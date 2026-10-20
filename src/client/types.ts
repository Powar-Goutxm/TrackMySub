export type BillingCycle = 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
export type SubscriptionCategory = 'STREAMING' | 'SOFTWARE' | 'GAMING' | 'UTILITIES' | 'FITNESS' | 'OTHER';
export type SubscriptionStatus = 'ACTIVE' | 'CANCELLED' | 'PAUSED' | 'TRIAL';
export type NotificationType = 'RENEWAL_REMINDER' | 'TRIAL_EXPIRY' | 'COUPON_AVAILABLE' | 'SYSTEM';
export type NotificationChannel = 'IN_APP' | 'EMAIL';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  serviceName: string;
  category: SubscriptionCategory;
  cost: number;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  nextRenewalDate: string | null;
  trialEndDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionRequest {
  serviceName: string;
  category: SubscriptionCategory;
  cost: number;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  nextRenewalDate?: string | null;
  trialEndDate?: string | null;
}

export interface Notification {
  id: string;
  userId: string;
  subscriptionId?: string | null;
  type: NotificationType;
  channel: NotificationChannel;
  title: string;
  message: string;
  isRead: boolean;
  sentAt: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  serviceName: string;
  code: string;
  description: string;
  discountPercentage: number;
  validFrom: string;
  validUntil: string;
  sourceUrl?: string;
  isActive: boolean;
  createdAt: string;
}

export interface DashboardSummary {
  totalMonthlySpend: number;
  totalYearlySpend: number;
  activeSubscriptionCount: number;
  upcomingRenewals: Subscription[];
}

export interface CategoryBreakdown {
  category: SubscriptionCategory;
  totalSpend: number;
  count: number;
}
