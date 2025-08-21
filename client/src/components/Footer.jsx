function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold text-blue-400">Learn Tech</h2>
            <p className="mt-2 text-sm text-gray-300">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="text-blue-300 font-semibold mb-2">Company</h3>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-blue-400">About</a></li>
                <li><a href="#" className="hover:text-blue-400">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-blue-300 font-semibold mb-2">Support</h3>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-blue-400">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-blue-300 font-semibold mb-2">Follow Us</h3>
            <ul className="flex space-x-4 mt-2">
              <li><a href="#" aria-label="Facebook" className="hover:text-blue-400"><i className="fab fa-facebook-f"></i></a></li>
              <li><a href="#" aria-label="Twitter" className="hover:text-blue-400"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#" aria-label="Instagram" className="hover:text-blue-400"><i className="fab fa-instagram"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer