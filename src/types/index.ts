import { ReactNode } from 'react';

export type FileItem = { 
  id: string; 
  name: string; 
  size: number; 
  status: '未比对' | '比对中' | '已完成';
  supportedTypes?: string[];
  risks?: {
    credit: number;
    tech: number;
    economic: number;
    device: number;
  }
};

export type Notification = {
  id: number;
  type: string;
  title: string;
  content: string;
  time: string;
  read: boolean;
};

export type Template = {
  id: string;
  name: string;
  desc: string;
  config: {
    types: string[];
    credit: string[];
    tech: string[];
    economic: string[];
    device: string[];
    threshold: number;
    filterBiddingDoc: boolean;
  };
};

export type PageType = 'home' | 'project' | 'comparing' | 'report' | 'history' | 'rules';

export type PdfPreviewState = {
  isOpen: boolean;
  fileName: string;
  value: string;
  type: string;
  contentType?: 'text' | 'image' | 'table' | 'sensitive';
  duplicates?: { fileName: string; value: string }[];
  item?: any;
};
