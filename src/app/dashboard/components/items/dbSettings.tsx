import React from 'react';
import { FaInfoCircle, FaLock, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';

const SettingsContent: React.FC = () => {
  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logout clicked');
  };

  return (
    <div className="w-full min-h-[700px] mx-auto py-4">
      <h1 className="text-3xl font-semibold text-center mb-10">Settings</h1>
      
      <div className="flex flex-col items-start justify-center space-y-4 max-w-md mx-auto">
        <button className="flex items-center w-full text-left p-4 bg-gray-100 rounded-lg hover:bg-gray-200" onClick={handleLogout}>
          <FaLock className="text-lg mr-4" />
          <span>Privacy Policy</span>
        </button>

        <button className="flex items-center w-full text-left p-4 bg-gray-100 rounded-lg hover:bg-gray-200">
          <FaInfoCircle className="text-lg mr-4" />
          <span>About Us</span>
        </button>

        <button className="flex items-center w-full text-left p-4 bg-gray-100 rounded-lg hover:bg-gray-200">
          <FaQuestionCircle className="text-lg mr-4" />
          <span>FAQ</span>
        </button>

        <button className="flex items-center w-full text-left p-4 bg-gray-100 rounded-lg hover:bg-gray-200" onClick={handleLogout}>
          <FaSignOutAlt className="text-lg mr-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsContent;
