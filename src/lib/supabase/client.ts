import { createBrowserClient } from '@supabase/ssr';

// 检查是否配置了 Supabase
export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// 创建 Supabase 浏览器客户端（用于客户端组件）
export function createClient() {
  if (!isSupabaseConfigured()) {
    console.warn(
      '⚠️ Supabase 未配置。请在 .env.local 中设置 NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY。\n' +
      '参考文档：SUPABASE_SETUP.md'
    );
    return null;
  }
  
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// 单例模式 - 避免重复创建客户端
let client: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }
  
  if (!client) {
    client = createClient();
  }
  return client;
}
