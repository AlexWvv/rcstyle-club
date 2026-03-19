// RC车型库数据

export interface RCModel {
  id: string;
  name: string;                    // 车型名称
  nameEn?: string;                 // 英文名称
  brand: string;                   // 品牌
  brandEn?: string;                // 品牌英文名
  type: ModelType;                 // 车型类型
  scale: string;                   // 比例 (如 1/10, 1/8)
  description: string;             // 描述
  descriptionEn?: string;          // 英文描述
  image?: string;                  // 车型图片
  manualUrl?: string;              // 说明书下载URL
  manualUrlEn?: string;            // 英文说明书URL
  features?: string[];             // 特点
  price?: string;                  // 参考价格
  releaseYear?: number;            // 发布年份
}

export type ModelType = 
  | 'crawler'      // 攀爬车
  | 'offroad'      // 越野车
  | 'drift'        // 漂移车
  | 'shortcourse'  // 短卡
  | 'touring'      // 房车
  | 'truck'        // 卡车
  | 'buggy'        // 遥控越野车
  | 'truggy'       // 越野卡车
  | 'monster'      // 大脚车
  | 'scale';       // 仿真车

export type ModelTypeLabel = {
  zh: string;
  en: string;
};

export const modelTypeLabels: Record<ModelType, ModelTypeLabel> = {
  crawler: { zh: '攀爬车', en: 'Crawler' },
  offroad: { zh: '越野车', en: 'Off-road' },
  drift: { zh: '漂移车', en: 'Drift' },
  shortcourse: { zh: '短卡', en: 'Short Course' },
  touring: { zh: '房车', en: 'Touring' },
  truck: { zh: '卡车', en: 'Truck' },
  buggy: { zh: '越野车', en: 'Buggy' },
  truggy: { zh: '越野卡车', en: 'Truggy' },
  monster: { zh: '大脚车', en: 'Monster Truck' },
  scale: { zh: '仿真车', en: 'Scale' },
};

// 获取所有车型类型
export const getAllModelTypes = (): ModelType[] => {
  return Object.keys(modelTypeLabels) as ModelType[];
};

// 获取所有品牌
export const getAllBrands = (): string[] => {
  return [...new Set(modelsData.map(m => m.brand))];
};

// 按品牌筛选
export const getModelsByBrand = (brand: string): RCModel[] => {
  return modelsData.filter(m => m.brand === brand);
};

// 按类型筛选
export const getModelsByType = (type: ModelType): RCModel[] => {
  return modelsData.filter(m => m.type === type);
};

// 搜索车型
export const searchModels = (query: string): RCModel[] => {
  const q = query.toLowerCase();
  return modelsData.filter(m => 
    m.name.toLowerCase().includes(q) ||
    m.nameEn?.toLowerCase().includes(q) ||
    m.brand.toLowerCase().includes(q) ||
    m.brandEn?.toLowerCase().includes(q) ||
    m.description.toLowerCase().includes(q)
  );
};

// 获取车型总数
export const getModelsCount = (): number => modelsData.length;

// 获取有说明书的车型数量
export const getManualsCount = (): number => modelsData.filter(m => m.manualUrl).length;

// ==================== 车型数据 ====================
export const modelsData: RCModel[] = [
  // ========== HBX 易控模型 ==========
  {
    id: 'hbx-16889a',
    name: '16889A 攀爬车',
    nameEn: '16889A Crawler',
    brand: '易控模型',
    brandEn: 'HBX',
    type: 'crawler',
    scale: '1/18',
    description: '入门级攀爬车，四轮驱动，金属底盘，适合新手入门',
    descriptionEn: 'Entry-level crawler, 4WD, metal chassis, perfect for beginners',
    manualUrl: 'https://www.hbxrc.com/manual/16889a-manual.pdf',
    features: ['四轮驱动', '金属底盘', '防水设计', 'LED车灯'],
    price: '¥400-600',
    releaseYear: 2022,
  },
  {
    id: 'hbx-16890',
    name: '16890 越野车',
    nameEn: '16890 Off-road',
    brand: '易控模型',
    brandEn: 'HBX',
    type: 'offroad',
    scale: '1/18',
    description: '高速越野车，四轮驱动，独立悬挂系统',
    descriptionEn: 'High-speed off-road vehicle, 4WD, independent suspension system',
    manualUrl: 'https://www.hbxrc.com/manual/16890-manual.pdf',
    features: ['四轮驱动', '独立悬挂', '高速电机', '大容量电池'],
    price: '¥350-550',
    releaseYear: 2021,
  },
  {
    id: 'hbx-15889',
    name: '15889 攀爬车',
    nameEn: '15889 Crawler',
    brand: '易控模型',
    brandEn: 'HBX',
    type: 'crawler',
    scale: '1/12',
    description: '大尺寸攀爬车，更强的攀爬能力和稳定性',
    descriptionEn: 'Large scale crawler, stronger climbing ability and stability',
    manualUrl: 'https://www.hbxrc.com/manual/15889-manual.pdf',
    features: ['大尺寸车架', '强力电机', '金属传动', '仿真外观'],
    price: '¥600-900',
    releaseYear: 2023,
  },

  // ========== Rlaarlo 雷拉洛 ==========
  {
    id: 'rlaarlo-amx9',
    name: 'AM-X9 越野车',
    nameEn: 'AM-X9 Off-road',
    brand: '雷拉洛',
    brandEn: 'Rlaarlo',
    type: 'offroad',
    scale: '1/10',
    description: '高性能越野车，无刷电机，高速稳定',
    descriptionEn: 'High-performance off-road vehicle, brushless motor, high-speed stability',
    manualUrl: 'https://www.rlaarlo.com/manual/am-x9-manual.pdf',
    features: ['无刷电机', '四轮驱动', '金属底盘', '油压避震'],
    price: '¥800-1,200',
    releaseYear: 2022,
  },
  {
    id: 'rlaarlo-amx7',
    name: 'AM-X7 攀爬车',
    nameEn: 'AM-X7 Crawler',
    brand: '雷拉洛',
    brandEn: 'Rlaarlo',
    type: 'crawler',
    scale: '1/10',
    description: '专业级攀爬车，仿真外观，强大攀爬能力',
    descriptionEn: 'Professional crawler, realistic appearance, powerful climbing ability',
    manualUrl: 'https://www.rlaarlo.com/manual/am-x7-manual.pdf',
    features: ['仿真外观', '金属车桥', '两档变速', 'LED灯组'],
    price: '¥900-1,400',
    releaseYear: 2023,
  },

  // ========== FMS 模型 ==========
  {
    id: 'fms-fcx24',
    name: 'FCX24 攀爬车系列',
    nameEn: 'FCX24 Crawler Series',
    brand: 'FMS模型',
    brandEn: 'FMS',
    type: 'crawler',
    scale: '1/24',
    description: '微型攀爬车，高仿真外观，适合室内玩耍',
    descriptionEn: 'Micro crawler, high simulation appearance, suitable for indoor play',
    manualUrl: 'https://www.fmsmodel.com/manual/fcx24-manual.pdf',
    features: ['微型尺寸', '仿真外观', '四轮驱动', '便携设计'],
    price: '¥500-800',
    releaseYear: 2022,
  },
  {
    id: 'fms-fcx18',
    name: 'FCX18 攀爬车系列',
    nameEn: 'FCX18 Crawler Series',
    brand: 'FMS模型',
    brandEn: 'FMS',
    type: 'crawler',
    scale: '1/18',
    description: '中尺寸攀爬车，更多细节，更强性能',
    descriptionEn: 'Medium size crawler, more details, stronger performance',
    manualUrl: 'https://www.fmsmodel.com/manual/fcx18-manual.pdf',
    features: ['仿真细节', '金属传动', '防水设计', '长续航'],
    price: '¥600-1,000',
    releaseYear: 2023,
  },
  {
    id: 'fms-fcx6',
    name: 'FCX6 攀爬车',
    nameEn: 'FCX6 Crawler',
    brand: 'FMS模型',
    brandEn: 'FMS',
    type: 'crawler',
    scale: '1/6',
    description: '大比例攀爬车，极致仿真，专业级性能',
    descriptionEn: 'Large scale crawler, ultimate simulation, professional performance',
    manualUrl: 'https://www.fmsmodel.com/manual/fcx6-manual.pdf',
    features: ['大比例', '极致仿真', '专业级配置', '金属件'],
    price: '¥2,000-4,000',
    releaseYear: 2024,
  },

  // ========== Traxxas ==========
  {
    id: 'traxxas-trx4',
    name: 'TRX-4 攀爬车',
    nameEn: 'TRX-4 Crawler',
    brand: 'Traxxas',
    brandEn: 'Traxxas',
    type: 'crawler',
    scale: '1/10',
    description: '顶级攀爬车，两档变速箱，仿真门桥设计',
    descriptionEn: 'Top-tier crawler, two-speed transmission, realistic portal axle design',
    manualUrl: 'https://traxxas.com/manuals/82086-4OM-EN.pdf',
    features: ['两档变速', '门桥设计', '防水电子', '金属车桥'],
    price: '$400-500',
    releaseYear: 2016,
  },
  {
    id: 'traxxas-xmaxx',
    name: 'X-Maxx 大脚车',
    nameEn: 'X-Maxx Monster Truck',
    brand: 'Traxxas',
    brandEn: 'Traxxas',
    type: 'monster',
    scale: '1/5',
    description: '超大尺寸大脚车，无刷动力，极致暴力',
    descriptionEn: 'Extra large monster truck, brushless power, extreme performance',
    manualUrl: 'https://traxxas.com/manuals/77086-4OM-EN.pdf',
    features: ['超大尺寸', '无刷电机', '8S动力', '自复位系统'],
    price: '$700-900',
    releaseYear: 2016,
  },
  {
    id: 'traxxas-slash',
    name: 'Slash 短卡',
    nameEn: 'Slash Short Course',
    brand: 'Traxxas',
    brandEn: 'Traxxas',
    type: 'shortcourse',
    scale: '1/10',
    description: '经典短卡车，适合竞速和越野',
    descriptionEn: 'Classic short course truck, great for racing and off-road',
    manualUrl: 'https://traxxas.com/manuals/58034-4OM-EN.pdf',
    features: ['竞速设计', '耐用车架', '防水系统', '可升级性强'],
    price: '$300-450',
    releaseYear: 2008,
  },

  // ========== Axial ==========
  {
    id: 'axial-scx6',
    name: 'SCX6 攀爬车',
    nameEn: 'SCX6 Crawler',
    brand: 'Axial',
    brandEn: 'Axial',
    type: 'crawler',
    scale: '1/6',
    description: '大比例攀爬车，仿真设计，专业级配置',
    descriptionEn: 'Large scale crawler, realistic design, professional configuration',
    manualUrl: 'https://axialrc.com/manuals/axi03013-manual.pdf',
    features: ['大比例', '仿真设计', '金属件', '专业配置'],
    price: '$600-800',
    releaseYear: 2022,
  },
  {
    id: 'axial-scx24',
    name: 'SCX24 攀爬车',
    nameEn: 'SCX24 Crawler',
    brand: 'Axial',
    brandEn: 'Axial',
    type: 'crawler',
    scale: '1/24',
    description: '微型攀爬车，入门首选，室内外皆宜',
    descriptionEn: 'Micro crawler, best for beginners, indoor and outdoor',
    manualUrl: 'https://axialrc.com/manuals/axi03001-manual.pdf',
    features: ['微型尺寸', '入门首选', '完整配置', '室内外通用'],
    price: '$120-150',
    releaseYear: 2019,
  },

  // ========== HPI Racing ==========
  {
    id: 'hpi-savage',
    name: 'Savage 大脚车',
    nameEn: 'Savage Monster Truck',
    brand: 'HPI Racing',
    brandEn: 'HPI',
    type: 'monster',
    scale: '1/8',
    description: '经典大脚车，强劲动力，耐用设计',
    descriptionEn: 'Classic monster truck, powerful, durable design',
    manualUrl: 'https://hpiracing.com/manuals/savage-manual.pdf',
    features: ['强劲动力', '耐用设计', '经典外观', '易维护'],
    price: '$400-600',
    releaseYear: 2003,
  },

  // ========== ARRMA ==========
  {
    id: 'arrma-typhon',
    name: 'Typhon 越野车',
    nameEn: 'Typhon Buggy',
    brand: 'ARRMA',
    brandEn: 'ARRMA',
    type: 'buggy',
    scale: '1/8',
    description: '高速越野车，无刷动力，竞技级别',
    descriptionEn: 'High-speed buggy, brushless power, competition level',
    manualUrl: 'https://arrma-rc.com/manuals/typhon-manual.pdf',
    features: ['无刷动力', '竞技级别', '高速设计', '耐用车架'],
    price: '$450-650',
    releaseYear: 2018,
  },
  {
    id: 'arrma-granite',
    name: 'Granite 大脚车',
    nameEn: 'Granite Monster Truck',
    brand: 'ARRMA',
    brandEn: 'ARRMA',
    type: 'monster',
    scale: '1/10',
    description: '耐玩大脚车，适合入门和中级玩家',
    descriptionEn: 'Fun monster truck, suitable for beginners and intermediate players',
    manualUrl: 'https://arrma-rc.com/manuals/granite-manual.pdf',
    features: ['耐玩设计', '入门友好', '可升级', '性价比高'],
    price: '$250-400',
    releaseYear: 2017,
  },

  // ========== Kyosho 京商 ==========
  {
    id: 'kyosho-mini-z',
    name: 'Mini-Z 房车系列',
    nameEn: 'Mini-Z Touring Series',
    brand: '京商',
    brandEn: 'Kyosho',
    type: 'touring',
    scale: '1/28',
    description: '微型房车，高精度遥控，室内竞速首选',
    descriptionEn: 'Micro touring car, precision control, best for indoor racing',
    manualUrl: 'https://kyosho.com/manuals/miniz-manual.pdf',
    features: ['微型尺寸', '高精度遥控', '室内竞速', '丰富配件'],
    price: '¥500-1,500',
    releaseYear: 2000,
  },
  {
    id: 'kyosho-fo-xx',
    name: 'FO-XX 越野车',
    nameEn: 'FO-XX Buggy',
    brand: '京商',
    brandEn: 'Kyosho',
    type: 'buggy',
    scale: '1/8',
    description: '经典越野车设计，复刻传奇车型',
    descriptionEn: 'Classic buggy design, replica of legendary model',
    manualUrl: 'https://kyosho.com/manuals/fo-xx-manual.pdf',
    features: ['经典复刻', '高可玩性', '丰富改装件', '收藏价值'],
    price: '¥1,500-2,500',
    releaseYear: 2015,
  },

  // ========== Tamiya 田宫 ==========
  {
    id: 'tamiya-clod-buster',
    name: 'Clod Buster 大脚车',
    nameEn: 'Clod Buster Monster Truck',
    brand: '田宫',
    brandEn: 'Tamiya',
    type: 'monster',
    scale: '1/10',
    description: '经典大脚车，组合式车架，可玩性强',
    descriptionEn: 'Classic monster truck, modular chassis, high playability',
    manualUrl: 'https://tamiya.com/manuals/clod-buster-manual.pdf',
    features: ['经典设计', '组合式车架', '丰富改装件', '收藏价值'],
    price: '¥1,200-2,000',
    releaseYear: 1987,
  },
  {
    id: 'tamiya-cf-01',
    name: 'CC-01 攀爬车',
    nameEn: 'CC-01 Crawler',
    brand: '田宫',
    brandEn: 'Tamiya',
    type: 'crawler',
    scale: '1/10',
    description: '入门攀爬车，仿真外观，改装潜力大',
    descriptionEn: 'Entry crawler, realistic appearance, great modification potential',
    manualUrl: 'https://tamiya.com/manuals/cc01-manual.pdf',
    features: ['入门首选', '仿真外观', '改装潜力大', '丰富车壳'],
    price: '¥800-1,500',
    releaseYear: 2002,
  },

  // ========== Losi ==========
  {
    id: 'losi-mini-t',
    name: 'Mini-T 短卡',
    nameEn: 'Mini-T Short Course',
    brand: 'Losi',
    brandEn: 'Losi',
    type: 'shortcourse',
    scale: '1/18',
    description: '微型短卡，入门级竞速车型',
    descriptionEn: 'Micro short course truck, entry-level racing model',
    manualUrl: 'https://losi.com/manuals/mini-t-manual.pdf',
    features: ['微型尺寸', '竞速设计', '入门友好', '性价比高'],
    price: '$150-200',
    releaseYear: 2003,
  },

  // ========== MST 银河 ==========
  {
    id: 'mst-ms-01d',
    name: 'MS-01D 漂移车',
    nameEn: 'MS-01D Drift',
    brand: '银河模型',
    brandEn: 'MST',
    type: 'drift',
    scale: '1/10',
    description: '专业漂移车，后驱设计，适合漂移入门',
    descriptionEn: 'Professional drift car, RWD design, great for drift beginners',
    manualUrl: 'https://mst.hk/manuals/ms01d-manual.pdf',
    features: ['后驱设计', '漂移专用', '可调角度', '丰富配件'],
    price: '¥600-1,000',
    releaseYear: 2012,
  },
  {
    id: 'mst-ms-rmg',
    name: 'MS-RMG 攀爬车',
    nameEn: 'MS-RMG Crawler',
    brand: '银河模型',
    brandEn: 'MST',
    type: 'crawler',
    scale: '1/10',
    description: '专业攀爬车，金属底盘，高强度设计',
    descriptionEn: 'Professional crawler, metal chassis, high strength design',
    manualUrl: 'https://mst.hk/manuals/msrmg-manual.pdf',
    features: ['金属底盘', '高强度', '专业配置', '可改装性强'],
    price: '¥800-1,200',
    releaseYear: 2015,
  },

  // ========== YuanSuan 元素 ==========
  {
    id: 'yuansuan-utb18',
    name: 'UTB18 越野车',
    nameEn: 'UTB18 Buggy',
    brand: '元素模型',
    brandEn: 'YuanSuan',
    type: 'buggy',
    scale: '1/18',
    description: '入门级越野车，性价比高，适合新手',
    descriptionEn: 'Entry-level buggy, great value, perfect for beginners',
    manualUrl: 'https://yuansuan.com/manuals/utb18-manual.pdf',
    features: ['入门首选', '性价比高', '易维护', '完整配置'],
    price: '¥300-500',
    releaseYear: 2021,
  },
  {
    id: 'yuansuan-utr18',
    name: 'UTR18 越野卡车',
    nameEn: 'UTR18 Truggy',
    brand: '元素模型',
    brandEn: 'YuanSuan',
    type: 'truggy',
    scale: '1/18',
    description: '入门级越野卡车，适合多种地形',
    descriptionEn: 'Entry-level truggy, suitable for various terrains',
    manualUrl: 'https://yuansuan.com/manuals/utr18-manual.pdf',
    features: ['多地形', '入门级', '高性价比', '易上手'],
    price: '¥350-550',
    releaseYear: 2022,
  },

  // ========== Cross 穿越者 ==========
  {
    id: 'cross-rc-kg6',
    name: 'KG6 攀爬车',
    nameEn: 'KG6 Crawler',
    brand: '穿越者',
    brandEn: 'Cross RC',
    type: 'crawler',
    scale: '1/6',
    description: '大比例攀爬车，高仿真军用卡车设计',
    descriptionEn: 'Large scale crawler, realistic military truck design',
    manualUrl: 'https://cross-rc.com/manuals/kg6-manual.pdf',
    features: ['大比例', '军用仿真', '金属件', '可改装'],
    price: '¥2,500-4,000',
    releaseYear: 2019,
  },

  // ========== WPL ==========
  {
    id: 'wpl-b16',
    name: 'B16 攀爬车',
    nameEn: 'B16 Crawler',
    brand: 'WPL',
    brandEn: 'WPL',
    type: 'crawler',
    scale: '1/16',
    description: '入门级攀爬车，仿真卡车外观，价格亲民',
    descriptionEn: 'Entry-level crawler, realistic truck appearance, affordable',
    manualUrl: 'https://wpl.com/manuals/b16-manual.pdf',
    features: ['仿真外观', '价格亲民', '入门友好', '易改装'],
    price: '¥200-400',
    releaseYear: 2018,
  },
  {
    id: 'wpl-d12',
    name: 'D12 攀爬车',
    nameEn: 'D12 Crawler',
    brand: 'WPL',
    brandEn: 'WPL',
    type: 'crawler',
    scale: '1/12',
    description: '中型攀爬车，更多细节和更强性能',
    descriptionEn: 'Medium crawler, more details and stronger performance',
    manualUrl: 'https://wpl.com/manuals/d12-manual.pdf',
    features: ['中型尺寸', '更多细节', '性能提升', '易改装'],
    price: '¥300-500',
    releaseYear: 2020,
  },
];

// 导出默认数据
export default modelsData;
