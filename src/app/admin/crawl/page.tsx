'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  RefreshCw, 
  Newspaper, 
  Package, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Loader2,
  ExternalLink
} from 'lucide-react';

interface CrawlStatus {
  news?: {
    total: number;
    lastUpdate: string | null;
    sources: string[];
  };
  brands?: {
    total: number;
    brandStats: Record<string, number>;
    lastUpdate: string | null;
    supportedBrands: string[];
  };
}

export default function AdminCrawlPage() {
  const [loading, setLoading] = useState<'news' | 'brands' | null>(null);
  const [status, setStatus] = useState<CrawlStatus>({});
  const [result, setResult] = useState<{
    type: 'news' | 'brands';
    fetched: number;
    saved: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 获取资讯抓取状态
  const fetchNewsStatus = async () => {
    try {
      const res = await fetch('/api/crawl/news');
      const data = await res.json();
      setStatus(prev => ({ ...prev, news: data }));
    } catch (err) {
      console.error('Failed to fetch news status:', err);
    }
  };

  // 获取品牌抓取状态
  const fetchBrandsStatus = async () => {
    try {
      const res = await fetch('/api/crawl/brands');
      const data = await res.json();
      setStatus(prev => ({ ...prev, brands: data }));
    } catch (err) {
      console.error('Failed to fetch brands status:', err);
    }
  };

  // 执行资讯抓取
  const crawlNews = async () => {
    setLoading('news');
    setError(null);
    setResult(null);
    
    try {
      const res = await fetch('/api/crawl/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: 10 }),
      });
      const data = await res.json();
      
      if (data.success) {
        setResult({ type: 'news', fetched: data.fetched, saved: data.saved });
        await fetchNewsStatus();
      } else {
        setError(data.error || '抓取失败');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '网络错误');
    } finally {
      setLoading(null);
    }
  };

  // 执行品牌抓取
  const crawlBrands = async () => {
    setLoading('brands');
    setError(null);
    setResult(null);
    
    try {
      const res = await fetch('/api/crawl/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: 10 }),
      });
      const data = await res.json();
      
      if (data.success) {
        setResult({ type: 'brands', fetched: data.fetched, saved: data.saved });
        await fetchBrandsStatus();
      } else {
        setError(data.error || '抓取失败');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '网络错误');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">内容抓取管理</h1>
          <p className="text-gray-600">
            自动抓取RC资讯和品牌产品信息
          </p>
        </div>

        {/* 操作结果提示 */}
        {result && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800">
                {result.type === 'news' ? '资讯' : '品牌产品'}抓取完成
              </p>
              <p className="text-sm text-green-700">
                获取 {result.fetched} 条，保存 {result.saved} 条新内容
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <XCircle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-medium text-red-800">抓取失败</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <Tabs defaultValue="news" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              资讯抓取
            </TabsTrigger>
            <TabsTrigger value="brands" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              品牌产品抓取
            </TabsTrigger>
          </TabsList>

          {/* 资讯抓取 */}
          <TabsContent value="news">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Newspaper className="h-5 w-5" />
                      资讯自动抓取
                    </CardTitle>
                    <CardDescription>
                      从搜索引擎抓取RC模型相关新闻资讯
                    </CardDescription>
                  </div>
                  <Button
                    onClick={crawlNews}
                    disabled={loading === 'news'}
                    className="flex items-center gap-2"
                  >
                    {loading === 'news' ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    开始抓取
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 统计信息 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">已收录资讯</p>
                    <p className="text-2xl font-bold">
                      {status.news?.total || 0}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">最后更新</p>
                    <p className="text-lg font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {status.news?.lastUpdate || '未更新'}
                    </p>
                  </div>
                </div>

                {/* 搜索关键词 */}
                <div>
                  <p className="text-sm font-medium mb-2">搜索关键词</p>
                  <div className="flex flex-wrap gap-2">
                    {status.news?.sources?.map((source, i) => (
                      <Badge key={i} variant="secondary">
                        {source}
                      </Badge>
                    )) || (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={fetchNewsStatus}
                      >
                        加载状态
                      </Button>
                    )}
                  </div>
                </div>

                {/* API调用示例 */}
                <div className="mt-6 p-4 bg-slate-900 rounded-lg text-slate-100 text-sm font-mono">
                  <p className="text-slate-400 mb-2"># API调用示例</p>
                  <code>POST /api/crawl/news</code>
                  <br />
                  <code className="text-slate-400">{"{"}"count": 10{"}"}</code>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 品牌产品抓取 */}
          <TabsContent value="brands">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      品牌产品抓取
                    </CardTitle>
                    <CardDescription>
                      从搜索引擎抓取各品牌最新产品信息
                    </CardDescription>
                  </div>
                  <Button
                    onClick={crawlBrands}
                    disabled={loading === 'brands'}
                    className="flex items-center gap-2"
                  >
                    {loading === 'brands' ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    开始抓取
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 统计信息 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">已收录产品</p>
                    <p className="text-2xl font-bold">
                      {status.brands?.total || 0}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">最后更新</p>
                    <p className="text-lg font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {status.brands?.lastUpdate || '未更新'}
                    </p>
                  </div>
                </div>

                {/* 支持的品牌 */}
                <div>
                  <p className="text-sm font-medium mb-2">支持的品牌</p>
                  <div className="flex flex-wrap gap-2">
                    {status.brands?.supportedBrands?.map((brand) => (
                      <Badge key={brand} variant="secondary" className="capitalize">
                        {brand}
                      </Badge>
                    )) || (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={fetchBrandsStatus}
                      >
                        加载状态
                      </Button>
                    )}
                  </div>
                </div>

                {/* 品牌统计 */}
                {status.brands?.brandStats && Object.keys(status.brands.brandStats).length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">品牌产品数量</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {Object.entries(status.brands.brandStats).map(([brand, count]) => (
                        <div key={brand} className="flex justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{brand}</span>
                          <Badge variant="outline">{count}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* API调用示例 */}
                <div className="mt-6 p-4 bg-slate-900 rounded-lg text-slate-100 text-sm font-mono">
                  <p className="text-slate-400 mb-2"># API调用示例</p>
                  <code>POST /api/crawl/brands</code>
                  <br />
                  <code className="text-slate-400">{"{"}"brand": "traxxas", "count": 10{"}"}</code>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 说明文档 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>使用说明</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h4>抓取原理</h4>
            <p>
              本系统使用搜索引擎API抓取公开信息，不直接访问品牌官网。
              所有内容均来自搜索引擎索引的公开页面。
            </p>
            
            <h4>抓取频率建议</h4>
            <ul>
              <li><strong>资讯抓取</strong>：每日1-2次，获取最新新闻</li>
              <li><strong>品牌产品</strong>：每周1次，获取新品信息</li>
            </ul>
            
            <h4>如何添加新品牌</h4>
            <p>
              如需添加新的品牌抓取源，请联系管理员修改 
              <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">/api/crawl/brands/route.ts</code>
              中的 BRAND_QUERIES 配置。
            </p>
          </CardContent>
        </Card>

        {/* 快捷链接 */}
        <div className="mt-6 flex gap-4">
          <Button 
            variant="outline" 
            asChild
            className="flex items-center gap-2"
          >
            <a href="/admin/news" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              资讯管理
            </a>
          </Button>
          <Button 
            variant="outline" 
            asChild
            className="flex items-center gap-2"
          >
            <a href="/news" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              资讯页面
            </a>
          </Button>
          <Button 
            variant="outline" 
            asChild
            className="flex items-center gap-2"
          >
            <a href="/brands" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              品牌页面
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
