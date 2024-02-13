"use client"
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { FileTextOutlined, InboxOutlined, SwapOutlined, SettingOutlined } from '@ant-design/icons';
import DashboardHeader from './components/dbHeader';
import TextContent from './components/items/dbText';
import InboxContent from './components/items/dbInbox';
import '../../styles/app.css';

const { Sider, Content } = Layout;
const titles = ['Text Editor', 'Inbox', 'Transfer', 'Settings'];
const icons = [<FileTextOutlined />, <InboxOutlined />, <SwapOutlined />, <SettingOutlined />]; // Corresponding icons for each title

const items = titles.map((title, index) => ({
  key: title,
  label: title,
  icon: icons[index], // Assign the corresponding icon for each menu item
}));

const App: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState('Text Editor');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Text Editor':
        return <TextContent />;
      case 'Inbox':
        return <InboxContent />;
      // Add cases for other components as needed
      default:
        return <TextContent />; // Default case
    }
  };

  return (
    <Layout className="max-h-screen">
      <Sider breakpoint="lg" onBreakpoint={(broken) => console.log(broken)}>
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-5">
              <div className="demo-logo" />
            </div>
            <Menu
              className="mt-16"
              theme="dark"
              mode="inline"
              selectedKeys={[activeComponent]}
              items={items}
              onClick={({ key }) => setActiveComponent(key)}
            />
          </div>
        </div>
      </Sider>
      <Layout>
        <DashboardHeader />
        <Content className="m-6 p-4 bg-white">
          {renderComponent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
