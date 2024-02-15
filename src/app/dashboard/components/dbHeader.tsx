import React from 'react';

const DashboardHeader: React.FC = () => {
  return (
    <header className="text-white p-4" style={{ backgroundColor: '#214B71' }}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
    
          <span className="text-xl font-bold">BorkPrae</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Welcome, User!</span>
            <img src="/images/avatar.png" alt="User Icon" className="w-6 h-6 rounded-full" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
