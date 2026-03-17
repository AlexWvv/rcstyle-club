'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const supabase = getSupabaseBrowserClient();
  
  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { error } = await supabase.auth.getSession();
        
        if (error) {
          setError(error.message);
          return;
        }
        
        // 认证成功，跳转到首页
        router.push('/');
      } catch (err) {
        setError('Authentication failed');
      }
    };
    
    handleCallback();
  }, [router, supabase.auth]);
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">Authentication Error</p>
          <p className="text-slate-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-orange-500" />
        <p className="text-slate-300">Completing authentication...</p>
      </div>
    </div>
  );
}
