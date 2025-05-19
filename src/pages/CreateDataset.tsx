import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dataset, CreateDatasetForm } from '../types';

interface CreateDatasetProps {
  onAddDataset: (dataset: Dataset) => void;
}

const CreateDataset = ({ onAddDataset }: CreateDatasetProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateDatasetForm>({
    name: '',
    description: '',
    tags: '',
    file: null,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
      // Generate preview for CSV/JSON files
      if (file.type === 'text/csv' || file.name.endsWith('.json')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsText(file);
      }
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
      setFormData((prev) => ({ ...prev, file }));
      if (file.type === 'text/csv' || file.name.endsWith('.json')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsText(file);
      }
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.file) {
      alert('Please fill in all required fields');
      return;
    }

    const newDataset: Dataset = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      tags: formData.tags.split(',').map((tag) => tag.trim()),
      fileType: formData.file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
      createdAt: new Date().toISOString(),
    };

    onAddDataset(newDataset);
    navigate('/datasets');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-8">Create Dataset</h1>
      
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
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
              placeholder="Enter dataset name"
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
              placeholder="Describe your dataset"
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
              placeholder="e.g., machine learning, data science"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Data File *
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
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-300">
                  Drag and drop your file here, or click to select
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Supported formats: CSV, JSON
                </p>
              </label>
            </div>
            {formData.file && (
              <p className="mt-2 text-sm text-gray-300">
                Selected file: {formData.file.name}
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
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Create Dataset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDataset; 