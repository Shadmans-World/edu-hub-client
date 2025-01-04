import React from 'react';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Name */}
        <div className="flex items-center space-x-3">
          <img
            src="https://i.ibb.co.com/HTnBV4D/14991314.png"
            alt="Website Logo"
            className="h-10 w-10"
          />
          <span className="text-lg font-bold text-white">EduHub Bangla</span>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://www.facebook.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
          >
            <FaLinkedinIn size={24} />
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-4 md:mt-0 text-sm">
          © {new Date().getFullYear()} EduHub Bangla. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
