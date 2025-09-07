import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


const MyCourses = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [myCourses, setMyCourses] = useState([]);

  const handleDelete = async (courseId) => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    const token = admin?.token;
    console.log(token, "token");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    try {
      const shouldDelete = window.confirm("Are you sure you want to delete this course?");
      if (!shouldDelete) return;
      const response = await axios.delete(`${BACKEND_URL}/api/course/delete/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      });
      toast.success(response.data.message || "Course deleted successfully");
      navigate("/admin-dashboard/mycourses");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.errors || "Something went wrong");
    }
  }

  useEffect(() => {
    const fetchCourses = async () => {

      const admin = JSON.parse(localStorage.getItem("admin"));
      const token = admin?.token;
      console.log(token, "token");
      if (!token) {
        navigate("/admin/login");
        return;
      }

      try {
        setLoading(true)
        const response = await axios.post(`${BACKEND_URL}/api/admin/courses`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        }
        );
        console.log(response.data);
        setMyCourses(response.data)
        setLoading(false)
      } catch (error) {
        console.log("error in fetchCourses", error);
      }
    }
    fetchCourses()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-10">
          My Courses
        </h2>

        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400">Loading courses...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {myCourses && myCourses.length > 0 ? (
            myCourses.map((course, index) => (
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
                      {course.description.length > 40
                        ? `${course.description.slice(0, 40)}...`
                        : course.description}
                    </p>
                <div className="flex items-center justify-between mt-4">
                  <Link to={`/admin-dashboard/updatecourse/${course._id}`} className="mt-4 text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-200">
                    Update
                  </Link>
                  <button onClick={() => handleDelete(course._id)} className="mt-4 text-sm px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition duration-200">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400">No courses available.</div>
          )}
        </div>
        )}
      </div>
    </div>
  )
}

export default MyCourses
