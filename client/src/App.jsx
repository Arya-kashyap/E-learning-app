import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar';
import {Toaster} from 'react-hot-toast'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import AllCourses from './pages/AllCourses';
import AdminDashborad from './admin_components/AdminDashborad';
import MyCourses from './admin_components/MyCourses';
import CreateCourse from './admin_components/CreateCourse';
import UserDashboard from './user_components/UserDashboard';
import MyPurchased from './user_components/MyPurchased';
import Settings from './components/Settings';
import Contact from './pages/Contact';
import AdminHome from './admin_components/AdminHome';
import UserHome from './user_components/UserHome';
import Buy from './pages/Buy';
import AdminSignup from './admin_components/AdminSignup';
import AdminLogin from './admin_components/AdminLogin';
import UpdateCourse from './admin_components/UpdateCourse';


function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin/signup' element={<AdminSignup />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/course-detail/:courseId' element={<CourseDetail />} />
        <Route path='/all-courses' element={<AllCourses />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/buy/:courseId' element={<Buy />} />

        {/* User Route */}
        <Route path='/user-dashboard' element={<UserDashboard />} >
          <Route path="" element={<UserHome />} />
          <Route path="mypurchased" element={<MyPurchased />} />
        </Route>

        {/* Admin Route */}
        <Route path='/admin-dashboard' element={<AdminDashborad />} >
          <Route path="" element={<AdminHome />} />
          <Route path="mycourses" element={<MyCourses />} />
          <Route path="createcourse" element={<CreateCourse />} />
          <Route path="updatecourse/:courseId" element={<UpdateCourse />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
