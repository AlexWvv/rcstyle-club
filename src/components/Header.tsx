'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { SearchModal } from '@/components/SearchModal';
import { UserMenu } from '@/components/auth/UserMenu';
import { useTranslation } from '@/lib/i18n/context';
import { Play, Search, Star, Globe, Newspaper, Menu, X } from 'lucide-react';

export function Header() {
  const { t, language } = useTranslation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/95 backdrop-blur-sm" role="banner">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center" aria-hidden="true">
              <Play className="w-6 h-6 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Rcstyle.club</h1>
              <p className="text-xs text-slate-400 hidden sm:block">RC Hobby Resource Hub</p>
            </div>
          </Link>
          
          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center gap-4" aria-label="主导航">
            {/* 快速搜索按钮 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <Search className="w-4 h-4" />
              <span>{t('nav.search')}</span>
              <kbd className="hidden lg:inline-flex px-1.5 py-0.5 text-xs bg-slate-700 rounded text-slate-400 ml-1">
                ⌘K
              </kbd>
            </Button>
            
            {/* 资讯链接 */}
            <Link href="/news">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <Newspaper className="w-4 h-4" />
                <span>{t('nav.news')}</span>
              </Button>
            </Link>
            
            {/* 收藏引导 */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" aria-hidden="true" />
              <span className="text-sm text-yellow-400">
                {t('home.bookmarkHint')} <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-xs font-mono mx-1">Ctrl</kbd>+<kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-xs font-mono mx-1">D</kbd> {t('home.bookmarkHint2')}
              </span>
            </div>
            
            {/* 语言信息 */}
            <span className="flex items-center gap-1 text-sm text-slate-400">
              <Globe className="w-4 h-4 text-blue-400" />
              {t('home.selected')}
            </span>
            
            {/* 语言切换 */}
            <LanguageSwitcher />
            
            {/* 用户菜单 */}
            <UserMenu />
          </nav>
          
          {/* 移动端菜单 */}
          <div className="flex md:hidden items-center gap-2">
            {/* 移动端搜索 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchOpen(true)}
              className="p-2 text-slate-300"
            >
              <Search className="w-5 h-5" />
            </Button>
            
            {/* 移动端用户菜单 */}
            <UserMenu />
            
            {/* 移动端菜单按钮 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        
        {/* 移动端菜单展开 */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-700 bg-slate-900">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <Link 
                href="/news" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
              >
                <Newspaper className="w-4 h-4" />
                {t('nav.news')}
              </Link>
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm text-slate-400">{language === 'zh' ? '语言' : 'Language'}</span>
                <LanguageSwitcher />
              </div>
              <div className="flex items-center gap-2 px-4 py-2 text-yellow-400 text-sm">
                <Star className="w-4 h-4" fill="currentColor" />
                {t('home.bookmarkHint')} Ctrl+D {t('home.bookmarkHint2')}
              </div>
            </nav>
          </div>
        )}
      </header>
      
      {/* 搜索弹窗 */}
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
