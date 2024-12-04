import React from 'react';
import { X, Calendar as CalendarIcon, Clock, CheckCircle, Tag } from 'lucide-react';

const TaskDetailsModal = ({ task, customLists, onClose }) => {
    const getListName = (listId) => {
        const systemLists = {
            all: 'All Tasks',
            today: 'Today',
            planned: 'Planned',
            upcoming: 'Upcoming'
        };
      
        if (listId in systemLists) {
            return systemLists[listId];
        }
      
        const customList = customLists.find(list => list.id === listId);
        return customList ? customList.id : listId;
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70]">
        <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className={`mt-1 ${task.completed ? 'text-green-500' : 'text-blue-500'}`}>
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
                {task.description && (
                  <p className="mt-2 text-gray-600">{task.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-6 text-gray-500">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5" />
                <span>{task.dueDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{task.time}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2 text-gray-500">
                <Tag className="w-5 h-5" />
                <span>Lists</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {task.lists.map(listId => (
                  <span
                    key={listId}
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                  >
                    {getListName(listId)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default TaskDetailsModal;