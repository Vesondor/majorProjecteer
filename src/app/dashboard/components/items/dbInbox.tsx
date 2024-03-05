import React, { useState } from 'react';
import { Checkbox, Button, Tag, List, Card, Space, Tooltip } from 'antd';
import { ArrowLeftOutlined, CheckCircleTwoTone, ClockCircleTwoTone, InfoCircleOutlined } from '@ant-design/icons';
import TaskDetail from './dbTaskDetail'; // Ensure the import path is correct

// Define the Task interface for better type checking
interface Task {
  id: number;
  name: string;
  category: string;
  details: string;
  message: string;
  completed: boolean;
}

const InboxContent: React.FC = () => {
  // State for the list of tasks
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Task 1', category: 'Category 1', details: 'Task 1 details', message: 'Hello there, I hope this reached you well', completed: false },
    { id: 2, name: 'Task 2', category: 'Category 2', details: 'Task 2 details', message: 'Hello there, I hope this reached you well', completed: false },
    { id: 3, name: 'Task 3', category: 'Category 3', details: 'Task 3 details', message: 'Hello there, I hope this reached you well', completed: true },
  ]);

  // State for the currently selected task
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // State to toggle between displaying completed and in-progress tasks
  const [displayCompleted, setDisplayCompleted] = useState(false);

  // Function to handle task selection
  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
  };

  // Function to toggle the completion status of a task
  const handleTaskCheck = (taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task)
    );
  };

  // Filter tasks based on the completion status
  const filteredTasks = tasks.filter(task => task.completed === displayCompleted);

  return (
    <div style={{ padding: '20px', backgroundColor: '#214B71', minHeight: '100vh', boxSizing: 'border-box' }}>
      <div className="inbox-content" style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', minHeight: '95vh'}}>
        {selectedTask ? (
          <TaskDetail task={selectedTask} onBack={() => setSelectedTask(null)} />
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
                  actions={[
                    <Tooltip title="Details">
                      <Button icon={<InfoCircleOutlined />} onClick={() => handleTaskSelect(item)} />
                    </Tooltip>,
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
    </div>
  );
};

export default InboxContent;
