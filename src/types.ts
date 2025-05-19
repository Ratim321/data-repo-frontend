export interface Dataset {
  id: string;
  name: string;
  description: string;
  tags: string[];
  fileType: string;
  createdAt: string;
}

export interface CreateDatasetForm {
  name: string;
  description: string;
  tags: string;
  file: File | null;
} 