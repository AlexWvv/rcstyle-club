'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Newspaper, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function NewsAdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // 手动触发资讯更新
  const triggerUpdate = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/news/fetch', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        // 保存资讯
        const saveResponse = await fetch('/api/news/auto-update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            articles: data.articles,
          }),
        });

        const saveData = await saveResponse.json();
        setResult({
          fetch: data,
          save: saveData,
        });
      } else {
        setError(data.error || 'Failed to fetch news');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-orange-500" />
            资讯中心管理
          </h1>
          <p className="text-slate-400">
            自动抓取和生成RC模型资讯，优化搜索引擎排名
          </p>
        </div>

        {/* 控制面板 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-blue-400" />
                手动更新
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 text-sm mb-4">
                点击按钮立即抓取最新资讯并生成内容
              </p>
              <Button
                onClick={triggerUpdate}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    更新中...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    立即更新
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" />
                定时任务
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">每日自动更新</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    已启用
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">更新时间</span>
                  <span className="text-white text-sm">08:00 UTC</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-400" />
                SEO状态
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Sitemap</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    已生成
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">RSS Feed</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    已生成
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 结果显示 */}
        {error && (
          <Card className="bg-red-500/10 border-red-500/30 mb-6">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-red-400 font-semibold mb-1">更新失败</h3>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {result && (
          <div className="space-y-6">
            {/* 抓取结果 */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  抓取结果
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-slate-400 text-sm mb-1">搜索关键词</div>
                    <div className="text-white font-medium">{result.fetch.keyword}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm mb-1">抓取数量</div>
                    <div className="text-white font-medium">{result.fetch.total} 篇</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm mb-1">新增数量</div>
                    <div className="text-white font-medium">{result.save.added} 篇</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm mb-1">总资讯数</div>
                    <div className="text-white font-medium">{result.save.total} 篇</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 文章列表 */}
            {result.fetch.articles && result.fetch.articles.length > 0 && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">生成的文章</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.fetch.articles.map((article: any, index: number) => (
                      <div
                        key={index}
                        className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="text-white font-semibold mb-1">
                              {article.title}
                            </h4>
                            <p className="text-slate-400 text-sm mb-2">
                              {article.titleEn}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                                {article.category}
                              </Badge>
                              {article.tags.slice(0, 3).map((tag: string) => (
                                <span
                                  key={tag}
                                  className="text-xs px-2 py-1 bg-slate-700 text-slate-400 rounded"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* 说明文档 */}
        <Card className="bg-slate-800/50 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white">功能说明</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <div className="space-y-4 text-slate-300">
              <div>
                <h3 className="text-white font-semibold mb-2">🤖 自动化抓取</h3>
                <p>
                  系统使用Web Search API自动搜索最新的RC模型资讯，包括：
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>新品发布和产品评测</li>
                  <li>赛事活动和行业动态</li>
                  <li>技术分享和教程</li>
                  <li>品牌官方新闻</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-2">📝 AI内容生成</h3>
                <p>
                  使用大语言模型（LLM）自动生成高质量的中英文资讯内容：
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>SEO优化的标题和摘要</li>
                  <li>结构化的HTML内容</li>
                  <li>自动分类和标签</li>
                  <li>关键词优化</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-2">🔍 搜索引擎优化</h3>
                <p>
                  自动生成SEO必需的文件：
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Sitemap.xml - 帮助搜索引擎索引</li>
                  <li>RSS Feed - 内容订阅和分发</li>
                  <li>结构化数据 - 提升搜索排名</li>
                  <li>Meta标签 - 社交媒体优化</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-2">⏰ 定时更新</h3>
                <p>
                  可以配置定时任务自动更新：
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>每日自动抓取最新资讯</li>
                  <li>自动更新sitemap和RSS</li>
                  <li>支持手动触发更新</li>
                  <li>去重机制避免重复内容</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
