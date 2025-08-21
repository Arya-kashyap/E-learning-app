import React from 'react';
import Footer from '../components/Footer'

const CourseDetail = () => {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 mt-12">
      <div className=' max-w-4xl mx-auto p-6 pt-10  shadow-md rounded-md'>
        <img
          src="https://i.ytimg.com/vi/ybMD9xkbDvc/maxresdefault.jpg"
          alt="Course banner"
          className="rounded-md mb-6 w-full object-cover"
        />

        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">
          Introduction to Web Development
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Learn the foundations of HTML, CSS, and JavaScript to build your own websites from scratch. Perfect for beginners!
        </p>

        <div className="flex items-center mb-4">
          <img
            src="https://i.ytimg.com/vi/ybMD9xkbDvc/maxresdefault.jpg"
            alt="Instructor"
            className="rounded-full w-12 h-12 mr-3"
          />
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100">Instructor: Jane Doe</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Senior Web Engineer</p>
          </div>
        </div>

        <ul className="list-disc list-inside mb-6 text-gray-700 dark:text-gray-300">
          <li>Build responsive websites</li>
          <li>Understand core web technologies</li>
          <li>Project-based learning</li>
        </ul>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200">
          Enroll Now
        </button>
      </div>

      {/* Footer placement */}
      <div className="mt-10">
        <Footer />
      </div>
    </div>

  );
};

export default CourseDetail;
