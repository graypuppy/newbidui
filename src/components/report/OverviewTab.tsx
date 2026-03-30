import React from 'react';
import { 
  Clock, 
  AlertTriangle, 
  FileSearch, 
  Fingerprint, 
  Cpu 
} from 'lucide-react';
import { FileItem } from '../../types';

interface OverviewTabProps {
  projectName: string;
  riskLevel: string;
  riskColor: string;
  riskCircleColor: string;
  riskPercentage: number;
  strokeDashoffset: number;
  riskData: {
    credit: number;
    tech: number;
    economic: number;
    device: number;
  };
  comparingFiles: FileItem[];
  setReportTab: (tab: string) => void;
  isExporting: boolean;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  projectName,
  riskLevel,
  riskColor,
  riskCircleColor,
  riskPercentage,
  strokeDashoffset,
  riskData,
  comparingFiles,
  setReportTab,
  isExporting,
}) => {
  return (
    <div className="space-y-6">
      {isExporting && <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 mt-8">结果概览</h2>}
      {/* Project Info Summary */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold text-slate-900">{projectName || '某工程项目招标文件比对'}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                项目比对报告
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {new Date().toLocaleString()}
              </span>
              <span>项目编号: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-xs text-slate-500 font-medium mb-1">综合风险评级</div>
              <div className={`text-2xl font-black ${riskColor} leading-none`}>{riskLevel}</div>
            </div>
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100" />
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="175.9" strokeDashoffset={strokeDashoffset} className={riskCircleColor} />
              </svg>
              <span className="absolute text-sm font-bold text-slate-700">{Math.round(riskPercentage)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => setReportTab('credit')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col cursor-pointer hover:shadow-md hover:border-blue-200 transition-all group"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">资信标风险</h3>
          </div>
          <div className="text-3xl font-black text-slate-900 mb-1">{riskData.credit} <span className="text-sm font-medium text-slate-500">处</span></div>
          <p className="text-xs text-slate-500 mt-auto">涉及法人、联系方式等信息重复</p>
        </div>
        <div 
          onClick={() => setReportTab('tech')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col cursor-pointer hover:shadow-md hover:border-emerald-200 transition-all group"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
              <FileSearch className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">技术标风险</h3>
          </div>
          <div className="text-3xl font-black text-slate-900 mb-1">{riskData.tech} <span className="text-sm font-medium text-slate-500">处</span></div>
          <p className="text-xs text-slate-500 mt-auto">最高段落相似度达 100%</p>
        </div>
        <div 
          onClick={() => setReportTab('economic')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col cursor-pointer hover:shadow-md hover:border-amber-200 transition-all group"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
              <Fingerprint className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-bold text-slate-800 group-hover:text-amber-700 transition-colors">经济标风险</h3>
          </div>
          <div className="text-3xl font-black text-slate-900 mb-1">{riskData.economic} <span className="text-sm font-medium text-slate-500">处</span></div>
          <p className="text-xs text-slate-500 mt-auto">发现计价锁号一致及规律性报价</p>
        </div>
        <div 
          onClick={() => setReportTab('device')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col cursor-pointer hover:shadow-md hover:border-purple-200 transition-all group"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
              <Cpu className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-bold text-slate-800 group-hover:text-purple-700 transition-colors">设备特征风险</h3>
          </div>
          <div className="text-3xl font-black text-slate-900 mb-1">{riskData.device} <span className="text-sm font-medium text-slate-500">处</span></div>
          <p className="text-xs text-slate-500 mt-auto">存在相同MAC地址及计算机名</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-red-500"/> 高风险项汇总</h3>
        </div>
        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500">
                <th className="py-3 px-5 font-medium">风险类型</th>
                <th className="py-3 px-5 font-medium">风险描述</th>
                <th className="py-3 px-5 font-medium">涉及文件</th>
                <th className="py-3 px-5 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-5">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">设备特征 - MAC地址</span>
                </td>
                <td className="py-4 px-5 text-sm text-slate-700 font-medium">发现完全相同的 MAC 地址 (00:1A:2B:3C:4D:5E)</td>
                <td className="py-4 px-5 text-sm text-slate-500">{comparingFiles.slice(0, 2).map(f => f.name).join(', ')}</td>
                <td className="py-4 px-5 text-right">
                  <button onClick={() => setReportTab('device')} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">查看详情</button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-5">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">技术标 - 语句雷同</span>
                </td>
                <td className="py-4 px-5 text-sm text-slate-700 font-medium">安全保证措施章节存在 100% 相似段落</td>
                <td className="py-4 px-5 text-sm text-slate-500">{comparingFiles.slice(0, 2).map(f => f.name).join(', ')}</td>
                <td className="py-4 px-5 text-right">
                  <button onClick={() => setReportTab('tech')} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">查看详情</button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-5">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">经济标 - 计价锁号</span>
                </td>
                <td className="py-4 px-5 text-sm text-slate-700 font-medium">提取到相同的广联达计价软件加密锁号</td>
                <td className="py-4 px-5 text-sm text-slate-500">{[comparingFiles[0]?.name, comparingFiles[2]?.name].filter(Boolean).join(', ')}</td>
                <td className="py-4 px-5 text-right">
                  <button onClick={() => setReportTab('economic')} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">查看详情</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
