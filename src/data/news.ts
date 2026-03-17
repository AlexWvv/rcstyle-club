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
}

// 模拟资讯数据
export const newsData: NewsArticle[] = [
  {
    id: '1',
    title: 'HBX推出全新旗舰级RC爬车H SERIES，越野性能全面升级',
    titleEn: 'HBX Launches New Flagship RC Crawler H SERIES with Enhanced Off-Road Performance',
    summary: 'HBX最新发布的H系列RC爬车采用全新底盘设计，搭载升级版动力系统，越野性能大幅提升。专业遥控车模型品牌，适合RC模型爱好者选购。',
    summaryEn: 'HBX\'s latest H series RC crawler features a new chassis design and upgraded power system, delivering significantly enhanced off-road performance. Professional RC model brand, ideal for RC hobbyists.',
    content: `
      <h2>产品亮点</h2>
      <p>HBX最新发布的H系列RC爬车采用全新底盘设计，搭载升级版动力系统，越野性能大幅提升。作为知名遥控车品牌，HBX一直致力于为RC模型爱好者提供优质产品。</p>
      
      <h3>核心升级</h3>
      <ul>
        <li>全新设计的金属底盘，强度提升30%</li>
        <li>升级版有刷电机，动力更强劲</li>
        <li>改进的悬挂系统，通过性更佳</li>
        <li>防水等级IPX5，无惧恶劣环境</li>
      </ul>
      
      <h3>性能参数</h3>
      <p>最高时速：25km/h</p>
      <p>续航时间：30分钟</p>
      <p>充电时间：90分钟</p>
      
      <h3>购买建议</h3>
      <p>适合进阶玩家，性价比优秀，建议搭配备用电池延长续航。想要了解更多RC爬车品牌和遥控车推荐，请持续关注Rcstyle.club资讯中心。</p>
    `,
    contentEn: `
      <h2>Product Highlights</h2>
      <p>HBX's latest H series RC crawler features a new chassis design and upgraded power system, delivering significantly enhanced off-road performance. As a renowned RC brand, HBX has always been committed to providing quality products for RC hobbyists.</p>
      
      <h3>Core Upgrades</h3>
      <ul>
        <li>Newly designed metal chassis, 30% stronger</li>
        <li>Upgraded brushed motor, more powerful</li>
        <li>Improved suspension system, better off-road capability</li>
        <li>IPX5 waterproof rating, ready for harsh conditions</li>
      </ul>
      
      <h3>Performance Specs</h3>
      <p>Top Speed: 25km/h</p>
      <p>Runtime: 30 minutes</p>
      <p>Charging Time: 90 minutes</p>
      
      <h3>Purchase Recommendations</h3>
      <p>Ideal for intermediate players, excellent value. We recommend pairing with spare batteries for extended runtime. For more RC crawler brands and recommendations, stay tuned to Rcstyle.club news center.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop'
    ],
    video: {
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      platform: 'youtube',
      thumbnail: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&h=450&fit=crop'
    },
    category: '新品发布',
    categoryEn: 'New Products',
    author: 'RC小编',
    authorEn: 'RC Editor',
    publishDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    views: 1256,
    tags: ['HBX', 'RC爬车', '遥控车', '新品发布', '越野模型', '模型车推荐'],
    isNew: true
  },
  {
    id: '2',
    title: '2024全国RC模型锦标赛精彩回顾，遥控车竞速盛宴',
    titleEn: '2024 National RC Model Championship Highlights: RC Racing Extravaganza',
    summary: '2024全国RC模型锦标赛在深圳圆满落幕，吸引了来自全国各地的500余名选手参赛。遥控车竞速、爬车技巧、漂移表演等精彩赛事全面展示。',
    summaryEn: 'The 2024 National RC Model Championship successfully concluded in Shenzhen, attracting over 500 competitors nationwide. Featured RC racing, crawler skills, and drift performances.',
    content: `
      <h2>赛事概况</h2>
      <p>2024全国RC模型锦标赛在深圳圆满落幕，吸引了来自全国各地的500余名选手参赛，创造了历届之最。本次比赛涵盖遥控车竞速、RC模型赛事、爬车技巧等多个项目。</p>
      
      <h3>比赛项目</h3>
      <ul>
        <li>电动房车竞速赛</li>
        <li>燃油越野车竞速赛</li>
        <li>爬车技巧挑战赛</li>
        <li>漂移表演赛</li>
      </ul>
      
      <h3>精彩瞬间</h3>
      <p>本次比赛涌现出众多优秀选手，多场比赛出现激烈的冠军争夺战，现场气氛热烈。</p>
      
      <h3>获奖名单</h3>
      <p>电动房车组冠军：张明（广东）</p>
      <p>燃油越野组冠军：李华（北京）</p>
      <p>爬车技巧组冠军：王强（上海）</p>
    `,
    contentEn: `
      <h2>Event Overview</h2>
      <p>The 2024 National RC Model Championship successfully concluded in Shenzhen, attracting over 500 competitors from across the country, setting a new record. The event featured RC racing, model competitions, and crawler skills challenges.</p>
      
      <h3>Competition Categories</h3>
      <ul>
        <li>Electric Touring Car Racing</li>
        <li>Nitro Off-road Racing</li>
        <li>Crawler Skills Challenge</li>
        <li>Drift Exhibition</li>
      </ul>
      
      <h3>Highlights</h3>
      <p>Many outstanding competitors emerged, with intense championship battles across multiple events creating an exciting atmosphere.</p>
      
      <h3>Winners List</h3>
      <p>Electric Touring Car Champion: Zhang Ming (Guangdong)</p>
      <p>Nitro Off-road Champion: Li Hua (Beijing)</p>
      <p>Crawler Skills Champion: Wang Qiang (Shanghai)</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&h=400&fit=crop'
    ],
    category: '赛事活动',
    categoryEn: 'Events',
    author: '赛事报道组',
    authorEn: 'Event Coverage Team',
    publishDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    views: 2341,
    tags: ['RC锦标赛', '遥控车比赛', '模型赛事', '竞速', '深圳'],
    isNew: true
  },
  {
    id: '3',
    title: 'FMS全新路虎卫士RC模型评测：仿真与性能的完美结合',
    titleEn: 'FMS Land Rover Defender RC Model Review: Perfect Blend of Scale Detail and Performance',
    summary: 'FMS最新推出的路虎卫士RC模型复刻版，以超高的还原度和优秀的越野性能征服了评测团队。专业遥控车评测，为RC模型爱好者提供选购参考。',
    summaryEn: 'FMS\'s latest Land Rover Defender RC model replica impressed our review team with exceptional scale detail and outstanding off-road performance. Professional RC review for hobbyists.',
    content: `
      <h2>评测前言</h2>
      <p>FMS最新推出的路虎卫士RC模型复刻版，以超高的还原度和优秀的越野性能征服了评测团队。作为仿真RC模型代表作品，完美展现了遥控车模型的魅力。</p>
      
      <h3>外观还原度</h3>
      <ul>
        <li>车身比例1:10完美还原</li>
        <li>细节处理精致，车灯可亮</li>
        <li>车门、引擎盖可开启</li>
        <li>内饰做工精细</li>
      </ul>
      
      <h3>性能测试</h3>
      <p>通过多种地形的实测表现优异：</p>
      <p>泥地通过性：⭐⭐⭐⭐⭐</p>
      <p>爬坡能力：⭐⭐⭐⭐</p>
      <p>操控稳定性：⭐⭐⭐⭐⭐</p>
      
      <h3>购买建议</h3>
      <p>推荐指数：⭐⭐⭐⭐⭐</p>
      <p>适合仿真爱好者和越野玩家，性价比极高。更多遥控车评测和模型车推荐，尽在Rcstyle.club。</p>
    `,
    contentEn: `
      <h2>Review Introduction</h2>
      <p>FMS\'s latest Land Rover Defender RC model replica has impressed our review team with exceptional scale detail and outstanding off-road performance. As a representative scale RC model, it perfectly showcases the appeal of RC car models.</p>
      
      <h3>Scale Accuracy</h3>
      <ul>
        <li>Perfect 1:10 scale replica</li>
        <li>Exquisite detail work, functional lights</li>
        <li>Openable doors and hood</li>
        <li>Finely crafted interior</li>
      </ul>
      
      <h3>Performance Testing</h3>
      <p>Excellent performance across various terrains:</p>
      <p>Mud Capability: ⭐⭐⭐⭐⭐</p>
      <p>Climbing Ability: ⭐⭐⭐⭐</p>
      <p>Handling Stability: ⭐⭐⭐⭐⭐</p>
      
      <h3>Purchase Recommendation</h3>
      <p>Rating: ⭐⭐⭐⭐⭐</p>
      <p>Ideal for scale enthusiasts and off-road players, excellent value. For more RC reviews and recommendations, visit Rcstyle.club.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?w=800&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?w=800&h=400&fit=crop'
    ],
    category: '评测对比',
    categoryEn: 'Reviews',
    author: '测评专家',
    authorEn: 'Review Expert',
    publishDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    views: 1823,
    tags: ['FMS', '路虎卫士', 'RC评测', '仿真模型', '遥控车对比'],
    isNew: false
  },
  {
    id: '4',
    title: 'RC模型保养指南：让你的遥控车持久如新',
    titleEn: 'RC Model Maintenance Guide: Keep Your RC Car Like New',
    summary: '专业的RC模型保养技巧，教你如何正确清洁、润滑和存放你的遥控车。遥控车维护全攻略，延长模型车使用寿命。',
    summaryEn: 'Professional RC model maintenance tips, teaching you how to properly clean, lubricate, and store your RC car. Complete RC maintenance guide to extend your model\'s lifespan.',
    content: `
      <h2>保养的重要性</h2>
      <p>正确的保养不仅能延长遥控车寿命，还能保持最佳性能状态。RC模型作为精密设备，定期维护至关重要。</p>
      
      <h3>日常清洁</h3>
      <ul>
        <li>使用软毛刷清除灰尘</li>
        <li>用压缩空气清理难以触及的角落</li>
        <li>避免直接用水冲洗电子部件</li>
      </ul>
      
      <h3>润滑保养</h3>
      <ul>
        <li>齿轮部位定期涂抹润滑油</li>
        <li>轴承部位使用专用润滑脂</li>
        <li>避免润滑剂沾到刹车片</li>
      </ul>
      
      <h3>存放建议</h3>
      <p>存放在干燥通风处，避免阳光直射。电池单独存放，保持50%电量。</p>
    `,
    contentEn: `
      <h2>Importance of Maintenance</h2>
      <p>Proper maintenance not only extends your RC car\'s lifespan but also maintains optimal performance. As precision equipment, RC models require regular maintenance.</p>
      
      <h3>Daily Cleaning</h3>
      <ul>
        <li>Use soft brush to remove dust</li>
        <li>Use compressed air for hard-to-reach areas</li>
        <li>Avoid direct water contact with electronics</li>
      </ul>
      
      <h3>Lubrication</h3>
      <ul>
        <li>Regularly apply lubricant to gears</li>
        <li>Use specialty grease for bearings</li>
        <li>Avoid getting lubricant on brake pads</li>
      </ul>
      
      <h3>Storage Recommendations</h3>
      <p>Store in a dry, ventilated area away from direct sunlight. Store batteries separately at 50% charge.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1581092160562-40aa088e78837?w=800&h=400&fit=crop'
    ],
    category: '技术分享',
    categoryEn: 'Tutorials',
    author: '技术团队',
    authorEn: 'Technical Team',
    publishDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    views: 956,
    tags: ['RC保养', '遥控车维护', '模型车清洁', '技术教程', '使用技巧'],
    isNew: false
  },
  {
    id: '5',
    title: '2024年RC模型行业趋势报告：智能化成主流',
    titleEn: '2024 RC Model Industry Trends Report: Smart Technology Goes Mainstream',
    summary: '权威机构发布2024年RC模型行业报告，智能化和电动化成为主要趋势。遥控车市场分析，模型车行业前景展望。',
    summaryEn: 'Authoritative report on 2024 RC model industry trends reveals smart technology and electrification as major trends. RC market analysis and industry outlook.',
    content: `
      <h2>行业概况</h2>
      <p>2024年全球RC模型市场规模预计达到50亿美元，中国市场增速最快。遥控车行业迎来快速发展期。</p>
      
      <h3>主要趋势</h3>
      <ul>
        <li><strong>智能化：</strong>APP控制、AI辅助驾驶</li>
        <li><strong>电动化：</strong>无刷电机普及，续航提升</li>
        <li><strong>个性化：</strong>3D打印定制件需求增长</li>
        <li><strong>仿真化：</strong>高还原度模型受欢迎</li>
      </ul>
      
      <h3>市场预测</h3>
      <p>预计未来5年复合增长率达8.5%，亚太地区将成为最大市场。</p>
    `,
    contentEn: `
      <h2>Industry Overview</h2>
      <p>The global RC model market is expected to reach $5 billion in 2024, with China showing the fastest growth. The RC car industry is entering a rapid development phase.</p>
      
      <h3>Key Trends</h3>
      <ul>
        <li><strong>Smart Technology:</strong>APP control, AI-assisted driving</li>
        <li><strong>Electrification:</strong>Brushless motors becoming standard, improved runtime</li>
        <li><strong>Personalization:</strong>Growing demand for 3D printed custom parts</li>
        <li><strong>Scale Detail:</strong>High-accuracy scale models gaining popularity</li>
      </ul>
      
      <h3>Market Forecast</h3>
      <p>Expected compound annual growth rate of 8.5% over the next 5 years, with Asia-Pacific becoming the largest market.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    category: '行业动态',
    categoryEn: 'Industry News',
    author: '行业分析师',
    authorEn: 'Industry Analyst',
    publishDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    views: 1245,
    tags: ['行业报告', 'RC市场', '遥控车趋势', '智能化', '模型车行业'],
    isNew: false
  },
  {
    id: '6',
    title: 'Wltoys 144001 RC竞速车深度测评，60km/h极速体验',
    titleEn: 'Wltoys 144001 RC Racer In-Depth Review: 60km/h Speed Experience',
    summary: 'Wltoys 144001 RC竞速车详细测评，60km/h极速体验，性价比之王的实力展示。专业遥控车评测，入门级竞速模型推荐。',
    summaryEn: 'Detailed review of Wltoys 144001 RC racer, 60km/h top speed experience, demonstrating why it\'s the value king. Professional RC review, recommended entry-level racing model.',
    content: `
      <h2>产品介绍</h2>
      <p>Wltoys 144001 RC竞速车是入门级高速遥控车的代表作，以超高性价比著称。适合RC模型入门玩家选购。</p>
      
      <h3>核心参数</h3>
      <ul>
        <li>最高时速：60km/h</li>
        <li>电机：无刷3660</li>
        <li>电池：7.4V 1500mAh锂电</li>
        <li>驱动：四轮驱动</li>
      </ul>
      
      <h3>实测表现</h3>
      <p>加速迅猛，极速体验刺激，但在操控性上需要一定技巧。</p>
      
      <h3>优缺点总结</h3>
      <p>优点：性价比高、速度快、配件便宜</p>
      <p>缺点：悬挂偏硬、电池续航短</p>
    `,
    contentEn: `
      <h2>Product Introduction</h2>
      <p>The Wltoys 144001 RC racer is a representative entry-level high-speed RC car, known for excellent value. Ideal for RC beginners.</p>
      
      <h3>Key Specifications</h3>
      <ul>
        <li>Top Speed: 60km/h</li>
        <li>Motor: Brushless 3660</li>
        <li>Battery: 7.4V 1500mAh LiPo</li>
        <li>Drive: 4WD</li>
      </ul>
      
      <h3>Performance Testing</h3>
      <p>Quick acceleration, thrilling top speed experience, but requires some skill for handling.</p>
      
      <h3>Pros and Cons Summary</h3>
      <p>Pros: Great value, fast, affordable parts</p>
      <p>Cons: Stiff suspension, short battery life</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&h=400&fit=crop',
    category: '评测对比',
    categoryEn: 'Reviews',
    author: '测评专家',
    authorEn: 'Review Expert',
    publishDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    views: 2034,
    tags: ['Wltoys', '144001', 'RC竞速', '遥控车评测', '入门模型'],
    isNew: false
  }
];

// 获取最新资讯（带NEW标记）
export function getLatestNews() {
  return newsData.filter(article => article.isNew);
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
