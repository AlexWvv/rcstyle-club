import { NextRequest, NextResponse } from 'next/server';
import { LLMClient, Config, HeaderUtils, FetchClient } from 'coze-coding-dev-sdk';
import { NEWS_SOURCES, getEnabledSources, NewsSource } from '@/data/news-sources';

// 分类映射
const CATEGORY_MAPPING: Record<string, { zh: string; en: string }> = {
  'news': { zh: '行业动态', en: 'Industry News' },
  'review': { zh: '评测对比', en: 'Reviews' },
  'tech': { zh: '技术分享', en: 'Tutorials' },
  'press': { zh: '新品发布', en: 'New Products' },
};

export async function POST(request: NextRequest) {
  try {
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const config = new Config();
    
    const llmClient = new LLMClient(config, customHeaders);
    const fetchClient = new FetchClient(config, customHeaders);
    
    // 获取请求参数
    const body = await request.json().catch(() => ({}));
    const { sourceId, maxArticles = 5 } = body;
    
    // 获取要抓取的源
    let sources = getEnabledSources();
    if (sourceId) {
      sources = sources.filter(s => s.id === sourceId);
    }
    
    const articles: any[] = [];
    
    // 遍历每个源进行抓取
    for (const source of sources) {
      // 随机选择一个类别进行抓取
      const category = source.categories[Math.floor(Math.random() * source.categories.length)];
      
      console.log(`正在抓取: ${source.name} - ${category.name}`);
      
      try {
        // 使用 FetchClient 抓取页面内容
        const fetchResult = await fetchClient.fetch(category.url);
        
        if (fetchResult.status_code !== 0 || !fetchResult.content) {
          console.log(`抓取失败: ${source.name} - ${category.name}, status: ${fetchResult.status_message}`);
          continue;
        }
        
        // 提取文本内容
        const textContent = fetchResult.content
          .filter(item => item.type === 'text')
          .map(item => item.text)
          .join('\n');
        
        if (!textContent || textContent.length < 100) {
          console.log(`内容不足: ${source.name} - ${category.name}`);
          continue;
        }
        
        // 使用 AI 解析页面内容并生成文章
        const generatedArticles = await generateArticlesFromContent(
          llmClient,
          textContent,
          source,
          category,
          maxArticles - articles.length
        );
        
        if (generatedArticles && generatedArticles.length > 0) {
          articles.push(...generatedArticles);
        }
        
        // 如果已经获取足够的文章，停止抓取
        if (articles.length >= maxArticles) {
          break;
        }
        
      } catch (error) {
        console.error(`抓取出错 (${source.name}):`, error);
        continue;
      }
    }
    
    // 如果定向抓取没有获取到文章，生成默认文章
    if (articles.length === 0) {
      console.log('定向抓取未获取到文章，生成默认文章');
      const defaultArticle = await generateDefaultArticle(llmClient);
      if (defaultArticle) {
        articles.push(defaultArticle);
      }
    }
    
    return NextResponse.json({
      success: true,
      source: 'targeted_fetch',
      articles: articles.slice(0, maxArticles),
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

// 从抓取的内容生成文章
async function generateArticlesFromContent(
  llmClient: LLMClient,
  content: string,
  source: NewsSource,
  category: NewsSource['categories'][0],
  maxArticles: number
): Promise<any[]> {
  const isEnglish = source.language === 'en';
  
  const systemPrompt = `You are a professional RC model news editor. Analyze the webpage content and extract news articles.

Rules:
1. Extract up to ${maxArticles} distinct news articles from the content
2. Each article MUST have BOTH Chinese and English versions
3. ${isEnglish ? 'The source is in English - translate to Chinese, keep original English' : 'The source is in Chinese - translate to English, keep original Chinese'}
4. Keep technical terms in English (like brand names: Traxxas, HBX, FMS, Axial, etc.)
5. Generate SEO-friendly titles and summaries
6. Add relevant RC model keywords and tags
7. Content should be informative and engaging
8. Use proper HTML formatting (h2, h3, ul, li, p tags) for content

Output JSON array format:
[
  {
    "title": "中文标题",
    "titleEn": "English Title",
    "summary": "中文摘要（2-3句话，50-80字）",
    "summaryEn": "English summary (2-3 sentences)",
    "content": "中文正文（HTML格式，300-500字）",
    "contentEn": "English content (HTML format, 200-400 words)",
    "category": "news/review/tech/press",
    "tags": ["中文标签1", "English tag1"]
  }
]`;

  const userPrompt = `Source Website: ${source.name} (${isEnglish ? 'English' : 'Chinese'})
Category: ${category.nameEn}
URL: ${category.url}

Webpage Content:
${content.substring(0, 6000)}

Extract news articles from this content. ${isEnglish ? 'Translate English to Chinese, keep original English.' : 'Translate Chinese to English, keep original Chinese.'}`;

  try {
    const response = await llmClient.invoke(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      { temperature: 0.7 }
    );
    
    const responseContent = response.content || '';
    
    // 尝试解析 JSON
    const jsonMatch = responseContent.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.log('AI 响应未包含有效的 JSON 数组');
      return [];
    }
    
    const parsedArticles = JSON.parse(jsonMatch[0]);
    
    // 格式化文章
    return parsedArticles.map((article: any, index: number) => ({
      id: `${source.id}-${Date.now()}-${index}`,
      title: article.title,
      titleEn: article.titleEn,
      summary: article.summary,
      summaryEn: article.summaryEn,
      content: article.content,
      contentEn: article.contentEn,
      coverImage: '/images/news-placeholder.jpg',
      category: CATEGORY_MAPPING[article.category]?.zh || '行业动态',
      categoryEn: CATEGORY_MAPPING[article.category]?.en || 'Industry News',
      author: source.name,
      authorEn: source.nameEn,
      publishDate: new Date().toISOString().split('T')[0],
      views: Math.floor(Math.random() * 500) + 100,
      tags: article.tags || [],
      isNew: true,
      sourceUrl: category.url,
    }));
    
  } catch (error) {
    console.error('Error generating articles:', error);
    return [];
  }
}

// 生成默认文章
async function generateDefaultArticle(llmClient: LLMClient): Promise<any | null> {
  const keywords = ['RC crawler', 'RC racing', 'RC drift car', 'RC truck'];
  const keyword = keywords[Math.floor(Math.random() * keywords.length)];
  
  const systemPrompt = `You are a professional RC model news writer. Generate a news article in both Chinese and English.`;
  
  const userPrompt = `Write an RC model news article about "${keyword}". 

Output in this JSON format:
{
  "title": "中文标题",
  "titleEn": "English Title",
  "summary": "中文摘要（2-3句话）",
  "summaryEn": "English summary (2-3 sentences)",
  "content": "中文正文HTML（300-500字）",
  "contentEn": "English content HTML (200-400 words)",
  "tags": ["中文标签", "English tag"]
}`;
  
  try {
    const response = await llmClient.invoke(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      { temperature: 0.7 }
    );
    
    const responseContent = response.content || '';
    const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      return null;
    }
    
    const article = JSON.parse(jsonMatch[0]);
    
    return {
      id: `default-${Date.now()}`,
      title: article.title,
      titleEn: article.titleEn,
      summary: article.summary,
      summaryEn: article.summaryEn,
      content: article.content,
      contentEn: article.contentEn,
      coverImage: '/images/news-placeholder.jpg',
      category: '行业动态',
      categoryEn: 'Industry News',
      author: 'RCstyle.club',
      authorEn: 'RCstyle.club',
      publishDate: new Date().toISOString().split('T')[0],
      views: Math.floor(Math.random() * 500) + 100,
      tags: article.tags || [],
      isNew: true,
    };
    
  } catch (error) {
    console.error('Default article generation error:', error);
    return null;
  }
}
