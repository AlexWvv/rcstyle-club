'use client';

import Script from 'next/script';
import { ANALYTICS_CONFIG } from './config';

/**
 * Google Analytics 4 脚本组件
 */
export function GoogleAnalytics() {
  const { enabled, measurementId } = ANALYTICS_CONFIG.googleAnalytics;
  
  if (!enabled || !measurementId) {
    return null;
  }
  
  // 确保 ID 格式正确（G- 开头）
  const gaId = measurementId.startsWith('G-') ? measurementId : `G-${measurementId}`;
  
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}

/**
 * Microsoft Clarity 脚本组件
 */
export function MicrosoftClarity() {
  const { enabled, projectId } = ANALYTICS_CONFIG.clarity;
  
  if (!enabled || !projectId) {
    return null;
  }
  
  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${projectId}");
      `}
    </Script>
  );
}

/**
 * 百度统计脚本组件
 */
export function BaiduTongji() {
  const { enabled, siteId } = ANALYTICS_CONFIG.baiduTongji;
  
  if (!enabled || !siteId) {
    return null;
  }
  
  return (
    <Script id="baidu-tongji" strategy="afterInteractive">
      {`
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?${siteId}";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
      `}
    </Script>
  );
}

/**
 * 数据埋点脚本组件（统一导出）
 */
export function AnalyticsScripts() {
  return (
    <>
      <GoogleAnalytics />
      <MicrosoftClarity />
      <BaiduTongji />
    </>
  );
}
