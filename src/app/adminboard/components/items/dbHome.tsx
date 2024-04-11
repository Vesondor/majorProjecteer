import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Typography, Input, Divider, Tag, Avatar, Button } from 'antd';
import { SearchOutlined, CheckCircleOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import CreateTask from './dbCreateTask';
import Charts from './chart';
import TaskDetail from './dbTaskDetail';

const { Title, Text } = Typography;

interface File {
  id: number;
  title: string;
  content: string;
  translatedContent: string;
  timestamp: string;
  dateCreated: string;
  documentStyle: JSON;
  deadline: string;
  status: number;
}

interface Task {
  id: number;
  name: string;
  context: string;
  message: string;
  assignor: {
    username: string;
    role: string;
  };
  receiver: {
    username: string;
    role: string;
  };
  document: File;
  completed: boolean;
}

const HomeContent: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCreateTask, setShowCreateTask] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<{ task_tbl: any[] }>('http://localhost:3001/api/tasks/4');
        if (response.data && Array.isArray(response.data.task_tbl)) {
          const formattedTasks: Task[] = response.data.task_tbl.map(task => ({
            id: task.taskId,
            name: task.taskName,
            context: task.context,
            message: task.message,
            assignor: {
              username: task.assignor.username,
              role: task.assignor.role,
            },
            receiver: {
              username: task.receiver.username,
              role: task.receiver.role,
            },
            document: {
              id: task.document.documentId,
              title: task.document.documentName,
              content: '', // Assuming there's no direct mapping for this from your response
              translatedContent: task.document.documentTranslated,
              timestamp: '', // Assuming there's no direct mapping for this from your response
              dateCreated: task.document.dateCreated,
              documentStyle: task.document.documentStyle,
              deadline: '', // Assuming there's no direct mapping for this from your response
              status: task.document.status,
            },
            completed: task.status === 1, // Adjust according to your status logic
          }));
          setTasks(formattedTasks);
        } else {
          setTasks([]);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);


  const selectTask = (task: Task) => {
    setSelectedTask(task);
  };

  const toggleCreateTask = () => {
    setShowCreateTask(!showCreateTask);
  };

  const filteredTasks = tasks.filter(task =>
  (task.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.message?.toLowerCase().includes(searchQuery.toLowerCase()))
  );


  // Adjusted to use the 'completed' property for status
  const getStatusColor = (completed: boolean) => {
    return completed ? 'green' : 'volcano'; // 'green' for completed, 'volcano' for not completed
  };

  const getStatusIcon = (completed: boolean) => {
    return completed ? <CheckCircleOutlined /> : <ClockCircleOutlined />; // Check for completed, Clock for ongoing
  };

  if (selectedTask) {
    return <TaskDetail task={selectedTask} onBack={() => setSelectedTask(null)} />;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#214B71', minHeight: '100vh', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', minHeight: '95vh', padding: '20px' }}>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={3}>Task Manager</Title>
          <Button type="primary" onClick={toggleCreateTask} style={{ backgroundColor: '#214B71', borderColor: '#214B71' }}>
            {showCreateTask ? 'Back' : "Create Task"}
          </Button>
        </div>
        {showCreateTask ? (
          <CreateTask />
        ) : (
          <div>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '40%', marginBottom: '20px' }}
            />
            <Title level={4}>Tasks Overview</Title>
            <Charts />
            <Divider />
            <Row gutter={16}>
              {filteredTasks.map(task => (
                <Col key={task.id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    onClick={() => selectTask(task)}
                    style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}
                    title={<Text strong style={{ color: '#1890ff' }}>{task.name}</Text>}
                    extra={<Tag color={getStatusColor(task.completed)} icon={getStatusIcon(task.completed)}>{task.completed ? 'Completed' : 'In-Progress'}</Tag>}
                  >
                    <Text style={{ color: '#666' }}>{task.message}</Text>
                    <Divider style={{ margin: '12px 0' }} />
                    <Avatar size="small" icon={<UserOutlined />} style={{ marginRight: 8 }} />
                    <Text strong>{task.receiver.username}</Text>
                    <br />
                    <Text type="secondary" style={{ color: '#999' }}>Context: {task.context}</Text>
                    <br />
                    <Text type="secondary" style={{ color: '#999' }}>Assigned by: {task.assignor.username}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
            <Divider />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeContent;
