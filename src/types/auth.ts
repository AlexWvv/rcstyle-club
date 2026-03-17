// 用户相关类型定义
import type { User } from '@supabase/supabase-js';

// 用户资料类型
export interface Profile {
  id: string;
  user_id: string;
  username: string;
  avatar_url?: string;
  language: 'zh' | 'en';
  created_at: string;
  updated_at: string;
}

// 收藏类型
export interface Favorite {
  id: string;
  user_id: string;
  item_type: 'brand' | 'news' | 'vlogger';
  item_id: string;
  created_at: string;
}

// 浏览历史类型
export interface ViewHistory {
  id: string;
  user_id: string;
  item_type: 'brand' | 'news' | 'vlogger';
  item_id: string;
  viewed_at: string;
}

// 认证状态
export interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

// 登录/注册表单
export interface AuthFormData {
  email: string;
  password: string;
  username?: string;
}
