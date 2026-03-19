'use client';

import { Suspense } from 'react';
import { AnalyticsScripts } from '@/lib/analytics/scripts';
import { usePageView } from '@/lib/analytics';

/**
 * 页面浏览追踪组件（需要 Suspense）
 */
function PageViewTracker() {
  usePageView();
  return null;
}

/**
 * 数据埋点组件
 * 包含 Google Analytics 4 + 百度统计
 */
export function Analytics() {
  return (
    <>
      {/* 使用 Suspense 包裹 useSearchParams 调用 */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      <AnalyticsScripts />
    </>
  );
}
