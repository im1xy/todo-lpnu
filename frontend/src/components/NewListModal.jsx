import React, { useState } from 'react';
import { X } from 'lucide-react';

const NewListModal = ({ onAdd, onClose, customLists }) => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState(
    {
        id: '',
        icon: 'Folder',
        color: 'blue',
        description: ''
    }); 
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const isDuplicate = customLists.some(
            list => list.id.toLowerCase() === formData.id.toLowerCase()
        );
      
        if (isDuplicate) {
          setError('A list with this name already exists');
          return;
        }

        onAdd(formData);
        onClose();
    };
    
    const icons = ['Folder', 'Briefcase', 'Home', 'Heart', 'Star'];
    const colors = ['blue', 'green', 'red', 'yellow', 'purple', 'pink'];    
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
    
            <h2 className="text-2xl font-bold mb-6">Create New List</h2>
    
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  List Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.id}
                  onChange={(e) => {
                    setFormData({ ...formData, id: e.target.value });
                    setError('');
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    error ? 'border-red-500' : ''
                  }`}
                  required
                />
                {error && (
                  <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
              </div>
    
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                  placeholder="Add a description for this list..."
                />
              </div>
    
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
                    Icon
                  </label>
                  <select
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {icons.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
    
                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                    Color
                  </label>
                  <select
                    id="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {colors.map((color) => (
                      <option key={color} value={color}>
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
    
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create List
                </button>
              </div>
            </form>
          </div>
        </div>
      );
};

export default NewListModal;