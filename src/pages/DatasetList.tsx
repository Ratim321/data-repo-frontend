import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDatasets, deleteDataset, Dataset } from '../api';

const DatasetList: React.FC = () => {
    const [datasets, setDatasets] = useState<Dataset[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDatasets();
    }, []);

    const fetchDatasets = async () => {
        try {
            const data = await getDatasets();
            setDatasets(data);
        } catch (err) {
            setError('Failed to fetch datasets');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this dataset?')) {
            return;
        }

        try {
            await deleteDataset(id);
            setDatasets(datasets.filter(ds => ds.id !== id));
        } catch (err) {
            setError('Failed to delete dataset');
            console.error(err);
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-900 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-100">Datasets</h1>
                <Link
                    to="/create"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    Create Dataset
                </Link>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-900 border border-red-700 rounded-md text-red-200">
                    {error}
                </div>
            )}

            {datasets.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-400">No datasets found. Create your first dataset!</p>
                </div>
            ) : (
                <div className="bg-gray-800 shadow overflow-hidden sm:rounded-md border border-gray-700">
                    <ul className="divide-y divide-gray-700">
                        {datasets.map((dataset) => (
                            <li key={dataset.id}>
                                <div className="px-4 py-4 sm:px-6 bg-gray-800">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                            <Link
                                                to={`/datasets/${dataset.id}`}
                                                className="text-lg font-medium text-indigo-400 hover:text-indigo-200"
                                            >
                                                {dataset.name}
                                            </Link>
                                            <p className="mt-1 text-sm text-gray-300">
                                                {dataset.description}
                                            </p>
                                        </div>
                                        <div className="ml-4 flex-shrink-0 flex space-x-4">
                                            {dataset.file_type && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-200 border border-gray-600">
                                                    {dataset.file_type.toUpperCase()}
                                                </span>
                                            )}
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-200 border border-gray-600">
                                                {formatFileSize(dataset.size)}
                                            </span>
                                            {dataset.is_public && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300 border border-green-700">
                                                    Public
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-2 flex justify-between items-center">
                                        <div className="text-sm text-gray-400">
                                            Created {new Date(dataset.created_at).toLocaleDateString()}
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleDelete(dataset.id)}
                                                className="text-red-400 hover:text-red-200"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DatasetList;