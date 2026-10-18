import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_trackmysub_jwt_signing_key_2026_at_least_256_bits_long';
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

app.use(cors());
app.use(express.json());

// --- Types ---
export type BillingCycle = 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
export type SubscriptionCategory = 'STREAMING' | 'SOFTWARE' | 'GAMING' | 'UTILITIES' | 'FITNESS' | 'OTHER';
export type SubscriptionStatus = 'ACTIVE' | 'CANCELLED' | 'PAUSED' | 'TRIAL';
export type NotificationType = 'RENEWAL_REMINDER' | 'TRIAL_EXPIRY' | 'COUPON_AVAILABLE' | 'SYSTEM';
export type NotificationChannel = 'IN_APP' | 'EMAIL';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
  updatedAt: string;
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

// --- In-Memory Stores ---
const users = new Map<string, User>();
const subscriptions = new Map<string, Subscription>();
const notifications = new Map<string, Notification>();
const coupons = new Map<string, Coupon>();

// Helper to format dates YYYY-MM-DD
function formatDate(d: Date): string {
  return d.toISOString().split('T')[0];
}

function addDays(d: Date, days: number): Date {
  const result = new Date(d);
  result.setDate(result.getDate() + days);
  return result;
}

// --- Seed Initial Data ---
const demoUserId = '00000000-0000-0000-0000-000000000001';
const demoPasswordHash = bcrypt.hashSync('password123', 10);
const nowIso = new Date().toISOString();
const today = new Date();

users.set(demoUserId, {
  id: demoUserId,
  email: 'jane@example.com',
  name: 'Jane Doe',
  passwordHash: demoPasswordHash,
  createdAt: nowIso,
  updatedAt: nowIso
});

const seedSubs: Array<Omit<Subscription, 'id' | 'userId' | 'createdAt' | 'updatedAt'>> = [
  {
    serviceName: 'Netflix',
    category: 'STREAMING',
    cost: 649,
    billingCycle: 'MONTHLY',
    status: 'ACTIVE',
    nextRenewalDate: formatDate(addDays(today, 2)), // Due in 2 days (triggers alert)
    trialEndDate: null
  },
  {
    serviceName: 'Spotify',
    category: 'STREAMING',
    cost: 179,
    billingCycle: 'MONTHLY',
    status: 'ACTIVE',
    nextRenewalDate: formatDate(addDays(today, 14)),
    trialEndDate: null
  },
  {
    serviceName: 'Notion',
    category: 'SOFTWARE',
    cost: 500,
    billingCycle: 'MONTHLY',
    status: 'ACTIVE',
    nextRenewalDate: formatDate(addDays(today, 1)), // Due tomorrow (triggers alert)
    trialEndDate: null
  },
  {
    serviceName: 'Google One',
    category: 'UTILITIES',
    cost: 130,
    billingCycle: 'MONTHLY',
    status: 'ACTIVE',
    nextRenewalDate: formatDate(addDays(today, 22)),
    trialEndDate: null
  },
  {
    serviceName: 'Swiggy One',
    category: 'UTILITIES',
    cost: 299,
    billingCycle: 'YEARLY',
    status: 'ACTIVE',
    nextRenewalDate: formatDate(addDays(today, 90)),
    trialEndDate: null
  },
  {
    serviceName: 'Adobe CC',
    category: 'SOFTWARE',
    cost: 1675,
    billingCycle: 'MONTHLY',
    status: 'ACTIVE',
    nextRenewalDate: formatDate(addDays(today, 18)),
    trialEndDate: null
  },
  {
    serviceName: 'Apple Fitness+',
    category: 'FITNESS',
    cost: 990,
    billingCycle: 'MONTHLY',
    status: 'TRIAL',
    nextRenewalDate: null,
    trialEndDate: formatDate(addDays(today, 3)) // Trial expires in 3 days
  },
  {
    serviceName: 'ChatGPT Plus',
    category: 'SOFTWARE',
    cost: 1999,
    billingCycle: 'MONTHLY',
    status: 'ACTIVE',
    nextRenewalDate: formatDate(addDays(today, 5)),
    trialEndDate: null
  }
];

seedSubs.forEach((sub) => {
  const id = crypto.randomUUID();
  subscriptions.set(id, {
    ...sub,
    id,
    userId: demoUserId,
    createdAt: nowIso,
    updatedAt: nowIso
  });
});

// Seed Coupons from V2__seed_coupons.sql
const rawCoupons = [
  { serviceName: 'Netflix', code: 'NETFLIX10', description: '10% off on Annual Plan', discountPercentage: 10.00, validUntil: '2027-12-31' },
  { serviceName: 'Spotify', code: 'SPOTIFYFREE', description: '1 Month Free Premium', discountPercentage: 100.00, validUntil: '2027-06-30' },
  { serviceName: 'Spotify', code: 'SPOTMUSIC20', description: '20% off on Student Plan', discountPercentage: 20.00, validUntil: '2027-12-31' },
  { serviceName: 'Amazon Prime', code: 'PRIME2027', description: 'Special discount for new users', discountPercentage: 15.00, validUntil: '2027-12-31' },
  { serviceName: 'Hotstar', code: 'HOTSTAR50', description: '50% off on Super Plan', discountPercentage: 50.00, validUntil: '2027-12-31' },
  { serviceName: 'YouTube Premium', code: 'YTPREM25', description: '25% off for 3 months', discountPercentage: 25.00, validUntil: '2027-12-31' },
  { serviceName: 'Swiggy One', code: 'SWIGGYONE30', description: '30% off on 3 Months Plan', discountPercentage: 30.00, validUntil: '2027-12-31' },
  { serviceName: 'Swiggy One', code: 'SWIGGY100', description: 'Flat discount on Annual Plan', discountPercentage: 20.00, validUntil: '2027-12-31' },
  { serviceName: 'Zomato Gold', code: 'ZGOLD50', description: '50% off on Zomato Gold 3 Months', discountPercentage: 50.00, validUntil: '2027-12-31' },
  { serviceName: 'iCloud', code: 'APPLECLOUD10', description: '10% off on 200GB storage', discountPercentage: 10.00, validUntil: '2027-12-31' },
  { serviceName: 'Google One', code: 'GOOG100', description: '1 Month Free on 100GB Plan', discountPercentage: 100.00, validUntil: '2027-12-31' },
  { serviceName: 'LinkedIn Premium', code: 'LINKEDIN20', description: '20% off on Career Plan', discountPercentage: 20.00, validUntil: '2027-12-31' }
];

rawCoupons.forEach((c) => {
  const id = crypto.randomUUID();
  coupons.set(id, {
    ...c,
    id,
    validFrom: formatDate(today),
    isActive: true,
    createdAt: nowIso
  });
});

// Seed Initial Notifications
const seedNotifications = [
  {
    userId: demoUserId,
    type: 'RENEWAL_REMINDER' as NotificationType,
    channel: 'IN_APP' as NotificationChannel,
    title: 'Renewal Reminder',
    message: `Your GitHub Copilot subscription of $10.00 is renewing tomorrow.`,
    isRead: false,
    sentAt: nowIso,
    createdAt: nowIso
  },
  {
    userId: demoUserId,
    type: 'TRIAL_EXPIRY' as NotificationType,
    channel: 'IN_APP' as NotificationChannel,
    title: 'Trial Expiry Alert',
    message: `Your Apple Fitness+ trial is expiring in 3 days. Cancel beforehand to avoid recurring charges.`,
    isRead: false,
    sentAt: nowIso,
    createdAt: nowIso
  },
  {
    userId: demoUserId,
    type: 'COUPON_AVAILABLE' as NotificationType,
    channel: 'IN_APP' as NotificationChannel,
    title: 'New Deal Found',
    message: `A new 10% coupon code (NETFLIX10) is available for Netflix!`,
    isRead: true,
    sentAt: nowIso,
    createdAt: nowIso
  }
];

seedNotifications.forEach((n) => {
  const id = crypto.randomUUID();
  notifications.set(id, { ...n, id });
});

// --- Alert Scheduler Engine ---
function runAlertCheck(targetUserId?: string): { renewalsFound: number; trialsFound: number } {
  const currentDate = new Date();
  const threeDaysLater = addDays(currentDate, 3);
  const curStr = formatDate(currentDate);
  const maxStr = formatDate(threeDaysLater);

  let renewalsFound = 0;
  let trialsFound = 0;

  for (const sub of subscriptions.values()) {
    if (targetUserId && sub.userId !== targetUserId) continue;

    // Check renewals for active subscriptions
    if (sub.status === 'ACTIVE' && sub.nextRenewalDate) {
      if (sub.nextRenewalDate >= curStr && sub.nextRenewalDate <= maxStr) {
        // Check if an alert was already sent today for this subscription
        const alreadySent = Array.from(notifications.values()).some(
          (n) =>
            n.userId === sub.userId &&
            n.subscriptionId === sub.id &&
            n.type === 'RENEWAL_REMINDER' &&
            formatDate(new Date(n.sentAt)) === curStr
        );

        if (!alreadySent) {
          const id = crypto.randomUUID();
          notifications.set(id, {
            id,
            userId: sub.userId,
            subscriptionId: sub.id,
            type: 'RENEWAL_REMINDER',
            channel: 'IN_APP',
            title: 'Renewal Reminder',
            message: `Your ${sub.serviceName} subscription ($${sub.cost.toFixed(2)}) is renewing on ${sub.nextRenewalDate}.`,
            isRead: false,
            sentAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
          });
          renewalsFound++;
        }
      }
    }

    // Check trial expirations
    if (sub.status === 'TRIAL' && sub.trialEndDate) {
      if (sub.trialEndDate >= curStr && sub.trialEndDate <= maxStr) {
        const alreadySent = Array.from(notifications.values()).some(
          (n) =>
            n.userId === sub.userId &&
            n.subscriptionId === sub.id &&
            n.type === 'TRIAL_EXPIRY' &&
            formatDate(new Date(n.sentAt)) === curStr
        );

        if (!alreadySent) {
          const id = crypto.randomUUID();
          notifications.set(id, {
            id,
            userId: sub.userId,
            subscriptionId: sub.id,
            type: 'TRIAL_EXPIRY',
            channel: 'IN_APP',
            title: 'Trial Expiry Alert',
            message: `Your ${sub.serviceName} trial is expiring on ${sub.trialEndDate}.`,
            isRead: false,
            sentAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
          });
          trialsFound++;
        }
      }
    }
  }

  return { renewalsFound, trialsFound };
}

// Run periodic alert check
setInterval(() => {
  try {
    runAlertCheck();
  } catch (err) {
    console.error('Alert check error:', err);
  }
}, 60 * 60 * 1000);

// --- Auth Utilities & Middleware ---
interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

function generateTokens(user: User) {
  const accessToken = jwt.sign(
    { sub: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
  const refreshToken = jwt.sign(
    { sub: user.id, type: 'refresh' },
    JWT_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
  return { accessToken, refreshToken, tokenType: 'Bearer' };
}

function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // If no token, check if demo fallback is requested
    const demoHeader = req.headers['x-demo-user'];
    if (demoHeader && users.has(demoUserId)) {
      const u = users.get(demoUserId)!;
      req.user = { id: u.id, email: u.email, name: u.name };
      return next();
    }
    return res.status(401).json({
      type: 'about:blank',
      title: 'Unauthorized',
      status: 401,
      detail: 'Full authentication is required to access this resource',
      instance: req.originalUrl
    });
  }

  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = users.get(decoded.sub);
    if (!user) {
      return res.status(401).json({
        type: 'about:blank',
        title: 'Unauthorized',
        status: 401,
        detail: 'User belonging to this token no longer exists',
        instance: req.originalUrl
      });
    }
    req.user = { id: user.id, email: user.email, name: user.name };
    next();
  } catch (err: any) {
    return res.status(401).json({
      type: 'about:blank',
      title: 'Invalid Token',
      status: 401,
      detail: err.message || 'Token is invalid or expired',
      instance: req.originalUrl
    });
  }
}

// --- API Endpoints: Auth ---
app.post('/api/v1/auth/register', (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      type: 'about:blank',
      title: 'Validation Failed',
      status: 400,
      detail: 'Name, email, and password are required',
      instance: req.originalUrl
    });
  }

  // Check if exists
  for (const u of users.values()) {
    if (u.email.toLowerCase() === email.toLowerCase()) {
      return res.status(409).json({
        type: 'about:blank',
        title: 'Conflict',
        status: 409,
        detail: 'User with this email already exists',
        instance: req.originalUrl
      });
    }
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    email: email.trim().toLowerCase(),
    name: name.trim(),
    passwordHash: bcrypt.hashSync(password, 10),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  users.set(newUser.id, newUser);

  const tokens = generateTokens(newUser);
  return res.status(201).json(tokens);
});

app.post('/api/v1/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      type: 'about:blank',
      title: 'Validation Failed',
      status: 400,
      detail: 'Email and password are required',
      instance: req.originalUrl
    });
  }

  let foundUser: User | undefined;
  for (const u of users.values()) {
    if (u.email.toLowerCase() === email.toLowerCase()) {
      foundUser = u;
      break;
    }
  }

  if (!foundUser || !bcrypt.compareSync(password, foundUser.passwordHash)) {
    return res.status(401).json({
      type: 'about:blank',
      title: 'Authentication Failed',
      status: 401,
      detail: 'Invalid email or password',
      instance: req.originalUrl
    });
  }

  const tokens = generateTokens(foundUser);
  return res.json(tokens);
});

app.post('/api/v1/auth/refresh', (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({
      type: 'about:blank',
      title: 'Validation Failed',
      status: 400,
      detail: 'refreshToken is required',
      instance: req.originalUrl
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET) as any;
    const user = users.get(decoded.sub);
    if (!user) {
      return res.status(401).json({
        type: 'about:blank',
        title: 'Invalid Refresh Token',
        status: 401,
        detail: 'User does not exist',
        instance: req.originalUrl
      });
    }
    const tokens = generateTokens(user);
    return res.json(tokens);
  } catch (err: any) {
    return res.status(401).json({
      type: 'about:blank',
      title: 'Invalid Refresh Token',
      status: 401,
      detail: err.message,
      instance: req.originalUrl
    });
  }
});

app.get('/api/v1/auth/me', authMiddleware, (req: AuthRequest, res: Response) => {
  const user = users.get(req.user!.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  });
});

// --- API Endpoints: Subscriptions ---
app.get('/api/v1/subscriptions', authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const userSubs = Array.from(subscriptions.values()).filter((s) => s.userId === userId);
  return res.json(userSubs);
});

app.post('/api/v1/subscriptions', authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { serviceName, category, cost, billingCycle, status, nextRenewalDate, trialEndDate } = req.body;

  if (!serviceName || cost === undefined || !billingCycle || !category) {
    return res.status(400).json({
      type: 'about:blank',
      title: 'Validation Failed',
      status: 400,
      detail: 'serviceName, category, cost, and billingCycle are required',
      instance: req.originalUrl
    });
  }

  const id = crypto.randomUUID();
  const subNow = new Date().toISOString();
  const newSub: Subscription = {
    id,
    userId,
    serviceName: serviceName.trim(),
    category,
    cost: Number(cost),
    billingCycle,
    status: status || 'ACTIVE',
    nextRenewalDate: nextRenewalDate || null,
    trialEndDate: trialEndDate || null,
    createdAt: subNow,
    updatedAt: subNow
  };

  subscriptions.set(id, newSub);
  return res.status(201).json(newSub);
});

app.get('/api/v1/subscriptions/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const id = req.params.id as string;
  const sub = subscriptions.get(id);
  if (!sub || sub.userId !== userId) {
    return res.status(404).json({
      type: 'about:blank',
      title: 'Resource Not Found',
      status: 404,
      detail: `Subscription with id ${id} not found`,
      instance: req.originalUrl
    });
  }
  return res.json(sub);
});

app.put('/api/v1/subscriptions/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const id = req.params.id as string;
  const sub = subscriptions.get(id);
  if (!sub || sub.userId !== userId) {
    return res.status(404).json({
      type: 'about:blank',
      title: 'Resource Not Found',
      status: 404,
      detail: `Subscription with id ${id} not found`,
      instance: req.originalUrl
    });
  }

  const { serviceName, category, cost, billingCycle, status, nextRenewalDate, trialEndDate } = req.body;
  if (serviceName) sub.serviceName = serviceName.trim();
  if (category) sub.category = category;
  if (cost !== undefined) sub.cost = Number(cost);
  if (billingCycle) sub.billingCycle = billingCycle;
  if (status) sub.status = status;
  sub.nextRenewalDate = nextRenewalDate !== undefined ? nextRenewalDate : sub.nextRenewalDate;
  sub.trialEndDate = trialEndDate !== undefined ? trialEndDate : sub.trialEndDate;
  sub.updatedAt = new Date().toISOString();

  subscriptions.set(sub.id, sub);
  return res.json(sub);
});

app.delete('/api/v1/subscriptions/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const id = req.params.id as string;
  const sub = subscriptions.get(id);
  if (!sub || sub.userId !== userId) {
    return res.status(404).json({
      type: 'about:blank',
      title: 'Resource Not Found',
      status: 404,
      detail: `Subscription with id ${id} not found`,
      instance: req.originalUrl
    });
  }

  subscriptions.delete(id);
  return res.status(204).send();
});

// --- API Endpoints: Dashboard ---
app.get('/api/v1/dashboard/summary', authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const activeSubs = Array.from(subscriptions.values()).filter(
    (s) => s.userId === userId && s.status === 'ACTIVE'
  );

  let totalMonthlySpend = 0;
  let totalYearlySpend = 0;

  activeSubs.forEach((sub) => {
    if (sub.billingCycle === 'MONTHLY') {
      totalMonthlySpend += sub.cost;
      totalYearlySpend += sub.cost * 12;
    } else if (sub.billingCycle === 'YEARLY') {
      totalMonthlySpend += sub.cost / 12;
      totalYearlySpend += sub.cost;
    } else if (sub.billingCycle === 'QUARTERLY') {
      totalMonthlySpend += sub.cost / 3;
      totalYearlySpend += sub.cost * 4;
    }
  });

  const todayStr = formatDate(new Date());
  const nextWeekStr = formatDate(addDays(new Date(), 7));

  const upcomingRenewals = activeSubs.filter(
    (s) => s.nextRenewalDate && s.nextRenewalDate >= todayStr && s.nextRenewalDate <= nextWeekStr
  );

  return res.json({
    totalMonthlySpend: Number(totalMonthlySpend.toFixed(2)),
    totalYearlySpend: Number(totalYearlySpend.toFixed(2)),
    activeSubscriptionCount: activeSubs.length,
    upcomingRenewals
  });
});

app.get('/api/v1/dashboard/categories', authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const activeSubs = Array.from(subscriptions.values()).filter(
    (s) => s.userId === userId && s.status === 'ACTIVE'
  );

  const groupMap = new Map<string, { totalSpend: number; count: number }>();

  activeSubs.forEach((sub) => {
    let monthlyVal = 0;
    if (sub.billingCycle === 'MONTHLY') monthlyVal = sub.cost;
    else if (sub.billingCycle === 'YEARLY') monthlyVal = sub.cost / 12;
    else if (sub.billingCycle === 'QUARTERLY') monthlyVal = sub.cost / 3;

    const curr = groupMap.get(sub.category) || { totalSpend: 0, count: 0 };
    curr.totalSpend += monthlyVal;
    curr.count += 1;
    groupMap.set(sub.category, curr);
  });

  const result = Array.from(groupMap.entries()).map(([category, data]) => ({
    category,
    totalSpend: Number(data.totalSpend.toFixed(2)),
    count: data.count
  })).sort((a, b) => b.totalSpend - a.totalSpend);

  return res.json(result);
});

// --- API Endpoints: Notifications ---
app.get('/api/v1/notifications', authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const userNotifs = Array.from(notifications.values())
    .filter((n) => n.userId === userId)
    .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());
  return res.json(userNotifs);
});

app.get(['/api/v1/notifications/unread', '/api/v1/notifications/unread-count'], authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const unreadCount = Array.from(notifications.values()).filter(
    (n) => n.userId === userId && !n.isRead
  ).length;
  return res.json({ unreadCount });
});

app.patch('/api/v1/notifications/:id/read', authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const id = req.params.id as string;
  const notif = notifications.get(id);
  if (!notif || notif.userId !== userId) {
    return res.status(404).json({
      type: 'about:blank',
      title: 'Resource Not Found',
      status: 404,
      detail: `Notification with id ${id} not found`,
      instance: req.originalUrl
    });
  }

  notif.isRead = true;
  notifications.set(notif.id, notif);
  return res.json(notif);
});

app.post('/api/v1/notifications/mark-all-read', authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  for (const notif of notifications.values()) {
    if (notif.userId === userId) {
      notif.isRead = true;
    }
  }
  return res.json({ success: true });
});

app.post('/api/v1/notifications/check-alerts', authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const result = runAlertCheck(userId);
  return res.json({
    message: 'Alert check executed successfully',
    ...result
  });
});

// --- API Endpoints: Coupons ---
app.get('/api/v1/coupons', authMiddleware, (_req: AuthRequest, res: Response) => {
  const activeCoupons = Array.from(coupons.values()).filter((c) => c.isActive);
  return res.json(activeCoupons);
});

app.get('/api/v1/coupons/my-subscriptions', authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const userSubs = Array.from(subscriptions.values()).filter((s) => s.userId === userId);
  const userServices = userSubs.map((s) => s.serviceName.toLowerCase());

  const matchedCoupons = Array.from(coupons.values()).filter((c) => {
    if (!c.isActive) return false;
    const cName = c.serviceName.toLowerCase();
    return userServices.some((s) => s.includes(cName) || cName.includes(s));
  });

  return res.json(matchedCoupons);
});

// --- Vite / Frontend Serving ---
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve('dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, HOST, () => {
    console.log(`🚀 TrackMySub server running at http://${HOST}:${PORT}`);
  });
}

startServer();
