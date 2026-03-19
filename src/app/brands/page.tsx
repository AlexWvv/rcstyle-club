import { Metadata } from 'next';
import BrandsPageClient from './BrandsPageClient';

export const metadata: Metadata = {
  title: '品牌导航',
  description: 'Rcstyle.club品牌导航，收录国内外知名RC遥控车品牌，包括整车品牌、电子设备、动力系统、配件工具等。涵盖Traxxas、Arrma、HBX、FMS、豹牌、好盈等品牌，提供官网链接、产品介绍、购买建议。',
  keywords: [
    // 核心品牌词
    'RC品牌',
    '遥控车品牌',
    'RC品牌大全',
    '遥控车品牌推荐',
    '模型车品牌',
    // 国际品牌
    'Traxxas',
    'Traxxas遥控车',
    'Arrma',
    'Arrma遥控车',
    'Axial',
    'Axial攀爬车',
    'Losi',
    'HPI',
    'Team Associated',
    // 国产品牌
    'HBX',
    '易控遥控车',
    'HBX遥控车',
    'FMS模型',
    'FMS攀爬车',
    '伟力遥控车',
    'WLtoys',
    '雷拉洛',
    'RLAARLO',
    'MJX',
    // 配件品牌
    '好盈电调',
    '豹牌电机',
    'Futaba遥控器',
    'Sanwa遥控器',
    // 购买词
    '遥控车哪个牌子好',
    'RC品牌排行',
    '国产遥控车品牌',
    '进口遥控车品牌',
  ],
  openGraph: {
    title: '品牌导航 | Rcstyle.club',
    description: '收录国内外知名RC遥控车品牌，提供官网链接、产品介绍、购买建议',
    url: 'https://rcstyle.club/brands',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '品牌导航 | Rcstyle.club',
    description: '收录国内外知名RC遥控车品牌',
  },
  alternates: {
    canonical: 'https://rcstyle.club/brands',
  },
};

export default function BrandsPage() {
  return <BrandsPageClient />;
}
