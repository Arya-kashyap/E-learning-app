import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthProvider'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL



function MyPurchased() {
  const [purchased, setPurchased] = useState([])
  const [loading, setLoading] = useState(false)
  const { isLoggedIn } = useAuth()
  const [errorMessage, setErrorMessage] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    const handlePurchase = async () => {
      if (!isLoggedIn) {
        setErrorMessage("Please login to purchased the courses")
      }

      try {
        setLoading(true)
        const response = await axios.get(`${BACKEND_URL}/api/user/purchased`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            withCredentials: true
          }
        )
        setPurchased(response?.data?.courseData)
        setLoading(false)
        console.log(response.data);

      } catch (error) {
        setErrorMessage(error?.response?.data?.errors || "Failed to fetch purchased data")
      }
    }
    handlePurchase();
  }, [])

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 dark:text-blue-400 mb-8">
          My Purchased
        </h2>

        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400">Loading purchased courses...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {purchased && purchased.length > 0 ? (
              purchased.map((card, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {card.description}
                    </p>
                    <Link to={`/course-detail/${card._id}`}>
                      <button className="mt-4 text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-200">
                        Learn More
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
                No purchased courses
              </p>
            )}
          </div>

        )}
      </div>
    </div>
  );
}

export default MyPurchased