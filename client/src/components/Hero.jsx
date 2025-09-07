import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Hero() {
  const {isLoggedIn} = useAuth();
  return (
    <section className="flex mt-16 bg-blue-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col justify-center items-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 dark:text-white">
          Learn Tech
        </h2>
        <p className="mt-4 text-lg text-blue-700 dark:text-gray-300">
          Everything you need to kickstart your next big idea.
        </p>
        <div className="mt-6">
          <Link
            to={isLoggedIn ? "/user-dashboard" : "/login"}
            className="inline-block bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero