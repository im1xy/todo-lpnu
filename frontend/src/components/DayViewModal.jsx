import React from 'react';
import { X, Clock, CheckCircle } from 'lucide-react';

const DayViewModal = ({
    date,
    tasks,
    customLists,
    onClose,
    onTaskClick,
}) => {
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };  
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

    const sortedTasks = [...tasks].sort((a, b) => {
        return a.time.localeCompare(b.time);
    });

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
        <div className="bg-white rounded-xl w-full max-w-lg p-6 relative max-h-[80vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button> 
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {formatDate(date)}
          </h2> 
          {sortedTasks.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No tasks scheduled for this day</p>
          ) : (
            <div className="space-y-4">
              {sortedTasks.map(task => (
                <button
                  key={task.id}
                  onClick={() => onTaskClick(task)}
                  className="w-full text-left p-4 rounded-lg border hover:shadow-md transition-shadow group bg-white"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`mt-1 ${task.completed ? 'text-green-500' : 'text-blue-500'}`}>
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                          {task.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{task.time}</span>
                        </div>
                      </div>
                      {task.description && (
                        <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {task.lists.map(listId => (
                          <span
                            key={listId}
                            className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full"
                          >
                            {getListName(listId)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
};

export default DayViewModal;