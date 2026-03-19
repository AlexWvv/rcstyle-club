import { NextRequest, NextResponse } from 'next/server';
import { SearchClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';
import fs from 'fs';
import path from 'path';

// 资讯数据文件路径
const NEWS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'news-generated.json');

// 新闻源配置
const NEWS_QUERIES = [
  // 国际新闻
  { query: 'RC car news Traxxas Arrma Axial', region: 'en', category: '新品发布', categoryEn: 'New Products' },
  { query: 'RC model review 2024', region: 'en', category: '评测对比', categoryEn: 'Reviews' },
  { query: 'RC racing competition 2024', region: 'en', category: '赛事活动', categoryEn: 'Events' },
  
  // 国内新闻
  { query: 'RC遥控车 新品 评测', region: 'zh', category: '新品发布', categoryEn: 'New Products' },
  { query: '攀爬车 越野车 RC模型', region: 'zh', category: '技术分享', categoryEn: 'Tutorials' },
  { query: 'RC模型 行业动态', region: 'zh', category: '行业动态', categoryEn: 'Industry News' },
];

export async function POST(request: NextRequest) {
  try {
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const config = new Config();
    const client = new SearchClient(config, customHeaders);
    
    const body = await request.json().catch(() => ({}));
    const { query, count = 10 } = body;
    
    let allArticles: any[] = [];
    
    if (query) {
      // 单独查询模式
      const response = await client.webSearch(query, count, true);
      allArticles = parseSearchResults(response, query);
    } else {
      // 批量抓取模式
      for (const newsQuery of NEWS_QUERIES) {
        try {
          const response = await client.webSearch(
            newsQuery.query, 
            5, 
            true
          );
          const articles = parseSearchResults(response, newsQuery.query, newsQuery.category, newsQuery.categoryEn);
          allArticles = [...allArticles, ...articles];
        } catch (error) {
          console.error(`Error fetching ${newsQuery.query}:`, error);
        }
      }
    }
    
    // 去重
    const uniqueArticles = deduplicateArticles(allArticles);
    
    // 保存到文件
    if (uniqueArticles.length > 0) {
      await saveArticles(uniqueArticles);
    }
    
    return NextResponse.json({
      success: true,
      fetched: allArticles.length,
      saved: uniqueArticles.length,
      articles: uniqueArticles.slice(0, 10),
    });
    
  } catch (error) {
    console.error('Crawl error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

// 解析搜索结果
function parseSearchResults(response: any, query: string, category = '行业动态', categoryEn = 'Industry News'): any[] {
  if (!response.web_items || response.web_items.length === 0) {
    return [];
  }
  
  return response.web_items.map((item: any, index: number) => ({
    id: `news-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: item.title || '',
    titleEn: item.title || '',
    summary: item.snippet || item.summary || '',
    summaryEn: item.snippet || item.summary || '',
    content: item.content || item.snippet || '',
    contentEn: item.content || item.snippet || '',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    category: category,
    categoryEn: categoryEn,
    author: item.site_name || 'RCstyle编辑',
    authorEn: item.site_name || 'RCstyle Editor',
    publishDate: item.publish_time || new Date().toISOString().split('T')[0],
    views: Math.floor(Math.random() * 10000) + 1000,
    tags: extractTags(item.title + ' ' + item.snippet),
    isNew: true,
    originalUrl: item.url,
  }));
}

// 提取标签
function extractTags(text: string): string[] {
  const tagKeywords = [
    'Traxxas', 'Arrma', 'Axial', 'Losi', 'HPI', 'HBX', 'FMS', 'Rlaarlo',
    '攀爬车', '越野车', '大脚车', '漂移车', '房车',
    'Crawler', 'Off-road', 'Monster Truck', 'Drift', 'Touring',
    '锂电池', '无刷电机', '电调', '遥控器',
    '新品', '评测', '改装', '比赛'
  ];
  
  const tags: string[] = [];
  const lowerText = text.toLowerCase();
  
  for (const keyword of tagKeywords) {
    if (lowerText.includes(keyword.toLowerCase())) {
      tags.push(keyword);
    }
  }
  
  return tags.slice(0, 5);
}

// 去重
function deduplicateArticles(articles: any[]): any[] {
  const seen = new Set<string>();
  return articles.filter(article => {
    const key = article.title.toLowerCase().trim();
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

// 保存文章
async function saveArticles(newArticles: any[]): Promise<void> {
  let existingArticles: any[] = [];
  
  try {
    const fileContent = fs.readFileSync(NEWS_FILE_PATH, 'utf-8');
    existingArticles = JSON.parse(fileContent);
  } catch (error) {
    // 文件不存在
  }
  
  // 合并并去重
  const allArticles = [...newArticles, ...existingArticles];
  const uniqueArticles = deduplicateArticles(allArticles);
  
  // 保留最新100条
  const finalArticles = uniqueArticles.slice(0, 100);
  
  fs.writeFileSync(NEWS_FILE_PATH, JSON.stringify(finalArticles, null, 2));
}

// GET方法 - 获取抓取状态
export async function GET(request: NextRequest) {
  try {
    let articles: any[] = [];
    
    try {
      const fileContent = fs.readFileSync(NEWS_FILE_PATH, 'utf-8');
      articles = JSON.parse(fileContent);
    } catch (error) {
      // 文件不存在
    }
    
    return NextResponse.json({
      success: true,
      total: articles.length,
      lastUpdate: articles.length > 0 ? articles[0].publishDate : null,
      sources: NEWS_QUERIES.map(q => q.query),
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
