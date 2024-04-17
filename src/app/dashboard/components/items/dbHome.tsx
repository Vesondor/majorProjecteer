import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Card, Row, Col, Dropdown, Menu, Typography, Button, List, Input, Divider } from 'antd';
import { MoreOutlined, AppstoreOutlined, UnorderedListOutlined, SearchOutlined, FileTextOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { File, Task, DocumentStyle, Op } from '@/types';
import TextContent from './dbText';
import '../../../../styles/app.css';
const { Text, Title } = Typography;

function hasToken() {
    // Checks for 'token' in localStorage
    return Boolean(localStorage.getItem('token'));
  }

const HomeContent: React.FC = () => {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [showTextContent, setShowTextContent] = useState(false);
    const [refreshData, setRefreshData] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const getUserId = () => {
        if (typeof window !== 'undefined' && localStorage.getItem('translatorId')) {
            return localStorage.getItem('translatorId');
        }
        return null;
    };

    const userId = getUserId();


    const fetchTasks = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/tasks/${userId}`);
            const formattedTasks: Task[] = response.data.task_tbl.map((task: any) => ({
                id: task.taskId,
                taskName: task.taskName,
                assignorId: task.assignorId,
                receiverId: task.receiverId,
                documentId: task.documentId,
                context: task.context,
                message: task.message,
                dateCreated: new Date(task.dateCreated).toLocaleString('km-KH', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                }),
                dateClosed: task.dateClosed ? new Date(task.dateClosed).toLocaleString('km-KH', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                }) : null,
                projectId: task.projectId,
                document: {
                    id: task.document.documentId,
                    title: task.document.documentName,
                    translatedContent: task.document.documentTranslated,
                    dateCreated: new Date(task.document.dateCreated).toLocaleString('km-KH', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                    }),
                    documentStyle: task.document.documentStyle,
                    deadline: new Date(task.document.deadline).toLocaleString('km-KH', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                    }),
                    status: task.document.status,
                },
                assignor: {
                    username: task.assignor.username,
                    role: task.assignor.role,
                },
                receiver: {
                    username: task.receiver.username,
                    role: task.receiver.role,
                },
            }));

            const tasksToSet: Task[] = [];
            const completedTasksToSet: Task[] = [];
            formattedTasks.forEach((formattedTask: Task) => {
                if (formattedTask.document.status === 0) {
                    tasksToSet.push(formattedTask);
                } else if (formattedTask.document.status === 1) {
                    completedTasksToSet.push(formattedTask);
                }
            });
            setTasks(tasksToSet);
            setCompletedTasks(completedTasksToSet);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            alert('Error fetching tasks');
        }
    };

    useEffect(() => {
        // Check for token before fetching tasks
        if (hasToken()) {
            fetchTasks();
        }else{
            router.push('/login'); // Redirect to login if no token
        }
    }, [refreshData, userId]); // Ensure dependencies are correctly listed for this effect
    
    const toggleViewMode = () => {
        setViewMode(prevMode => (prevMode === 'card' ? 'list' : 'card'));
    };

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
        setShowTextContent(true);
    };

    const handleBackButtonClick = () => {
        setShowTextContent(false);
        setSelectedTask(null);
        setRefreshData(prev => !prev);
    };

    const handleShare = () => { };

    const filteredCompletedTasks = completedTasks.filter(task =>
        task.taskName ? task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) : false
    );
    const renderTaskCard = (task: Task) => (
        <Col key={task.id} xs={24} sm={12} md={12} lg={6}>
            <div>
                <h5>{task.document.title}</h5>
                <Card
                    hoverable
                    onClick={() => handleTaskClick(task)}
                    className="notebook-card"
                >
                    <div className="line-design"></div> {/* Add line design inside the card */}
                </Card>
                <div className="mt-2 flex flex-col">
                    <div className="flex items-center">
                        <Text type="secondary" style={{ marginRight: '8px', fontSize: '12px' }}>
                            {`Assigned by: ${task.assignor.username}`}
                        </Text>
                        <Dropdown overlay={() => menu(handleShare, task)} trigger={['click']}>
                            <MoreOutlined style={{ fontSize: '24px' }} />
                        </Dropdown>
                    </div>
                    <Text className="text-red-700" style={{ fontSize: '12px' }}>
                        {`Deadline: ${task.document.deadline}`}
                    </Text>
                </div>
            </div>
        </Col>
    );

    const menu = (handleShare: () => void, task: Task) => (
        <Menu>
            <Menu.Item key="share" onClick={handleShare}>Share</Menu.Item>
        </Menu>
    );

    const renderTaskList = (task: Task) => (
        <List.Item
            key={task.id}
            onClick={() => handleTaskClick(task)}
            style={{
                cursor: 'pointer',
                transition: 'background-color 0.3s',
            }}
            className="hoverable-list-item"
        >
            <List.Item.Meta
                title={<div>{task.taskName}</div>}
                description={
                    <div>
                        <div>Assigned by: {task.assignor.username}</div>
                        <div style={{ color: 'red' }}>Deadline: {task.document.deadline}</div>
                    </div>
                }
            />
        </List.Item>
    );

    if (showTextContent && selectedTask) {
        let formattedText = selectedTask.document.documentStyle.ops[0].insert;
        // Check if formattedText is JSON (contains "content" key)
        try {
            const parsedText = JSON.parse(formattedText);
            if (parsedText && typeof parsedText === 'object' && 'content' in parsedText) {
                formattedText = parsedText.content; // Use the HTML content
            }
        } catch (error) {
            // If it's not JSON or doesn't contain the 'content' key, use it as is (plain text or direct HTML)
        }
    
        return <TextContent fileId={selectedTask.document.id} title={selectedTask.document.title} initTranslateText={selectedTask.document.translatedContent} initText={formattedText} onBackButtonClick={handleBackButtonClick} />;
    }
    

    return (
        <div style={{
            backgroundColor: '#214B71', paddingTop: '10px', paddingBottom: '20px', paddingLeft: '20px', paddingRight: '20px',
            width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', minHeight: '100vh'
        }}>
            <div className="container mx-auto mt-8" style={{
                backgroundColor: 'white', borderRadius: '10px', padding: '20px',
                margin: '0 auto', width: '100%', boxSizing: 'border-box', maxWidth: '100%', flex: '1'
            }}>
                <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <AppstoreOutlined style={{ fontSize: '24px', color: '#214B71', marginRight: '8px' }} />
                        <Typography.Title level={4} style={{ margin: 0, color: '#214B71' }}>BorkPrae</Typography.Title>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button type="default" icon={viewMode === 'card' ? <UnorderedListOutlined /> : <AppstoreOutlined />} onClick={toggleViewMode} style={{ marginRight: '16px', flexShrink: 0 }} />
                        <Input
                            suffix={
                                <Button icon={<SearchOutlined />} type="primary" style={{ border: 'none', background: 'none' }} />
                            }
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ maxWidth: '400px', width: '100%', borderRadius: '20px', padding: '0 12px' }}
                        />
                    </div>
                </div>

                <Divider style={{ margin: '20px 0' }} />
                <div>
                    <Title level={3} style={{ color: '#214B71' }}>
                        <FileTextOutlined /> Recent Tasks
                    </Title>
                    {viewMode === 'card' ? (
                        <Row gutter={[16, 16]}>
                            {tasks.map(task => renderTaskCard(task))}
                        </Row>
                    ) : (
                        <List dataSource={tasks} renderItem={renderTaskList} />
                    )}
                </div>

                <Divider style={{ margin: '40px 0' }} />

                <div>
                    <Title level={3} style={{ color: '#214B71' }}>
                        <CheckCircleOutlined /> Completed Tasks
                    </Title>
                    {viewMode === 'card' ? (
                        <Row gutter={[16, 16]}>
                            {filteredCompletedTasks.map(task => renderTaskCard(task))}
                        </Row>
                    ) : (
                        <List dataSource={filteredCompletedTasks} renderItem={renderTaskList} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeContent;