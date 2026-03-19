'use client';

import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/lib/i18n/context';
import { Flame } from 'lucide-react';

interface SeoKeywordsProps {
  type: 'home' | 'news' | 'brands' | 'vloggers' | 'models' | 'about';
  className?: string;
}

// 关键词数据定义
const seoKeywordsData: Record<string, Array<{ text: string; en: string }>> = {
  home: [
    { text: 'RC遥控车', en: 'RC Remote Control Car' },
    { text: '遥控车模型', en: 'RC Car Model' },
    { text: '攀爬车', en: 'RC Crawler' },
    { text: '越野车', en: 'RC Off-road' },
    { text: '大脚车', en: 'Monster Truck' },
    { text: 'HBX遥控车', en: 'HBX RC Car' },
    { text: 'Traxxas', en: 'Traxxas' },
    { text: 'Arrma', en: 'Arrma' },
    { text: '入门遥控车推荐', en: 'Beginner RC Car Guide' },
    { text: '遥控车哪个牌子好', en: 'Best RC Car Brands' },
  ],
  news: [
    { text: 'RC资讯', en: 'RC News' },
    { text: '遥控车测评', en: 'RC Car Review' },
    { text: 'RC评测', en: 'RC Review' },
    { text: '遥控车新品', en: 'New RC Cars' },
    { text: 'RC赛事', en: 'RC Racing Events' },
    { text: '遥控车比赛', en: 'RC Competition' },
    { text: 'RC教程', en: 'RC Tutorial' },
    { text: '遥控车改装', en: 'RC Car Modification' },
    { text: 'Traxxas新闻', en: 'Traxxas News' },
    { text: 'Arrma评测', en: 'Arrma Review' },
  ],
  brands: [
    { text: 'RC品牌', en: 'RC Brands' },
    { text: '遥控车品牌大全', en: 'RC Brand Directory' },
    { text: 'HBX易控', en: 'HBX RC' },
    { text: 'FMS模型', en: 'FMS Model' },
    { text: '伟力遥控车', en: 'WLtoys RC' },
    { text: '雷拉洛', en: 'Rlaarlo' },
    { text: 'Axial攀爬车', en: 'Axial Crawler' },
    { text: '好盈电调', en: 'Hobbywing ESC' },
    { text: '国产遥控车品牌', en: 'Chinese RC Brands' },
    { text: '进口遥控车品牌', en: 'Import RC Brands' },
  ],
  vloggers: [
    { text: 'RC博主', en: 'RC Vlogger' },
    { text: '遥控车UP主', en: 'RC YouTuber' },
    { text: '抖音RC博主', en: 'Douyin RC Creator' },
    { text: 'B站遥控车', en: 'Bilibili RC' },
    { text: 'RC测评', en: 'RC Review' },
    { text: '遥控车视频', en: 'RC Car Video' },
    { text: '攀爬车博主', en: 'Crawler Vlogger' },
    { text: 'RC开箱', en: 'RC Unboxing' },
    { text: '遥控车改装教程', en: 'RC Mod Tutorial' },
    { text: 'RC博主推荐', en: 'RC Vlogger Recommendation' },
  ],
  models: [
    { text: 'RC车型库', en: 'RC Models Database' },
    { text: '攀爬车推荐', en: 'Crawler Recommendation' },
    { text: '越野车推荐', en: 'Off-road Recommendation' },
    { text: '大脚车推荐', en: 'Monster Truck Guide' },
    { text: '漂移车', en: 'Drift Car' },
    { text: 'RC说明书下载', en: 'RC Manual Download' },
    { text: '遥控车参数', en: 'RC Car Specs' },
    { text: '1/10遥控车', en: '1/10 Scale RC' },
    { text: '1/8遥控车', en: '1/8 Scale RC' },
    { text: '入门遥控车', en: 'Entry Level RC' },
  ],
  about: [
    { text: 'Rcstyle.club', en: 'Rcstyle.club' },
    { text: 'RC模型导航', en: 'RC Model Directory' },
    { text: '遥控车资源', en: 'RC Resources' },
    { text: 'RC爱好者', en: 'RC Enthusiast' },
    { text: '遥控车玩家社区', en: 'RC Community' },
  ],
};

export function SeoKeywords({ type, className = '' }: SeoKeywordsProps) {
  const { t, language } = useTranslation();
  
  const keywords = seoKeywordsData[type];
  const hotKeywords = language === 'zh' ? '热门关键词' : 'Hot Keywords';
  
  if (!keywords || !Array.isArray(keywords)) {
    return null;
  }
  
  return (
    <div className={`py-6 border-t border-slate-700/50 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-4 h-4 text-orange-400" />
        <span className="text-sm font-medium text-slate-300">{hotKeywords}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <Badge
            key={index}
            variant="outline"
            className="border-slate-600 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300 transition-colors cursor-default"
          >
            {language === 'zh' ? keyword.text : keyword.en}
          </Badge>
        ))}
      </div>
    </div>
  );
}
