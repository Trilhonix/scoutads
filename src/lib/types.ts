export interface Creative {
  creative_id: string;
  fingerprint_text: string;
  fingerprint_media: string;
  first_seen: string;
  last_seen: string;
  storage_path?: string;
  media_type: 'image' | 'video' | 'carousel';
  perceptual_hash?: string;
  sha256?: string;
  preview_url: string;
  count_duplicates: number;
  score: number;
  countries: string[];
  advertiser: string;
  snippet: string;
  headline?: string;
  text: string;
  landing_url?: string;
  platform: 'facebook' | 'instagram';
  days_active: number;
  score_breakdown?: ScoreBreakdown;
  engagement_proxy?: number;
  velocity?: number;
}

export interface Ad {
  ad_id: string;
  creative_id: string;
  advertiser: string;
  text: string;
  country: string;
  platform: 'facebook' | 'instagram';
  landing_url?: string;
  first_seen: string;
  last_seen: string;
  meta_payload: Record<string, any>;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  subscription_plan: 'free' | 'starter' | 'pro' | 'agency';
  subscription_status: 'active' | 'canceled' | 'past_due' | 'trialing';
  trial_ends_at?: string;
  created_at: string;
  preferences: UserPreferences;
  usage: UserUsage;
}

export interface UserPreferences {
  min_duplicates: number;
  default_country: string;
  default_language: string;
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    webhook: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  auto_crawl_enabled: boolean;
  default_filters: SearchFilters;
}

export interface UserUsage {
  searches_today: number;
  downloads_this_month: number;
  monitors_active: number;
  api_calls_today: number;
  last_reset: string;
}

export interface SearchFilters {
  query?: string;
  min_duplicates: number;
  max_duplicates?: number;
  countries: string[];
  platforms: ('facebook' | 'instagram')[];
  media_types: ('image' | 'video' | 'carousel')[];
  date_from?: string;
  date_to?: string;
  min_score?: number;
  max_score?: number;
  landing_domain?: string;
  advertiser?: string;
  min_days_active?: number;
  max_days_active?: number;
  sort_by: 'score' | 'duplicates' | 'days_active' | 'first_seen' | 'last_seen';
  sort_order: 'asc' | 'desc';
}

export interface Monitor {
  id: string;
  name: string;
  description?: string;
  query: string;
  filters: SearchFilters;
  webhook_url?: string;
  telegram_chat_id?: string;
  whatsapp_number?: string;
  email_notifications: boolean;
  schedule: 'hourly' | 'daily' | 'weekly';
  is_active: boolean;
  created_at: string;
  last_run?: string;
  last_results_count?: number;
  user_id: string;
  workspace_id?: string;
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  owner_id: string;
  members: WorkspaceMember[];
  created_at: string;
  settings: WorkspaceSettings;
  usage: WorkspaceUsage;
}

export interface WorkspaceMember {
  user_id: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joined_at: string;
  permissions: string[];
}

export interface WorkspaceSettings {
  allow_downloads: boolean;
  allow_exports: boolean;
  allow_monitors: boolean;
  max_saved_searches: number;
  require_approval_for_downloads: boolean;
}

export interface WorkspaceUsage {
  total_searches: number;
  total_downloads: number;
  active_monitors: number;
  storage_used_mb: number;
}

export interface SavedSearch {
  id: string;
  name: string;
  description?: string;
  filters: SearchFilters;
  user_id: string;
  workspace_id?: string;
  created_at: string;
  last_used?: string;
  use_count: number;
  is_favorite: boolean;
}

export interface SwipeFile {
  id: string;
  name: string;
  description?: string;
  creatives: string[]; // creative_ids
  user_id: string;
  workspace_id?: string;
  is_public: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
  download_count: number;
  view_count: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  features: PlanFeatures;
  limits: PlanLimits;
  is_popular?: boolean;
  stripe_price_id_monthly?: string;
  stripe_price_id_yearly?: string;
}

export interface PlanFeatures {
  searches_per_day: number;
  downloads_per_month: number;
  monitors: number;
  workspaces: number;
  api_access: boolean;
  priority_support: boolean;
  custom_webhooks: boolean;
  bulk_export: boolean;
  ai_insights: boolean;
  advanced_filters: boolean;
  historical_data_months: number;
  concurrent_crawlers: number;
}

export interface PlanLimits {
  max_saved_searches: number;
  max_swipe_files: number;
  max_workspace_members: number;
  rate_limit_per_minute: number;
  storage_limit_gb: number;
  export_limit_per_day: number;
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    per_page: number;
    has_more: boolean;
    search_time_ms: number;
  };
  error?: string;
  success: boolean;
}

export interface SearchResponse {
  items: Creative[];
  total: number;
  page: number;
  per_page: number;
  has_more: boolean;
  filters_applied: SearchFilters;
  search_time_ms: number;
  suggestions?: string[];
}

export interface CountryData {
  code: string;
  name: string;
  flag: string;
  ad_count: number;
  growth_rate?: number;
}

export interface ScoreBreakdown {
  variation_score: number;
  country_score: number;
  duration_score: number;
  engagement_score: number;
  recency_score: number;
  total_score: number;
  weights: {
    variation: number;
    country: number;
    duration: number;
    engagement: number;
    recency: number;
  };
}

export interface CrawlJob {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  query: string;
  filters: SearchFilters;
  user_id: string;
  workspace_id?: string;
  created_at: string;
  started_at?: string;
  completed_at?: string;
  results_count?: number;
  error_message?: string;
  progress_percentage: number;
}

export interface Alert {
  id: string;
  monitor_id: string;
  creative_id: string;
  triggered_at: string;
  trigger_reason: string;
  is_read: boolean;
  user_id: string;
}

export interface AdminStats {
  total_users: number;
  active_users_today: number;
  total_creatives: number;
  total_searches_today: number;
  total_downloads_today: number;
  revenue_this_month: number;
  top_advertisers: Array<{name: string, count: number}>;
  top_countries: Array<{code: string, name: string, count: number}>;
  plan_distribution: Array<{plan: string, count: number}>;
}

export interface ProxyConfig {
  id: string;
  provider: 'smartproxy' | 'brightdata' | 'oxylabs' | 'custom';
  endpoint: string;
  username?: string;
  password?: string;
  is_active: boolean;
  success_rate: number;
  avg_response_time_ms: number;
  last_used: string;
}

export interface CrawlerSettings {
  max_concurrent_jobs: number;
  request_delay_ms: number;
  retry_attempts: number;
  proxy_rotation_enabled: boolean;
  stealth_mode_enabled: boolean;
  user_agents: string[];
  blocked_domains: string[];
}

// Utility types
export type CreativeStatus = 'active' | 'inactive' | 'pending_review' | 'blocked';
export type NotificationType = 'new_creative' | 'monitor_alert' | 'system_update' | 'billing';
export type ExportFormat = 'csv' | 'excel' | 'json' | 'google_sheets';
export type SortDirection = 'asc' | 'desc';

// API Endpoints types
export interface CreateMonitorRequest {
  name: string;
  description?: string;
  query: string;
  filters: SearchFilters;
  webhook_url?: string;
  telegram_chat_id?: string;
  email_notifications: boolean;
  schedule: 'hourly' | 'daily' | 'weekly';
}

export interface UpdateUserPreferencesRequest {
  min_duplicates?: number;
  default_country?: string;
  theme?: 'light' | 'dark' | 'system';
  notifications?: Partial<UserPreferences['notifications']>;
  auto_crawl_enabled?: boolean;
}

export interface BulkDownloadRequest {
  creative_ids: string[];
  format: 'zip' | 'individual';
  include_metadata: boolean;
}

export interface ExportRequest {
  creative_ids?: string[];
  filters?: SearchFilters;
  format: ExportFormat;
  include_images: boolean;
  email_when_ready?: boolean;
}