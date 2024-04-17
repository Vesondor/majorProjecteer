import React, { useState } from 'react';
import { Layout, Typography, Card, Tag, Timeline, Button } from 'antd';
import { ClockCircleOutlined, UserOutlined, CalendarOutlined, FileOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import TextContent from './dbText'; // Ensure the path is correct
import { File, Task, DocumentStyle, Op } from '@/types';
const { Content } = Layout;
const { Title, Text } = Typography;


const TaskDetail: React.FC<{ task: Task; onBack: () => void }> = ({ task, onBack }) => {
  const [showTextContent, setShowTextContent] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileClick = (file: File) => {
    setSelectedFile(file);
    setShowTextContent(true);
  };

  const handleBackToTaskDetail = () => {
    setShowTextContent(false);
    setSelectedFile(null);
  };

  if (showTextContent && selectedFile) {
    // Extract the text from the documentStyle object
    let initText = selectedFile.documentStyle?.ops[0]?.insert || ''; // Default to an empty string if ops[0]?.insert is undefined
    
    const parsedText = JSON.parse(initText);
            if (parsedText && typeof parsedText === 'object' && 'content' in parsedText) {
                initText = parsedText.content; // Use the HTML content
            }
    // Extract the translated text directly from the selectedFile
    const initTranslateText = selectedFile.translatedContent;
  
    return (
      <TextContent
        fileId={selectedFile.id}
        title={selectedFile.title}
        initText={initText}
        initTranslateText={initTranslateText}
        onBackButtonClick={handleBackToTaskDetail}
      />
    );
  }
  

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'start', background: '#f0f2f5' }}>
        <Card style={{ width: '100%', maxWidth: '800px', background: '#fff' }}>
          <Button icon={<ArrowLeftOutlined />} onClick={onBack} style={{ marginBottom: '15px' }}>Back</Button>
          <Title level={2}>{task.name}</Title>
          <Timeline>
            <Timeline.Item dot={<UserOutlined />} color="green">
              From: <Text>{task.assignor.username}</Text>
            </Timeline.Item>
            <Timeline.Item dot={<UserOutlined />} color="blue">
              To: <Text>{task.receiver.username}</Text>
            </Timeline.Item>
            <Timeline.Item dot={<CalendarOutlined />} color="red">
              Date Created: <Text>{task.document.dateCreated}</Text>
            </Timeline.Item>
            <Timeline.Item dot={<ClockCircleOutlined />}>
              Deadline: <Text>{task.document.deadline ? task.document.deadline : 'Not specified'}</Text>
            </Timeline.Item>
            <Timeline.Item dot={<FileOutlined />} color="orange">
              Context: <Text>{task.context}</Text>
            </Timeline.Item>
          </Timeline>
          <Card
            type="inner"
            title={<><FileOutlined /> {task.document.title}</>}
            extra={<Tag color="blue">Translation Task</Tag>}
            style={{
              marginTop: '20px',
              backgroundColor: '#e6f7ff',
              border: '1px solid #1890ff',
              borderRadius: '4px',
            }}
          >
            <Button type="primary" className='bg-blue-500' onClick={() => handleFileClick(task.document)}>
              View Document
            </Button>
          </Card>
        </Card>
      </Content>
    </Layout>
  );
};

export default TaskDetail;
