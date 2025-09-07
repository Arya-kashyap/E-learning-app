import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const UpdateCourse = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/course/detail/${courseId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setFormData({
        title: response.data.title,
        description: response.data.description,
        price: response.data.price,
      });
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  fetchCourseDetails(); // ✅ Call the async function
}, [courseId]); // ✅ Add courseId to dependency array if it's dynamic

const handleUpdateCourse = async (e) => {
  e.preventDefault();

  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = admin?.token;
  if (!token) {
    navigate("/admin/login");
    return;
  }
  try {
    setLoading(true)
    const response = await axios.put(
      `${BACKEND_URL}/api/course/update/${courseId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      }
    );
    toast.success(response.data.message || "Course updated successfully");
    setLoading(false)
    navigate("/admin-dashboard/mycourses");
    setFormData({ title: '', description: '', price: '' });
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.errors || "Something went wrong");
  }
}
return (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Update Course
      </h2>

      <form onSubmit={handleUpdateCourse} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Course Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
            className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200"
          >
            {loading ? "Updating..." : "Update Course"}
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default UpdateCourse;
