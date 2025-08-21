import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import CourseCard from '../components/CourseCard'
import Dashboard from '../components/Dashboard'
import { RiAlignLeft } from "react-icons/ri";
import { Outlet } from 'react-router-dom';

function AdminDashborad() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 mt-16 relative">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-3 md:hidden">
          <RiAlignLeft
            className="text-2xl text-blue-600 dark:text-blue-400 cursor-pointer"
            onClick={() => setIsSidebarOpen(true)}
          />
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashborad
