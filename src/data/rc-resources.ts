// RC汽车模型资源数据 - 完整分类版

export interface Brand {
  name: string;
  nameEn?: string;
  country: string;
  website: string;
  description: string;
  descriptionEn?: string; // 英文描述
  tier?: 'first' | 'second' | 'third';
  models?: string[];
  highlight?: string;
  highlightEn?: string; // 英文亮点
  // 整车品牌扩展字段
  origin?: string;          // 产地
  priceRange?: string;      // 价格区间
  purchaseChannels?: string; // 购买渠道
  suitableFor?: string;     // 适合人群/场景
  logo?: string;            // 品牌logo URL
}

export interface Category {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  brands: Brand[];
}

// 获取品牌logo的辅助函数 - 使用Google Favicon服务
const getLogo = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

// ==================== 整车品牌 ====================
const vehicleBrands: Category = {
  id: 'vehicles',
  title: '整车品牌',
  titleEn: 'Vehicle Brands',
  icon: 'Car',
  brands: [
    // ========== 国内品牌 ==========
    {
      name: '易控模型',
      nameEn: 'HBX',
      country: '中国',
      website: 'https://www.hbxrc.com',
      description: '国内知名RC品牌，专注于入门级越野车和攀爬车，性价比极高',
      descriptionEn: 'Renowned domestic RC brand, specializing in entry-level off-road vehicles and crawlers, excellent value',
      models: ['16889', '16890', '15889', '12889', '16886'],
      priceRange: '¥300-1,500',
      purchaseChannels: '天猫、京东、拼多多、官方旗舰店',
      suitableFor: '新手入门、越野爱好者、攀爬玩家',
      highlight: '入门级性价比之王，适合新手练手',
      highlightEn: 'King of entry-level value, perfect for beginners',
      logo: getLogo('hbxrc.com')
    },
    {
      name: '雷拉洛',
      nameEn: 'Rlaarlo',
      country: '中国',
      website: 'https://www.rlaarlo.com',
      description: '新兴国产RC品牌，主打高性能越野车和攀爬车，设计感强',
      descriptionEn: 'Emerging domestic RC brand, focusing on high-performance off-road vehicles and crawlers, stylish design',
      models: ['AM-X9', 'AM-X7', 'AM-X5', 'RC Car系列'],
      priceRange: '¥500-2,000',
      purchaseChannels: '官方商城、天猫国际、跨境电商',
      suitableFor: '中端玩家、越野爱好者',
      highlight: '设计新颖，性能出色，国产品质新选择',
      highlightEn: 'Innovative design, excellent performance, new choice for domestic quality',
      logo: getLogo('rlaarlo.com')
    },
    {
      name: 'FMS模型',
      nameEn: 'FMS Model',
      country: '中国',
      website: 'https://www.fmsmodel.com',
      description: '专注于攀爬车和仿真车模型，高品质仿真系列，细节还原度高',
      descriptionEn: 'Specializing in crawler and scale model vehicles, high-quality scale series with exceptional detail',
      models: ['FCX24', 'FCX18', 'FCX6', '攀爬系列', '仿真卡车'],
      priceRange: '¥600-3,000',
      purchaseChannels: '官方商城、天猫、京东、模型店',
      suitableFor: '攀爬车爱好者、仿真玩家、收藏家',
      highlight: '仿真细节业界领先，攀爬车口碑好',
      highlightEn: 'Industry-leading scale detail, excellent crawler reputation',
      logo: getLogo('fmsmodel.com')
    },
    {
      name: '伟力',
      nameEn: 'WLtoys',
      country: '中国',
      website: 'https://www.wltoys.com',
      description: '老牌国产RC厂商，产品线覆盖海陆空，越野车系列性价比高',
      descriptionEn: 'Established domestic RC manufacturer, comprehensive product line covering land, sea and air, excellent value off-road series',
      models: ['144001', '124017', '124018', '124019', '9116', '9125'],
      priceRange: '¥200-1,200',
      purchaseChannels: '天猫、京东、拼多多、淘宝',
      suitableFor: '新手入门、越野玩家、预算有限玩家',
      highlight: '国民品牌，价格亲民，配件丰富',
      highlightEn: 'National brand, affordable prices, abundant parts',
      logo: getLogo('wltoys.com')
    },
    {
      name: '美嘉欣',
      nameEn: 'MJX',
      country: '中国',
      website: 'https://www.mjxrc.com',
      description: '专业遥控模型制造商，涵盖车、船、飞机，性价比高的入门级产品',
      models: ['14210', '16208', '16209', 'Hyper Go系列'],
      priceRange: '¥200-1,000',
      purchaseChannels: '天猫、京东、拼多多、官方旗舰店',
      suitableFor: '新手入门、家庭娱乐',
      highlight: '入门级首选，品质稳定',
      logo: getLogo('mjxrc.com')
    },
    {
      name: '莽牛',
      nameEn: 'Mangmang',
      country: '中国',
      website: 'https://www.mangniu-rc.com',
      description: '国产攀爬车专业品牌，专注于岩石攀爬和仿真攀爬车',
      models: ['MN-82', 'MN-83', 'MN-90', '攀爬系列'],
      priceRange: '¥400-1,500',
      purchaseChannels: '天猫、淘宝、专业模型店',
      suitableFor: '攀爬车玩家、仿真爱好者',
      highlight: '攀爬车专业品牌，性价比高',
      logo: getLogo('mangniu-rc.com')
    },
    {
      name: 'KM模型',
      nameEn: 'KM Racing',
      country: '中国',
      website: 'https://www.kmracing.com.cn',
      description: '国产竞赛级RC品牌，专注于1/8和1/10竞赛车型，专业玩家选择',
      models: ['KM-001', 'KM-002', 'H系列', '竞赛系列'],
      priceRange: '¥800-3,000',
      purchaseChannels: '官方商城、专业模型店、比赛渠道',
      suitableFor: '竞赛玩家、专业爱好者',
      highlight: '竞赛级品质，专业玩家认可',
      logo: getLogo('kmracing.com.cn')
    },
    {
      name: '弘谷模型',
      nameEn: 'HSP',
      country: '中国',
      website: 'https://www.hspcn.com',
      description: '国内知名RC模型品牌，产品线覆盖入门到竞赛级，渠道广泛',
      models: ['94123', '94188', '94111', '94186', '攀爬车系列'],
      priceRange: '¥300-2,000',
      purchaseChannels: '天猫、京东、淘宝、模型店',
      suitableFor: '入门到进阶玩家',
      highlight: '产品线丰富，配件易得',
      logo: getLogo('hspcn.com')
    },
    {
      name: '飞神模型',
      country: '中国',
      website: 'https://www.feishenmodel.com',
      description: '专业RC模型制造商，主打越野车和攀爬车系列',
      models: ['FS系列', '越野车', '攀爬车'],
      priceRange: '¥400-1,500',
      purchaseChannels: '天猫、淘宝、模型店',
      suitableFor: '越野车玩家、攀爬爱好者',
      highlight: '国产老牌，品质稳定',
      logo: getLogo('feishenmodel.com')
    },
    {
      name: 'MST',
      nameEn: 'Max Speed Technology',
      country: '中国台湾',
      website: 'https://www.mst-rc.com',
      description: 'RC漂移车全球认知度很高，适合做细分垂类',
      models: ['RMX 2.5', 'RMX 4', 'RMX 4 GT', 'RMX-M', 'CMX', 'CFX'],
      origin: '中国台湾品牌与制造体系色彩较强',
      priceRange: '¥2,000-4,000',
      purchaseChannels: '官网资讯页、代理商、AMain、RCMart、漂移车专门店',
      suitableFor: '漂移车玩家、细分垂类',
      highlight: 'RC漂移车全球认知度很高',
      logo: getLogo('mst-rc.com')
    },
    {
      name: 'HoBao',
      country: '中国台湾',
      website: 'https://www.hobao.com.tw',
      description: '1/8越野和Nitro老牌，比赛/玩家市场稳定',
      models: ['Hyper系列', 'TT 2.0', 'VS2', 'VTE2'],
      origin: '中国台湾品牌；市场普遍视为台湾品牌、亚洲制造',
      priceRange: '¥2,000-5,000',
      purchaseChannels: '官网/区域代理、经销商、专业店',
      suitableFor: '1/8越野玩家、Nitro爱好者',
      highlight: '1/8越野和Nitro老牌，比赛/玩家市场稳定',
      logo: getLogo('hobao.com.tw')
    },
    
    // ========== 海外品牌 ==========
    {
      name: 'Traxxas',
      country: '美国',
      website: 'https://traxxas.com',
      description: '全球顶级RC品牌，以高性能和耐用性著称，北美流通最强之一',
      descriptionEn: 'Top-tier global RC brand, known for high performance and durability, strongest distribution in North America',
      models: ['Slash', 'X-Maxx', 'Maxx', 'TRX-4', 'Rustler', 'Bandit'],
      origin: '总部在美国得州 McKinney',
      priceRange: 'US$200–1,500+',
      purchaseChannels: '官网、授权经销商、专业RC零售商',
      suitableFor: '入门到高端RTR玩家',
      highlight: '入门到高端RTR全覆盖，X-Maxx最受欢迎',
      highlightEn: 'Full coverage from entry to high-end RTR, X-Maxx most popular',
      logo: getLogo('traxxas.com')
    },
    {
      name: 'ARRMA',
      country: '美国',
      website: 'https://arrma-rc.com',
      description: '高性能暴力RC车品牌，刷街/暴力越野basher很强',
      models: ['KRATON', 'OUTCAST', 'MOJAVE', 'TYPHON', 'GRANITE', 'GORGON'],
      origin: '品牌归属Horizon Hobby',
      priceRange: 'US$170–1,100',
      purchaseChannels: '官网直购、Horizon/Hobby渠道、授权门店',
      suitableFor: '暴力越野玩家、刷街爱好者',
      highlight: '暴力越野basher很强，电动高性能增长快',
      logo: getLogo('arrma-rc.com')
    },
    {
      name: 'Losi',
      country: '美国',
      website: 'https://www.losi.com',
      description: '高性能RC赛车品牌，竞速血统强，兼顾RTR和比赛级平台',
      models: ['Mini-B', 'Mini-T', 'Promoto-MX', '22S', '8IGHT', '22系列'],
      priceRange: 'US$120–550+',
      purchaseChannels: '官网、Horizon Hobby、授权经销商',
      suitableFor: '竞速玩家，兼顾RTR和比赛级',
      highlight: '竞速血统强，Mini系列性价比高',
      logo: getLogo('losi.com')
    },
    {
      name: 'Axial',
      country: '美国',
      website: 'https://www.axialracing.com',
      description: '攀爬车和岩石赛车领域的领导者，岩爬/仿真crawler领域影响力很强',
      models: ['SCX24', 'SCX10', 'Capra', 'UTB18'],
      priceRange: 'US$160–500+',
      purchaseChannels: '官网、Horizon Hobby、授权爬车门店',
      suitableFor: '攀爬车爱好者、仿真玩家',
      highlight: '岩爬/仿真crawler领域领导者',
      logo: getLogo('axialracing.com')
    },
    {
      name: 'Team Associated',
      country: '美国',
      website: 'https://www.teamassociated.com',
      description: '竞赛级RC车制造商，竞赛基因很深，RC10系列是标志性产品',
      models: ['RC10', 'RIVAL MT10', 'B7/B84', 'Pro2 SC10', 'Trail Truck'],
      priceRange: 'US$180–460+',
      purchaseChannels: '官网商城、授权经销商、AMain等',
      suitableFor: '竞赛玩家、RC10经典爱好者',
      highlight: '竞赛基因深，RC10系列标志性',
      logo: getLogo('teamassociated.com')
    },
    {
      name: 'Tekno RC',
      country: '美国',
      website: 'https://www.teknorc.com',
      description: '1/8、1/10高性能kit很强，玩家口碑好',
      models: ['EB48', 'NB48', 'ET48', 'MT410', 'SCT410', 'EB410'],
      priceRange: 'US$430–700',
      purchaseChannels: '官网、经销商、比赛店',
      suitableFor: '高性能kit玩家',
      highlight: '1/8、1/10高性能kit很强',
      logo: getLogo('teknorc.com')
    },
    {
      name: 'Redcat',
      country: '美国',
      website: 'https://www.redcatracing.com',
      description: '性价比、仿真和爬车/大车线都在扩张',
      models: ['Ascent', 'Vigilante', 'Rampage', 'RDS', 'Gen系列'],
      priceRange: 'US$200–1,070',
      purchaseChannels: '官网、授权经销商、模型零售渠道',
      suitableFor: '性价比玩家、仿真和爬车爱好者',
      highlight: '性价比路线，仿真和爬车线扩张',
      logo: getLogo('redcatracing.com')
    },
    {
      name: 'Tamiya',
      nameEn: '田宫',
      country: '日本',
      website: 'https://www.tamiya.com',
      description: '日本老牌模型厂商，RC模型的标杆，品牌认知极高，套件文化强',
      models: ['TT-02', 'XV-02', 'Hornet', 'Grasshopper', 'Hotshot', 'M-Chassis'],
      priceRange: 'US$190–470+',
      purchaseChannels: '官网、代理商、模型店、赛事门店',
      suitableFor: '模型爱好者、套件玩家',
      highlight: '品牌认知极高，套件文化强',
      logo: getLogo('tamiya.com')
    },
    {
      name: 'Kyosho',
      nameEn: '京商',
      country: '日本',
      website: 'https://www.kyosho.com',
      description: '日本顶级RC制造商，微型车、竞赛车、收藏授权车身都很强',
      models: ['MINI-Z', 'FAZER', 'Inferno', 'Mad Van', 'Optima'],
      priceRange: 'US$100–700',
      purchaseChannels: '官网商城、零售商、品牌经销网络',
      suitableFor: '微型车玩家、竞赛玩家',
      highlight: 'MINI-Z系列享誉全球',
      logo: getLogo('kyosho.com')
    },
    {
      name: 'Mugen Seiki',
      country: '日本',
      website: 'https://www.mugenseiki.com',
      description: '专业竞赛级RC车制造商，GP越野车专家',
      models: ['MBX8', 'MBX7', 'MRX6', 'MTX7'],
      priceRange: 'US$500–800',
      purchaseChannels: '官网经销网络、专业比赛店',
      suitableFor: '高端竞赛玩家',
      highlight: 'GP越野车专家，竞赛级品质',
      logo: getLogo('mugenseiki.com')
    },
    {
      name: 'HPI Racing',
      country: '英国',
      website: 'https://www.hpiracing.com',
      description: '漂移、拉力、Monster Truck老牌强势',
      models: ['Savage', 'WR8', 'RS4', 'Vorza', 'Baja'],
      priceRange: 'US$300–1,000+',
      purchaseChannels: '官网、代理商、专业RC零售商',
      suitableFor: '漂移玩家、拉力爱好者',
      highlight: '漂移、拉力、Monster Truck老牌强势',
      logo: getLogo('hpiracing.com')
    },
    {
      name: 'Schumacher',
      country: '英国',
      website: 'https://www.schumacherracing.com',
      description: '欧洲竞赛圈影响力大，偏比赛级kit',
      models: ['Cougar LD3', 'CAT系列', 'Eclipse', 'Mi系列'],
      priceRange: 'US$410–445+',
      purchaseChannels: '官网、经销商、专业比赛店',
      suitableFor: '竞赛玩家、欧洲市场',
      highlight: '欧洲竞赛圈影响力大',
      logo: getLogo('schumacherracing.com')
    },
    {
      name: 'XRAY',
      country: '斯洛伐克',
      website: 'https://www.teamxray.com',
      description: '欧洲顶级竞赛品牌，高端比赛级品牌',
      models: ['XB2', 'XB4', 'XT4', 'X4', 'XB8'],
      origin: '斯洛伐克工厂设计、开发并完全制造',
      priceRange: 'US$530–700+',
      purchaseChannels: '官网经销网络、RC America、专业比赛店',
      suitableFor: '高端竞赛玩家',
      highlight: '欧洲制造，高端竞赛品牌',
      logo: getLogo('teamxray.com')
    },
    {
      name: 'Serpent',
      country: '荷兰',
      website: 'https://www.serpent.com',
      description: '偏比赛级、公路/越野平台并行',
      models: ['Medius X20', 'SRX8', '426 Outlaw'],
      priceRange: 'US$328起',
      purchaseChannels: '官网商城、Serpent America、AMain等',
      suitableFor: '比赛级玩家、公路/越野爱好者',
      highlight: '比赛级，公路/越野平台并行',
      logo: getLogo('serpent.com')
    },
    {
      name: 'CEN Racing',
      country: '美国/中国台湾',
      website: 'https://www.cenracing.com',
      description: '授权仿真皮卡、路车和大尺寸RTR较突出',
      models: ['Ford F-250', 'M-Sport/Ford Ranger', 'Q-Series', 'DL-Series'],
      priceRange: 'US$399起',
      purchaseChannels: '官网、经销商、专业RC店',
      suitableFor: '授权仿真皮卡爱好者',
      highlight: '授权仿真皮卡突出',
      logo: getLogo('cenracing.com')
    }
  ]
};

// ==================== 遥控器 / 接收机品牌 ====================
const remoteControllers: Category = {
  id: 'rc-controllers',
  title: '遥控器 / 接收机',
  titleEn: 'Remote Controllers & Receivers',
  icon: 'Radio',
  brands: [
    // 国内品牌
    {
      name: 'FlySky 富斯',
      nameEn: 'FlySky',
      country: '中国',
      website: 'https://www.flysky-cn.com',
      description: '中高端性价比枪控，中高端市场竞争力强',
      models: ['Noble NB4', 'NB4+', 'NB4 Pro+', 'FS-GT5'],
      priceRange: '¥300-1,500',
      purchaseChannels: '天猫、京东、淘宝、跨境电商',
      suitableFor: '入门到中端玩家',
      highlight: 'NB4系列属于旗舰车船遥控器',
      logo: getLogo('flysky-cn.com')
    },
    {
      name: 'RadioLink 乐迪',
      country: '中国',
      website: 'https://www.radiolink.com',
      description: '主打高响应与较长控制距离',
      models: ['RC8X', 'RC6GS', 'RC4GS', 'T8FB'],
      priceRange: '¥400-1,200',
      purchaseChannels: '天猫、京东、淘宝、跨境电商',
      suitableFor: '入门到中端玩家',
      highlight: '车船8通道遥控，高响应',
      logo: getLogo('radiolink.com')
    },
    {
      name: 'DUMBORC 小飞象',
      country: '中国',
      website: 'https://www.dumborc.com',
      description: 'RadioLink子品牌，定位高性价比枪控/RTR配套',
      models: ['X4', 'X5', 'X6', 'X10P-350', 'DDF-350'],
      priceRange: '¥150-500',
      purchaseChannels: '天猫、淘宝、拼多多',
      suitableFor: '入门玩家、RTR配套',
      highlight: '高性价比，适合入门和RTR配套',
      logo: getLogo('dumborc.com')
    },
    {
      name: 'SENSE 三石创新',
      country: '中国',
      website: 'https://www.sense-rc.com',
      description: '新兴国产高性价比遥控器品牌',
      models: ['S10', 'S8'],
      priceRange: '¥300-600',
      purchaseChannels: '天猫、淘宝',
      suitableFor: '入门到中端玩家',
      highlight: '10通道遥控系统',
      logo: getLogo('sense-rc.com')
    },
    // 海外品牌
    {
      name: 'Futaba',
      country: '日本',
      website: 'https://www.futabausa.com',
      description: '车用遥控、接收机、舵机都强，行业标杆品牌',
      models: ['3PV', '4PM Plus', '10PX', '7PX'],
      priceRange: 'US$150–600',
      purchaseChannels: '官网、授权经销商、专业模型店',
      suitableFor: '专业玩家、竞赛选手',
      highlight: 'Futaba USA官网可看到Surface Systems',
      logo: getLogo('futabausa.com')
    },
    {
      name: 'Sanwa',
      nameEn: '三和',
      country: '日本',
      website: 'https://www.sanwa-denshi.co.jp',
      description: '竞赛圈认知度高，专业级遥控系统',
      models: ['MT-5', 'M17S', 'MT-R', 'MX-6'],
      priceRange: 'US$200–500',
      purchaseChannels: '官网、代理商、专业模型店',
      suitableFor: '竞赛玩家',
      highlight: 'MT-5支持FH5与SUR模式',
      logo: getLogo('sanwa-denshi.co.jp')
    },
    {
      name: 'Spektrum',
      country: '美国',
      website: 'https://www.spektrumrc.com',
      description: '欧美市场常见，带遥测与系统生态',
      models: ['DX5C', 'DX5 Rugged', 'DX3', 'iX系列'],
      priceRange: 'US$150–400',
      purchaseChannels: '官网、Horizon Hobby、授权经销商',
      suitableFor: '入门到中端玩家',
      highlight: '带遥测与系统生态',
      logo: getLogo('spektrumrc.com')
    },
    {
      name: 'Absima',
      country: '德国',
      website: 'https://www.absima.com',
      description: '欧洲市场常见的遥控器品牌',
      models: ['AT3.0', 'AT4.0', 'AT5.0'],
      priceRange: '€100–300',
      purchaseChannels: '官网、欧洲零售商',
      suitableFor: '欧洲入门玩家',
      highlight: '欧洲市场常见',
      logo: getLogo('absima.com')
    },
    {
      name: 'Carson',
      country: '德国',
      website: 'https://www.carson-modelsport.com',
      description: '欧洲零售渠道常见品牌',
      models: ['2.0系列', '4.0系列'],
      priceRange: '€80–250',
      purchaseChannels: '官网、欧洲零售商',
      suitableFor: '欧洲入门玩家',
      highlight: '欧洲零售渠道常见',
      logo: getLogo('carson-modelsport.com')
    }
  ]
};

// ==================== 电机 + 电调品牌 ====================
const motorsESCs: Category = {
  id: 'motors-escs',
  title: '电机 + 电调',
  titleEn: 'Motors & ESCs',
  icon: 'Zap',
  brands: [
    // 国内品牌
    {
      name: 'Hobbywing 好盈',
      country: '中国',
      website: 'https://www.hobbywing.com',
      description: '必放核心池，全球电机电调领导品牌',
      models: ['XERUN', 'EZRUN', 'QUICRUN', 'AXON'],
      priceRange: '¥200-2,000',
      purchaseChannels: '天猫、京东、淘宝、跨境电商',
      suitableFor: '入门到竞赛玩家',
      highlight: '官网明确车用产品线覆盖全价位段',
      logo: getLogo('hobbywing.com')
    },
    {
      name: 'Surpass Hobby',
      country: '中国',
      website: 'https://www.surpasshobby.com',
      description: '性价比路线，跨境和改装市场常见',
      models: ['Rocket系列', 'Surpass系列'],
      priceRange: '¥100-500',
      purchaseChannels: '淘宝、跨境电商、亚马逊',
      suitableFor: '入门玩家、改装玩家',
      highlight: '性价比路线',
      logo: getLogo('surpasshobby.com')
    },
    {
      name: 'XTeam',
      country: '中国',
      website: 'https://www.xteamrc.com',
      description: '国内玩家圈常见，偏性价比改装市场',
      models: ['XTeam系列', '改装套件'],
      priceRange: '¥100-400',
      purchaseChannels: '淘宝、专业模型店',
      suitableFor: '改装玩家',
      highlight: '性价比改装市场',
      logo: getLogo('xteamrc.com')
    },
    {
      name: 'HobbyStar',
      country: '中国',
      website: 'https://www.hobbystar.com',
      description: '性价比电机电调品牌',
      models: ['HobbyStar系列'],
      priceRange: '¥80-300',
      purchaseChannels: '淘宝、跨境电商',
      suitableFor: '入门玩家',
      highlight: '性价比路线',
      logo: getLogo('hobbystar.com')
    },
    {
      name: 'SkyRC',
      country: '中国',
      website: 'https://www.skyrc.com',
      description: '充电器更强项，但也有车模电子产品线',
      models: ['Torero系列', 'B6AC', 'Q200'],
      priceRange: '¥200-800',
      purchaseChannels: '天猫、京东、淘宝',
      suitableFor: '入门到中端玩家',
      highlight: '充电器和电子产品线',
      logo: getLogo('skyrc.com')
    },
    // 海外品牌
    {
      name: 'Castle Creations',
      country: '美国',
      website: 'https://www.castlecreations.com',
      description: '高功率、重载、极限玩法口碑强',
      models: ['Mamba系列', 'SCT系列', 'Monster系列'],
      priceRange: 'US$100–350',
      purchaseChannels: '官网、授权经销商、专业模型店',
      suitableFor: '极限玩法、重载玩家',
      highlight: '高功率、重载、极限玩法',
      logo: getLogo('castlecreations.com')
    },
    {
      name: 'Tekin',
      country: '美国',
      website: 'https://www.teamtekin.com',
      description: '竞速玩家常见，高端比赛向选品',
      models: ['RS', 'RX8', 'Redline', 'Pro4'],
      priceRange: 'US$150–300',
      purchaseChannels: '官网、专业模型店',
      suitableFor: '竞赛玩家',
      highlight: '适合高端比赛向选品',
      logo: getLogo('teamtekin.com')
    }
  ]
};

// ==================== 舵机品牌 ====================
const servos: Category = {
  id: 'servos',
  title: '舵机',
  titleEn: 'Servos',
  icon: 'Settings',
  brands: [
    // 国内品牌
    {
      name: 'AGFRC',
      country: '中国',
      website: 'https://www.agfrc.com',
      description: '这几年非常值得关注的国产舵机品牌',
      models: ['高压系列', '无刷系列', '可编程系列', '巨型舵机'],
      priceRange: '¥80-300',
      purchaseChannels: '天猫、淘宝、跨境电商',
      suitableFor: '入门到中端玩家',
      highlight: '车用、巨型、可编程、高压、无刷等舵机产品',
      logo: getLogo('agfrc.com')
    },
    {
      name: 'Power HD',
      country: '中国',
      website: 'https://www.powerhd.net',
      description: '老牌国产舵机厂，海外流通也很广',
      models: ['X系列', 'W系列', 'L系列'],
      priceRange: '¥50-200',
      purchaseChannels: '天猫、淘宝、跨境电商',
      suitableFor: '入门到中端玩家',
      highlight: 'RC关键部件制造商',
      logo: getLogo('powerhd.net')
    },
    {
      name: 'JX Servo',
      country: '中国',
      website: 'https://www.jxservo.com',
      description: '跨境常见，性价比很高',
      models: ['CLS', 'PDI', 'HV系列'],
      priceRange: '¥30-150',
      purchaseChannels: '淘宝、跨境电商、亚马逊',
      suitableFor: '入门玩家',
      highlight: '性价比很高',
      logo: getLogo('jxservo.com')
    },
    {
      name: 'KST',
      country: '中国',
      website: 'https://www.kstservo.com',
      description: '以舵机设计制造为核心',
      models: ['X系列', 'DS系列', 'HV系列'],
      priceRange: '¥80-300',
      purchaseChannels: '天猫、淘宝、专业模型店',
      suitableFor: '高端玩家、固定翼玩家',
      highlight: '更多见于固定翼/高端模型',
      logo: getLogo('kstservo.com')
    },
    // 海外品牌
    {
      name: 'Futaba',
      country: '日本',
      website: 'https://www.futabausa.com',
      description: '不只遥控器，车用舵机也很强',
      models: ['S系列', 'BLS系列', 'HV系列'],
      priceRange: 'US$30–150',
      purchaseChannels: '官网、授权经销商',
      suitableFor: '专业玩家',
      highlight: '官网有独立servo产品线',
      logo: getLogo('futabausa.com')
    },
    {
      name: 'Savox',
      country: '中国台湾',
      website: 'https://www.savox.com',
      description: '车用高压大扭矩舵机非常常见',
      models: ['SC系列', 'SV系列', 'SH系列'],
      priceRange: 'US$40–120',
      purchaseChannels: '官网、代理商、专业模型店',
      suitableFor: '竞赛玩家、重载应用',
      highlight: '大量高扭矩HV/无刷舵机',
      logo: getLogo('savox.com')
    },
    {
      name: 'Sanwa',
      nameEn: '三和',
      country: '日本',
      website: 'https://www.sanwa-denshi.co.jp',
      description: '自家车用系统配套，PGS系列舵机',
      models: ['PGS系列'],
      priceRange: 'US$50–150',
      purchaseChannels: '官网、代理商',
      suitableFor: 'Sanwa遥控用户',
      highlight: 'PGS系列配套',
      logo: getLogo('sanwa-denshi.co.jp')
    },
    {
      name: 'Hitec',
      country: '美国',
      website: 'https://www.hitecrcd.com',
      description: '知名舵机品牌',
      models: ['HS系列', 'HSB系列'],
      priceRange: 'US$20–100',
      purchaseChannels: '官网、授权经销商',
      suitableFor: '入门到中端玩家',
      highlight: '知名舵机品牌',
      logo: getLogo('hitecrcd.com')
    },
    {
      name: 'Reefs RC',
      country: '美国',
      website: 'https://www.reefsrc.com',
      description: '爬车圈强',
      models: ['HT系列', 'Torque系列'],
      priceRange: 'US$50–100',
      purchaseChannels: '官网、爬车专门店',
      suitableFor: '攀爬车玩家',
      highlight: '爬车圈知名',
      logo: getLogo('reefsrc.com')
    }
  ]
};

// ==================== 轮胎 / 轮毂品牌 ====================
const tiresWheels: Category = {
  id: 'tires-wheels',
  title: '轮胎 / 轮毂',
  titleEn: 'Tires & Wheels',
  icon: 'Circle',
  brands: [
    // 国内品牌
    {
      name: 'MST',
      country: '中国台湾',
      website: 'https://www.mst-rc.com',
      description: '漂移胎、漂移轮毂、漂移底盘生态强',
      models: ['漂移轮胎', '漂移轮毂', 'TS系列'],
      priceRange: '¥50-200',
      purchaseChannels: '官网、代理商、AMain、RCMart',
      suitableFor: '漂移车玩家',
      highlight: '漂移车领域标杆',
      logo: getLogo('mst-rc.com')
    },
    {
      name: 'Tamiya',
      nameEn: '田宫',
      country: '日本',
      website: 'https://www.tamiya.com',
      description: '更多是原厂/套件生态',
      models: ['TT-02轮胎', '越野轮胎', '漂移轮胎'],
      priceRange: '¥50-150',
      purchaseChannels: '官网、代理商、模型店',
      suitableFor: '田宫套件玩家',
      highlight: '原厂配套',
      logo: getLogo('tamiya.com')
    },
    // 海外品牌
    {
      name: 'Pro-Line Racing',
      country: '美国',
      website: 'https://www.prolineracing.com',
      description: '强品牌、强内容、强改装复购',
      models: ['Badlands', 'Mudslingers', 'Trenchers', 'Ftalon'],
      priceRange: 'US$15–35',
      purchaseChannels: '官网、授权经销商、专业模型店',
      suitableFor: '越野车玩家',
      highlight: '主打RC tires, wheels, bodies, parts，美国制造',
      logo: getLogo('prolineracing.com')
    },
    {
      name: 'JConcepts',
      country: '美国',
      website: 'https://www.jconcepts.net',
      description: '官网明确有大量RC tires、wheels产品线',
      models: ['Crawler', 'Monster Truck', 'Buggy', 'SCT'],
      priceRange: 'US$15–30',
      purchaseChannels: '官网、专业模型店',
      suitableFor: '竞赛玩家、越野玩家',
      highlight: '覆盖爬车、大脚、越野等多品类',
      logo: getLogo('jconcepts.net')
    },
    {
      name: 'Louise RC',
      country: '欧洲',
      website: 'https://www.louiserc.com',
      description: '欧洲市场常见，轮胎、预装轮组普及度高',
      models: ['MT系列', '越野轮胎', '预装轮组'],
      priceRange: '€15–30',
      purchaseChannels: '欧洲零售商、官网',
      suitableFor: '欧洲玩家',
      highlight: '欧洲市场常见',
      logo: getLogo('louiserc.com')
    },
    {
      name: 'RC4WD',
      country: '美国',
      website: 'https://www.rc4wd.com',
      description: '爬车轮胎和仿真件强',
      models: ['Rock Crusher', 'Mud Slingers', '仿真轮胎'],
      priceRange: 'US$20–50',
      purchaseChannels: '官网、专业模型店',
      suitableFor: '攀爬车玩家',
      highlight: '爬车/仿真车领域知名',
      logo: getLogo('rc4wd.com')
    },
    {
      name: 'Pit Bull Tires',
      country: '美国',
      website: 'https://www.pitbullrc.com',
      description: '爬车圈知名轮胎品牌',
      models: ['Rock Beast', 'X3', 'A/T'],
      priceRange: 'US$25–40',
      purchaseChannels: '官网、爬车专门店',
      suitableFor: '攀爬车玩家',
      highlight: '爬车圈知名',
      logo: getLogo('pitbullrc.com')
    },
    {
      name: 'Duratrax',
      country: '美国',
      website: 'https://www.duratrax.com',
      description: '长尾轮胎市场常见',
      models: ['Lockup', 'Six Pack', 'SpeedTreads'],
      priceRange: 'US$15–25',
      purchaseChannels: '官网、零售商',
      suitableFor: '入门玩家',
      highlight: '长尾轮胎市场常见',
      logo: getLogo('duratrax.com')
    }
  ]
};

// ==================== 电池品牌 ====================
const batteries: Category = {
  id: 'batteries',
  title: '电池',
  titleEn: 'Batteries',
  icon: 'Battery',
  brands: [
    // 国内品牌
    {
      name: 'Gens Ace / Tattu',
      country: '中国',
      website: 'https://www.gensace.de',
      description: '知名锂电池品牌，高频消耗品/复购件',
      models: ['Gens Ace', 'Tattu', 'Redline'],
      priceRange: '¥50-300',
      purchaseChannels: '天猫、京东、跨境电商',
      suitableFor: '所有RC玩家',
      highlight: '适合电商做关联销售',
      logo: getLogo('gensace.de')
    },
    {
      name: 'CNHL',
      country: '中国',
      website: 'https://www.cnhl-rc.com',
      description: '性价比锂电池品牌',
      models: ['CNHL系列', 'Glotreer'],
      priceRange: '¥30-150',
      purchaseChannels: '淘宝、跨境电商',
      suitableFor: '入门到中端玩家',
      highlight: '性价比高',
      logo: getLogo('cnhl-rc.com')
    },
    {
      name: 'Ovonic',
      country: '中国',
      website: 'https://www.ovonicrc.com',
      description: '跨境常见锂电池品牌',
      models: ['Ovonic系列'],
      priceRange: '¥30-120',
      purchaseChannels: '亚马逊、跨境电商',
      suitableFor: '入门玩家',
      highlight: '跨境常见',
      logo: getLogo('ovonicrc.com')
    },
    {
      name: 'Zeee',
      country: '中国',
      website: 'https://www.zeeerc.com',
      description: '性价比锂电池',
      models: ['Zeee系列'],
      priceRange: '¥25-100',
      purchaseChannels: '淘宝、跨境电商',
      suitableFor: '入门玩家',
      highlight: '性价比高',
      logo: getLogo('zeeerc.com')
    },
    {
      name: 'Sunpadow',
      country: '中国',
      website: 'https://www.sunpadow.com',
      description: '专业锂电池品牌',
      models: ['Sunpadow系列'],
      priceRange: '¥50-200',
      purchaseChannels: '天猫、淘宝、专业模型店',
      suitableFor: '中端玩家',
      highlight: '专业锂电池品牌',
      logo: getLogo('sunpadow.com')
    },
    // 海外品牌
    {
      name: 'SMC',
      country: '美国',
      website: 'https://www.smc-racing.net',
      description: '竞赛级锂电池品牌',
      models: ['SMC系列'],
      priceRange: 'US$40–80',
      purchaseChannels: '官网、专业模型店',
      suitableFor: '竞赛玩家',
      highlight: '竞赛级品质',
      logo: getLogo('smc-racing.net')
    }
  ]
};

// ==================== 充电器 / 供电设备品牌 ====================
const chargers: Category = {
  id: 'chargers',
  title: '充电器 / 供电设备',
  titleEn: 'Chargers & Power',
  icon: 'Plug',
  brands: [
    // 国内品牌
    {
      name: 'SkyRC',
      country: '中国',
      website: 'https://www.skyrc.com',
      description: 'RC充电器非常强，国际认知度高',
      models: ['B6AC', 'Q200', 'D100', 'D200', 'e680'],
      priceRange: '¥200-1,000',
      purchaseChannels: '天猫、京东、淘宝、跨境电商',
      suitableFor: '所有RC玩家',
      highlight: '和电池、电机电调天然绑定，适合做套餐',
      logo: getLogo('skyrc.com')
    },
    {
      name: 'ISDT',
      country: '中国',
      website: 'https://www.isdt.co',
      description: '智能充电器品牌，设计感强',
      models: ['608AC', 'Q6', 'Q8', 'D1', 'P30'],
      priceRange: '¥200-800',
      purchaseChannels: '天猫、京东、跨境电商',
      suitableFor: '中端到高端玩家',
      highlight: '智能充电生态',
      logo: getLogo('isdt.co')
    },
    {
      name: 'HOTA',
      country: '中国',
      website: 'https://www.hota-rc.com',
      description: '专业充电器品牌',
      models: ['D6', 'D8', 'S6'],
      priceRange: '¥150-400',
      purchaseChannels: '天猫、淘宝、跨境电商',
      suitableFor: '入门到中端玩家',
      highlight: '专业充电器',
      logo: getLogo('hota-rc.com')
    },
    {
      name: 'ToolkitRC',
      country: '中国',
      website: 'https://www.toolkitrc.com',
      description: '多功能充电器品牌',
      models: ['M6', 'M8', 'M9', 'M10'],
      priceRange: '¥100-300',
      purchaseChannels: '天猫、淘宝',
      suitableFor: '入门玩家',
      highlight: '多功能充电器',
      logo: getLogo('toolkitrc.com')
    }
  ]
};

// ==================== 灯组 / 陀螺仪 / 电子扩展件 ====================
const electronics: Category = {
  id: 'electronics',
  title: '灯组 / 陀螺仪 / 电子扩展件',
  titleEn: 'Lights, Gyros & Electronics',
  icon: 'Lightbulb',
  brands: [
    // 国内品牌
    {
      name: 'DUMBORC 小飞象',
      country: '中国',
      website: 'https://www.dumborc.com',
      description: '接收机、灯控板、电调等扩展件',
      models: ['灯控板', '接收机', '电调扩展'],
      priceRange: '¥50-200',
      purchaseChannels: '天猫、淘宝',
      suitableFor: '入门玩家',
      highlight: '性价比高',
      logo: getLogo('dumborc.com')
    },
    {
      name: 'Yeah Racing',
      country: '中国香港',
      website: 'https://www.yeahracing.com',
      description: '配件生态广',
      models: ['灯组', '配件', '升级件'],
      priceRange: '¥50-200',
      purchaseChannels: '官网、代理商',
      suitableFor: '改装玩家',
      highlight: '配件生态广',
      logo: getLogo('yeahracing.com')
    },
    // 海外品牌
    {
      name: 'HeyOK',
      country: '加拿大',
      website: 'https://www.heyokrc.com',
      description: '灯控/电子扩展专家',
      models: ['灯控板', '电子开关', '扩展件'],
      priceRange: 'US$20–50',
      purchaseChannels: '官网、专业模型店',
      suitableFor: '攀爬车玩家',
      highlight: '灯控/电子扩展专家',
      logo: getLogo('heyokrc.com')
    },
    {
      name: 'MyTrickRC',
      country: '美国',
      website: 'https://www.mytrickrc.com',
      description: '灯组专家',
      models: ['灯组', '灯光套件'],
      priceRange: 'US$30–60',
      purchaseChannels: '官网、专业模型店',
      suitableFor: '攀爬车玩家',
      highlight: '爬车灯组知名',
      logo: getLogo('mytrickrc.com')
    },
    {
      name: 'Spektrum',
      country: '美国',
      website: 'https://www.spektrumrc.com',
      description: '带遥测与系统生态',
      models: ['遥测模块', '接收机', '陀螺仪'],
      priceRange: 'US$30–100',
      purchaseChannels: '官网、Horizon Hobby',
      suitableFor: 'Spektrum用户',
      highlight: '遥测、接收机、陀螺仪配套件',
      logo: getLogo('spektrumrc.com')
    }
  ]
};

// ==================== 视频博主 ====================
export interface Vlogger {
  name: string;
  nameEn?: string; // 英文名称
  platform: string;
  country: string;
  website: string;
  description: string;
  descriptionEn?: string; // 英文描述
  subscribers?: string;
  douyinId?: string;  // 抖音号
  logo?: string;      // 头像
}

export const vloggers: Vlogger[] = [
  // 国内博主
  {
    name: '穿着皮鞋玩RC',
    nameEn: 'RC in Dress Shoes',
    platform: '抖音',
    country: '中国',
    website: 'https://www.douyin.com/user/MS4wLjABAAAA',
    douyinId: '穿着皮鞋玩RC',
    description: '资深RC玩家，专注于高端整车测评与玩法分享，风格幽默风趣，深受玩家喜爱',
    descriptionEn: 'Senior RC enthusiast, specializing in high-end vehicle reviews and gameplay sharing, humorous style, loved by players',
    subscribers: '30万+',
    logo: 'https://coze-coding-project.tos.coze.site/coze_storage_7617916730349781007/image/generate_image_486276ef-8465-4b06-9a63-caa8751168e9.jpeg?sign=1805433094-c11188b90c-0-8ca2304e4745afe4c26f6a527c394639ae90d16f381d4811a2c5dedbd07c6701'
  },
  {
    name: '超人聊模型',
    platform: '抖音',
    country: '中国',
    website: 'https://www.douyin.com/user/MS4wLjABAAAchaoren',
    douyinId: '超人聊模型',
    description: '专业RC模型测评博主，涵盖各类车型，从入门到高端全方位解析',
    subscribers: '25万+',
    logo: 'https://coze-coding-project.tos.coze.site/coze_storage_7617916730349781007/image/generate_image_c2a39914-1f3c-4a3c-bf5c-15bb82558d6e.jpeg?sign=1805433094-19c1784acd-0-8384fa757d6a264ac75096ba5f88a6374725de4844e7a14366923dd4cafc4b26'
  },
  {
    name: '小柚玩RC',
    platform: '抖音',
    country: '中国',
    website: 'https://www.douyin.com/user/MS4wLjABAAAAxiaoyou',
    douyinId: '小柚玩RC',
    description: '萌新友好的RC入门博主，详细讲解入门知识和避坑指南',
    subscribers: '20万+',
    logo: 'https://coze-coding-project.tos.coze.site/coze_storage_7617916730349781007/image/generate_image_c0d1dea5-0df8-4ee5-8f12-b428ffdc0f40.jpeg?sign=1805433094-bd2fb012c1-0-0a8156789ddaddaad20dec1acfdfaf9bfa376901832202a2f31bbcd42dd3e1f3'
  },
  {
    name: '铁男模型俱乐部',
    platform: '抖音',
    country: '中国',
    website: 'https://www.douyin.com/user/MS4wLjABAAAAtienan',
    douyinId: '铁男模型俱乐部',
    description: '硬核RC玩家社区，分享攀爬车、越野车改装与比赛经验',
    subscribers: '15万+',
    logo: 'https://coze-coding-project.tos.coze.site/coze_storage_7617916730349781007/image/generate_image_a361544b-fb04-4443-a1c2-faef7ffb8ea6.jpeg?sign=1805433093-8ff9f594e1-0-0ad5cf938b75b25a13afbb8cf76e46ca753122245f0a306af5eb9c7e92a5ad80'
  },
  {
    name: '杰米车库',
    platform: '抖音',
    country: '中国',
    website: 'https://www.douyin.com/user/MS4wLjABAAAAjiemi',
    douyinId: '杰米车库',
    description: '专业RC车库风格频道，整车测评、改装教程、赛道实测',
    subscribers: '40万+',
    logo: 'https://coze-coding-project.tos.coze.site/coze_storage_7617916730349781007/image/generate_image_d9581313-02ea-4097-8116-692dde380e13.jpeg?sign=1805433123-518ef35d14-0-5ee61e6d9f34fce4a469ec0e842890c0c507925c50a4c33cc5301008a5884325'
  },
  {
    name: '奶爸玩模型',
    platform: '抖音',
    country: '中国',
    website: 'https://www.douyin.com/user/MS4wLjABAAAAnaiba',
    douyinId: '奶爸玩模型',
    description: '亲子RC玩车博主，分享与孩子一起玩RC的乐趣，适合家庭玩家',
    subscribers: '18万+',
    logo: 'https://coze-coding-project.tos.coze.site/coze_storage_7617916730349781007/image/generate_image_b53e30f8-307e-4c2c-a65e-4b2bcdf9d726.jpeg?sign=1805433123-1be4abc68e-0-af9c3ff927ead1859dba14d3400d0633f98348f15645e18b9025ce5c02fc45ad'
  },
  {
    name: 'TONY老师玩RC',
    platform: '抖音',
    country: '中国',
    website: 'https://www.douyin.com/user/MS4wLjABAAAAtony',
    douyinId: 'TONY老师玩RC',
    description: '技术流RC博主，深入讲解RC电设、调校与竞速技巧',
    subscribers: '12万+',
    logo: 'https://coze-coding-project.tos.coze.site/coze_storage_7617916730349781007/image/generate_image_0711fbc5-d23a-4c05-83a5-e0061b3d8b17.jpeg?sign=1805433124-baac890276-0-a52b01722241f871024c1fa96413f593ac248d4b578567b2c46edc4d84c2340d'
  },
  {
    name: '牛顿RC工作室',
    platform: '抖音',
    country: '中国',
    website: 'https://www.douyin.com/user/MS4wLjABAAAAnewton',
    douyinId: '牛顿RC工作室',
    description: '专业RC技术工作室，分享深度改装、电子设备调校知识',
    subscribers: '10万+',
    logo: 'https://coze-coding-project.tos.coze.site/coze_storage_7617916730349781007/image/generate_image_06135c03-c836-4b50-9e1f-749373c9072e.jpeg?sign=1805433124-11c475ba46-0-d2ccd8f87d7209b72cd2edbdf5acd52c358c28edda376f6af969d4c3ed672a98'
  },
  {
    name: '成都极速蜗牛',
    platform: '抖音',
    country: '中国',
    website: 'https://www.douyin.com/user/MS4wLjABAAAAwosniu',
    douyinId: '成都极速蜗牛',
    description: '成都本地RC玩家圈子，组织线下活动与比赛，分享西南地区玩车资讯',
    subscribers: '8万+',
    logo: 'https://coze-coding-project.tos.coze.site/coze_storage_7617916730349781007/image/generate_image_b8645f4f-aecc-48fd-8e5d-18609cc3355a.jpeg?sign=1805433123-a4b78bf70c-0-68b09e89ef526bcd16c807ab1cd05861fe2039a36ffe683543ef6ac86ea793ae'
  },
  // 国外博主
  {
    name: 'RC Car Action',
    platform: 'YouTube',
    country: '美国',
    website: 'https://www.youtube.com/@rccaraction',
    description: '全球最大的RC杂志官方频道，专业测评和资讯',
    descriptionEn: "World's largest RC magazine official channel, professional reviews and news",
    subscribers: '100万+',
    logo: 'https://coze-coding-project.tos.coze.site/coze_storage_7617916730349781007/image/generate_image_67dea982-6523-4634-829c-aabb1e26f4f9.jpeg?sign=1805433227-70084f375c-0-efd120b88aca5556718df5a6162639e79b8dc462beeaeb5691268101341b97a8'
  },
  {
    name: 'JANG TheRCNetwork',
    platform: 'YouTube',
    country: '美国',
    website: 'https://www.youtube.com/@JANGBRiCKS',
    description: '知名RC测评博主，以详细评测和暴力测试著称',
    descriptionEn: 'Famous RC reviewer known for detailed reviews and brutal durability tests',
    subscribers: '200万+',
    logo: 'https://coze-coding-project.tos.coze.site/coze_storage_7617916730349781007/image/generate_image_7d500391-db1b-4f5a-9131-4d04e4650dc0.jpeg?sign=1805433230-86dddebbea-0-4bae1dcb2f8479b81a7a4b808fd16fc2254e384c25399af6867e1ee6a7db4789'
  },
  {
    name: 'RCSparks Studio',
    platform: 'YouTube',
    country: '加拿大',
    website: 'https://www.youtube.com/@rcsparks',
    description: '电影级RC视频制作，精彩的故事化内容',
    descriptionEn: 'Cinematic RC video production with compelling story-driven content',
    subscribers: '300万+',
    logo: 'https://coze-coding-project.tos.coze.site/coze_storage_7617916730349781007/image/generate_image_6243dd88-b197-4a38-9199-3c1887a7f3b4.jpeg?sign=1805433226-909a4b27fe-0-a965effef290fe44892119c3be6c11a9b5c12e1437db09be7298b5924ab63e3e'
  },
  {
    name: 'Tech One Hobby',
    platform: 'YouTube',
    country: '美国',
    website: 'https://www.youtube.com/@techonehobby',
    description: '专业攀爬车和越野车内容创作者',
    descriptionEn: 'Professional crawler and off-road RC content creator',
    subscribers: '50万+',
    logo: 'https://coze-coding-project.tos.coze.site/coze_storage_7617916730349781007/image/generate_image_40ec2122-3afb-4e4a-b005-382caa05f123.jpeg?sign=1805433228-e3125531f9-0-58e2e25af180983019223d0dc07c7ede34f2ebb812ee324b7912004ac0319d28'
  },
  {
    name: 'RC Driver',
    platform: 'YouTube',
    country: '美国',
    website: 'https://www.youtube.com/@RCDriverOnline',
    description: 'RC车评测和技术讲解，专业性强',
    descriptionEn: 'RC car reviews and technical tutorials with professional expertise',
    subscribers: '80万+',
    logo: 'https://coze-coding-project.tos.coze.site/coze_storage_7617916730349781007/image/generate_image_36ee5b49-9156-4a54-ba9e-c2aa487c799c.jpeg?sign=1805433247-3837f353f9-0-e09b605192458b061b534fca62f14406358733bed73079f7496499c68b9029cb'
  },
  {
    name: 'RCMart',
    platform: 'YouTube',
    country: '中国香港',
    website: 'https://www.youtube.com/@rcmart',
    description: '香港知名RC店铺，分享新品和改装技巧',
    descriptionEn: "Hong Kong's famous RC shop sharing new products and modification tips",
    subscribers: '40万+',
    logo: 'https://coze-coding-project.tos.coze.site/coze_storage_7617916730349781007/image/generate_image_7f462a53-3830-45d5-ad7b-22e67ff7f879.jpeg?sign=1805433247-91704ba6ad-0-886e7f6028e8e67e2395d94d2c5b6add4e92ff5102acff03e47532e8f89bd2d1'
  },
  {
    name: 'Tarzan RC',
    platform: 'YouTube',
    country: '日本',
    website: 'https://www.youtube.com/@tarzanrc',
    description: '日本知名玩家，攀爬车和迷你Z专家',
    descriptionEn: 'Famous Japanese RC enthusiast, expert in crawlers and Mini-Z',
    subscribers: '60万+',
    logo: 'https://coze-coding-project.tos.coze.site/coze_storage_7617916730349781007/image/generate_image_0fbefc83-62c9-4c47-a835-0ba2fb471b8a.jpeg?sign=1805433247-ea1cb76d96-0-89ea0187b68a57846686904c052e264a2f1ae8546e60eab4fb5355545d6152c2'
  },
  {
    name: 'Essential RC',
    platform: 'YouTube',
    country: '英国',
    website: 'https://www.youtube.com/@essentialRC',
    description: '欧洲知名RC频道，专业测评和展会报道',
    subscribers: '150万+'
  }
];

// 导出所有分类
export const categories: Category[] = [
  vehicleBrands,
  remoteControllers,
  motorsESCs,
  servos,
  tiresWheels,
  batteries,
  chargers,
  electronics
];

// 获取品牌总数
export const getBrandsCount = (): number => {
  return categories.reduce((total, category) => total + category.brands.length, 0);
};

// 获取梯队标签
export const getTierLabel = (tier?: 'first' | 'second' | 'third') => {
  switch (tier) {
    case 'first':
      return { label: '第一梯队', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
    case 'second':
      return { label: '第二梯队', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
    case 'third':
      return { label: '第三梯队', color: 'bg-slate-500/20 text-slate-400 border-slate-500/30' };
    default:
      return { label: '', color: '' };
  }
};
