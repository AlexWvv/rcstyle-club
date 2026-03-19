// 客户端搜索封装 - 使用Fuse.js实现模糊搜索
import Fuse, { IFuseOptions } from 'fuse.js';
import { getAllNews } from '@/data/news';
import { categories } from '@/data/rc-resources';

// 搜索结果类型
export interface SearchResult {
  type: 'brand' | 'news' | 'vlogger';
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  url: string;
  category?: string;
  categoryEn?: string;
  image?: string;
  tags?: string[];
}

// 品牌数据转换
function extractBrands() {
  const brands: SearchResult[] = [];
  
  categories.forEach(category => {
    category.brands.forEach(brand => {
      brands.push({
        type: 'brand',
        id: brand.name.toLowerCase().replace(/\s+/g, '-'),
        title: brand.name,
        titleEn: brand.nameEn || brand.name,
        description: brand.description,
        descriptionEn: brand.descriptionEn || brand.description,
        url: `/brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}`,
        category: category.title,
        categoryEn: category.titleEn,
        image: brand.logo,
        tags: brand.models || []
      });
    });
  });
  
  return brands;
}

// 资讯数据转换
function extractNews(): SearchResult[] {
  const newsData = getAllNews();
  return newsData.map(news => ({
    type: 'news' as const,
    id: news.id,
    title: news.title,
    titleEn: news.titleEn,
    description: news.summary,
    descriptionEn: news.summaryEn,
    url: `/news/${news.id}`,
    category: news.category,
    categoryEn: news.categoryEn,
    image: news.coverImage,
    tags: news.tags
  }));
}

// 博主数据转换（待实现）
function extractVloggers(): SearchResult[] {
  // TODO: 从数据源提取博主信息
  return [];
}

// 合并所有可搜索数据
function getAllSearchableData(): SearchResult[] {
  return [
    ...extractBrands(),
    ...extractNews(),
    ...extractVloggers()
  ];
}

// Fuse.js 配置
const fuseOptions: IFuseOptions<SearchResult> = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'titleEn', weight: 0.4 },
    { name: 'description', weight: 0.2 },
    { name: 'descriptionEn', weight: 0.2 },
    { name: 'tags', weight: 0.15 },
    { name: 'category', weight: 0.05 }
  ],
  threshold: 0.4, // 匹配阈值，越小越严格
  includeScore: true,
  includeMatches: true,
  findAllMatches: true,
  minMatchCharLength: 1,
  ignoreLocation: true,
  useExtendedSearch: false
};

// 创建搜索引擎实例（单例模式）
let fuseInstance: Fuse<SearchResult> | null = null;

export function getSearchEngine(): Fuse<SearchResult> {
  if (!fuseInstance) {
    const data = getAllSearchableData();
    fuseInstance = new Fuse(data, fuseOptions);
  }
  return fuseInstance;
}

// 搜索函数
export function search(query: string, limit: number = 20): SearchResult[] {
  if (!query || query.trim().length === 0) {
    return [];
  }
  
  const fuse = getSearchEngine();
  const results = fuse.search(query.trim(), { limit });
  
  return results.map(result => result.item);
}

// 按类型搜索
export function searchByType(
  query: string, 
  type: 'brand' | 'news' | 'vlogger' | 'all' = 'all',
  limit: number = 20
): SearchResult[] {
  const results = search(query, limit * 2); // 多获取一些，再过滤
  
  if (type === 'all') {
    return results.slice(0, limit);
  }
  
  return results.filter(item => item.type === type).slice(0, limit);
}

// 获取热门搜索关键词
export function getHotKeywords(): string[] {
  return [
    'HBX',
    'HBX 16889',
    'RC爬车',
    '攀爬车',
    '遥控车推荐',
    '入门RC',
    'Traxxas',
    '新品发布',
    '赛事活动'
  ];
}

// 搜索建议（自动补全）
export function getSuggestions(query: string, limit: number = 5): string[] {
  if (!query || query.trim().length < 2) {
    return getHotKeywords().slice(0, limit);
  }
  
  const fuse = getSearchEngine();
  const results = fuse.search(query.trim(), { limit });
  
  return results.map(result => result.item.title);
}
