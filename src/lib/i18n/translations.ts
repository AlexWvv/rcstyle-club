// 国际化翻译文件

export const translations = {
  // 中文翻译
  zh: {
    // 导航
    nav: {
      home: '首页',
      news: '资讯中心',
      brands: '品牌',
      vloggers: '博主',
      backHome: '返回首页',
      search: '搜索',
    },
    
    // 搜索
    search: {
      placeholder: '搜索品牌、资讯、博主...',
      recentSearches: '最近搜索',
      trending: '热门搜索',
      clear: '清空',
      all: '全部',
      brand: '品牌',
      news: '资讯',
      vlogger: '博主',
      noResults: '未找到相关结果',
      tryDifferent: '试试其他关键词',
      shortcut: '按 ⌘K 快速搜索',
    },
    
    // 首页
    home: {
      heroTitle: 'RC 汽车模型爱好者天堂',
      heroSubtitle: '汇集全球顶级RC汽车品牌官网与知名视频博主资源',
      heroDescription: '为您提供一站式RC模型资讯导航，覆盖整车、电子配件、轮胎轮毂全品类',
      brandCount: '品牌厂商',
      categoryCount: '产品分类',
      vloggerCount: '视频博主',
      strategicPartner: '战略合作方',
      partnerDesc: '携手优质合作伙伴，为您提供更优质的服务',
      bookmark: '收藏本站',
      bookmarkHint: '按',
      bookmarkHint2: '收藏本站',
      selected: '国内外精选',
      
      // 资讯中心
      newsCenter: '资讯中心',
      newsDesc: '了解RC模型行业动态',
      viewMore: '查看更多',
      
      // 分类
      domesticBrands: '国内品牌',
      overseasBrands: '海外品牌',
      domesticSubtitle: '中国制造，品质之选',
      overseasSubtitle: '国际知名，全球热销',
      
      // 品牌卡片
      hotSeries: '热卖系列：',
      priceRange: '价格区间',
      purchaseChannel: '购买渠道',
      suitableFor: '适合',
      visitOfficial: '访问官网',
      
      // 博主
      domesticVloggers: '国内博主',
      overseasVloggers: '国外博主',
      followDouyin: '关注抖音',
      visitChannel: '访问频道',
      
      // 广告
      adSlot: '广告位招租',
      adDesc: '精准触达RC模型爱好者 | 月曝光量10W+ | 多种尺寸可选',
      contactUs: '联系我们',
      
      // 页脚
      footerDesc: 'Rcstyle.club - 为RC爱好者提供优质资源',
      footerNote: '数据持续更新中 · 如有遗漏或错误请联系我们',
    },
    
    // 资讯列表页
    news: {
      title: '资讯中心',
      subtitle: '最新资讯',
      subtitleDesc: '了解RC模型行业动态，获取最新资讯',
      all: '全部',
      newProducts: '新品发布',
      reviews: '评测对比',
      events: '赛事活动',
      tutorials: '技术分享',
      industry: '行业动态',
    },
    
    // 资讯详情页
    newsDetail: {
      author: '作者',
      publishDate: '发布时间',
      views: '阅读数',
      tags: '标签',
      share: '分享',
      relatedNews: '相关资讯',
      video: '视频',
      images: '图片',
      backToNews: '返回资讯列表',
    },
    
    // 通用
    common: {
      loading: '加载中...',
      error: '加载失败',
      retry: '重试',
      today: '今天',
      yesterday: '昨天',
      daysAgo: '天前',
      weeksAgo: '周前',
    },
    
    // 分类名称
    categories: {
      vehicles: '整车品牌',
      'rc-controllers': '遥控器 / 接收机',
      'motors-escs': '电机 + 电调',
      servos: '舵机',
      'tires-wheels': '轮胎 / 轮毂',
      batteries: '电池',
      chargers: '充电器',
      accessories: '配件 / 工具',
    },
    
    // SEO关键词
    seo: {
      hotKeywords: '热门关键词',
      relatedSearches: '相关搜索',
      // 首页关键词
      home: [
        { text: 'RC遥控车', en: 'RC Remote Control Car' },
        { text: '遥控车模型', en: 'RC Car Model' },
        { text: '攀爬车', en: 'RC Crawler' },
        { text: '越野车', en: 'RC Off-road' },
        { text: '大脚车', en: 'Monster Truck' },
        { text: 'HBX遥控车', en: 'HBX RC Car' },
        { text: 'Traxxas', en: 'Traxxas' },
        { text: 'Arrma', en: 'Arrma' },
        { text: '入门遥控车推荐', en: 'Beginner RC Car Guide' },
        { text: '遥控车哪个牌子好', en: 'Best RC Car Brands' },
      ],
      // 资讯页关键词
      news: [
        { text: 'RC资讯', en: 'RC News' },
        { text: '遥控车测评', en: 'RC Car Review' },
        { text: 'RC评测', en: 'RC Review' },
        { text: '遥控车新品', en: 'New RC Cars' },
        { text: 'RC赛事', en: 'RC Racing Events' },
        { text: '遥控车比赛', en: 'RC Competition' },
        { text: 'RC教程', en: 'RC Tutorial' },
        { text: '遥控车改装', en: 'RC Car Modification' },
        { text: 'Traxxas新闻', en: 'Traxxas News' },
        { text: 'Arrma评测', en: 'Arrma Review' },
      ],
      // 品牌页关键词
      brands: [
        { text: 'RC品牌', en: 'RC Brands' },
        { text: '遥控车品牌大全', en: 'RC Brand Directory' },
        { text: 'HBX易控', en: 'HBX RC' },
        { text: 'FMS模型', en: 'FMS Model' },
        { text: '伟力遥控车', en: 'WLtoys RC' },
        { text: '雷拉洛', en: 'Rlaarlo' },
        { text: 'Axial攀爬车', en: 'Axial Crawler' },
        { text: '好盈电调', en: 'Hobbywing ESC' },
        { text: '国产遥控车品牌', en: 'Chinese RC Brands' },
        { text: '进口遥控车品牌', en: 'Import RC Brands' },
      ],
      // 博主页关键词
      vloggers: [
        { text: 'RC博主', en: 'RC Vlogger' },
        { text: '遥控车UP主', en: 'RC YouTuber' },
        { text: '抖音RC博主', en: 'Douyin RC Creator' },
        { text: 'B站遥控车', en: 'Bilibili RC' },
        { text: 'RC测评', en: 'RC Review' },
        { text: '遥控车视频', en: 'RC Car Video' },
        { text: '攀爬车博主', en: 'Crawler Vlogger' },
        { text: 'RC开箱', en: 'RC Unboxing' },
        { text: '遥控车改装教程', en: 'RC Mod Tutorial' },
        { text: 'RC博主推荐', en: 'RC Vlogger Recommendation' },
      ],
      // 车型库关键词
      models: [
        { text: 'RC车型库', en: 'RC Models Database' },
        { text: '攀爬车推荐', en: 'Crawler Recommendation' },
        { text: '越野车推荐', en: 'Off-road Recommendation' },
        { text: '大脚车推荐', en: 'Monster Truck Guide' },
        { text: '漂移车', en: 'Drift Car' },
        { text: 'RC说明书下载', en: 'RC Manual Download' },
        { text: '遥控车参数', en: 'RC Car Specs' },
        { text: '1/10遥控车', en: '1/10 Scale RC' },
        { text: '1/8遥控车', en: '1/8 Scale RC' },
        { text: '入门遥控车', en: 'Entry Level RC' },
      ],
      // 关于页关键词
      about: [
        { text: 'Rcstyle.club', en: 'Rcstyle.club' },
        { text: 'RC模型导航', en: 'RC Model Directory' },
        { text: '遥控车资源', en: 'RC Resources' },
        { text: 'RC爱好者', en: 'RC Enthusiast' },
        { text: '遥控车玩家社区', en: 'RC Community' },
      ],
    },
  },
  
  // 英文翻译
  en: {
    // Navigation
    nav: {
      home: 'Home',
      news: 'News',
      brands: 'Brands',
      vloggers: 'Vloggers',
      backHome: 'Back to Home',
      search: 'Search',
    },
    
    // Search
    search: {
      placeholder: 'Search brands, news, vloggers...',
      recentSearches: 'Recent',
      trending: 'Trending',
      clear: 'Clear',
      all: 'All',
      brand: 'Brand',
      news: 'News',
      vlogger: 'Vlogger',
      noResults: 'No results found',
      tryDifferent: 'Try different keywords',
      shortcut: 'Press ⌘K to search',
    },
    
    // Home page
    home: {
      heroTitle: 'Paradise for RC Car Model Enthusiasts',
      heroSubtitle: 'Collection of top global RC car brand websites and famous video bloggers',
      heroDescription: 'One-stop RC model information navigation, covering complete vehicles, electronic accessories, tires and wheels',
      brandCount: 'Brand Manufacturers',
      categoryCount: 'Product Categories',
      vloggerCount: 'Video Bloggers',
      strategicPartner: 'Strategic Partner',
      partnerDesc: 'Working with quality partners to provide you with better services',
      bookmark: 'Bookmark This Site',
      bookmarkHint: 'Press',
      bookmarkHint2: 'to bookmark',
      selected: 'Selected Worldwide',
      
      // News Center
      newsCenter: 'News Center',
      newsDesc: 'Stay updated with RC model industry trends',
      viewMore: 'View More',
      
      // Categories
      domesticBrands: 'Domestic Brands',
      overseasBrands: 'Overseas Brands',
      domesticSubtitle: 'Made in China, Quality Choice',
      overseasSubtitle: 'International Renowned, Global Best-sellers',
      
      // Brand Card
      hotSeries: 'Hot Series:',
      priceRange: 'Price Range',
      purchaseChannel: 'Purchase Channel',
      suitableFor: 'Suitable for',
      visitOfficial: 'Visit Official Site',
      
      // Vloggers
      domesticVloggers: 'Domestic Vloggers',
      overseasVloggers: 'Overseas Vloggers',
      followDouyin: 'Follow on Douyin',
      visitChannel: 'Visit Channel',
      
      // Ads
      adSlot: 'Ad Space Available',
      adDesc: 'Reach RC model enthusiasts precisely | 100K+ monthly impressions | Multiple sizes available',
      contactUs: 'Contact Us',
      
      // Footer
      footerDesc: 'Rcstyle.club - Providing quality resources for RC enthusiasts',
      footerNote: 'Data continuously updated · Contact us for omissions or errors',
    },
    
    // News List Page
    news: {
      title: 'News Center',
      subtitle: 'Latest News',
      subtitleDesc: 'Stay updated with RC model industry trends and latest news',
      all: 'All',
      newProducts: 'New Products',
      reviews: 'Reviews & Comparisons',
      events: 'Events & Competitions',
      tutorials: 'Tutorials',
      industry: 'Industry News',
    },
    
    // News Detail Page
    newsDetail: {
      author: 'Author',
      publishDate: 'Publish Date',
      views: 'Views',
      tags: 'Tags',
      share: 'Share',
      relatedNews: 'Related News',
      video: 'Video',
      images: 'Images',
      backToNews: 'Back to News',
    },
    
    // Common
    common: {
      loading: 'Loading...',
      error: 'Failed to load',
      retry: 'Retry',
      today: 'Today',
      yesterday: 'Yesterday',
      daysAgo: 'days ago',
      weeksAgo: 'weeks ago',
    },
    
    // Category Names
    categories: {
      vehicles: 'Vehicle Brands',
      'rc-controllers': 'Remote Controllers & Receivers',
      'motors-escs': 'Motors & ESCs',
      servos: 'Servos',
      'tires-wheels': 'Tires & Wheels',
      batteries: 'Batteries',
      chargers: 'Chargers',
      accessories: 'Accessories & Tools',
    },
    
    // SEO Keywords
    seo: {
      hotKeywords: 'Hot Keywords',
      relatedSearches: 'Related Searches',
      // Home page keywords
      home: [
        { text: 'RC Remote Control Car', en: 'RC Remote Control Car' },
        { text: 'RC Car Model', en: 'RC Car Model' },
        { text: 'RC Crawler', en: 'RC Crawler' },
        { text: 'RC Off-road', en: 'RC Off-road' },
        { text: 'Monster Truck', en: 'Monster Truck' },
        { text: 'HBX RC Car', en: 'HBX RC Car' },
        { text: 'Traxxas', en: 'Traxxas' },
        { text: 'Arrma', en: 'Arrma' },
        { text: 'Beginner RC Car Guide', en: 'Beginner RC Car Guide' },
        { text: 'Best RC Car Brands', en: 'Best RC Car Brands' },
      ],
      // News page keywords
      news: [
        { text: 'RC News', en: 'RC News' },
        { text: 'RC Car Review', en: 'RC Car Review' },
        { text: 'RC Review', en: 'RC Review' },
        { text: 'New RC Cars', en: 'New RC Cars' },
        { text: 'RC Racing Events', en: 'RC Racing Events' },
        { text: 'RC Competition', en: 'RC Competition' },
        { text: 'RC Tutorial', en: 'RC Tutorial' },
        { text: 'RC Car Modification', en: 'RC Car Modification' },
        { text: 'Traxxas News', en: 'Traxxas News' },
        { text: 'Arrma Review', en: 'Arrma Review' },
      ],
      // Brands page keywords
      brands: [
        { text: 'RC Brands', en: 'RC Brands' },
        { text: 'RC Brand Directory', en: 'RC Brand Directory' },
        { text: 'HBX RC', en: 'HBX RC' },
        { text: 'FMS Model', en: 'FMS Model' },
        { text: 'WLtoys RC', en: 'WLtoys RC' },
        { text: 'Rlaarlo', en: 'Rlaarlo' },
        { text: 'Axial Crawler', en: 'Axial Crawler' },
        { text: 'Hobbywing ESC', en: 'Hobbywing ESC' },
        { text: 'Chinese RC Brands', en: 'Chinese RC Brands' },
        { text: 'Import RC Brands', en: 'Import RC Brands' },
      ],
      // Vloggers page keywords
      vloggers: [
        { text: 'RC Vlogger', en: 'RC Vlogger' },
        { text: 'RC YouTuber', en: 'RC YouTuber' },
        { text: 'Douyin RC Creator', en: 'Douyin RC Creator' },
        { text: 'Bilibili RC', en: 'Bilibili RC' },
        { text: 'RC Review', en: 'RC Review' },
        { text: 'RC Car Video', en: 'RC Car Video' },
        { text: 'Crawler Vlogger', en: 'Crawler Vlogger' },
        { text: 'RC Unboxing', en: 'RC Unboxing' },
        { text: 'RC Mod Tutorial', en: 'RC Mod Tutorial' },
        { text: 'RC Vlogger Recommendation', en: 'RC Vlogger Recommendation' },
      ],
      // Models page keywords
      models: [
        { text: 'RC Models Database', en: 'RC Models Database' },
        { text: 'Crawler Recommendation', en: 'Crawler Recommendation' },
        { text: 'Off-road Recommendation', en: 'Off-road Recommendation' },
        { text: 'Monster Truck Guide', en: 'Monster Truck Guide' },
        { text: 'Drift Car', en: 'Drift Car' },
        { text: 'RC Manual Download', en: 'RC Manual Download' },
        { text: 'RC Car Specs', en: 'RC Car Specs' },
        { text: '1/10 Scale RC', en: '1/10 Scale RC' },
        { text: '1/8 Scale RC', en: '1/8 Scale RC' },
        { text: 'Entry Level RC', en: 'Entry Level RC' },
      ],
      // About page keywords
      about: [
        { text: 'Rcstyle.club', en: 'Rcstyle.club' },
        { text: 'RC Model Directory', en: 'RC Model Directory' },
        { text: 'RC Resources', en: 'RC Resources' },
        { text: 'RC Enthusiast', en: 'RC Enthusiast' },
        { text: 'RC Community', en: 'RC Community' },
      ],
    },
  },
} as const;

export type Language = 'zh' | 'en';
export type TranslationKey = keyof typeof translations.zh;
