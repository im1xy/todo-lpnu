import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, ListTodo, Plus, Trash2, Folder, Briefcase, Home, Heart, Star, LogOut, Pencil } from 'lucide-react';
import ListEditModal from './ListEditModal';
import NewListModal from './NewListModal';

const icons = {
    Folder,
    Briefcase,
    Home,
    Heart,
    Star
};

const ListSidebar = ({
    selectedList,
    setSelectedList,
    customLists,
    onAddList,
    onUpdateList,
    onDeleteList,
    onLogout,
    user,
    onCalendarClick,
}) => {
    const [showListModal, setShowListModal] = useState(false);
    const [editingList, setEditingList] = useState(null);   
    const systemLists = [
        { id: 'all', icon: ListTodo },
        { id: 'today', icon: CheckCircle2 },
        { id: 'planned', icon: Calendar },
        { id: 'upcoming', icon: Clock },
    ];

    function capitalize(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
    
    return (
      <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1">
              <div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="text-gray-400 hover:text-red-500"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>    
          <button
            onClick={onCalendarClick}
            className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg mb-6 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            <span>Open Calendar</span>
          </button> 
          <nav className="space-y-1">
            {systemLists.map((list) => {
              const Icon = list.icon;
              return (
                <button
                  key={list.id}
                  onClick={() => setSelectedList(list.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    selectedList === list.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{capitalize(list.id)}</span>
                </button>
              );
            })}
          </nav>    
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Custom Lists</h3>
              <button
                onClick={() => setShowListModal(true)}
                className="text-gray-400 hover:text-blue-600"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>  
            <div className="space-y-1">
              {customLists.map((list) => {
                const Icon = icons[list.icon];
                return (
                  <div
                    key={list.id}
                    className={`group flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                      selectedList === list.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <button
                      onClick={() => setSelectedList(list.id)}
                      className="flex items-center space-x-3 flex-1 text-left"
                    >
                      <Icon className={`w-5 h-5 text-${list.color}-500`} />
                      <span>{list.id}</span>
                    </button>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => setEditingList(list)}
                        className="text-gray-400 hover:text-blue-500 p-1"
                        title="Edit List"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteList(list.id)}
                        className="text-gray-400 hover:text-red-500 p-1"
                        title="Delete List"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>  
        {editingList && (
          <ListEditModal
            list={editingList}
            onUpdate={onUpdateList}
            onClose={() => setEditingList(null)}
            customLists={customLists}
          />
        )}  
        {showListModal && (
          <NewListModal
            onAdd={onAddList}
            onClose={() => setShowListModal(false)}
            customLists={customLists}
          />
        )}
      </div>
    );
};

export default ListSidebar;