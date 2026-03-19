import type { Metadata } from 'next';
import { LanguageProviderWrapper } from '@/components/LanguageProviderWrapper';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { Analytics } from '@/components/Analytics';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://rcstyle.club'),
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  title: {
    default: 'Rcstyle.club | RC汽车模型资源导航',
    template: '%s | Rcstyle.club',
  },
  description:
    'Rcstyle.club 是专业的RC汽车模型资源导航平台，汇集国内外知名RC品牌、视频博主、社区论坛等优质资源，为RC爱好者提供一站式的信息聚合服务。涵盖遥控车模型、配件、教程、评测等内容。',
  keywords: [
    'RC汽车模型',
    '遥控车',
    '模型车',
    'Rcstyle.club',
    'RC模型导航',
    '遥控车品牌',
    'RC配件',
    '模型车教程',
    '遥控车评测',
    'RC Hobby',
    'Remote Control Car',
    'RC模型爱好者',
    '遥控车社区',
    '模型车论坛',
    'HBX',
    'RLAARLO',
    'FMS',
    'Wltoys',
    'MJX',
    '遥控车购买',
    '模型车推荐',
  ],
  authors: [{ name: 'Rcstyle.club', url: 'https://rcstyle.club' }],
  creator: 'Rcstyle.club',
  publisher: 'Rcstyle.club',
  generator: 'Next.js',
  applicationName: 'Rcstyle.club',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Rcstyle.club | RC汽车模型资源导航',
    description:
      '专业的RC汽车模型资源导航平台，汇集国内外知名RC品牌、视频博主、社区论坛等优质资源，为RC爱好者提供一站式的信息聚合服务。',
    url: 'https://rcstyle.club',
    siteName: 'Rcstyle.club',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rcstyle.club | RC汽车模型资源导航',
    description:
      '专业的RC汽车模型资源导航平台，汇集国内外知名RC品牌、视频博主、社区论坛等优质资源。',
    creator: '@rcstyle_club',
  },
  alternates: {
    canonical: 'https://rcstyle.club',
  },
  category: 'Hobby & Recreation',
  classification: 'RC Model Resources',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 结构化数据
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Rcstyle.club',
    description: '专业的RC汽车模型资源导航平台，汇集国内外知名RC品牌、视频博主、社区论坛等优质资源',
    url: 'https://rcstyle.club',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://rcstyle.club/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Rcstyle.club',
    url: 'https://rcstyle.club',
    logo: 'https://rcstyle.club/logo.png',
    sameAs: [
      'https://twitter.com/rcstyle_club',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hopevve@163.com',
      contactType: 'customer service',
    },
  };

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <AuthProvider>
          <LanguageProviderWrapper>
            {children}
            <Analytics />
          </LanguageProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
