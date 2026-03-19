import { Metadata } from 'next';
import NewsPageClient from './NewsPageClient';

export const metadata: Metadata = {
  title: '资讯中心',
  description: 'Rcstyle.club资讯中心，提供最新的RC遥控车新闻、评测、赛事活动、技术分享等内容。涵盖Traxxas、Arrma、Axial等知名品牌的最新动态。',
  keywords: [
    // 核心资讯词
    'RC资讯',
    '遥控车新闻',
    'RC模型资讯',
    '遥控车资讯',
    'RC新闻',
    // 测评词
    'RC评测',
    '遥控车测评',
    '模型车评测',
    'RC车测评',
    '遥控车对比',
    // 新品词
    'RC新品',
    '遥控车新品发布',
    '新遥控车',
    'RC新车上市',
    // 赛事词
    'RC赛事',
    '遥控车比赛',
    'RC锦标赛',
    '模型车比赛',
    // 品牌+资讯
    'Traxxas新闻',
    'Arrma新品',
    'HBX评测',
    'FMS新品',
    // 技术词
    'RC教程',
    '遥控车改装',
    'RC技术分享',
    '遥控车维护',
  ],
  openGraph: {
    title: '资讯中心 | Rcstyle.club',
    description: '最新的RC遥控车新闻、评测、赛事活动、技术分享',
    url: 'https://rcstyle.club/news',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '资讯中心 | Rcstyle.club',
    description: '最新的RC遥控车新闻、评测、赛事活动、技术分享',
  },
  alternates: {
    canonical: 'https://rcstyle.club/news',
  },
};

export default function NewsPage() {
  return <NewsPageClient />;
}
