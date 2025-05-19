import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDataset, checkAuth } from '../api';

const CreateDataset: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [files, setFiles] = useState<FileList | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Check if user is logged in
        const verifyAuth = async () => {
            try {
                await checkAuth();
            } catch (err) {
                console.error('Authentication error:', err);
                navigate('/login');
            }
        };
        verifyAuth();
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!files || files.length === 0) {
            setError('Please select at least one file');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('title', name);
            formData.append('description', description);
            formData.append('is_public', String(isPublic));
            formData.append('file', files[0]);

            await createDataset(formData);
            navigate('/datasets');
        } catch (err: any) {
            console.error('Error creating dataset:', err);
            if (err.response?.status === 403) {
                setError('Please log in to create a dataset');
                navigate('/login');
            } else if (err.response?.status === 400) {
                setError(err.response.data.message || 'Invalid data provided');
            } else {
                setError('Failed to create dataset. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-900 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-gray-100">Create New Dataset</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg border border-gray-700 shadow">
                <div>
                    <label className="block text-sm font-medium text-gray-300">
                        Dataset Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300">
                        Files
                    </label>
                    <input
                        type="file"
                        multiple
                        onChange={(e) => setFiles(e.target.files)}
                        className="mt-1 block w-full text-gray-100 file:bg-gray-700 file:text-gray-100 file:border-0 file:rounded file:px-4 file:py-2 file:mr-4"
                    />
                    <p className="mt-1 text-sm text-gray-400">
                        You can select multiple files. They will be automatically zipped if more than one file is selected.
                    </p>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 bg-gray-900 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-300">
                        Make this dataset public
                    </label>
                </div>

                {error && (
                    <div className="text-red-400 text-sm">{error}</div>
                )}

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/datasets')}
                        className="px-4 py-2 border border-gray-700 rounded-md text-sm font-medium text-gray-300 bg-gray-900 hover:bg-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Dataset'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateDataset;