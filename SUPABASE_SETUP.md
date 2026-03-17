# Supabase 配置指南

## 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com)
2. 点击 "Start your project"
3. 使用 GitHub 账号登录（推荐）
4. 创建新组织（如果没有）
5. 创建新项目：
   - Name: `rcstyle-club`
   - Database Password: 自动生成或自定义
   - Region: 选择离用户最近的区域（推荐：Singapore）
   - Plan: Free

## 2. 获取 API 密钥

项目创建完成后：

1. 进入项目仪表板
2. 点击左侧 "Settings" (齿轮图标)
3. 点击 "API"
4. 复制以下信息：
   - **Project URL**: `https://xxxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 3. 配置环境变量

在项目根目录创建 `.env.local` 文件：

\`\`\`bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 可选：服务端密钥（用于管理员操作）
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

## 4. 创建数据库表

在 Supabase SQL Editor 中执行：

\`\`\`sql
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
  item_type VARCHAR(20) NOT NULL, -- brand, news, vlogger
  item_id VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_type, item_id)
);

-- 启用 RLS
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- 创建策略
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

-- 启用 RLS
ALTER TABLE view_history ENABLE ROW LEVEL SECURITY;

-- 创建策略
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

-- 绑定触发器
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
\`\`\`

## 5. 配置认证提供商

### 5.1 邮箱认证（默认启用）
无需额外配置

### 5.2 Google OAuth
1. 前往 [Google Cloud Console](https://console.cloud.google.com)
2. 创建 OAuth 2.0 凭据
3. 配置授权重定向 URI：
   - `https://xxxxxx.supabase.co/auth/v1/callback`
4. 在 Supabase 中配置：
   - Authentication → Providers → Google
   - 启用 Google
   - 输入 Client ID 和 Client Secret

### 5.3 GitHub OAuth
1. 前往 GitHub Settings → Developer settings → OAuth Apps
2. 创建新的 OAuth App
3. 设置 Authorization callback URL：
   - `https://xxxxxx.supabase.co/auth/v1/callback`
4. 在 Supabase 中配置：
   - Authentication → Providers → GitHub
   - 启用 GitHub
   - 输入 Client ID 和 Client Secret

## 6. 免费额度说明

Supabase 免费套餐包括：
- **数据库**: 500MB
- **文件存储**: 1GB
- **认证用户**: 50,000 MAU (月活跃用户)
- **带宽**: 2GB/月
- **API 请求**: 无限制

对于初期项目完全够用！

## 7. 部署注意事项

### Vercel 环境变量
在 Vercel 项目设置中添加环境变量：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 重定向 URL 配置
在 Supabase 中添加生产环境的重定向 URL：
1. Authentication → URL Configuration
2. 添加：
   - `https://your-domain.com/auth/callback`
   - `https://your-domain.vercel.app/auth/callback`

---

## 快速开始

安装依赖：
\`\`\`bash
pnpm add @supabase/supabase-js @supabase/ssr
\`\`\`

创建客户端：
\`\`\`typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
\`\`\`

完成！🎉
