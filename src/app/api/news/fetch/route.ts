import { NextRequest, NextResponse } from 'next/server';
import { SearchClient, LLMClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

// 搜索关键词列表
const SEARCH_KEYWORDS = [
  'RC car news',
  'RC crawler latest',
  'RC racing events',
  'RC model reviews',
  'hobby RC news',
  'remote control car',
  'RC truck new release',
  'RC drift car',
  'Traxxas news',
  'HBX RC latest',
  'FMS model news',
  'Wltoys updates'
];

// 分类映射
const CATEGORY_MAPPING: Record<string, { zh: string; en: string }> = {
  'new product': { zh: '新品发布', en: 'New Products' },
  'review': { zh: '评测对比', en: 'Reviews' },
  'event': { zh: '赛事活动', en: 'Events' },
  'tutorial': { zh: '技术分享', en: 'Tutorials' },
  'industry': { zh: '行业动态', en: 'Industry News' },
};

export async function POST(request: NextRequest) {
  try {
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const config = new Config();
    
    // 初始化搜索客户端
    const searchClient = new SearchClient(config, customHeaders);
    const llmClient = new LLMClient(config, customHeaders);
    
    // 随机选择关键词搜索
    const keyword = SEARCH_KEYWORDS[Math.floor(Math.random() * SEARCH_KEYWORDS.length)];
    
    // 搜索最新资讯
    const searchResponse = await searchClient.advancedSearch(keyword, {
      searchType: 'web',
      count: 5,
      timeRange: '1w', // 最近一周
      needSummary: true,
      needContent: false,
    });
    
    if (!searchResponse.web_items || searchResponse.web_items.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No news found',
      });
    }
    
    // 处理搜索结果
    const articles = [];
    
    for (const item of searchResponse.web_items) {
      try {
        // 使用AI生成文章内容
        const generatedArticle = await generateArticle(llmClient, item);
        
        if (generatedArticle) {
          articles.push(generatedArticle);
        }
      } catch (error) {
        console.error('Error generating article:', error);
        // 继续处理其他文章
      }
    }
    
    return NextResponse.json({
      success: true,
      keyword,
      articles,
      total: articles.length,
    });
    
  } catch (error) {
    console.error('Error in news fetch API:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

// 使用AI生成文章内容
async function generateArticle(llmClient: LLMClient, searchItem: any) {
  const systemPrompt = `You are a professional RC model news writer. Generate a high-quality news article based on the provided search result.
  
Requirements:
1. Write in both Chinese and English
2. Include SEO-optimized title, summary, and content
3. Add relevant RC model keywords naturally
4. Content should be informative and engaging
5. Use proper HTML formatting (h2, h3, ul, p tags)

Output format (JSON):
{
  "title": "Chinese title",
  "titleEn": "English title",
  "summary": "Chinese summary (2-3 sentences)",
  "summaryEn": "English summary (2-3 sentences)",
  "content": "Chinese content in HTML format",
  "contentEn": "English content in HTML format",
  "category": "category type (new product/review/event/tutorial/industry)",
  "tags": ["tag1", "tag2", "tag3"],
  "keywords": ["keyword1", "keyword2", "keyword3"]
}`;

  const userPrompt = `Based on this search result, generate an RC model news article:

Title: ${searchItem.title}
URL: ${searchItem.url}
Snippet: ${searchItem.snippet}
${searchItem.summary ? `Summary: ${searchItem.summary}` : ''}

Generate a complete article with Chinese and English versions. Make it informative and SEO-friendly.`;

  try {
    const response = await llmClient.invoke([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ], {
      temperature: 0.7,
      model: 'doubao-seed-1-6-251015',
    });
    
    // 解析AI生成的JSON
    const jsonMatch = response.content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return null;
    }
    
    const article = JSON.parse(jsonMatch[0]);
    
    // 添加必要字段
    return {
      id: generateId(),
      title: article.title,
      titleEn: article.titleEn,
      summary: article.summary,
      summaryEn: article.summaryEn,
      content: article.content,
      contentEn: article.contentEn,
      coverImage: getPlaceholderImage(),
      category: CATEGORY_MAPPING[article.category]?.zh || '行业动态',
      categoryEn: CATEGORY_MAPPING[article.category]?.en || 'Industry News',
      author: 'RC News Bot',
      authorEn: 'RC News Bot',
      publishDate: new Date().toISOString(),
      views: Math.floor(Math.random() * 500) + 100,
      tags: article.tags || [],
      isNew: true,
      originalUrl: searchItem.url,
      keywords: article.keywords || [],
    };
    
  } catch (error) {
    console.error('Error in AI generation:', error);
    return null;
  }
}

// 生成唯一ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// 获取占位符图片
function getPlaceholderImage(): string {
  const images = [
    'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?w=800&h=400&fit=crop',
  ];
  return images[Math.floor(Math.random() * images.length)];
}

// GET方法 - 手动触发抓取
export async function GET(request: NextRequest) {
  return POST(request);
}
