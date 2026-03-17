import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// 检查是否配置了 Supabase
export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// 创建 Supabase 服务器客户端（用于服务器组件和 API）
export async function createClient() {
  if (!isSupabaseConfigured()) {
    console.warn(
      '⚠️ Supabase 未配置。请在 .env.local 中设置 NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY。\n' +
      '参考文档：SUPABASE_SETUP.md'
    );
    return null;
  }
  
  const cookieStore = await cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // 在服务器组件中调用 `setAll` 会抛出异常
            // 因为 cookies 已经序列化到响应头中
          }
        },
      },
    }
  );
}
