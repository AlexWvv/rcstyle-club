// 资讯数据类型
export interface NewsArticle {
  id: string;
  title: string;
  titleEn: string; // 英文标题
  summary: string;
  summaryEn: string; // 英文摘要
  content: string;
  contentEn: string; // 英文内容
  coverImage: string;
  images?: string[];
  video?: {
    url: string;
    platform: 'youtube' | 'bilibili' | 'local';
    thumbnail?: string;
  };
  category: '新品发布' | '评测对比' | '赛事活动' | '技术分享' | '行业动态';
  categoryEn: string; // 英文分类
  author: string;
  authorEn?: string; // 英文作者
  publishDate: string;
  views: number;
  tags: string[];
  isNew: boolean; // 是否为最新资讯（7天内）
  originalUrl?: string; // 原文链接
}

// 导入自动生成的新闻数据
import generatedNews from './news-generated.json';

// 模拟资讯数据
const staticNewsData: NewsArticle[] = [
  {
    id: '1',
    title: 'Traxxas发布全新X-Maxx 8S大脚车，性能再升级',
    titleEn: 'Traxxas Releases New X-Maxx 8S Monster Truck with Upgraded Performance',
    summary: 'Traxxas最新发布的X-Maxx 8S大脚车采用全新设计的底盘和悬挂系统，最高时速可达60英里，是RC大脚车领域的又一力作。',
    summaryEn: 'Traxxas\' latest X-Maxx 8S monster truck features a newly designed chassis and suspension system, reaching top speeds of 60 mph, another masterpiece in the RC monster truck world.',
    content: `<p>Traxxas近日发布了备受期待的X-Maxx 8S大脚车升级版本。这款全新车型采用了多项创新设计，为RC爱好者带来前所未有的驾驶体验。</p>
<h3>核心升级亮点</h3>
<p>新车型最大的亮点在于全新设计的底盘系统，采用了高强度复合材料，在保证耐用性的同时大幅降低了整车重量。配合重新调校的VXL-6s无刷电调，最高时速可突破60英里。</p>
<p>悬挂系统也进行了全面升级，新的避震器采用了更大的油容量和更精准的阻尼调节，在各种地形下都能提供出色的操控表现。</p>
<h3>上市信息</h3>
<p>X-Maxx 8S预计将于下月在全球各大RC零售商上架，建议零售价为$799.99。同时Traxxas也提供了丰富的升级配件供玩家选择。</p>`,
    contentEn: `<p>Traxxas recently released the highly anticipated upgraded version of the X-Maxx 8S monster truck. This all-new model features multiple innovative designs, bringing RC enthusiasts an unprecedented driving experience.</p>
<h3>Key Upgrade Highlights</h3>
<p>The biggest highlight of the new model is the newly designed chassis system, using high-strength composite materials that significantly reduce the vehicle's weight while ensuring durability. Combined with the retuned VXL-6s brushless ESC, the top speed can exceed 60 mph.</p>
<p>The suspension system has also been comprehensively upgraded, with new shock absorbers featuring larger oil capacity and more precise damping adjustment, providing excellent handling performance on various terrains.</p>
<h3>Release Information</h3>
<p>The X-Maxx 8S is expected to hit shelves at RC retailers worldwide next month, with a suggested retail price of $799.99. Traxxas also offers a wide range of upgrade accessories for players to choose from.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&h=400&fit=crop',
    category: '新品发布',
    categoryEn: 'New Products',
    author: 'RCstyle编辑',
    authorEn: 'RCstyle Editor',
    publishDate: '2024-01-15',
    views: 12580,
    tags: ['Traxxas', 'X-Maxx', '大脚车', 'Monster Truck', '新品'],
    isNew: true,
  },
  {
    id: '2',
    title: '2024全国RC锦标赛广州站圆满落幕',
    titleEn: '2024 National RC Championship Guangzhou Station Successfully Concluded',
    summary: '2024全国RC遥控赛车锦标赛广州站比赛于上周末在广州国际遥控模型基地圆满落幕，吸引了来自全国各地的200余名选手参赛。',
    summaryEn: 'The 2024 National RC Racing Championship Guangzhou Station successfully concluded last weekend at the Guangzhou International RC Model Base, attracting over 200 competitors from across the country.',
    content: `<p>2024全国RC遥控赛车锦标赛广州站比赛于上周末在广州国际遥控模型基地圆满落幕。本次比赛设电动房车、油动越野、攀爬车等多个组别，吸引了来自全国各地的200余名选手参赛。</p>
<h3>比赛结果</h3>
<p>在竞争激烈的1/10电动房车组别中，来自深圳的选手李明以绝对优势夺得冠军。他表示："这次比赛的水平很高，能够在这样的赛事中获胜，我感到非常荣幸。"</p>
<p>油动越野组别的冠军被广州本地选手张伟收入囊中，他在决赛中展现了出色的控车技术。</p>
<h3>赛事影响</h3>
<p>本次比赛的成功举办，进一步推动了华南地区RC运动的发展。主办方表示，明年将继续在广州举办更高规格的国际邀请赛。</p>`,
    contentEn: `<p>The 2024 National RC Racing Championship Guangzhou Station successfully concluded last weekend at the Guangzhou International RC Model Base. The competition featured multiple categories including electric touring cars, nitro off-road, and crawlers, attracting over 200 competitors from across the country.</p>
<h3>Competition Results</h3>
<p>In the fiercely competitive 1/10 electric touring car category, Li Ming from Shenzhen claimed the championship with an absolute advantage. He stated: "The level of this competition was very high, and I feel honored to win in such an event."</p>
<p>The nitro off-road category championship was won by local Guangzhou competitor Zhang Wei, who demonstrated excellent car control skills in the final.</p>
<h3>Event Impact</h3>
<p>The successful hosting of this competition has further promoted the development of RC sports in South China. The organizers stated that a higher-level international invitational tournament will continue to be held in Guangzhou next year.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    category: '赛事活动',
    categoryEn: 'Events',
    author: 'RCstyle编辑',
    authorEn: 'RCstyle Editor',
    publishDate: '2024-01-10',
    views: 8920,
    tags: ['RC锦标赛', '广州', '赛事', 'Championship', 'Guangzhou'],
    isNew: true,
  },
  {
    id: '3',
    title: '入门级攀爬车选购指南：5款性价比之选',
    titleEn: 'Beginner Crawler Buying Guide: 5 Best Value Picks',
    summary: '想要入门RC攀爬车却不知如何选择？本文为你推荐5款性价比超高的入门级攀爬车，助你轻松开启攀爬之旅。',
    summaryEn: 'Want to get into RC crawlers but don\'t know how to choose? This article recommends 5 great value entry-level crawlers to help you start your crawling journey.',
    content: `<p>RC攀爬车是近年来最受欢迎的RC车型之一，其独特的慢速攀爬玩法吸引了众多新手玩家。如果你也想入门攀爬车，以下5款车型绝对值得考虑。</p>
<h3>1. 易控模型 16889A</h3>
<p>价格区间：¥400-600。作为国产入门级攀爬车的代表作，16889A拥有出色的性价比。四轮驱动、金属底盘、防水设计，完全可以满足新手入门需求。</p>
<h3>2. Axial SCX24</h3>
<p>价格区间：$120-150。全球最畅销的微型攀爬车，室内外都能玩。完整配置、丰富配件，是入门首选。</p>
<h3>3. FMS FCX24</h3>
<p>价格区间：¥500-800。微型攀爬车的后起之秀，高仿真外观，细节丰富，适合喜欢仿真车的玩家。</p>
<h3>4. 雷拉洛 AM-X7</h3>
<p>价格区间：¥900-1,400。专业级攀爬车，仿真外观，强大攀爬能力，适合有一定预算的玩家。</p>
<h3>5. Traxxas TRX-4</h3>
<p>价格区间：$400-500。顶级攀爬车，两档变速箱，门桥设计，适合追求极致性能的玩家。</p>`,
    contentEn: `<p>RC crawlers are one of the most popular RC vehicle types in recent years, with their unique slow-speed climbing gameplay attracting many new players. If you also want to get into crawlers, the following 5 models are definitely worth considering.</p>
<h3>1. HBX 16889A</h3>
<p>Price Range: $60-80. As a representative of domestic entry-level crawlers, the 16889A offers excellent value. Four-wheel drive, metal chassis, waterproof design - fully meeting beginner needs.</p>
<h3>2. Axial SCX24</h3>
<p>Price Range: $120-150. The world's best-selling micro crawler, playable indoors and outdoors. Complete configuration, abundant accessories - the top choice for beginners.</p>
<h3>3. FMS FCX24</h3>
<p>Price Range: $70-110. A rising star in micro crawlers, highly realistic appearance with rich details, suitable for players who love scale vehicles.</p>
<h3>4. Rlaarlo AM-X7</h3>
<p>Price Range: $120-200. Professional-grade crawler, realistic appearance, powerful climbing ability, suitable for players with a certain budget.</p>
<h3>5. Traxxas TRX-4</h3>
<p>Price Range: $400-500. Top-tier crawler, two-speed transmission, portal axle design, for players pursuing ultimate performance.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    category: '评测对比',
    categoryEn: 'Reviews',
    author: 'RCstyle编辑',
    authorEn: 'RCstyle Editor',
    publishDate: '2024-01-05',
    views: 15680,
    tags: ['攀爬车', '选购指南', '入门', 'Crawler', 'Guide', 'Beginner'],
    isNew: true,
  },
  {
    id: '4',
    title: 'RC锂电池保养全攻略：延长电池寿命的10个技巧',
    titleEn: 'RC LiPo Battery Maintenance Guide: 10 Tips to Extend Battery Life',
    summary: '锂电池是RC模型的核心动力来源，正确的保养方式可以大幅延长电池寿命。本文分享10个实用的电池保养技巧。',
    summaryEn: 'LiPo batteries are the core power source for RC models, and proper maintenance can significantly extend battery life. This article shares 10 practical battery maintenance tips.',
    content: `<p>锂电池的正确使用和保养对于RC玩家来说至关重要。以下10个技巧可以帮助你延长电池寿命，确保安全使用。</p>
<h3>1. 正确的充电方式</h3>
<p>使用专用的锂电池充电器，选择正确的充电电流（通常为1C）。切勿过充，当电池电压达到4.2V/节时应立即停止充电。</p>
<h3>2. 存储电压很重要</h3>
<p>长期不使用的电池应保持在3.7-3.8V/节的存储电压。过高或过低的存储电压都会影响电池寿命。</p>
<h3>3. 避免过放</h3>
<p>使用电池时不要将其放电到3.0V/节以下。建议设置低压报警，在3.3-3.4V/节时停止使用。</p>
<h3>4. 温度控制</h3>
<p>充电和使用时注意温度。充电时电池温度应在10-40°C之间，使用后应等待电池冷却后再充电。</p>
<h3>5. 安全存储</h3>
<p>将电池存放在专用的防火电池袋中，远离易燃物品。切勿将电池暴露在高温或阳光下。</p>`,
    contentEn: `<p>Proper use and maintenance of LiPo batteries is crucial for RC players. The following 10 tips can help extend battery life and ensure safe use.</p>
<h3>1. Correct Charging Method</h3>
<p>Use a dedicated LiPo battery charger and select the correct charging current (usually 1C). Never overcharge - stop charging immediately when the battery voltage reaches 4.2V/cell.</p>
<h3>2. Storage Voltage Matters</h3>
<p>Batteries not used for extended periods should be kept at storage voltage of 3.7-3.8V/cell. Storage voltage that's too high or too low will affect battery life.</p>
<h3>3. Avoid Over-Discharge</h3>
<p>Don't discharge the battery below 3.0V/cell during use. It's recommended to set a low voltage alarm to stop use at 3.3-3.4V/cell.</p>
<h3>4. Temperature Control</h3>
<p>Pay attention to temperature during charging and use. Battery temperature should be between 10-40°C during charging. Wait for the battery to cool before charging after use.</p>
<h3>5. Safe Storage</h3>
<p>Store batteries in dedicated fireproof battery bags, away from flammable materials. Never expose batteries to high temperatures or direct sunlight.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    category: '技术分享',
    categoryEn: 'Tutorials',
    author: 'RCstyle编辑',
    authorEn: 'RCstyle Editor',
    publishDate: '2023-12-28',
    views: 21200,
    tags: ['锂电池', '保养', '教程', 'Battery', 'Maintenance', 'Tutorial'],
    isNew: false,
  },
  {
    id: '5',
    title: '2024年RC行业趋势预测：电动化与智能化',
    titleEn: '2024 RC Industry Trend Prediction: Electrification and Intelligence',
    summary: '随着技术进步和环保意识提升，RC行业正经历深刻变革。本文展望2024年RC行业的发展趋势。',
    summaryEn: 'With technological advancement and rising environmental awareness, the RC industry is undergoing profound changes. This article explores the development trends of the RC industry in 2024.',
    content: `<p>2024年，RC遥控模型行业将迎来一系列重要变革。从技术进步到市场变化，以下是我们对行业趋势的预测。</p>
<h3>1. 电动化加速</h3>
<p>随着电池技术的进步和环保法规的收紧，电动RC车型将继续蚕食油动车的市场份额。更长的续航时间和更短的充电时间将成为竞争焦点。</p>
<h3>2. 智能化升级</h3>
<p>APP控制、GPS定位、自动返航等智能功能将更加普及。高端车型将配备更多传感器，实现更精准的姿态控制。</p>
<h3>3. 价格下探</h3>
<p>国产RC品牌将继续提升品质，同时保持价格优势。入门级产品的性能将进一步提升，吸引更多新玩家。</p>
<h3>4. 社区化发展</h3>
<p>RC社区和线上平台将发挥更大作用，玩家之间的交流分享将更加便捷。赛事直播和视频内容将继续增长。</p>`,
    contentEn: `<p>In 2024, the RC model industry will undergo a series of important changes. From technological progress to market shifts, here are our predictions for industry trends.</p>
<h3>1. Accelerated Electrification</h3>
<p>With advances in battery technology and tightening environmental regulations, electric RC models will continue to erode the market share of nitro vehicles. Longer run times and shorter charging times will become competitive focal points.</p>
<h3>2. Intelligence Upgrades</h3>
<p>Smart features like APP control, GPS positioning, and automatic return will become more widespread. High-end models will be equipped with more sensors for more precise attitude control.</p>
<h3>3. Price Accessibility</h3>
<p>Domestic RC brands will continue to improve quality while maintaining price advantages. Entry-level product performance will further improve, attracting more new players.</p>
<h3>4. Community Development</h3>
<p>RC communities and online platforms will play a greater role, making communication and sharing between players more convenient. Live event streaming and video content will continue to grow.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    category: '行业动态',
    categoryEn: 'Industry News',
    author: 'RCstyle编辑',
    authorEn: 'RCstyle Editor',
    publishDate: '2023-12-20',
    views: 18500,
    tags: ['行业趋势', '2024', '电动化', 'Industry', 'Trends', 'Electrification'],
    isNew: false,
  },
];

// 合并静态数据和自动生成的数据（去重）
const mergeNewsData = (): NewsArticle[] => {
  const staticIds = new Set(staticNewsData.map(n => n.id));
  const generatedData = (generatedNews as NewsArticle[]).filter(n => !staticIds.has(n.id));
  return [...generatedData, ...staticNewsData];
};

// 合并后的新闻数据
export const newsData = mergeNewsData();

// 获取新闻总数
export function getNewsCount() {
  return newsData.length;
}

// 获取最新资讯（带NEW标记）
export function getLatestNews() {
  return newsData.sort((a, b) => b.views - a.views);
}

// 获取所有资讯
export function getAllNews() {
  return newsData;
}

// 根据ID获取资讯详情
export function getNewsById(id: string) {
  return newsData.find(article => article.id === id);
}

// 根据分类获取资讯
export function getNewsByCategory(category: string) {
  return newsData.filter(article => article.category === category);
}

// 格式化日期
export function formatDate(dateString: string, language: 'zh' | 'en' = 'zh') {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (language === 'en') {
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return date.toLocaleDateString('en-US');
  } else {
    if (days === 0) return '今天';
    if (days === 1) return '昨天';
    if (days < 7) return `${days}天前`;
    if (days < 30) return `${Math.floor(days / 7)}周前`;
    return date.toLocaleDateString('zh-CN');
  }
}

// 格式化阅读数
export function formatViews(views: number) {
  if (views < 1000) return views.toString();
  if (views < 10000) return `${(views / 1000).toFixed(1)}k`;
  return `${(views / 10000).toFixed(1)}w`;
}
