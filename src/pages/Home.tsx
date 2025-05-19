import { Link } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const features = [
    {
      title: 'Easy Dataset Management',
      description: 'Upload, organize, and share your datasets with ease.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
    },
    {
      title: 'Advanced Search',
      description: 'Find datasets quickly with our powerful search capabilities.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      title: 'Data Visualization',
      description: 'Preview and analyze your data with built-in visualization tools.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
          Welcome to DataRepo
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Your platform for sharing and discovering datasets. Upload, explore, and collaborate with the data science community.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search datasets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Link
            to="/datasets"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Browse Datasets
          </Link>
          <Link
            to="/create"
            className="bg-gray-800 text-gray-100 border border-gray-700 px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Create Dataset
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mt-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-primary-500 transition-colors animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-primary-400 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Datasets', value: '1,234' },
          { label: 'Users', value: '567' },
          { label: 'Downloads', value: '89K' },
          { label: 'Categories', value: '42' },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center"
          >
            <div className="text-2xl font-bold text-primary-400">{stat.value}</div>
            <div className="text-gray-300">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home; 