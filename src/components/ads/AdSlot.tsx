'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Megaphone, Sparkles, Zap, Gift, Star, Mail, MessageCircle } from 'lucide-react';

// 广告位类型
type AdType = 'banner' | 'card' | 'sidebar' | 'inline';

interface AdSlotProps {
  type?: AdType;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  badge?: string;
  variant?: 'default' | 'highlight' | 'gradient';
  className?: string;
}

// 大Banner广告位
export function AdBanner({ 
  title = "广告位招租", 
  description = "您的品牌展示位，触达RC爱好者",
  ctaText = "了解详情",
  ctaLink = "#",
  badge,
  variant = 'default',
  className = ''
}: AdSlotProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const variants = {
    default: 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600',
    highlight: 'bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30',
    gradient: 'bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-orange-500/20 border-purple-500/30'
  };

  return (
    <>
      <div className={`relative overflow-hidden rounded-xl ${variants[variant]} border ${className}`}>
        {/* 装饰元素 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shrink-0">
              <Megaphone className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                {badge && (
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                    {badge}
                  </Badge>
                )}
              </div>
              <p className="text-slate-400 text-sm">{description}</p>
            </div>
          </div>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button 
                className="shrink-0 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-orange-500/25"
              >
                {ctaText}
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-white text-xl">联系方式</DialogTitle>
                <DialogDescription className="text-slate-400">
                  欢迎通过以下方式联系我们
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {/* 邮箱 */}
                <div className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-slate-400 mb-1">邮箱</div>
                    <div className="text-white font-medium">hopevve@163.com</div>
                  </div>
                </div>
                
                {/* 微信 */}
                <div className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-slate-400 mb-1">微信</div>
                    <div className="text-white font-medium">vvbobobo</div>
                  </div>
                </div>
                
                <p className="text-xs text-slate-500 text-center pt-2">
                  期待与您的合作！
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}

// 卡片式广告位
export function AdCard({ 
  title = "推广", 
  description = "广告位",
  ctaText = "点击了解",
  ctaLink = "#",
  badge,
  variant = 'default',
  className = ''
}: AdSlotProps) {
  const variants = {
    default: 'bg-slate-800/60 border-slate-700 hover:border-slate-600',
    highlight: 'bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30 hover:border-orange-500/50',
    gradient: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30 hover:border-blue-500/50'
  };

  return (
    <Card className={`${variants[variant]} transition-all rounded-xl ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-white text-sm">{title}</h4>
              {badge && (
                <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-400">
                  {badge}
                </Badge>
              )}
            </div>
            <p className="text-sm text-slate-400 mt-1">{description}</p>
          </div>
        </div>
        <a 
          href={ctaLink}
          className="block w-full text-center py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors"
        >
          {ctaText}
        </a>
      </CardContent>
    </Card>
  );
}

// 侧边栏广告位
export function AdSidebar({ 
  title = "热门推荐", 
  description = "限时优惠",
  ctaText = "立即查看",
  ctaLink = "#",
  variant = 'default',
  className = ''
}: AdSlotProps) {
  const variants = {
    default: 'bg-slate-800/50 border-slate-700',
    highlight: 'bg-gradient-to-b from-orange-500/10 to-red-500/10 border-orange-500/30',
    gradient: 'bg-gradient-to-b from-purple-500/10 to-blue-500/10 border-purple-500/30'
  };

  return (
    <div className={`rounded-xl border p-4 ${variants[variant]} ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-5 h-5 text-yellow-400" />
        <span className="font-semibold text-white">{title}</span>
      </div>
      <p className="text-sm text-slate-400 mb-3">{description}</p>
      <a 
        href={ctaLink}
        className="block w-full text-center py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-yellow-600 hover:to-orange-600 transition-all"
      >
        {ctaText}
      </a>
    </div>
  );
}

// 内联广告位（融入列表）
export function AdInline({ 
  title = "特别推荐", 
  description = "限时特惠活动",
  ctaText = "查看详情",
  ctaLink = "#",
  className = ''
}: AdSlotProps) {
  return (
    <div className={`col-span-1 md:col-span-2 lg:col-span-3 ${className}`}>
      <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-500/30 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Gift className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-white flex items-center gap-2">
              {title}
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                HOT
              </Badge>
            </h4>
            <p className="text-sm text-slate-400">{description}</p>
          </div>
        </div>
        <a 
          href={ctaLink}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
}

// 赞助商标识
export function AdSponsor({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 text-xs text-slate-500 ${className}`}>
      <Star className="w-3 h-3" />
      <span>广告</span>
    </div>
  );
}
