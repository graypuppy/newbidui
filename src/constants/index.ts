import React from 'react';
import { Clock, FileSearch, Fingerprint, Cpu } from 'lucide-react';
import { Template } from '../types';

export const ALL_CHECK_TYPES = ['资信标比对', '技术标比对', '经济标比对', '文件设备特征比对'];
export const ALL_CREDIT_ITEMS = ['法定代表人名称比对', '法定代表人身份证比对', '人员名称比对', '人员身份证比对', '手机号比对', '邮箱比对', '证书编号比对', '业绩名称比对', '地址比对', '统一社会信用代码比对', '签章查重', '引用内容查重'];
export const ALL_TECH_ITEMS = ['全文语句雷同比对', '图片查重', '图片文字OCR查重', '表格文字查重', '敏感信息查重'];
export const ALL_ECONOMIC_ITEMS = ['项目属性分析（软硬件信息）', '错误一致性分析', '清单报价分析', '定额子目分析', '项目人材机汇总分析'];
export const ALL_DEVICE_ITEMS = ['文件属性查重', '计算机名比对', '计算机用户名比对', '文件操作来源比对', '文件创建码比对', 'MAC地址比对', 'CPU序列号比对', '文件生成锁号比对', '硬盘序列号比对', '主板序列号比对', '机器特征码比对'];

export const INSPECTION_POINTS = [
  { id: 1, title: '资信标比对', desc: '深度比对法定代表人、人员名称、身份证、手机号、邮箱、证书编号、业绩名称、地址、统一社会信用代码、签章及引用内容等关键资信信息。', icon: React.createElement(Clock, { className: "w-6 h-6 text-blue-500" }) },
  { id: 2, title: '技术标比对', desc: '基于自然语言处理，比对全文语句、表格文字、图片内容及敏感信息，支持过滤招标文件。', icon: React.createElement(FileSearch, { className: "w-6 h-6 text-emerald-500" }) },
  { id: 3, title: '经济标比对', desc: '包含项目属性分析（软硬件信息）、错误一致性分析、清单报价分析、定额子目分析、项目人材机汇总分析。', icon: React.createElement(Fingerprint, { className: "w-6 h-6 text-amber-500" }) },
  { id: 4, title: '文件设备特征比对', desc: '识别生成文档的计算机MAC地址、硬盘序列号及文件属性（作者、修改人等）等底层特征。', icon: React.createElement(Cpu, { className: "w-6 h-6 text-purple-500" }) },
];

export const NEWS_ITEMS = [
  { id: 1, date: '2026-03-02', title: '系统升级公告：新增PDF文档深度解析算法，提升比对精度', type: '公告' },
  { id: 2, date: '2026-02-28', title: '如何利用多版本比对功能快速定位合同条款变更？', type: '指南' },
  { id: 3, date: '2026-02-15', title: '如何将你的多份投标文件进行版本管理，比对重复度', type: '案例' },
  { id: 4, date: '2026-01-20', title: '关于优化大文件（>50MB）比对速度的更新说明', type: '更新' },
];

export const HISTORY_ITEMS = [
  { id: 'PRJ-20260301-01', name: '《产品需求文档(PRD)》比对项目', date: '2026-03-01 14:30', status: '已完成', risk: '中风险', files: 2 },
  { id: 'PRJ-20260228-02', name: '某市第一人民医院门诊楼新建工程', date: '2026-02-28 10:00', status: '已完成', risk: '高风险', files: 3 },
  { id: 'PRJ-20260225-03', name: '年度采购合同审查', date: '2026-02-25 09:15', status: '检查中', risk: '-', files: 2 },
  { id: 'PRJ-20260220-02', name: 'Q1季度财务报表核对', date: '2026-02-20 16:45', status: '已完成', risk: '低风险', files: 5 },
  { id: 'PRJ-20260215-01', name: '某住宅楼项目', date: '2026-02-15 14:20', status: '已完成', risk: '中风险', files: 4 },
];

export const DEFAULT_TEMPLATES: Template[] = [
  {
    id: 'tpl-1',
    name: '全面深度检查',
    desc: '包含所有资信、技术、经济及设备特征检查，适用于最终定标前审查。',
    config: {
      types: ALL_CHECK_TYPES,
      credit: ALL_CREDIT_ITEMS,
      tech: ALL_TECH_ITEMS.filter(item => item !== '图片文字OCR查重'),
      economic: ALL_ECONOMIC_ITEMS,
      device: ALL_DEVICE_ITEMS,
      threshold: 30,
      filterBiddingDoc: true,
      enableAI: true
    }
  },
  {
    id: 'tpl-2',
    name: '快速资信初审',
    desc: '仅检查资信标和设备特征，适用于初步筛选阶段。',
    config: {
      types: ['资信标比对', '文件设备特征比对'],
      credit: ['法定代表人名称比对', '法定代表人身份证比对', '人员名称比对', '人员身份证比对', '地址比对', '统一社会信用代码比对'],
      tech: [],
      economic: [],
      device: ['MAC地址比对', '计算机名比对'],
      threshold: 50,
      filterBiddingDoc: false,
      enableAI: false
    }
  },
  {
    id: 'tpl-3',
    name: '技术标防串标专查',
    desc: '重点比对技术标内容雷同及设备特征，适用于技术方案评审。',
    config: {
      types: ['技术标比对', '文件设备特征比对'],
      credit: [],
      tech: ALL_TECH_ITEMS.filter(item => item !== '图片文字OCR查重'),
      economic: [],
      device: ALL_DEVICE_ITEMS,
      threshold: 20,
      filterBiddingDoc: true,
      enableAI: true
    }
  }
];
