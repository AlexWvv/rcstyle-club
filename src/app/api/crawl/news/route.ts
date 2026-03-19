import { NextRequest, NextResponse } from 'next/server';
import { SearchClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';
import fs from 'fs';
import path from 'path';

// 资讯数据文件路径
const NEWS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'news-generated.json');

// 新闻源配置 - 搜索最近1周内容
const NEWS_QUERIES = [
  // 国际新闻
  { query: 'RC car news Traxxas Arrma Axial', region: 'en', category: '新品发布', categoryEn: 'New Products' },
  { query: 'RC model review latest', region: 'en', category: '评测对比', categoryEn: 'Reviews' },
  { query: 'RC racing competition', region: 'en', category: '赛事活动', categoryEn: 'Events' },
  { query: 'RC crawler truck new release', region: 'en', category: '新品发布', categoryEn: 'New Products' },
  
  // 国内新闻
  { query: 'RC遥控车 新品 发布', region: 'zh', category: '新品发布', categoryEn: 'New Products' },
  { query: '攀爬车 越野车 评测', region: 'zh', category: '评测对比', categoryEn: 'Reviews' },
  { query: 'RC模型 行业动态 新闻', region: 'zh', category: '行业动态', categoryEn: 'Industry News' },
  { query: '遥控车 比赛 活动', region: 'zh', category: '赛事活动', categoryEn: 'Events' },
];

// 时间范围：1周
const TIME_RANGE = '1w';

export async function POST(request: NextRequest) {
  try {
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const config = new Config();
    const client = new SearchClient(config, customHeaders);
    
    const body = await request.json().catch(() => ({}));
    const { query, count = 10, timeRange = TIME_RANGE } = body;
    
    let allArticles: any[] = [];
    
    if (query) {
      // 单独查询模式 - 使用时间过滤
      const response = await client.advancedSearch(query, {
        count,
        needSummary: true,
        timeRange,
      });
      allArticles = parseSearchResults(response, query);
    } else {
      // 批量抓取模式 - 每个查询都使用时间过滤
      for (const newsQuery of NEWS_QUERIES) {
        try {
          const response = await client.advancedSearch(newsQuery.query, {
            count: 5,
            needSummary: true,
            timeRange,
          });
          const articles = parseSearchResults(response, newsQuery.query, newsQuery.category, newsQuery.categoryEn);
          
          // 过滤：只保留发布时间在1周内的文章
          const filteredArticles = filterByDate(articles, 7);
          allArticles = [...allArticles, ...filteredArticles];
          
          console.log(`[${newsQuery.category}] 搜索: "${newsQuery.query}", 获取: ${articles.length} 条, 过滤后: ${filteredArticles.length} 条`);
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
      timeRange: timeRange,
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
  
  return response.web_items.map((item: any) => {
    // 解析发布时间
    const publishDate = parsePublishDate(item.publish_time);
    
    return {
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
      publishDate: publishDate,
      views: Math.floor(Math.random() * 10000) + 1000,
      tags: extractTags(item.title + ' ' + item.snippet),
      isNew: true,
      originalUrl: item.url,
    };
  });
}

// 解析发布日期
function parsePublishDate(publishTime: string | undefined): string {
  if (!publishTime) {
    return new Date().toISOString().split('T')[0];
  }
  
  try {
    // 尝试解析各种日期格式
    const date = new Date(publishTime);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
  } catch {
    // 解析失败，使用当前日期
  }
  
  return new Date().toISOString().split('T')[0];
}

// 按日期过滤 - 只保留指定天数内的文章
function filterByDate(articles: any[], days: number): any[] {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  const cutoffStr = cutoffDate.toISOString().split('T')[0];
  
  return articles.filter(article => {
    const articleDate = article.publishDate;
    if (!articleDate) return true; // 没有日期的保留
    
    // 比较日期字符串（YYYY-MM-DD 格式可直接比较）
    return articleDate >= cutoffStr;
  });
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
    
    // 统计最近1周的文章数
    const recentArticles = filterByDate(articles, 7);
    
    return NextResponse.json({
      success: true,
      total: articles.length,
      recentWeek: recentArticles.length,
      lastUpdate: articles.length > 0 ? articles[0].publishDate : null,
      timeRange: TIME_RANGE,
      sources: NEWS_QUERIES.map(q => ({ query: q.query, category: q.category })),
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
