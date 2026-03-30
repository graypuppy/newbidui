import { useState, useRef } from 'react';
import { FileItem, Notification, Template, PdfPreviewState } from '../types';
import { 
  ALL_CHECK_TYPES, 
  ALL_CREDIT_ITEMS, 
  ALL_TECH_ITEMS, 
  ALL_ECONOMIC_ITEMS, 
  ALL_DEVICE_ITEMS,
  DEFAULT_TEMPLATES,
  HISTORY_ITEMS
} from '../constants';

export function useAppState() {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Navigation State
  const [currentPage, setCurrentPage] = useState<'home' | 'project' | 'comparing' | 'report' | 'history' | 'rules'>('home');
  
  // File State
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Notifications State
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: 'system', title: '系统更新公告', content: 'V2.0版本已上线，新增多文件批量比对功能。', time: '10分钟前', read: false },
    { id: 2, type: 'guide', title: '新手指引', content: '查看如何配置自定义比对规则，提高比对准确率。', time: '2小时前', read: false },
    { id: 3, type: 'task', title: '比对任务完成', content: '您提交的【某某工程项目标书比对】已完成，点击查看报告。', time: '1天前', read: true },
  ]);

  // Templates State
  const [templates, setTemplates] = useState<Template[]>(DEFAULT_TEMPLATES);
  const [activeTemplateId, setActiveTemplateId] = useState<string>('tpl-1');
  const [pdfPreviewState, setPdfPreviewState] = useState<PdfPreviewState | null>(null);
  const [activeSensitiveLoc, setActiveSensitiveLoc] = useState<number | null>(null);
  
  // Project Page State
  const [projectName, setProjectName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Report States
  const [reportTab, setReportTab] = useState<'overview' | 'credit' | 'tech' | 'economic' | 'device'>('overview');
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  
  const [priceRules, setPriceRules] = useState({
    comprehensive: '等比',
    resource: '等比',
    quota: '等比',
    composition: '等比'
  });
  
  const [priceFilters, setPriceFilters] = useState({
    minItems: 0,
    maxItems: 1000,
    percentage: 80
  });
  const [priceDetailTab, setPriceDetailTab] = useState('quota');
  const [selectedPriceItem, setSelectedPriceItem] = useState('p1');
  
  const [showOnlyDuplicates, setShowOnlyDuplicates] = useState(false);
  const [techFileA, setTechFileA] = useState<string>('');
  const [techFileB, setTechFileB] = useState<string>('');
  const [activeDuplicateId, setActiveDuplicateId] = useState<number | null>(null);
  const [activeTechItem, setActiveTechItem] = useState<any>(null);
  
  const pdfARef = useRef<HTMLDivElement>(null);
  const pdfBRef = useRef<HTMLDivElement>(null);

  // Config State
  const [selectedCheckTypes, setSelectedCheckTypes] = useState<string[]>(ALL_CHECK_TYPES);
  const [selectedCreditItems, setSelectedCreditItems] = useState<string[]>(ALL_CREDIT_ITEMS);
  const [selectedTechItems, setSelectedTechItems] = useState<string[]>(ALL_TECH_ITEMS.filter(item => item !== '图片文字OCR查重'));
  const [selectedEconomicItems, setSelectedEconomicItems] = useState<string[]>(ALL_ECONOMIC_ITEMS);
  const [selectedDeviceItems, setSelectedDeviceItems] = useState<string[]>(ALL_DEVICE_ITEMS);
  const [threshold, setThreshold] = useState(30);
  const [filterBiddingDoc, setFilterBiddingDoc] = useState(true);
  const [biddingDocFile, setBiddingDocFile] = useState<{id: string, name: string, size: number} | null>(null);
  const [biddingDocError, setBiddingDocError] = useState<string | null>(null);
  const [enableAI, setEnableAI] = useState(true);

  // Purchase & Comparing State
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedSku, setSelectedSku] = useState<'month' | 'once'>('month');
  const [comparingProgress, setComparingProgress] = useState<{
    currentTypeIndex: number;
    currentItemIndex: number;
    completedItems: string[];
    isFinished: boolean;
  }>({
    currentTypeIndex: 0,
    currentItemIndex: 0,
    completedItems: [],
    isFinished: false
  });

  // History State
  const [historyItems, setHistoryItems] = useState(HISTORY_ITEMS);

  const [compareLogs, setCompareLogs] = useState<{id: number, time: string, text: string, type: string}[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Template Editor State
  const [isTemplateEditorOpen, setIsTemplateEditorOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  return {
    isLoggedIn, setIsLoggedIn,
    showLoginModal, setShowLoginModal,
    showUserMenu, setShowUserMenu,
    currentPage, setCurrentPage,
    isDragging, setIsDragging,
    files, setFiles,
    errorMsg, setErrorMsg,
    showNotifications, setShowNotifications,
    notifications, setNotifications,
    templates, setTemplates,
    activeTemplateId, setActiveTemplateId,
    pdfPreviewState, setPdfPreviewState,
    activeSensitiveLoc, setActiveSensitiveLoc,
    projectName, setProjectName,
    isEditingName, setIsEditingName,
    nameInputRef,
    reportTab, setReportTab,
    isExporting, setIsExporting,
    reportRef,
    priceRules, setPriceRules,
    priceFilters, setPriceFilters,
    priceDetailTab, setPriceDetailTab,
    selectedPriceItem, setSelectedPriceItem,
    showOnlyDuplicates, setShowOnlyDuplicates,
    techFileA, setTechFileA,
    techFileB, setTechFileB,
    activeDuplicateId, setActiveDuplicateId,
    activeTechItem, setActiveTechItem,
    pdfARef, pdfBRef,
    selectedCheckTypes, setSelectedCheckTypes,
    selectedCreditItems, setSelectedCreditItems,
    selectedTechItems, setSelectedTechItems,
    selectedEconomicItems, setSelectedEconomicItems,
    selectedDeviceItems, setSelectedDeviceItems,
    threshold, setThreshold,
    filterBiddingDoc, setFilterBiddingDoc,
    biddingDocFile, setBiddingDocFile,
    biddingDocError, setBiddingDocError,
    enableAI, setEnableAI,
    showPurchaseModal, setShowPurchaseModal,
    selectedSku, setSelectedSku,
    comparingProgress, setComparingProgress,
    historyItems, setHistoryItems,
    compareLogs, setCompareLogs,
    logsEndRef,
    isTemplateEditorOpen, setIsTemplateEditorOpen,
    editingTemplate, setEditingTemplate,
    deleteConfirmId, setDeleteConfirmId
  };
}
