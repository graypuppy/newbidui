import React from 'react';
import { 
  FileText, 
  Image, 
  Table, 
  ShieldAlert, 
  AlertTriangle 
} from 'lucide-react';

interface PdfViewProps {
  fileName: string;
  value: string;
  type: string;
  isDuplicate?: boolean;
  contentType?: 'text' | 'image' | 'table' | 'sensitive';
  activeSensitiveLoc?: number | null;
}

const PdfView: React.FC<PdfViewProps> = ({
  fileName,
  value,
  type,
  isDuplicate = false,
  contentType = 'text',
  activeSensitiveLoc,
}) => {
  return (
    <div className="bg-white shadow-lg w-full min-h-full p-12 text-slate-800 relative">
      {/* Mock PDF Header */}
      <div className="border-b-2 border-slate-800 pb-4 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold font-serif mb-2">投标文件</h1>
          <p className="text-sm text-slate-500">项目编号: HDHMMI4PT</p>
        </div>
        <div className="text-right">
          <p className="font-serif font-bold text-lg">{isDuplicate ? '副本' : '正本'}</p>
          <p className="text-sm text-slate-500">{fileName}</p>
        </div>
      </div>

      {/* Mock Content */}
      <div className="space-y-6 font-serif text-base leading-loose text-justify">
        {contentType === 'sensitive' && (
          <>
            <p>
              <span className="font-bold">第 {activeSensitiveLoc || 1} 页内容</span>
            </p>
            <p className="indent-8">
              本项目的联系人为张三，联系电话是 <span className="font-bold underline decoration-orange-500 decoration-2 underline-offset-4 bg-orange-50 px-1">{value === '联系方式' ? `138${((activeSensitiveLoc || 1) * 12345678).toString().padStart(8, '0').slice(0, 8)}` : value === '身份证号' ? `11010519900101${((activeSensitiveLoc || 1) * 1234).toString().padStart(4, '0').slice(0, 4)}` : value}</span>。
              请在工作时间拨打此号码进行业务咨询。
            </p>
            <p className="indent-8">
              另外，相关负责人的备用联系方式也已记录在案，确保项目沟通的顺畅。如遇紧急情况，请优先联系主要负责人。
            </p>
            <div className="mt-8 p-4 bg-orange-50/50 border border-orange-100 rounded-lg text-sm text-orange-800">
              <div className="font-bold mb-2 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                敏感信息预警
              </div>
              <p>系统在此处检测到疑似 {value} 的敏感信息，请确认是否需要进行脱敏处理。</p>
            </div>
          </>
        )}

        {contentType === 'text' && (
          <>
            <p>
              <span className="font-bold">一、投标函</span>
            </p>
            <p>
              致：<span className="font-bold">某某招标代理有限公司</span>
            </p>
            <p className="indent-8">
              根据贵方为 <span className="font-bold">某某工程项目</span> 招标文件的要求，签字代表 <span className={`font-bold underline decoration-blue-500 decoration-2 underline-offset-4 px-1 ${isDuplicate ? 'bg-red-50 decoration-red-500' : 'bg-blue-50'}`}>{value}</span>（全名、职务）经正式授权并代表投标人 <span className="font-bold underline decoration-blue-500 decoration-2 underline-offset-4 bg-blue-50 px-1">{fileName.replace('.docx', '').replace('.pdf', '')}</span>（投标人名称）提交下述文件正本一份，副本四份。
            </p>
          </>
        )}

        {contentType === 'image' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="font-bold text-lg flex items-center gap-2">
                <Image className="w-5 h-5 text-indigo-500" />
                【检测到的图片/签章内容】
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">指纹比对技术: pHash + SIFT</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <div key={i} className={`w-1 h-3 rounded-full ${isDuplicate ? 'bg-red-400' : 'bg-blue-400'} opacity-${i * 10 + 20}`}></div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className={`relative border-4 rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ${isDuplicate ? 'border-red-500 ring-4 ring-red-100' : 'border-blue-500 ring-4 ring-blue-100'}`}>
              <img 
                src={type.includes('签章') 
                  ? "https://picsum.photos/seed/seal/600/600" 
                  : "https://picsum.photos/seed/diagram/1200/800"} 
                alt="Detected Content" 
                className={`w-full h-auto transition-all duration-700 ${isDuplicate ? 'sepia-[0.3] contrast-125' : 'grayscale-[0.1]'}`}
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay for "Seal" or "Diagram" */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`px-8 py-4 rounded-xl font-black text-3xl uppercase tracking-[0.2em] border-[6px] shadow-2xl backdrop-blur-sm transition-transform duration-700 ${
                  isDuplicate 
                    ? 'bg-red-50/90 text-red-600 border-red-600 rotate-12 scale-110' 
                    : 'bg-blue-50/90 text-blue-600 border-blue-600 -rotate-12'
                }`}>
                  {type.includes('签章') ? '电子签章' : '技术图纸'}
                </div>
              </div>

              {/* Duplicate Warning Badge */}
              {isDuplicate && (
                <div className="absolute top-6 right-6 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-black shadow-xl animate-bounce flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  发现高度重合图片 (100%)
                </div>
              )}

              {/* Scanline Animation */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-20 w-full top-[-100px] animate-[scan_3s_linear_infinite] pointer-events-none"></div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">特征哈希值</div>
                <div className="font-mono text-xs truncate">SHA256: {Math.random().toString(16).substring(2, 15).toUpperCase()}</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">提取位置</div>
                <div className="font-mono text-xs">Page {Math.floor(Math.random() * 50) + 1}, Offset: {Math.floor(Math.random() * 1000)}px</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">检测状态</div>
                <div className={`font-bold text-xs ${isDuplicate ? 'text-red-600' : 'text-emerald-600'}`}>
                  {isDuplicate ? '● 存在重复风险' : '● 校验通过'}
                </div>
              </div>
            </div>
          </div>
        )}

        {contentType === 'table' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="font-bold text-lg flex items-center gap-2">
                <Table className="w-5 h-5 text-emerald-500" />
                【检测到的表格内容】
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-2 px-4 border-r border-slate-200">序号</th>
                    <th className="py-2 px-4 border-r border-slate-200">名称</th>
                    <th className="py-2 px-4 border-r border-slate-200">规格型号</th>
                    <th className="py-2 px-4">单价 (元)</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map(i => (
                    <tr key={i} className="border-b border-slate-100">
                      <td className="py-2 px-4 border-r border-slate-100 text-center">{i}</td>
                      <td className="py-2 px-4 border-r border-slate-100">测试设备 {i}</td>
                      <td className="py-2 px-4 border-r border-slate-100">Model-X{i}00</td>
                      <td className={`py-2 px-4 text-right font-mono ${isDuplicate ? 'bg-red-50 text-red-700 font-bold' : ''}`}>
                        {(i * 1234.5).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfView;
