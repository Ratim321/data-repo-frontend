// src/api.ts
// Mock API for hospital login and dataset management

export interface Hospital {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  tags: string[];
  fileType: string;
  createdAt: string;
  hospitalId: string;
}

// Mock hospital credentials
const hospitals: Hospital[] = [
  {
    id: 'hosp1',
    name: 'City General Hospital',
    email: 'citygen@example.com',
    password: 'password123',
  },
  {
    id: 'hosp2',
    name: 'Metro Health Center',
    email: 'metrohealth@example.com',
    password: 'secure456',
  },
];

// Mock datasets
let datasets: Dataset[] = [
  {
    id: 'ds1',
    name: 'COVID-19 Patient Records',
    description: 'Anonymized patient data from COVID-19 cases in 2020.',
    tags: ['covid-19', 'patients', '2020'],
    fileType: 'CSV',
    createdAt: new Date().toISOString(),
    hospitalId: 'hosp1',
  },
  {
    id: 'ds2',
    name: 'Heart Disease Study',
    description: 'Dataset from a 5-year heart disease study.',
    tags: ['cardiology', 'study', 'heart disease'],
    fileType: 'JSON',
    createdAt: new Date().toISOString(),
    hospitalId: 'hosp2',
  },
];

// Mock login function
export async function loginHospital(email: string, password: string): Promise<Hospital | null> {
  const hospital = hospitals.find(h => h.email === email && h.password === password);
  // Simulate network delay
  await new Promise(res => setTimeout(res, 500));
  return hospital || null;
}

// Fetch all datasets
export async function fetchDatasets(): Promise<Dataset[]> {
  await new Promise(res => setTimeout(res, 300));
  return datasets;
}

// Fetch datasets for a specific hospital
export async function fetchHospitalDatasets(hospitalId: string): Promise<Dataset[]> {
  await new Promise(res => setTimeout(res, 300));
  return datasets.filter(ds => ds.hospitalId === hospitalId);
}

// Add a new dataset
export async function addDataset(dataset: Omit<Dataset, 'id' | 'createdAt'>): Promise<Dataset> {
  const newDataset: Dataset = {
    ...dataset,
    id: 'ds' + (datasets.length + 1),
    createdAt: new Date().toISOString(),
  };
  datasets = [newDataset, ...datasets];
  await new Promise(res => setTimeout(res, 300));
  return newDataset;
} 