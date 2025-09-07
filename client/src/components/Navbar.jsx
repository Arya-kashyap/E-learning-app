import { useEffect, useState } from "react";
import Logo from '../assets/logo.webp'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { FaHome } from "react-icons/fa";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/user/logout`,
        {
          withCredentials: true
        }
      )
      toast.success(response.data.message)
      localStorage.clear();
      setIsLoggedIn(false)
      navigate("/")
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.errors)
      }
    }
  }

  
  

  return (
    <nav className="bg-white dark:bg-zinc-800 shadow-md fixed w-full top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Title */}
          <div className="flex items-center space-x-2">
            <img src={Logo} alt="Learn Tech Logo" className="w-10 h-10" />
            <span className="text-xl font-bold text-blue-600 dark:text-white">Learn Tech</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/admin-dashboard" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md px-2 py-1">Constructor</Link>
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md px-2 py-1">Home</Link>
            <Link to="/all-courses" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md px-2 py-1">Courses</Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md px-2 py-1">Contact</Link>
            {
              isLoggedIn ? (
                <button onClick={handleLogout} className = "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md px-2 py-1">Logout</button>
              ) : (
                <>
                  <Link to = "/login" className = "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md px-2 py-1">Login</Link>
                  <Link to="/signup" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md px-2 py-1">Signup</Link>
                </>
              )
            }
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
    </div>
      </div >

    {/* Mobile Menu Links */ }
  {
    isOpen && (
      <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white dark:bg-gray-900 transition-colors duration-300">
        <Link to="/admin-dashboard" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Constructor</Link>
        <Link to="/" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
        <Link to="/all-courses" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Courses</Link>
        <Link to="/contact" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Contact</Link>
        {
              isLoggedIn ? (
                <button onClick={handleLogout} className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Logout</button>
              ) : (
                <>
                  <Link to = "/login" className = "block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Login</Link>
                  <Link to="/signup" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Signup</Link>
                </>
              )
            }
      </div>
    )
  }
    </nav >
  );
}

export default Navbar
