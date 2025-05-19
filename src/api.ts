// src/api.ts
// Mock API for hospital login and dataset management

export interface Hospital {
  id: string;
  name: string;
  email: string;
  password: string;
  totalDatasets: number;
  totalDownloads: number;
  joinedDate: string;
  location: string;
  type: 'public' | 'private';
}

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

// Mock hospital credentials with extended information
const hospitals: Hospital[] = [
  {
    id: 'hosp1',
    name: 'City General Hospital',
    email: 'citygen@example.com',
    password: 'password123',
    totalDatasets: 15,
    totalDownloads: 1250,
    joinedDate: '2023-01-15',
    location: 'New York, USA',
    type: 'public'
  },
  {
    id: 'hosp2',
    name: 'Metro Health Center',
    email: 'metrohealth@example.com',
    password: 'secure456',
    totalDatasets: 8,
    totalDownloads: 750,
    joinedDate: '2023-03-20',
    location: 'Los Angeles, USA',
    type: 'private'
  }
];

// Mock datasets with extended information
let datasets: Dataset[] = [
  {
    id: 'ds1',
    name: 'COVID-19 Patient Records 2020',
    description: 'Comprehensive anonymized dataset containing patient records from the COVID-19 pandemic in 2020. Includes demographic information, symptoms, treatment outcomes, and length of hospital stays.',
    tags: ['covid-19', 'patients', '2020', 'demographics', 'treatment'],
    fileType: 'CSV',
    createdAt: '2020-12-31T00:00:00.000Z',
    hospitalId: 'hosp1',
    hospitalName: 'City General Hospital',
    size: '2.5 MB',
    downloads: 450,
    visibility: 'public',
    lastUpdated: '2021-01-15T00:00:00.000Z',
    columns: 15,
    rows: 5000,
    previewData: [
      { age: 45, gender: 'M', symptoms: 'fever,cough', outcome: 'recovered' },
      { age: 62, gender: 'F', symptoms: 'shortness of breath', outcome: 'recovered' },
      { age: 53, gender: 'M', symptoms: 'fever,fatigue', outcome: 'recovered' }
    ]
  },
  {
    id: 'ds2',
    name: 'Heart Disease Study 2023',
    description: 'Results from a comprehensive 5-year heart disease study. Contains patient risk factors, diagnostic measurements, and treatment effectiveness data.',
    tags: ['cardiology', 'heart disease', 'long-term study', 'risk factors'],
    fileType: 'JSON',
    createdAt: '2023-06-15T00:00:00.000Z',
    hospitalId: 'hosp2',
    hospitalName: 'Metro Health Center',
    size: '1.8 MB',
    downloads: 280,
    visibility: 'public',
    lastUpdated: '2023-07-01T00:00:00.000Z',
    columns: 12,
    rows: 3500,
    previewData: [
      { patientId: 'P001', age: 58, riskFactors: ['smoking', 'hypertension'], outcome: 'improved' },
      { patientId: 'P002', age: 65, riskFactors: ['diabetes'], outcome: 'stable' },
      { patientId: 'P003', age: 49, riskFactors: ['obesity'], outcome: 'improved' }
    ]
  },
  {
    id: 'ds3',
    name: 'Emergency Room Analytics Q1 2023',
    description: 'Detailed analysis of emergency room visits, including wait times, triage categories, and treatment outcomes.',
    tags: ['emergency', 'analytics', 'triage', 'hospital operations'],
    fileType: 'CSV',
    createdAt: '2023-04-01T00:00:00.000Z',
    hospitalId: 'hosp1',
    hospitalName: 'City General Hospital',
    size: '3.2 MB',
    downloads: 175,
    visibility: 'private',
    lastUpdated: '2023-04-15T00:00:00.000Z',
    columns: 18,
    rows: 8000,
    previewData: [
      { date: '2023-01-01', patients: 145, avgWaitTime: '35min', criticalCases: 12 },
      { date: '2023-01-02', patients: 132, avgWaitTime: '42min', criticalCases: 8 },
      { date: '2023-01-03', patients: 158, avgWaitTime: '28min', criticalCases: 15 }
    ]
  }
];

// Mock login function
export async function loginHospital(email: string, password: string): Promise<Hospital | null> {
  const hospital = hospitals.find(h => h.email === email && h.password === password);
  await new Promise(res => setTimeout(res, 500));
  return hospital || null;
}

// Fetch all public datasets
export async function fetchPublicDatasets(): Promise<Dataset[]> {
  await new Promise(res => setTimeout(res, 300));
  return datasets.filter(ds => ds.visibility === 'public');
}

// Fetch datasets for a specific hospital (including private)
export async function fetchHospitalDatasets(hospitalId: string): Promise<Dataset[]> {
  await new Promise(res => setTimeout(res, 300));
  return datasets.filter(ds => ds.hospitalId === hospitalId);
}

// Add a new dataset
export async function addDataset(dataset: Omit<Dataset, 'id' | 'createdAt' | 'downloads'>): Promise<Dataset> {
  const newDataset: Dataset = {
    ...dataset,
    id: 'ds' + (datasets.length + 1),
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    downloads: 0
  };
  datasets = [newDataset, ...datasets];
  await new Promise(res => setTimeout(res, 300));
  return newDataset;
}

// Get dataset by ID
export async function getDatasetById(id: string): Promise<Dataset | null> {
  await new Promise(res => setTimeout(res, 300));
  return datasets.find(ds => ds.id === id) || null;
}

// Update dataset
export async function updateDataset(id: string, updates: Partial<Dataset>): Promise<Dataset | null> {
  await new Promise(res => setTimeout(res, 300));
  const index = datasets.findIndex(ds => ds.id === id);
  if (index === -1) return null;
  
  datasets[index] = {
    ...datasets[index],
    ...updates,
    lastUpdated: new Date().toISOString()
  };
  
  return datasets[index];
}

// Delete dataset
export async function deleteDataset(id: string): Promise<boolean> {
  await new Promise(res => setTimeout(res, 300));
  const initialLength = datasets.length;
  datasets = datasets.filter(ds => ds.id !== id);
  return datasets.length < initialLength;
}

// Increment download count
export async function incrementDownloads(id: string): Promise<void> {
  await new Promise(res => setTimeout(res, 300));
  const dataset = datasets.find(ds => ds.id === id);
  if (dataset) {
    dataset.downloads += 1;
  }
}