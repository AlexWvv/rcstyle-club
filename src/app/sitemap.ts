import { MetadataRoute } from 'next';
import { getAllNews } from '@/data/news';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rcstyle.club';
  
  // 获取所有资讯
  const news = getAllNews();
  
  return [
    // 首页 - 最高优先级
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // 资讯中心
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // 资讯详情页
    ...news.map((article) => ({
      url: `${baseUrl}/news/${article.id}`,
      lastModified: new Date(article.publishDate),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    // 品牌导航
    {
      url: `${baseUrl}/brands`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // 博主推荐
    {
      url: `${baseUrl}/vloggers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // 车型库
    {
      url: `${baseUrl}/models`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // 关于页面
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
