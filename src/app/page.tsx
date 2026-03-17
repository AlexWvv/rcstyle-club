'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Car, Radio, Zap, Settings, Circle, Battery, Plug, Lightbulb, 
  Youtube, Play, ExternalLink, Globe, Star, DollarSign, ShoppingCart, Users, 
  Newspaper, Calendar, Eye, ArrowRight
} from 'lucide-react';
import { categories, vloggers } from '@/data/rc-resources';
import type { Brand } from '@/data/rc-resources';
import { AdBanner, AdCard, AdInline } from '@/components/ads/AdSlot';
import { EventCarousel } from '@/components/carousel/EventCarousel';
import { getLatestNews, formatDate, formatViews } from '@/data/news';
import { useTranslation } from '@/lib/i18n/context';
import { Header } from '@/components/Header';

// 图标映射
const iconMap: Record<string, React.ReactNode> = {
  'Car': <Car className="w-5 h-5" />,
  'Radio': <Radio className="w-5 h-5" />,
  'Zap': <Zap className="w-5 h-5" />,
  'Settings': <Settings className="w-5 h-5" />,
  'Circle': <Circle className="w-5 h-5" />,
  'Battery': <Battery className="w-5 h-5" />,
  'Plug': <Plug className="w-5 h-5" />,
  'Lightbulb': <Lightbulb className="w-5 h-5" />
};

export default function Home() {
  const { t, language } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 顶部导航栏 */}
      <Header />

      <main className="container mx-auto px-4 py-8" role="main">
        {/* 英雄区域 */}
        <section className="text-center mb-8" aria-labelledby="hero-heading">
          <h2 id="hero-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('home.heroTitle')}
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-8">
            {t('home.heroSubtitle')}<br/>
            {t('home.heroDescription')}
          </p>
          <div className="flex flex-wrap justify-center gap-6" role="region" aria-label="网站统计数据">
            <article className="text-center px-6 py-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-orange-400" aria-label="品牌厂商数量">
                {categories.reduce((sum, cat) => sum + cat.brands.length, 0)}
              </div>
              <div className="text-sm text-slate-400">{t('home.brandCount')}</div>
            </article>
            <article className="text-center px-6 py-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-blue-400" aria-label="产品分类数量">{categories.length}</div>
              <div className="text-sm text-slate-400">{t('home.categoryCount')}</div>
            </article>
            <article className="text-center px-6 py-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-pink-400" aria-label="视频博主数量">{vloggers.length}</div>
              <div className="text-sm text-slate-400">{t('home.vloggerCount')}</div>
            </article>
          </div>
        </section>

        {/* 战略合作方 */}
        <section className="mb-12" aria-labelledby="partners-section">
          <div className="bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 border border-red-500/30 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-2xl font-bold text-white">{language === 'zh' ? '战略' : 'Partner'}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{t('home.strategicPartner')}</h3>
                  <p className="text-slate-400 text-sm">{t('home.partnerDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <a 
                  href="https://mall.jd.com/index-1000003939.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-white hover:bg-gray-50 rounded-xl transition-all hover:shadow-lg group"
                  aria-label="访问京东模型官方旗舰店"
                >
                  <img 
                    src="https://www.google.com/s2/favicons?domain=jd.com&sz=128" 
                    alt="JD Model"
                    className="w-12 h-12 rounded-lg"
                  />
                  <div className="text-left">
                    <div className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                      {language === 'zh' ? '京东模型' : 'JD Model'}
                    </div>
                    <div className="text-xs text-gray-500">JD Model</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 资讯中心入口 */}
        <section className="mb-12" aria-labelledby="news-section">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  {t('home.newsCenter')}
                  <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold animate-pulse">
                    NEW
                  </Badge>
                </h3>
                <p className="text-slate-400 text-sm">{t('home.newsDesc')}</p>
              </div>
            </div>
            <a href="/news">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 gap-2">
                {t('home.viewMore')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getLatestNews().slice(0, 3).map((article) => (
              <a 
                key={article.id}
                href={`/news/${article.id}`}
                className="group"
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 overflow-hidden h-full">
                  {/* 封面图 */}
                  <div className="h-40 relative overflow-hidden">
                    <img 
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* NEW角标 */}
                    {article.isNew && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold animate-pulse">
                          NEW
                        </Badge>
                      </div>
                    )}
                    {/* 分类 */}
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-black/60 backdrop-blur-sm text-white text-xs">
                        {language === 'zh' ? article.category : article.categoryEn}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                      {language === 'zh' ? article.title : article.titleEn}
                    </h4>
                    <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                      {language === 'zh' ? article.summary : article.summaryEn}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(article.publishDate, language)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{formatViews(article.views)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </section>

        {/* 大尺寸赛事轮播图 - 英雄区域下方 */}
        <section className="mb-12">
          <EventCarousel />
        </section>

        {/* 分类标签页 */}
        <section className="mb-12" aria-labelledby="category-section">
          <h3 id="category-section" className="sr-only">RC模型品牌分类</h3>
          <Tabs defaultValue="vehicles" className="w-full">
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 gap-2 h-auto bg-slate-800/50 p-2 mb-8" role="tablist" aria-label="产品分类">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex flex-col items-center gap-1 py-3 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
                  role="tab"
                  aria-selected={category.id === 'vehicles'}
                >
                  {iconMap[category.icon]}
                  <span className="text-xs">{language === 'zh' ? category.title : category.titleEn}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category, index) => (
              <TabsContent key={category.id} value={category.id} role="tabpanel">
                <CategorySection category={category} categoryIndex={index} language={language} t={t} />
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* 中间横幅广告 */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AdCard 
              title={language === 'zh' ? 'Hobbywing 电调' : 'Hobbywing ESC'}
              description={language === 'zh' ? 'EZRUN XERUN系列限时特价' : 'EZRUN XERUN Series Limited Sale'}
              ctaText={language === 'zh' ? '查看优惠' : 'View Deals'}
              badge={language === 'zh' ? '热卖' : 'Hot'}
              variant="highlight"
            />
            <AdCard 
              title={language === 'zh' ? '进口整车专区' : 'Imported Vehicles'}
              description={language === 'zh' ? 'Traxxas官方授权正品' : 'Traxxas Official Authorized'}
              ctaText={language === 'zh' ? '进入专区' : 'Enter'}
              badge={language === 'zh' ? '正品' : 'Auth'}
              variant="gradient"
            />
            <AdCard 
              title={language === 'zh' ? '新手入门套装' : 'Beginner Kit'}
              description={language === 'zh' ? 'RTR开箱即玩，一键启动' : 'RTR Ready to Run, One-key Start'}
              ctaText={language === 'zh' ? '查看推荐' : 'View'}
              badge={language === 'zh' ? '推荐' : 'Rec'}
            />
          </div>
        </section>

        {/* 视频博主区域 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Youtube className="w-8 h-8 text-red-500" />
            <h3 className="text-2xl font-bold text-white">{language === 'zh' ? '国内外视频博主' : 'RC Video Bloggers'}</h3>
          </div>
          
          {/* 国内博主 */}
          <div className="mb-8" role="region" aria-labelledby="domestic-vloggers">
            <h4 id="domestic-vloggers" className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full" aria-hidden="true"></span>
              {t('home.domesticVloggers')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list" aria-label="国内RC视频博主列表">
              {vloggers.filter(v => v.country === '中国').map((vlogger) => (
                <article key={vlogger.name} role="listitem">
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all hover:shadow-lg hover:shadow-pink-500/10 h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-3">
                      {/* 头像 */}
                      {vlogger.logo ? (
                        <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-700 shrink-0">
                          <img 
                            src={vlogger.logo} 
                            alt={vlogger.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(vlogger.name) + '&background=f472b6&color=fff&size=128';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shrink-0">
                          <span className="text-white text-xl font-bold">{vlogger.name.charAt(0)}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-white text-lg truncate">{language === 'zh' ? vlogger.name : vlogger.nameEn || vlogger.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          {vlogger.douyinId && (
                            <span className="text-xs text-slate-400">@{vlogger.douyinId}</span>
                          )}
                          {vlogger.subscribers && (
                            <Badge variant="outline" className="border-pink-500/30 text-pink-400 text-xs">
                              {vlogger.subscribers}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-400 mb-4 line-clamp-3 text-sm">
                      {language === 'zh' ? vlogger.description : vlogger.descriptionEn || vlogger.description}
                    </CardDescription>
                    <a href={vlogger.website} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                        <Play className="w-4 h-4 mr-2" fill="white" />
                        {t('home.followDouyin')}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
                </article>
              ))}
            </div>
          </div>

          {/* 国外博主 */}
          <div role="region" aria-labelledby="overseas-vloggers">
            <h4 id="overseas-vloggers" className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full" aria-hidden="true"></span>
              {t('home.overseasVloggers')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list" aria-label="国外RC视频博主列表">
              {vloggers.filter(v => v.country !== '中国').map((vlogger) => (
                <article key={vlogger.name} role="listitem">
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10 h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-3">
                      {/* 头像 */}
                      {vlogger.logo ? (
                        <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-700 shrink-0">
                          <img 
                            src={vlogger.logo} 
                            alt={vlogger.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(vlogger.name) + '&background=a855f7&color=fff&size=128';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shrink-0">
                          <span className="text-white text-xl font-bold">{vlogger.name.charAt(0)}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-white text-lg truncate">{vlogger.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-xs">
                            {vlogger.country}
                          </Badge>
                          {vlogger.subscribers && (
                            <span className="text-xs text-slate-400">{vlogger.subscribers}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-400 mb-4 line-clamp-3 text-sm">
                      {language === 'zh' ? vlogger.description : vlogger.descriptionEn || vlogger.description}
                    </CardDescription>
                    <a href={vlogger.website} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600">
                        <Play className="w-4 h-4 mr-2" fill="white" />
                        {t('home.visitChannel')}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 底部广告横幅 */}
        <section className="mb-8">
          <AdBanner 
            title={`📢 ${t('home.adSlot')}`}
            description={t('home.adDesc')}
            ctaText={t('home.contactUs')}
            ctaLink="#contact"
            variant="default"
          />
        </section>

        {/* 底部信息 */}
        <footer className="border-t border-slate-700 pt-8" role="contentinfo">
          <div className="text-center text-slate-400">
            <p className="mb-2">{t('home.footerDesc')}</p>
            <p className="text-sm">
              {t('home.footerNote')}
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

// 分类组件
function CategorySection({ 
  category, 
  categoryIndex, 
  language,
  t 
}: { 
  category: typeof categories[0]; 
  categoryIndex: number;
  language: 'zh' | 'en';
  t: (key: string) => string;
}) {
  // 按国内和海外分类
  const domesticBrands = category.brands.filter(b => b.country === '中国' || b.country === '中国台湾' || b.country === '中国香港');
  const overseasBrands = category.brands.filter(b => b.country !== '中国' && b.country !== '中国台湾' && b.country !== '中国香港');

  return (
    <div className="space-y-8">
      {/* 国内品牌 */}
      {domesticBrands.length > 0 && (
        <BrandSection 
          title={t('home.domesticBrands')}
          subtitle={t('home.domesticSubtitle')}
          brands={domesticBrands}
          color="orange"
          showAd={categoryIndex === 0}
          language={language}
          t={t}
        />
      )}
      
      {/* 海外品牌 */}
      {overseasBrands.length > 0 && (
        <BrandSection 
          title={t('home.overseasBrands')}
          subtitle={t('home.overseasSubtitle')}
          brands={overseasBrands}
          color="blue"
          language={language}
          t={t}
        />
      )}
    </div>
  );
}

// 品牌区域组件
function BrandSection({ 
  title, 
  subtitle, 
  brands, 
  color,
  showAd = false,
  language,
  t
}: { 
  title: string; 
  subtitle: string; 
  brands: Brand[];
  color: 'orange' | 'blue';
  showAd?: boolean;
  language: 'zh' | 'en';
  t: (key: string) => string;
}) {
  const colorClasses = {
    orange: {
      badge: 'border-orange-500/30 text-orange-400',
      button: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600',
      dot: 'bg-orange-500',
      hover: 'hover:border-orange-500/50 hover:shadow-orange-500/10'
    },
    blue: {
      badge: 'border-blue-500/30 text-blue-400',
      button: 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600',
      dot: 'bg-blue-500',
      hover: 'hover:border-blue-500/50 hover:shadow-blue-500/10'
    }
  };

  const classes = colorClasses[color];

  return (
    <div>
      <h4 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
        <span className={`w-2 h-2 ${classes.dot} rounded-full`}></span>
        {title}
        {subtitle && <span className="text-sm font-normal text-slate-400 ml-2">{subtitle}</span>}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {brands.map((brand, index) => (
          <React.Fragment key={brand.name}>
            {/* 在第3个品牌后插入广告 */}
            {showAd && index === 2 && (
              <AdInline 
                title={language === 'zh' ? '🎯 精选配件推荐' : '🎯 Recommended Accessories'}
                description={language === 'zh' ? '搭配整车更优惠 | 电机电调套装限时折扣' : 'Bundle deals | Motor & ESC kit discounts'}
                ctaText={language === 'zh' ? '查看搭配' : 'View'}
                ctaLink="#accessories"
              />
            )}
            <Card 
              className={`bg-slate-800/50 border-slate-700 transition-all hover:shadow-lg ${classes.hover}`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {/* 品牌Logo */}
                    {brand.logo && (
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                        <img 
                          src={brand.logo} 
                          alt={brand.name}
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-white text-lg">{language === 'zh' ? brand.name : brand.nameEn || brand.name}</CardTitle>
                      {brand.nameEn && language === 'zh' && (
                        <div className="text-sm text-slate-500">{brand.nameEn}</div>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline" className={classes.badge}>
                    {brand.country}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400 mb-3 line-clamp-2">
                  {language === 'zh' ? brand.description : brand.descriptionEn || brand.description}
                </CardDescription>
                
                {/* 代表型号 */}
                {brand.models && brand.models.length > 0 && (
                  <div className="mb-3">
                    <div className="text-xs text-slate-500 mb-1">{t('home.hotSeries')}</div>
                    <div className="flex flex-wrap gap-1">
                      {brand.models.map((model) => (
                        <Badge key={model} variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                          {model}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* 详细信息 */}
                <div className="space-y-2 mb-3">
                  {brand.priceRange && (
                    <div className="flex items-start gap-2 text-xs">
                      <DollarSign className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300">{brand.priceRange}</span>
                    </div>
                  )}
                  {brand.purchaseChannels && (
                    <div className="flex items-start gap-2 text-xs">
                      <ShoppingCart className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300">{brand.purchaseChannels}</span>
                    </div>
                  )}
                  {brand.suitableFor && (
                    <div className="flex items-start gap-2 text-xs">
                      <Users className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300">{t('home.suitableFor')}：{brand.suitableFor}</span>
                    </div>
                  )}
                </div>
                
                {/* 亮点 */}
                {brand.highlight && (
                  <div className="mb-3 p-2 bg-slate-700/50 rounded text-xs text-slate-300">
                    💡 {language === 'zh' ? brand.highlight : brand.highlightEn || brand.highlight}
                  </div>
                )}
                
                <a href={brand.website} target="_blank" rel="noopener noreferrer">
                  <Button className={`w-full ${classes.button}`}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('home.visitOfficial')}
                  </Button>
                </a>
              </CardContent>
            </Card>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
