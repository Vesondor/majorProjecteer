import React, { useState } from 'react';
import { Layout, Typography, Card, Tag, Timeline } from 'antd';
import {
  ClockCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  FileOutlined,
} from '@ant-design/icons';

const { Content } = Layout;
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
  context:string;
  message:string;
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

const TaskDetail: React.FC<{ task: Task; onBack: () => void;}> = ({ task, onBack }) => {
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
    return (
      <div>Text Content Component Goes Here</div>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'start', background: '#f0f2f5' }}>
        <Card style={{ width: '100%', maxWidth: '800px', background: '#fff' }}>
          <Title level={2}>{task.name}</Title>
          <Timeline>
            <Timeline.Item dot={<UserOutlined style={{ fontSize: '16px' }} />} color="green">
              From: <Text>{task.assignor.username}</Text>
            </Timeline.Item>
            <Timeline.Item dot={<UserOutlined style={{ fontSize: '16px' }} />} color="blue">
              To: <Text>{task.receiver.username}</Text>
            </Timeline.Item>
            <Timeline.Item dot={<CalendarOutlined style={{ fontSize: '16px' }} />} color="red">
              Date Created: <Text>{task.document.dateCreated}</Text>
            </Timeline.Item>
            <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
              Date Closed: <Text>{task.document.deadline ? task.document.deadline : 'Not closed'}</Text>
            </Timeline.Item>
            <Timeline.Item dot={<FileOutlined style={{ fontSize: '16px' }} />} color="orange">
              Document Context: <Text>{task.context}</Text>
            </Timeline.Item>
          </Timeline>
          <Card type="inner" title="Message" extra={<Tag color="blue">Translation Task</Tag>}>
            <Text>{task.message}</Text>
          </Card>
          <Card
            type="inner"
            title={<><FileOutlined /> {task.document.title}</>}
            style={{
              marginTop: '20px',
              backgroundColor: '#e6f7ff',
              border: '1px solid #1890ff',
              borderRadius: '4px',
            }}
          >
            <a href="#" onClick={() => handleFileClick(task.document)}>
              View Document
            </a>
          </Card>
        </Card>
      </Content>
    </Layout>
  );
};

export default TaskDetail;
