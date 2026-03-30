import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toCanvas } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { 
  UploadCloud, 
  FileText, 
  Settings, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  X, 
  ChevronDown, 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  Eye, 
  Trash2, 
  Plus, 
  FileSearch, 
  Fingerprint, 
  Cpu, 
  Network, 
  HardDrive, 
  Clock, 
  User, 
  Building2, 
  FileCode2, 
  ShieldAlert, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Users, 
  Activity, 
  ArrowRight, 
  Check, 
  LogOut, 
  Bell, 
  History as HistoryIcon, 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  ExternalLink, 
  Table, 
  ScanText, 
  PenTool, 
  Quote, 
  ArrowLeft, 
  Loader2,
  Image as ImageIcon
} from 'lucide-react';

// Types
import { FileItem, Notification, Template, PageType, PdfPreviewState } from './types';

// Constants
import { 
  ALL_CHECK_TYPES, 
  ALL_CREDIT_ITEMS, 
  ALL_TECH_ITEMS, 
  ALL_ECONOMIC_ITEMS, 
  ALL_DEVICE_ITEMS,
  DEFAULT_TEMPLATES,
  HISTORY_ITEMS
} from './constants';
import { mockDuplicates, mockHardwareData, mockErrorConsistencyData, mockPriceSimilarity, mockQuotaDetails, mockQuoteDetails, mockPriceItems, mockPriceDetails, mockQuotaAnalysisData, mockMaterialsData, generateMockDeviceMatrixData, generateMockTechDetails, generateMockCreditDataByField } from './data/mockData';

// Components
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Project from './components/pages/Project';
import Comparing from './components/pages/Comparing';
import Report from './components/pages/Report';
import History from './components/pages/History';
import Rules from './components/pages/Rules';
import PdfPreview from './components/modals/PdfPreview';
import TemplateEditorModal from './components/modals/TemplateEditorModal';
import LoginModal from './components/modals/LoginModal';
import PurchaseModal from './components/modals/PurchaseModal';
import DeleteConfirmModal from './components/modals/DeleteConfirmModal';

import { useAppState } from './hooks/useAppState';
import { getFileSupportedTypes, getFileExtension, getSupportedCheckTypes, getDisabledItems, formatSize, getTypeColorClass, getTasks } from './utils/fileUtils';

export default function App() {
  const {
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
  } = useAppState();

  useEffect(() => {
    if (currentPage === 'home') {
      setErrorMsg(null);
    }
  }, [currentPage]);

  // Mock risk data for the overview
  const riskData = {
    credit: 3,
    tech: 12,
    economic: 2,
    device: 4
  };
  
  const totalRisks = Object.values(riskData).reduce((a, b) => a + b, 0);
  const riskLevel = totalRisks > 10 ? '高风险' : totalRisks > 5 ? '中风险' : '低风险';
  const riskColor = totalRisks > 10 ? 'text-red-600' : totalRisks > 5 ? 'text-amber-600' : 'text-emerald-600';
  const riskCircleColor = totalRisks > 10 ? 'text-red-500' : totalRisks > 5 ? 'text-amber-500' : 'text-emerald-500';
  const riskPercentage = Math.min(100, totalRisks * 4); // Just a mock calculation
  const strokeDashoffset = 175.9 - (175.9 * riskPercentage) / 100;

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    
    // Wait for React to render all tabs
    setTimeout(async () => {
      try {
        const canvas = await toCanvas(reportRef.current!, {
          pixelRatio: 1.5, // Reduced scale to prevent out-of-memory on large reports
          backgroundColor: '#ffffff',
          filter: (node) => {
            // Filter out elements we don't want to capture
            if (node.hasAttribute && node.hasAttribute('data-html2canvas-ignore')) {
              return node.getAttribute('data-html2canvas-ignore') !== 'true';
            }
            return true;
          }
        });
        
        // Use JPEG instead of PNG to significantly reduce memory usage and file size
        const imgData = canvas.toDataURL('image/jpeg', 0.8);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        let position = 0;
        let heightLeft = pdfHeight;
        const pageHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
          heightLeft -= pageHeight;
        }
        
        pdf.save(`${projectName || '比对报告'}.pdf`);
      } catch (error: any) {
        console.error('Failed to generate PDF', error);
        alert('导出失败，将尝试使用浏览器打印功能导出...');
        window.print();
      } finally {
        setIsExporting(false);
      }
    }, 800); // Increased timeout to ensure all tabs are fully rendered
  };

  const handleNewTemplate = () => {
    setEditingTemplate({
      id: `tpl-${Date.now()}`,
      name: '新规模板',
      desc: '请编辑模板描述',
      config: {
        types: [],
        credit: [],
        tech: [],
        economic: [],
        device: [],
        threshold: 30,
        filterBiddingDoc: false,
        enableAI: false
      }
    });
    setIsTemplateEditorOpen(true);
  };

  const handleEditTemplate = (tpl: any) => {
    setEditingTemplate(JSON.parse(JSON.stringify(tpl))); // Deep copy
    setIsTemplateEditorOpen(true);
  };

  const handleDeleteTemplate = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDeleteTemplate = () => {
    if (deleteConfirmId) {
      setTemplates(prev => prev.filter(t => t.id !== deleteConfirmId));
      setDeleteConfirmId(null);
    }
  };

  const handleSaveTemplate = () => {
    if (!editingTemplate) return;
    
    setTemplates(prev => {
      const exists = prev.find(t => t.id === editingTemplate.id);
      if (exists) {
        return prev.map(t => t.id === editingTemplate.id ? editingTemplate : t);
      } else {
        return [...prev, editingTemplate];
      }
    });
    setIsTemplateEditorOpen(false);
    setEditingTemplate(null);
  };

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [compareLogs]);

  const applyTemplate = (tplId: string) => {
    const tpl = templates.find(t => t.id === tplId);
    if (tpl) {
      setActiveTemplateId(tplId);
      setSelectedCheckTypes(tpl.config.types);
      setSelectedCreditItems(tpl.config.credit);
      const disabled = files?.length > 0 ? getDisabledItems(files[0].name) : ['图片文字OCR查重'];
      setSelectedTechItems(tpl.config.tech.filter((item: string) => !disabled.includes(item)));
      setSelectedEconomicItems(tpl.config.economic);
      setSelectedDeviceItems(tpl.config.device);
      setThreshold(tpl.config.threshold);
      setFilterBiddingDoc(tpl.config.filterBiddingDoc);
      setEnableAI(tpl.config.enableAI);
    }
  };

  // Report Mock Data & Helpers
  const activeFiles = files?.filter(f => f.status === '已完成' || f.status === '比对中') || [];
  const comparingFiles = activeFiles?.length > 0 ? activeFiles : [
    { id: 'f1', name: '投标文件A.pdf', size: 1024 * 1024 * 2, status: '已完成' },
    { id: 'f2', name: '投标文件B.pdf', size: 1024 * 1024 * 3, status: '已完成' }
  ] as FileItem[];
  
  const matrixFiles = activeFiles?.length > 0 ? activeFiles.filter(f => !f.name.includes('控制价')) : [
    { id: 'm1', name: '中建一局-非加密投标文件.SXTB4' },
    { id: 'm2', name: '中建二局-非加密投标文件.SXTB4' },
    { id: 'm3', name: '中建三局-非加密投标文件.SXTB4' },
    { id: 'm4', name: '中建四局-非加密投标文件.SXTB4' },
    { id: 'm5', name: '中建五局-非加密投标文件.SXTB4' },
    { id: 'm6', name: '中建六局-非加密投标文件.SXTB4' },
    { id: 'm7', name: '中建七局-非加密投标文件.SXTB4' },
    { id: 'm8', name: '中建八局-非加密投标文件.SXTB4' },
  ];
  const creditItems = selectedCreditItems?.length > 0 ? selectedCreditItems : ['法定代表人名称比对', '法定代表人身份证比对', '人员名称比对', '人员身份证比对', '地址比对', '统一社会信用代码比对'];

  const availableCheckTypes = files?.length > 0 
    ? getSupportedCheckTypes(files[0].name)
    : ALL_CHECK_TYPES;

  const disabledItems = files?.length > 0
    ? getDisabledItems(files[0].name)
    : [];

  useEffect(() => {
    if (currentPage === 'report' && comparingFiles.length >= 2) {
      if (!techFileA) setTechFileA(comparingFiles[0].id);
      if (!techFileB) setTechFileB(comparingFiles[1].id);
    }
  }, [currentPage, comparingFiles]);

  const handleTechItemClick = (item: any) => {
    // If it's a risk item, open the PDF preview modal
    if (item.status === 'fail' || item.status === 'info' || item.status === 'pass') {
       const currentFileName = item.fileName || comparingFiles[0].name;
       
       // Mock finding duplicates
       let duplicates = undefined;
       if (item.status === 'fail') {
         // Find other files that are not the current one
         const otherFiles = comparingFiles.filter(f => f.name !== currentFileName);
         if (otherFiles.length > 0) {
           duplicates = [{
             fileName: otherFiles[0].name,
             value: item.name || item.keyword
           }];
         }
       }

       // Determine content type
       let contentType: 'text' | 'image' | 'table' | 'sensitive' = 'text';
       if (item.type === 'image' || item.type === 'ocr' || item.type === 'signature') {
         contentType = 'image';
       } else if (item.type === 'table') {
         contentType = 'table';
       } else if (item.type === 'sensitive') {
         contentType = 'sensitive';
       }

       if (contentType === 'sensitive') {
         setActiveSensitiveLoc(item.locations ? item.locations[0] : null);
       }

       setPdfPreviewState({
        isOpen: true,
        fileName: currentFileName,
        value: item.name || item.keyword,
        type: item.type === 'image' ? '图片查重' : item.type === 'ocr' ? 'OCR查重' : item.type === 'signature' ? '签章查重' : item.type === 'table' ? '表格查重' : item.type === 'sensitive' ? '敏感信息查重' : item.type,
        contentType: contentType,
        duplicates: duplicates,
        item: item
      });
    }
  };

  const mockCreditDataByField = generateMockCreditDataByField(creditItems, comparingFiles);



  

  const mockDeviceMatrixData = generateMockDeviceMatrixData(comparingFiles, ALL_DEVICE_ITEMS);
  const mockTechDetails = generateMockTechDetails(comparingFiles);

  const isDeviceValueDuplicate = (colIndex: number, value: string) => {
    const allValues = mockDeviceMatrixData.map(d => d.values[colIndex]);
    return allValues.filter(v => v === value).length > 1;
  };

  const getDeviceDuplicateDetails = (colIndex: number, value: string, currentFileId: string) => {
    const duplicates = mockDeviceMatrixData
      .filter(d => d.id !== currentFileId && d.values[colIndex] === value)
      .map(d => d.name);
    return duplicates;
  };

  const handleDuplicateClick = (dup: any) => {
    setActiveDuplicateId(dup.id);
    setTimeout(() => {
      if (pdfARef.current) {
        const el = pdfARef.current.querySelector(`[data-line="${dup.lineA}"]`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      if (pdfBRef.current) {
        const el = pdfBRef.current.querySelector(`[data-line="${dup.lineB}"]`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const renderMockPdfPage = (fileId: string, ref: any, isFileA: boolean) => {
    return (
      <div className="flex-1 bg-white overflow-y-auto shadow-inner p-8 text-sm leading-relaxed font-serif text-slate-700 relative border border-slate-200 rounded-b-lg" ref={ref}>
        {/* Tech Item Highlight Overlay */}
        {activeTechItem && activeTechItem.page && (
          <div 
            className="absolute left-0 right-0 bg-yellow-100/30 pointer-events-none transition-all duration-300" 
            style={{ 
              top: `${activeTechItem.page * 28}px`, 
              height: '300px',
              zIndex: 0
            }}
          >
             {/* Page Highlight */}
          </div>
        )}

        {/* Rect Highlight for Images/Signatures */}
        {activeTechItem && activeTechItem.rect && (
          <div 
            className="absolute border-2 border-red-500 bg-red-500/10 z-10 flex items-center justify-center shadow-lg animate-pulse"
            style={{
              top: `${activeTechItem.rect.y}px`,
              left: `${activeTechItem.rect.x}px`,
              width: `${activeTechItem.rect.w}px`,
              height: `${activeTechItem.rect.h}px`,
            }}
          >
            <span className="bg-red-500 text-white text-[10px] px-1 rounded absolute -top-5 left-0 whitespace-nowrap">
              {activeTechItem.name}
            </span>
          </div>
        )}

        {Array.from({ length: 120 }).map((_, i) => {
          const dup = mockDuplicates.find(d => (isFileA ? d.lineA : d.lineB) === i);
          const isActive = dup && activeDuplicateId === dup.id;
          
          // Check if this line is part of activeTechItem context
          const isTechItemContext = activeTechItem && activeTechItem.page && Math.abs(activeTechItem.page - i) < 5;

          return (
            <div 
              key={i} 
              data-line={i} 
              className={`py-1 px-2 rounded transition-colors relative z-1 ${
                isActive ? 'bg-red-200 text-red-900 font-medium shadow-sm' : 
                dup ? 'bg-red-50 text-red-800 cursor-pointer hover:bg-red-100' : 
                isTechItemContext ? 'bg-blue-50/50' : ''
              }`}
              onClick={() => dup && handleDuplicateClick(dup)}
            >
              <span className="text-slate-300 mr-2 select-none text-xs w-6 inline-block text-right">{i + 1}</span>
              {dup ? dup.text : `第 ${i + 1} 行：本项目严格按照国家标准执行，确保工程质量和安全进度符合招标文件要求，特此声明...`}
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    if (currentPage === 'comparing') {
      const tasks = getTasks(files, selectedCheckTypes, selectedCreditItems, selectedTechItems, selectedEconomicItems, selectedDeviceItems);
      if (tasks.length === 0) {
        setComparingProgress(prev => ({ ...prev, isFinished: true }));
        return;
      }

      let typeIdx = 0;
      let itemIdx = 0;
      const completed: string[] = [];
      const comparingFiles = files?.filter(f => f.status === '比对中' || f.status === '已完成') || [];
      
      let logId = 0;
      const addLog = (text: string, type: string = 'info') => {
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
        setCompareLogs(prev => [...prev, { id: logId++, time: timeStr, text, type }]);
      };

      setCompareLogs([]);
      addLog(`[System] 初始化多版本比对引擎 v2.0...`);
      addLog(`[System] 加载 ${comparingFiles.length} 份待比对文件...`);
      addLog(`[System] 分配计算资源，准备执行深度交叉解析...`);

      const interval = setInterval(() => {
        const currentTaskGroup = tasks[typeIdx];
        
        if (itemIdx < currentTaskGroup.items.length) {
          const currentItem = currentTaskGroup.items[itemIdx];
          completed.push(`${currentTaskGroup.type}-${currentItem}`);
          
          const file1 = comparingFiles[Math.floor(Math.random() * comparingFiles.length)]?.name || '文件A';
          let file2 = comparingFiles[Math.floor(Math.random() * comparingFiles.length)]?.name || '文件B';
          while (file1 === file2 && comparingFiles.length > 1) {
             file2 = comparingFiles[Math.floor(Math.random() * comparingFiles.length)]?.name || '文件B';
          }
          
          const actions = [
            `[${currentTaskGroup.type}] 正在提取 ${file1} 的 [${currentItem}] 特征向量...`,
            `[${currentTaskGroup.type}] 交叉比对: ${file1} <=> ${file2} (${currentItem})`,
            `[${currentTaskGroup.type}] 深度分析 ${file1} 与 ${file2} 的 ${currentItem} 相似度...`,
            `[${currentTaskGroup.type}] 正在构建 ${currentItem} 关联图谱...`
          ];
          addLog(actions[Math.floor(Math.random() * actions.length)]);

          itemIdx++;
          setComparingProgress({
            currentTypeIndex: typeIdx,
            currentItemIndex: itemIdx,
            completedItems: [...completed],
            isFinished: false
          });
        } else {
          addLog(`[Success] ✅ 完成 ${currentTaskGroup.type} 所有检测项。`, 'success');
          typeIdx++;
          itemIdx = 0;
          if (typeIdx >= tasks.length) {
            clearInterval(interval);
            addLog(`[System] 🎉 所有比对任务执行完毕，正在汇总风险点并生成报告...`, 'success');
            setComparingProgress({
              currentTypeIndex: typeIdx,
              currentItemIndex: itemIdx,
              completedItems: [...completed],
              isFinished: true
            });
            
            setFiles(prev => prev.map(f => f.status === '比对中' ? { 
              ...f, 
              status: '已完成',
              risks: {
                credit: selectedCheckTypes.includes('资信标比对') ? Math.floor(Math.random() * 3) : 0,
                tech: selectedCheckTypes.includes('技术标比对') ? Math.floor(Math.random() * 5) : 0,
                economic: selectedCheckTypes.includes('经济标比对') ? Math.floor(Math.random() * 2) : 0,
                device: selectedCheckTypes.includes('文件设备特征比对') ? Math.floor(Math.random() * 2) : 0
              }
            } : f));

            setHistoryItems(prev => {
              if (prev.length === 0) return prev;
              const newItems = [...prev];
              const risks = ['高风险', '中风险', '低风险'];
              newItems[0] = {
                ...newItems[0],
                status: '已完成',
                risk: risks[Math.floor(Math.random() * risks.length)],
              };
              return newItems;
            });

            setTimeout(() => {
              setCurrentPage('report');
            }, 2000);
          } else {
            addLog(`[System] 开始执行 ${tasks[typeIdx].type}...`);
            setComparingProgress({
              currentTypeIndex: typeIdx,
              currentItemIndex: itemIdx,
              completedItems: [...completed],
              isFinished: false
            });
          }
        }
      }, 600);

      return () => clearInterval(interval);
    }
  }, [currentPage]);

  const handleBiddingDocInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBiddingDocError(null);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 100 * 1024 * 1024) {
        setBiddingDocError('招标文件大小不能超过 100MB');
        return;
      }
      setBiddingDocFile({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size
      });
    }
    e.target.value = '';
  };

  const removeBiddingDoc = () => {
    setBiddingDocFile(null);
    setBiddingDocError(null);
  };

  const MAX_FILES = 8;
  const MAX_TOTAL_SIZE = 500 * 1024 * 1024; // 500MB

  const processFiles = (newFiles: FileList | File[]) => {
    setErrorMsg(null);
    
    // If starting a new project from home, clear existing files
    const existingFiles = currentPage === 'home' ? [] : files;
    
    const fileArray = Array.from(newFiles);
    if (fileArray.length === 0) return;

    // Determine target extension
    let targetExt = '';
    if (existingFiles.length > 0) {
      targetExt = getFileExtension(existingFiles[0].name);
    } else {
      targetExt = getFileExtension(fileArray[0].name);
    }

    // Check extensions
    for (const file of fileArray) {
      const ext = getFileExtension(file.name);
      if (ext !== targetExt) {
        const extDisplay = targetExt ? `.${targetExt}` : '无后缀';
        setErrorMsg(`每次只允许上传同一后缀的文件 (当前需要 ${extDisplay} 文件)`);
        return;
      }
    }

    const currentTotalSize = existingFiles.reduce((acc, f) => acc + f.size, 0);
    let newTotalSize = currentTotalSize;
    const validFiles: FileItem[] = [];

    if (existingFiles.length + fileArray.length > MAX_FILES) {
      setErrorMsg(`最多只能上传 ${MAX_FILES} 个文件`);
      return;
    }

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      newTotalSize += file.size;
      if (newTotalSize > MAX_TOTAL_SIZE) {
        setErrorMsg(`总文件大小不能超过 500MB`);
        return;
      }
      validFiles.push({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
        status: '未比对',
        supportedTypes: getFileSupportedTypes(file.name)
      });
    }

    const updatedFiles = [...existingFiles, ...validFiles];
    setFiles(updatedFiles);

    // Filter out unsupported check types based on the newly added files
    const supported = getSupportedCheckTypes(updatedFiles[0].name);
    setSelectedCheckTypes(prev => prev.filter(t => supported.includes(t)));

    const disabled = getDisabledItems(updatedFiles[0].name);
    setSelectedTechItems(prev => prev.filter(item => !disabled.includes(item)));

    // If coming from home page, set project name and navigate
    if (currentPage === 'home' && validFiles.length > 0) {
      const defaultName = `${validFiles[0].name}等${updatedFiles.length}份文件`;
      setProjectName(defaultName);
      setCurrentPage('project');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
    e.target.value = '';
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
    setErrorMsg(null);
  };

  const handleStartComparisonClick = () => {
    if (files.length < 2) {
      setErrorMsg('至少需要2个文件才能进行比对');
      return;
    }
    
    // Check if economic comparison is selected and bidding document is uploaded
    if (selectedCheckTypes.includes('经济标比对') && !biddingDocFile) {
      setErrorMsg('进行经济标比对必须导入招标文件');
      return;
    }

    setShowPurchaseModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPurchaseModal(false);
    
    setFiles(files.map(f => f.status === '未比对' ? { 
      ...f, 
      status: '比对中',
      risks: { credit: 0, tech: 0, economic: 0, device: 0 }
    } : f));

    // Add to history
    const newHistoryItem = {
      id: `PRJ-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`,
      name: projectName || '未命名项目',
      date: new Date().toLocaleString('zh-CN', { hour12: false }).slice(0, 16),
      status: '检查中',
      risk: '-',
      files: files.filter(f => f.status === '未比对' || f.status === '比对中').length
    };
    setHistoryItems(prev => [newHistoryItem, ...prev]);

    setComparingProgress({
      currentTypeIndex: 0,
      currentItemIndex: 0,
      completedItems: [],
      isFinished: false
    });

    setCurrentPage('comparing');
  };

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditingName]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        showUserMenu={showUserMenu}
        setShowUserMenu={setShowUserMenu}
        setShowLoginModal={setShowLoginModal}
        notifications={notifications}
        setNotifications={setNotifications}
        unreadCount={unreadCount}
        markAllAsRead={markAllAsRead}
      />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <Home 
              isLoggedIn={isLoggedIn}
              setShowLoginModal={setShowLoginModal}
              setCurrentPage={setCurrentPage}
              isDragging={isDragging}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleDrop={handleDrop}
              handleFileInput={handleFileInput}
              processFiles={processFiles}
              errorMsg={errorMsg}
              historyItems={historyItems}
              formatSize={formatSize}
            />
          )}

          {currentPage === 'history' && (
            <History 
              isLoggedIn={isLoggedIn}
              setShowLoginModal={setShowLoginModal}
              historyItems={historyItems}
              setCurrentPage={setCurrentPage}
            />
          )}

          {currentPage === 'rules' && (
            <Rules 
              isLoggedIn={isLoggedIn}
              setShowLoginModal={setShowLoginModal}
              templates={templates}
              handleNewTemplate={handleNewTemplate}
              handleEditTemplate={handleEditTemplate}
              handleDeleteTemplate={handleDeleteTemplate}
            />
          )}

          {currentPage === 'project' && (
            <Project 
              projectName={projectName}
              setProjectName={setProjectName}
              isEditingName={isEditingName}
              setIsEditingName={setIsEditingName}
              nameInputRef={nameInputRef}
              setCurrentPage={setCurrentPage}
              files={files}
              formatSize={formatSize}
              handleFileInput={handleFileInput}
              handleStartComparisonClick={handleStartComparisonClick}
              errorMsg={errorMsg}
              removeFile={removeFile}
              activeTemplateId={activeTemplateId}
              applyTemplate={applyTemplate}
              templates={templates}
              availableCheckTypes={availableCheckTypes}
              selectedCheckTypes={selectedCheckTypes}
              setSelectedCheckTypes={setSelectedCheckTypes}
              selectedCreditItems={selectedCreditItems}
              setSelectedCreditItems={setSelectedCreditItems}
              selectedTechItems={selectedTechItems}
              setSelectedTechItems={setSelectedTechItems}
              disabledItems={disabledItems}
              selectedEconomicItems={selectedEconomicItems}
              setSelectedEconomicItems={setSelectedEconomicItems}
              selectedDeviceItems={selectedDeviceItems}
              setSelectedDeviceItems={setSelectedDeviceItems}
              threshold={threshold}
              setThreshold={setThreshold}
              filterBiddingDoc={filterBiddingDoc}
              setFilterBiddingDoc={setFilterBiddingDoc}
              biddingDocFile={biddingDocFile}
              removeBiddingDoc={removeBiddingDoc}
              handleBiddingDocInput={handleBiddingDocInput}
              biddingDocError={biddingDocError}
              enableAI={enableAI}
              setEnableAI={setEnableAI}
            />
          )}

          {currentPage === 'comparing' && (
            <Comparing
              comparingProgress={comparingProgress}
              files={files}
              getTasks={() => getTasks(files, selectedCheckTypes, selectedCreditItems, selectedTechItems, selectedEconomicItems, selectedDeviceItems)}
              compareLogs={compareLogs}
              logsEndRef={logsEndRef}
            />
          )}

          {currentPage === 'report' && (
            <Report
              reportRef={reportRef}
              projectName={projectName}
              setCurrentPage={setCurrentPage}
              handleExportPDF={handleExportPDF}
              isExporting={isExporting}
              reportTab={reportTab}
              setReportTab={setReportTab}
              riskLevel={riskLevel}
              riskColor={riskColor}
              riskCircleColor={riskCircleColor}
              riskPercentage={riskPercentage}
              strokeDashoffset={strokeDashoffset}
              riskData={riskData}
              comparingFiles={comparingFiles}
              mockCreditDataByField={mockCreditDataByField}
              mockTechDetails={mockTechDetails}
              mockDuplicates={mockDuplicates}
              mockDeviceMatrixData={mockDeviceMatrixData}
              isDeviceValueDuplicate={isDeviceValueDuplicate}
              getDeviceDuplicateDetails={getDeviceDuplicateDetails}
              setPdfPreviewState={setPdfPreviewState}
              setActiveSensitiveLoc={setActiveSensitiveLoc}
              ALL_DEVICE_ITEMS={ALL_DEVICE_ITEMS}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => {
          setIsLoggedIn(true);
          setShowLoginModal(false);
        }}
      />

      {/* Purchase Modal */}
      <PurchaseModal 
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        selectedSku={selectedSku}
        setSelectedSku={setSelectedSku}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal 
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={confirmDeleteTemplate}
      />

      {/* Template Editor Modal */}
      <TemplateEditorModal 
        isOpen={isTemplateEditorOpen}
        onClose={() => setIsTemplateEditorOpen(false)}
        editingTemplate={editingTemplate}
        setEditingTemplate={setEditingTemplate}
        onSave={handleSaveTemplate}
        templates={templates}
      />
      {/* PDF Preview Modal */}
      <PdfPreview 
        pdfPreviewState={pdfPreviewState}
        setPdfPreviewState={setPdfPreviewState}
        activeSensitiveLoc={activeSensitiveLoc}
        setActiveSensitiveLoc={setActiveSensitiveLoc}
      />
    </div>
  );
}
