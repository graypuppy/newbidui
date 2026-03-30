import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Clock, FileSearch, Fingerprint, Cpu } from 'lucide-react';
import { ALL_CHECK_TYPES, ALL_CREDIT_ITEMS, ALL_TECH_ITEMS, ALL_ECONOMIC_ITEMS, ALL_DEVICE_ITEMS } from '../../constants';

interface TemplateEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingTemplate: any;
  setEditingTemplate: (tpl: any) => void;
  onSave: () => void;
  templates: any[];
}

export default function TemplateEditorModal({ 
  isOpen, 
  onClose, 
  editingTemplate, 
  setEditingTemplate, 
  onSave,
  templates
}: TemplateEditorModalProps) {
  if (!isOpen || !editingTemplate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800">
            {templates.some(t => t.id === editingTemplate.id) ? '编辑模板' : '新建模板'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">模板名称</label>
              <input 
                type="text" 
                value={editingTemplate.name}
                onChange={e => setEditingTemplate({...editingTemplate, name: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                placeholder="请输入模板名称"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">模板描述</label>
              <textarea 
                value={editingTemplate.desc}
                onChange={e => setEditingTemplate({...editingTemplate, desc: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none h-20 resize-none"
                placeholder="请输入模板描述"
              />
            </div>
          </div>

          {/* Check Types */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">包含检查项</label>
            <div className="flex flex-wrap gap-3">
              {ALL_CHECK_TYPES.map(type => (
                <label key={type} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${
                  editingTemplate.config.types.includes(type) 
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={editingTemplate.config.types.includes(type)}
                    onChange={() => {
                      const newTypes = editingTemplate.config.types.includes(type)
                        ? editingTemplate.config.types.filter((t: string) => t !== type)
                        : [...editingTemplate.config.types, type];
                      setEditingTemplate({
                        ...editingTemplate,
                        config: { ...editingTemplate.config, types: newTypes }
                      });
                    }}
                  />
                  <span className="text-sm font-medium">{type}</span>
                  {editingTemplate.config.types.includes(type) && <Check className="w-4 h-4" />}
                </label>
              ))}
            </div>
          </div>

          {/* Detailed Check Items */}
          {editingTemplate.config.types.length > 0 && (
            <div className="space-y-4 border-t border-slate-100 pt-4">
              <label className="block text-sm font-medium text-slate-700">具体检查点配置</label>
              
              {editingTemplate.config.types.includes('资信标比对') && (
                <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Clock className="w-3 h-3" /> 资信标检查点
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ALL_CREDIT_ITEMS.map(item => (
                      <label key={item} className={`text-xs px-2 py-1 rounded border cursor-pointer transition-colors ${
                        editingTemplate.config.credit.includes(item)
                          ? 'bg-blue-100 border-blue-200 text-blue-700'
                          : 'bg-white border-slate-200 text-slate-500 hover:border-blue-200'
                      }`}>
                        <input 
                          type="checkbox" 
                          className="hidden"
                          checked={editingTemplate.config.credit.includes(item)}
                          onChange={() => {
                            const newItems = editingTemplate.config.credit.includes(item)
                              ? editingTemplate.config.credit.filter((i: string) => i !== item)
                              : [...editingTemplate.config.credit, item];
                            setEditingTemplate({
                              ...editingTemplate,
                              config: { ...editingTemplate.config, credit: newItems }
                            });
                          }}
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {editingTemplate.config.types.includes('技术标比对') && (
                <div className="bg-emerald-50/50 rounded-lg p-4 border border-emerald-100">
                  <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <FileSearch className="w-3 h-3" /> 技术标检查点
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ALL_TECH_ITEMS.map(item => (
                      <label key={item} className={`text-xs px-2 py-1 rounded border cursor-pointer transition-colors ${
                        editingTemplate.config.tech.includes(item)
                          ? 'bg-emerald-100 border-emerald-200 text-emerald-700'
                          : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-200'
                      }`}>
                        <input 
                          type="checkbox" 
                          className="hidden"
                          checked={editingTemplate.config.tech.includes(item)}
                          onChange={() => {
                            const newItems = editingTemplate.config.tech.includes(item)
                              ? editingTemplate.config.tech.filter((i: string) => i !== item)
                              : [...editingTemplate.config.tech, item];
                            setEditingTemplate({
                              ...editingTemplate,
                              config: { ...editingTemplate.config, tech: newItems }
                            });
                          }}
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {editingTemplate.config.types.includes('经济标比对') && (
                <div className="bg-amber-50/50 rounded-lg p-4 border border-amber-100">
                  <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Fingerprint className="w-3 h-3" /> 经济标检查点
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ALL_ECONOMIC_ITEMS.map(item => (
                      <label key={item} className={`text-xs px-2 py-1 rounded border cursor-pointer transition-colors ${
                        editingTemplate.config.economic.includes(item)
                          ? 'bg-amber-100 border-amber-200 text-amber-700'
                          : 'bg-white border-slate-200 text-slate-500 hover:border-amber-200'
                      }`}>
                        <input 
                          type="checkbox" 
                          className="hidden"
                          checked={editingTemplate.config.economic.includes(item)}
                          onChange={() => {
                            const newItems = editingTemplate.config.economic.includes(item)
                              ? editingTemplate.config.economic.filter((i: string) => i !== item)
                              : [...editingTemplate.config.economic, item];
                            setEditingTemplate({
                              ...editingTemplate,
                              config: { ...editingTemplate.config, economic: newItems }
                            });
                          }}
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {editingTemplate.config.types.includes('文件设备特征比对') && (
                <div className="bg-purple-50/50 rounded-lg p-4 border border-purple-100">
                  <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Cpu className="w-3 h-3" /> 设备特征检查点
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ALL_DEVICE_ITEMS.map(item => (
                      <label key={item} className={`text-xs px-2 py-1 rounded border cursor-pointer transition-colors ${
                        editingTemplate.config.device.includes(item)
                          ? 'bg-purple-100 border-purple-200 text-purple-700'
                          : 'bg-white border-slate-200 text-slate-500 hover:border-purple-200'
                      }`}>
                        <input 
                          type="checkbox" 
                          className="hidden"
                          checked={editingTemplate.config.device.includes(item)}
                          onChange={() => {
                            const newItems = editingTemplate.config.device.includes(item)
                              ? editingTemplate.config.device.filter((i: string) => i !== item)
                              : [...editingTemplate.config.device, item];
                            setEditingTemplate({
                              ...editingTemplate,
                              config: { ...editingTemplate.config, device: newItems }
                            });
                          }}
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Threshold & AI */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                相似度阈值 ({editingTemplate.config.threshold}%)
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="5"
                value={editingTemplate.config.threshold}
                onChange={e => setEditingTemplate({
                  ...editingTemplate,
                  config: { ...editingTemplate.config, threshold: parseInt(e.target.value) }
                })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>宽松 (0%)</span>
                <span>严格 (100%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <div className="font-medium text-slate-700">AI 深度分析</div>
                <div className="text-xs text-slate-500">启用大模型进行语义理解</div>
              </div>
              <button 
                onClick={() => setEditingTemplate({
                  ...editingTemplate,
                  config: { ...editingTemplate.config, enableAI: !editingTemplate.config.enableAI }
                })}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  editingTemplate.config.enableAI ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
              >
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                  editingTemplate.config.enableAI ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg font-medium transition-colors"
          >
            取消
          </button>
          <button 
            onClick={onSave}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-sm transition-colors"
          >
            保存配置
          </button>
        </div>
      </div>
    </div>
  );
}
