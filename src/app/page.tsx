'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Car, Radio, Zap, Settings, Battery, Plug, Lightbulb, Circle,
  ExternalLink, Newspaper, Calendar, Eye, ArrowRight, Search,
  Youtube, Flame, RefreshCw, TrendingUp, MessageCircle
} from 'lucide-react';
import { categories, vloggers, getBrandsCount } from '@/data/rc-resources';
import { getLatestNews, formatDate, formatViews, getNewsCount } from '@/data/news';
import { getModelsCount, getManualsCount } from '@/data/models';
import { useTranslation } from '@/lib/i18n/context';
import { Header } from '@/components/Header';
import { SearchModal } from '@/components/SearchModal';
import { SeoKeywords } from '@/components/SeoKeywords';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { useAnalytics } from '@/lib/analytics';

// 图标映射
const iconMap: Record<string, React.ReactNode> = {
  'Car': <Car className="w-6 h-6" />,
  'Radio': <Radio className="w-6 h-6" />,
  'Zap': <Zap className="w-6 h-6" />,
  'Settings': <Settings className="w-6 h-6" />,
  'Circle': <Circle className="w-6 h-6" />,
  'Battery': <Battery className="w-6 h-6" />,
  'Plug': <Plug className="w-6 h-6" />,
  'Lightbulb': <Lightbulb className="w-6 h-6" />
};

// 分类颜色映射
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'vehicles': { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
  'remoteControllers': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  'motorsESCs': { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
  'servos': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  'tiresWheels': { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
  'batteries': { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  'chargers': { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  'electronics': { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/30' },
};

export default function Home() {
  const { t, language } = useTranslation();
  const { trackBrandClick } = useAnalytics();
  const [searchOpen, setSearchOpen] = useState(false);

  // 统计数据（从数据源获取真实数量）
  const stats = useMemo(() => {
    let totalBrands = getBrandsCount();
    let domesticBrands = 0;
    let overseasBrands = 0;
    
    categories.forEach(cat => {
      cat.brands.forEach(brand => {
        const isDomestic = brand.country === '中国' || brand.country === '中国台湾' || brand.country === '中国香港';
        if (isDomestic) domesticBrands++;
        else overseasBrands++;
      });
    });
    
    return { 
      totalBrands, 
      domesticBrands, 
      overseasBrands,
      vloggersCount: vloggers.length,
      modelsCount: getModelsCount(),
      manualsCount: getManualsCount(),
      newsCount: getNewsCount()
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* 英雄区域 */}
        <section className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {t('home.heroTitle')}
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto mb-6">
            {t('home.heroSubtitle')}
          </p>
          
          {/* 搜索框 */}
          <div className="max-w-lg mx-auto mb-6">
            <div 
              className="bg-slate-800 border border-slate-700 rounded-xl cursor-pointer hover:border-slate-600 transition-colors"
              onClick={() => setSearchOpen(true)}
            >
              <div className="flex items-center gap-3 px-4 py-3.5">
                <Search className="w-5 h-5 text-slate-500 shrink-0" />
                <div className="flex-1 text-left">
                  <span className="text-slate-400">
                    {language === 'zh' ? '搜索品牌、资讯...' : 'Search brands, news...'}
                  </span>
                </div>
                <kbd className="hidden md:block text-xs text-slate-500 px-2 py-1 bg-slate-700 rounded">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>
          
          {/* 统计数据 */}
          <div className="flex justify-center gap-6 md:gap-8 text-sm flex-wrap">
            <div className="group cursor-default">
              <span className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                <AnimatedCounter end={stats.totalBrands} suffix="+" duration={1500} />
              </span>
              <span className="text-slate-500 ml-1">{language === 'zh' ? '品牌' : 'Brands'}</span>
            </div>
            <div className="group cursor-default">
              <span className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                <AnimatedCounter end={stats.vloggersCount} suffix="+" duration={1500} />
              </span>
              <span className="text-slate-500 ml-1">{language === 'zh' ? '博主' : 'Vloggers'}</span>
            </div>
            <div className="group cursor-default">
              <span className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">
                <AnimatedCounter end={stats.manualsCount} suffix="+" duration={1500} />
              </span>
              <span className="text-slate-500 ml-1">{language === 'zh' ? '说明书' : 'Manuals'}</span>
            </div>
            <div className="group cursor-default">
              <span className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                <AnimatedCounter end={stats.newsCount} suffix="+" duration={1500} />
              </span>
              <span className="text-slate-500 ml-1">{language === 'zh' ? '资讯' : 'News'}</span>
            </div>
          </div>
        </section>
        
        <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />

        {/* 品牌分类入口 */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Car className="w-5 h-5 text-slate-400" />
              {language === 'zh' ? '品牌分类' : 'Brand Categories'}
            </h2>
            <Link 
              href="/brands" 
              className="text-sm text-orange-400 hover:text-orange-300 flex items-center gap-1"
            >
              {language === 'zh' ? '查看全部' : 'View All'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((category) => {
              const colors = categoryColors[category.id] || categoryColors['vehicles'];
              // 统计国内/海外品牌数量
              const domestic = category.brands.filter(b => 
                b.country === '中国' || b.country === '中国台湾' || b.country === '中国香港'
              ).length;
              const overseas = category.brands.length - domestic;
              
              return (
                <Link 
                  key={category.id} 
                  href={`/brands?category=${category.id}`}
                  onClick={() => trackBrandClick(language === 'zh' ? category.title : category.titleEn, category.id)}
                >
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors h-full">
                    <CardContent className="p-4">
                      <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center mb-3`}>
                        <span className={colors.text}>{iconMap[category.icon]}</span>
                      </div>
                      <h3 className="text-white font-medium mb-1">
                        {language === 'zh' ? category.title : category.titleEn}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="text-orange-400">{domestic}</span>
                        <span>/</span>
                        <span className="text-blue-400">{overseas}</span>
                        <span>{language === 'zh' ? '个品牌' : 'brands'}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 博主推荐 */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Youtube className="w-5 h-5 text-slate-400" />
              {language === 'zh' ? '博主推荐' : 'RC Vloggers'}
            </h2>
            <Link href="/vloggers">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-orange-400">
                {language === 'zh' ? '查看全部' : 'View All'}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          {/* 国内博主 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-orange-400">🇨🇳</span>
                <span className="text-slate-400">{language === 'zh' ? '国内博主' : 'Domestic'}</span>
                <Badge variant="outline" className="text-xs bg-orange-500/10 text-orange-400 border-orange-500/30">
                  {vloggers.filter(v => v.country === '中国').length}
                </Badge>
              </div>
              <Link href="/vloggers">
                <Button variant="link" size="sm" className="text-orange-400 hover:text-orange-300 p-0 h-auto">
                  {language === 'zh' ? '更多' : 'More'}
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {vloggers.filter(v => v.country === '中国').slice(0, 4).map((vlogger) => (
                <a 
                  key={vlogger.name}
                  href={vlogger.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors group">
                    <CardContent className="p-4 flex items-start gap-3">
                      {vlogger.logo ? (
                        <img 
                          src={vlogger.logo}
                          alt={vlogger.name}
                          className="w-12 h-12 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                          <span className="text-slate-300 font-medium">{vlogger.name.charAt(0)}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium truncate">
                            {language === 'zh' ? vlogger.name : vlogger.nameEn || vlogger.name}
                          </span>
                          {vlogger.subscribers && (
                            <Badge variant="outline" className="text-xs bg-pink-500/10 text-pink-400 border-pink-500/30 shrink-0">
                              {vlogger.subscribers}
                            </Badge>
                          )}
                        </div>
                        {vlogger.description && (
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {language === 'zh' ? vlogger.description : vlogger.descriptionEn || vlogger.description}
                          </p>
                        )}
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition-colors shrink-0 mt-1" />
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>

          {/* 海外博主 */}
          <div>
            <div className="flex items-center justify-between mb-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-blue-400">🌍</span>
                <span className="text-slate-400">{language === 'zh' ? '海外博主' : 'Overseas'}</span>
                <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30">
                  {vloggers.filter(v => v.country !== '中国').length}
                </Badge>
              </div>
              <Link href="/vloggers">
                <Button variant="link" size="sm" className="text-blue-400 hover:text-blue-300 p-0 h-auto">
                  {language === 'zh' ? '更多' : 'More'}
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {vloggers.filter(v => v.country !== '中国').slice(0, 4).map((vlogger) => (
                <a 
                  key={vlogger.name}
                  href={vlogger.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors group">
                    <CardContent className="p-4 flex items-start gap-3">
                      {vlogger.logo ? (
                        <img 
                          src={vlogger.logo}
                          alt={vlogger.name}
                          className="w-12 h-12 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                          <span className="text-slate-300 font-medium">{vlogger.name.charAt(0)}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium truncate">{vlogger.name}</span>
                          <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30 shrink-0">
                            {vlogger.country}
                          </Badge>
                          {vlogger.subscribers && (
                            <Badge variant="outline" className="text-xs bg-pink-500/10 text-pink-400 border-pink-500/30 shrink-0">
                              {vlogger.subscribers}
                            </Badge>
                          )}
                        </div>
                        {vlogger.description && (
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {language === 'zh' ? vlogger.description : vlogger.descriptionEn || vlogger.description}
                          </p>
                        )}
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition-colors shrink-0 mt-1" />
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 热度排行榜 */}
        <section className="mb-12">
          <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
            <CardContent className="p-0">
              {/* 标题栏 */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="text-white font-semibold">
                    {language === 'zh' ? '热度排行榜' : 'Trending'}
                  </span>
                </div>
                <Link 
                  href="/news" 
                  className="text-xs text-slate-400 hover:text-orange-400 flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{language === 'zh' ? '换一换' : 'Refresh'}</span>
                </Link>
              </div>
              
              {/* 热榜列表 */}
              <div className="divide-y divide-slate-700/50">
                {getLatestNews().slice(0, 5).map((article, index) => {
                  // 排名样式
                  const getRankStyle = (rank: number) => {
                    if (rank === 1) return 'bg-red-500 text-white';
                    if (rank === 2) return 'bg-orange-500 text-white';
                    if (rank === 3) return 'bg-amber-500 text-white';
                    return 'bg-slate-700 text-slate-400';
                  };
                  
                  return (
                    <Link 
                      key={article.id} 
                      href={`/news/${article.id}`}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-slate-700/30 transition-colors group"
                    >
                      {/* 排名数字 */}
                      <div className={`w-5 h-5 rounded text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${getRankStyle(index + 1)}`}>
                        {index + 1}
                      </div>
                      
                      {/* 标题和标签 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-white text-sm group-hover:text-orange-400 transition-colors line-clamp-1">
                            {language === 'zh' ? article.title : article.titleEn}
                          </span>
                          {/* 热门/最新标签 */}
                          {article.views > 15000 && (
                            <Badge className="bg-red-500/20 text-red-400 text-[10px] px-1.5 py-0 shrink-0">
                              {language === 'zh' ? '热' : 'Hot'}
                            </Badge>
                          )}
                          {article.isNew && (
                            <Badge className="bg-orange-500/20 text-orange-400 text-[10px] px-1.5 py-0 shrink-0">
                              {language === 'zh' ? '新' : 'New'}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {/* 阅读量 */}
                      <div className="flex items-center gap-1 text-xs text-slate-500 shrink-0">
                        <TrendingUp className="w-3 h-3" />
                        <span>{formatViews(article.views)}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
              
              {/* 查看更多 */}
              <Link 
                href="/news" 
                className="flex items-center justify-center gap-1 px-4 py-3 text-sm text-slate-400 hover:text-orange-400 border-t border-slate-700/50 transition-colors"
              >
                <span>{language === 'zh' ? '查看完整榜单' : 'View Full List'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* SEO关键词 */}
        <SeoKeywords type="home" className="mt-8" />

        {/* 底部 */}
        <footer className="border-t border-slate-800 pt-6 text-center">
          <p className="text-slate-500 text-sm mb-1">{t('home.footerDesc')}</p>
          <p className="text-xs text-slate-600 mb-4">{t('home.footerNote')}</p>
          
          {/* 联系方式 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full mb-4">
            <MessageCircle className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">
              {language === 'zh' ? '联系我们' : 'Contact'}：
            </span>
            <span className="text-green-400 font-medium text-sm">WeChat: vvbobobo</span>
          </div>
          
          <p className="text-xs text-slate-700">© {new Date().getFullYear()} Rcstyle.club</p>
        </footer>
      </main>
      
      {/* 右下角固定联系按钮 */}
      <a
        href="weixin://"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg shadow-green-500/30 transition-all hover:scale-105"
        title="微信联系"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">vvbobobo</span>
      </a>
    </div>
  );
}
