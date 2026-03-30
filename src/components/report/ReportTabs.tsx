import React from 'react';

interface ReportTabsProps {
  reportTab: 'overview' | 'credit' | 'tech' | 'economic' | 'device';
  setReportTab: (tab: 'overview' | 'credit' | 'tech' | 'economic' | 'device') => void;
}

export default function ReportTabs({ reportTab, setReportTab }: ReportTabsProps) {
  return (
    <div className="flex gap-6 border-b border-slate-200 mb-6 overflow-x-auto hide-scrollbar" data-html2canvas-ignore="true">
      <button 
        className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${reportTab === 'overview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        onClick={() => setReportTab('overview')}
      >
        结果概览
      </button>
      <button 
        className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${reportTab === 'credit' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        onClick={() => setReportTab('credit')}
      >
        资信标比对
      </button>
      <button 
        className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${reportTab === 'tech' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        onClick={() => setReportTab('tech')}
      >
        技术标比对
      </button>
      <button 
        className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${reportTab === 'economic' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        onClick={() => setReportTab('economic')}
      >
        经济标比对
      </button>
      <button 
        className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${reportTab === 'device' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        onClick={() => setReportTab('device')}
      >
        文件设备特征比对
      </button>
    </div>
  );
}
