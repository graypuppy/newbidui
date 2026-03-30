import { ALL_CHECK_TYPES } from '../constants';

export const getFileExtension = (filename: string) => {
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop()?.toLowerCase() || '' : '';
};

export const getFileSupportedTypes = (fileName: string) => {
  const lowerName = fileName.toLowerCase();
  if (lowerName.includes('清单') || lowerName.endsWith('.xml') || lowerName.endsWith('.xls') || lowerName.endsWith('.xlsx')) {
    return ['经济标'];
  } else if (lowerName.endsWith('.pdf')) {
    return ['资信标', '技术标(不含属性)'];
  } else if (lowerName.endsWith('.doc') || lowerName.endsWith('.docx')) {
    return ['资信标', '技术标'];
  } else if (lowerName.includes('非加密') || lowerName.includes('投标文件') || lowerName.endsWith('.tb') || lowerName.endsWith('.gef') || lowerName.endsWith('.nxztf')) {
    return ['资信标', '经济标', '技术标', '文件设备特征'];
  }
  return ['资信标', '技术标']; // Default fallback
};

export const getSupportedCheckTypes = (fileName: string) => {
  const types = getFileSupportedTypes(fileName);
  const checkTypes: string[] = [];
  if (types.includes('资信标')) checkTypes.push('资信标比对');
  if (types.includes('技术标') || types.includes('技术标(不含属性)')) checkTypes.push('技术标比对');
  if (types.includes('经济标')) checkTypes.push('经济标比对');
  if (types.includes('文件设备特征')) checkTypes.push('文件设备特征比对');
  return checkTypes;
};

export const getDisabledItems = (fileName: string) => {
  const types = getFileSupportedTypes(fileName);
  const disabledItems: string[] = [];
  if (types.includes('技术标(不含属性)')) {
    disabledItems.push('文档属性');
  }
  return disabledItems;
};

export const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getTypeColorClass = (type: string) => {
  switch (type) {
    case '资信标': return 'bg-blue-50 text-blue-600 border-blue-100';
    case '经济标': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    case '技术标': return 'bg-purple-50 text-purple-600 border-purple-100';
    case '技术标(不含属性)': return 'bg-orange-50 text-orange-600 border-orange-100';
    case '文件设备特征': return 'bg-cyan-50 text-cyan-600 border-cyan-100';
    default: return 'bg-slate-50 text-slate-600 border-slate-100';
  }
};
export const getTasks = (
  files: any[],
  selectedCheckTypes: string[],
  selectedCreditItems: string[],
  selectedTechItems: string[],
  selectedEconomicItems: string[],
  selectedDeviceItems: string[]
) => {
  const tasks = [];
  const disabled = files?.length > 0 ? getDisabledItems(files[0].name) : [];
  const supported = files?.length > 0 ? getSupportedCheckTypes(files[0].name) : ALL_CHECK_TYPES;

  if (selectedCheckTypes?.includes('资信标比对') && supported?.includes('资信标比对') && selectedCreditItems?.length > 0) {
    tasks.push({ type: '资信标比对', items: selectedCreditItems });
  }
  if (selectedCheckTypes?.includes('技术标比对') && supported?.includes('技术标比对') && selectedTechItems?.length > 0) {
    const filteredTechItems = selectedTechItems.filter(item => !disabled.includes(item));
    if (filteredTechItems.length > 0) {
      tasks.push({ type: '技术标比对', items: filteredTechItems });
    }
  }
  if (selectedCheckTypes?.includes('经济标比对') && supported?.includes('经济标比对') && selectedEconomicItems?.length > 0) {
    tasks.push({ type: '经济标比对', items: selectedEconomicItems });
  }
  if (selectedCheckTypes?.includes('文件设备特征比对') && supported?.includes('文件设备特征比对') && selectedDeviceItems?.length > 0) {
    tasks.push({ type: '文件设备特征比对', items: selectedDeviceItems });
  }
  return tasks;
};
