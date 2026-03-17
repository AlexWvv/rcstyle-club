'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllNews, formatDate, formatViews, type NewsArticle } from '@/data/news';
import { Calendar, Eye, Video, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/context';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function NewsPage() {
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
            <Badge 
              key={category.zh}
              variant="outline" 
              className="border-slate-600 text-slate-400 hover:border-orange-500 hover:text-orange-400 cursor-pointer transition-colors"
            >
              {language === 'zh' ? category.zh : category.en}
            </Badge>
          ))}
        </div>

        {/* 资讯列表 */}
        <div className="space-y-6">
          {news.map((article) => (
            <NewsCard key={article.id} article={article} language={language} t={t} />
          ))}
        </div>
      </main>
    </div>
  );
}

// 资讯卡片组件
function NewsCard({ 
  article,
  language,
  t
}: { 
  article: NewsArticle;
  language: 'zh' | 'en';
  t: (key: string) => string;
}) {
  return (
    <Link href={`/news/${article.id}`}>
      <Card className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-all hover:shadow-lg hover:shadow-orange-500/10 overflow-hidden group cursor-pointer">
        <div className="flex flex-col md:flex-row">
          {/* 封面图片 */}
          <div className="md:w-72 h-48 md:h-auto relative overflow-hidden shrink-0">
            <img 
              src={article.coverImage}
              alt={language === 'zh' ? article.title : article.titleEn}
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
            {/* 媒体类型标识 */}
            <div className="absolute bottom-3 right-3 flex gap-2">
              {article.video && (
                <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
                  <Video className="w-3 h-3 text-white" />
                  <span className="text-xs text-white">{t('newsDetail.video')}</span>
                </div>
              )}
              {article.images && article.images.length > 0 && (
                <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
                  <ImageIcon className="w-3 h-3 text-white" />
                  <span className="text-xs text-white">{article.images.length}</span>
                </div>
              )}
            </div>
          </div>

          {/* 内容 */}
          <CardContent className="flex-1 p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                    {language === 'zh' ? article.category : article.categoryEn}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors mb-2 line-clamp-2">
                  {language === 'zh' ? article.title : article.titleEn}
                </h3>
              </div>
            </div>
            
            <p className="text-slate-400 mb-4 line-clamp-2">
              {language === 'zh' ? article.summary : article.summaryEn}
            </p>

            <div className="flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(article.publishDate, language)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{formatViews(article.views)}</span>
                </div>
              </div>
              <div className="text-slate-400">
                {language === 'zh' ? article.author : article.authorEn || article.author}
              </div>
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2 mt-4">
              {article.tags.slice(0, 4).map((tag) => (
                <span 
                  key={tag}
                  className="text-xs px-2 py-1 bg-slate-700/50 text-slate-400 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
