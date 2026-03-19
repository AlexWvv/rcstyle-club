'use client';

import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Car, Search, X, FileText, Play, Printer, 
  Cog, Mountain, Zap, Truck, Car as CarIcon, 
  Gauge, CircleDot, Box
} from 'lucide-react';
import { 
  modelsData, modelTypeLabels, getAllModelTypes, formatPrice,
  type RCModel, type ModelType 
} from '@/data/models';
import { useTranslation } from '@/lib/i18n/context';
import { Header } from '@/components/Header';
import { SeoKeywords } from '@/components/SeoKeywords';

// 比例标签颜色映射
const scaleColors: Record<string, string> = {
  '1/5': 'bg-red-500/20 text-red-400 border-red-500/30',
  '1/6': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  '1/8': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  '1/10': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  '1/12': 'bg-lime-500/20 text-lime-400 border-lime-500/30',
  '1/16': 'bg-green-500/20 text-green-400 border-green-500/30',
  '1/18': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  '1/24': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  '1/28': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
};

// 车型类型图标映射
const typeIconMap: Record<ModelType, React.ReactNode> = {
  crawler: <Mountain className="w-5 h-5" />,
  offroad: <Zap className="w-5 h-5" />,
  monster: <Truck className="w-5 h-5" />,
  drift: <Car className="w-5 h-5" />,
  shortcourse: <Gauge className="w-5 h-5" />,
  touring: <CarIcon className="w-5 h-5" />,
  truck: <Truck className="w-5 h-5" />,
  buggy: <CircleDot className="w-5 h-5" />,
  truggy: <Box className="w-5 h-5" />,
  scale: <Cog className="w-5 h-5" />,
};

// 车型类型背景色映射
const typeBgMap: Record<ModelType, string> = {
  crawler: 'from-green-600/20 to-emerald-600/20',
  offroad: 'from-orange-600/20 to-amber-600/20',
  monster: 'from-red-600/20 to-orange-600/20',
  drift: 'from-blue-600/20 to-cyan-600/20',
  shortcourse: 'from-yellow-600/20 to-orange-600/20',
  touring: 'from-purple-600/20 to-pink-600/20',
  truck: 'from-slate-600/20 to-zinc-600/20',
  buggy: 'from-cyan-600/20 to-teal-600/20',
  truggy: 'from-lime-600/20 to-green-600/20',
  scale: 'from-indigo-600/20 to-violet-600/20',
};

// 获取比例标签样式
const getScaleBadgeStyle = (scale: string): string => {
  return scaleColors[scale] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
};

// 搜索URL
const DOUYIN_SEARCH_URL = 'https://www.douyin.com/search/';
const MAKERWORLD_SEARCH_URL = 'https://makerworld.com.cn/zh/search?keyword=';

// 车型卡片组件 - 列表式布局
function ModelCard({ model, language }: { model: RCModel; language: 'zh' | 'en' }) {
  const typeLabel = modelTypeLabels[model.type];
  const scaleStyle = getScaleBadgeStyle(model.scale);
  const typeIcon = typeIconMap[model.type];
  const typeBg = typeBgMap[model.type];
  
  // 获取车型名称用于搜索
  const searchName = language === 'zh' ? model.name : (model.nameEn || model.name);
  const brandName = language === 'zh' ? model.brand : (model.brandEn || model.brand);
  
  // 格式化价格（根据品牌地区显示对应货币）
  const formattedPrice = formatPrice(model.price, model.brand, model.brandEn, language);
  
  // 跳转到抖音搜索
  const handleDouyinSearch = () => {
    const url = `${DOUYIN_SEARCH_URL}${encodeURIComponent(searchName)}`;
    window.open(url, '_blank');
  };
  
  // 跳转到 MakerWorld 搜索 3D 打印模型
  const handleMakerWorldSearch = () => {
    const keyword = language === 'zh' 
      ? `${model.name} RC` 
      : `${model.nameEn || model.name} RC`;
    const url = `${MAKERWORLD_SEARCH_URL}${encodeURIComponent(keyword)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-orange-500/50 transition-all duration-300 group">
      <div className="flex items-start gap-4">
        {/* 左侧图标区域 */}
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${typeBg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
          <span className="text-orange-400">
            {typeIcon}
          </span>
        </div>
        
        {/* 中间信息区域 */}
        <div className="flex-1 min-w-0">
          {/* 品牌和标签 */}
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs text-slate-500">{brandName}</span>
            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${scaleStyle}`}>
              {model.scale}
            </Badge>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-slate-700/50 border-slate-600 text-slate-400">
              {language === 'zh' ? typeLabel.zh : typeLabel.en}
            </Badge>
            {formattedPrice && (
              <span className="text-xs text-orange-400 font-medium">{formattedPrice}</span>
            )}
          </div>
          
          {/* 车型名称 */}
          <h3 className="text-base font-semibold text-white mb-1 group-hover:text-orange-400 transition-colors">
            {language === 'zh' ? model.name : model.nameEn}
          </h3>
          
          {/* 描述 */}
          <p className="text-sm text-slate-400 line-clamp-2 mb-2">
            {language === 'zh' ? model.description : model.descriptionEn}
          </p>
          
          {/* 特点标签 */}
          {model.features && model.features.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {model.features.slice(0, 4).map((feature) => (
                <span 
                  key={feature} 
                  className="text-[10px] px-1.5 py-0.5 bg-slate-700/30 text-slate-500 rounded"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}
          
          {/* 操作按钮 */}
          <div className="flex gap-2">
            {model.manualUrl && (
              <Button 
                size="sm" 
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
                asChild
              >
                <a href={model.manualUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="w-3.5 h-3.5 mr-1" />
                  {language === 'zh' ? '说明书' : 'Manual'}
                </a>
              </Button>
            )}
            <Button 
              size="sm"
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handleDouyinSearch}
            >
              <Play className="w-3.5 h-3.5 mr-1" />
              {language === 'zh' ? '视频' : 'Video'}
            </Button>
            <Button 
              size="sm"
              variant="outline"
              className="border-cyan-600/50 text-cyan-400 hover:bg-cyan-500/10"
              onClick={handleMakerWorldSearch}
            >
              <Printer className="w-3.5 h-3.5 mr-1" />
              3D
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ModelsPageClient() {
  const { t, language } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ModelType | 'all'>('all');
  const [selectedScale, setSelectedScale] = useState<string>('all');
  
  // 获取所有车型类型
  const allTypes = getAllModelTypes();
  
  // 获取所有比例
  const allScales = useMemo(() => {
    const scales = new Set(modelsData.map(m => m.scale));
    return Array.from(scales).sort((a, b) => {
      const numA = parseFloat(a.replace('1/', ''));
      const numB = parseFloat(b.replace('1/', ''));
      return numA - numB;
    });
  }, []);
  
  // 筛选车型
  const filteredModels = useMemo(() => {
    return modelsData.filter(model => {
      const searchLower = searchQuery.toLowerCase();
      const matchSearch = !searchQuery || 
        model.name.toLowerCase().includes(searchLower) ||
        model.nameEn?.toLowerCase().includes(searchLower) ||
        model.brand.toLowerCase().includes(searchLower) ||
        model.brandEn?.toLowerCase().includes(searchLower) ||
        model.description.toLowerCase().includes(searchLower);
      
      const matchType = selectedType === 'all' || model.type === selectedType;
      const matchScale = selectedScale === 'all' || model.scale === selectedScale;
      
      return matchSearch && matchType && matchScale;
    });
  }, [searchQuery, selectedType, selectedScale]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Car className="w-8 h-8 text-orange-400" />
            {language === 'zh' ? '车型库' : 'RC Models'}
          </h1>
          <p className="text-slate-400">
            {language === 'zh' 
              ? `收录 ${modelsData.length} 款热门RC车型，提供参数、说明书、视频等资源`
              : `${modelsData.length} RC models with specs, manuals, and videos`}
          </p>
        </div>
        
        {/* 搜索和筛选 */}
        <div className="mb-6 space-y-4">
          {/* 搜索框 */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              placeholder={language === 'zh' ? '搜索车型名称、品牌...' : 'Search models...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* 筛选区域 */}
          <div className="flex flex-wrap items-center gap-3">
            {/* 类型筛选 */}
            <div className="flex flex-wrap gap-1.5">
              <Badge
                className={`cursor-pointer transition-colors text-xs ${
                  selectedType === 'all'
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                }`}
                onClick={() => setSelectedType('all')}
              >
                {language === 'zh' ? '全部' : 'All'}
              </Badge>
              {allTypes.map((type) => {
                const label = modelTypeLabels[type];
                return (
                  <Badge
                    key={type}
                    className={`cursor-pointer transition-colors text-xs ${
                      selectedType === type
                        ? 'bg-orange-500 text-white'
                        : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                    }`}
                    onClick={() => setSelectedType(type)}
                  >
                    {language === 'zh' ? label.zh : label.en}
                  </Badge>
                );
              })}
            </div>
            
            {/* 分隔线 */}
            <div className="w-px h-5 bg-slate-700 hidden sm:block" />
            
            {/* 比例筛选 */}
            <div className="flex flex-wrap gap-1.5">
              <Badge
                className={`cursor-pointer transition-colors text-xs ${
                  selectedScale === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                }`}
                onClick={() => setSelectedScale('all')}
              >
                {language === 'zh' ? '全部比例' : 'All Scales'}
              </Badge>
              {allScales.map((scale) => (
                <Badge
                  key={scale}
                  className={`cursor-pointer transition-colors text-xs ${
                    selectedScale === scale
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                  }`}
                  onClick={() => setSelectedScale(scale)}
                >
                  {scale}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        {/* 结果统计 */}
        <div className="mb-4 text-slate-400 text-sm">
          {language === 'zh' 
            ? `找到 ${filteredModels.length} 款车型`
            : `${filteredModels.length} models found`}
        </div>
        
        {/* 车型列表 */}
        <div className="space-y-3">
          {filteredModels.map((model) => (
            <ModelCard key={model.id} model={model} language={language} />
          ))}
        </div>
        
        {/* 无结果 */}
        {filteredModels.length === 0 && (
          <div className="text-center py-12">
            <Car className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">
              {language === 'zh' ? '没有找到匹配的车型' : 'No models found'}
            </p>
          </div>
        )}

        {/* SEO关键词 */}
        <SeoKeywords type="models" className="mt-8" />
      </main>
    </div>
  );
}
