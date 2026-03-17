'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';
import type { Profile, AuthState, AuthFormData } from '@/types/auth';

interface AuthContextType extends AuthState {
  signUp: (data: AuthFormData) => Promise<{ error: string | null }>;
  signIn: (data: AuthFormData) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signInWithGithub: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: string | null }>;
  refreshProfile: () => Promise<void>;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null
  });
  
  const isConfigured = isSupabaseConfigured();
  const supabase = getSupabaseBrowserClient();
  
  // 获取用户资料
  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    if (!supabase) return null;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      return data as Profile;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };
  
  // 初始化：检查登录状态
  useEffect(() => {
    const initAuth = async () => {
      // 如果 Supabase 未配置，直接设置加载完成
      if (!supabase) {
        setState({ user: null, profile: null, loading: false, error: null });
        return;
      }
      
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          setState({ user: null, profile: null, loading: false, error: error.message });
          return;
        }
        
        if (session?.user) {
          const profile = await fetchProfile(session.user.id);
          setState({
            user: session.user,
            profile,
            loading: false,
            error: null
          });
        } else {
          setState({ user: null, profile: null, loading: false, error: null });
        }
      } catch (error) {
        setState({ user: null, profile: null, loading: false, error: 'Failed to initialize auth' });
      }
    };
    
    initAuth();
    
    // 监听认证状态变化
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event: AuthChangeEvent, session: Session | null) => {
          if (session?.user) {
            const profile = await fetchProfile(session.user.id);
            setState({
              user: session.user,
              profile,
              loading: false,
              error: null
            });
          } else {
            setState({ user: null, profile: null, loading: false, error: null });
          }
        }
      );
      
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [supabase]);
  
  // 注册
  const signUp = async (data: AuthFormData) => {
    if (!supabase) {
      return { error: '用户认证系统未配置。请参考 SUPABASE_SETUP.md 进行配置。' };
    }
    
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            username: data.username
          }
        }
      });
      
      if (error) {
        return { error: error.message };
      }
      
      return { error: null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  };
  
  // 登录
  const signIn = async (data: AuthFormData) => {
    if (!supabase) {
      return { error: '用户认证系统未配置。请参考 SUPABASE_SETUP.md 进行配置。' };
    }
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });
      
      if (error) {
        return { error: error.message };
      }
      
      return { error: null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  };
  
  // Google 登录
  const signInWithGoogle = async () => {
    if (!supabase) {
      return { error: '用户认证系统未配置。请参考 SUPABASE_SETUP.md 进行配置。' };
    }
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        return { error: error.message };
      }
      
      return { error: null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  };
  
  // GitHub 登录
  const signInWithGithub = async () => {
    if (!supabase) {
      return { error: '用户认证系统未配置。请参考 SUPABASE_SETUP.md 进行配置。' };
    }
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        return { error: error.message };
      }
      
      return { error: null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  };
  
  // 登出
  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setState({ user: null, profile: null, loading: false, error: null });
  };
  
  // 更新资料
  const updateProfile = async (updates: Partial<Profile>) => {
    if (!supabase) {
      return { error: '用户认证系统未配置' };
    }
    
    if (!state.user) {
      return { error: 'Not authenticated' };
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', state.user.id);
      
      if (error) {
        return { error: error.message };
      }
      
      // 刷新本地状态
      await refreshProfile();
      
      return { error: null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  };
  
  // 刷新资料
  const refreshProfile = async () => {
    if (!supabase || !state.user) return;
    
    const profile = await fetchProfile(state.user.id);
    if (profile) {
      setState(prev => ({ ...prev, profile }));
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        signInWithGoogle,
        signInWithGithub,
        signOut,
        updateProfile,
        refreshProfile,
        isConfigured
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
