# 🚀 快速启动指南

## 5分钟快速部署 Rcstyle.club

### 前置准备
- GitHub 账号
- Supabase 账号（免费）
- Vercel 账号（免费）

---

## 第一步：创建 Supabase 项目（2分钟）

### 1.1 创建项目
访问 [supabase.com](https://supabase.com)，使用 GitHub 登录，创建新项目：
- Name: `rcstyle-club`
- Region: **Singapore**
- Plan: **Free**

### 1.2 获取密钥
项目创建后，进入 **Settings → API**，复制：
- `Project URL`
- `anon public key`

### 1.3 创建数据库表
进入 **SQL Editor**，粘贴并执行：

```sql
-- 用户表
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  username VARCHAR(50) UNIQUE,
  avatar_url TEXT,
  language VARCHAR(5) DEFAULT 'zh',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

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

-- 索引
CREATE INDEX idx_favorites_user ON favorites(user_id);
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

---

## 第二步：部署到 Vercel（3分钟）

### 2.1 推送代码
```bash
git add .
git commit -m "feat: MVP版本 - 搜索 + 用户系统 + 自动化"
git push
```

### 2.2 连接 Vercel
1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 登录
3. 点击 **Add New → Project**
4. 选择 `rcstyle-club` 仓库

### 2.3 配置环境变量
在 Environment Variables 中添加：

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

### 2.4 部署
点击 **Deploy**，等待约 2 分钟完成部署。

---

## 第三步：配置 OAuth（可选）

### Google 登录
1. 访问 [Google Cloud Console](https://console.cloud.google.com)
2. 创建 OAuth 2.0 凭据
3. 添加授权重定向 URI：
   - `https://xxxxxx.supabase.co/auth/v1/callback`
   - `https://your-app.vercel.app/auth/callback`
4. 在 Supabase 中配置：**Authentication → Providers → Google**

### GitHub 登录
1. 访问 GitHub Settings → Developer settings → OAuth Apps
2. 创建新的 OAuth App
3. 设置回调 URL：`https://xxxxxx.supabase.co/auth/v1/callback`
4. 在 Supabase 中配置：**Authentication → Providers → GitHub**

---

## 第四步：配置 SEO（5分钟）

### 提交 sitemap 到搜索引擎

#### Google Search Console
1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 添加资源：`https://your-app.vercel.app`
3. 验证所有权（推荐 DNS 验证）
4. 提交 sitemap：`https://your-app.vercel.app/sitemap.xml`

#### Bing Webmaster Tools
1. 访问 [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. 添加网站
3. 提交 sitemap

---

## 🎉 完成！

你的 Rcstyle.club 已经成功部署！

**访问地址**：`https://your-app.vercel.app`

### 检查清单
- [ ] 首页正常加载
- [ ] 搜索功能可用（按 ⌘K 测试）
- [ ] 用户注册/登录可用
- [ ] 语言切换正常
- [ ] sitemap.xml 可访问

### 下一步
1. 配置自定义域名（可选）
2. 监控 Google Analytics 数据
3. 定期检查资讯自动更新

---

## 📞 遇到问题？

查看详细文档：
- `DEPLOYMENT_GUIDE.md` - 完整部署指南
- `SUPABASE_SETUP.md` - Supabase 详细配置
- `MVP_COMPLETION_REPORT.md` - 功能说明

---

**总成本：$0/月** ✅
