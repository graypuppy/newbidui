export const generateMockCreditDataByField = (creditItems: string[], comparingFiles: any[]) => {
  return creditItems.map((item, j) => {
    return {
      field: item,
      files: comparingFiles.map((f, i) => {
        let values: string[] = [];
        if (item === '法定代表人名称比对') values = i % 2 === 0 ? ['陈大明'] : ['王小二'];
        else if (item === '法定代表人身份证比对') values = i % 2 === 0 ? ['110105197001011234'] : ['110105197502023456'];
        else if (item === '人员名称比对') values = i === 0 || i === 2 ? ['张建国', '王强'] : ['李伟', '赵敏'];
        else if (item === '人员身份证比对') values = i === 0 || i === 2 ? ['110105198001011234', '110105198502023456'] : ['110105199001015678', '110105199203037890'];
        else if (item === '手机号比对') values = i % 2 === 0 ? ['13800138000'] : ['13900139000'];
        else if (item === '邮箱比对') values = i % 2 === 0 ? ['admin@company.com'] : ['contact@other.com'];
        else if (item === '证书编号比对') values = i % 2 === 0 ? ['D211012345'] : ['D211098765'];
        else if (item === '业绩名称比对') values = i % 2 === 0 ? ['某市第一人民医院门诊楼新建工程', '某市第二人民医院住院楼'] : ['某住宅楼项目'];
        else if (item === '地址比对') values = i % 2 === 0 ? ['北京市海淀区某某路1号'] : ['上海市浦东新区某某路99号'];
        else if (item === '统一社会信用代码比对') values = i % 2 === 0 ? ['91110108MA00123456'] : ['91310115MA00987654'];
        else if (item === '签章查重') values = i % 2 === 0 ? ['检测到有效电子签章'] : ['未检测到签章'];
        else if (item === '引用内容查重') values = i % 2 === 0 ? ['引用《建筑设计规范》第3.2条'] : ['无引用内容'];
        else values = [`合规数据 ${i}-${j}-A`, `合规数据 ${i}-${j}-B`];
        
        // Add some cross-file duplicates to test highlighting
        if (item === '人员名称比对' && i === 1) values.push('张建国'); // Duplicate with file 0 and 2
        if (item === '人员身份证比对' && i === 3) values.push('110105198001011234'); // Duplicate with file 0 and 2
        
        return {
          fileId: f.id,
          fileName: f.name,
          values: values
        };
      })
    };
  });
};

export const generateMockDeviceMatrixData = (comparingFiles: any[], ALL_DEVICE_ITEMS: string[]) => {
  return comparingFiles.map((f, i) => ({
    id: f.id,
    name: f.name,
    values: ALL_DEVICE_ITEMS.map((item, j) => {
      if (item === '文件属性查重') return i < 2 ? '发现重复属性 (张三)' : '属性正常';
      if (item === 'MAC地址比对') return i < 2 ? '00:1A:2B:3C:4D:5E' : `00:E0:4C:${Math.floor(Math.random()*256).toString(16).padStart(2,'0')}:${Math.floor(Math.random()*256).toString(16).padStart(2,'0')}:${Math.floor(Math.random()*256).toString(16).padStart(2,'0')}`.toUpperCase();
      if (item === '计算机名比对') return i < 2 ? 'DESKTOP-8F9A2B' : `LAPTOP-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      if (item === '计算机用户名比对') return i < 2 ? 'Administrator' : `User_${i}`;
      if (item === '硬盘序列号比对') return i === 0 || i === 2 ? 'SN-99283-X1' : `SN-${Math.floor(Math.random()*100000)}-${Math.random().toString(36).substr(2, 2).toUpperCase()}`;
      if (item === 'CPU序列号比对') return 'BFEBFBFF000906E3';
      if (item === '主板序列号比对') return `MB-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
      if (item === '文件操作来源比对') return 'Office 365 Pro';
      if (item === '文件创建码比对') return `{${Math.random().toString(36).substr(2, 8)}-${Math.random().toString(36).substr(2, 4)}}`;
      if (item === '文件生成锁号比对') return i === 0 || i === 2 ? 'GLD-LOCK-8821' : 'GLD-LOCK-9912';
      if (item === '机器特征码比对') return i < 2 ? 'HWID-A1B2-C3D4' : `HWID-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      return `特征值 ${i}-${j}`;
    })
  }));
};

export const generateMockTechDetails = (comparingFiles: any[]) => {
  return {
    docProps: {
      title: '文件属性查重',
      desc: '检查文档元数据，包括作者、修改人、创建时间等',
      items: [
        { key: 'Author', label: '文档作者 (Author)', values: comparingFiles.map((f, i) => ({ file: f.name, value: i === 1 ? '张三' : (i === 2 ? '张三' : `User_${i}`), status: (i === 1 || i === 2) ? 'fail' : 'pass' })) },
        { key: 'LastModifiedBy', label: '最后修改人', values: comparingFiles.map((f, i) => ({ file: f.name, value: i === 0 ? '李四' : (i === 2 ? '李四' : `Admin_${i}`), status: (i === 0 || i === 2) ? 'fail' : 'pass' })) },
        { key: 'Company', label: '公司名称', values: comparingFiles.map(f => ({ file: f.name, value: 'Unknown', status: 'pass' })) },
        { key: 'Template', label: '使用模板', values: comparingFiles.map((f, i) => ({ file: f.name, value: 'Normal.dotm', status: 'pass' })) },
        { key: 'CreateTime', label: '创建时间', values: comparingFiles.map((f, i) => ({ file: f.name, value: '2023-10-27 10:00:00', status: 'pass' })) },
        { key: 'TotalEditTime', label: '总编辑时间', values: comparingFiles.map((f, i) => ({ file: f.name, value: `${100 + i * 20} 分钟`, status: 'pass' })) },
      ]
    },
    images: {
      title: '图片查重',
      desc: '提取文档内所有图片进行指纹比对',
      items: [
        { id: 1, type: 'image', name: '施工现场平面布置图', context: '第三章 施工组织设计 - 3.1 现场布置', status: 'pass', desc: '未发现重复图片', similarity: '0%', page: 12, rect: { x: 100, y: 200, w: 400, h: 300 }, fileName: comparingFiles[0]?.name },
        { id: 2, type: 'image', name: '系统架构拓扑图', context: '第四章 技术方案 - 4.2 系统架构', status: 'fail', desc: '在[文件A]和[文件C]中发现完全一致的图片', similarity: '100%', evidence: 'MD5: a1b2c3d4...', page: 45, rect: { x: 50, y: 100, w: 500, h: 400 }, fileName: comparingFiles[0]?.name },
        { id: 3, type: 'image', name: '资质证书扫描件', context: '附件一 资质证明文件', status: 'pass', desc: '未发现重复图片', similarity: '0%', page: 88, rect: { x: 100, y: 100, w: 400, h: 600 }, fileName: comparingFiles[0]?.name },
      ]
    },
    table: {
      title: '表格文字查重',
      desc: '提取文档中的表格数据进行比对',
      items: [
        { id: 6, type: 'table', name: '人员配置表', context: '第七章 项目团队 - 7.1 人员配置', status: 'fail', desc: '表格内容与历史项目高度雷同', similarity: '100%', page: 71, content: '项目经理: 张三; 技术总监: 李四...', fileName: comparingFiles[0]?.name },
        { id: 7, type: 'table', name: '设备参数表', context: '第八章 设备清单 - 8.2 参数指标', status: 'pass', desc: '表格数据正常', similarity: '5%', page: 85, content: '服务器: CPU 64核, 内存 512G...', fileName: comparingFiles[0]?.name }
      ]
    },
    sensitive: {
      title: '敏感信息检测',
      desc: '扫描文档内是否包含敏感关键词或隐私信息',
      items: [
        { id: 12, type: 'sensitive', keyword: '内部绝密', count: 0, status: 'pass', desc: '未发现敏感词', page: 0, fileName: comparingFiles[0]?.name },
        { id: 13, type: 'sensitive', keyword: '联系方式', count: 12, status: 'info', desc: '发现12处手机号，格式正常', page: 15, locations: [15, 22, 33], fileName: comparingFiles[0]?.name },
        { id: 14, type: 'sensitive', keyword: '身份证号', count: 5, status: 'info', desc: '发现5处身份证号，格式正常', page: 18, locations: [18, 45], fileName: comparingFiles[0]?.name },
        { id: 15, type: 'sensitive', keyword: '标底金额', count: 0, status: 'pass', desc: '未发现标底相关信息', page: 0, fileName: comparingFiles[0]?.name },
      ]
    }
  };
};

export const generateMockSimilarityMatrix = (files: any[]) => {
  const matrix: any[] = [];
  files.forEach((fileA, i) => {
    const row: any = { fileId: fileA.id, fileName: fileA.name, scores: {} };
    files.forEach((fileB, j) => {
      if (i === j) {
        row.scores[fileB.id] = '100%';
      } else {
        // Generate some realistic looking similarity scores
        const baseScore = i + j > 3 ? 15 : (i + j > 1 ? 45 : 85);
        const randomVariation = Math.floor(Math.random() * 10);
        row.scores[fileB.id] = `${Math.min(99, baseScore + randomVariation)}%`;
      }
    });
    matrix.push(row);
  });
  return matrix;
};

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
    ],
    resource: [
      { code: 'R001', name: '普工', unit: '工日', prices: { '文件A': 150, '文件B': 150, '文件C': 160 } }
    ],
    composition: [
      { name: '人工费', prices: { '文件A': 15.5, '文件B': 15.5, '文件C': 16.0 } },
      { name: '材料费', prices: { '文件A': 0, '文件B': 0, '文件C': 0 } },
      { name: '机械费', prices: { '文件A': 0, '文件B': 0, '文件C': 0 } }
    ]
  },
  'p2': {
    quota: [
      { code: '1-20', name: '机械挖石方', unit: '100m³', prices: { '文件A': 4500, '文件B': 4050, '文件C': 4950 } }
    ],
    resource: [
      { code: 'M001', name: '挖掘机', unit: '台班', prices: { '文件A': 1200, '文件B': 1080, '文件C': 1320 } }
    ],
    composition: [
      { name: '人工费', prices: { '文件A': 5.0, '文件B': 4.5, '文件C': 5.5 } },
      { name: '材料费', prices: { '文件A': 0, '文件B': 0, '文件C': 0 } },
      { name: '机械费', prices: { '文件A': 40.0, '文件B': 36.0, '文件C': 44.0 } }
    ]
  }
};

export const mockQuotaAnalysisData = [
  {
    id: 'q1',
    parentList: '010101001001 平整场地',
    singleItem: '单位工程A',
    projectName: '某住宅楼项目',
    quotaCode: '1-1',
    quotaName: '人工平整场地',
    unit: '100m²',
    prices: {
      '文件A': 150.00,
      '文件B': 150.00,
      '文件C': 150.00
    },
    relationship: '相同',
    ratio: '1:1:1'
  },
  {
    id: 'q2',
    parentList: '010101003001 挖沟槽土方',
    singleItem: '单位工程A',
    projectName: '某住宅楼项目',
    quotaCode: '1-15',
    quotaName: '人工挖沟槽土方',
    unit: '100m³',
    prices: {
      '文件A': 1500.00,
      '文件B': 1350.00,
      '文件C': 1650.00
    },
    relationship: '系数关系 (0.9, 1.1)',
    ratio: '1 : 0.9 : 1.1'
  },
  {
    id: 'q3',
    parentList: '010401001001 基础垫层',
    singleItem: '单位工程A',
    projectName: '某住宅楼项目',
    quotaCode: '4-1',
    quotaName: 'C15混凝土垫层',
    unit: '10m³',
    prices: {
      '文件A': 4500.00,
      '文件B': 4550.00,
      '文件C': 4600.00
    },
    relationship: '等差关系 (d=50)',
    ratio: '+50 / +100'
  }
];

export const mockMaterialsData = [
  {
    id: 'm1',
    code: '000101000',
    category: '人工',
    name: '综合一类工',
    spec: '',
    unit: '工日',
    priceA: 29.75,
    priceB: 29.75,
  },
  {
    id: 'm2',
    code: '340309001',
    category: '材料',
    name: '电雷管',
    spec: '',
    unit: '个',
    priceA: 0.7,
    priceB: 0.7,
  },
  {
    id: 'm3',
    code: '340305002',
    category: '材料',
    name: '乳化炸药',
    spec: '',
    unit: 'kg',
    priceA: 1.65,
    priceB: 1.65,
  },
  {
    id: 'm4',
    code: '011505001',
    category: '材料',
    name: '六角空心钢(综合)',
    spec: '',
    unit: 'kg',
    priceA: 0.7,
    priceB: 0.7,
  },
  {
    id: 'm5',
    code: '031519016',
    category: '材料',
    name: '合金钢钻头',
    spec: '',
    unit: '个',
    priceA: 1.15,
    priceB: 1.15,
  },
  {
    id: 'm6',
    code: '280301003',
    category: '材料',
    name: '铜芯塑料绝缘电线 BV-1.5mm2',
    spec: '',
    unit: 'm',
    priceA: 0.21,
    priceB: 0.21,
  },
  {
    id: 'm7',
    code: '280301004',
    category: '材料',
    name: '铜芯塑料绝缘电线 BV-2.5mm2',
    spec: '',
    unit: 'm',
    priceA: 0.33,
    priceB: 0.33,
  },
  {
    id: 'm8',
    code: 'CL-D00001',
    category: '材料',
    name: '补充清单',
    spec: '',
    unit: 'm',
    priceA: 36.08,
    priceB: 36.08,
  }
];
