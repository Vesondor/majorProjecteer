import React, { useState } from 'react';
import { Card, Row, Col, Typography, Input, Divider, Tag, Avatar, Button } from 'antd';
import { SearchOutlined, CheckCircleOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import CreateTask from './dbCreateTask'; // Import the CreateTask component
import Charts from './chart';
import TaskDetail from './dbTaskDetail';

const { Title, Text } = Typography;

const HomeContent = () => {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Translate Document A',
            description: 'Translate the document from English to Spanish.',
            dateAssigned: '2024-01-01',
            deadline: '2024-01-15',
            status: 'New',
            assignedTo: 'John Doe',
        },
        {
            id: 2,
            title: 'Translate Document B',
            description: 'Translate the document from English to Khmer.',
            dateAssigned: '2024-01-01',
            deadline: '2024-01-15',
            status: 'In-Progress',
            assignedTo: 'Jane Chan',
        },
        {
            id: 3,
            title: 'Translate Document A',
            description: 'Translate the document from English to Spanish.',
            dateAssigned: '2024-01-01',
            deadline: '2024-01-15',
            status: 'Completed',
            assignedTo: 'Giorno Giovana',
        },
        {
            id: 4,
            title: 'Translate Document B',
            description: 'Translate the document from English to Khmer.',
            dateAssigned: '2024-01-01',
            deadline: '2024-01-15',
            status: 'In-Progress',
            assignedTo: 'John Doe',
        },

    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateTask, setShowCreateTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null); // State to track the selected task


    const selectTask = (task: any) => {
        setSelectedTask(task);
    };

    const toggleCreateTask = () => {
        setShowCreateTask(!showCreateTask);
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status: any) => {
        switch (status) {
            case 'New': return 'volcano';
            case 'In-Progress': return 'geekblue';
            case 'Completed': return 'green';
            default: return 'default';
        }
    };

    const getStatusIcon = (status: any) => {
        switch (status) {
            case 'In-Progress': return <ClockCircleOutlined />;
            case 'Completed': return <CheckCircleOutlined />;
            default: return null;
        }
    };
    if (selectedTask) {
        return <TaskDetail task={selectedTask} onBack={() => setSelectedTask(null)} />;
    }

    return (
        <div style={{ padding: '20px', backgroundColor: '#214B71', minHeight: '100vh', boxSizing: 'border-box' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', minHeight: '95vh', padding: '20px' }}>

                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title level={3}>Task Manager</Title>
                    <Button type="primary" onClick={toggleCreateTask} style={{ backgroundColor: '#214B71', borderColor: '#214B71' }}>{showCreateTask ? 'Back' : "Create Task"}</Button>
                </div>
                {showCreateTask ?
                    <CreateTask />
                    : (
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
                                            onClick={() => selectTask(task)} // Set the selected task on click
                                            style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}
                                            title={<Text strong style={{ color: '#1890ff' }}>{task.title}</Text>}
                                            extra={<Tag color={getStatusColor(task.status)} icon={getStatusIcon(task.status)}>{task.status}</Tag>}
                                        >
                                            <Text style={{ color: '#666' }}>{task.description}</Text>
                                            <Divider style={{ margin: '12px 0' }} />
                                            <Avatar size="small" icon={<UserOutlined />} style={{ marginRight: 8 }} />
                                            <Text strong>{task.assignedTo}</Text>
                                            <br />
                                            <Text type="secondary" style={{ color: '#999' }}>Assigned: {task.dateAssigned}</Text>
                                            <br />
                                            <Text type="secondary" style={{ color: '#999' }}>Deadline: {task.deadline}</Text>
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
