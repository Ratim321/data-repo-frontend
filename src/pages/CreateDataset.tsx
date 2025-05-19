import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { CreateDatasetForm, Dataset } from '../types';
import { addDataset } from '../api';

const CreateDataset = () => {
  const navigate = useNavigate();
  const { hospital } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateDatasetForm>({
    name: '',
    description: '',
    tags: '',
    file: null,
    visibility: 'private'
  });
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setFormData((prev) => ({ ...prev, file }));
      if (file.type === 'text/csv' || file.name.endsWith('.json')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsText(file);
      }
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setFormData((prev) => ({ ...prev, file }));
      if (file.type === 'text/csv' || file.name.endsWith('.json')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsText(file);
      }
      setError(null);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Dataset name is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (!formData.file) {
      setError('Please upload a file');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    if (!hospital) return;

    setLoading(true);
    try {
      const newDataset: Partial<Dataset> = {
        name: formData.name,
        description: formData.description,
        tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        fileType: formData.file!.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
        hospitalId: hospital.id,
        hospitalName: hospital.name,
        visibility: formData.visibility,
        size: `${(formData.file!.size / 1024 / 1024).toFixed(2)} MB`
      };

      await addDataset(newDataset as Dataset);
      navigate('/datasets');
    } catch (error) {
      setError('Failed to create dataset. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-8">Upload New Dataset</h1>
      
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Dataset Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter a descriptive name for your dataset"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Provide a detailed description of your dataset"
              required
            />
          </div>

          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., covid-19, patients, research"
            />
          </div>

          <div>
            <label
              htmlFor="visibility"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Visibility
            </label>
            <select
              id="visibility"
              name="visibility"
              value={formData.visibility}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="private">Private - Only your institution</option>
              <option value="public">Public - All institutions</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Data File * (Max 10MB)
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDragging
                  ? 'border-primary-500 bg-primary-900/20'
                  : 'border-gray-700 hover:border-primary-500'
              } transition-colors`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".csv,.json"
                required
              />
              <label
                htmlFor="file"
                className="cursor-pointer block"
              >
                <div className="text-4xl mb-4">📄</div>
                <p className="mt-2 text-sm text-gray-300">
                  Drag and drop your file here, or click to select
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Supported formats: CSV, JSON (Max 10MB)
                </p>
              </label>
            </div>
            {formData.file && (
              <p className="mt-2 text-sm text-gray-300">
                Selected file: {formData.file.name} ({(formData.file.size / 1024 / 1024).toFixed(2)}MB)
              </p>
            )}
          </div>

          {preview && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-200 mb-2">File Preview</h3>
              <div className="bg-gray-900 rounded-lg p-4 max-h-60 overflow-auto">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                  {preview}
                </pre>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-4">
            <button
              onClick={() => navigate('/datasets')}
              className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                'Upload Dataset'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDataset;