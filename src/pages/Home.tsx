import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../contexts/UserContext';

const Home = () => {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState('');

  const features = [
    {
      title: 'Secure Data Sharing',
      description: 'Share medical datasets securely with other healthcare institutions.',
      icon: '🔒'
    },
    {
      title: 'Advanced Analytics',
      description: 'Analyze and visualize healthcare data with powerful tools.',
      icon: '📊'
    },
    {
      title: 'HIPAA Compliant',
      description: 'All data handling follows strict HIPAA compliance guidelines.',
      icon: '✓'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {user ? (
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
            Welcome, {user.username}
          </h1>
          <div className="flex justify-center space-x-4">
            <Link
              to="/datasets"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              View Your Datasets
            </Link>
            <Link
              to="/create"
              className="bg-gray-800 text-gray-100 border border-gray-700 px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Upload New Dataset
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
            Healthcare Data Repository
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            A secure platform for healthcare institutions to share and discover medical datasets.
          </p>
          <Link
            to="/login"
            className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Login to Your Account
          </Link>
        </div>
      )}

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mt-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-primary-500 transition-colors animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      {user && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Recent Activity</h2>
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <div className="text-gray-300">New dataset uploaded: COVID-19 Vaccination Data</div>
              <div className="text-sm text-gray-400">2 hours ago</div>
            </div>
            <div className="p-4 border-b border-gray-700">
              <div className="text-gray-300">Dataset downloaded: Patient Outcomes 2023</div>
              <div className="text-sm text-gray-400">1 day ago</div>
            </div>
            <div className="p-4">
              <div className="text-gray-300">Dataset updated: Emergency Room Analytics</div>
              <div className="text-sm text-gray-400">2 days ago</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;