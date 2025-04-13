import React from "react";
import { FaTasks } from "react-icons/fa";

const Header = () => (
  <header className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white shadow-md">
    <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
      <div className="flex items-center gap-2">
        <FaTasks className="text-3xl" />
        <h1 className="text-xl sm:text-3xl font-bold">Task Mate</h1>
      </div>

      {/* Navbar Links */}
      <nav className="hidden sm:flex items-center gap-6">
        <a href="#" className="text-white hover:text-indigo-200 transition-all duration-200">Home</a>
        <a href="#" className="text-white hover:text-indigo-200 transition-all duration-200">About</a>
        <a href="#" className="text-white hover:text-indigo-200 transition-all duration-200">Contact</a>
      </nav>
    </div>
  </header>
);

export default Header;

