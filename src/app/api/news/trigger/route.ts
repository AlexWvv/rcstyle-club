import { NextRequest, NextResponse } from 'next/server';
import { SearchClient, LLMClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

// 获取基础 URL
function getBaseUrl(request: NextRequest): string {
  // 优先使用环境变量
  const domain = process.env.COZE_PROJECT_DOMAIN_DEFAULT;
  if (domain) {
    // 环境变量已包含 https:// 前缀
    if (domain.startsWith('http://') || domain.startsWith('https://')) {
      return domain;
    }
    return `https://${domain}`;
  }
  // 其次从请求头获取
  const host = request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  if (host) {
    return `${protocol}://${host}`;
  }
  // 开发环境默认
  return 'http://localhost:5000';
}

// 自动更新资讯（定时任务触发）
export async function POST(request: NextRequest) {
  try {
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const config = new Config();
    const baseUrl = getBaseUrl(request);
    
    // 验证触发密钥（可选，用于安全验证）
    const authHeader = request.headers.get('authorization');
    const triggerKey = process.env.AUTO_UPDATE_KEY || 'rcstyle-auto-update';
    
    if (authHeader !== `Bearer ${triggerKey}`) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized',
      }, { status: 401 });
    }
    
    // 调用抓取API
    const fetchUrl = `${baseUrl}/api/news/fetch`;
    const fetchResponse = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...customHeaders,
      },
    });
    
    const fetchResult = await fetchResponse.json();
    
    if (!fetchResult.success) {
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch news',
        details: fetchResult.error,
      });
    }
    
    // 保存新资讯
    const saveUrl = `${baseUrl}/api/news/auto-update`;
    const saveResponse = await fetch(saveUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...customHeaders,
      },
      body: JSON.stringify({
        articles: fetchResult.articles,
      }),
    });
    
    const saveResult = await saveResponse.json();
    
    // 生成sitemap
    await generateSitemap();
    
    // 生成RSS feed
    await generateRSSFeed();
    
    return NextResponse.json({
      success: true,
      fetched: fetchResult.total,
      saved: saveResult.added,
      total: saveResult.total,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Error in auto update trigger:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

// 生成sitemap
async function generateSitemap() {
  try {
    const baseUrl = 'https://rcstyle.club';
    
    // 获取所有资讯
    const newsResponse = await fetch(`${baseUrl}/api/news/auto-update`);
    const newsData = await newsResponse.json();
    
    const urls = [
      { loc: baseUrl, changefreq: 'daily', priority: '1.0' },
      { loc: `${baseUrl}/news`, changefreq: 'daily', priority: '0.9' },
      ...newsData.articles.map((article: any) => ({
        loc: `${baseUrl}/news/${article.id}`,
        changefreq: 'weekly',
        priority: '0.8',
        lastmod: new Date(article.publishDate).toISOString(),
      })),
    ];
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;
    
    // 这里可以将sitemap保存到文件系统或对象存储
    console.log('Sitemap generated successfully');
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

// 生成RSS feed
async function generateRSSFeed() {
  try {
    const baseUrl = 'https://rcstyle.club';
    
    // 获取最新资讯
    const newsResponse = await fetch(`${baseUrl}/api/news/auto-update`);
    const newsData = await newsResponse.json();
    
    const items = newsData.articles.slice(0, 20).map((article: any) => `
    <item>
      <title>${article.title}</title>
      <link>${baseUrl}/news/${article.id}</link>
      <description>${article.summary}</description>
      <pubDate>${new Date(article.publishDate).toUTCString()}</pubDate>
      <guid>${baseUrl}/news/${article.id}</guid>
    </item>`).join('\n');
    
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Rcstyle.club - RC Model News</title>
    <link>${baseUrl}</link>
    <description>Latest RC model news, reviews, and updates</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;
    
    // 这里可以将RSS保存到文件系统或对象存储
    console.log('RSS feed generated successfully');
    
  } catch (error) {
    console.error('Error generating RSS feed:', error);
  }
}

// GET方法 - 手动触发
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Use POST method with authorization header to trigger auto-update',
    timestamp: new Date().toISOString(),
  });
}
