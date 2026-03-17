# Rcstyle.club 部署指南

## 🚀 快速部署到 Vercel（免费）

### 前置准备

1. **GitHub 账号** - 用于托管代码和连接 Vercel
2. **Supabase 账号** - 用于用户认证和数据库（免费）
3. **Vercel 账号** - 用于部署托管（免费）

---

## 第一步：配置 Supabase（5分钟）

### 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com)
2. 使用 GitHub 登录
3. 创建新项目：
   - Organization: 选择或创建组织
   - Name: `rcstyle-club`
   - Database Password: 自动生成或自定义
   - Region: **Singapore** (离中国最近)
   - Plan: **Free**

### 2. 获取 API 密钥

项目创建后（约2分钟）：

1. 进入项目仪表板
2. 点击左侧 **Settings** (齿轮图标)
3. 点击 **API**
4. 复制以下信息：
   - **Project URL**: `https://xxxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 3. 创建数据库表

1. 点击左侧 **SQL Editor**
2. 点击 **New query**
3. 复制粘贴以下 SQL：

```sql
-- 用户资料扩展表
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  username VARCHAR(50) UNIQUE,
  avatar_url TEXT,
  language VARCHAR(5) DEFAULT 'zh',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用 RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 创建策略：用户只能查看和修改自己的资料
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 收藏表
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type VARCHAR(20) NOT NULL,
  item_id VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_type, item_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own favorites" ON favorites
  FOR ALL USING (auth.uid() = user_id);

-- 浏览历史表
CREATE TABLE view_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type VARCHAR(20) NOT NULL,
  item_id VARCHAR(50) NOT NULL,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE view_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own history" ON view_history
  FOR ALL USING (auth.uid() = user_id);

-- 创建索引加速查询
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_favorites_item ON favorites(item_type, item_id);
CREATE INDEX idx_history_user ON view_history(user_id, viewed_at DESC);

-- 自动创建用户资料的触发器
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

4. 点击 **Run** 执行

### 4. 配置认证提供商（可选）

#### Google OAuth
1. 前往 [Google Cloud Console](https://console.cloud.google.com)
2. 创建 OAuth 2.0 凭据
3. 配置授权重定向 URI：
   - `https://xxxxxx.supabase.co/auth/v1/callback`
   - `https://your-domain.vercel.app/auth/callback`
4. 在 Supabase 中：
   - Authentication → Providers → Google
   - 启用 Google
   - 输入 Client ID 和 Client Secret

#### GitHub OAuth
1. 前往 GitHub Settings → Developer settings → OAuth Apps
2. 创建新的 OAuth App
3. 设置 Authorization callback URL：
   - `https://xxxxxx.supabase.co/auth/v1/callback`
4. 在 Supabase 中配置 GitHub Provider

---

## 第二步：部署到 Vercel（3分钟）

### 1. 推送代码到 GitHub

```bash
# 初始化 Git（如果还没有）
git init
git add .
git commit -m "feat: MVP版本 - 搜索功能 + 用户系统"

# 推送到 GitHub
git remote add origin https://github.com/YOUR_USERNAME/rcstyle-club.git
git push -u origin main
```

### 2. 连接 Vercel

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 登录
3. 点击 **Add New...** → **Project**
4. 选择 `rcstyle-club` 仓库
5. Vercel 会自动检测 Next.js 项目
6. 点击 **Environment Variables** 展开

### 3. 配置环境变量

添加以下环境变量（从 Supabase 复制）：

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

### 4. 部署

1. 点击 **Deploy**
2. 等待约 2 分钟完成部署
3. 部署成功后会获得一个 `.vercel.app` 域名

### 5. 配置自定义域名（可选）

1. 进入项目设置 → **Domains**
2. 添加自定义域名：`rcstyle.club`
3. 按提示配置 DNS 记录
4. Vercel 自动配置 HTTPS

---

## 第三步：配置自动化资讯系统

### 1. 启用 Vercel Cron Jobs

在项目根目录创建 `vercel.json`：

```json
{
  "crons": [{
    "path": "/api/news/auto-update",
    "schedule": "0 9 * * *"
  }]
}
```

这会在每天早上 9 点自动更新资讯。

### 2. 推送更新

```bash
git add vercel.json
git commit -m "feat: 添加定时任务自动更新资讯"
git push
```

Vercel 会自动重新部署并启用 Cron Jobs。

---

## 第四步：配置 Google Analytics（可选）

### 1. 创建 GA4 账号

1. 访问 [Google Analytics](https://analytics.google.com)
2. 创建账号和媒体资源
3. 获取衡量 ID：`G-XXXXXXXXXX`

### 2. 添加环境变量

在 Vercel 中添加：
- `NEXT_PUBLIC_GA_ID` = `G-XXXXXXXXXX`

### 3. 安装依赖（已完成）

```bash
pnpm add @next/third-parties
```

---

## 第五步：SEO 优化

### 1. 提交 sitemap 到搜索引擎

#### Google Search Console
1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 添加资源：`https://rcstyle.club`
3. 验证所有权（推荐使用 DNS 验证）
4. 提交 sitemap：`https://rcstyle.club/sitemap.xml`

#### Bing Webmaster Tools
1. 访问 [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. 添加网站
3. 提交 sitemap

#### 百度搜索资源平台
1. 访问 [百度搜索资源平台](https://ziyuan.baidu.com)
2. 添加网站
3. 验证所有权
4. 提交 sitemap

### 2. robots.txt 已自动生成

访问 `https://rcstyle.club/robots.txt` 查看。

---

## 📊 部署后检查清单

### 功能测试
- [ ] 首页加载正常
- [ ] 搜索功能可用（快捷键 ⌘K）
- [ ] 语言切换正常
- [ ] 用户注册/登录可用
- [ ] 资讯列表显示正常
- [ ] sitemap.xml 可访问
- [ ] robots.txt 可访问
- [ ] RSS feed 可访问

### 性能检查
- [ ] Lighthouse 评分 > 90
- [ ] 页面加载时间 < 3秒
- [ ] 移动端适配良好

### SEO 检查
- [ ] 提交 sitemap 到 Google
- [ ] 提交 sitemap 到 Bing
- [ ] 提交 sitemap 到百度
- [ ] 设置 Google Analytics

---

## 💰 免费额度说明

### Vercel 免费套餐
- ✅ 100GB 带宽/月
- ✅ 100GB 执行时间/月
- ✅ 无限次部署
- ✅ 免费 SSL 证书
- ✅ 自动 CI/CD
- ✅ Cron Jobs（免费）

### Supabase 免费套餐
- ✅ 500MB 数据库
- ✅ 1GB 文件存储
- ✅ 50,000 月活用户
- ✅ 2GB 带宽/月
- ✅ 无限 API 请求

### 总成本：$0/月 ✅

---

## 🔧 常见问题

### Q: 部署后页面空白？
A: 检查浏览器控制台错误，通常是环境变量未配置。

### Q: 登录后无反应？
A: 检查 Supabase 配置和重定向 URL 设置。

### Q: Cron Jobs 不执行？
A: Vercel Cron Jobs 仅在生产环境执行，确保已部署到生产环境。

### Q: 域名解析失败？
A: DNS 解析需要 24-48 小时生效，耐心等待。

---

## 📞 获取帮助

- Vercel 文档: https://vercel.com/docs
- Supabase 文档: https://supabase.com/docs
- Next.js 文档: https://nextjs.org/docs

---

**恭喜！你已成功部署 Rcstyle.club！** 🎉
