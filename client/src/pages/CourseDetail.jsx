import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Footer from '../components/Footer'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function CourseDetail() {
  const { courseId } = useParams(); // grabs course ID from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/course/detail/${courseId}`, {
          withCredentials: true,
        });
        setCourse(res.data);
      } catch (err) {
        console.error('Error fetching course:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!course) return <div className="text-center py-10">Course not found.</div>;

  // const handlePurchase = async () => {
  //   if (!user) {
  //     toast.error("Please login to Purchase the courses")
  //     return
  //   }
  //   try {
  //     setLoading(true)
  //     const response = await axios.post(`http://localhost:4001/api/course/buy/${courseId}`, {}, {
  //       headers: {
  //         Authorization: `Bearer ${user}`
  //       },
  //       withCredentials: true,
  //     })
  //     toast.success(response.data.message || "course Purchased successfully")
  //     setLoading(false)
  //     navigate('/user-dashboard/mypurchased')
  //   } catch (error) {
  //     console.log(error);

  //     setLoading(false)
  //     if (error.response?.status === 400) {
  //       toast.error("you have already Purchased this course")
  //       navigate('/user-dashboard/mypurchased')
  //     } else {
  //       toast.error(error?.response?.data?.errors)
  //       console.log(error?.response?.data?.errors);

  //     }
  //   }
  // }

  return (
    <div className='h-screen w-full flex flex-col justify-center mt-4'>  
    <div className=" p-6 bg-white dark:bg-gray-900 rounded shadow">
      <h1 className="text-3xl font-bold text-blue-700 dark:text-white mb-4">{course.title}</h1>
      <img src={course.image} alt={course.title} className="w-full h-64 object-cover rounded mb-6" />
      <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
      <p className="mt-4 text-green-600 dark:text-green-400 font-semibold">Price: ₹{course.price}</p>
      <Link to={`/buy/${course._id}`}>
        <button
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition">
        {loading ? "Processing" : "Buy Now"}
      </button>
      </Link>
    </div>
    <Footer />
    </div>
  );
}

export default CourseDetail;
