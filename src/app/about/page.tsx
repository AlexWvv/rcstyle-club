import { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: '关于我们',
  description: 'Rcstyle.club是RC遥控车模型资源导航平台，致力于为RC爱好者提供品牌、资讯、博主、车型等一站式资源导航服务。',
  keywords: [
    // 品牌词
    'Rcstyle.club',
    'RC模型导航',
    '遥控车导航网站',
    // 平台介绍
    '关于我们',
    'RC爱好者社区',
    '遥控车资源平台',
    // 核心业务
    'RC汽车模型',
    '遥控车模型',
    'RC品牌导航',
    '遥控车资讯',
    // 目标用户
    'RC爱好者',
    '遥控车玩家',
    '模型车收藏',
    'RC新手入门',
  ],
  openGraph: {
    title: '关于我们 | Rcstyle.club',
    description: 'RC遥控车模型资源导航平台',
    url: 'https://rcstyle.club/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '关于我们 | Rcstyle.club',
    description: 'RC遥控车模型资源导航平台',
  },
  alternates: {
    canonical: 'https://rcstyle.club/about',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
