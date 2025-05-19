export interface Dataset {
  id: string;
  name: string;
  description: string;
  tags: string[];
  fileType: string;
  createdAt: string;
  hospitalId: string;
  hospitalName: string;
  size: string;
  downloads: number;
  visibility: 'public' | 'private';
  lastUpdated: string;
  columns?: number;
  rows?: number;
  previewData?: any[];
}

export interface CreateDatasetForm {
  name: string;
  description: string;
  tags: string;
  file: File | null;
  visibility: 'public' | 'private';
}

export interface Hospital {
  id: string;
  name: string;
  email: string;
  totalDatasets: number;
  totalDownloads: number;
  joinedDate: string;
  location: string;
  type: 'public' | 'private';
}