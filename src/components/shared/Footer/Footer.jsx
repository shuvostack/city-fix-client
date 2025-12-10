import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaRegBuilding,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-gray-300 pt-16 pb-8 overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0 100 C 20 0 50 0 100 100 Z"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="scale-90 origin-left filter">
              {/* <Logo /> */}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <FaRegBuilding size={20} />
                </div>
                <div className="leading-tight hidden sm:block">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                    City<span className="text-primary">Fix</span>
                  </span>
                </div>
              </Link>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Empowering citizens to build a better city. Report issues, track
              progress, and contribute to a smarter, safer infrastructure
              network.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
                (Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                  >
                    <Icon size={16} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 border-b-2 border-primary inline-block pb-1">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "All Issues", path: "/all-issues" },
                { name: "Dashboard", path: "/dashboard" },
                { name: "About Us", path: "/about" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 hover:text-primary hover:translate-x-2 transition-all duration-300"
                  >
                    <span className="text-primary text-xs">➤</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 border-b-2 border-primary inline-block pb-1">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary mt-1" />
                <span>
                  123 Dhanmondi, Dhaka,
                  <br /> Bangladesh, SC 45000
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary" />
                <span>+880 1311338689</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                <span>support@cityfix.gov</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 border-b-2 border-primary inline-block pb-1">
              Newsletter
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get updates on resolved issues and city news.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-primary transition-colors"
              />
              <button className="px-4 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 shadow-lg shadow-primary/30 transition-all active:scale-95">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-white font-semibold">CityFix</span>. All
            Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link to="" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
