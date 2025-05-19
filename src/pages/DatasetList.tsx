import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Dataset } from '../types';
import { useAuth } from '../AuthContext';
import { fetchHospitalDatasets, fetchPublicDatasets } from '../api';

const DatasetList = () => {
  const { hospital } = useAuth();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'downloads'>('date');
  const [filterType, setFilterType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'all' | 'my'>('my');

  useEffect(() => {
    const loadDatasets = async () => {
      setLoading(true);
      try {
        if (viewMode === 'my' && hospital) {
          const hospitalDatasets = await fetchHospitalDatasets(hospital.id);
          setDatasets(hospitalDatasets);
        } else {
          const publicDatasets = await fetchPublicDatasets();
          setDatasets(publicDatasets);
        }
      } catch (error) {
        console.error('Error loading datasets:', error);
      }
      setLoading(false);
    };

    loadDatasets();
  }, [viewMode, hospital]);

  const filteredDatasets = datasets
    .filter((dataset) => {
      const matchesSearch = 
        dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dataset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dataset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        dataset.hospitalName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = filterType === 'all' || dataset.fileType.toLowerCase() === filterType.toLowerCase();
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'downloads':
          return b.downloads - a.downloads;
        default:
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      }
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Datasets</h1>
          <p className="text-gray-400">
            {filteredDatasets.length} dataset{filteredDatasets.length !== 1 ? 's' : ''} available
          </p>
        </div>
        
        {hospital && (
          <div className="mt-4 md:mt-0">
            <Link
              to="/create"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
            >
              <span className="mr-2">+</span>
              Upload Dataset
            </Link>
          </div>
        )}
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search datasets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'date' | 'downloads')}
            className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="downloads">Sort by Downloads</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="csv">CSV</option>
            <option value="json">JSON</option>
          </select>

          {hospital && (
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as 'all' | 'my')}
              className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="my">My Datasets</option>
              <option value="all">All Public Datasets</option>
            </select>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDatasets.map((dataset) => (
          <Link
            key={dataset.id}
            to={`/datasets/${dataset.id}`}
            className="block bg-gray-800 rounded-lg border border-gray-700 hover:border-primary-500 transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/10"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-100 line-clamp-1">
                  {dataset.name}
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs font-medium bg-primary-900 text-primary-300 rounded-full">
                    {dataset.fileType}
                  </span>
                  {dataset.visibility === 'private' && (
                    <span className="px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded-full">
                      Private
                    </span>
                  )}
                </div>
              </div>
              
              <p className="text-gray-300 mb-4 line-clamp-2">
                {dataset.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {dataset.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-400">
                <div className="flex items-center space-x-4">
                  <span>{dataset.hospitalName}</span>
                  <span>{new Date(dataset.lastUpdated).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>⬇</span>
                  <span>{dataset.downloads}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredDatasets.length === 0 && (
        <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-gray-300 text-lg mb-4">No datasets found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterType('all');
              setSortBy('date');
            }}
            className="text-primary-400 hover:text-primary-300"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default DatasetList;