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
    
    // 过滤并验证文章数据，确保所有必要字段都存在
    const validArticles = articles.filter((article: any) => {
      return article && 
        article.id && 
        article.title && 
        article.summary;
    }).map((article: any) => ({
      id: article.id || `news-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: article.title || '',
      titleEn: article.titleEn || article.title || '',
      summary: article.summary || '',
      summaryEn: article.summaryEn || article.summary || '',
      content: article.content || article.summary || '',
      contentEn: article.contentEn || article.summaryEn || article.summary || '',
      coverImage: article.coverImage || '/images/news-placeholder.jpg',
      category: article.category || '行业动态',
      categoryEn: article.categoryEn || 'Industry News',
      author: article.author || 'RCstyle编辑',
      authorEn: article.authorEn || 'RCstyle Editor',
      publishDate: article.publishDate || new Date().toISOString().split('T')[0],
      views: article.views || Math.floor(Math.random() * 10000) + 1000,
      tags: Array.isArray(article.tags) ? article.tags : [],
      isNew: article.isNew !== undefined ? article.isNew : true,
      originalUrl: article.originalUrl || undefined,
    }));
    
    if (validArticles.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No valid articles to save',
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
    const newArticles = validArticles.filter((newArticle: any) => {
      return !existingArticles.some((existing: any) => 
        existing.title === newArticle.title || 
        existing.id === newArticle.id
      );
    });
    
    if (newArticles.length === 0) {
      return NextResponse.json({
        success: true,
        added: 0,
        total: existingArticles.length,
        message: 'No new articles to add (all duplicates)',
      });
    }
    
    // 限制资讯数量（保留最新的100条）
    const allArticles = [...newArticles, ...existingArticles].slice(0, 100);
    
    // 保存到JSON文件
    fs.writeFileSync(NEWS_FILE_PATH, JSON.stringify(allArticles, null, 2));
    
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
