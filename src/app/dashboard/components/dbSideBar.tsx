import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

interface DashboardSidebarProps {
  setActiveSection: (section: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(true); // Assuming you want the sidebar to be open by default

  return (
    <div className="flex">
      <div className={`${isOpen ? 'w-64' : 'w-16'} bg-gray-800 text-white p-4 flex-shrink-0 h-screen transition-width duration-300 ease-in-out`}>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white mb-4">
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
        {isOpen && (
          <nav>
            <ul>
              <li className="mb-4">
                <button onClick={() => setActiveSection('Text')} className="hover:text-gray-200">Text Editor</button>
              </li>
              <li className="mb-4">
                <button onClick={() => setActiveSection('Inbox')} className="hover:text-gray-200">Inbox</button>
              </li>
              <li className="mb-4">
                <button onClick={() => setActiveSection('Settings')} className="hover:text-gray-200">Settings</button>
              </li>

            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
