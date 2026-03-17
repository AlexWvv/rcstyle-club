'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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
  X,
  Clock
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
  brand: 'text-blue-500',
  news: 'text-green-500',
  vlogger: 'text-purple-500'
};

// 类型标签映射
const typeLabels = {
  brand: { zh: '品牌', en: 'Brand' },
  news: { zh: '资讯', en: 'News' },
  vlogger: { zh: '博主', en: 'Vlogger' }
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
  
  // 执行搜索
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    const timer = setTimeout(() => {
      const searchResults = search(query);
      setResults(searchResults);
    }, 300); // 防抖300ms
    
    return () => clearTimeout(timer);
  }, [query]);
  
  // 过滤结果
  const filteredResults = useMemo(() => {
    if (activeType === 'all') return results;
    return results.filter(item => item.type === activeType);
  }, [results, activeType]);
  
  // 点击结果
  const handleResultClick = (result: SearchResult) => {
    saveRecentSearch(query);
    onOpenChange(false);
    router.push(result.url);
  };
  
  // 点击历史记录或热门搜索
  const handleKeywordClick = (keyword: string) => {
    setQuery(keyword);
  };
  
  // 清空历史
  const clearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };
  
  // 快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K 打开搜索
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
      // ESC 关闭
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);
  
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
          <kbd className="px-2 py-1 text-xs bg-slate-800 text-slate-400 rounded border border-slate-700">
            ESC
          </kbd>
        </div>
        
        {/* 类型过滤 */}
        {query && results.length > 0 && (
          <div className="flex gap-2 p-3 border-b border-slate-800">
            <Button
              size="sm"
              variant={activeType === 'all' ? 'default' : 'ghost'}
              onClick={() => setActiveType('all')}
              className={cn(
                'h-8',
                activeType === 'all' 
                  ? 'bg-orange-500 text-white hover:bg-orange-600' 
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
                      ? 'bg-orange-500 text-white hover:bg-orange-600' 
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  {typeLabels[type][language]} ({count})
                </Button>
              );
            })}
          </div>
        )}
        
        {/* 内容区域 */}
        <ScrollArea className="max-h-[500px]">
          {/* 搜索结果 */}
          {query && filteredResults.length > 0 && (
            <div className="p-2">
              {filteredResults.map((result, index) => {
                const Icon = typeIcons[result.type];
                const iconColor = typeColors[result.type];
                
                return (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleResultClick(result)}
                    className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors text-left"
                  >
                    {/* 图标 */}
                    <div className={cn('mt-1', iconColor)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    {/* 内容 */}
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
                      <p className="text-sm text-slate-400 line-clamp-2">
                        {language === 'zh' ? result.description : result.descriptionEn}
                      </p>
                      {result.category && (
                        <p className="text-xs text-slate-500 mt-1">
                          {language === 'zh' ? result.category : result.categoryEn}
                        </p>
                      )}
                    </div>
                    
                    {/* 图片 */}
                    {result.image && (
                      <img 
                        src={result.image} 
                        alt={result.title}
                        className="w-12 h-12 rounded object-cover bg-slate-800"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
          
          {/* 无结果 */}
          {query && filteredResults.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>{language === 'zh' ? '未找到相关结果' : 'No results found'}</p>
              <p className="text-sm mt-1">
                {language === 'zh' ? '试试其他关键词' : 'Try different keywords'}
              </p>
            </div>
          )}
          
          {/* 默认内容：历史记录 + 热门搜索 */}
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
                  {getHotKeywords().map((keyword, i) => (
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
              
              {/* 快捷键提示 */}
              <div className="pt-4 border-t border-slate-800">
                <p className="text-xs text-slate-500 text-center">
                  {language === 'zh' ? (
                    <>
                      按 <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400">⌘K</kbd> 快速搜索
                    </>
                  ) : (
                    <>
                      Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400">⌘K</kbd> to search
                    </>
                  )}
                </p>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
