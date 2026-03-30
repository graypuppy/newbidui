import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Layers, ShieldCheck, Users, Zap, ChevronDown } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white w-[800px] h-[500px] rounded-xl shadow-2xl overflow-hidden flex animate-in fade-in zoom-in-95 duration-200">
            {/* Left Side - Blue */}
            <div className="w-[360px] bg-blue-600 p-10 text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-12">
                  <div className="bg-white p-2 rounded-lg">
                    <Layers className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="font-bold text-xl">SaaS 业务平台</span>
                </div>
                
                <h2 className="text-3xl font-bold mb-12">上云即享超值福利</h2>
                
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="bg-blue-500/50 p-2.5 rounded-lg h-fit">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">首购享特惠</h4>
                      <p className="text-blue-100 text-sm leading-relaxed">丰富云产品即刻体验，极致的性能，首购低至1元</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-blue-500/50 p-2.5 rounded-lg h-fit">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">全链路支撑</h4>
                      <p className="text-blue-100 text-sm leading-relaxed">全方位产品矩阵与丰富解决方案，助力业务增长闭环</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-blue-500/50 p-2.5 rounded-lg h-fit">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">优质的服务</h4>
                      <p className="text-blue-100 text-sm leading-relaxed">提供专业的方案定制与技术支持，7x24小时全天候客服</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Login Form */}
            <div className="flex-1 p-12 relative flex flex-col">
              <button 
                onClick={onClose} 
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-8 mt-4">欢迎来到 SaaS 业务平台</h3>
              
              <div className="flex gap-6 border-b border-slate-200 mb-8">
                <button className="pb-3 text-slate-500 font-medium hover:text-slate-800 transition-colors">账号登录</button>
                <button className="pb-3 text-blue-600 font-medium border-b-2 border-blue-600">手机号登录</button>
                <button className="pb-3 text-slate-500 font-medium hover:text-slate-800 transition-colors">标证通扫码</button>
              </div>
              
              <div className="space-y-5">
                <div className="flex border border-slate-300 rounded-md overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <div className="bg-slate-50 px-4 py-3 border-r border-slate-300 text-slate-600 flex items-center gap-1">
                    +86 <ChevronDown className="w-4 h-4 ml-1" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="请输入手机号码 (测试: 13800138000)" 
                    className="flex-1 px-4 py-3 outline-none text-slate-800 placeholder:text-slate-400"
                  />
                </div>
                
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    placeholder="请输入验证码 (测试: 1234)" 
                    className="flex-1 border border-slate-300 rounded-md px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-800 placeholder:text-slate-400"
                  />
                  <button className="bg-slate-100 text-slate-600 px-4 py-3 rounded-md font-medium hover:bg-slate-200 transition-colors whitespace-nowrap">
                    获取验证码(38s)
                  </button>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" id="terms" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="terms" className="text-sm text-slate-500">
                    登录视为您已阅读并同意 <a href="#" className="text-blue-600 hover:underline">服务条款</a> 和 <a href="#" className="text-blue-600 hover:underline">隐私政策</a>
                  </label>
                </div>
                
                <button 
                  onClick={onLogin}
                  className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition-colors mt-2"
                >
                  登录 / 注册
                </button>
              </div>
              
              <div className="mt-auto pt-8 flex justify-center items-center gap-3 text-sm text-blue-600">
                <a href="#" className="hover:underline">个人账户登录</a>
                <span className="text-slate-300">|</span>
                <a href="#" className="text-slate-500 hover:text-slate-700 transition-colors">企业账户登录</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
