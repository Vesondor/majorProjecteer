import React, { useState } from 'react';
import { Checkbox, Divider, Button, Tag, List, Card, Space, Tooltip } from 'antd';
import { ArrowLeftOutlined, CheckCircleTwoTone, ClockCircleTwoTone, CloseCircleOutlined, EditTwoTone, InfoCircleOutlined } from '@ant-design/icons';
import TaskDetail from './dbTaskDetail'; // Ensure this path matches your actual import path

const InboxContent: React.FC = () => {
  const tasks = [
    { id: 1, name: 'Task 1', category: 'Category 1', details: 'Task 1 details', completed: false },
    { id: 2, name: 'Task 2', category: 'Category 2', details: 'Task 2 details', completed: false },
    { id: 3, name: 'Task 3', category: 'Category 3', details: 'Task 3 details', completed: true },
  ];

  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [displayCompleted, setDisplayCompleted] = useState<boolean>(false);

  const handleTaskSelect = (task: any) => {
    setSelectedTask(task);
  };

  const handleGoBack = () => {
    setSelectedTask(null);
  };

  const handleTaskCheck = (task: any) => {
    task.completed = !task.completed;
  };

  const filteredTasks = displayCompleted ? tasks.filter(task => task.completed) : tasks.filter(task => !task.completed);

  return (
    <div className="inbox-content min-h-[700px]" style={{ textAlign: 'left' }}> {/* Adjust the text alignment here */}
      {selectedTask ? (
        <>
          <Button onClick={handleGoBack} icon={<ArrowLeftOutlined />} style={{ marginBottom: '10px' }}>
            Back
          </Button>
          <TaskDetail task={selectedTask} />
        </>
      ) : (
        <Card
          title="Task Inbox"
          extra={
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
          }
          style={{ textAlign: 'left' }} // Ensure card content aligns to the left
        >
          <List
            itemLayout="horizontal"
            dataSource={filteredTasks}
            renderItem={item => (
              <List.Item
                actions={[
                  <Tooltip title="Details">
                    <Button icon={<InfoCircleOutlined />} onClick={() => handleTaskSelect(item)} />
                  </Tooltip>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Checkbox
                      checked={item.completed}
                      onChange={() => handleTaskCheck(item)}
                    />
                  }
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
