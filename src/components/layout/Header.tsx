import React from 'react';
import { Bell, User, LogOut, FileSearch } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Notification, PageType } from '../../types';

interface HeaderProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  showNotifications: boolean;
  setShowNotifications: (val: boolean) => void;
  showUserMenu: boolean;
  setShowUserMenu: (val: boolean) => void;
  setShowLoginModal: (val: boolean) => void;
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  unreadCount: number;
  markAllAsRead: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  isLoggedIn,
  setIsLoggedIn,
  showNotifications,
  setShowNotifications,
  showUserMenu,
  setShowUserMenu,
  setShowLoginModal,
  notifications,
  setNotifications,
  unreadCount,
  markAllAsRead,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="bg-indigo-600 p-2 rounded-lg">
            <FileSearch className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">多版本文件比对系统</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <button className={`font-medium transition-colors ${currentPage === 'home' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`} onClick={() => setCurrentPage('home')}>首页</button>
          <button className={`font-medium transition-colors ${currentPage === 'history' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`} onClick={() => setCurrentPage('history')}>历史记录</button>
          <button className={`font-medium transition-colors ${currentPage === 'rules' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`} onClick={() => setCurrentPage('rules')}>规则配置</button>
        </nav>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              className="text-slate-400 hover:text-slate-600 transition-colors relative p-2"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="font-semibold text-slate-800">消息通知</h3>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        全部已读
                      </button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      <div className="divide-y divide-slate-100">
                        {notifications.map(notification => (
                          <div 
                            key={notification.id} 
                            className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer ${!notification.read ? 'bg-indigo-50/30' : ''}`}
                            onClick={() => {
                              setNotifications(notifications.map(n => 
                                n.id === notification.id ? { ...n, read: true } : n
                              ));
                            }}
                          >
                            <div className="flex gap-3">
                              <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${!notification.read ? 'bg-indigo-500' : 'bg-transparent'}`} />
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className={`text-sm font-medium ${!notification.read ? 'text-slate-900' : 'text-slate-700'}`}>
                                    {notification.title}
                                  </h4>
                                  <span className="text-xs text-slate-400 ml-2 whitespace-nowrap">{notification.time}</span>
                                </div>
                                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                  {notification.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-slate-500 text-sm">
                        暂无新消息
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t border-slate-100 text-center bg-slate-50/50">
                    <button className="text-sm text-slate-500 hover:text-slate-700 font-medium">
                      查看全部
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {isLoggedIn ? (
            <div className="flex items-center gap-3 relative">
              <button className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                我的订单
              </button>
              <div 
                className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 cursor-pointer hover:bg-indigo-200 transition-colors"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <User className="w-5 h-5" />
              </div>
              
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50"
                  >
                    <div className="p-2">
                      <button 
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                        onClick={() => {
                          setIsLoggedIn(false);
                          setShowUserMenu(false);
                        }}
                      >
                        <LogOut className="w-4 h-4" />
                        退出登录
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div 
              className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 cursor-pointer hover:bg-slate-300 transition-colors"
              onClick={() => setShowLoginModal(true)}
            >
              <User className="w-5 h-5" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
