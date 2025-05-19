// src/api.ts
// Mock API for hospital login and dataset management

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Helper function to get CSRF token
function getCookie(name: string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'X-CSRFToken': getCookie('csrftoken'),
    }
});

// Add request interceptor to ensure CSRF token is always present
api.interceptors.request.use((config) => {
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
});

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
  id: number;
  name: string;
  description: string;
  file: string;
  file_type: string;
  size: number;
  created_at: string;
  updated_at: string;
  is_public: boolean;
}

export interface User {
    id: number;
    username: string;
    email: string;
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
export const login = async (username: string, password: string) => {
    const response = await api.post('/auth/login/', { username, password });
    return response.data;
};

export const logout = async () => {
    const response = await api.post('/auth/logout/');
    return response.data;
};

// Fetch all public datasets
export const getDatasets = async () => {
    const response = await api.get<Dataset[]>('/datasets/');
    return response.data;
};

// Fetch datasets for a specific hospital (including private)
export const getDataset = async (id: number) => {
    const response = await api.get<Dataset>(`/datasets/${id}/`);
    return response.data;
};

// Add a new dataset
export const createDataset = async (formData: FormData) => {
    const response = await api.post<Dataset>('/datasets/create/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Update dataset
export const updateDataset = async (id: number, data: Partial<Dataset>) => {
    const response = await api.patch<Dataset>(`/datasets/${id}/`, data);
    return response.data;
};

// Delete dataset
export const deleteDataset = async (id: number) => {
    const response = await api.delete(`/datasets/${id}/`);
    return response.data;
};

// Increment download count
export const downloadDataset = async (id: number) => {
    const response = await api.get(`/datasets/${id}/download/`, {
        responseType: 'blob',
    });
    return response.data;
};

// Check if user is authenticated
export const checkAuth = async () => {
    try {
        const response = await api.get('/users/profile/');
        return response.data;
    } catch (error) {
        throw error;
    }
};