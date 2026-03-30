export const mockDuplicates = [
  { id: 1, title: '施工组织设计-3.1节', similarity: '98%', lineA: 15, lineB: 18, text: '本工程基础采用旋挖钻孔灌注桩，桩径为800mm，桩长约25m...' },
  { id: 2, title: '安全保证措施-5.2节', similarity: '100%', lineA: 42, lineB: 42, text: '建立健全安全生产责任制，项目经理为第一责任人，全面负责现场安全管理...' },
  { id: 3, title: '质量控制标准-附录', similarity: '95%', lineA: 85, lineB: 90, text: '严格执行GB50300-2013建筑工程施工质量验收统一标准，确保工程合格率100%...' },
];

export const mockHardwareData = {
  dongles: [
    { id: 'GLD-889210', files: ['文件A_经济标.GBQ6', '文件C_经济标.GBQ6'], isBidding: false },
    { id: 'GLD-332199', files: ['文件B_经济标.GBQ6'], isBidding: false },
    { id: 'GLD-000000', files: ['控制价文件.GBQ6'], isBidding: true },
  ],
  macs: [
    { id: '00:1A:2B:3C:4D:5E', files: ['文件A_经济标.GBQ6', '文件C_经济标.GBQ6'], isBidding: false },
    { id: '08:00:27:8A:9B:0C', files: ['文件B_经济标.GBQ6'], isBidding: false },
    { id: 'FF:FF:FF:FF:FF:FF', files: ['控制价文件.GBQ6'], isBidding: true },
  ],
  hdds: [
    { id: 'WD-WCC6Y4', files: ['文件A_经济标.GBQ6', '文件C_经济标.GBQ6'], isBidding: false },
    { id: 'ST1000DM010', files: ['文件B_经济标.GBQ6'], isBidding: false },
    { id: 'SAMSUNG-970', files: ['控制价文件.GBQ6'], isBidding: true },
  ],
  computers: [
    { id: 'DESKTOP-A1B2C3', files: ['文件A_经济标.GBQ6', '文件C_经济标.GBQ6'], isBidding: false },
    { id: 'LAPTOP-X9Y8Z7', files: ['文件B_经济标.GBQ6'], isBidding: false },
    { id: 'SERVER-001', files: ['控制价文件.GBQ6'], isBidding: true },
  ]
};

export const mockErrorConsistencyData = [
  {
    id: 'err-1',
    code: '暂列1',
    name: '暂列金额',
    reason: '金额不匹配',
    errorItem: '1000.51',
    correctItem: '1000',
    files: ['投标_符合性错误.SXTB4', '投标_计算错误.SXTB4'],
    tab: '其他项目'
  }
];

export const mockPriceSimilarity = [
  { pair: '文件A vs 文件B', similarity: '85.5%', identicalItems: 125, totalItems: 146 },
  { pair: '文件A vs 文件C', similarity: '92.0%', identicalItems: 135, totalItems: 146 },
  { pair: '文件B vs 文件C', similarity: '78.2%', identicalItems: 114, totalItems: 146 },
];

export const mockQuotaDetails = [
  {
    id: 'root-1',
    code: '',
    name: '招标',
    unit: '',
    features: '',
    price1: '',
    price2: '',
    level: 0,
    hasChildren: true
  },
  {
    id: 'item-10',
    code: '',
    name: '单项10',
    unit: '',
    features: '',
    price1: '',
    price2: '',
    level: 1,
    hasChildren: true
  },
  {
    id: 'civil-a',
    code: '',
    name: 'A土建',
    unit: '',
    features: '',
    price1: '',
    price2: '',
    level: 2,
    hasChildren: true
  },
  {
    id: 'list-1',
    code: '010101001001',
    name: '清单名称 清单名称1',
    unit: 'm3',
    features: '1、土的类别：1',
    price1: '',
    price2: '',
    level: 3,
    hasChildren: true
  },
  {
    id: 'sub-1-1',
    code: '1-1',
    name: '人工挖一般土方（基深）一、二类土 ≤2m',
    unit: '10m3',
    features: '',
    price1: '191.06',
    price2: '191.06',
    level: 4,
    hasChildren: false
  },
  {
    id: 'sub-1-2',
    code: '1-2',
    name: '人工挖一般土方（基深）一、二类土 ≤4m',
    unit: '10m3',
    features: '',
    price1: '335.39',
    price2: '335.39',
    level: 4,
    hasChildren: false
  },
  {
    id: 'sub-1-3',
    code: '1-3',
    name: '人工挖一般土方（基深）三类土 ≤2m',
    unit: '10m3',
    features: '',
    price1: '337.67',
    price2: '337.67',
    level: 4,
    hasChildren: false
  },
  {
    id: 'list-2',
    code: '010101002001',
    name: '挖单独石方',
    unit: 'm3',
    features: '1、清单特征 2、清单特征1',
    price1: '',
    price2: '',
    level: 3,
    hasChildren: true
  },
  {
    id: 'sub-1-4',
    code: '1-4',
    name: '人工挖一般土方（基深）三类土 ≤4m',
    unit: '10m3',
    features: '',
    price1: '563.03',
    price2: '563.03',
    level: 4,
    hasChildren: false
  }
];

export const mockQuoteDetails = [
  {
    id: '1',
    code: '010101002001',
    name: '挖单独石方',
    category: '',
    unit: 'm3',
    features: '1、清单特征 2、清单特征1',
    price1: 175.58,
    price2: 175.58,
    ratio: 1,
    project: '新增四级分部-A.1 单独土石方',
    regularityList: true,
    regularityQuota: true
  },
  {
    id: '2',
    code: '010101003001',
    name: '单独土方回填',
    category: '',
    unit: 'm3',
    features: '1、材料品种：种类1 2、密实度：紧密',
    price1: 108.6,
    price2: 108.6,
    ratio: 1,
    project: '新增四级分部-A.1 单独土石方',
    regularityList: true,
    regularityQuota: true
  },
  {
    id: '3',
    code: '010102001001',
    name: '挖一般土方',
    category: '',
    unit: 'QDm31',
    features: '1、土的类别：2 2、开挖深度：20m 3、基底',
    price1: 240.7,
    price2: 240.7,
    ratio: 1,
    project: '新增四级分部-A.1 单独土石方',
    regularityList: true,
    regularityQuota: false
  }
];

export const mockPriceItems = [
  {
    id: 'p1',
    code: '010101003001',
    name: '挖一般土方',
    unit: 'm³',
    prices: {
      '文件A': 15.50,
      '文件B': 15.50,
      '文件C': 16.00
    },
    diffRatio: '0% (A vs B)',
    ruleMatch: '等价 (清单综合单价)'
  },
  {
    id: 'p2',
    code: '010101004001',
    name: '挖石方',
    unit: 'm³',
    prices: {
      '文件A': 45.00,
      '文件B': 40.50,
      '文件C': 49.50
    },
    diffRatio: '10% 等比 (A vs B vs C)',
    ruleMatch: '等比 (清单综合单价)'
  }
];

export const mockPriceDetails: Record<string, any> = {
  'p1': {
    quota: [
      { code: '1-15', name: '人工挖土方', unit: '100m³', prices: { '文件A': 1500, '文件B': 1500, '文件C': 1550 } }
    ]
  }
};
