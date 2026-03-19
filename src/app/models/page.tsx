import { Metadata } from 'next';
import ModelsPageClient from './ModelsPageClient';

export const metadata: Metadata = {
  title: '车型库',
  description: 'Rcstyle.club车型库，收录热门RC遥控车型，包括攀爬车、越野车、大脚车、漂移车等。提供详细参数、说明书下载、视频评测等资源。涵盖Traxxas、Arrma、HBX、FMS等品牌。',
  keywords: [
    // 核心车型词
    'RC车型库',
    '遥控车型大全',
    'RC车型',
    '遥控车型推荐',
    '模型车型',
    // 车型分类
    '攀爬车',
    'RC攀爬车',
    '越野车',
    'RC越野车',
    '大脚车',
    'RC大脚车',
    '漂移车',
    'RC漂移车',
    '短卡',
    'RC短卡',
    '仿真车',
    'RC房车',
    // 品牌+车型
    'Traxxas车型',
    'Arrma车型',
    'HBX车型',
    'FMS车型',
    'Axial车型',
    // 功能词
    'RC说明书',
    '遥控车说明书',
    'RC参数',
    '遥控车参数',
    'RC配置',
    // 购买词
    '攀爬车推荐',
    '越野车推荐',
    '大脚车推荐',
    '入门遥控车推荐',
    // 比例词
    '1/10遥控车',
    '1/8遥控车',
    '1/5遥控车',
  ],
  openGraph: {
    title: '车型库 | Rcstyle.club',
    description: '热门RC遥控车型大全，攀爬车、越野车、大脚车、漂移车应有尽有',
    url: 'https://rcstyle.club/models',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '车型库 | Rcstyle.club',
    description: '热门RC遥控车型大全',
  },
  alternates: {
    canonical: 'https://rcstyle.club/models',
  },
};

export default function ModelsPage() {
  return <ModelsPageClient />;
}
