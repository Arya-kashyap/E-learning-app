import React from 'react'

const myCourses = [
  {
    title: 'React Mastery',
    description: 'Build dynamic UIs with React hooks, context, and routing.',
    image: 'https://via.placeholder.com/400x200',
  },
  {
    title: 'Node.js Essentials',
    description: 'Learn backend development with Express and MongoDB.',
    image: 'https://via.placeholder.com/400x200',
  },
  {
    title: 'Tailwind CSS Pro',
    description: 'Design responsive, modern UIs with utility-first CSS.',
    image: 'https://via.placeholder.com/400x200',
  },
]

const MyCourses = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-10">
          My Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {myCourses.map((course, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {course.description}
                </p>
                <button className="mt-4 text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-200">
                  Continue Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyCourses
