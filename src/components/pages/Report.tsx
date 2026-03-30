import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Download, 
  Loader2 
} from 'lucide-react';
import { FileItem, PdfPreviewState } from '../../types';
import OverviewTab from '../report/OverviewTab';
import CreditTab from '../report/CreditTab';
import TechTab from '../report/TechTab';
import EconomicTab from '../report/EconomicTab';
import DeviceTab from '../report/DeviceTab';
import ReportTabs from '../report/ReportTabs';
import OverviewSection from '../report/OverviewSection';

interface ReportProps {
  reportRef: React.RefObject<HTMLDivElement | null>;
  projectName: string;
  setCurrentPage: (page: any) => void;
  handleExportPDF: () => void;
  isExporting: boolean;
  reportTab: string;
  setReportTab: (tab: string) => void;
  riskLevel: string;
  riskColor: string;
  riskCircleColor: string;
  riskPercentage: number;
  strokeDashoffset: number;
  riskData: {
    credit: number;
    tech: number;
    economic: number;
    device: number;
  };
  comparingFiles: FileItem[];
  mockCreditDataByField: any;
  mockTechDetails: any;
  mockDuplicates: any;
  mockDeviceMatrixData: any;
  isDeviceValueDuplicate: (colIndex: number, value: string) => boolean;
  getDeviceDuplicateDetails: (colIndex: number, value: string, currentFileId: string) => string[];
  setPdfPreviewState: (state: PdfPreviewState) => void;
  setActiveSensitiveLoc: (loc: number | null) => void;
  ALL_DEVICE_ITEMS: string[];
}

const Report: React.FC<ReportProps> = ({
  reportRef,
  projectName,
  setCurrentPage,
  handleExportPDF,
  isExporting,
  reportTab,
  setReportTab,
  riskLevel,
  riskColor,
  riskCircleColor,
  riskPercentage,
  strokeDashoffset,
  riskData,
  comparingFiles,
  mockCreditDataByField,
  mockTechDetails,
  mockDuplicates,
  mockDeviceMatrixData,
  isDeviceValueDuplicate,
  getDeviceDuplicateDetails,
  setPdfPreviewState,
  setActiveSensitiveLoc,
  ALL_DEVICE_ITEMS,
}) => {
  return (
    <motion.div
      key="report"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
      ref={reportRef}
    >
      {/* Report Header */}
      <div className="flex items-center justify-between mb-6" data-html2canvas-ignore={isExporting ? "true" : "false"}>
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentPage('history')} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-slate-900">比对结果概览</h1>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleExportPDF}
            disabled={isExporting}
            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-sm font-medium shadow-sm disabled:opacity-50"
          >
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} 
            {isExporting ? '导出中...' : '导出报告'}
          </button>
        </div>
      </div>

      {/* Export Title (Only visible during export) */}
      {isExporting && (
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{projectName || '某工程项目招标文件比对'}</h1>
          <p className="text-slate-500">比对结果完整报告</p>
        </div>
      )}

      {/* Tabs */}
      {!isExporting && (
        <ReportTabs reportTab={reportTab} setReportTab={setReportTab} />
      )}

      {/* Overview Tab */}
      {(reportTab === 'overview' || isExporting) && (
        <OverviewSection 
          projectName={projectName}
          riskLevel={riskLevel}
          riskColor={riskColor}
          riskPercentage={riskPercentage}
          strokeDashoffset={strokeDashoffset}
          riskCircleColor={riskCircleColor}
          riskData={riskData}
          setReportTab={setReportTab}
          comparingFiles={comparingFiles}
          isExporting={isExporting}
        />
      )}

      {/* Credit Tab */}
      {(reportTab === 'credit' || isExporting) && (
        <CreditTab 
          comparingFiles={comparingFiles}
          mockCreditDataByField={mockCreditDataByField}
          setPdfPreviewState={setPdfPreviewState}
          isExporting={isExporting}
        />
      )}

      {/* Tech Tab */}
      {(reportTab === 'tech' || isExporting) && (
        <TechTab 
          comparingFiles={comparingFiles}
          mockTechDetails={mockTechDetails}
          mockDuplicates={mockDuplicates}
          setPdfPreviewState={setPdfPreviewState}
          setActiveSensitiveLoc={setActiveSensitiveLoc}
          isExporting={isExporting}
        />
      )}

      {/* Economic Tab */}
      {(reportTab === 'economic' || isExporting) && (
        <EconomicTab 
          comparingFiles={comparingFiles}
          setPdfPreviewState={setPdfPreviewState}
          isExporting={isExporting}
          reportTab={reportTab}
        />
      )}

      {/* Device Tab */}
      {(reportTab === 'device' || isExporting) && (
        <DeviceTab 
          comparingFiles={comparingFiles}
          ALL_DEVICE_ITEMS={ALL_DEVICE_ITEMS}
          mockDeviceMatrixData={mockDeviceMatrixData}
          mockTechDetails={mockTechDetails}
          isDeviceValueDuplicate={isDeviceValueDuplicate}
          getDeviceDuplicateDetails={getDeviceDuplicateDetails}
          isExporting={isExporting}
        />
      )}
    </motion.div>
  );
};

export default Report;
