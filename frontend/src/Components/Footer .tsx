import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
          <div>
            <h3 className="text-lg font-bold text-white mb-4">About Us</h3>
            <p className="text-sm">
              We are committed to providing exceptional services and products to
              our customers. Stay connected and explore more with us.
            </p>
          </div>

      
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/about"
                  className="hover:text-orange-400 transition duration-200"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="hover:text-orange-400 transition duration-200"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-orange-400 transition duration-200"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="hover:text-orange-400 transition duration-200"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>


          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <p className="text-sm">
              123 Main Street, Suite 456<br />
              City, Country
            </p>
            <p className="text-sm mt-2">Email: support@example.com</p>
            <p className="text-sm">Phone: +123 456 7890</p>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-blue-500 transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22.675 0H1.325C.594 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24h11.495v-9.293H9.689V11.31h3.131V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24h-1.919c-1.505 0-1.797.715-1.797 1.763v2.31h3.586l-.467 3.397h-3.119V24h6.116c.73 0 1.324-.594 1.324-1.326V1.326C24 .593 23.406 0 22.675 0z" />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-blue-400 transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.56a9.83 9.83 0 01-2.825.775 4.932 4.932 0 002.165-2.724 9.865 9.865 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482A13.95 13.95 0 011.671 3.149 4.92 4.92 0 003.155 9.72a4.902 4.902 0 01-2.228-.616v.061a4.92 4.92 0 003.946 4.827 4.903 4.903 0 01-2.224.084 4.923 4.923 0 004.6 3.417 9.867 9.867 0 01-6.102 2.104c-.395 0-.788-.023-1.174-.068a13.945 13.945 0 007.548 2.209c9.057 0 14.01-7.507 14.01-14.01 0-.213-.005-.425-.014-.636A9.936 9.936 0 0024 4.56z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-blue-700 transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22.225 0H1.771C.792 0 0 .774 0 1.733v20.533C0 23.226.792 24 1.771 24h20.454c.979 0 1.771-.774 1.771-1.733V1.733C24 .774 23.204 0 22.225 0zm-13.54 20.452H5.337V9.104h3.348v11.348zm-1.674-12.99a1.934 1.934 0 110-3.867 1.934 1.934 0 010 3.867zm15.297 12.99h-3.348v-5.567c0-1.328-.028-3.037-1.852-3.037-1.854 0-2.14 1.445-2.14 2.94v5.664h-3.347V9.104h3.214v1.544h.046c.448-.85 1.542-1.745 3.171-1.745 3.392 0 4.018 2.233 4.018 5.137v6.412z" />
            </svg>
          </a>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
