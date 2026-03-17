'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n/context';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
      className="gap-2 text-white hover:bg-slate-700"
      aria-label={language === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      <Languages className="w-4 h-4" />
      <span className="hidden sm:inline">{language === 'zh' ? 'EN' : '中文'}</span>
    </Button>
  );
}

// 紧凑版语言切换器（移动端使用）
export function LanguageSwitcherCompact() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
      className="w-9 h-9 p-0 text-white hover:bg-slate-700"
      aria-label={language === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      <Languages className="w-4 h-4" />
    </Button>
  );
}
