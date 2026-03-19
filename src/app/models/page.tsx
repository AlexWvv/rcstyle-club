'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Car, Download, Search, Filter, FileText, 
  ChevronDown, X, ExternalLink, Calendar, Tag
} from 'lucide-react';
import { 
  modelsData, modelTypeLabels, getAllModelTypes, 
  type RCModel, type ModelType 
} from '@/data/models';
import { useTranslation } from '@/lib/i18n/context';
import { Header } from '@/components/Header';

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

// 获取比例标签样式
const getScaleBadgeStyle = (scale: string): string => {
  return scaleColors[scale] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
};

// 车型卡片组件
function ModelCard({ model, language }: { model: RCModel; language: 'zh' | 'en' }) {
  const typeLabel = modelTypeLabels[model.type];
  const scaleStyle = getScaleBadgeStyle(model.scale);
  
  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-white text-lg leading-tight">
              {language === 'zh' ? model.name : (model.nameEn || model.name)}
            </CardTitle>
            <CardDescription className="mt-1.5 text-slate-400 text-sm">
              {model.brand} {model.brandEn && model.brandEn !== model.brand && `(${model.brandEn})`}
            </CardDescription>
          </div>
          {model.image && (
            <div className="w-16 h-16 bg-slate-700 rounded-lg overflow-hidden shrink-0">
              {/* 图片占位 - 后续可接入真实图片 */}
              <div className="w-full h-full flex items-center justify-center">
                <Car className="w-8 h-8 text-slate-500" />
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* 标签组 */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={`${scaleStyle} border`}>
            {model.scale}
          </Badge>
          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            {language === 'zh' ? typeLabel.zh : typeLabel.en}
          </Badge>
          {model.price && (
            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
              {model.price}
            </Badge>
          )}
        </div>
        
        {/* 描述 */}
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
          {language === 'zh' ? model.description : (model.descriptionEn || model.description)}
        </p>
        
        {/* 特点标签 */}
        {model.features && model.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {model.features.slice(0, 4).map((feature, idx) => (
              <span 
                key={idx}
                className="text-xs px-2 py-0.5 bg-slate-700/50 text-slate-300 rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        )}
        
        {/* 底部信息 */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-700">
          {/* 发布年份 */}
          {model.releaseYear && (
            <div className="flex items-center gap-1.5 text-slate-500 text-sm">
              <Calendar className="w-3.5 h-3.5" />
              <span>{model.releaseYear}</span>
            </div>
          )}
          
          {/* 说明书下载 */}
          {model.manualUrl && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 text-xs bg-orange-500/10 text-orange-400 border-orange-500/30 hover:bg-orange-500/20"
              onClick={() => window.open(model.manualUrl, '_blank')}
            >
              <Download className="w-3.5 h-3.5" />
              {language === 'zh' ? '说明书' : 'Manual'}
              <ExternalLink className="w-3 h-3 opacity-50" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ModelsPage() {
  const { t, language } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ModelType | 'all'>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // 获取所有品牌列表
  const allBrands = useMemo(() => {
    const brands = [...new Set(modelsData.map(m => m.brand))];
    return brands.sort();
  }, []);
  
  // 获取所有类型
  const allTypes = useMemo(() => getAllModelTypes(), []);
  
  // 筛选后的车型列表
  const filteredModels = useMemo(() => {
    return modelsData.filter(model => {
      // 搜索过滤
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesSearch = 
          model.name.toLowerCase().includes(q) ||
          (model.nameEn?.toLowerCase().includes(q)) ||
          model.brand.toLowerCase().includes(q) ||
          (model.brandEn?.toLowerCase().includes(q)) ||
          model.description.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }
      
      // 类型过滤
      if (selectedType !== 'all' && model.type !== selectedType) {
        return false;
      }
      
      // 品牌过滤
      if (selectedBrand !== 'all' && model.brand !== selectedBrand) {
        return false;
      }
      
      return true;
    });
  }, [searchQuery, selectedType, selectedBrand]);
  
  // 统计信息
  const stats = useMemo(() => ({
    total: modelsData.length,
    withManual: modelsData.filter(m => m.manualUrl).length,
    brands: allBrands.length,
    types: allTypes.length,
  }), [allBrands, allTypes]);
  
  // 清除所有筛选
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedBrand('all');
  };
  
  const hasActiveFilters = searchQuery || selectedType !== 'all' || selectedBrand !== 'all';

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {language === 'zh' ? '车型库' : 'Model Library'}
          </h1>
          <p className="text-slate-400">
            {language === 'zh' 
              ? `收录 ${stats.total} 款RC车型，提供 ${stats.withManual} 份说明书下载`
              : `${stats.total} RC models, ${stats.withManual} manuals available for download`}
          </p>
        </div>
        
        {/* 搜索和筛选区 */}
        <div className="mb-6 space-y-4">
          {/* 搜索框 */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                type="text"
                placeholder={language === 'zh' ? '搜索车型名称、品牌...' : 'Search model name, brand...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-orange-500"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`gap-2 ${showFilters ? 'border-orange-500 text-orange-400' : 'border-slate-700 text-slate-400'}`}
            >
              <Filter className="w-4 h-4" />
              {language === 'zh' ? '筛选' : 'Filter'}
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>
          
          {/* 筛选面板 */}
          {showFilters && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 space-y-4">
              {/* 类型筛选 */}
              <div>
                <div className="text-sm text-slate-400 mb-2">
                  {language === 'zh' ? '车型类型' : 'Model Type'}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedType === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedType('all')}
                    className={selectedType === 'all' 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                      : 'border-slate-600 text-slate-400 hover:text-white'
                    }
                  >
                    {language === 'zh' ? '全部' : 'All'}
                  </Button>
                  {allTypes.map(type => {
                    const label = modelTypeLabels[type];
                    return (
                      <Button
                        key={type}
                        variant={selectedType === type ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedType(type)}
                        className={selectedType === type 
                          ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                          : 'border-slate-600 text-slate-400 hover:text-white'
                        }
                      >
                        {language === 'zh' ? label.zh : label.en}
                      </Button>
                    );
                  })}
                </div>
              </div>
              
              {/* 品牌筛选 */}
              <div>
                <div className="text-sm text-slate-400 mb-2">
                  {language === 'zh' ? '品牌' : 'Brand'}
                </div>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  <Button
                    variant={selectedBrand === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedBrand('all')}
                    className={selectedBrand === 'all' 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                      : 'border-slate-600 text-slate-400 hover:text-white'
                    }
                  >
                    {language === 'zh' ? '全部' : 'All'}
                  </Button>
                  {allBrands.map(brand => (
                    <Button
                      key={brand}
                      variant={selectedBrand === brand ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedBrand(brand)}
                      className={selectedBrand === brand 
                        ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                        : 'border-slate-600 text-slate-400 hover:text-white'
                      }
                    >
                      {brand}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* 清除筛选 */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4 mr-1" />
                  {language === 'zh' ? '清除筛选' : 'Clear Filters'}
                </Button>
              )}
            </div>
          )}
        </div>
        
        {/* 结果统计 */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <span className="text-slate-400">
            {language === 'zh' 
              ? `共 ${filteredModels.length} 款车型`
              : `${filteredModels.length} models`}
          </span>
          {hasActiveFilters && (
            <Button
              variant="link"
              size="sm"
              onClick={clearFilters}
              className="text-orange-400 hover:text-orange-300 p-0 h-auto"
            >
              {language === 'zh' ? '重置筛选' : 'Reset Filters'}
            </Button>
          )}
        </div>
        
        {/* 车型列表 */}
        {filteredModels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredModels.map(model => (
              <ModelCard key={model.id} model={model} language={language} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Car className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg mb-2">
              {language === 'zh' ? '没有找到匹配的车型' : 'No matching models found'}
            </p>
            <p className="text-slate-500 text-sm mb-4">
              {language === 'zh' 
                ? '尝试调整搜索条件或清除筛选' 
                : 'Try adjusting your search or clear filters'}
            </p>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="border-slate-700 text-slate-400"
            >
              {language === 'zh' ? '清除筛选' : 'Clear Filters'}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
