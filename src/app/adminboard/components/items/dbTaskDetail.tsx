import React, { useState } from 'react';
import { Layout, Typography, Card, Tag, Timeline, Button } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';
import { Task, File } from '@/types';

const { Content } = Layout;
const { Title, Text } = Typography;

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
          <Title level={2}>{task.name || 'Task Details'}</Title>
          <Text>{task.context || 'No additional details provided.'}</Text>
          <br />
          <Text strong>To: {task.assignor.username || 'Not specified'}</Text>
          <br />
          <Text type="secondary">Date: {task.document.dateCreated || 'Not specified'}</Text>
          <br />
          <Text type="secondary">Context: {task.context || 'Not specified'}</Text>
          <br />
          <Card type="inner" title="Message" extra={<Tag color="blue">Translation Task</Tag>} style={{ marginTop: '15px' }}>
            <Text>{task.message || 'No message provided.'}</Text>
          </Card>
          <Timeline style={{ marginTop: '20px' }}>
            <Timeline.Item color="green">Task Created {task.document.dateCreated}</Timeline.Item>
            {task.document.dateCreated && <Timeline.Item color="blue">Time Allocated {task.document.deadline}</Timeline.Item>}
          </Timeline>
        </Card>
      </Content>
    </Layout>
  );
};

export default TaskDetail;
