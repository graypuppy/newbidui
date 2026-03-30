import React, { useState, useRef, useMemo } from 'react';
import { 
  Image, 
  ScanText, 
  Table, 
  PenTool, 
  Quote, 
  ShieldAlert, 
  AlertTriangle, 
  Search,
  FileSearch,
  ChevronRight,
  ExternalLink,
  Grid3X3,
  BrainCircuit
} from 'lucide-react';
import { FileItem, PdfPreviewState } from '../../types';
import { generateMockSimilarityMatrix } from '../../data/mockData';

interface TechTabProps {
  comparingFiles: FileItem[];
  mockTechDetails: any;
  mockDuplicates: any[];
  setPdfPreviewState: (state: PdfPreviewState) => void;
  setActiveSensitiveLoc: (loc: number | null) => void;
  isExporting: boolean;
}

const TechTab: React.FC<TechTabProps> = ({
  comparingFiles,
  mockTechDetails,
  mockDuplicates,
  setPdfPreviewState,
  setActiveSensitiveLoc,
  isExporting,
}) => {
  const [techFileA, setTechFileA] = useState(comparingFiles[0]?.id || '');
  const [techFileB, setTechFileB] = useState(comparingFiles[1]?.id || '');
  const [activeDuplicateId, setActiveDuplicateId] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const textMatrix = useMemo(() => generateMockSimilarityMatrix(comparingFiles), [comparingFiles]);

  const pdfARef = useRef<HTMLDivElement>(null);
  const pdfBRef = useRef<HTMLDivElement>(null);

  const handleDuplicateClick = (dup: any) => {
    setActiveDuplicateId(dup.id);
    setTimeout(() => {
      if (pdfARef.current) {
        const el = pdfARef.current.querySelector(`[data-line="${dup.lineA}"]`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      if (pdfBRef.current) {
        const el = pdfBRef.current.querySelector(`[data-line="${dup.lineB}"]`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleMatrixCellClick = (fileAId: string, fileBId: string) => {
    if (fileAId === fileBId) return;
    setTechFileA(fileAId);
    setTechFileB(fileBId);
    setShowDetail(true);
    // Scroll to the comparison section
    setTimeout(() => {
      const comparisonSection = document.getElementById('text-comparison-section');
      if (comparisonSection) {
        comparisonSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleTechItemClick = (item: any) => {
    // If it's a risk item, open the PDF preview modal
    if (item.status === 'fail' || item.status === 'info' || item.status === 'pass') {
       const currentFileName = item.fileName || comparingFiles[0].name;
       
       // Mock finding duplicates
       let duplicates = undefined;
       if (item.status === 'fail') {
         // Find other files that are not the current one
         const otherFiles = comparingFiles.filter(f => f.name !== currentFileName);
         if (otherFiles.length > 0) {
           duplicates = [{
             fileName: otherFiles[0].name,
             value: item.name || item.keyword
           }];
         }
       }

       // Determine content type
       let contentType: 'text' | 'image' | 'table' | 'sensitive' = 'text';
       if (item.type === 'image' || item.type === 'ocr' || item.type === 'signature') {
         contentType = 'image';
       } else if (item.type === 'table') {
         contentType = 'table';
       } else if (item.type === 'sensitive') {
         contentType = 'sensitive';
       }

       if (contentType === 'sensitive') {
         setActiveSensitiveLoc(item.locations ? item.locations[0] : null);
       }

       setPdfPreviewState({
        isOpen: true,
        fileName: currentFileName,
        value: item.name || item.keyword,
        type: item.type === 'image' ? '图片查重' : item.type === 'ocr' ? 'OCR查重' : item.type === 'signature' ? '签章查重' : item.type === 'table' ? '表格查重' : item.type === 'sensitive' ? '敏感信息查重' : item.type,
        contentType: contentType,
        duplicates: duplicates,
        item: item
      });
    }
  };

  const renderMockPdfPage = (fileId: string, ref: any, isFileA: boolean) => {
    return (
      <div className="flex-1 bg-white overflow-y-auto shadow-inner p-8 text-sm leading-relaxed font-serif text-slate-700 relative border border-slate-200 rounded-b-lg" ref={ref}>
        {Array.from({ length: 120 }).map((_, i) => {
          const dup = mockDuplicates.find(d => (isFileA ? d.lineA : d.lineB) === i);
          const isActive = dup && activeDuplicateId === dup.id;

          return (
            <div 
              key={i} 
              data-line={i} 
              className={`py-1 px-2 rounded transition-colors relative z-1 ${
                isActive ? 'bg-red-200 text-red-900 font-medium shadow-sm' : 
                dup ? 'bg-red-50 text-red-800 cursor-pointer hover:bg-red-100' : ''
              }`}
              onClick={() => dup && handleDuplicateClick(dup)}
            >
              <span className="text-slate-300 mr-2 select-none text-xs w-6 inline-block text-right">{i + 1}</span>
              {dup ? dup.text : `第 ${i + 1} 行：本项目严格按照国家标准执行，确保工程质量和安全进度符合招标文件要求，特此声明...`}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {isExporting && <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 mt-8">技术标比对</h2>}
      
      {/* Section 1: Content Consistency Checks (Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { key: 'images', icon: Image, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-100' },
          { key: 'ocr', icon: ScanText, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
          { key: 'table', icon: Table, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
          { key: 'signature', icon: PenTool, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100' },
          { key: 'citation', icon: Quote, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
          { key: 'sensitive', icon: ShieldAlert, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' }
        ].map(({ key, icon: Icon, color, bg, border }) => {
          const section = mockTechDetails[key as keyof typeof mockTechDetails];
          if (!section) return null;
          const failCount = section.items.filter((i: any) => i.status === 'fail').length;
          
          return (
            <div key={key} className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full">
              <div className={`p-4 border-b border-slate-100 flex justify-between items-center ${bg} bg-opacity-30`}>
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg bg-white shadow-sm ${color}`}>
                    <Icon className="w-5 h-5"/>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{section.title}</h3>
                    <p className="text-xs text-slate-500">{section.desc}</p>
                  </div>
                </div>
                {failCount > 0 && (
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    {failCount} 处异常
                  </span>
                )}
              </div>
              <div className="p-4 space-y-3 flex-1">
                {section.items.map((item: any) => (
                  <div 
                    key={item.id || item.keyword} 
                    onClick={() => handleTechItemClick(item)}
                    className={`group p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md relative overflow-hidden ${
                      item.status === 'fail' ? 'border-red-200 bg-red-50/50 hover:bg-red-50' : 
                      item.status === 'info' ? 'border-amber-200 bg-amber-50/50 hover:bg-amber-50' :
                      'border-slate-100 bg-slate-50/50 hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start relative z-10">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-bold text-sm truncate ${item.status === 'fail' ? 'text-red-700' : 'text-slate-700'}`}>
                            {item.name || item.keyword}
                          </span>
                          {item.status === 'fail' && <AlertTriangle className="w-3 h-3 text-red-500" />}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2">{item.desc}</p>
                        {item.context && (
                          <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
                            <Search className="w-3 h-3" /> {item.context}
                          </div>
                        )}
                      </div>
                      <div className="ml-3 flex flex-col items-end gap-2">
                         {item.status === 'fail' ? (
                          <span className="text-[10px] font-bold text-red-600 bg-white px-2 py-1 rounded-full border border-red-100 shadow-sm">
                            查看比对
                          </span>
                        ) : (
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-full border shadow-sm bg-white ${
                            item.status === 'info' ? 'text-amber-600 border-amber-100' : 'text-emerald-600 border-emerald-100'
                          }`}>
                            {item.status === 'info' ? '关注' : '正常'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Section 2: Similarity Matrix */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
              <Grid3X3 className="w-5 h-5"/>
            </div>
            <div>
              <h3 className="font-bold text-slate-800">文本内容深度查重 (含AI语义分析) 横向比对矩阵</h3>
              <p className="text-xs text-slate-500">点击单元格查看两两比对详情</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-6 font-medium w-48 sticky left-0 bg-slate-50 z-10 border-r border-slate-200">文件名称</th>
                {comparingFiles.map(f => (
                  <th key={f.id} className="py-4 px-6 font-medium text-center min-w-[120px]">
                    {f.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {textMatrix.map((row) => (
                <tr key={row.fileId} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-200">
                    {row.fileName}
                  </td>
                  {comparingFiles.map(f => {
                    const score = row.scores[f.id];
                    const scoreVal = parseInt(score);
                    const isSelf = row.fileId === f.id;
                    const isSelected = !isSelf && showDetail && ((techFileA === row.fileId && techFileB === f.id) || (techFileA === f.id && techFileB === row.fileId));
                    
                    return (
                      <td 
                        key={f.id} 
                        onClick={() => !isSelf && handleMatrixCellClick(row.fileId, f.id)}
                        className={`py-6 px-4 text-center transition-all ${isSelf ? 'bg-slate-50 text-slate-300' : 'cursor-pointer hover:bg-indigo-50 group'} ${isSelected ? 'bg-indigo-50 ring-2 ring-inset ring-indigo-500' : ''}`}
                      >
                        {!isSelf ? (
                          <div className="flex flex-col items-center gap-1">
                            <div className={`text-lg font-black ${
                              scoreVal > 80 ? 'text-red-600' : 
                              scoreVal > 50 ? 'text-amber-600' : 
                              'text-emerald-600'
                            }`}>
                              {score}
                            </div>
                            <div className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                              点击查看详情
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs font-medium">/</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Integrated Detail Comparison Section */}
        {showDetail && (
          <div id="text-comparison-section" className="flex h-[600px] border-t border-slate-200 overflow-hidden flex-col bg-slate-50">
            <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileSearch className="w-5 h-5 text-emerald-500"/> 
                <h3 className="font-bold text-slate-800">
                  文本内容深度查重 (含AI语义分析) 详情比对
                </h3>
                <div className="flex items-center gap-2 ml-4 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 text-xs font-bold">
                  <span>{comparingFiles.find(f => f.id === techFileA)?.name}</span>
                  <ChevronRight className="w-3 h-3"/>
                  <span>{comparingFiles.find(f => f.id === techFileB)?.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-500">
                  发现 {mockDuplicates.length} 处高度相似段落
                </span>
                <button 
                  onClick={() => setShowDetail(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 font-medium"
                >
                  收起详情
                </button>
              </div>
            </div>
            <div className="flex-1 flex overflow-hidden">
              {/* Left: Duplicates List */}
              <div className="w-80 border-r border-slate-200 bg-white flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {mockDuplicates.map(dup => (
                    <button 
                      key={dup.id}
                      onClick={() => handleDuplicateClick(dup)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${activeDuplicateId === dup.id ? 'bg-indigo-50 border-indigo-300 shadow-sm ring-1 ring-indigo-500/20' : 'bg-white border-slate-200 hover:border-indigo-200 hover:shadow-sm'}`}
                    >
                      <div className="font-bold text-sm text-slate-800 mb-2">{dup.title}</div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500">相似度</span>
                        <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100">{dup.similarity}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: PDF Views */}
              <div className="flex-1 flex bg-slate-200 p-5 gap-5 overflow-hidden">
                {/* File A */}
                <div className="flex-1 flex flex-col shadow-sm rounded-lg overflow-hidden">
                  <div className="bg-white border-b border-slate-200 p-2 flex items-center">
                    <select 
                      value={techFileA} 
                      onChange={e => setTechFileA(e.target.value)}
                      className="w-full p-2 rounded bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    >
                      {comparingFiles.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                    </select>
                  </div>
                  {renderMockPdfPage(techFileA, pdfARef, true)}
                </div>
                
                {/* File B */}
                <div className="flex-1 flex flex-col shadow-sm rounded-lg overflow-hidden">
                  <div className="bg-white border-b border-slate-200 p-2 flex items-center">
                    <select 
                      value={techFileB} 
                      onChange={e => setTechFileB(e.target.value)}
                      className="w-full p-2 rounded bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    >
                      {comparingFiles.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                    </select>
                  </div>
                  {renderMockPdfPage(techFileB, pdfBRef, false)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechTab;
