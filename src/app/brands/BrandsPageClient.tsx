'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Car, Radio, Zap, Settings, Circle, Battery, Plug, Lightbulb, 
  ExternalLink, MapPin, DollarSign, Users, ShoppingCart, 
  Search, Filter, ChevronDown, X
} from 'lucide-react';
import { categories, getTierLabel } from '@/data/rc-resources';
import type { Brand, Category } from '@/data/rc-resources';
import { useTranslation } from '@/lib/i18n/context';
import { Header } from '@/components/Header';
import { SeoKeywords } from '@/components/SeoKeywords';

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

// 简洁品牌卡片
function BrandCard({ brand, language }: { brand: Brand; language: 'zh' | 'en' }) {
  const tierInfo = getTierLabel(brand.tier);
  
  // 判断是否国内品牌
  const isDomestic = brand.country === '中国' || brand.country === '中国台湾' || brand.country === '中国香港';
  
  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-200 group h-full">
      <CardContent className="p-5">
        {/* 品牌头部 */}
        <div className="flex items-start gap-3 mb-3">
          {/* Logo */}
          {brand.logo && (
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
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
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-semibold text-white">
                {language === 'zh' ? brand.name : brand.nameEn || brand.name}
              </h3>
              {brand.nameEn && language === 'zh' && (
                <span className="text-xs text-slate-500">{brand.nameEn}</span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <MapPin className="w-3 h-3" />
                <span>{brand.country}</span>
              </div>
              {tierInfo.label && (
                <Badge variant="outline" className={`text-xs ${tierInfo.color}`}>
                  {tierInfo.label}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {/* 描述 */}
        <p className="text-sm text-slate-400 mb-3 line-clamp-2 leading-relaxed">
          {language === 'zh' ? brand.description : brand.descriptionEn || brand.description}
        </p>
        
        {/* 热门型号 */}
        {brand.models && brand.models.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1.5">
              {brand.models.slice(0, 4).map((model) => (
                <Badge key={model} variant="secondary" className="text-xs bg-slate-700/50 text-slate-400 rounded font-normal">
                  {model}
                </Badge>
              ))}
              {brand.models.length > 4 && (
                <Badge variant="secondary" className="text-xs bg-slate-700/50 text-slate-500 rounded font-normal">
                  +{brand.models.length - 4}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        {/* 价格区间 & 适合人群 */}
        {(brand.priceRange || brand.suitableFor) && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3 text-xs text-slate-500">
            {brand.priceRange && (
              <div className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                <span>{brand.priceRange}</span>
              </div>
            )}
            {brand.suitableFor && (
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{brand.suitableFor}</span>
              </div>
            )}
          </div>
        )}
        
        {/* 亮点 */}
        {brand.highlight && (
          <div className="mb-3 px-3 py-2 bg-orange-500/10 border border-orange-500/20 rounded-lg text-xs text-orange-300">
            💡 {language === 'zh' ? brand.highlight : brand.highlightEn || brand.highlight}
          </div>
        )}
        
        {/* 访问按钮 */}
        <a 
          href={brand.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <Button 
            size="sm"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-150"
          >
            <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
            {language === 'zh' ? '访问官网' : 'Visit Website'}
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}

// 分类内容组件
function CategoryContent({ 
  category, 
  regionFilter,
  language 
}: { 
  category: Category; 
  regionFilter: 'all' | 'domestic' | 'overseas';
  language: 'zh' | 'en';
}) {
  // 根据地区筛选
  const filteredBrands = useMemo(() => {
    if (regionFilter === 'all') return category.brands;
    
    return category.brands.filter(brand => {
      const isDomestic = brand.country === '中国' || brand.country === '中国台湾' || brand.country === '中国香港';
      return regionFilter === 'domestic' ? isDomestic : !isDomestic;
    });
  }, [category.brands, regionFilter]);
  
  if (filteredBrands.length === 0) {
    return (
      <div className="text-center py-12">
        <Car className="w-10 h-10 text-slate-600 mx-auto mb-3" />
        <p className="text-slate-400">
          {language === 'zh' ? '暂无相关品牌' : 'No brands available'}
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredBrands.map((brand) => (
        <BrandCard key={brand.name} brand={brand} language={language} />
      ))}
    </div>
  );
}

export default function BrandsPageClient() {
  const { t, language } = useTranslation();
  const [regionFilter, setRegionFilter] = useState<'all' | 'domestic' | 'overseas'>('all');
  const [activeCategory, setActiveCategory] = useState('vehicles');
  
  // 统计数据
  const stats = useMemo(() => {
    let totalBrands = 0;
    let domesticBrands = 0;
    let overseasBrands = 0;
    
    categories.forEach(cat => {
      cat.brands.forEach(brand => {
        totalBrands++;
        const isDomestic = brand.country === '中国' || brand.country === '中国台湾' || brand.country === '中国香港';
        if (isDomestic) {
          domesticBrands++;
        } else {
          overseasBrands++;
        }
      });
    });
    
    return { totalBrands, domesticBrands, overseasBrands, categories: categories.length };
  }, []);
  
  // 当前分类
  const currentCategory = useMemo(() => {
    return categories.find(c => c.id === activeCategory) || categories[0];
  }, [activeCategory]);
  
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {language === 'zh' ? '品牌导航' : 'Brand Directory'}
          </h1>
          <p className="text-slate-400">
            {language === 'zh' 
              ? `收录 ${stats.totalBrands} 个品牌，国内 ${stats.domesticBrands} 个，海外 ${stats.overseasBrands} 个`
              : `${stats.totalBrands} brands, ${stats.domesticBrands} domestic, ${stats.overseasBrands} overseas`}
          </p>
        </div>
        
        {/* 地区筛选 */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={regionFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setRegionFilter('all')}
            className={regionFilter === 'all' 
              ? 'bg-orange-500 hover:bg-orange-600 text-white' 
              : 'border-slate-600 text-slate-400 hover:text-white'
            }
          >
            {language === 'zh' ? '全部品牌' : 'All Brands'}
          </Button>
          <Button
            variant={regionFilter === 'domestic' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setRegionFilter('domestic')}
            className={regionFilter === 'domestic' 
              ? 'bg-orange-500 hover:bg-orange-600 text-white' 
              : 'border-slate-600 text-slate-400 hover:text-white'
            }
          >
            {language === 'zh' ? '🇨🇳 国内品牌' : '🇨🇳 Domestic'}
          </Button>
          <Button
            variant={regionFilter === 'overseas' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setRegionFilter('overseas')}
            className={regionFilter === 'overseas' 
              ? 'bg-orange-500 hover:bg-orange-600 text-white' 
              : 'border-slate-600 text-slate-400 hover:text-white'
            }
          >
            {language === 'zh' ? '🌍 海外品牌' : '🌍 Overseas'}
          </Button>
        </div>
        
        {/* 分类标签 */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0 mb-6">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg border transition-all data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:border-orange-500 bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600"
              >
                {iconMap[category.icon]}
                <span>{language === 'zh' ? category.title : category.titleEn}</span>
                <Badge variant="secondary" className={`ml-1 text-xs font-medium ${
                  activeCategory === category.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-orange-500/20 text-orange-400'
                }`}>
                  {category.brands.length}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <CategoryContent 
                category={category} 
                regionFilter={regionFilter}
                language={language}
              />
            </TabsContent>
          ))}
        </Tabs>

        {/* SEO关键词 */}
        <SeoKeywords type="brands" className="mt-8" />
      </main>
    </div>
  );
}
