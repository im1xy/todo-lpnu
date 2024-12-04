import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle, Pencil } from 'lucide-react';
import TaskForm from './TaskForm';

const TaskList = ({
    tasks,
    onToggle,
    onDelete,
    onAdd,
    onUpdate,
    selectedList,
    customLists,
}) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const emptyTask = {
        title: '',
        description: '',
        dueDate: '',
        time: '',
        lists: selectedList === 'all' ? [] : [selectedList],
        completed: false,
    };

    const handleAdd = (task) => {
        onAdd(task);
        setShowAddForm(false);
    };

    const handleUpdate = (task) => {
        if (editingTask) {
            onUpdate(editingTask.id, task);
            setEditingTask(null);
        }
    };

    const getListInfo = (listId) => {
        const customList = customLists.find(list => list.id === listId);
        
        return customList ? {
            id: customList.id,
            description: customList.description
        } : {
            id: listId,
            description: null
        };
    };  

    const listInfo = getListInfo(selectedList);

    const filteredTasks = tasks.filter(task => 
        selectedList === 'all' ? true : task.lists.includes(selectedList)
    );

    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {listInfo.name} Tasks
              </h1>
              {listInfo.description && (
                <p className="mt-2 text-gray-600">{listInfo.description}</p>
              )}
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {showAddForm && (
          <TaskForm
            task={emptyTask}
            onSubmit={handleAdd}
            onCancel={() => setShowAddForm(false)}
            submitLabel="Add Task"
            customLists={customLists}
          />
        )}

        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task.id}>
              {editingTask?.id === task.id ? (
                <TaskForm
                  task={editingTask}
                  onSubmit={handleUpdate}
                  onCancel={() => setEditingTask(null)}
                  submitLabel="Update Task"
                  customLists={customLists}
                />
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <button
                        onClick={() => onToggle(task.id)}
                        className={`mt-1 ${
                          task.completed ? 'text-green-500' : 'text-gray-400'
                        }`}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <div>
                        <h3
                          className={`text-lg font-medium ${
                            task.completed ? 'line-through text-gray-400' : 'text-gray-900'
                          }`}
                        >
                          {task.title}
                        </h3>
                        <p className="text-gray-600 mt-1">{task.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-500">{task.dueDate}</span>
                          <span className="text-sm text-gray-500">{task.time}</span>
                          <div className="flex flex-wrap gap-2">
                            {task.lists.map(listId => (
                              <span
                                key={listId}
                                className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full"
                              >
                                {getListInfo(listId).id}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingTask(task)}
                        className="text-gray-400 hover:text-blue-500"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDelete(task.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
};

export default TaskList;