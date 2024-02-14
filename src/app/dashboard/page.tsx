"use client"
import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { FileTextOutlined, InboxOutlined, SwapOutlined, SettingOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import DashboardHeader from './components/dbHeader';
import TextContent from './components/items/dbText';
import InboxContent from './components/items/dbInbox';
import SettingsContent from './components/items/dbSettings';
import TransferContent from './components/items/dbTransfer';

import '../../styles/app.css';

const { Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const renderComponent = (key: string) => {
    switch (key) {
      case 'Text Editor':
        return <TextContent />;
      case 'Inbox':
        return <InboxContent />;
      case 'Settings':
        return <SettingsContent />;
      case 'Transfer':
        return <TransferContent />;
      default:
        return <TextContent />;
    }
  };

  const [activeComponent, setActiveComponent] = useState('Text Editor');

  return (
    <>
      <DashboardHeader />
      <Layout className="max-h-screen">
        <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: '#214B71' }}>
          <div className="logo" style={{ padding: '16px', textAlign: 'center', transition: 'opacity 0.3s', opacity: collapsed ? 0 : 1 }}>
            <img src="/images/logo.png" alt="Logo" style={{
              maxWidth: '80px',
              height: 'auto',
              borderRadius: '10px',
              display: 'inline-block',
              boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)', // Adds a soft shadow to blend edges
              border: 'none', // Ensure no border is applied
            }} />
          </div>

          <Menu
            theme="dark"
            mode="inline"
            style={{ backgroundColor: '#214B71' }}
            defaultSelectedKeys={['Text Editor']}
            items={[
              {
                key: 'Text Editor',
                icon: <FileTextOutlined />,
                label: 'Text Editor',
              },
              {
                key: 'Inbox',
                icon: <InboxOutlined />,
                label: 'Inbox',
              },
              {
                key: 'Transfer',
                icon: <SwapOutlined />,
                label: 'Transfer',
              },
              {
                key: 'Settings',
                icon: <SettingOutlined />,
                label: 'Settings',
              },
            ]}
            onClick={({ key }) => {
              setActiveComponent(key);
            }}
          />
          <div className="sider-footer" style={{ position: 'absolute', bottom: '10px', width: '100%' }}>
            <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={toggleCollapse} style={{ width: '100%', color: '#fff' }} />
          </div>
        </Sider>
        <Layout>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
              {renderComponent(activeComponent)}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
