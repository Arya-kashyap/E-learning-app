import { useState } from "react";
import { Link, Links } from 'react-router-dom'
import { FiMenu } from "react-icons/fi";
import CourseCard from "./CourseCard";

function Sidebar({ isOpen, closeSidebar }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
        <nav className="space-y-4">
          <Link to={'/admin-dashboardLink'} className="block hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1">Dashboard</Link>
          <Link to={'/admin-dashboard/mycourses'} className="block hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1">My Courses</Link>
          <Link to={'/admin-dashboard/createcourse'} className="block hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1">Create Courses</Link>
          <Link to={'/admin-dashboard/settings'} className="block hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1">Settings</Link>
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
              <Link to={'/admin-dashboard/'} className="block hover:text-blue-600 dark:hover:text-blue-400">Dashboard</Link>
              <Link to={'/admin-dashboard/mycourses'} className="block hover:text-blue-600 dark:hover:text-blue-400">My Courses</Link>
              <Link to={'/admin-dashboard/createcourse'} className="block hover:text-blue-600 dark:hover:text-blue-400">Create Course</Link>
              <Link to={'/admin-dashboard/settings'} className="block hover:text-blue-600 dark:hover:text-blue-400">Settings</Link>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

export default Sidebar