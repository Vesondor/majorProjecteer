"use client";
import React, { useState } from 'react';
import DashboardHeader from './components/dbHeader'; // Adjust the import path as needed
import DashboardSidebar from './components/dbSideBar'; // Adjust the import path as needed
import InboxContent from './components/items/dbInbox'; // Adjust the import path as needed
import SettingsContent from './components/items/dbSettings'; // Adjust the import path as needed
import TextContent from './components/items/dbText';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('Inbox');

  const renderMainContent = () => {
    switch (activeSection) {
      case 'Inbox':
        return <InboxContent />;
      case 'Settings':
        return <SettingsContent />;
      case 'Text':
        return <TextContent/>
      default:
        return <InboxContent />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardSidebar setActiveSection={setActiveSection} />
        <main className="flex-1 p-4">
          {renderMainContent()}
          {/* If you have additional children you want to render, you can do so here. */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
