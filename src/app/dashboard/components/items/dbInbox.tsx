import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Checkbox, Button, Tag, List, Card, Space, Tooltip } from 'antd';
import { CheckCircleTwoTone, ClockCircleTwoTone, InfoCircleOutlined } from '@ant-design/icons';
import TaskDetail from './dbTaskDetail';

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

const InboxContent: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [displayCompleted, setDisplayCompleted] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tasks/4');
      console.log(response.data);
      const tasksArray = response.data.task_tbl || [];
      const fetchedTasks = tasksArray.map((task:any) => ({
        id: task.taskId || null,
        name: task.taskName || '',
        context: task.context||'',
        message: task.message || '',
        assignor: {
          username: task.assignor?.username || '',
          role: task.assignor?.role || '',
        },
        receiver: {
          username: task.receiver?.username || '',
          role: task.receiver?.role || '',
        },
        document: {
          id: task.documentId,
          title: task.document.documentName,
          content: task.document.documentStyle.ops.map((op: any) => op.insert).join('').trim(),
          translatedContent: task.document.documentTranslated,
          timestamp: new Date(task.document.timestamp).toLocaleString(),
          dateCreated: new Date(task.document.dateCreated).toLocaleString(),
          documentStyle: task.document.documentStyle,
          deadline: new Date(task.document.deadline).toLocaleString(),
          status: task.document.status,
        },
        completed: task.completed || false,
      }));
      setTasks(fetchedTasks);
    } catch (error:any) {
      console.error('Error fetching tasks:', error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
  };

  const handleTaskCheck = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task)
    );
  };

  const filteredTasks = tasks.filter(task => task.completed === displayCompleted);

  return (
    <div style={{ padding: '20px', backgroundColor: '#214B71', minHeight: '100vh', boxSizing: 'border-box' }}>
      <div className="inbox-content" style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', minHeight: '95vh' }}>
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
                    description={item.document.title}
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
