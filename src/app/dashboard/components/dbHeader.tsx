import React from 'react';
import { FiBell, FiChevronDown } from 'react-icons/fi';

const DashboardHeader: React.FC = () => {
  // State for managing the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="text-white p-4 h-20" style={{background:'#214B71'}}>
      <div className="container mx-auto flex justify-between items-center h-full">
        <div className="flex items-center space-x-4">
          {/* Adjust the font size here if needed */}
          <span className="text-2xl font-bold">BorkPrae</span> {/* Smaller text size */}
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="text-white focus:outline-none">
              {/* Adjust the icon size here */}
              <FiBell className="h-6 w-6" /> {/* Smaller icon size */}
              <span className="absolute top-0 right-0 inline-flex items-center justify-center p-1 bg-red-600 text-xs text-white rounded-full">5</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            {/* Adjust the font size here if needed */}
            <span className="text-sm">Welcome, User!</span> {/* Smaller text size */}
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center focus:outline-none ml-10">
                <img src="/images/avatar.png" alt="User Icon" className="w-8 h-8 rounded-full" /> {/* Adjusted for smaller size */}
                {/* Adjust the icon size here */}
                <FiChevronDown className="ml-2" size={16} /> {/* Explicitly smaller icon size */}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black py-2 rounded-md shadow-xl z-10">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Logout</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
