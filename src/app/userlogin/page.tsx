"use client"
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Input, Button, Card, message, Form } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const UserLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (data.loggedIn) {
      localStorage.setItem('token', data.token);
      switch(data.role) {
        case 'translator':
          router.push('/dashboard');
          break;
        case 'manager':
          router.push('/adminboard');
          break;
        default:
          message.error('Unexpected role or error');
      }
    } else {
      message.error('Login failed');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Card style={{ width: '100%', maxWidth: '400px' }} title="Login" bordered={false}>
        <Form
          layout="vertical"
          onFinish={handleLogin}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              size="large"
              style={{ minWidth: '280px' }}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              size="large"
              style={{ minWidth: '280px' }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ backgroundColor: '#214B71', borderColor: '#214B71', color: '#ffffff' }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserLogin;
