'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Car, Radio, Zap, Settings, Battery, Plug, Lightbulb, Circle,
  Play, ExternalLink, Newspaper, Calendar, Eye, ArrowRight, Search,
  Users, MapPin, Youtube
} from 'lucide-react';
import { categories, vloggers } from '@/data/rc-resources';
import { EventCarousel } from '@/components/carousel/EventCarousel';
import { getLatestNews, formatDate, formatViews } from '@/data/news';
import { useTranslation } from '@/lib/i18n/context';
import { Header } from '@/components/Header';
import { SearchModal } from '@/components/SearchModal';
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

// 搜索引导词
const searchSuggestions = [
  { zh: '攀爬车推荐', en: 'RC Crawler Recommend' },
  { zh: 'Traxxas 新品', en: 'Traxxas New Release' },
  { zh: '漂移车入门', en: 'RC Drift Beginner' },
  { zh: '电池保养', en: 'Battery Maintenance' },
];

export default function Home() {
  const { t, language } = useTranslation();
  const { trackBrandClick, trackNewsView, trackExternalLink } = useAnalytics();
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState(0);

  // 轮播引导词
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSuggestion((prev) => (prev + 1) % searchSuggestions.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // 统计数据
  const stats = useMemo(() => {
    let totalBrands = 0;
    let domesticBrands = 0;
    let overseasBrands = 0;
    
    categories.forEach(cat => {
      cat.brands.forEach(brand => {
        totalBrands++;
        const isDomestic = brand.country === '中国' || brand.country === '中国台湾' || brand.country === '中国香港';
        if (isDomestic) domesticBrands++;
        else overseasBrands++;
      });
    });
    
    return { totalBrands, domesticBrands, overseasBrands };
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
          <div className="flex justify-center gap-8 text-sm">
            <div>
              <span className="text-2xl font-bold text-white">{stats.totalBrands}+</span>
              <span className="text-slate-500 ml-1">{language === 'zh' ? '品牌' : 'Brands'}</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-white">{vloggers.length}+</span>
              <span className="text-slate-500 ml-1">{language === 'zh' ? '博主' : 'Vloggers'}</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-white">50+</span>
              <span className="text-slate-500 ml-1">{language === 'zh' ? '说明书' : 'Manuals'}</span>
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

        {/* 资讯中心 */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-slate-400" />
              {language === 'zh' ? '最新资讯' : 'Latest News'}
            </h2>
            <Link 
              href="/news" 
              className="text-sm text-orange-400 hover:text-orange-300 flex items-center gap-1"
            >
              {language === 'zh' ? '查看全部' : 'View All'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getLatestNews().slice(0, 3).map((article) => (
              <Link key={article.id} href={`/news/${article.id}`}>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors overflow-hidden h-full">
                  <div className="h-36 relative">
                    <img 
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    {article.isNew && (
                      <Badge className="absolute top-2 right-2 bg-orange-500 text-white text-xs">
                        NEW
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-white mb-2 line-clamp-2 text-sm">
                      {language === 'zh' ? article.title : article.titleEn}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(article.publishDate, language)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {formatViews(article.views)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* 赛事轮播 */}
        <section className="mb-12">
          <EventCarousel />
        </section>

        {/* 博主推荐 */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Youtube className="w-5 h-5 text-slate-400" />
              {language === 'zh' ? '博主推荐' : 'RC Vloggers'}
            </h2>
          </div>

          {/* 国内博主 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3 text-sm">
              <span className="text-orange-400">🇨🇳</span>
              <span className="text-slate-400">{language === 'zh' ? '国内博主' : 'Domestic'}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {vloggers.filter(v => v.country === '中国').slice(0, 4).map((vlogger) => (
                <a 
                  key={vlogger.name}
                  href={vlogger.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors">
                    <CardContent className="p-3 flex items-center gap-3">
                      {vlogger.logo ? (
                        <img 
                          src={vlogger.logo}
                          alt={vlogger.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                          <span className="text-slate-300 text-sm">{vlogger.name.charAt(0)}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-medium truncate">
                          {language === 'zh' ? vlogger.name : vlogger.nameEn || vlogger.name}
                        </div>
                        {vlogger.subscribers && (
                          <div className="text-xs text-slate-500">{vlogger.subscribers}</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>

          {/* 海外博主 */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-sm">
              <span className="text-blue-400">🌍</span>
              <span className="text-slate-400">{language === 'zh' ? '海外博主' : 'Overseas'}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {vloggers.filter(v => v.country !== '中国').slice(0, 4).map((vlogger) => (
                <a 
                  key={vlogger.name}
                  href={vlogger.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors">
                    <CardContent className="p-3 flex items-center gap-3">
                      {vlogger.logo ? (
                        <img 
                          src={vlogger.logo}
                          alt={vlogger.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                          <span className="text-slate-300 text-sm">{vlogger.name.charAt(0)}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-medium truncate">{vlogger.name}</div>
                        <div className="text-xs text-slate-500">{vlogger.country}</div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 底部 */}
        <footer className="border-t border-slate-800 pt-6 text-center">
          <p className="text-slate-500 text-sm mb-1">{t('home.footerDesc')}</p>
          <p className="text-xs text-slate-600">{t('home.footerNote')}</p>
        </footer>
      </main>
    </div>
  );
}
