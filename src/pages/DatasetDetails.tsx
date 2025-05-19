import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Dataset } from '../types';
import { useAuth } from '../AuthContext';
import { fetchHospitalDatasets, fetchPublicDatasets } from '../api';

const DatasetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hospital } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'preview' | 'metadata'>('overview');
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDataset = async () => {
      try {
        const datasets = hospital 
          ? await fetchHospitalDatasets(hospital.id)
          : await fetchPublicDatasets();
        
        const found = datasets.find(d => d.id === id);
        setDataset(found || null);
      } catch (error) {
        console.error('Error loading dataset:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDataset();
  }, [id, hospital]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-100 mb-4">
          Loading...
        </h1>
      </div>
    );
  }

  if (!dataset) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-100 mb-4">
          Dataset not found
        </h1>
        <button
          onClick={() => navigate('/datasets')}
          className="text-primary-400 hover:text-primary-300"
        >
          Back to Datasets
        </button>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300">{dataset.description}</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-gray-100 mb-2">File Information</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-400">File Type</dt>
                    <dd className="text-gray-100">{dataset.fileType}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-400">Created</dt>
                    <dd className="text-gray-100">
                      {new Date(dataset.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-gray-100 mb-2">Statistics</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-400">Number of Tags</dt>
                    <dd className="text-gray-100">{dataset.tags.length}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-400">Last Updated</dt>
                    <dd className="text-gray-100">
                      {new Date(dataset.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        );
      case 'preview':
        return (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Column 1
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Column 2
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Column 3
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Data 1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Data 2</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Data 3</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Data 4</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Data 5</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Data 6</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'metadata':
        return (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <pre className="text-sm text-gray-300 overflow-x-auto">
              {JSON.stringify(
                {
                  id: dataset.id,
                  name: dataset.name,
                  description: dataset.description,
                  tags: dataset.tags,
                  fileType: dataset.fileType,
                  createdAt: dataset.createdAt,
                  metadata: {
                    rows: 1000,
                    columns: 10,
                    size: '2.5MB',
                    lastModified: dataset.createdAt,
                  },
                },
                null,
                2
              )}
            </pre>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/datasets')}
        className="text-primary-400 hover:text-primary-300 mb-6 flex items-center"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Datasets
      </button>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">
              {dataset.name}
            </h1>
            <div className="flex flex-wrap gap-2">
              {dataset.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'preview', label: 'Preview' },
              { id: 'metadata', label: 'Metadata' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default DatasetDetails;