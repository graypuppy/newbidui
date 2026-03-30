import * as fs from 'fs';

const appTsx = fs.readFileSync('src/App.tsx', 'utf8');

// Find the start and end of the Economic Tab JSX
const startMarker = "{(reportTab === 'economic' || isExporting) && (";
const endMarker = "{(reportTab === 'device' || isExporting) && (";

const startIndex = appTsx.indexOf(startMarker);
const endIndex = appTsx.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find markers");
  process.exit(1);
}

// Extract the JSX block
let jsxBlock = appTsx.substring(startIndex, endIndex);

// Remove the outer condition `{(reportTab === 'economic' || isExporting) && (` and the closing `)}`
const firstDivStart = jsxBlock.indexOf('<div className="space-y-6">');
const lastDivEnd = jsxBlock.lastIndexOf('</div>');

let innerJsx = jsxBlock.substring(firstDivStart, lastDivEnd + 6);

// We also need to extract mockEconomicData from App.tsx
const mockStart = appTsx.indexOf('const mockEconomicData = [');
const mockEnd = appTsx.indexOf('const mockDeviceMatrixData =');
let mockDataBlock = appTsx.substring(mockStart, mockEnd).trim();

// Create the new EconomicTab.tsx content
const newContent = `import React, { useState } from 'react';
import { 
  Fingerprint, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink, 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  Settings,
  Search,
  ChevronDown,
  CheckCircle
} from 'lucide-react';
import { FileItem, PdfPreviewState } from '../../types';
import { 
  mockErrorConsistencyData, 
  mockQuoteDetails, 
  mockQuotaDetails, 
  mockMaterialsData 
} from '../../data/mockData';

interface EconomicTabProps {
  comparingFiles: FileItem[];
  mockEconomicDetails?: any;
  setPdfPreviewState: (state: PdfPreviewState) => void;
  isExporting: boolean;
  reportTab?: string;
}

const EconomicTab: React.FC<EconomicTabProps> = ({
  comparingFiles,
  setPdfPreviewState,
  isExporting,
  reportTab = 'economic'
}) => {
  const [economicTab, setEconomicTab] = useState<'attributes' | 'errors' | 'quotes' | 'quota' | 'materials'>('attributes');
  const [selectedQuotePair, setSelectedQuotePair] = useState<{file1: string, file2: string} | null>(null);
  const [selectedQuotaPair, setSelectedQuotaPair] = useState<{file1: string, file2: string} | null>(null);
  const [selectedMaterialPair, setSelectedMaterialPair] = useState<{file1: string, file2: string} | null>(null);
  const [selectedErrorPair, setSelectedErrorPair] = useState<{file1: string, file2: string} | null>({file1: '投标_符合性错误.SXTB4', file2: '投标_计算错误.SXTB4'});
  const [quotaRules, setQuotaRules] = useState({
    ruleType: '等比',
    compareType: '单价'
  });
  const [quotaFilters, setQuotaFilters] = useState({
    minItems: 5,
    maxItems: 100,
    percentage: 20
  });
  const [showBiddingFiles, setShowBiddingFiles] = useState(false);
  const [unreasonableErrors, setUnreasonableErrors] = useState<Record<string, { checked: boolean, reason: string }>>({});

  const matrixFiles = comparingFiles.length > 0 ? comparingFiles.filter(f => !f.name.includes('控制价')) : [
    { id: '1', name: '投标_符合性错误.SXTB4', status: 'success', type: 'bid' },
    { id: '2', name: '投标_计算错误.SXTB4', status: 'success', type: 'bid' },
    { id: '3', name: '投标_正常.SXTB4', status: 'success', type: 'bid' }
  ];

  ${mockDataBlock}

  return (
    ${innerJsx}
  );
};

export default EconomicTab;
`;

fs.writeFileSync('src/components/report/EconomicTab.tsx', newContent);
console.log('EconomicTab.tsx updated successfully');

// Now remove the inline code from App.tsx
let newAppTsx = appTsx.substring(0, startIndex) + `<EconomicTab 
                    comparingFiles={comparingFiles} 
                    setPdfPreviewState={setPdfPreviewState} 
                    isExporting={isExporting} 
                    reportTab={reportTab} 
                  />\n                  ` + appTsx.substring(endIndex);

// Remove the states from App.tsx
const statesToRemove = [
  "const [economicTab, setEconomicTab] = useState<'attributes' | 'errors' | 'quotes' | 'quota' | 'materials'>('attributes');",
  "const [selectedQuotePair, setSelectedQuotePair] = useState<{file1: string, file2: string} | null>(null);",
  "const [selectedQuotaPair, setSelectedQuotaPair] = useState<{file1: string, file2: string} | null>(null);",
  "const [selectedMaterialPair, setSelectedMaterialPair] = useState<{file1: string, file2: string} | null>(null);",
  "const [selectedErrorPair, setSelectedErrorPair] = useState<{file1: string, file2: string} | null>({file1: '投标_符合性错误.SXTB4', file2: '投标_计算错误.SXTB4'});",
  "const [selectedUnreasonableMaterials, setSelectedUnreasonableMaterials] = useState<string[]>(['m2', 'm4']);",
  "const [quotaRules, setQuotaRules] = useState({",
  "ruleType: '等比',",
  "compareType: '单价'",
  "});",
  "const [quotaFilters, setQuotaFilters] = useState({",
  "minItems: 5,",
  "maxItems: 100,",
  "percentage: 20",
  "});",
  "const [showBiddingFiles, setShowBiddingFiles] = useState(false);",
  "const [unreasonableErrors, setUnreasonableErrors] = useState<Record<string, { checked: boolean, reason: string }>>({});",
  "const handleMaterialCheck = (id: string) => {",
  "setSelectedUnreasonableMaterials(prev => ",
  "prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]",
  ");",
  "};"
];

for (const state of statesToRemove) {
  newAppTsx = newAppTsx.replace(state + '\\n', '');
  newAppTsx = newAppTsx.replace(state + '\\r\\n', '');
  newAppTsx = newAppTsx.replace(state, '');
}

// Remove mockEconomicData from App.tsx
newAppTsx = newAppTsx.replace(mockDataBlock, '');

// Ensure EconomicTab is imported
if (!newAppTsx.includes("import EconomicTab")) {
  newAppTsx = newAppTsx.replace("import TechTab from './components/report/TechTab';", "import TechTab from './components/report/TechTab';\\nimport EconomicTab from './components/report/EconomicTab';");
}

fs.writeFileSync('src/App.tsx', newAppTsx);
console.log('App.tsx updated successfully');
