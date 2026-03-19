// 数据埋点配置
// 使用 Google Analytics 4 + Microsoft Clarity 免费方案

export const ANALYTICS_CONFIG = {
  // Google Analytics 4 配置
  // 注册步骤：
  // 1. 访问 https://analytics.google.com/
  // 2. 创建账号 -> 创建媒体资源 -> 获取衡量 ID (格式: G-XXXXXXXXXX)
  googleAnalytics: {
    enabled: true,
    // GA4 衡量 ID
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
  },
  
  // Microsoft Clarity 配置（国内可能无法访问）
  // 注册步骤：
  // 1. 访问 https://clarity.microsoft.com/
  // 2. 创建项目 -> 获取项目 ID
  clarity: {
    enabled: false,
    projectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || '',
  },

  // 百度统计配置（国内替代方案）
  // 注册步骤：
  // 1. 访问 https://tongji.baidu.com/
  // 2. 创建站点 -> 获取统计代码中的 ID
  baiduTongji: {
    enabled: !!process.env.NEXT_PUBLIC_BAIDU_TONGJI_ID,
    siteId: process.env.NEXT_PUBLIC_BAIDU_TONGJI_ID || '',
  },
};

// 事件追踪类别
export const EVENT_CATEGORIES = {
  // 页面浏览
  PAGE_VIEW: 'page_view',
  
  // 品牌相关
  BRAND_CLICK: 'brand_click',
  BRAND_CATEGORY_VIEW: 'brand_category_view',
  
  // 车型相关
  MODEL_VIEW: 'model_view',
  MODEL_SEARCH: 'model_search',
  MODEL_FILTER: 'model_filter',
  MANUAL_DOWNLOAD: 'manual_download',
  
  // 资讯相关
  NEWS_VIEW: 'news_view',
  NEWS_CATEGORY_CLICK: 'news_category_click',
  
  // 搜索相关
  SEARCH: 'search',
  SEARCH_TYPE_CHANGE: 'search_type_change',
  
  // 外链点击
  EXTERNAL_LINK_CLICK: 'external_link_click',
  
  // 用户交互
  BUTTON_CLICK: 'button_click',
  LANGUAGE_SWITCH: 'language_switch',
} as const;

// 事件追踪接口
export interface TrackEventParams {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: any;
}
