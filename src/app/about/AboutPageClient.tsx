'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { SeoKeywords } from '@/components/SeoKeywords';
import { useTranslation } from '@/lib/i18n/context';
import { 
  Mail, Globe, Users, Heart, Shield,
  Car, Youtube, Newspaper
} from 'lucide-react';

export default function AboutPageClient() {
  const { language } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* 标题区 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              {language === 'zh' ? '关于 Rcstyle.club' : 'About Rcstyle.club'}
            </h1>
            <p className="text-xl text-slate-400">
              {language === 'zh' ? 'RC遥控车模型资源导航平台' : 'RC Car Model Resource Navigation Platform'}
            </p>
          </div>

          {/* 使命愿景 */}
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Heart className="w-6 h-6 text-orange-400" />
                {language === 'zh' ? '我们的使命' : 'Our Mission'}
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                {language === 'zh' 
                  ? 'Rcstyle.club 致力于为全球RC遥控车爱好者提供一站式的资源导航服务。我们汇集国内外知名RC品牌、优质博主、最新资讯和热门车型，帮助玩家快速找到所需资源，享受RC模型带来的乐趣。'
                  : 'Rcstyle.club is dedicated to providing one-stop resource navigation for RC car enthusiasts worldwide. We bring together renowned domestic and international RC brands, quality bloggers, latest news, and popular models to help players quickly find the resources they need and enjoy the fun of RC models.'}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <Car className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-sm text-slate-400">{language === 'zh' ? '品牌收录' : 'Brands'}</div>
                </div>
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <Youtube className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">20+</div>
                  <div className="text-sm text-slate-400">{language === 'zh' ? '优质博主' : 'Vloggers'}</div>
                </div>
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <Newspaper className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">100+</div>
                  <div className="text-sm text-slate-400">{language === 'zh' ? '资讯文章' : 'Articles'}</div>
                </div>
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">5000+</div>
                  <div className="text-sm text-slate-400">{language === 'zh' ? '月访问量' : 'Monthly Visits'}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 功能介绍 */}
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                {language === 'zh' ? '平台功能' : 'Platform Features'}
              </h2>
              <div className="grid gap-4">
                <div className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-lg">
                  <Badge className="bg-orange-500/20 text-orange-400 shrink-0">{language === 'zh' ? '品牌' : 'Brand'}</Badge>
                  <div>
                    <h3 className="text-white font-medium mb-1">
                      {language === 'zh' ? '品牌导航' : 'Brand Directory'}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {language === 'zh' 
                        ? '收录国内外整车品牌、电子设备、动力系统、配件工具等分类，提供官网链接和产品介绍'
                        : 'Collection of domestic and international vehicle brands, electronics, power systems, accessories, with official links and product info'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-lg">
                  <Badge className="bg-red-500/20 text-red-400 shrink-0">{language === 'zh' ? '博主' : 'Vlogger'}</Badge>
                  <div>
                    <h3 className="text-white font-medium mb-1">
                      {language === 'zh' ? '博主推荐' : 'Vlogger Recommendations'}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {language === 'zh' 
                        ? '精选抖音、B站、YouTube等平台的优质RC博主，涵盖测评、教程、改装等内容'
                        : 'Selected quality RC bloggers on Douyin, Bilibili, YouTube, covering reviews, tutorials, modifications'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-lg">
                  <Badge className="bg-blue-500/20 text-blue-400 shrink-0">{language === 'zh' ? '资讯' : 'News'}</Badge>
                  <div>
                    <h3 className="text-white font-medium mb-1">
                      {language === 'zh' ? '资讯中心' : 'News Center'}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {language === 'zh' 
                        ? '自动抓取最新RC资讯，支持中英文双语，涵盖新品发布、评测对比、赛事活动等'
                        : 'Auto-fetch latest RC news, bilingual support, covering new releases, reviews, events'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-lg">
                  <Badge className="bg-green-500/20 text-green-400 shrink-0">{language === 'zh' ? '车型' : 'Model'}</Badge>
                  <div>
                    <h3 className="text-white font-medium mb-1">
                      {language === 'zh' ? '车型库' : 'RC Models Database'}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {language === 'zh' 
                        ? '热门RC车型数据库，提供参数对比、说明书下载、视频评测等资源'
                        : 'Popular RC model database with specs comparison, manual downloads, video reviews'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 联系方式 */}
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                {language === 'zh' ? '联系我们' : 'Contact Us'}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-300">contact@rcstyle.club</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-300">https://rcstyle.club</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 版权声明 */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-400" />
                {language === 'zh' ? '版权声明' : 'Copyright Notice'}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                {language === 'zh' 
                  ? '本站所有品牌Logo、商标及产品图片均归原品牌所有。内容来源于公开渠道，如有侵权请联系我们删除。本站仅提供导航服务，不销售任何产品。'
                  : 'All brand logos, trademarks, and product images on this site belong to their respective owners. Content is sourced from public channels. If there is any infringement, please contact us for removal. This site only provides navigation services and does not sell any products.'}
              </p>
            </CardContent>
          </Card>

          {/* SEO关键词 */}
          <SeoKeywords type="about" className="mt-8" />

          {/* 快捷导航 */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/">
              <Button variant="outline" className="border-slate-600 text-slate-300">
                {language === 'zh' ? '返回首页' : 'Back to Home'}
              </Button>
            </Link>
            <Link href="/brands">
              <Button variant="outline" className="border-slate-600 text-slate-300">
                {language === 'zh' ? '品牌导航' : 'Brand Directory'}
              </Button>
            </Link>
            <Link href="/vloggers">
              <Button variant="outline" className="border-slate-600 text-slate-300">
                {language === 'zh' ? '博主推荐' : 'Vloggers'}
              </Button>
            </Link>
            <Link href="/news">
              <Button variant="outline" className="border-slate-600 text-slate-300">
                {language === 'zh' ? '资讯中心' : 'News Center'}
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
