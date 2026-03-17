'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { useAuth } from '@/lib/auth/AuthContext';
import { useTranslation } from '@/lib/i18n/context';
import { AlertCircle, Settings, ExternalLink } from 'lucide-react';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const { isConfigured } = useAuth();
  const { language } = useTranslation();
  
  // Supabase 未配置 - 显示配置提示
  if (!isConfigured) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              {language === 'zh' ? '功能暂未启用' : 'Feature Not Available'}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {language === 'zh' 
                ? '用户认证功能需要配置 Supabase' 
                : 'User authentication requires Supabase configuration'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Alert className="bg-slate-800 border-slate-700">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <AlertDescription className="text-slate-300">
                {language === 'zh' ? (
                  <>
                    <p className="font-medium mb-2">配置步骤：</p>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      <li>创建 Supabase 项目（免费）</li>
                      <li>获取 API 密钥</li>
                      <li>配置环境变量</li>
                    </ol>
                  </>
                ) : (
                  <>
                    <p className="font-medium mb-2">Setup Steps:</p>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      <li>Create Supabase project (free)</li>
                      <li>Get API keys</li>
                      <li>Configure environment variables</li>
                    </ol>
                  </>
                )}
              </AlertDescription>
            </Alert>
            
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                onClick={() => window.open('https://supabase.com', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {language === 'zh' ? '访问 Supabase' : 'Visit Supabase'}
              </Button>
              
              <Button
                variant="outline"
                className="w-full bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                onClick={() => {
                  // 在新标签页打开配置文档
                  const doc = language === 'zh' ? 'SUPABASE_SETUP.md' : 'SUPABASE_SETUP.md';
                  console.log(`请查看 ${doc} 文档进行配置`);
                }}
              >
                <Settings className="w-4 h-4 mr-2" />
                {language === 'zh' ? '查看配置文档' : 'View Setup Guide'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
  // 已配置 - 显示登录表单（这里简化为提示）
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-white">
            {language === 'zh' ? '用户认证' : 'User Authentication'}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {language === 'zh' 
              ? 'Supabase 已配置，登录功能即将上线' 
              : 'Supabase configured, login coming soon'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-center text-slate-400">
            {language === 'zh' 
              ? '完整登录功能正在开发中...' 
              : 'Full login feature is under development...'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
