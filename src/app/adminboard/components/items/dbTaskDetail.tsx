import React, { useState } from 'react';
import { Layout, Typography, Card, Tag, Timeline, Button } from 'antd';
import {
    ClockCircleOutlined,
    FileTextOutlined,
    UserOutlined,
    CalendarOutlined,
    FolderOpenOutlined,  // Importing a new icon for documents
} from '@ant-design/icons';

import TextContent from './dbText'; // Assuming the correct import path for TextContent

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

const TaskDetail: React.FC<{ task: Task; onBack: () => void }> = ({ task, onBack }) => {
    const [showTextContent, setShowTextContent] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileClick = (file: File) => {
        setSelectedFile(file);
        setShowTextContent(true);
    };

    const handleBackButtonClick = () => {
        setShowTextContent(false);
        setSelectedFile(null);
    };

    if (showTextContent && selectedFile) {
        return <TextContent fileId={selectedFile.id} initialText={selectedFile.content} onBackButtonClick={handleBackButtonClick} />;
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'start', background: '#f0f2f5' }}>
                <Card style={{ width: '100%', maxWidth: '800px', background: '#fff' }}>
                    <Title level={2}>{task.subject}</Title>
                    <Timeline>
                        {/* Timeline items */}
                    </Timeline>
                    <Card type="inner" title="Message" extra={<Tag color="blue">Translation Task</Tag>}>
                        <Text>{task.message}</Text>
                    </Card>
                    {/* Display files with updated styling and icons */}
                    {task.files.map((file, index) => (
                        <Card key={index} type="inner" title="Document" extra={<FolderOpenOutlined/>} style={{ marginTop: '20px', backgroundColor: '#f5f5f5' }}>
                            <a href="#" onClick={() => handleFileClick(file)}>
                                {file.name}
                            </a>
                        </Card>
                    ))}
                </Card>
            </Content>
        </Layout>
    );
};

export default TaskDetail;
