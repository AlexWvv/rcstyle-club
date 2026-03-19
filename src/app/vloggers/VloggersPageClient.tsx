'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Youtube, ArrowLeft } from 'lucide-react';
import { vloggers } from '@/data/rc-resources';
import { useTranslation } from '@/lib/i18n/context';
import { Header } from '@/components/Header';
import { SeoKeywords } from '@/components/SeoKeywords';
import Link from 'next/link';

export default function VloggersPageClient() {
  const { language } = useTranslation();
  
  // 分类博主
  const domesticVloggers = vloggers.filter(v => v.country === '中国');
  const overseasVloggers = vloggers.filter(v => v.country !== '中国');
  
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* 返回按钮 */}
        <Link href="/">
          <Button variant="ghost" className="mb-6 text-slate-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'zh' ? '返回首页' : 'Back to Home'}
          </Button>
        </Link>
        
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Youtube className="w-7 h-7 text-orange-400" />
            {language === 'zh' ? '博主推荐' : 'RC Vloggers'}
          </h1>
          <p className="text-slate-400">
            {language === 'zh' 
              ? `共收录 ${vloggers.length} 位优质RC博主，国内 ${domesticVloggers.length} 位，海外 ${overseasVloggers.length} 位`
              : `${vloggers.length} RC vloggers: ${domesticVloggers.length} domestic, ${overseasVloggers.length} overseas`}
          </p>
        </div>
        
        {/* 国内博主 */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-orange-400 text-xl">🇨🇳</span>
            <h2 className="text-xl font-semibold text-white">
              {language === 'zh' ? '国内博主' : 'Domestic Vloggers'}
            </h2>
            <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/30">
              {domesticVloggers.length}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {domesticVloggers.map((vlogger) => (
              <a 
                key={vlogger.name}
                href={vlogger.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-colors group h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    {vlogger.logo ? (
                      <img 
                        src={vlogger.logo}
                        alt={vlogger.name}
                        className="w-14 h-14 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                        <span className="text-slate-300 font-medium text-lg">{vlogger.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-white font-medium">
                          {language === 'zh' ? vlogger.name : vlogger.nameEn || vlogger.name}
                        </span>
                        {vlogger.subscribers && (
                          <Badge variant="outline" className="text-xs bg-pink-500/10 text-pink-400 border-pink-500/30">
                            {vlogger.subscribers}
                          </Badge>
                        )}
                        {vlogger.douyinId && (
                          <Badge variant="outline" className="text-xs bg-slate-700 text-slate-300 border-slate-600">
                            @{vlogger.douyinId}
                          </Badge>
                        )}
                      </div>
                      {vlogger.description && (
                        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                          {language === 'zh' ? vlogger.description : vlogger.descriptionEn || vlogger.description}
                        </p>
                      )}
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition-colors shrink-0 mt-1" />
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </section>
        
        {/* 海外博主 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-400 text-xl">🌍</span>
            <h2 className="text-xl font-semibold text-white">
              {language === 'zh' ? '海外博主' : 'Overseas Vloggers'}
            </h2>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
              {overseasVloggers.length}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {overseasVloggers.map((vlogger) => (
              <a 
                key={vlogger.name}
                href={vlogger.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-colors group h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    {vlogger.logo ? (
                      <img 
                        src={vlogger.logo}
                        alt={vlogger.name}
                        className="w-14 h-14 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                        <span className="text-slate-300 font-medium text-lg">{vlogger.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-white font-medium">{vlogger.name}</span>
                        <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30">
                          {vlogger.country}
                        </Badge>
                        {vlogger.subscribers && (
                          <Badge variant="outline" className="text-xs bg-pink-500/10 text-pink-400 border-pink-500/30">
                            {vlogger.subscribers}
                          </Badge>
                        )}
                      </div>
                      {vlogger.description && (
                        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                          {language === 'zh' ? vlogger.description : vlogger.descriptionEn || vlogger.description}
                        </p>
                      )}
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors shrink-0 mt-1" />
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </section>

        {/* SEO关键词 */}
        <SeoKeywords type="vloggers" className="mt-8" />
      </main>
    </div>
  );
}
