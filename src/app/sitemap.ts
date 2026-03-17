import { MetadataRoute } from 'next';
import { getAllNews } from '@/data/news';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rcstyle.club';
  
  // 获取所有资讯
  const news = getAllNews();
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...news.map((article) => ({
      url: `${baseUrl}/news/${article.id}`,
      lastModified: new Date(article.publishDate),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
