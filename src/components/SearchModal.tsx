'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { search, SearchResult, getHotKeywords } from '@/lib/search';
import { useLanguage } from '@/lib/i18n/context';
import { 
  Car, 
  Newspaper, 
  Video, 
  Search, 
  TrendingUp,
  Clock,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// 类型图标映射
const typeIcons = {
  brand: Car,
  news: Newspaper,
  vlogger: Video
};

// 类型颜色映射
const typeColors = {
  brand: 'text-slate-400',
  news: 'text-slate-400',
  vlogger: 'text-slate-400'
};

// 类型标签映射
const typeLabels = {
  brand: { zh: '品牌', en: 'Brand' },
  news: { zh: '资讯', en: 'News' },
  vlogger: { zh: '博主', en: 'Vlogger' }
};

// 默认搜索引擎 - 百度
const getDefaultSearchEngine = (query: string, language: 'zh' | 'en') => {
  const searchTerm = language === 'zh' 
    ? `${query} RC 遥控车 模型`
    : `${query} RC car model`;
  return `https://www.baidu.com/s?wd=${encodeURIComponent(searchTerm)}`;
};

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [activeType, setActiveType] = useState<'all' | 'brand' | 'news' | 'vlogger'>('all');
  
  // 加载最近搜索记录
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('recentSearches');
      if (saved) {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      }
    }
  }, []);
  
  // 保存搜索记录
  const saveRecentSearch = useCallback((keyword: string) => {
    if (typeof window === 'undefined' || !keyword.trim()) return;
    
    const updated = [
      keyword,
      ...recentSearches.filter(s => s !== keyword)
    ].slice(0, 5);
    
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  }, [recentSearches]);
  
  // 执行站内搜索
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    const timer = setTimeout(() => {
      const searchResults = search(query);
      setResults(searchResults);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  // 过滤结果
  const filteredResults = useMemo(() => {
    if (activeType === 'all') return results;
    return results.filter(item => item.type === activeType);
  }, [results, activeType]);
  
  // 热门关键词
  const hotKeywords = useMemo(() => getHotKeywords(), []);
  
  // 点击站内结果
  const handleResultClick = (result: SearchResult) => {
    saveRecentSearch(query);
    onOpenChange(false);
    router.push(result.url);
  };
  
  // 点击历史记录或热门搜索
  const handleKeywordClick = (keyword: string) => {
    setQuery(keyword);
  };
  
  // 执行全网搜索（默认百度）
  const handleWebSearch = () => {
    if (!query.trim()) return;
    saveRecentSearch(query);
    const url = getDefaultSearchEngine(query, language);
    window.open(url, '_blank');
    onOpenChange(false);
  };
  
  // 清空历史
  const clearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };
  
  // 快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
      // Enter 键执行全网搜索
      if (e.key === 'Enter' && open && query.trim()) {
        handleWebSearch();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange, query]);
  
  // 打开时清空查询
  useEffect(() => {
    if (open) {
      setQuery('');
      setResults([]);
      setActiveType('all');
    }
  }, [open]);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 bg-slate-900 border-slate-800">
        {/* 无障碍访问：隐藏的标题和描述 */}
        <DialogTitle className="sr-only">
          {language === 'zh' ? '搜索' : 'Search'}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {language === 'zh' ? '搜索品牌、资讯、博主等内容' : 'Search brands, news, vloggers and more'}
        </DialogDescription>
        
        {/* 搜索输入框 */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-800">
          <Search className="w-5 h-5 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={language === 'zh' ? '搜索品牌、资讯、博主...' : 'Search brands, news, vloggers...'}
            className="border-0 bg-transparent focus-visible:ring-0 text-white placeholder:text-slate-500"
            autoFocus
          />
          {query.trim() && (
            <Button
              size="sm"
              onClick={handleWebSearch}
              className="bg-orange-500 hover:bg-orange-600 text-white gap-1"
            >
              {language === 'zh' ? '搜索' : 'Search'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
          <kbd className="hidden md:flex px-2 py-1 text-xs bg-slate-800 text-slate-400 rounded border border-slate-700">
            ESC
          </kbd>
        </div>
        
        {/* 内容区域 */}
        <ScrollArea className="max-h-[500px]">
          {/* 有搜索词时显示 */}
          {query.trim() && (
            <>
              {/* 全网搜索入口 - 默认推荐 */}
              <div className="p-4 border-b border-slate-800">
                <button
                  onClick={handleWebSearch}
                  className="w-full flex items-center gap-3 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors text-left border border-slate-700 hover:border-slate-600 group"
                >
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Search className="w-5 h-5 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">
                        {language === 'zh' ? '在百度搜索' : 'Search on Baidu'}
                      </span>
                      <Badge className="bg-orange-500 text-white text-xs">
                        {language === 'zh' ? '推荐' : 'Recommended'}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400 mt-0.5">
                      "{query}" {language === 'zh' ? 'RC 遥控车 模型' : 'RC car model'}
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-orange-400 transition-colors" />
                </button>
              </div>
              
              {/* 类型过滤 */}
              {results.length > 0 && (
                <div className="flex gap-2 p-3 border-b border-slate-800">
                  <Button
                    size="sm"
                    variant={activeType === 'all' ? 'default' : 'ghost'}
                    onClick={() => setActiveType('all')}
                    className={cn(
                      'h-8',
                      activeType === 'all' 
                        ? 'bg-slate-700 text-white hover:bg-slate-600' 
                        : 'text-slate-400 hover:text-white'
                    )}
                  >
                    {language === 'zh' ? '全部' : 'All'}
                  </Button>
                  {(['brand', 'news', 'vlogger'] as const).map(type => {
                    const count = results.filter(r => r.type === type).length;
                    if (count === 0) return null;
                    
                    return (
                      <Button
                        key={type}
                        size="sm"
                        variant={activeType === type ? 'default' : 'ghost'}
                        onClick={() => setActiveType(type)}
                        className={cn(
                          'h-8',
                          activeType === type 
                            ? 'bg-slate-700 text-white hover:bg-slate-600' 
                            : 'text-slate-400 hover:text-white'
                        )}
                      >
                        {typeLabels[type][language]} ({count})
                      </Button>
                    );
                  })}
                </div>
              )}
              
              {/* 站内搜索结果 */}
              {filteredResults.length > 0 && (
                <div className="p-2">
                  <div className="px-3 py-2 text-xs text-slate-500 uppercase tracking-wide">
                    {language === 'zh' ? '站内结果' : 'Internal Results'}
                  </div>
                  {filteredResults.map((result) => {
                    const Icon = typeIcons[result.type];
                    const iconColor = typeColors[result.type];
                    
                    return (
                      <button
                        key={`${result.type}-${result.id}`}
                        onClick={() => handleResultClick(result)}
                        className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors text-left"
                      >
                        <div className={cn('mt-0.5', iconColor)}>
                          <Icon className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-white truncate">
                              {language === 'zh' ? result.title : result.titleEn}
                            </h3>
                            <Badge 
                              variant="outline" 
                              className="text-xs bg-slate-800 border-slate-700 text-slate-400"
                            >
                              {typeLabels[result.type][language]}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-500 line-clamp-1">
                            {language === 'zh' ? result.description : result.descriptionEn}
                          </p>
                        </div>
                        
                        {result.image && (
                          <img 
                            src={result.image} 
                            alt={result.title}
                            className="w-10 h-10 rounded object-cover bg-slate-800"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
              
              {/* 无站内结果 */}
              {filteredResults.length === 0 && (
                <div className="p-6 text-center">
                  <p className="text-slate-500 text-sm">
                    {language === 'zh' ? '站内暂无相关内容，试试全网搜索' : 'No internal results, try web search'}
                  </p>
                </div>
              )}
            </>
          )}
          
          {/* 无搜索词时显示 */}
          {!query && (
            <div className="p-4 space-y-4">
              {/* 最近搜索 */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-slate-400 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {language === 'zh' ? '最近搜索' : 'Recent'}
                    </h3>
                    <button 
                      onClick={clearHistory}
                      className="text-xs text-slate-500 hover:text-slate-400"
                    >
                      {language === 'zh' ? '清空' : 'Clear'}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((keyword, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                        onClick={() => handleKeywordClick(keyword)}
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {/* 热门搜索 */}
              <div>
                <h3 className="text-sm font-medium text-slate-400 flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4" />
                  {language === 'zh' ? '热门搜索' : 'Trending'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hotKeywords.slice(0, 8).map((keyword, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                      onClick={() => handleKeywordClick(keyword)}
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* 快捷提示 */}
              <div className="pt-2 border-t border-slate-800">
                <p className="text-xs text-slate-500 text-center">
                  {language === 'zh' 
                    ? '💡 输入关键词后按 Enter 键或点击搜索按钮进行全网搜索'
                    : '💡 Press Enter or click Search to search the web'}
                </p>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
