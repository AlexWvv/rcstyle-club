'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllNews, formatDate, formatViews, type NewsArticle } from '@/data/news';
import { Calendar, Eye, Video, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/context';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { SeoKeywords } from '@/components/SeoKeywords';

export default function NewsPageClient() {
  const { t, language } = useTranslation();
  const news = getAllNews();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Button variant="ghost" className="text-white gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t('nav.backHome')}
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-white">{t('news.title')}</h1>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{t('news.subtitle')}</h2>
          <p className="text-slate-400">{t('news.subtitleDesc')}</p>
        </div>

        {/* 分类筛选 */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white cursor-pointer">
            {t('news.all')}
          </Badge>
          {[
            { zh: '新品发布', en: 'New Products' },
            { zh: '评测对比', en: 'Reviews' },
            { zh: '赛事活动', en: 'Events' },
            { zh: '技术分享', en: 'Tutorials' },
            { zh: '行业动态', en: 'Industry' },
          ].map((category) => (
            <Badge key={category.zh} variant="outline" className="border-slate-600 text-slate-400 cursor-pointer hover:bg-slate-800">
              {language === 'zh' ? category.zh : category.en}
            </Badge>
          ))}
        </div>

        {/* 资讯列表 */}
        <div className="grid gap-6">
          {news.map((article) => (
            <Link key={article.id} href={`/news/${article.id}`}>
              <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all overflow-hidden group">
                <div className="flex flex-col md:flex-row">
                  {/* 封面图 */}
                  <div className="w-full md:w-72 h-48 md:h-auto relative overflow-hidden shrink-0">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {article.video && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Video className="w-12 h-12 text-white" />
                      </div>
                    )}
                    {article.isNew && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                        NEW
                      </Badge>
                    )}
                  </div>
                  
                  {/* 内容 */}
                  <CardContent className="flex-1 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="border-slate-600 text-slate-400">
                        {language === 'zh' ? article.category : article.categoryEn}
                      </Badge>
                      <span className="text-slate-500 text-sm flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(article.publishDate, language)}
                      </span>
                      <span className="text-slate-500 text-sm flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {formatViews(article.views)}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
                      {language === 'zh' ? article.title : article.titleEn}
                    </h3>
                    
                    <p className="text-slate-400 text-sm line-clamp-2 mb-3">
                      {language === 'zh' ? article.summary : article.summaryEn}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {article.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* SEO关键词 */}
        <SeoKeywords type="news" className="mt-8" />
      </main>
    </div>
  );
}
