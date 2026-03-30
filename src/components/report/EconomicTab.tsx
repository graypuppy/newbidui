import React, { useState } from 'react';
import { 
  Fingerprint, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink, 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  Settings,
  Search,
  ChevronDown,
  CheckCircle,
  Table
} from 'lucide-react';
import { FileItem, PdfPreviewState } from '../../types';
import { 
  mockErrorConsistencyData, 
  mockQuoteDetails, 
  mockQuotaDetails, 
  mockMaterialsData 
} from '../../data/mockData';

interface EconomicTabProps {
  comparingFiles: FileItem[];
  mockEconomicDetails?: any;
  setPdfPreviewState: (state: PdfPreviewState) => void;
  isExporting: boolean;
  reportTab?: string;
}

const EconomicTab: React.FC<EconomicTabProps> = ({
  comparingFiles,
  setPdfPreviewState,
  isExporting,
  reportTab = 'economic'
}) => {
  const [economicTab, setEconomicTab] = useState<'attributes' | 'errors' | 'quotes' | 'quota' | 'materials'>('attributes');
  const [selectedQuotePair, setSelectedQuotePair] = useState<{file1: string, file2: string} | null>(null);
  const [selectedQuotaPair, setSelectedQuotaPair] = useState<{file1: string, file2: string} | null>(null);
  const [selectedMaterialPair, setSelectedMaterialPair] = useState<{file1: string, file2: string} | null>(null);
  const [selectedErrorPair, setSelectedErrorPair] = useState<{file1: string, file2: string} | null>({file1: '投标_符合性错误.SXTB4', file2: '投标_计算错误.SXTB4'});
  const [quotaRules, setQuotaRules] = useState({
    ruleType: '等比',
    compareType: '单价'
  });
  const [quotaFilters, setQuotaFilters] = useState({
    minItems: 5,
    maxItems: 100,
    percentage: 20
  });
  const [showBiddingFiles, setShowBiddingFiles] = useState(false);
  const [unreasonableErrors, setUnreasonableErrors] = useState<Record<string, { checked: boolean, reason: string }>>({});

  const matrixFiles = comparingFiles.length > 0 ? comparingFiles.filter(f => !f.name.includes('控制价')) : [
    { id: '1', name: '投标_符合性错误.SXTB4', status: 'success', type: 'bid' },
    { id: '2', name: '投标_计算错误.SXTB4', status: 'success', type: 'bid' },
    { id: '3', name: '投标_正常.SXTB4', status: 'success', type: 'bid' }
  ];

  const mockEconomicData = [
    { 
      id: 1, 
      type: '错误一致性分析', 
      desc: '发现多处非标准清单特征描述错误完全一致', 
      files: comparingFiles.slice(0, 2).map(f => f.name), 
      riskLevel: '高风险',
      evidence: [
        { code: '010101003001', name: '挖土方', detail: '项目特征描述中将"挖土方"错误拼写为"挖土放"，两份文件该处拼写错误完全一致。' },
        { code: '010501001001', name: '垫层', detail: '厚度描述"150mm厚C15素混凝土"中，"素"字缺失，两份文件均描述为"150mm厚C15混凝土"。' }
      ]
    },
    { 
      id: 2, 
      type: '清单报价分析', 
      desc: '投标总价呈明显规律性等差递减', 
      files: comparingFiles.slice(0, 3).map(f => f.name), 
      riskLevel: '中风险',
      evidence: [
        { file: comparingFiles[0]?.name || '文件A', value: '15,000,000.00 元' },
        { file: comparingFiles[1]?.name || '文件B', value: '14,950,000.00 元 (差额: -50,000)' },
        { file: comparingFiles[2]?.name || '文件C', value: '14,900,000.00 元 (差额: -50,000)' }
      ]
    },
    { 
      id: 3, 
      type: '项目属性分析（软硬件信息）', 
      desc: '提取到完全相同的广联达计价软件加密锁号', 
      files: [comparingFiles[0]?.name, comparingFiles[2]?.name].filter(Boolean), 
      riskLevel: '高风险',
      evidence: [
        { key: '加密锁硬件ID', value: '8A9B-2C3D-4E5F-6G7H' },
        { key: '最后保存时间', value: '2026-02-28 14:30:22' }
      ]
    },
  ];

  return (
    <div className="space-y-6">
                  {isExporting && <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 mt-8">经济标比对</h2>}
                  {/* Sub-tabs */}
                  {!isExporting && (
                  <div className="flex flex-wrap gap-2" data-html2canvas-ignore="true">
                    <button 
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${economicTab === 'attributes' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                      onClick={() => setEconomicTab('attributes')}
                    >
                      项目属性分析（软硬件信息）
                    </button>
                    <button 
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${economicTab === 'errors' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                      onClick={() => setEconomicTab('errors')}
                    >
                      错误一致性分析
                    </button>
                    <button 
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${economicTab === 'quotes' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                      onClick={() => setEconomicTab('quotes')}
                    >
                      清单报价分析
                    </button>
                    <button 
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${economicTab === 'quota' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                      onClick={() => setEconomicTab('quota')}
                    >
                      定额子目分析
                    </button>
                    <button 
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${economicTab === 'materials' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                      onClick={() => setEconomicTab('materials')}
                    >
                      项目人材机汇总分析
                    </button>
                  </div>
                  )}

                  {(economicTab === 'attributes' || isExporting) && (
                    <div className="space-y-4">
                      {isExporting && <h3 className="text-xl font-bold text-slate-800 mt-6 border-b pb-2">项目属性分析（软硬件信息）</h3>}
                      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-slate-700">隐藏招标/控制价文件信息</span>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={!showBiddingFiles} 
                              onChange={(e) => setShowBiddingFiles(!e.target.checked)} 
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-slate-600">是</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={showBiddingFiles} 
                              onChange={(e) => setShowBiddingFiles(e.target.checked)} 
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-slate-600">否</span>
                          </label>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                            <tr>
                              <th className="py-3 px-4 font-medium whitespace-nowrap text-center">序号</th>
                              <th className="py-3 px-4 font-medium whitespace-nowrap text-center">单位名称</th>
                              <th className="py-3 px-4 font-medium whitespace-nowrap text-center">投标总价</th>
                              <th className="py-3 px-4 font-medium whitespace-nowrap text-center">实名信息</th>
                              <th className="py-3 px-4 font-medium whitespace-nowrap text-center">加密锁数量</th>
                              <th className="py-3 px-4 font-medium whitespace-nowrap text-center">加密锁号</th>
                              <th className="py-3 px-4 font-medium whitespace-nowrap text-center">锁号一致性文件</th>
                              <th className="py-3 px-4 font-medium whitespace-nowrap text-center">网卡MAC地址数量</th>
                              <th className="py-3 px-4 font-medium whitespace-nowrap text-center">网卡MAC地址</th>
                              <th className="py-3 px-4 font-medium whitespace-nowrap text-center">网卡MAC地址一致性文件</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {comparingFiles.filter(f => showBiddingFiles || !f.name.includes('控制价')).map((file, idx) => {
                              // Mock data based on the image
                              const isDup = idx < 2; // Make first two files have duplicates
                              const lockNum1 = '9733c80100070206b90a0006002d0010';
                              const lockNum2 = '9733c80100070206b90a000600330013';
                              const lockNum3 = '9733c80100070206b90a000600330014';
                              const mac = 'B4-A9-FC-B5-8C-72';
                              const dupFiles = '投标_符合性错误.SXTB4,投标_计算错误.SXTB4';
                              
                              return (
                                <tr key={file.id} className="hover:bg-slate-50 transition-colors">
                                  <td className="py-4 px-4 text-center text-slate-500">{idx + 1}</td>
                                  <td className="py-4 px-4 text-center text-slate-800">{file.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4')}</td>
                                  <td className="py-4 px-4 text-center text-slate-600">11500000.36</td>
                                  <td className="py-4 px-4 text-center text-slate-600">111</td>
                                  <td className={`py-4 px-4 text-center ${isDup ? 'text-red-500' : 'text-slate-600'}`}>{isDup ? 2 : 1}</td>
                                  <td className={`py-4 px-4 text-center ${isDup ? 'text-red-500' : 'text-slate-600'}`}>
                                    {isDup ? (
                                      <div className="flex flex-col gap-1">
                                        <span>{lockNum1}</span>
                                        <span>{idx === 0 ? lockNum2 : lockNum3}</span>
                                      </div>
                                    ) : (
                                      <span>{lockNum1}</span>
                                    )}
                                  </td>
                                  <td className={`py-4 px-4 text-center ${isDup ? 'text-red-500' : 'text-slate-600'}`}>
                                    {isDup ? dupFiles : '-'}
                                  </td>
                                  <td className={`py-4 px-4 text-center ${isDup ? 'text-red-500' : 'text-slate-600'}`}>{isDup ? 1 : 1}</td>
                                  <td className={`py-4 px-4 text-center ${isDup ? 'text-red-500' : 'text-slate-600'}`}>{isDup ? mac : '00-1A-2B-3C-4D-5E'}</td>
                                  <td className={`py-4 px-4 text-center ${isDup ? 'text-red-500' : 'text-slate-600'}`}>
                                    {isDup ? dupFiles : '-'}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {(economicTab === 'errors' || isExporting) && (
                    <div className="space-y-4">
                      {isExporting && <h3 className="text-xl font-bold text-slate-800 mt-6 border-b pb-2">错误一致性分析</h3>}
                      
                      {/* Matrix Table */}
                      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
                        <table className="w-full text-center text-sm">
                          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                            <tr>
                              <th className="py-3 px-4 font-medium whitespace-nowrap border-r border-slate-200">投标单位名称</th>
                              {comparingFiles.filter(f => !f.name.includes('控制价')).map(f => (
                                <th key={f.id} className="py-3 px-4 font-medium whitespace-nowrap text-blue-500">{f.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4')}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {comparingFiles.filter(f => !f.name.includes('控制价')).map((rowFile) => (
                              <tr key={rowFile.id} className="hover:bg-slate-50 transition-colors">
                                <td className="py-3 px-4 text-blue-500 text-left border-r border-slate-200">{rowFile.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4')}</td>
                                {comparingFiles.filter(f => !f.name.includes('控制价')).map((colFile) => {
                                  const isSelf = rowFile.id === colFile.id;
                                  const isSelected = selectedErrorPair?.file1 === rowFile.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4') && selectedErrorPair?.file2 === colFile.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4');
                                  // Mock logic: 1 error between the first two files
                                  const hasError = !isSelf && (rowFile.id === comparingFiles[0].id && colFile.id === comparingFiles[1].id || rowFile.id === comparingFiles[1].id && colFile.id === comparingFiles[0].id);
                                  
                                  return (
                                    <td 
                                      key={colFile.id} 
                                      className={`py-3 px-4 cursor-pointer transition-colors ${isSelected ? 'bg-blue-50 text-blue-600 font-bold' : hasError ? 'text-blue-500 hover:bg-slate-100' : 'text-slate-400'}`}
                                      onClick={() => {
                                        if (!isSelf) {
                                          setSelectedErrorPair({
                                            file1: rowFile.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4'),
                                            file2: colFile.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4')
                                          });
                                        }
                                      }}
                                    >
                                      {isSelf ? '-' : (hasError ? '1' : '-')}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Detailed Table */}
                      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
                        <table className="w-full text-center text-sm">
                          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                            <tr>
                              <th className="py-3 px-4 font-medium whitespace-nowrap">错误内容</th>
                              <th className="py-3 px-4 font-medium whitespace-nowrap">编码名称</th>
                              <th className="py-3 px-4 font-medium whitespace-nowrap">不符合原因</th>
                              <th className="py-3 px-4 font-medium whitespace-nowrap">错误项</th>
                              <th className="py-3 px-4 font-medium whitespace-nowrap">正确项</th>
                              <th className="py-3 px-4 font-medium whitespace-nowrap">不合理项</th>
                              <th className="py-3 px-4 font-medium whitespace-nowrap">不合理原因</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {mockErrorConsistencyData.map((item) => (
                              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                <td className="py-3 px-4 text-slate-800">{item.name}</td>
                                <td className="py-3 px-4 text-slate-600">{item.code}</td>
                                <td className="py-3 px-4 text-slate-600">{item.reason}</td>
                                <td className="py-3 px-4 text-slate-800">{item.errorItem}</td>
                                <td className="py-3 px-4 text-slate-800">{item.correctItem}</td>
                                <td className="py-3 px-4">
                                  <input 
                                    type="checkbox" 
                                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                                    checked={unreasonableErrors[item.id]?.checked || false}
                                    onChange={(e) => {
                                      setUnreasonableErrors(prev => ({
                                        ...prev,
                                        [item.id]: {
                                          checked: e.target.checked,
                                          reason: prev[item.id]?.reason || ''
                                        }
                                      }));
                                    }}
                                  />
                                </td>
                                <td className="py-3 px-4">
                                  {unreasonableErrors[item.id]?.checked && (
                                    <input
                                      type="text"
                                      className="w-full text-sm border border-slate-200 rounded p-1.5 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                      value={unreasonableErrors[item.id]?.reason || ''}
                                      onChange={(e) => {
                                        setUnreasonableErrors(prev => ({
                                          ...prev,
                                          [item.id]: {
                                            ...prev[item.id],
                                            reason: e.target.value
                                          }
                                        }));
                                      }}
                                    />
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        
                        {/* Summary Footer */}
                        <div className="p-4 border-t border-slate-200 bg-white text-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-slate-800">当前分析单位：</span>
                            <span className="text-red-500">{selectedErrorPair?.file1}</span>
                            <span className="text-slate-800">和</span>
                            <span className="text-red-500">{selectedErrorPair?.file2}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800">发现相同错误项：</span>
                            <span className="text-red-500">1</span>
                            <span className="text-slate-800">项</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {(economicTab === 'quotes' || isExporting) && (
                    <div className="space-y-4">
                      {isExporting && <h3 className="text-xl font-bold text-slate-800 mt-6 border-b pb-2">清单报价分析</h3>}
                      
                      {/* 规则设置 */}
                      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-slate-800 whitespace-nowrap">当前规则分析：</span>
                            <span className="text-slate-600">【清单综合单价等比】或【清单下工料机单价等比】或【清单下定额子目单价等比】或【清单下单价构成合价】</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-slate-800 whitespace-nowrap">起始阈值：</span>
                            <span className="text-slate-600">【同清单项数量≥5条】或【同清单项数量占总数量的百分比20%】或【同清单项合价之和占总报价的百分比≥20%】</span>
                          </div>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
                          规则设置
                        </button>
                      </div>

                      {/* 矩阵表格 */}
                      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
                        <table className="w-full text-center text-sm">
                          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                            <tr>
                              <th className="py-3 px-4 font-medium border-r border-slate-200">投标单位名称</th>
                              {matrixFiles.map(f => (
                                <th key={f.id} className="py-3 px-4 font-medium text-blue-600">{f.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4')}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {matrixFiles.map((rowFile, rowIdx) => (
                              <tr key={rowFile.id} className="hover:bg-slate-50 transition-colors">
                                <td className="py-3 px-4 text-blue-600 border-r border-slate-200">{rowFile.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4')}</td>
                                {matrixFiles.map((colFile, colIdx) => {
                                  // Mock logic: 100.00% for first two files if they are different
                                  let value = '-';
                                  if (rowIdx === 0 && colIdx === 1) value = '100.00%';
                                  if (rowIdx === 1 && colIdx === 0) value = '100.00%';
                                  
                                  const isSelected = selectedQuotePair?.file1 === rowFile.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4') && 
                                                     selectedQuotePair?.file2 === colFile.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4');

                                  return (
                                    <td 
                                      key={colFile.id} 
                                      className={`py-3 px-4 ${value !== '-' ? 'cursor-pointer text-blue-600 hover:bg-blue-50' : 'text-slate-400'} ${isSelected ? 'bg-blue-100 font-bold' : ''}`}
                                      onClick={() => {
                                        if (value !== '-') {
                                          setSelectedQuotePair({
                                            file1: rowFile.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4'),
                                            file2: colFile.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4')
                                          });
                                        }
                                      }}
                                    >
                                      {value}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* 详细表格 */}
                      {selectedQuotePair && (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                          <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <span className="text-sm font-medium text-slate-700">清单快捷搜索:</span>
                              <select className="text-sm border border-slate-300 rounded-md p-1.5 focus:ring-1 focus:ring-blue-500 outline-none w-40">
                                <option>全部清单</option>
                              </select>
                            </div>
                            <div className="relative">
                              <input 
                                type="text" 
                                placeholder="请输入搜索内容" 
                                className="text-sm border border-slate-300 rounded-md py-1.5 pl-3 pr-8 focus:ring-1 focus:ring-blue-500 outline-none w-64"
                              />
                              <Search className="w-4 h-4 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2" />
                            </div>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-center text-sm">
                              <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                                <tr>
                                  <th className="p-3 whitespace-nowrap" rowSpan={2}>编码</th>
                                  <th className="p-3 whitespace-nowrap" rowSpan={2}>名称</th>
                                  <th className="p-3 whitespace-nowrap" rowSpan={2}>类别</th>
                                  <th className="p-3 whitespace-nowrap" rowSpan={2}>单位</th>
                                  <th className="p-3 whitespace-nowrap" rowSpan={2}>项目特征</th>
                                  <th className="p-3 whitespace-nowrap" rowSpan={2}>{selectedQuotePair.file1}</th>
                                  <th className="p-3 whitespace-nowrap" rowSpan={2}>{selectedQuotePair.file2}</th>
                                  <th className="p-3 whitespace-nowrap" rowSpan={2}>比率 (%)</th>
                                  <th className="p-3 whitespace-nowrap" rowSpan={2}>所属单项单位工程</th>
                                  <th className="p-3 whitespace-nowrap border-b border-slate-200" colSpan={2}>规律性标记</th>
                                </tr>
                                <tr>
                                  <th className="p-2 whitespace-nowrap border-t border-slate-200">清单</th>
                                  <th className="p-2 whitespace-nowrap border-t border-slate-200">定额子目</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                <tr className="bg-slate-100/50">
                                  <td colSpan={11} className="p-2 text-left font-bold text-slate-700 flex items-center gap-1">
                                    <ChevronDown className="w-4 h-4" />
                                    单价比率 = 1% (共 1203 项)
                                  </td>
                                </tr>
                                {mockQuoteDetails.map((item) => (
                                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-3 text-slate-600">{item.code}</td>
                                    <td className="p-3 text-slate-800">{item.name}</td>
                                    <td className="p-3 text-slate-500">{item.category}</td>
                                    <td className="p-3 text-slate-500">{item.unit}</td>
                                    <td className="p-3 text-slate-600 text-left max-w-xs truncate" title={item.features}>{item.features}</td>
                                    <td className="p-3 text-slate-800">{item.price1}</td>
                                    <td className="p-3 text-slate-800">{item.price2}</td>
                                    <td className="p-3 text-slate-800">{item.ratio}</td>
                                    <td className="p-3 text-slate-600">{item.project}</td>
                                    <td className="p-3 text-blue-600"><div className="flex justify-center">{item.regularityList && <CheckCircle className="w-4 h-4" />}</div></td>
                                    <td className="p-3 text-blue-600"><div className="flex justify-center">{item.regularityQuota && <CheckCircle className="w-4 h-4" />}</div></td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="p-4 bg-slate-50 border-t border-slate-200 text-sm">
                            <div className="mb-1">
                              <span className="font-bold text-slate-800">当前分析单位：</span>
                              <span className="text-red-500">{selectedQuotePair.file1}</span>
                              <span>和</span>
                              <span className="text-red-500">{selectedQuotePair.file2}</span>
                            </div>
                            <div>
                              <span className="font-bold text-slate-800">发现相同错误项：</span>
                              <span className="text-red-500 font-bold">782</span>
                              <span> 项相同，{selectedQuotePair.file1}相同项合价之和为3711369.85元，占自身总报价99.64%，{selectedQuotePair.file2}相同项合价之和为3724730.51元，占自身总报价100.00%</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {(economicTab === 'quota' || isExporting) && (
                    <div className="space-y-4">
                      {isExporting && <h3 className="text-xl font-bold text-slate-800 mt-6 border-b pb-2">定额一致性分析</h3>}
                      {/* 规则设置 & 筛选条件 */}
                      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Settings className="w-5 h-5 text-indigo-500"/> 
                            定额子目分析规则与筛选
                          </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* 规则设置 */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-2">相同定额项设置规则</h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-slate-500">分析关系</label>
                                <select 
                                  className="text-sm border border-slate-200 rounded-md p-1.5 focus:ring-1 focus:ring-indigo-500 outline-none"
                                  value={quotaRules.ruleType}
                                  onChange={(e) => setQuotaRules({...quotaRules, ruleType: e.target.value})}
                                >
                                  <option>等比</option><option>等价</option><option>等差</option><option>等项</option><option>系数关系</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-slate-500">比对类型</label>
                                <select 
                                  className="text-sm border border-slate-200 rounded-md p-1.5 focus:ring-1 focus:ring-indigo-500 outline-none"
                                  value={quotaRules.compareType}
                                  onChange={(e) => setQuotaRules({...quotaRules, compareType: e.target.value})}
                                >
                                  <option>单价</option><option>合价</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* 筛选条件 */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-2">筛选条件</h4>
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <label className="text-sm text-slate-600 w-32">相同定额项数范围</label>
                                <div className="flex items-center gap-2 flex-1">
                                  <input 
                                    type="number" 
                                    className="w-20 text-sm border border-slate-200 rounded-md p-1.5 text-center focus:ring-1 focus:ring-indigo-500 outline-none"
                                    value={quotaFilters.minItems}
                                    onChange={(e) => setQuotaFilters({...quotaFilters, minItems: parseInt(e.target.value) || 0})}
                                  />
                                  <span className="text-slate-400">-</span>
                                  <input 
                                    type="number" 
                                    className="w-20 text-sm border border-slate-200 rounded-md p-1.5 text-center focus:ring-1 focus:ring-indigo-500 outline-none"
                                    value={quotaFilters.maxItems}
                                    onChange={(e) => setQuotaFilters({...quotaFilters, maxItems: parseInt(e.target.value) || 0})}
                                  />
                                  <span className="text-sm text-slate-500">项</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <label className="text-sm text-slate-600 w-32">相同定额项占比</label>
                                <div className="flex items-center gap-2 flex-1">
                                  <span className="text-sm text-slate-500">&ge;</span>
                                  <input 
                                    type="number" 
                                    className="w-20 text-sm border border-slate-200 rounded-md p-1.5 text-center focus:ring-1 focus:ring-indigo-500 outline-none"
                                    value={quotaFilters.percentage}
                                    onChange={(e) => setQuotaFilters({...quotaFilters, percentage: parseInt(e.target.value) || 0})}
                                  />
                                  <span className="text-sm text-slate-500">%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 矩阵表格 */}
                      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
                        <table className="w-full text-center text-sm">
                          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                            <tr>
                              <th className="py-3 px-4 font-medium border-r border-slate-200">投标单位名称</th>
                              {matrixFiles.map(f => (
                                <th key={f.id} className="py-3 px-4 font-medium text-blue-600">{f.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4')}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {matrixFiles.map((rowFile, rowIdx) => (
                              <tr key={rowFile.id} className="hover:bg-slate-50 transition-colors">
                                <td className="py-3 px-4 text-blue-600 border-r border-slate-200">{rowFile.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4')}</td>
                                {matrixFiles.map((colFile, colIdx) => {
                                  // Mock logic: 100.00% for first two files if they are different
                                  let value = '-';
                                  if (rowIdx === 0 && colIdx === 1) value = '100.00%';
                                  if (rowIdx === 1 && colIdx === 0) value = '100.00%';
                                  
                                  const isSelected = selectedQuotaPair?.file1 === rowFile.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4') && 
                                                     selectedQuotaPair?.file2 === colFile.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4');

                                  return (
                                    <td 
                                      key={colFile.id} 
                                      className={`py-3 px-4 ${value !== '-' ? 'cursor-pointer text-blue-600 hover:bg-blue-50' : 'text-slate-400'} ${isSelected ? 'bg-blue-100 font-bold' : ''}`}
                                      onClick={() => {
                                        if (value !== '-') {
                                          setSelectedQuotaPair({
                                            file1: rowFile.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4'),
                                            file2: colFile.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4')
                                          });
                                        }
                                      }}
                                    >
                                      {value}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* 定额子目分析结果表格 */}
                      {selectedQuotaPair && (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                              <Table className="w-5 h-5 text-indigo-500"/> 
                              定额子目分析结果
                            </h3>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                              <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                                  <th className="py-3 px-4 font-bold border-r border-slate-200 whitespace-nowrap">编码</th>
                                  <th className="py-3 px-4 font-bold border-r border-slate-200 whitespace-nowrap">名称</th>
                                  <th className="py-3 px-4 font-bold border-r border-slate-200 whitespace-nowrap">单位</th>
                                  <th className="py-3 px-4 font-bold border-r border-slate-200 whitespace-nowrap">项目特征</th>
                                  <th className="py-3 px-4 font-bold border-r border-slate-200 whitespace-nowrap text-right">{selectedQuotaPair.file1}</th>
                                  <th className="py-3 px-4 font-bold border-r border-slate-200 whitespace-nowrap text-right">{selectedQuotaPair.file2}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                <tr className="bg-slate-100/50">
                                  <td colSpan={6} className="p-2 text-left font-bold text-slate-700 flex items-center gap-1">
                                    <ChevronDown className="w-4 h-4" />
                                    单价比率 = 1% (共 1203 项)
                                  </td>
                                </tr>
                                {mockQuotaDetails.map((row) => (
                                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="py-3 px-4 font-mono text-indigo-600 border-r border-slate-200 whitespace-nowrap" style={{ paddingLeft: `${row.level * 1.5 + 1}rem` }}>
                                      <div className="flex items-center gap-2">
                                        {row.hasChildren && <ChevronDown className="w-4 h-4 text-slate-400" />}
                                        {!row.hasChildren && <span className="w-4 inline-block"></span>}
                                        {row.code}
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-slate-800 font-medium border-r border-slate-200 whitespace-nowrap">{row.name}</td>
                                    <td className="py-3 px-4 text-slate-500 border-r border-slate-200 whitespace-nowrap">{row.unit}</td>
                                    <td className="py-3 px-4 text-slate-600 border-r border-slate-200 text-left max-w-xs truncate" title={row.features}>{row.features}</td>
                                    <td className="py-3 px-4 font-mono text-slate-700 border-r border-slate-200 text-right whitespace-nowrap">
                                      {row.price1}
                                    </td>
                                    <td className="py-3 px-4 font-mono text-slate-700 border-r border-slate-200 text-right whitespace-nowrap">
                                      {row.price2}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="p-4 bg-slate-50 border-t border-slate-200 text-sm">
                            <div className="mb-1">
                              <span className="font-bold text-slate-800">当前分析单位：</span>
                              <span className="text-red-500">{selectedQuotaPair.file1}</span>
                              <span>和</span>
                              <span className="text-red-500">{selectedQuotaPair.file2}</span>
                            </div>
                            <div>
                              <span className="font-bold text-slate-800">发现相同定额项：</span>
                              <span className="text-red-500 font-bold">1203</span>
                              <span> 项相同，{selectedQuotaPair.file1}相同项合价之和为152341.20元，占自身总报价85.50%，{selectedQuotaPair.file2}相同项合价之和为152341.20元，占自身总报价85.50%</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {(economicTab === 'materials' || isExporting) && (
                    <div className="space-y-4">
                      {isExporting && <h3 className="text-xl font-bold text-slate-800 mt-6 border-b pb-2">项目人材机汇总分析</h3>}
                      
                      {/* 规则设置 */}
                      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
                            <span className="font-bold text-slate-800 whitespace-nowrap">当前规则分析：</span>
                            <span className="text-red-600 font-medium">单价差额相同(A-B)</span>
                          </div>
                          <div className="flex items-center gap-2 pl-2">
                            <span className="font-bold text-slate-800 whitespace-nowrap">筛选条件：</span>
                            <span className="text-red-600">同差额项数量≥1条 或 同差额项数量占总数量的百分比≥20% 或 同差额项合价之和占总报价的百分比≥20%</span>
                          </div>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
                          规则设置
                        </button>
                      </div>

                      {/* 矩阵表格 */}
                      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
                        <table className="w-full text-center text-sm">
                          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                            <tr>
                              <th className="py-3 px-4 font-medium border-r border-slate-200">投标单位名称</th>
                              {matrixFiles.map(f => (
                                <th key={f.id} className="py-3 px-4 font-medium text-blue-600">{f.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4')}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {matrixFiles.map((rowFile, rowIdx) => (
                              <tr key={rowFile.id} className="hover:bg-slate-50 transition-colors">
                                <td className="py-3 px-4 text-blue-600 border-r border-slate-200">{rowFile.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4')}</td>
                                {matrixFiles.map((colFile, colIdx) => {
                                  // Mock logic: 99.00% for first two files if they are different
                                  let value = '-';
                                  if (rowIdx === 0 && colIdx === 1) value = '99.00%';
                                  if (rowIdx === 1 && colIdx === 0) value = '99.00%';
                                  
                                  const isSelected = selectedMaterialPair?.file1 === rowFile.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4') && 
                                                     selectedMaterialPair?.file2 === colFile.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4');

                                  return (
                                    <td 
                                      key={colFile.id} 
                                      className={`py-3 px-4 ${value !== '-' ? 'cursor-pointer text-blue-600 hover:bg-blue-50' : 'text-slate-400'} ${isSelected ? 'bg-blue-100 font-bold' : ''}`}
                                      onClick={() => {
                                        if (value !== '-') {
                                          setSelectedMaterialPair({
                                            file1: rowFile.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4'),
                                            file2: colFile.name.replace('.gef', '.SXTB4').replace('.nXZTF', '.SXTB4')
                                          });
                                        }
                                      }}
                                    >
                                      {value}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* 详细表格 */}
                      {selectedMaterialPair && (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                              <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                                  <th className="py-3 px-4 font-bold border-r border-slate-200 whitespace-nowrap text-center">编码</th>
                                  <th className="py-3 px-4 font-bold border-r border-slate-200 whitespace-nowrap text-center">类别</th>
                                  <th className="py-3 px-4 font-bold border-r border-slate-200 whitespace-nowrap text-center">名称</th>
                                  <th className="py-3 px-4 font-bold border-r border-slate-200 whitespace-nowrap text-center">规格型号</th>
                                  <th className="py-3 px-4 font-bold border-r border-slate-200 whitespace-nowrap text-center">单位</th>
                                  <th className="py-3 px-4 font-bold border-r border-slate-200 whitespace-nowrap text-center">{selectedMaterialPair.file1}</th>
                                  <th className="py-3 px-4 font-bold border-r border-slate-200 whitespace-nowrap text-center">{selectedMaterialPair.file2}</th>
                                  <th className="py-3 px-4 font-bold border-r border-slate-200 whitespace-nowrap text-center">不合理项 <input type="checkbox" className="ml-1 rounded text-indigo-600 focus:ring-indigo-500" /></th>
                                  <th className="py-3 px-4 font-bold whitespace-nowrap text-center">不合理原因</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {mockMaterialsData.map((item) => (
                                  <tr key={item.id} className="hover:bg-slate-50 transition-colors text-center">
                                    <td className="py-3 px-4 border-r border-slate-100 font-mono text-slate-600">{item.code}</td>
                                    <td className="py-3 px-4 border-r border-slate-100 text-slate-600">{item.category}</td>
                                    <td className="py-3 px-4 border-r border-slate-100 text-slate-800">{item.name}</td>
                                    <td className="py-3 px-4 border-r border-slate-100 text-slate-600">{item.spec}</td>
                                    <td className="py-3 px-4 border-r border-slate-100 text-slate-600">{item.unit}</td>
                                    <td className="py-3 px-4 border-r border-slate-100 font-mono text-slate-700">{item.priceA}</td>
                                    <td className="py-3 px-4 border-r border-slate-100 font-mono text-slate-700">{item.priceB}</td>
                                    <td className="py-3 px-4 border-r border-slate-100">
                                      <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                                    </td>
                                    <td className="py-3 px-4 text-slate-600"></td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="p-4 bg-slate-50 border-t border-slate-200 text-sm">
                            <div className="mb-1">
                              <span className="font-bold text-slate-800">当前分析单位：</span>
                              <span className="text-red-500">{selectedMaterialPair.file1}</span>
                              <span>和</span>
                              <span className="text-red-500">{selectedMaterialPair.file2}</span>
                            </div>
                            <div>
                              <span className="font-bold text-slate-800">发现相同错项：</span>
                              <span className="text-red-500 font-bold">1026</span>
                              <span> 项相同，{selectedMaterialPair.file1}相同项合价之和为1259548.456961元，占自身总报价100.00%，{selectedMaterialPair.file2}相同项合价之和为1259548.456961元，占自身总报价99.58%</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {!['attributes', 'errors', 'quotes', 'quota', 'materials'].includes(economicTab) && (
                    <div className="space-y-4">
                      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-slate-800 flex items-center gap-2"><Fingerprint className="w-5 h-5 text-amber-500"/> 经济标异常分析</h3>
                          <p className="text-sm text-slate-500 mt-1">深度比对工程量清单、报价明细及计价软件底层特征，共发现 {mockEconomicData.length} 处异常。</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                        {mockEconomicData.map((item) => (
                          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-bold text-slate-800 text-lg">{item.type}</h4>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                    item.riskLevel === '高风险' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-amber-100 text-amber-700 border border-amber-200'
                                  }`}>
                                    {item.riskLevel}
                                  </span>
                                </div>
                                <p className="text-sm text-slate-600">{item.desc}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-xs text-slate-500 mb-1">涉及文件 ({item.files.length})</div>
                                <div className="flex flex-col items-end gap-1">
                                  {item.files.map((f, idx) => (
                                    <span key={idx} className="text-sm font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">{f}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="p-5 bg-white">
                              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">详细比对依据</h5>
                              <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                                <table className="w-full text-left text-sm">
                                  <tbody className="divide-y divide-slate-200">
                                    {item.evidence.map((ev: any, idx) => (
                                      <tr key={idx} className="hover:bg-slate-100/50 transition-colors">
                                        <td className="py-3 px-4 font-medium text-slate-700 w-1/3 border-r border-slate-200 bg-slate-50/50">
                                          {ev.code ? <span className="font-mono text-indigo-600 mr-2">{ev.code}</span> : null}
                                          {ev.name || ev.key || ev.file}
                                        </td>
                                        <td className="py-3 px-4 text-slate-600 font-mono text-xs">
                                          {ev.detail || ev.value}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
  );
};

export default EconomicTab;
