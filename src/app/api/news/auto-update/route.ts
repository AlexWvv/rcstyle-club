import { NextRequest, NextResponse } from 'next/server';
import { LLMClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';
import fs from 'fs';
import path from 'path';

// 资讯数据文件路径
const NEWS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'news-generated.json');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { articles } = body;
    
    if (!articles || !Array.isArray(articles)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid articles data',
      }, { status: 400 });
    }
    
    // 读取现有资讯
    let existingArticles: any[] = [];
    try {
      const fileContent = fs.readFileSync(NEWS_FILE_PATH, 'utf-8');
      existingArticles = JSON.parse(fileContent);
    } catch (error) {
      // 文件不存在，创建新文件
      existingArticles = [];
    }
    
    // 合并新资讯（避免重复）
    const newArticles = articles.filter((newArticle: any) => {
      return !existingArticles.some((existing: any) => 
        existing.title === newArticle.title || 
        existing.titleEn === newArticle.titleEn
      );
    });
    
    // 限制资讯数量（保留最新的100条）
    const allArticles = [...newArticles, ...existingArticles].slice(0, 100);
    
    // 保存到文件
    fs.writeFileSync(NEWS_FILE_PATH, JSON.stringify(allArticles, null, 2));
    
    // 更新news.ts导出
    await updateNewsExport(allArticles);
    
    return NextResponse.json({
      success: true,
      added: newArticles.length,
      total: allArticles.length,
      message: `Successfully added ${newArticles.length} new articles`,
    });
    
  } catch (error) {
    console.error('Error saving articles:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

// 更新news.ts文件的导出
async function updateNewsExport(articles: any[]) {
  const newsDataPath = path.join(process.cwd(), 'src', 'data', 'news.ts');
  
  try {
    // 读取原始文件
    let originalContent = fs.readFileSync(newsDataPath, 'utf-8');
    
    // 找到newsData数组的位置
    const arrayStart = originalContent.indexOf('export const newsData: NewsArticle[] = [');
    const arrayEnd = originalContent.indexOf('];', arrayStart);
    
    if (arrayStart === -1 || arrayEnd === -1) {
      throw new Error('Could not find newsData array in file');
    }
    
    // 构建新的数组内容
    const arrayContent = articles.map(article => {
      return `  {
    id: '${article.id}',
    title: '${escapeString(article.title)}',
    titleEn: '${escapeString(article.titleEn)}',
    summary: '${escapeString(article.summary)}',
    summaryEn: '${escapeString(article.summaryEn)}',
    content: \`${article.content}\`,
    contentEn: \`${article.contentEn}\`,
    coverImage: '${article.coverImage}',
    ${article.images ? `images: ${JSON.stringify(article.images)},` : ''}
    ${article.video ? `video: ${JSON.stringify(article.video)},` : ''}
    category: '${article.category}',
    categoryEn: '${article.categoryEn}',
    author: '${article.author}',
    authorEn: '${article.authorEn}',
    publishDate: '${article.publishDate}',
    views: ${article.views},
    tags: ${JSON.stringify(article.tags)},
    isNew: ${article.isNew},
    ${article.originalUrl ? `originalUrl: '${article.originalUrl}',` : ''}
  }`;
    }).join(',\n');
    
    // 替换数组内容
    const newContent = originalContent.substring(0, arrayStart + 'export const newsData: NewsArticle[] = ['.length) +
      '\n' + arrayContent + '\n' +
      originalContent.substring(arrayEnd);
    
    // 写回文件
    fs.writeFileSync(newsDataPath, newContent);
    
  } catch (error) {
    console.error('Error updating news.ts:', error);
    throw error;
  }
}

// 转义字符串中的特殊字符
function escapeString(str: string): string {
  return str.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

// GET方法 - 获取生成的资讯列表
export async function GET(request: NextRequest) {
  try {
    const fileContent = fs.readFileSync(NEWS_FILE_PATH, 'utf-8');
    const articles = JSON.parse(fileContent);
    
    return NextResponse.json({
      success: true,
      articles,
      total: articles.length,
    });
    
  } catch (error) {
    // 文件不存在
    return NextResponse.json({
      success: true,
      articles: [],
      total: 0,
    });
  }
}
