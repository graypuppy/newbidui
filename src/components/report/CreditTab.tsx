import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { FileItem, PdfPreviewState } from '../../types';

interface CreditTabProps {
  comparingFiles: FileItem[];
  mockCreditDataByField: {
    field: string;
    files: {
      fileId: string;
      fileName: string;
      values: string[];
    }[];
  }[];
  setPdfPreviewState: (state: PdfPreviewState) => void;
  isExporting: boolean;
}

const CreditTab: React.FC<CreditTabProps> = ({
  comparingFiles,
  mockCreditDataByField,
  setPdfPreviewState,
  isExporting,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {isExporting && <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 m-5 mb-0">资信标比对</h2>}
      <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <h3 className="font-bold text-slate-800 flex items-center gap-2"><Clock className="w-5 h-5 text-blue-500"/> 资信标特征矩阵</h3>
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <span className="w-3 h-3 bg-red-100 border border-red-300 rounded-sm inline-block"></span> 标红代表存在重复风险 (多份文件信息一致)
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
              <th className="py-4 px-5 font-bold border-r border-slate-200 w-64 bg-white sticky left-0 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">检测点 \ 文件名称</th>
              {comparingFiles.map(f => (
                <th key={f.id} className="py-4 px-5 font-bold border-r border-slate-200 whitespace-nowrap bg-slate-50">
                  <div className="truncate w-52" title={f.name}>{f.name}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {mockCreditDataByField.map((row, rowIdx) => (
              <tr key={row.field} className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-5 font-medium text-slate-800 border-r border-slate-200 bg-white sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  {row.field}
                </td>
                {row.files.map((fileData, colIdx) => {
                  return (
                    <td key={fileData.fileId} className="py-4 px-5 text-sm border-r border-slate-200 align-top">
                      <div className="flex flex-col gap-2">
                        {fileData.values.map((val, valIdx) => {
                          const otherFilesWithValue = row.files.filter(f => f.fileId !== fileData.fileId && f.values.includes(val));
                          const isDup = otherFilesWithValue.length > 0;
                          
                          return (
                            <div 
                              key={valIdx}
                              onClick={() => {
                                const duplicates = otherFilesWithValue.map(f => ({ fileName: f.fileName, value: val }));
                                setPdfPreviewState({
                                  isOpen: true,
                                  fileName: fileData.fileName,
                                  value: val,
                                  type: row.field,
                                  contentType: 'text',
                                  duplicates: isDup ? duplicates : undefined
                                });
                              }}
                              className={`p-2 rounded-md border cursor-pointer transition-colors relative group ${
                                isDup 
                                  ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100' 
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700'
                              }`}
                            >
                              <div className="flex items-start gap-1.5">
                                {isDup && <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />}
                                <span className={`break-all ${isDup ? 'font-bold' : ''}`}>{val}</span>
                              </div>
                              
                              {isDup && (
                                <div className="absolute z-50 hidden group-hover:block bg-slate-800 text-white text-xs rounded p-2 shadow-lg -top-10 left-0 whitespace-nowrap">
                                  <div className="font-bold mb-1">重复预警</div>
                                  <div>与以下文件内容完全一致:</div>
                                  <div className="text-slate-300 mt-0.5">{otherFilesWithValue.map(f => f.fileName).join(', ')}</div>
                                  <div className="absolute -bottom-1 left-4 w-2 h-2 bg-slate-800 transform rotate-45"></div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreditTab;
