'use client';

import { useCallback, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { ANALYTICS_CONFIG, EVENT_CATEGORIES, type TrackEventParams } from './config';

// 声明全局类型
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    clarity?: (...args: any[]) => void;
  }
}

/**
 * 发送事件到 Google Analytics
 */
function sendToGA(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;
  
  if (ANALYTICS_CONFIG.googleAnalytics.enabled && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

/**
 * 发送事件到 Microsoft Clarity
 */
function sendToClarity(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;
  
  if (ANALYTICS_CONFIG.clarity.enabled && window.clarity) {
    window.clarity('event', eventName, params);
  }
}

/**
 * 发送事件到百度统计
 */
function sendToBaidu(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;
  
  if (ANALYTICS_CONFIG.baiduTongji.enabled && (window as any)._hmt) {
    (window as any)._hmt.push(['_trackEvent', eventName, params.category || '', params.label || '', params.value || '']);
  }
}

/**
 * 追踪事件（同时发送到 GA4、Clarity 和百度统计）
 */
export function trackEvent(params: TrackEventParams) {
  const { action, category, label, value, ...rest } = params;
  
  // 发送到 Google Analytics
  sendToGA(action, {
    event_category: category,
    event_label: label,
    value: value,
    ...rest,
  });
  
  // 发送到 Microsoft Clarity
  sendToClarity(action, {
    category,
    label,
    value,
    ...rest,
  });
  
  // 发送到百度统计
  sendToBaidu(action, {
    category,
    label,
    value,
    ...rest,
  });
  
  // 开发环境日志
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Event:', params);
  }
}

/**
 * 追踪页面浏览
 */
export function trackPageView(url: string, title?: string) {
  sendToGA('page_view', {
    page_path: url,
    page_title: title,
  });
  
  sendToClarity('page_view', {
    url,
    title,
  });
}

/**
 * 追踪品牌点击
 */
export function trackBrandClick(brandName: string, category: string) {
  trackEvent({
    action: 'click',
    category: EVENT_CATEGORIES.BRAND_CLICK,
    label: brandName,
    brand_category: category,
  });
}

/**
 * 追踪车型查看
 */
export function trackModelView(modelName: string, brand: string) {
  trackEvent({
    action: 'view',
    category: EVENT_CATEGORIES.MODEL_VIEW,
    label: modelName,
    brand: brand,
  });
}

/**
 * 追踪说明书下载
 */
export function trackManualDownload(modelName: string, brand: string) {
  trackEvent({
    action: 'download',
    category: EVENT_CATEGORIES.MANUAL_DOWNLOAD,
    label: modelName,
    brand: brand,
  });
}

/**
 * 追踪搜索
 */
export function trackSearch(query: string, type: string) {
  trackEvent({
    action: 'search',
    category: EVENT_CATEGORIES.SEARCH,
    label: query,
    search_type: type,
  });
}

/**
 * 追踪外链点击
 */
export function trackExternalLink(linkText: string, url: string) {
  trackEvent({
    action: 'click',
    category: EVENT_CATEGORIES.EXTERNAL_LINK_CLICK,
    label: linkText,
    link_url: url,
  });
}

/**
 * 追踪语言切换
 */
export function trackLanguageSwitch(from: string, to: string) {
  trackEvent({
    action: 'switch',
    category: EVENT_CATEGORIES.LANGUAGE_SWITCH,
    label: `${from} -> ${to}`,
    from_language: from,
    to_language: to,
  });
}

/**
 * 追踪按钮点击
 */
export function trackButtonClick(buttonName: string, location: string) {
  trackEvent({
    action: 'click',
    category: EVENT_CATEGORIES.BUTTON_CLICK,
    label: buttonName,
    location: location,
  });
}

/**
 * 追踪资讯查看
 */
export function trackNewsView(articleTitle: string, category: string) {
  trackEvent({
    action: 'view',
    category: EVENT_CATEGORIES.NEWS_VIEW,
    label: articleTitle,
    news_category: category,
  });
}

/**
 * 页面浏览追踪 Hook
 */
export function usePageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      trackPageView(url);
    }
  }, [pathname, searchParams]);
}

/**
 * 获取追踪函数的 Hook
 */
export function useAnalytics() {
  return {
    trackEvent,
    trackPageView,
    trackBrandClick,
    trackModelView,
    trackManualDownload,
    trackSearch,
    trackExternalLink,
    trackLanguageSwitch,
    trackButtonClick,
    trackNewsView,
  };
}
