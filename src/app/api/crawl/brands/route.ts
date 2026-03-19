import { NextRequest, NextResponse } from 'next/server';
import { SearchClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';
import fs from 'fs';
import path from 'path';

// 品牌产品数据文件路径
const BRANDS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'brand-products.json');

// 品牌搜索配置
const BRAND_QUERIES: Record<string, { query: string; brand: string; brandEn: string; region: string }> = {
  // 国际品牌
  'traxxas': { query: 'Traxxas RC car new products 2024', brand: 'Traxxas', brandEn: 'Traxxas', region: 'en' },
  'arrma': { query: 'Arrma RC car new products 2024', brand: 'Arrma', brandEn: 'Arrma', region: 'en' },
  'axial': { query: 'Axial RC crawler new products 2024', brand: 'Axial', brandEn: 'Axial', region: 'en' },
  'losi': { query: 'Losi RC car new products 2024', brand: 'Losi', brandEn: 'Losi', region: 'en' },
  'hpi': { query: 'HPI Racing RC car new products', brand: 'HPI Racing', brandEn: 'HPI Racing', region: 'en' },
  'team-associated': { query: 'Team Associated RC car new products', brand: 'Team Associated', brandEn: 'Team Associated', region: 'en' },
  
  // 国内品牌
  'hbx': { query: 'HBX 易控 遥控车 新品', brand: '易控 HBX', brandEn: 'HBX', region: 'zh' },
  'rlaarlo': { query: 'Rlaarlo 雷拉洛 遥控车 新品', brand: '雷拉洛 Rlaarlo', brandEn: 'Rlaarlo', region: 'zh' },
  'fms': { query: 'FMS模型 遥控车 新品', brand: 'FMS模型', brandEn: 'FMS Model', region: 'zh' },
  'wltoys': { query: '伟力 WLtoys 遥控车 新品', brand: '伟力 WLtoys', brandEn: 'WLtoys', region: 'zh' },
};

export async function POST(request: NextRequest) {
  try {
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const config = new Config();
    const client = new SearchClient(config, customHeaders);
    
    const body = await request.json().catch(() => ({}));
    const { brand, count = 10 } = body;
    
    let allProducts: any[] = [];
    
    if (brand && BRAND_QUERIES[brand]) {
      // 单个品牌抓取
      const queryConfig = BRAND_QUERIES[brand];
      const response = await client.webSearch(queryConfig.query, count, true);
      allProducts = parseSearchResults(response, queryConfig);
    } else {
      // 批量抓取所有品牌
      for (const [key, queryConfig] of Object.entries(BRAND_QUERIES)) {
        try {
          const response = await client.webSearch(queryConfig.query, 5, true);
          const products = parseSearchResults(response, queryConfig);
          allProducts = [...allProducts, ...products];
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
  
  return response.web_items.map((item: any) => ({
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
    publishDate: item.publish_time || new Date().toISOString().split('T')[0],
    originalUrl: item.url,
  }));
}

// 提取产品名称
function extractProductName(title: string): string {
  // 移除常见前缀
  let name = title
    .replace(/^(New|Latest|2024|Review|Test|News)[:\s-]*/i, '')
    .replace(/\s*\|\s*.*$/, '')
    .trim();
  
  return name.substring(0, 100);
}

// 提取产品图片（从内容中或使用默认）
function extractProductImage(item: any): string {
  // 默认使用分类相关图片
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
    
    return NextResponse.json({
      success: true,
      total: products.length,
      brandStats,
      lastUpdate: products.length > 0 ? products[0].publishDate : null,
      supportedBrands: Object.keys(BRAND_QUERIES),
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
