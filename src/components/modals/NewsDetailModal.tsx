import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Tag } from 'lucide-react';

interface NewsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: {
    id: number;
    title: string;
    date: string;
    type: string;
    content: string;
  } | null;
}

const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ isOpen, onClose, news }) => {
  if (!news) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                  news.type === '公告' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                  news.type === '更新' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                  news.type === '指南' ? 'bg-indigo-50 text-indigo-600 border-indigo-200' :
                  'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                  {news.type}
                </span>
                <h2 className="text-sm font-bold text-slate-800">资讯详情</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto">
              <h1 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                {news.title}
              </h1>
              
              <div className="flex items-center gap-6 mb-8 text-sm text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>发布时间：{news.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4" />
                  <span>类别：{news.type}</span>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
                  {news.content}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
              >
                我知道了
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewsDetailModal;
