import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  UploadCloud, 
  CheckCircle2, 
  ChevronRight, 
  History, 
  Bell, 
  AlertCircle, 
  Lock, 
  Loader2 
} from 'lucide-react';
import { FileItem, PageType } from '../../types';
import { INSPECTION_POINTS, NEWS_ITEMS } from '../../constants';
import NewsDetailModal from '../modals/NewsDetailModal';

interface HomeProps {
  isLoggedIn: boolean;
  setShowLoginModal: (val: boolean) => void;
  setCurrentPage: (page: PageType) => void;
  isDragging: boolean;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  processFiles: (files: File[]) => void;
  errorMsg: string | null;
  historyItems: any[];
  formatSize: (size: number) => string;
}

const Home: React.FC<HomeProps> = ({
  isLoggedIn,
  setShowLoginModal,
  setCurrentPage,
  isDragging,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleFileInput,
  processFiles,
  errorMsg,
  historyItems,
  formatSize,
}) => {
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);

  const handleNewsClick = (news: any) => {
    setSelectedNews(news);
    setIsNewsModalOpen(true);
  };

  return (
    <motion.div 
      key="home"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      {/* Hero / Upload Section */}
      <section>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">新建比对任务</h1>
          <p className="text-slate-500 mt-1">上传多个版本的文件，系统将自动进行深度重复性分析。</p>
        </div>
        
        <div 
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ease-in-out ${
            isDragging ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-300 bg-white hover:border-indigo-400 hover:bg-slate-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <UploadCloud className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">点击或拖拽文件到此处上传</h3>
          <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
            支持 .doc, .docx, .pdf, 清单文件, 非加密投标文件。最多支持上传 8 个文件，总大小不超过 500MB。
          </p>
          <div className="flex items-center justify-center gap-4">
            <label className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer">
              选择文件
              <input type="file" multiple className="hidden" onChange={handleFileInput} accept=".doc,.docx,.pdf,.xls,.xlsx,.xml" />
            </label>
            <button className="bg-white border border-slate-300 text-slate-700 px-6 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm">
              导入项目文件夹
            </button>
            <button 
              onClick={() => {
                const testFiles = [
                  { name: '中建一局-非加密投标文件.gef', size: 1024 * 1024 * 15 },
                  { name: '中建二局-非加密投标文件.gef', size: 1024 * 1024 * 14 },
                  { name: '中建三局-非加密投标文件.gef', size: 1024 * 1024 * 16 },
                  { name: '中建四局-非加密投标文件.gef', size: 1024 * 1024 * 12 },
                  { name: '中建五局-非加密投标文件.gef', size: 1024 * 1024 * 18 },
                  { name: '中建六局-非加密投标文件.gef', size: 1024 * 1024 * 13 },
                  { name: '中建七局-非加密投标文件.gef', size: 1024 * 1024 * 15 },
                  { name: '中建八局-非加密投标文件.gef', size: 1024 * 1024 * 17 }
                ];
                const mockFileList = testFiles.map(f => new window.File([new ArrayBuffer(f.size)], f.name, { type: 'application/octet-stream' }));
                processFiles(mockFileList);
              }}
              className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-100 transition-colors shadow-sm"
            >
              加载测试文件
            </button>
          </div>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{errorMsg}</p>
          </motion.div>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: History */}
        <div className="lg:col-span-2 space-y-8">
          {/* Inspection Points Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                系统检查点
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INSPECTION_POINTS.map((point) => (
                <div key={point.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-white group-hover:shadow-inner transition-colors">
                      {point.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 mb-1">{point.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* History Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <History className="w-5 h-5 text-slate-500" />
                历史检查项目
              </h2>
              {isLoggedIn && (
                <button 
                  onClick={() => setCurrentPage('history')}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center"
                >
                  查看更多 <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              {!isLoggedIn ? (
                <div className="p-8 text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Lock className="w-6 h-6 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">登录后查看</h3>
                  <p className="text-xs text-slate-500 mb-4">登录账号，查看最近的比对记录。</p>
                  <button onClick={() => setShowLoginModal(true)} className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-indigo-100 transition-colors">
                    登录
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-500">
                        <th className="py-3 px-4 font-medium whitespace-nowrap">项目编号/名称</th>
                        <th className="py-3 px-4 font-medium whitespace-nowrap">检查时间</th>
                        <th className="py-3 px-4 font-medium whitespace-nowrap">文件数</th>
                        <th className="py-3 px-4 font-medium whitespace-nowrap">风险评估</th>
                        <th className="py-3 px-4 font-medium whitespace-nowrap">状态</th>
                        <th className="py-3 px-4 font-medium text-right whitespace-nowrap">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {historyItems.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-4 min-w-[200px]">
                            <div className="font-medium text-slate-800">{item.name}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{item.id}</div>
                          </td>
                          <td className="py-3 px-4 text-sm text-slate-600 whitespace-nowrap">{item.date}</td>
                          <td className="py-3 px-4 text-sm text-slate-600 whitespace-nowrap">{item.files} 份</td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                              item.risk === '-' ? 'bg-slate-50 text-slate-500 border border-slate-200' :
                              item.risk === '高风险' ? 'bg-red-50 text-red-700 border border-red-200' :
                              item.risk === '中风险' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                              'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}>
                              {item.risk}
                            </span>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                              item.status === '检查中' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                              item.status === '已完成' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              'bg-slate-50 text-slate-700 border border-slate-200'
                            }`}>
                              {item.status === '检查中' && <Loader2 className="w-3 h-3 animate-spin mr-1" />}
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <button 
                              onClick={() => setCurrentPage('report')}
                              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                            >
                              查看报告
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: News & Announcements */}
        <div className="space-y-6">
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-indigo-500" />
                系统公告与指南
              </h2>
            </div>
            <div className="space-y-4">
              {NEWS_ITEMS.map((news) => (
                <button 
                  key={news.id} 
                  onClick={() => handleNewsClick(news)}
                  className="w-full text-left block group"
                >
                  <div className="flex items-start gap-3">
                    <span className={`shrink-0 mt-0.5 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${
                      news.type === '公告' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                      news.type === '更新' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                      news.type === '指南' ? 'bg-indigo-50 text-indigo-600 border-indigo-200' :
                      'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {news.type}
                    </span>
                    <div>
                      <h4 className="text-sm font-medium text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                        {news.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1.5">{news.date}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage('news')}
              className="w-full mt-5 py-2 text-sm text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors font-medium"
            >
              查看更多资讯
            </button>
          </section>

          {/* Quick Stats or Info Card */}
          <section className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-xl shadow-md p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
            <div className="relative z-10">
              <h3 className="font-semibold text-lg mb-2">本月比对统计</h3>
              {!isLoggedIn ? (
                <div className="mt-4 flex flex-col items-start">
                  <p className="text-indigo-100 text-sm mb-3">登录后查看您的专属统计数据</p>
                  <button onClick={() => setShowLoginModal(true)} className="bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors backdrop-blur-sm">
                    立即登录
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-indigo-100 text-sm">累计比对文件</p>
                    <p className="text-3xl font-bold mt-1">1,284</p>
                  </div>
                  <div>
                    <p className="text-indigo-100 text-sm">发现差异项目</p>
                    <p className="text-3xl font-bold mt-1">12</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      <NewsDetailModal 
        isOpen={isNewsModalOpen} 
        onClose={() => setIsNewsModalOpen(false)} 
        news={selectedNews} 
      />
    </motion.div>
  );
};

export default Home;
