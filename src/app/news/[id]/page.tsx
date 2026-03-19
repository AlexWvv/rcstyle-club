import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NewsDetailPageClient from './NewsDetailPageClient';
import { getNewsById } from '@/data/news';

interface Props {
  params: Promise<{ id: string }>;
}

// 生成动态metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = getNewsById(id);

  if (!article) {
    return {
      title: '文章未找到',
    };
  }

  const title = article.title;
  const description = article.summary;
  const url = `https://rcstyle.club/news/${article.id}`;

  return {
    title: article.titleEn ? `${article.title} | ${article.titleEn}` : article.title,
    description: description,
    keywords: article.tags,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.titleEn || article.title,
      description: article.summaryEn || article.summary,
      url: url,
      type: 'article',
      publishedTime: article.publishDate,
      authors: [article.author],
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.titleEn || article.title,
      description: article.summaryEn || article.summary,
      images: [article.coverImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const article = getNewsById(id);

  if (!article) {
    notFound();
  }

  return <NewsDetailPageClient params={Promise.resolve({ id })} />;
}
