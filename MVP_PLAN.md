# Rcstyle.club MVP 实施方案

## 🎯 核心目标
用**零成本**实现核心功能，完成线上部署

## 💰 免费技术栈

| 服务 | 提供商 | 免费额度 | 用途 |
|------|--------|----------|------|
| **托管** | Vercel | 100GB带宽/月 | 前端部署 |
| **数据库** | Supabase | 500MB + 1GB存储 | 用户数据 |
| **认证** | Supabase Auth | 50,000 MAU | 用户登录 |
| **搜索** | 客户端实现 | 无限制 | 品牌搜索 |
| **分析** | Google Analytics | 无限制 | 用户行为 |
| **监控** | Vercel Analytics | 免费 | 性能监控 |
| **图片** | Google Favicon | 免费 | 品牌logo |
| **SEO** | 自动生成 | 免费 | sitemap/RSS |

**总成本：$0/月** ✅

---

## 📋 MVP功能清单

### Phase 1: 核心功能（优先级P0）

#### 1. 客户端搜索 ⭐⭐⭐⭐⭐
**成本**: $0  
**实现方式**: 客户端过滤 + Fuse.js模糊搜索  
**工作量**: 1天

**技术方案**:
```typescript
// 安装Fuse.js（轻量级搜索库，9KB gzipped）
pnpm add fuse.js

// 实现文件
src/lib/search.ts - 搜索引擎封装
src/components/SearchModal.tsx - 搜索弹窗
src/app/api/search/route.ts - 搜索API（可选）
```

**搜索范围**:
- 品牌名称（中英文）
- 品牌描述
- 资讯标题
- 博主名称

**用户体验**:
- 快捷键：Ctrl/Cmd + K
- 实时搜索（防抖300ms）
- 搜索结果分类展示
- 高亮匹配关键词

---

#### 2. 用户系统 ⭐⭐⭐⭐⭐
**成本**: $0（Supabase免费tier）  
**实现方式**: Supabase Auth  
**工作量**: 2天

**功能模块**:
- ✅ 邮箱注册/登录
- ✅ 第三方登录（Google、GitHub）
- ✅ 用户资料管理
- ✅ 收藏夹
- ✅ 浏览历史

**技术方案**:
```bash
# 安装依赖
pnpm add @supabase/supabase-js @supabase/auth-helpers-nextjs
```

**数据库设计** (Supabase免费500MB):
```sql
-- 用户表（Supabase Auth自动创建）
auth.users

-- 用户资料扩展
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username VARCHAR(50) UNIQUE,
  avatar_url TEXT,
  language VARCHAR(5) DEFAULT 'zh',
  created_at TIMESTAMP DEFAULT NOW()
);

-- 收藏夹
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  item_type VARCHAR(20), -- brand, news, vlogger
  item_id VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, item_type, item_id)
);

-- 浏览历史
CREATE TABLE view_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  item_type VARCHAR(20),
  item_id VARCHAR(50),
  viewed_at TIMESTAMP DEFAULT NOW()
);

-- 创建索引加速查询
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_history_user ON view_history(user_id, viewed_at DESC);
```

---

#### 3. 资讯自动化 ⭐⭐⭐⭐
**成本**: $0（使用已有的Web Search API）  
**实现方式**: 定时任务 + LLM生成  
**工作量**: 已完成API，需配置定时任务

**自动化流程**:
1. **定时触发**: Vercel Cron Jobs（免费）
2. **内容抓取**: Web Search API（已有）
3. **内容生成**: LLM（已有）
4. **内容存储**: Supabase数据库

**配置方案**:
```typescript
// vercel.json - Vercel免费Cron Jobs
{
  "crons": [{
    "path": "/api/news/auto-update",
    "schedule": "0 9 * * *" // 每天早上9点执行
  }]
}
```

**内容规划**:
- 每日自动更新：3-5篇资讯
- 内容审核：人工审核（可选）
- 分类覆盖：新品、评测、赛事、技术、动态

---

#### 4. 数据埋点 ⭐⭐⭐
**成本**: $0（Google Analytics免费）  
**实现方式**: Google Analytics 4  
**工作量**: 0.5天

**埋点方案**:
```typescript
// 安装依赖
pnpm add @next/third-parties

// 实现（Next.js 15+内置支持）
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout() {
  return (
    <>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </>
  );
}
```

**关键指标**:
- 页面浏览量（PV/UV）
- 用户停留时间
- 跳出率
- 搜索关键词
- 内容热度

---

### Phase 2: 体验优化（优先级P1）

#### 5. 品牌详情页
**成本**: $0  
**工作量**: 1天

**页面内容**:
- 品牌基本信息
- 产品系列
- 相关资讯
- 购买渠道

---

#### 6. 资讯分类筛选
**成本**: $0  
**工作量**: 0.5天

**实现方式**: URL参数 + 客户端过滤

---

#### 7. 响应式优化
**成本**: $0  
**工作量**: 1天

**优化点**:
- 移动端导航
- 触摸交互
- 图片懒加载

---

### Phase 3: 商业化探索（优先级P2）

#### 8. 联盟营销
**成本**: $0  
**预期收入**: $50-200/月

**合作平台**:
- Amazon Associates（免费）
- 京东联盟（免费）
- 淘宝客（免费）

**实现方式**:
- 购买链接添加联盟ID
- 订单追踪（联盟平台提供）

---

## 🚀 部署方案

### Vercel部署（免费）

**优势**:
- ✅ 零配置部署
- ✅ 自动HTTPS
- ✅ 全球CDN
- ✅ 免费域名（.vercel.app）
- ✅ 自动CI/CD

**免费额度**:
- 100GB 带宽/月
- 100GB 执行时间/月
- 无限次部署
- 免费SSL证书

**部署步骤**:
1. 连接GitHub仓库
2. 自动检测Next.js
3. 一键部署
4. 绑定自定义域名（可选）

---

### Supabase配置（免费）

**免费额度**:
- 500MB 数据库
- 1GB 文件存储
- 50,000 月活用户
- 2GB 带宽

**配置步骤**:
1. 创建Supabase项目
2. 设置数据库表
3. 配置认证提供商
4. 获取API密钥

---

## 📊 成本对比

| 方案 | 传统方式 | MVP方案 |
|------|----------|---------|
| 服务器 | $20/月 | $0 (Vercel) |
| 数据库 | $15/月 | $0 (Supabase) |
| 搜索服务 | $50/月 | $0 (客户端) |
| CDN | $10/月 | $0 (Vercel) |
| 监控 | $10/月 | $0 (Vercel Analytics) |
| **总计** | **$105/月** | **$0/月** ✅ |

---

## 📈 预期效果

### MVP阶段（1个月）
- ✅ 线上可访问
- ✅ 核心功能完整
- ✅ 用户可注册登录
- ✅ 内容每日更新
- 📊 日活用户：10-50
- 📊 资讯数量：30-50篇

### 成长期（3个月）
- 📊 日活用户：100-500
- 📊 资讯数量：100-200篇
- 📊 搜索引擎收录：100+页面
- 💰 联盟收入：$50-100/月

### 成熟期（6个月）
- 📊 日活用户：500-2000
- 📊 资讯数量：300-500篇
- 📊 搜索引擎收录：500+页面
- 💰 联盟收入：$200-500/月

---

## ⚡ 快速启动

### 第一周：核心功能
- Day 1-2: 客户端搜索
- Day 3-4: Supabase集成
- Day 5: 部署上线

### 第二周：内容扩充
- 配置自动化资讯系统
- 人工审核内容
- 提交sitemap到搜索引擎

### 第三周：体验优化
- 品牌详情页
- 移动端优化
- 用户反馈收集

### 第四周：商业化
- 申请联盟账号
- 配置联盟链接
- 监控收入数据

---

## 🎯 成功指标

### 技术指标
- ✅ 页面加载时间 < 3秒
- ✅ Lighthouse评分 > 90
- ✅ 移动端友好度 100%

### 业务指标
- 📊 月活用户 > 1000（3个月）
- 📊 用户留存率 > 30%（7日）
- 📊 内容更新频率：每日
- 💰 月收入 > $200（6个月）

### SEO指标
- 📊 搜索引擎收录 > 100页（1个月）
- 📊 自然搜索流量 > 100/天（3个月）
- 📊 关键词排名进入前3页（6个月）

---

## 💡 关键原则

1. **零成本优先** - 只用免费tier服务
2. **MVP思维** - 先上线，再迭代
3. **数据驱动** - 用数据指导优化
4. **用户体验** - 性能和体验不能妥协
5. **持续迭代** - 快速试错，持续改进

---

## 🔗 重要链接

- Vercel: https://vercel.com
- Supabase: https://supabase.com
- Google Analytics: https://analytics.google.com
- Google Search Console: https://search.google.com/search-console
- Bing Webmaster: https://www.bing.com/webmasters
