import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {Toaster} from 'react-hot-toast'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import AllCourses from './pages/AllCourses';
import AdminDashborad from './admin_components/AdminDashborad';
import MyCourses from './admin_components/MyCourses';
import CreateCourse from './admin_components/CreateCourse';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Contact from './pages/Contact';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* User Route */}
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/course-detail' element={<CourseDetail />} />
        <Route path='/all-courses' element={<AllCourses />} />
        <Route path='/contact' element={<Contact />} />
        {/* Admin Route */}
        <Route path='/admin-dashboard' element={<AdminDashborad />} >
          <Route path="" element={<Dashboard />} />
          <Route path="mycourses" element={<MyCourses />} />
          <Route path="createcourse" element={<CreateCourse />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
