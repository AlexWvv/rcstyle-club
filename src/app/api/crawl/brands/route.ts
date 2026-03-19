import { NextRequest, NextResponse } from 'next/server';
import { SearchClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';
import fs from 'fs';
import path from 'path';

// 品牌产品数据文件路径
const BRANDS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'brand-products.json');

// 品牌搜索配置 - 搜索最近1周的新品
const BRAND_QUERIES: Record<string, { query: string; brand: string; brandEn: string; region: string }> = {
  // 国际品牌
  'traxxas': { query: 'Traxxas RC car new release latest', brand: 'Traxxas', brandEn: 'Traxxas', region: 'en' },
  'arrma': { query: 'Arrma RC car new release latest', brand: 'Arrma', brandEn: 'Arrma', region: 'en' },
  'axial': { query: 'Axial RC crawler new release latest', brand: 'Axial', brandEn: 'Axial', region: 'en' },
  'losi': { query: 'Losi RC car new release latest', brand: 'Losi', brandEn: 'Losi', region: 'en' },
  'hpi': { query: 'HPI Racing RC car new release latest', brand: 'HPI Racing', brandEn: 'HPI Racing', region: 'en' },
  'team-associated': { query: 'Team Associated RC car new release', brand: 'Team Associated', brandEn: 'Team Associated', region: 'en' },
  
  // 国内品牌
  'hbx': { query: 'HBX 易控 遥控车 新品 发布', brand: '易控 HBX', brandEn: 'HBX', region: 'zh' },
  'rlaarlo': { query: 'Rlaarlo 雷拉洛 遥控车 新品 发布', brand: '雷拉洛 Rlaarlo', brandEn: 'Rlaarlo', region: 'zh' },
  'fms': { query: 'FMS模型 遥控车 新品 发布', brand: 'FMS模型', brandEn: 'FMS Model', region: 'zh' },
  'wltoys': { query: '伟力 WLtoys 遥控车 新品 发布', brand: '伟力 WLtoys', brandEn: 'WLtoys', region: 'zh' },
};

// 时间范围：1周
const TIME_RANGE = '1w';

export async function POST(request: NextRequest) {
  try {
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const config = new Config();
    const client = new SearchClient(config, customHeaders);
    
    const body = await request.json().catch(() => ({}));
    const { brand, count = 10, timeRange = TIME_RANGE } = body;
    
    let allProducts: any[] = [];
    
    if (brand && BRAND_QUERIES[brand]) {
      // 单个品牌抓取 - 使用时间过滤
      const queryConfig = BRAND_QUERIES[brand];
      const response = await client.advancedSearch(queryConfig.query, {
        count,
        needSummary: true,
        timeRange,
      });
      const products = parseSearchResults(response, queryConfig);
      allProducts = filterByDate(products, 7);
      
      console.log(`[${queryConfig.brand}] 搜索: "${queryConfig.query}", 获取: ${products.length} 条, 过滤后: ${allProducts.length} 条`);
    } else {
      // 批量抓取所有品牌 - 每个查询都使用时间过滤
      for (const [key, queryConfig] of Object.entries(BRAND_QUERIES)) {
        try {
          const response = await client.advancedSearch(queryConfig.query, {
            count: 5,
            needSummary: true,
            timeRange,
          });
          const products = parseSearchResults(response, queryConfig);
          
          // 过滤：只保留发布时间在1周内的产品
          const filteredProducts = filterByDate(products, 7);
          allProducts = [...allProducts, ...filteredProducts];
          
          console.log(`[${queryConfig.brand}] 搜索: "${queryConfig.query}", 获取: ${products.length} 条, 过滤后: ${filteredProducts.length} 条`);
        } catch (error) {
          console.error(`Error fetching ${key}:`, error);
        }
      }
    }
    
    // 去重
    const uniqueProducts = deduplicateProducts(allProducts);
    
    // 保存到文件
    if (uniqueProducts.length > 0) {
      await saveProducts(uniqueProducts);
    }
    
    return NextResponse.json({
      success: true,
      fetched: allProducts.length,
      saved: uniqueProducts.length,
      timeRange: timeRange,
      products: uniqueProducts.slice(0, 10),
    });
    
  } catch (error) {
    console.error('Crawl error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

// 解析搜索结果为产品数据
function parseSearchResults(response: any, queryConfig: { brand: string; brandEn: string; region: string }): any[] {
  if (!response.web_items || response.web_items.length === 0) {
    return [];
  }
  
  return response.web_items.map((item: any) => {
    const publishDate = parsePublishDate(item.publish_time);
    
    return {
      id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: extractProductName(item.title),
      nameEn: extractProductName(item.title),
      brand: queryConfig.brand,
      brandEn: queryConfig.brandEn,
      description: item.snippet || item.summary || '',
      descriptionEn: item.snippet || item.summary || '',
      image: extractProductImage(item),
      category: guessProductCategory(item.title + ' ' + item.snippet),
      categoryEn: guessProductCategoryEn(item.title + ' ' + item.snippet),
      price: '',
      priceRange: '',
      specs: {},
      features: extractFeatures(item.title + ' ' + item.snippet),
      isNew: true,
      publishDate: publishDate,
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
    const date = new Date(publishTime);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
  } catch {
    // 解析失败，使用当前日期
  }
  
  return new Date().toISOString().split('T')[0];
}

// 按日期过滤 - 只保留指定天数内的产品
function filterByDate(products: any[], days: number): any[] {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  const cutoffStr = cutoffDate.toISOString().split('T')[0];
  
  return products.filter(product => {
    const productDate = product.publishDate;
    if (!productDate) return true; // 没有日期的保留
    
    return productDate >= cutoffStr;
  });
}

// 提取产品名称
function extractProductName(title: string): string {
  // 移除常见前缀
  let name = title
    .replace(/^(New|Latest|2024|2025|Review|Test|News)[:\s-]*/i, '')
    .replace(/\s*\|\s*.*$/, '')
    .trim();
  
  return name.substring(0, 100);
}

// 提取产品图片
function extractProductImage(item: any): string {
  const defaultImages = [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop',
  ];
  
  return defaultImages[Math.floor(Math.random() * defaultImages.length)];
}

// 猜测产品类别
function guessProductCategory(text: string): string {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('crawler') || lowerText.includes('攀爬')) return '攀爬车';
  if (lowerText.includes('buggy') || lowerText.includes('越野')) return '越野车';
  if (lowerText.includes('monster') || lowerText.includes('大脚')) return '大脚车';
  if (lowerText.includes('drift') || lowerText.includes('漂移')) return '漂移车';
  if (lowerText.includes('touring') || lowerText.includes('房车')) return '房车';
  if (lowerText.includes('truck') || lowerText.includes('卡车')) return '卡车';
  if (lowerText.includes('short course') || lowerText.includes('sc')) return '短卡';
  
  return '其他车型';
}

function guessProductCategoryEn(text: string): string {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('crawler') || lowerText.includes('攀爬')) return 'Crawler';
  if (lowerText.includes('buggy') || lowerText.includes('越野')) return 'Buggy';
  if (lowerText.includes('monster') || lowerText.includes('大脚')) return 'Monster Truck';
  if (lowerText.includes('drift') || lowerText.includes('漂移')) return 'Drift';
  if (lowerText.includes('touring') || lowerText.includes('房车')) return 'Touring Car';
  if (lowerText.includes('truck') || lowerText.includes('卡车')) return 'Truck';
  if (lowerText.includes('short course') || lowerText.includes('sc')) return 'Short Course';
  
  return 'Other';
}

// 提取产品特性
function extractFeatures(text: string): string[] {
  const featureKeywords = [
    '4WD', '4X4', 'RTR', 'Kit', 'Brushless', '无刷', 
    'Waterproof', '防水', 'LiPo', '锂电池',
    '2.4GHz', 'High Speed', '高速', 
    'Scale', '比例', 'Ready to Run',
  ];
  
  const features: string[] = [];
  const lowerText = text.toLowerCase();
  
  for (const keyword of featureKeywords) {
    if (lowerText.includes(keyword.toLowerCase())) {
      features.push(keyword);
    }
  }
  
  return features.slice(0, 5);
}

// 去重
function deduplicateProducts(products: any[]): any[] {
  const seen = new Set<string>();
  return products.filter(product => {
    const key = `${product.brand}-${product.name}`.toLowerCase().trim();
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

// 保存产品
async function saveProducts(newProducts: any[]): Promise<void> {
  let existingProducts: any[] = [];
  
  try {
    const fileContent = fs.readFileSync(BRANDS_FILE_PATH, 'utf-8');
    existingProducts = JSON.parse(fileContent);
  } catch (error) {
    // 文件不存在
  }
  
  // 合并并去重
  const allProducts = [...newProducts, ...existingProducts];
  const uniqueProducts = deduplicateProducts(allProducts);
  
  // 保留最新200条
  const finalProducts = uniqueProducts.slice(0, 200);
  
  fs.writeFileSync(BRANDS_FILE_PATH, JSON.stringify(finalProducts, null, 2));
}

// GET方法 - 获取抓取状态
export async function GET(request: NextRequest) {
  try {
    let products: any[] = [];
    
    try {
      const fileContent = fs.readFileSync(BRANDS_FILE_PATH, 'utf-8');
      products = JSON.parse(fileContent);
    } catch (error) {
      // 文件不存在
    }
    
    // 按品牌统计
    const brandStats: Record<string, number> = {};
    for (const product of products) {
      const brand = product.brand || 'Unknown';
      brandStats[brand] = (brandStats[brand] || 0) + 1;
    }
    
    // 统计最近1周的产品数
    const recentProducts = filterByDate(products, 7);
    
    return NextResponse.json({
      success: true,
      total: products.length,
      recentWeek: recentProducts.length,
      brandStats,
      lastUpdate: products.length > 0 ? products[0].publishDate : null,
      timeRange: TIME_RANGE,
      supportedBrands: Object.keys(BRAND_QUERIES),
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
