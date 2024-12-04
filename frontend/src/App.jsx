import React, { useState, useEffect } from 'react';
import AuthPage from './pages/AuthPage';
import ListSidebar from './components/ListSidebar';
import TaskList from './components/TaskList';
import CalendarModal from './components/CalendarModal';
import ErrorModal from './components/ErrorModal';
import { handleSignOut } from './services/auth';

import { mongoCreateTask, mongoReadTasks, mongoUpdateTask, mongoDeleteTask } from './services/mongo/tasks';
import { mongoCreateList, mongoReadLists, mongoUpdateList, mongoDeleteList } from './services/mongo/lists';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
      return localStorage.getItem('isLoggedIn') === 'true';
    });
    
    const [user, setUser] = useState(() => {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : {};
    });

    const [selectedList, setSelectedList] = useState(() => {
      return (localStorage.getItem('selectedList')) || 'all';
    });
    
    const [customLists, setCustomLists] = useState(() => {
      const savedLists = localStorage.getItem('customLists');
      return savedLists ? JSON.parse(savedLists) : [];
    });

    const [tasks, setTasks] = useState(() => {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [view, setView] = useState('list');
    const [showCalendar, setShowCalendar] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = (email) => {
        loadData(email);
        setIsLoggedIn(true);
        setUser({ 
            name: email.split('@')[0], 
            email: email 
        });
    };

    const handleLogout = () => {
        setCustomLists([]);
        setTasks([]);
        setIsLoggedIn(false);
        setUser({ name: '', email: '' });
        clearLocalStorage();
        handleSignOut();
    };

    const loadData = (email) => {
        mongoReadLists(email).then(result =>
            setCustomLists(result)
        );
        mongoReadTasks(email).then(result =>
            setTasks(result)
        );
    };

    const updateLocalStorage = () => {
        localStorage.setItem('isLoggedIn', isLoggedIn.toString());
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('selectedList', selectedList);
        localStorage.setItem('customLists', JSON.stringify(customLists));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const clearLocalStorage = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        localStorage.removeItem('selectedList');
        localStorage.removeItem('customLists');
        localStorage.removeItem('tasks');
    }

    const addTask = (task) => {
        const newTask = {
            ...task,
            id: Math.random().toString(36).substr(2, 9)
        };
        setTasks([...tasks, newTask]);
        mongoCreateTask(user.email, newTask);
    };
    
    const updateTask = (taskId, updatedTask) => {
        const newTask = { ...updatedTask, id: taskId }
        setTasks(tasks.map(task => task.id === taskId ? newTask : task));
        mongoUpdateTask(user.email, taskId, newTask);
    };
    
    const toggleTask = (taskId) => {
        const oldTask = tasks.find(task => task.id === taskId);
        const newTask = { ...oldTask, completed: !oldTask.completed };
        setTasks(tasks.map(task => task.id === taskId ? newTask : task));
        mongoUpdateTask(user.email, taskId, newTask);
    };
    
    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
        mongoDeleteTask(user.email, taskId);
    };
    
    const addCustomList = (list) => {
        setCustomLists([...customLists, list]);
        mongoCreateList(user.email, list);
    };
    
    const updateCustomList = (listId, updatedList) => {
        const tasksInList = tasks.some(task => task.lists.includes(listId));

        if (tasksInList && updatedList.id !== listId) {
            setError('Cannot edit list name that contains tasks.');
            return;
        }

        setCustomLists(customLists.map(list => list.id === listId ? updatedList : list));
        mongoUpdateList(user.email, listId, updatedList);
    };
    
    const deleteCustomList = (listId) => {
        const tasksInList = tasks.some(task => task.lists.includes(listId));
        
        if (tasksInList) {
            setError('Cannot delete list that contains tasks. Please remove or move all tasks first.');
            return;
        }
        
        setCustomLists(customLists.filter(list => list.id !== listId));
        mongoDeleteList(user.email, listId);
        if (selectedList === listId) {
            setSelectedList('all');
        }
    };

    useEffect(() => {
        updateLocalStorage();
    }, [isLoggedIn, user, selectedList, customLists, tasks]);

    if (!isLoggedIn) {
        return <AuthPage onLogin={handleLogin} />;
    }

    return (
        <div>
            <div className="min-h-screen bg-gray-50 flex">
                <ListSidebar
                    selectedList={selectedList}
                    setSelectedList={setSelectedList}
                    customLists={customLists}
                    onAddList={addCustomList}
                    onUpdateList={updateCustomList}
                    onDeleteList={deleteCustomList}
                    onLogout={handleLogout}
                    user={user}
                    view={view}
                    setView={setView}
                    onCalendarClick={() => setShowCalendar(true)}
                />

                <main className="flex-1 p-8 overflow-auto">
                    <TaskList
                        tasks={tasks}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                        onAdd={addTask}
                        onUpdate={updateTask}
                        selectedList={selectedList}
                        customLists={customLists}
                    />
                </main>

                {showCalendar && (
                    <CalendarModal
                        tasks={tasks}
                        customLists={customLists}
                        onClose={() => setShowCalendar(false)}
                    />
                )}
                {error && (
                    <ErrorModal
                        message={error}
                        onClose={() => setError(null)}
                    />
                )}
            </div>
        </div>
    )
};

export default App;