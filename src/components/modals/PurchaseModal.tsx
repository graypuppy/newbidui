import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ChevronRight } from 'lucide-react';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSku: 'month' | 'once';
  setSelectedSku: (sku: 'month' | 'once') => void;
  onPaymentSuccess: () => void;
}

export default function PurchaseModal({ isOpen, onClose, selectedSku, setSelectedSku, onPaymentSuccess }: PurchaseModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white w-[800px] rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-lg font-medium text-slate-800">充值</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 bg-[#F5F8FF] flex-1">
              {/* Blue Bar */}
              <div className="bg-[#6B9DF8] text-white px-4 py-2.5 rounded-t-lg flex justify-between items-center">
                <span className="font-medium">请选择购买方案</span>
                <div className="text-sm opacity-90 space-x-3">
                  <a href="#" className="hover:underline">对公转账</a>
                  <span>|</span>
                  <a href="#" className="hover:underline">充值记录</a>
                  <span>|</span>
                  <a href="#" className="hover:underline">优惠券</a>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-b-lg border border-t-0 border-slate-200 shadow-sm space-y-6">
                {/* Product Info */}
                <div className="flex items-start gap-4">
                  <span className="text-slate-600 mt-1 whitespace-nowrap">购买商品：</span>
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-serif text-2xl font-bold">
                      T
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">多版本文件比对-高级套餐</h4>
                      <p className="text-sm text-slate-500 mt-1">支持资信标、技术标、经济标及底层设备特征的深度比对分析</p>
                    </div>
                  </div>
                </div>
                
                {/* SKUs */}
                <div className="flex items-start gap-4">
                  <span className="text-slate-600 mt-2 whitespace-nowrap">选择套餐：</span>
                  <div className="flex gap-4 flex-1">
                    {/* Month SKU */}
                    <div 
                      className={`relative flex-1 border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedSku === 'month' ? 'border-blue-600 bg-blue-50/30' : 'border-slate-200 hover:border-blue-300'}`}
                      onClick={() => setSelectedSku('month')}
                    >
                      {selectedSku === 'month' && (
                        <div className="absolute top-0 right-0 bg-blue-600 text-white rounded-bl-lg rounded-tr-sm p-0.5">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                      <div className="font-bold text-lg text-slate-800">包月套餐</div>
                      <div className="text-xs text-slate-500 mt-1">30天内不限次比对</div>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-blue-600">¥299</span>
                        <span className="text-sm text-slate-400 line-through">¥399</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">约9.9元/天</div>
                    </div>
                    
                    {/* Once SKU */}
                    <div 
                      className={`relative flex-1 border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedSku === 'once' ? 'border-blue-600 bg-blue-50/30' : 'border-slate-200 hover:border-blue-300'}`}
                      onClick={() => setSelectedSku('once')}
                    >
                      {selectedSku === 'once' && (
                        <div className="absolute top-0 right-0 bg-blue-600 text-white rounded-bl-lg rounded-tr-sm p-0.5">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                      <div className="font-bold text-lg text-slate-800">单次套餐</div>
                      <div className="text-xs text-slate-500 mt-1">单次项目比对</div>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-blue-600">¥20</span>
                        <span className="text-sm text-slate-400 line-through">¥30</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">20元/次</div>
                    </div>
                  </div>
                </div>
                
                {/* Promo */}
                <div className="flex items-center gap-4">
                  <span className="text-slate-600 whitespace-nowrap">使用优惠：</span>
                  <select className="border border-slate-300 rounded px-3 py-1.5 text-sm w-48 outline-none focus:border-blue-500">
                    <option>暂无优惠券</option>
                  </select>
                  <a href="#" className="text-blue-600 text-sm hover:underline ml-2">输入优惠码</a>
                </div>
              </div>
              
              {/* Payment Area */}
              <div className="bg-white mt-4 p-6 rounded-lg border border-slate-200 shadow-sm flex justify-between items-center">
                <div className="flex gap-6 items-center">
                  {/* QR Code Placeholder */}
                  <div className="w-32 h-32 border border-slate-200 rounded p-1 relative group bg-white">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=simulate_payment" alt="QR Code" className="w-full h-full opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/80">
                      <button onClick={onPaymentSuccess} className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded shadow-sm hover:bg-blue-700">
                        模拟支付成功
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-600 flex items-baseline gap-2">
                      需支付: <span className="text-3xl font-bold text-[#D97706]">¥{selectedSku === 'month' ? '299' : '20'}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-sm text-slate-700">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      微信支付
                    </div>
                  </div>
                </div>
                <a href="#" className="text-slate-500 text-sm hover:text-slate-800 flex items-center">
                  我要对公转账 <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              
              <div className="mt-4 text-xs text-slate-400 text-center">
                支付即代表你同意 <a href="#" className="text-blue-500 hover:underline">《用户协议》</a> 及 <a href="#" className="text-blue-500 hover:underline">《隐私协议》</a> ，购买后不支持7天无理由退货
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
