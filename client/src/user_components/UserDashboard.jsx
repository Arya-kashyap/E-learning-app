import React, { useState } from 'react';
import { RiAlignLeft } from "react-icons/ri";
import { Link, Outlet } from 'react-router-dom';

function UserDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900 mt-16">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 flex-shrink-0">
        <nav className="space-y-4">
          <Link to="/user-dashboard" className="block hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1">Home</Link>
          <Link to="/user-dashboard/mypurchased" className="block hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1">My Purchased</Link>
        </nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={closeSidebar}
        >
          <aside
            className="fixed top-14 left-0 h-full w-64 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 shadow-lg z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="text-sm text-blue-600 dark:text-blue-400 mb-4"
              onClick={closeSidebar}
            >
              ✕
            </button>
            <nav className="space-y-4">
              <Link to="/user-dashboard" className="block hover:text-blue-600 dark:hover:text-blue-400">Dashboard</Link>
              <Link to="/user-dashboard/mypurchased" className="block hover:text-blue-600 dark:hover:text-blue-400">My Purchased</Link>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Toggle Button */}
        <div className="p-3 md:hidden">
          <RiAlignLeft
            className="text-2xl text-blue-600 dark:text-blue-400 cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </div>

        {/* Scrollable Outlet */}
        <div className=" overflow-y-auto p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
