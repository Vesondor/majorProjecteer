import React, { useState } from 'react';
import { Layout, Typography, Card, Tag, Timeline, Button } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

interface File {
  id: number;
  name: string;
  content: string;
}

interface Task {
  subject?: string;
  details?: string;
  to?: string;
  date?: string;
  time?: string;
  context?: string;
  message?: string;
  files?: File[];
}

const TaskDetail: React.FC<{ task: Task; onBack: () => void }> = ({ task, onBack }) => {
  const [showTextContent, setShowTextContent] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileClick = (file: File) => {
    setSelectedFile(file);
    setShowTextContent(true);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'start', background: '#f0f2f5' }}>
        <Card style={{ width: '100%', maxWidth: '800px', background: '#fff' }}>
          <Button onClick={onBack} style={{ marginBottom: '15px' }}>Back</Button>
          <Title level={2}>{task.subject || 'Task Details'}</Title>
          <Text>{task.details || 'No additional details provided.'}</Text>
          <br />
          <Text strong>To: {task.to || 'Not specified'}</Text>
          <br />
          <Text type="secondary">Date: {task.date || 'Not specified'}</Text>
          {task.time && <Text type="secondary"> at {task.time}</Text>}
          <br />
          <Text type="secondary">Context: {task.context || 'Not specified'}</Text>
          <br />
          <Card type="inner" title="Message" extra={<Tag color="blue">Translation Task</Tag>}>
            <Text>{task.message || 'No message provided.'}</Text>
          </Card>
          <Timeline>
            <Timeline.Item color="green">Task Created {task.date}</Timeline.Item>
            {task.time && <Timeline.Item color="blue">Time Allocated {task.time}</Timeline.Item>}
          </Timeline>
          {task.files?.map((file, index) => (
            <Card key={index} type="inner" title="Document" extra={<FolderOpenOutlined />} style={{ marginTop: '20px', backgroundColor: '#f5f5f5' }}>
              <a onClick={() => handleFileClick(file)}>
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
