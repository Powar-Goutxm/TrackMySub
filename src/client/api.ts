import {
  User,
  Subscription,
  SubscriptionRequest,
  DashboardSummary,
  CategoryBreakdown,
  Notification,
  Coupon
} from './types';

const TOKEN_KEY = 'trackmysub_access_token';
const REFRESH_KEY = 'trackmysub_refresh_token';

export const tokenStorage = {
  getAccessToken: () => localStorage.getItem(TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_KEY),
  setTokens: (access: string, refresh: string) => {
    localStorage.setItem(TOKEN_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
  },
  clearTokens: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  }
};

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = tokenStorage.getAccessToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(endpoint, {
    ...options,
    headers
  });

  if (response.status === 204) {
    return {} as T;
  }

  if (!response.ok) {
    if (response.status === 401 && token) {
      tokenStorage.clearTokens();
    }
    let errMessage = `Error ${response.status}`;
    try {
      const errData = await response.json();
      errMessage = errData.detail || errData.message || JSON.stringify(errData);
    } catch {
      // ignore
    }
    throw new Error(errMessage);
  }

  return response.json();
}

export const api = {
  // Auth
  login: async (email: string, password: string) => {
    const res = await apiFetch<{ accessToken: string; refreshToken: string; tokenType: string }>('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    tokenStorage.setTokens(res.accessToken, res.refreshToken);
    return res;
  },
  register: async (name: string, email: string, password: string) => {
    const res = await apiFetch<{ accessToken: string; refreshToken: string; tokenType: string }>('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
    tokenStorage.setTokens(res.accessToken, res.refreshToken);
    return res;
  },
  getMe: async (): Promise<User> => {
    return apiFetch<User>('/api/v1/auth/me');
  },

  // Subscriptions
  getSubscriptions: async (): Promise<Subscription[]> => {
    return apiFetch<Subscription[]>('/api/v1/subscriptions');
  },
  getSubscription: async (id: string): Promise<Subscription> => {
    return apiFetch<Subscription>(`/api/v1/subscriptions/${id}`);
  },
  createSubscription: async (data: SubscriptionRequest): Promise<Subscription> => {
    return apiFetch<Subscription>('/api/v1/subscriptions', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  updateSubscription: async (id: string, data: Partial<SubscriptionRequest>): Promise<Subscription> => {
    return apiFetch<Subscription>(`/api/v1/subscriptions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },
  deleteSubscription: async (id: string): Promise<void> => {
    return apiFetch<void>(`/api/v1/subscriptions/${id}`, {
      method: 'DELETE'
    });
  },

  // Dashboard
  getSummary: async (): Promise<DashboardSummary> => {
    return apiFetch<DashboardSummary>('/api/v1/dashboard/summary');
  },
  getCategories: async (): Promise<CategoryBreakdown[]> => {
    return apiFetch<CategoryBreakdown[]>('/api/v1/dashboard/categories');
  },

  // Notifications
  getNotifications: async (): Promise<Notification[]> => {
    return apiFetch<Notification[]>('/api/v1/notifications');
  },
  getUnreadCount: async (): Promise<{ unreadCount: number }> => {
    const data = await apiFetch<any>('/api/v1/notifications/unread-count');
    return { unreadCount: data.unreadCount ?? data.count ?? 0 };
  },
  markAsRead: async (id: string): Promise<Notification> => {
    return apiFetch<Notification>(`/api/v1/notifications/${id}/read`, {
      method: 'PATCH'
    });
  },
  markAllRead: async (): Promise<{ success: boolean }> => {
    return apiFetch<{ success: boolean }>('/api/v1/notifications/mark-all-read', {
      method: 'POST'
    });
  },
  triggerAlertCheck: async (): Promise<{ message: string; renewalsFound: number; trialsFound: number }> => {
    return apiFetch<{ message: string; renewalsFound: number; trialsFound: number }>('/api/v1/notifications/check-alerts', {
      method: 'POST'
    });
  },

  // Coupons
  getCoupons: async (): Promise<Coupon[]> => {
    return apiFetch<Coupon[]>('/api/v1/coupons');
  },
  getMySubscriptionCoupons: async (): Promise<Coupon[]> => {
    return apiFetch<Coupon[]>('/api/v1/coupons/my-subscriptions');
  }
};
