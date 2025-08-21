import React from 'react'

const Dashboard = () => {
  return (
    <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Welcome, Admin!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">📈 Analytics</div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">👥 Users</div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">⚙️ Settings</div>
      </div>
    </main>
  )
}

export default Dashboard
