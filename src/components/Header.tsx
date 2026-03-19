'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { SearchModal } from '@/components/SearchModal';
import { useTranslation } from '@/lib/i18n/context';
import { getNewsCount } from '@/data/news';
import { getBrandsCount } from '@/data/rc-resources';
import { getModelsCount } from '@/data/models';
import { Newspaper, Menu, X, Car, Store } from 'lucide-react';

export function Header() {
  const { t, language } = useTranslation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsCount, setNewsCount] = useState(0);
  const [brandsCount, setBrandsCount] = useState(0);
  const [modelsCount, setModelsCount] = useState(0);
  
  // 获取统计数据
  useEffect(() => {
    setNewsCount(getNewsCount());
    setBrandsCount(getBrandsCount());
    setModelsCount(getModelsCount());
  }, []);
  
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900" role="banner">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <h1 className="text-xl font-bold text-white tracking-wide">RCSTYLE<span className="text-red-500">.CLUB</span></h1>
          </Link>
          
          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center gap-6" aria-label="主导航">
            {/* 车型库链接 */}
            <Link 
              href="/models"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
            >
              <Car className="w-4 h-4" />
              <span>{language === 'zh' ? '车型库' : 'Models'}</span>
              {modelsCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.5 text-[10px] font-medium bg-blue-500/20 text-blue-400 rounded-full">
                  {modelsCount}
                </span>
              )}
            </Link>
            
            {/* 品牌导航链接 */}
            <Link 
              href="/brands"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
            >
              <Store className="w-4 h-4" />
              <span>{language === 'zh' ? '品牌' : 'Brands'}</span>
              {brandsCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.5 text-[10px] font-medium bg-green-500/20 text-green-400 rounded-full">
                  {brandsCount}
                </span>
              )}
            </Link>
            
            {/* 资讯链接 */}
            <Link 
              href="/news"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
            >
              <Newspaper className="w-4 h-4" />
              <span>{t('nav.news')}</span>
              {newsCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.5 text-[10px] font-medium bg-orange-500/20 text-orange-400 rounded-full">
                  {newsCount}
                </span>
              )}
            </Link>
            
            {/* 分隔线 */}
            <div className="w-px h-4 bg-slate-700"></div>
            
            {/* 语言切换 */}
            <LanguageSwitcher />
          </nav>
          
          {/* 移动端菜单 */}
          <div className="flex md:hidden items-center gap-2">
            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* 移动端菜单展开 */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-900">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              <Link 
                href="/models" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Car className="w-5 h-5" />
                <span>{language === 'zh' ? '车型库' : 'Models'}</span>
                {modelsCount > 0 && (
                  <span className="ml-auto px-1.5 py-0.5 text-[10px] font-medium bg-blue-500/20 text-blue-400 rounded-full">
                    {modelsCount}
                  </span>
                )}
              </Link>
              <Link 
                href="/brands" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Store className="w-5 h-5" />
                <span>{language === 'zh' ? '品牌' : 'Brands'}</span>
                {brandsCount > 0 && (
                  <span className="ml-auto px-1.5 py-0.5 text-[10px] font-medium bg-green-500/20 text-green-400 rounded-full">
                    {brandsCount}
                  </span>
                )}
              </Link>
              <Link 
                href="/news" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Newspaper className="w-5 h-5" />
                <span>{t('nav.news')}</span>
                {newsCount > 0 && (
                  <span className="ml-auto px-1.5 py-0.5 text-[10px] font-medium bg-orange-500/20 text-orange-400 rounded-full">
                    {newsCount}
                  </span>
                )}
              </Link>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-slate-400">{language === 'zh' ? '语言' : 'Language'}</span>
                <LanguageSwitcher />
              </div>
            </nav>
          </div>
        )}
      </header>
      
      {/* 搜索弹窗 - 保留供首页搜索框使用 */}
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
