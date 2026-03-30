import React from 'react';
import { motion } from 'motion/react';
import { Settings, Plus, Lock } from 'lucide-react';
import { Template } from '../../types';

interface RulesProps {
  isLoggedIn: boolean;
  setShowLoginModal: (val: boolean) => void;
  templates: Template[];
  handleNewTemplate: () => void;
  handleEditTemplate: (tpl: Template) => void;
  handleDeleteTemplate: (id: string) => void;
}

const Rules: React.FC<RulesProps> = ({
  isLoggedIn,
  setShowLoginModal,
  templates,
  handleNewTemplate,
  handleEditTemplate,
  handleDeleteTemplate,
}) => {
  return (
    <motion.div
      key="rules"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-[1200px] mx-auto py-8 px-4"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Settings className="w-6 h-6 text-indigo-600" />
            规则模板配置
          </h1>
          <p className="text-slate-500 mt-1">管理和预设比对规则模板，以便在创建项目时快速应用。</p>
        </div>
        {isLoggedIn && (
          <button 
            onClick={handleNewTemplate}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            新建模板
          </button>
        )}
      </div>

      {!isLoggedIn ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">登录后配置规则</h3>
          <p className="text-slate-500 mb-6">登录账号，创建和管理您的自定义比对规则模板。</p>
          <button onClick={() => setShowLoginModal(true)} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            立即登录
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map(tpl => (
            <div key={tpl.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-800 text-lg">{tpl.name}</h3>
                  {tpl.id === 'tpl-1' && (
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded whitespace-nowrap">默认</span>
                  )}
                </div>
                <p className="text-sm text-slate-500 line-clamp-2">{tpl.desc}</p>
              </div>
              <div className="p-5 flex-1">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">包含检查项</h4>
                <div className="flex flex-wrap gap-2">
                  {tpl.config.types.map(type => (
                    <span key={type} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md border border-slate-200">
                      {type}
                    </span>
                  ))}
                  {tpl.config.types.length === 0 && (
                    <span className="text-sm text-slate-400 italic">未选择任何检查项</span>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">相似度阈值</div>
                    <div className="font-medium text-slate-700">{tpl.config.threshold}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">AI 深度分析</div>
                    <div className="font-medium text-slate-700">{tpl.config.enableAI ? '已开启' : '未开启'}</div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <button onClick={(e) => { e.stopPropagation(); handleEditTemplate(tpl); }} className="text-sm text-slate-600 hover:text-indigo-600 font-medium transition-colors">编辑</button>
                {tpl.id !== 'tpl-1' && (
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteTemplate(tpl.id); }} className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors">删除</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Rules;
