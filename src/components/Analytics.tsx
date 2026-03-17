'use client';

import { GoogleAnalytics } from '@next/third-parties/google';

export function Analytics() {
  // 只在配置了 GA ID 时才加载
  if (!process.env.NEXT_PUBLIC_GA_ID) {
    return null;
  }
  
  return <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />;
}
