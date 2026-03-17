'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/lib/auth/AuthContext';
import { useTranslation } from '@/lib/i18n/context';
import { LogIn, LogOut, User, Settings, Heart, Clock, AlertCircle } from 'lucide-react';
import { AuthModal } from '@/components/auth/AuthModal';

export function UserMenu() {
  const { user, profile, signOut, loading, isConfigured } = useAuth();
  const { language } = useTranslation();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  // 加载中
  if (loading) {
    return (
      <Button variant="ghost" size="sm" disabled className="text-slate-300">
        <User className="w-4 h-4 animate-pulse" />
      </Button>
    );
  }
  
  // Supabase 未配置 - 显示提示
  if (!isConfigured) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setAuthModalOpen(true)}
        className="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-800"
      >
        <AlertCircle className="w-4 h-4 text-yellow-500" />
        <span className="hidden sm:inline text-sm">
          {language === 'zh' ? '登录' : 'Login'}
        </span>
      </Button>
    );
  }
  
  // 未登录
  if (!user) {
    return (
      <>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setAuthModalOpen(true)}
          className="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-800"
        >
          <LogIn className="w-4 h-4" />
          <span className="hidden sm:inline">
            {language === 'zh' ? '登录' : 'Login'}
          </span>
        </Button>
        
        <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      </>
    );
  }
  
  // 已登录
  const initials = profile?.username 
    ? profile.username.substring(0, 2).toUpperCase() 
    : user.email?.substring(0, 2).toUpperCase() || 'U';
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9 border-2 border-slate-700">
              <AvatarImage src={profile?.avatar_url || user.user_metadata?.avatar_url} alt={profile?.username} />
              <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-500 text-white font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700" align="end">
          <DropdownMenuLabel className="text-white">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">{profile?.username || user.email?.split('@')[0]}</p>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator className="bg-slate-700" />
          
          <DropdownMenuItem className="text-slate-300 focus:text-white focus:bg-slate-700 cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>{language === 'zh' ? '个人中心' : 'Profile'}</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="text-slate-300 focus:text-white focus:bg-slate-700 cursor-pointer">
            <Heart className="mr-2 h-4 w-4" />
            <span>{language === 'zh' ? '我的收藏' : 'Favorites'}</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="text-slate-300 focus:text-white focus:bg-slate-700 cursor-pointer">
            <Clock className="mr-2 h-4 w-4" />
            <span>{language === 'zh' ? '浏览历史' : 'History'}</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="text-slate-300 focus:text-white focus:bg-slate-700 cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>{language === 'zh' ? '设置' : 'Settings'}</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-slate-700" />
          
          <DropdownMenuItem 
            className="text-red-400 focus:text-red-300 focus:bg-slate-700 cursor-pointer"
            onClick={signOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{language === 'zh' ? '退出登录' : 'Sign Out'}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
