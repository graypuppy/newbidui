import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Calendar, 
  Tag, 
  ChevronRight,
  Newspaper,
  Info,
  Zap,
  BookOpen
} from 'lucide-react';
import { NEWS_ITEMS } from '../../constants';
import NewsDetailModal from '../modals/NewsDetailModal';

interface NewsProps {
  setCurrentPage: (page: any) => void;
}

const News: React.FC<NewsProps> = ({ setCurrentPage }) => {
  const [filter, setFilter] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['全部', '公告', '更新', '指南', '案例'];

  const filteredNews = NEWS_ITEMS.filter(item => {
    const matchesFilter = filter === '全部' || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleNewsClick = (news: any) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case '公告': return <Info className="w-4 h-4 text-blue-500" />;
      case '更新': return <Zap className="w-4 h-4 text-emerald-500" />;
      case '指南': return <BookOpen className="w-4 h-4 text-indigo-500" />;
      case '案例': return <Newspaper className="w-4 h-4 text-amber-500" />;
      default: return <Tag className="w-4 h-4 text-slate-500" />;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case '公告': return 'bg-blue-50 text-blue-600 border-blue-100';
      case '更新': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case '指南': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case '案例': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-2 group"
          >
            <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            返回首页
          </button>
          <h1 className="text-3xl font-bold text-slate-900">资讯中心</h1>
          <p className="text-slate-500 mt-1">获取最新的系统动态、操作指南及行业案例。</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索资讯内容..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full md:w-64"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
        <div className="flex items-center gap-2 px-1">
          <Filter className="w-4 h-4 text-slate-400 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                filter === cat 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredNews.length > 0 ? (
          filteredNews.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleNewsClick(news)}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-200 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/30 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${getTypeStyles(news.type)}`}>
                      {getIcon(news.type)}
                      {news.type}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {news.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                    {news.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                    {news.content}
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">未找到相关资讯</h3>
            <p className="text-slate-500 mt-1">尝试更换搜索关键词或筛选条件</p>
            <button 
              onClick={() => {setFilter('全部'); setSearchQuery('');}}
              className="mt-6 text-indigo-600 font-medium hover:underline"
            >
              重置所有筛选
            </button>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-12 text-center border-t border-slate-200 pt-8">
        <p className="text-slate-400 text-sm">
          没有更多资讯了。关注我们的公众号获取实时推送。
        </p>
      </div>

      <NewsDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        news={selectedNews} 
      />
    </motion.div>
  );
};

export default News;
