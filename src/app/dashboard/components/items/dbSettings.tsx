import React, { useState } from 'react';
import { FaInfoCircle, FaLock, FaQuestionCircle } from 'react-icons/fa';
import FAQPage from '../settings/settingsFAQ';
import PrivacyPolicyPage from '../settings/settingsPrivacy';
import AboutUsPage from '../settings/settingsAbout';

const SettingsContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'about':
        return <AboutUsPage />;
      case 'faq':
        return <FAQPage />;
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#214B71', minHeight: '100vh', boxSizing: 'border-box' }}>
      <div className="w-full mx-auto py-4" style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', minHeight: '95vh'}}>
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
        </div>
        {renderPage()}
      </div>
    </div>
  );
};

export default SettingsContent;
