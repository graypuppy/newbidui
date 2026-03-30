import React from 'react';
import { Fingerprint, AlertTriangle, FileText } from 'lucide-react';
import { FileItem } from '../../types';

interface DeviceTabProps {
  isExporting: boolean;
  comparingFiles: FileItem[];
  ALL_DEVICE_ITEMS: string[];
  mockDeviceMatrixData: any[];
  mockTechDetails: any;
  isDeviceValueDuplicate: (colIdx: number, val: string) => boolean;
  getDeviceDuplicateDetails: (colIdx: number, val: string, rowId: string) => string[];
}

const DeviceTab: React.FC<DeviceTabProps> = ({
  isExporting,
  comparingFiles,
  ALL_DEVICE_ITEMS,
  mockDeviceMatrixData,
  mockTechDetails,
  isDeviceValueDuplicate,
  getDeviceDuplicateDetails
}) => {
  return (
    <div className="space-y-8">
      {isExporting && <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 mt-8">文件设备特征比对</h2>}
      
      {/* Section 1: Document Properties Matrix (Moved from TechTab) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500"/> 
            文件属性查重
          </h3>
          <span className="text-xs text-slate-500 bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">
            共检查 {mockTechDetails.docProps.items.length} 项属性
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6 font-medium w-48">属性名称</th>
                {comparingFiles.map((f, i) => (
                  <th key={f.id} className="py-3 px-6 font-medium border-l border-slate-100">
                    {f.name}
                  </th>
                ))}
                <th className="py-3 px-6 font-medium border-l border-slate-100 w-32 text-center">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockTechDetails.docProps.items.map((item: any, idx: number) => {
                 const isFail = item.values.some((v: any) => v.status === 'fail');
                 return (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-700">{item.label}</td>
                    {item.values.map((v: any, vIdx: number) => (
                      <td key={vIdx} className={`py-4 px-6 text-sm border-l border-slate-100 ${v.status === 'fail' ? 'bg-red-50/30 text-red-700 font-medium' : 'text-slate-600'}`}>
                        {v.value}
                      </td>
                    ))}
                    <td className="py-4 px-6 border-l border-slate-100 text-center">
                      {isFail ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          异常
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          正常
                        </span>
                      )}
                    </td>
                  </tr>
                 );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Device Feature Matrix */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><Fingerprint className="w-5 h-5 text-purple-500"/> 设备特征比对矩阵</h3>
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="w-3 h-3 bg-red-100 border border-red-300 rounded-sm inline-block"></span> 标红代表存在重复风险 (多份文件硬件特征一致)
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
                <th className="py-4 px-5 font-bold border-r border-slate-200 w-64 bg-white sticky left-0 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">文件名称 \ 检测点</th>
                {ALL_DEVICE_ITEMS.map(item => (
                  <th key={item} className="py-4 px-5 font-bold border-r border-slate-200 whitespace-nowrap bg-slate-50">{item}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockDeviceMatrixData.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-5 font-medium text-slate-800 border-r border-slate-200 bg-white sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    <div className="truncate w-52" title={row.name}>{row.name}</div>
                  </td>
                  {row.values.map((val: string, colIdx: number) => {
                    const isDup = isDeviceValueDuplicate(colIdx, val);
                    const duplicates = isDup ? getDeviceDuplicateDetails(colIdx, val, row.id) : [];
                    return (
                      <td 
                        key={colIdx} 
                        className={`py-4 px-5 text-sm border-r border-slate-200 relative group transition-colors ${isDup ? 'bg-red-50 text-red-700 font-bold' : 'text-slate-600'}`}
                      >
                        {isDup && <AlertTriangle className="w-4 h-4 inline mr-1.5 text-red-500" />}
                        <span className="font-mono">{val}</span>
                        {isDup && (
                          <div className="absolute z-50 hidden group-hover:block bg-slate-800 text-white text-[10px] rounded p-2 shadow-lg -top-10 left-0 whitespace-nowrap">
                            <div className="font-bold mb-1">硬件特征一致</div>
                            <div>涉及文件:</div>
                            <div className="text-slate-300 mt-0.5">{duplicates.join(', ')}</div>
                            <div className="absolute -bottom-1 left-4 w-2 h-2 bg-slate-800 transform rotate-45"></div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeviceTab;
