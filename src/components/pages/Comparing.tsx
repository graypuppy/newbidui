import React from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  Loader2, 
  FileText, 
  CheckCircle2, 
  Circle 
} from 'lucide-react';
import { FileItem } from '../../types';

interface ComparingProps {
  comparingProgress: {
    currentTypeIndex: number;
    currentItemIndex: number;
    completedItems: string[];
    isFinished: boolean;
  };
  files: FileItem[];
  getTasks: () => { type: string; items: string[] }[];
  compareLogs: { id: number; time: string; text: string; type: string }[];
  logsEndRef: React.RefObject<HTMLDivElement | null>;
}

const Comparing: React.FC<ComparingProps> = ({
  comparingProgress,
  files,
  getTasks,
  compareLogs,
  logsEndRef,
}) => {
  return (
    <motion.div
      key="comparing"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-[1600px] mx-auto py-8 px-4"
    >
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-8 text-center border-b border-slate-100 bg-slate-50 relative overflow-hidden">
          {!comparingProgress.isFinished && (
            <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              <motion.div 
                className="absolute top-0 left-0 right-0 h-1 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
              />
            </div>
          )}
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4 shadow-inner">
              {comparingProgress.isFinished ? <Check className="w-8 h-8" /> : <Loader2 className="w-8 h-8 animate-spin" />}
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              {comparingProgress.isFinished ? '比对完成' : '正在进行多版本文件深度比对...'}
            </h2>
            <p className="text-slate-500 mt-2">
              {comparingProgress.isFinished ? '已完成所有检查项，发现潜在风险点。' : 'AI 引擎正在进行交叉比对与特征提取，请耐心等待。'}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row border-b border-slate-100">
          {/* Left: Files */}
          <div className="lg:w-1/3 p-6 border-r border-slate-100 bg-slate-50/50">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" />
              参与比对文件 ({files?.filter(f => f.status === '比对中' || f.status === '已完成')?.length || 0})
            </h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {files?.filter(f => f.status === '比对中' || f.status === '已完成').map(f => (
                <div key={f.id} className="p-3 bg-white border border-slate-200 rounded-lg flex items-center gap-3 relative overflow-hidden shadow-sm">
                  {!comparingProgress.isFinished && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent w-[200%]" 
                      animate={{ x: ['-100%', '100%'] }} 
                      transition={{ repeat: Infinity, duration: 2 + Math.random(), ease: "linear", delay: Math.random() }} 
                    />
                  )}
                  <div className="p-2 bg-indigo-50 rounded text-indigo-600 shrink-0 relative z-10">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 truncate relative z-10" title={f.name}>{f.name}</span>
                  {comparingProgress.isFinished && <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto shrink-0 relative z-10" />}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Check Items */}
          <div className="lg:w-2/3 p-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              检测点进度
            </h3>
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
              {getTasks().map((taskGroup, tIdx) => {
                const isGroupActive = tIdx === comparingProgress.currentTypeIndex && !comparingProgress.isFinished;
                const isGroupDone = tIdx < comparingProgress.currentTypeIndex || comparingProgress.isFinished;
                const isGroupPending = tIdx > comparingProgress.currentTypeIndex;

                return (
                  <div key={taskGroup.type} className={`transition-opacity duration-500 ${isGroupPending ? 'opacity-40' : 'opacity-100'}`}>
                    <h4 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-3">
                      {isGroupDone ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : 
                       isGroupActive ? <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" /> : 
                       <Circle className="w-4 h-4 text-slate-300" />}
                      {taskGroup.type}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pl-6">
                      {taskGroup.items.map((item, iIdx) => {
                        const itemKey = `${taskGroup.type}-${item}`;
                        const isItemDone = comparingProgress.completedItems.includes(itemKey);
                        const isItemActive = isGroupActive && iIdx === comparingProgress.currentItemIndex;
                        
                        return (
                          <div key={item} className={`flex items-center gap-2 p-2 rounded-md text-xs transition-colors duration-300 ${
                            isItemDone ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                            isItemActive ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm' :
                            'bg-slate-50 text-slate-500 border border-slate-100'
                          }`}>
                            {isItemDone ? <Check className="w-3 h-3" /> : 
                             isItemActive ? <Loader2 className="w-3 h-3 animate-spin" /> : 
                             <div className="w-3 h-3 rounded-full border-2 border-slate-200" />}
                            <span className="truncate" title={item}>{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom: Terminal Logs */}
        <div className="bg-slate-900 p-4 h-48 overflow-y-auto font-mono text-xs text-emerald-400 flex flex-col gap-1.5 rounded-b-2xl">
          {compareLogs.map(log => (
            <div key={log.id} className={`${log.type === 'success' ? 'text-emerald-300 font-bold' : log.type === 'warning' ? 'text-amber-400' : 'text-emerald-500/80'}`}>
              <span className="text-slate-500 mr-2">[{log.time}]</span>
              {log.text}
            </div>
          ))}
          <div ref={logsEndRef} />
        </div>
      </div>
    </motion.div>
  );
};

export default Comparing;
