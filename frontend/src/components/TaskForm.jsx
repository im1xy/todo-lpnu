import React, { useState } from 'react';

const TaskForm = ({
    task,
    onSubmit,
    onCancel,
    submitLabel,
    customLists,
}) => {
    const [formData, setFormData] = useState(task);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTask = { ...formData };
        
        if (updatedTask.lists.includes('today')) {
            const today = new Date().toISOString().split('T')[0];
            updatedTask.dueDate = today;
        }

        onSubmit(updatedTask);
    };

    const systemLists = [
        { id: 'today' },
        { id: 'planned' },
        { id: 'upcoming' },
    ];

    const handleListToggle = (listId) => {
        const lists = formData.lists || [];
        const newLists = lists.includes(listId)
            ? lists.filter(id => id !== listId)
            : [...lists, listId];

        const updatedFormData = { ...formData, lists: newLists };

        if (listId === 'today' && !lists.includes('today')) {
            const today = new Date().toISOString().split('T')[0];
            updatedFormData.dueDate = today;
        }

        setFormData(updatedFormData);
    };

    const isDateDisabled = formData.lists.includes('today');

    return (
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task title"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <div className="flex space-x-4">
            <input
              type="date"
              value={formData.dueDate || ''}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className={`flex-1 px-4 py-2 border rounded-lg ${isDateDisabled ? 'bg-gray-100' : ''}`}
              disabled={isDateDisabled}
              required
            />
            <input
              type="time"
              value={formData.time || ''}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="flex-1 px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lists</label>
            <div className="space-y-2">
              {systemLists.map((list) => (
                <label key={list.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.lists?.includes(list.id) || false}
                    onChange={() => handleListToggle(list.id)}
                    className="rounded text-blue-600"
                  />
                  <span>{list.id}</span>
                  {list.id === 'today' && formData.lists?.includes('today') && (
                    <span className="text-sm text-gray-500">(Today's date will be used)</span>
                  )}
                </label>
              ))}
              {customLists.map((list) => (
                <label key={list.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.lists?.includes(list.id) || false}
                    onChange={() => handleListToggle(list.id)}
                    className="rounded text-blue-600"
                  />
                  <span>{list.id}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {submitLabel}
            </button>
          </div>
        </div>
      </form>
    );
};

export default TaskForm;