import { getAllNews } from '@/data/news';

export async function GET() {
  const baseUrl = 'https://rcstyle.club';
  const news = getAllNews().slice(0, 20);
  
  const items = news.map((article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${baseUrl}/news/${article.id}</link>
      <description><![CDATA[${article.summary}]]></description>
      <pubDate>${new Date(article.publishDate).toUTCString()}</pubDate>
      <guid>${baseUrl}/news/${article.id}</guid>
      <category>${article.category}</category>
    </item>`).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Rcstyle.club - RC Model News</title>
    <link>${baseUrl}</link>
    <description>Latest RC model news, reviews, events and tutorials from Rcstyle.club</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
