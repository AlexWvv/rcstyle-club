import { Metadata } from 'next';
import VloggersPageClient from './VloggersPageClient';

export const metadata: Metadata = {
  title: '博主推荐',
  description: 'Rcstyle.club博主推荐，收录国内外优质RC遥控车视频博主、KOL。包括抖音、B站、YouTube等平台的RC测评、教程、改装分享博主，帮助爱好者找到优质内容创作者。',
  keywords: [
    // 核心博主词
    'RC博主',
    '遥控车博主',
    'RC测评博主',
    '遥控车UP主',
    'RC KOL',
    // 平台词
    '抖音RC博主',
    'B站遥控车博主',
    'YouTube RC',
    'B站遥控车UP主',
    '小红书遥控车',
    // 内容词
    'RC测评',
    '遥控车测评视频',
    'RC教程',
    '遥控车改装教程',
    'RC开箱',
    '遥控车评测',
    'RC试跑',
    // 车型+博主
    '攀爬车博主',
    '越野车博主',
    '大脚车博主',
    '漂移车博主',
    // 关注词
    'RC博主推荐',
    '遥控车博主排行',
    '必关注的RC博主',
  ],
  openGraph: {
    title: '博主推荐 | Rcstyle.club',
    description: '收录国内外优质RC遥控车视频博主、KOL，提供测评、教程、改装分享',
    url: 'https://rcstyle.club/vloggers',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '博主推荐 | Rcstyle.club',
    description: '收录国内外优质RC遥控车视频博主',
  },
  alternates: {
    canonical: 'https://rcstyle.club/vloggers',
  },
};

export default function VloggersPage() {
  return <VloggersPageClient />;
}
