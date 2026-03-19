/**
 * 定向抓取源配置
 * 每次更新时优先从这些网站抓取内容
 */

export interface NewsSource {
  id: string;
  name: string;
  nameEn: string;
  region: 'US' | 'CN';
  baseUrl: string;
  categories: {
    id: string;
    name: string;
    nameEn: string;
    url: string;
    type: 'news' | 'review' | 'tech' | 'press';
  }[];
  language: 'en' | 'zh';
  priority: number; // 数字越小优先级越高
  enabled: boolean;
}

export const NEWS_SOURCES: NewsSource[] = [
  // ============ 美国网站 ============
  {
    id: 'bigsquidrc',
    name: 'Big Squid RC',
    nameEn: 'Big Squid RC',
    region: 'US',
    baseUrl: 'https://www.bigsquidrc.com',
    categories: [
      {
        id: 'bigsquidrc-news',
        name: '新闻',
        nameEn: 'News',
        url: 'https://www.bigsquidrc.com/category/news/',
        type: 'news',
      },
      {
        id: 'bigsquidrc-reviews',
        name: '评测',
        nameEn: 'Reviews',
        url: 'https://www.bigsquidrc.com/category/reviews/',
        type: 'review',
      },
    ],
    language: 'en',
    priority: 1,
    enabled: true,
  },
  {
    id: 'rcdriver',
    name: 'RC Driver',
    nameEn: 'RC Driver',
    region: 'US',
    baseUrl: 'https://www.rcdriver.com',
    categories: [
      {
        id: 'rcdriver-news',
        name: '新闻',
        nameEn: 'News',
        url: 'https://www.rcdriver.com/news/',
        type: 'news',
      },
      {
        id: 'rcdriver-reviews',
        name: '评测',
        nameEn: 'Reviews',
        url: 'https://www.rcdriver.com/reviews/',
        type: 'review',
      },
    ],
    language: 'en',
    priority: 2,
    enabled: true,
  },
  {
    id: 'liverc',
    name: 'LiveRC',
    nameEn: 'LiveRC',
    region: 'US',
    baseUrl: 'https://www.liverc.com',
    categories: [
      {
        id: 'liverc-news',
        name: '新闻',
        nameEn: 'News',
        url: 'https://www.liverc.com/news/',
        type: 'news',
      },
      {
        id: 'liverc-newproducts',
        name: '新品',
        nameEn: 'New Products',
        url: 'https://www.liverc.com/news/new-products/',
        type: 'news',
      },
      {
        id: 'liverc-press',
        name: '新闻稿',
        nameEn: 'Press Releases',
        url: 'https://www.liverc.com/news/press-releases/',
        type: 'press',
      },
    ],
    language: 'en',
    priority: 3,
    enabled: true,
  },
  {
    id: 'rcnewb',
    name: 'RC Newb',
    nameEn: 'RC Newb',
    region: 'US',
    baseUrl: 'https://rcnewb.com',
    categories: [
      {
        id: 'rcnewb-news',
        name: '新闻',
        nameEn: 'News',
        url: 'https://rcnewb.com/category/news/',
        type: 'news',
      },
      {
        id: 'rcnewb-reviews',
        name: '评测',
        nameEn: 'Reviews',
        url: 'https://rcnewb.com/category/reviews/',
        type: 'review',
      },
    ],
    language: 'en',
    priority: 4,
    enabled: true,
  },
  {
    id: 'rcgroups',
    name: 'RCGroups',
    nameEn: 'RCGroups',
    region: 'US',
    baseUrl: 'https://www.rcgroups.com',
    categories: [
      {
        id: 'rcgroups-cars',
        name: '车类频道',
        nameEn: 'Cars Channel',
        url: 'https://www.rcgroups.com/forums/channels.php?id=17',
        type: 'news',
      },
    ],
    language: 'en',
    priority: 5,
    enabled: true,
  },

  // ============ 中国网站 ============
  {
    id: 'rcfans',
    name: 'RCFans 玩家社区',
    nameEn: 'RCFans',
    region: 'CN',
    baseUrl: 'https://www.rcfans.com',
    categories: [
      {
        id: 'rcfans-news',
        name: '新闻',
        nameEn: 'News',
        url: 'https://www.rcfans.com/news/',
        type: 'news',
      },
      {
        id: 'rcfans-rccarnews',
        name: '遥控车新闻',
        nameEn: 'RC Car News',
        url: 'https://www.rcfans.com/news/rccarnews/',
        type: 'news',
      },
      {
        id: 'rcfans-reviews',
        name: '评测',
        nameEn: 'Reviews',
        url: 'https://www.rcfans.com/Reviews/',
        type: 'review',
      },
      {
        id: 'rcfans-tech',
        name: '技术',
        nameEn: 'Tech',
        url: 'https://www.rcfans.com/tech/',
        type: 'tech',
      },
    ],
    language: 'zh',
    priority: 1,
    enabled: true,
  },
  {
    id: '5imx',
    name: '5iMX 模型论坛',
    nameEn: '5iMX',
    region: 'CN',
    baseUrl: 'https://bbs.5imx.com',
    categories: [
      {
        id: '5imx-portal',
        name: '门户资讯',
        nameEn: 'Portal News',
        url: 'https://bbs.5imx.com/portal.php',
        type: 'news',
      },
    ],
    language: 'zh',
    priority: 2,
    enabled: true,
  },
];

// 获取所有启用的源（按优先级排序）
export function getEnabledSources(): NewsSource[] {
  return NEWS_SOURCES
    .filter(source => source.enabled)
    .sort((a, b) => a.priority - b.priority);
}

// 获取指定区域的所有源
export function getSourcesByRegion(region: 'US' | 'CN'): NewsSource[] {
  return NEWS_SOURCES
    .filter(source => source.enabled && source.region === region)
    .sort((a, b) => a.priority - b.priority);
}

// 获取所有新闻类别的 URL
export function getNewsCategoryUrls(): { source: NewsSource; category: NewsSource['categories'][0] }[] {
  const result: { source: NewsSource; category: NewsSource['categories'][0] }[] = [];
  
  for (const source of getEnabledSources()) {
    for (const category of source.categories) {
      if (category.type === 'news' || category.type === 'press') {
        result.push({ source, category });
      }
    }
  }
  
  return result;
}

// 获取所有评测类别的 URL
export function getReviewCategoryUrls(): { source: NewsSource; category: NewsSource['categories'][0] }[] {
  const result: { source: NewsSource; category: NewsSource['categories'][0] }[] = [];
  
  for (const source of getEnabledSources()) {
    for (const category of source.categories) {
      if (category.type === 'review') {
        result.push({ source, category });
      }
    }
  }
  
  return result;
}
