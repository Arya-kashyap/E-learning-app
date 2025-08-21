import img1 from '../assets/cpp.jpg'
import img2 from '../assets/java.webp'
import img3 from '../assets/python.jpg'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer';

const cardData = [
  {
    title: "Design System",
    description: "A scalable design system built for modern interfaces.",
    image: "https://i.ytimg.com/vi/ybMD9xkbDvc/maxresdefault.jpg",
  },
  {
    title: "Fast Performance",
    description: "Optimized code ensures blazing fast load times.",
    image: "https://tse2.mm.bing.net/th/id/OIP.0D9zGIQXQEIZFYD9tpRXgQHaD1?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    title: "Secure",
    description: "Built with industry-leading security practices.",
    image: "https://tse4.mm.bing.net/th/id/OIP.NZAJP9gZCIS5tqZ91xW9cAHaEW?w=1206&h=708&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    title: "Design System",
    description: "A scalable design system built for modern interfaces.",
    image: img2,
  },
  {
    title: "Fast Performance",
    description: "Optimized code ensures blazing fast load times.",
    image: "https://tse2.mm.bing.net/th/id/OIP.0D9zGIQXQEIZFYD9tpRXgQHaD1?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    title: "Secure",
    description: "Built with industry-leading security practices.",
    image: "https://tse4.mm.bing.net/th/id/OIP.NZAJP9gZCIS5tqZ91xW9cAHaEW?w=1206&h=708&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    title: "Secure",
    description: "Built with industry-leading security practices.",
    image: img3,
  },
  {
    title: "Secure",
    description: "Built with industry-leading security practices.",
    image: "https://tse4.mm.bing.net/th/id/OIP.NZAJP9gZCIS5tqZ91xW9cAHaEW?w=1206&h=708&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    title: "Secure",
    description: "Built with industry-leading security practices.",
    image: img1,
  },
];

function AllCourses() {
  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 mt-16">
      <div className="max-w-7xl mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 dark:text-blue-400 mb-8">
          All Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cardData.map((card, index) => (
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
                <Link to="/course-detail">
                  <button className="mt-4 text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-200">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer placement */}
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}

export default AllCourses