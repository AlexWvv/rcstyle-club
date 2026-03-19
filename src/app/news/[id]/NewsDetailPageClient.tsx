'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getNewsById, formatDate, formatViews, getAllNews } from '@/data/news';
import { Calendar, Eye, ArrowLeft, Video, Image as ImageIcon, Share2, Heart, User, Clock } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/context';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface Props {
  params: Promise<{ id: string }>;
}

export default function NewsDetailPageClient({ params }: Props) {
  const { t, language } = useTranslation();
  const { id } = use(params);
  const article = getNewsById(id);

  if (!article) {
    notFound();
  }

  // 获取相关资讯
  const relatedNews = getAllNews()
    .filter((n) => n.id !== article.id && n.category === article.category)
    .slice(0, 3);

  // 结构化数据 - Article Schema
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: language === 'zh' ? article.title : article.titleEn,
    description: language === 'zh' ? article.summary : article.summaryEn,
    image: article.coverImage,
    author: {
      '@type': 'Person',
      name: language === 'zh' ? article.author : article.authorEn || article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rcstyle.club',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rcstyle.club/logo.png',
      },
    },
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://rcstyle.club/news/${article.id}`,
    },
    articleSection: language === 'zh' ? article.category : article.categoryEn,
    keywords: article.tags.join(', '),
    wordCount: article.content.length,
  };

  // 面包屑结构化数据
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: language === 'zh' ? '首页' : 'Home',
        item: 'https://rcstyle.club',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: language === 'zh' ? '资讯中心' : 'News',
        item: 'https://rcstyle.club/news',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: language === 'zh' ? article.title : article.titleEn,
        item: `https://rcstyle.club/news/${article.id}`,
      },
    ],
  };

  const title = language === 'zh' ? article.title : article.titleEn;
  const summary = language === 'zh' ? article.summary : article.summaryEn;
  const content = language === 'zh' ? article.content : article.contentEn || article.content;
  const author = language === 'zh' ? article.author : article.authorEn || article.author;
  const category = language === 'zh' ? article.category : article.categoryEn;

  return (
    <>
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* 顶部导航 - 移动端优化 */}
        <header className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
            <Link href="/news" className="hover:opacity-80 transition-opacity">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-300 hover:text-white gap-1.5 sm:gap-2 h-9 px-2 sm:px-3"
                aria-label={t('newsDetail.backToNews')}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm sm:text-base">{language === 'zh' ? '返回' : 'Back'}</span>
              </Button>
            </Link>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-300 hover:text-white gap-1.5 sm:gap-2 h-9 px-2 sm:px-3"
                aria-label={language === 'zh' ? '收藏文章' : 'Bookmark article'}
              >
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">{language === 'zh' ? '收藏' : 'Save'}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-300 hover:text-white gap-1.5 sm:gap-2 h-9 px-2 sm:px-3"
                aria-label={language === 'zh' ? '分享文章' : 'Share article'}
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">{t('newsDetail.share')}</span>
              </Button>
              <LanguageSwitcher />
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
          {/* 文章主体 */}
          <article className="mb-8 sm:mb-12">
            {/* 头部信息区 */}
            <header className="mb-4 sm:mb-6">
              {/* 分类 + NEW */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30 text-xs sm:text-sm">
                  {category}
                </Badge>
                {article.isNew && (
                  <Badge className="bg-red-500 text-white font-bold animate-pulse text-xs sm:text-sm">
                    NEW
                  </Badge>
                )}
              </div>

              {/* 标题 - 响应式字号 */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-3 sm:mb-4">
                {title}
              </h1>

              {/* 摘要 - 移动端优化 */}
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-4 sm:mb-6">
                {summary}
              </p>

              {/* 元信息 - 移动端换行优化 */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500 pb-4 sm:pb-6 border-b border-slate-700/50">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <time dateTime={article.publishDate}>{formatDate(article.publishDate, language)}</time>
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{formatViews(article.views)} {language === 'zh' ? '阅读' : 'views'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{language === 'zh' ? '约 3 分钟' : '~3 min read'}</span>
                </div>
              </div>
            </header>

            {/* 封面图 - 响应式圆角 */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-10 shadow-2xl">
              <img 
                src={article.coverImage}
                alt={`${title} - ${category}`}
                className="w-full h-auto"
                loading="eager"
              />
              {/* 媒体标识 - 移动端优化 */}
              {(article.video || (article.images && article.images.length > 0)) && (
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex gap-1.5 sm:gap-2">
                  {article.video && (
                    <div className="bg-black/70 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg flex items-center gap-1 sm:gap-1.5">
                      <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      <span className="text-xs sm:text-sm text-white font-medium">{t('newsDetail.video')}</span>
                    </div>
                  )}
                  {article.images && article.images.length > 0 && (
                    <div className="bg-black/70 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg flex items-center gap-1 sm:gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      <span className="text-xs sm:text-sm text-white font-medium">{article.images.length + 1} {language === 'zh' ? '图' : 'images'}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 正文内容 - 移动端字号优化 */}
            <div 
              className="prose prose-invert max-w-none mb-6 sm:mb-10
                prose-base sm:prose-lg
                prose-headings:text-white prose-headings:font-bold
                prose-h2:text-xl sm:text-2xl prose-h2:mt-8 sm:prose-h2:mt-10 prose-h2:mb-3 sm:prose-h2:mb-4 prose-h2:pb-2 sm:prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-700/50
                prose-h3:text-lg sm:text-xl prose-h3:mt-6 sm:prose-h3:mt-8 prose-h3:mb-2 sm:prose-h3:mb-3
                prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-3 sm:prose-p:mb-4
                prose-ul:text-slate-300 prose-ul:my-3 sm:prose-ul:my-4 prose-li:my-0.5 sm:prose-li:my-1
                prose-strong:text-white prose-strong:font-semibold
                prose-a:text-orange-400 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* 视频区域 - 移动端优化 */}
            {article.video && (
              <div className="mb-6 sm:mb-10 bg-slate-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700/50">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {language === 'zh' ? '相关视频' : 'Related Video'}
                  </h3>
                </div>
                <div className="aspect-video bg-slate-900 rounded-lg sm:rounded-xl overflow-hidden">
                  <iframe 
                    src={article.video.url}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${title} - Video`}
                  />
                </div>
              </div>
            )}

            {/* 图片画廊 - 移动端优化 */}
            {article.images && article.images.length > 0 && (
              <div className="mb-6 sm:mb-10">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {language === 'zh' ? '图片展示' : 'Image Gallery'}
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {article.images.map((image, index) => (
                    <div 
                      key={index} 
                      className="aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-slate-800 cursor-pointer group"
                    >
                      <img 
                        src={image}
                        alt={`${title} - Image ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 标签区 - 移动端优化 */}
            <div className="pt-4 sm:pt-6 border-t border-slate-700/50">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {article.tags.map((tag) => (
                  <Badge 
                    key={tag}
                    variant="outline" 
                    className="border-slate-600/50 text-slate-400 hover:bg-slate-800 hover:text-slate-300 transition-colors text-xs sm:text-sm"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </article>

          {/* 分隔线 */}
          <div className="border-t border-slate-700/50 my-8 sm:my-12"></div>

          {/* 相关资讯 - 移动端优化 */}
          {relatedNews.length > 0 && (
            <section className="mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                <span>{t('newsDetail.relatedNews')}</span>
                <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                  {relatedNews.length} {language === 'zh' ? '篇' : 'articles'}
                </Badge>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {relatedNews.map((related) => (
                  <Link key={related.id} href={`/news/${related.id}`} className="group">
                    <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg sm:rounded-xl overflow-hidden hover:border-orange-500/30 hover:bg-slate-800/50 transition-all h-full">
                      {/* 封面 */}
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={related.coverImage}
                          alt={language === 'zh' ? related.title : related.titleEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        {related.isNew && (
                          <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-red-500 text-white font-bold animate-pulse text-xs">
                            NEW
                          </Badge>
                        )}
                      </div>
                      {/* 信息 */}
                      <div className="p-3 sm:p-4">
                        <Badge variant="outline" className="border-slate-600/50 text-slate-400 text-xs mb-1.5 sm:mb-2">
                          {language === 'zh' ? related.category : related.categoryEn}
                        </Badge>
                        <h3 className="font-semibold text-white group-hover:text-orange-400 transition-colors line-clamp-2 mb-1.5 sm:mb-2 text-sm sm:text-base">
                          {language === 'zh' ? related.title : related.titleEn}
                        </h3>
                        <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-500">
                          <span>{formatDate(related.publishDate, language)}</span>
                          <span>·</span>
                          <span>{formatViews(related.views)} {language === 'zh' ? '阅读' : 'views'}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 返回按钮 - 移动端优化 */}
          <div className="text-center pb-6 sm:pb-8">
            <Link href="/news">
              <Button 
                variant="outline" 
                className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white gap-1.5 sm:gap-2 text-sm sm:text-base"
                aria-label={t('newsDetail.backToNews')}
              >
                <ArrowLeft className="w-4 h-4" />
                {t('newsDetail.backToNews')}
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
