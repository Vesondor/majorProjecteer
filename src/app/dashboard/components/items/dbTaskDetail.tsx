import React, { useState } from 'react';
import { Layout, Typography, Card, Tag, Timeline } from 'antd';
import {
    ClockCircleOutlined,
    FileTextOutlined,
    UserOutlined,
    CalendarOutlined,
    FileOutlined,
} from '@ant-design/icons';

import TextContent from './dbText';

const { Content } = Layout;
const { Title, Text } = Typography;

interface File {
    id: number;
    name: string;
    content: string;
}

interface Task {
    subject: string;
    details: string;
    to: string;
    date: string;
    time?: string;
    context?: string;
    message: string;
    files: File[];
}

const TaskDetail: React.FC<{ task: Task; onBack: () => void; onDocumentViewChange?: (viewing: boolean) => void }> = ({ task, onBack, onDocumentViewChange }) => {
    const [showTextContent, setShowTextContent] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileClick = (file: File) => {
        setSelectedFile(file);
        setShowTextContent(true);
        if (onDocumentViewChange) {
            onDocumentViewChange(true);
        }
    };

    const handleBackButtonClick = () => {
        setShowTextContent(false);
        setSelectedFile(null);
        if (onDocumentViewChange) {
            onDocumentViewChange(false);
        }
    };

    if (showTextContent && selectedFile) {
        return <TextContent fileId={selectedFile.id} initialText={selectedFile.content} onBackButtonClick={handleBackButtonClick} />;
    }

    const sampleTask: Task = {
        subject: 'Sample Task',
        details: 'John Doe',
        to: 'Jane Doe',
        date: '2024-03-05',
        time: '10:00 AM',
        context: 'Specific',
        message: 'This is a sample task message.',
        files: [
            { id: 1, name: 'Document 1', content: 'Sample content for Document 1' },
        ],
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'start', background: '#f0f2f5' }}>
                <Card style={{ width: '100%', maxWidth: '800px', background: '#fff' }}>
                    <Title level={2}>{sampleTask.subject}</Title>
                    <Timeline>
                        <Timeline.Item dot={<UserOutlined style={{ fontSize: '16px' }} />} color="green">
                            From: <Text>{sampleTask.details}</Text>
                        </Timeline.Item>
                        <Timeline.Item dot={<UserOutlined style={{ fontSize: '16px' }} />} color="blue">
                            To: <Text>{sampleTask.to}</Text>
                        </Timeline.Item>
                        <Timeline.Item dot={<CalendarOutlined style={{ fontSize: '16px' }} />} color="red">
                            Date: <Text>{sampleTask.date}</Text>
                        </Timeline.Item>
                        <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                            Time: <Text>{sampleTask.time ? sampleTask.time : 'Not specified'}</Text>
                        </Timeline.Item>
                        <Timeline.Item dot={<FileTextOutlined style={{ fontSize: '16px' }} />} color="orange">
                            Document Context: <Text>{sampleTask.context ? sampleTask.context : 'General'}</Text>
                        </Timeline.Item>
                    </Timeline>
                    <Card type="inner" title="Message" extra={<Tag color="blue">Translation Task</Tag>}>
                        <Text>{sampleTask.message}</Text>
                    </Card>
                    {/* Display files with updated styling */}
                    {sampleTask.files.map((file, index) => (
                        <Card
                            key={index}
                            type="inner"
                            title={<><FileOutlined /> {file.name}</>}
                            style={{
                                marginTop: '20px',
                                backgroundColor: '#e6f7ff', // Light blue background
                                border: '1px solid #1890ff', // Blue border
                                borderRadius: '4px',
                            }}
                        >
                            <a href="#" onClick={() => handleFileClick(file)}>
                                View Document
                            </a>
                        </Card>
                    ))}
                </Card>
            </Content>
        </Layout>
    );
};

export default TaskDetail;
