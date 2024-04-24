import React, { useState } from 'react';
import { FaInfoCircle, FaLock, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
const SettingsContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  const router = useRouter();

  const handleLogout = () => {
    // Remove userid from localStorage
    localStorage.removeItem('translatorId');
    // Redirect to login page
    router.push('/login');
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#214B71', minHeight: '100vh', boxSizing: 'border-box' }}>
      <div className="w-full mx-auto py-4" style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', minHeight: '95vh' }}>
        <h1 className="text-3xl font-semibold text-center mb-10">Settings</h1>

        <div className="flex flex-col items-start justify-center space-y-4 max-w-md mx-auto">
          <button className="flex items-center w-full text-left p-4 bg-gray-200 rounded-lg hover:bg-gray-200" onClick={() => setCurrentPage('privacy')}>
            <FaLock className="text-lg mr-4" />
            <span>Privacy Policy</span>
          </button>

          <button className="flex items-center w-full text-left p-4 bg-gray-200 rounded-lg hover:bg-gray-200" onClick={() => setCurrentPage('about')}>
            <FaInfoCircle className="text-lg mr-4" />
            <span>About Us</span>
          </button>

          <button className="flex items-center w-full text-left p-4 bg-gray-200 rounded-lg hover:bg-gray-200" onClick={() => setCurrentPage('faq')}>
            <FaQuestionCircle className="text-lg mr-4" />
            <span>FAQ</span>
          </button>
          <button className="flex items-center w-full text-left p-4 bg-gray-200 rounded-lg hover:bg-gray-200" onClick={handleLogout}>
            <FaSignOutAlt className="text-lg mr-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;
