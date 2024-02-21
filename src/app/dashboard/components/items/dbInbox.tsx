import React, { useState } from 'react';
import { Checkbox, Divider, Button, Tag, List, Card, Space, Tooltip } from 'antd';
import { ArrowLeftOutlined, CheckCircleTwoTone, ClockCircleTwoTone, EditTwoTone, FileTwoTone, InfoCircleOutlined } from '@ant-design/icons';
import TaskDetail from './dbTaskDetail'; // Ensure path correctness

// Assuming Task type for better type checking
interface Task {
  id: number;
  name: string;
  category: string;
  details: string;
  message: string;
  completed: boolean;
}

const InboxContent: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Task 1', category: 'Category 1', details: 'Task 1 details', message: 'Hello there, I hope this reached you well', completed: false },
    { id: 2, name: 'Task 2', category: 'Category 2', details: 'Task 2 details', message: 'Hello there, I hope this reached you well', completed: false },
    { id: 3, name: 'Task 3', category: 'Category 3', details: 'Task 3 details', message: 'Hello there, I hope this reached you well', completed: true },
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [displayCompleted, setDisplayCompleted] = useState(false);

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
  };

  const handleGoBack = () => {
    setSelectedTask(null);
  };

  // Updated to properly modify state
  const handleTaskCheck = (taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter(task => task.completed === displayCompleted);

  return (
    <div className="inbox-content" style={{ minHeight: '700px', textAlign: 'left' }}>
      {selectedTask ? (
        <>
          <Button onClick={handleGoBack} icon={<ArrowLeftOutlined />} style={{ marginBottom: '10px' }}>
            Back
          </Button>
          <TaskDetail task={selectedTask} />
        </>
      ) : (
        <Card title="Task List" extra={
          <Space>
            <Button
              icon={<ClockCircleTwoTone twoToneColor={!displayCompleted ? "#52c41a" : ""} />}
              onClick={() => setDisplayCompleted(false)}
            >
              In Progress
            </Button>
            <Button
              icon={<CheckCircleTwoTone twoToneColor={displayCompleted ? "#1890ff" : ""} />}
              onClick={() => setDisplayCompleted(true)}
            >
              Completed
            </Button>
          </Space>
        }>
          <List
            itemLayout="horizontal"
            dataSource={filteredTasks}
            renderItem={(item: Task) => (
              <List.Item
                key={item.id} // Fix for missing "key" prop error
                actions={[
                  <Tooltip title="Details" key="details">
                    <Button icon={<InfoCircleOutlined />} onClick={() => handleTaskSelect(item)} />
                  </Tooltip>
                ]}
              >
                <List.Item.Meta
                  avatar={<Checkbox checked={item.completed} onChange={() => handleTaskCheck(item.id)} />}
                  title={<a onClick={() => handleTaskSelect(item)}>{item.name}</a>}
                  description={item.category}
                />
                {item.completed ? <Tag color="success">Completed</Tag> : <Tag color="processing">In Progress</Tag>}
              </List.Item>
            )}
          />
        </Card>
      )}
    </div>
  );
};

export default InboxContent;
