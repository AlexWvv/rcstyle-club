'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Newspaper, Clock, CheckCircle, XCircle, Globe, Languages, Settings, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { LoginForm, LogoutButton, isAuthenticated, logout } from '@/components/admin/LoginForm';

// 抓取源列表
const NEWS_SOURCES = [
  // 美国网站
  {
    id: 'bigsquidrc',
    name: 'Big Squid RC',
    nameEn: 'Big Squid RC',
    region: 'US',
    language: 'en',
    url: 'https://www.bigsquidrc.com/',
    categories: ['新闻', '评测'],
  },
  {
    id: 'rcdriver',
    name: 'RC Driver',
    nameEn: 'RC Driver',
    region: 'US',
    language: 'en',
    url: 'https://www.rcdriver.com/',
    categories: ['新闻', '评测'],
  },
  {
    id: 'liverc',
    name: 'LiveRC',
    nameEn: 'LiveRC',
    region: 'US',
    language: 'en',
    url: 'https://www.liverc.com/',
    categories: ['新闻', '新品', '新闻稿'],
  },
  {
    id: 'rcnewb',
    name: 'RC Newb',
    nameEn: 'RC Newb',
    region: 'US',
    language: 'en',
    url: 'https://rcnewb.com/',
    categories: ['新闻', '评测'],
  },
  {
    id: 'rcgroups',
    name: 'RCGroups',
    nameEn: 'RCGroups',
    region: 'US',
    language: 'en',
    url: 'https://www.rcgroups.com/',
    categories: ['车类频道'],
  },
  // 中国网站
  {
    id: 'rcfans',
    name: 'RCFans 玩家社区',
    nameEn: 'RCFans',
    region: 'CN',
    language: 'zh',
    url: 'https://www.rcfans.com/news/rccarnews/',
    categories: ['遥控车新闻', '新闻', '评测', '技术'],
  },
  {
    id: '5imx',
    name: '5iMX 模型论坛',
    nameEn: '5iMX',
    region: 'CN',
    language: 'zh',
    url: 'https://bbs.5imx.com/',
    categories: ['门户资讯'],
  },
];

export default function NewsAdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  // 检查登录状态
  useEffect(() => {
    const loggedIn = isAuthenticated();
    setIsLoggedIn(loggedIn);
    setIsLoading(false);
  }, []);

  // 处理登录成功
  const handleLoginSuccess = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  // 处理退出登录
  const handleLogout = useCallback(() => {
    logout();
    setIsLoggedIn(false);
    setResult(null);
    setError(null);
  }, []);

  // 手动触发资讯更新
  const triggerUpdate = async (sourceId?: string) => {
    setUpdating(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/news/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceId: sourceId,
          maxArticles: 5,
        }),
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
      setUpdating(false);
    }
  };

  // 加载中状态
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-slate-400">加载中...</div>
      </div>
    );
  }

  // 未登录状态
  if (!isLoggedIn) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  // 已登录状态 - 显示管理界面
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Newspaper className="w-8 h-8 text-orange-500" />
              资讯中心管理
            </h1>
            <p className="text-slate-400">
              定向抓取RC模型资讯，自动翻译中英文内容
            </p>
          </div>
          <LogoutButton onLogout={handleLogout} />
          <Link
            href="/admin/crawl"
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            抓取设置
          </Link>
        </div>

        {/* 功能说明 */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Languages className="w-5 h-5 text-green-400" />
              智能翻译功能
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-blue-400">🇺🇸 英文网站</span>
                <span className="text-slate-400">→ 自动翻译为中文，保留英文原文</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">🇨🇳 中文网站</span>
                <span className="text-slate-400">→ 自动翻译为英文，保留中文原文</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 抓取源列表 */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              定向抓取源（{NEWS_SOURCES.length} 个）
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {NEWS_SOURCES.map((source) => (
                <div
                  key={source.id}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    selectedSource === source.id
                      ? 'bg-orange-500/20 border-orange-500'
                      : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
                  }`}
                  onClick={() => setSelectedSource(source.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{source.name}</span>
                    <Badge variant={source.region === 'US' ? 'default' : 'secondary'}>
                      {source.region === 'US' ? '🇺🇸 EN' : '🇨🇳 CN'}
                    </Badge>
                  </div>
                  <p className="text-slate-400 text-xs mb-2">{source.url}</p>
                  <div className="flex flex-wrap gap-1">
                    {source.categories.map((cat) => (
                      <Badge key={cat} variant="outline" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 控制面板 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-blue-400" />
                定向抓取更新
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 text-sm mb-4">
                {selectedSource 
                  ? `从选中的源抓取最新资讯` 
                  : '从所有启用的源抓取最新资讯'}
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => triggerUpdate(selectedSource || undefined)}
                  disabled={updating}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  {updating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      更新中...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      {selectedSource ? '抓取选中源' : '抓取所有源'}
                    </>
                  )}
                </Button>
                {selectedSource && (
                  <Button
                    onClick={() => setSelectedSource(null)}
                    variant="outline"
                    className="border-slate-600 text-slate-300"
                  >
                    取消选择
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" />
                自动更新
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 text-sm mb-4">
                系统每天早上 9:00（北京时间）自动抓取最新资讯
              </p>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">已启用定时任务</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 结果显示 */}
        {error && (
          <Card className="bg-red-500/10 border-red-500/50 mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-400">
                <XCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card className="bg-green-500/10 border-green-500/50 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                更新成功
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-300 mb-2">抓取结果：</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">来源：</span>
                      <span className="text-white">{result.fetch?.source || '定向抓取'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">获取：</span>
                      <span className="text-green-400">{result.fetch?.total || 0} 篇</span>
                    </div>
                    <div>
                      <span className="text-slate-400">保存：</span>
                      <span className="text-green-400">{result.save?.added || 0} 篇</span>
                    </div>
                  </div>
                </div>
                
                {result.fetch?.articles?.length > 0 && (
                  <div>
                    <p className="text-slate-300 mb-2">文章列表：</p>
                    <div className="space-y-2">
                      {result.fetch.articles.map((article: any, index: number) => (
                        <div key={index} className="bg-slate-700/50 rounded p-3 text-sm">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white">{article.title}</span>
                            <Badge variant="outline">{article.category}</Badge>
                          </div>
                          <p className="text-slate-400 text-xs">{article.titleEn}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 说明 */}
        <Card className="bg-slate-800/30 border-slate-700">
          <CardContent className="pt-6">
            <h3 className="text-white font-medium mb-3">使用说明</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>• 点击抓取源卡片可选择特定来源进行抓取</li>
              <li>• 英文网站内容会自动翻译为中文，保留英文原文</li>
              <li>• 中文网站内容会自动翻译为英文，保留中文原文</li>
              <li>• 每次抓取最多获取 5 篇文章</li>
              <li>• 系统每天自动更新，无需手动操作</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
