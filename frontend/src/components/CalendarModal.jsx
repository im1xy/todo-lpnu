import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import TaskDetailsModal from './TaskDetailsModal';
import DayViewModal from './DayViewModal';

const CalendarModal = ({ tasks, customLists, onClose }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);   

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const getTasksForDate = (day) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        const dateStr = `${year}-${month}-${dayStr}`;
        return tasks.filter(task => task.dueDate === dateStr);
    };

    const isToday = (day) => {
        const today = new Date();
        return today.getDate() === day && 
               today.getMonth() === currentDate.getMonth() && 
               today.getFullYear() === currentDate.getFullYear();
    };

    const handleDayClick = (day) => {
        const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDay(clickedDate);
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; 
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-3xl relative">
          <div className="p-4 border-b flex items-center">
            <div className="w-[180px]">
              <h2 className="text-xl font-semibold text-gray-900">
                {monthName} {year}
              </h2>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={previousMonth}
                  className="p-1 hover:bg-white rounded transition-colors"
                  title="Previous month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-2 py-1 text-sm hover:bg-white rounded transition-colors"
                  title="Today"
                >
                  Today
                </button>
                <button
                  onClick={nextMonth}
                  className="p-1 hover:bg-white rounded transition-colors"
                  title="Next month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="w-[180px] flex justify-end">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                title="Close calendar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>    
          <div className="p-4">
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-1">
                  {day}
                </div>
              ))}   
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} className="h-24" />
              ))}   
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const tasksForDay = getTasksForDate(day);
                const remainingTasks = tasksForDay.length - 1;  
                return (
                  <div
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className={`h-24 border rounded-lg p-2 cursor-pointer ${
                      isToday(day) ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                    } transition-colors relative`}
                  >
                    <div className="font-medium text-sm mb-1">{day}</div>
                    <div className="space-y-1">
                      {tasksForDay.length > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTaskClick(tasksForDay[0]);
                          }}
                          className="w-full text-left text-xs p-1.5 rounded bg-white shadow-sm hover:shadow-md transition-shadow group"
                        >
                          <div className="flex items-center space-x-1">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                tasksForDay[0].completed ? 'bg-green-500' : 'bg-blue-500'
                              }`}
                            />
                            <span className="truncate group-hover:text-blue-600">
                              {tasksForDay[0].title}
                            </span>
                          </div>
                          <div className="text-gray-500 mt-0.5 text-[10px]">
                            {tasksForDay[0].time}
                          </div>
                        </button>
                      )}
                      {remainingTasks > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDayClick(day);
                          }}
                          className="w-full text-center text-[10px] py-1 px-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                        >
                          +{remainingTasks} more {remainingTasks === 1 ? 'task' : 'tasks'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>  
        {selectedTask && (
          <TaskDetailsModal
            task={selectedTask}
            customLists={customLists}
            onClose={() => setSelectedTask(null)}
          />
        )}  
        {selectedDay && (
          <DayViewModal
            date={selectedDay}
            tasks={getTasksForDate(selectedDay.getDate())}
            customLists={customLists}
            onClose={() => setSelectedDay(null)}
            onTaskClick={handleTaskClick}
          />
        )}
      </div>
    );
};

export default CalendarModal;