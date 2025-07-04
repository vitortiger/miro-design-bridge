
export interface User {
  id: string;
  email: string;
  name: string;
  plan: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TelegramBot {
  id: string;
  user_id: string;
  bot_token: string;
  bot_username: string;
  chat_id?: string;
  chat_name?: string;
  chat_type?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  user_id: string;
  telegram_bot_id: string;
  name: string;
  description?: string;
  is_active: boolean;
  capture_webhook_url: string;
  member_webhook_url: string;
  tracking_script_url: string;
  created_at: string;
  updated_at: string;
  telegram_bot?: TelegramBot;
  lead_count?: number;
  recent_leads?: Lead[];
}

export interface Lead {
  id: string;
  user_id: string;
  campaign_id: string;
  telegram_id: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  invite_link?: string;
  created_at: string;
  campaign?: Campaign;
}

export interface DashboardOverview {
  total_campaigns: number;
  total_bots: number;
  total_leads: number;
  active_campaigns: number;
  top_campaigns: Array<{
    id: string;
    name: string;
    lead_count: number;
  }>;
  recent_activity: Array<{
    type: string;
    message: string;
    timestamp: string;
  }>;
}

export interface DashboardAnalytics {
  daily_leads: Array<{
    date: string;
    count: number;
  }>;
  utm_breakdown: {
    source: Record<string, number>;
    medium: Record<string, number>;
    campaign: Record<string, number>;
  };
  campaign_performance: Array<{
    campaign_id: string;
    campaign_name: string;
    lead_count: number;
    growth_rate: number;
  }>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
