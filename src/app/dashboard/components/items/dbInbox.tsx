import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Checkbox, Button, Tag, List, Card, Space, Tooltip, message, Modal } from 'antd';
import { CheckCircleTwoTone, ClockCircleTwoTone, InfoCircleOutlined } from '@ant-design/icons';
import TaskDetail from './dbTaskDetail';
import { Task } from '@/types';

const InboxContent: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [displayCompleted, setDisplayCompleted] = useState(0);
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
  const [taskIdToComplete, setTaskIdToComplete] = useState<number | null>(null);


  const currentUser = localStorage.getItem('translatorId') ? parseInt(localStorage.getItem('translatorId')!) : null;

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/tasks/${currentUser}`);
      const tasksArray = response.data.task_tbl || [];
      console.log(tasksArray)
      const fetchedTasks = tasksArray.map((task: any) => ({
        id: task.taskId || null,
        name: task.taskName || '',
        context: task.context || '',
        message: task.message || '',
        status: task.status,
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
        }
      }));
      setTasks(fetchedTasks);
    } catch (error: any) {
      console.error('Error fetching tasks:', error.response?.data || error);
    }
  };

  const [refreshTasks, setRefreshTasks] = useState(false);

  useEffect(() => {
    fetchTasks();
    forceRefreshTasks();
  }, [currentUser, refreshTasks]);
  
  // Function to force refresh tasks
  const forceRefreshTasks = () => {
    setRefreshTasks(prevState => !prevState);
  };

  const showConfirmModal = (taskId: number) => {
    setTaskIdToComplete(taskId);
    setConfirmVisible(true);
  };


  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
  };

  const handleTaskCheck = async (id: number) => {
    try {
      // Find the task in the tasks array and update its status
      const updatedTasks = tasks.map(task => {
        if (task.id === id) {
          return { ...task, status: true }; // Assuming true means completed
        }
        return task;
      });
  
      // Update the state with the updated tasks array
      setTasks(updatedTasks);
  
      // Show the confirmation modal
      showConfirmModal(id);
    } catch (error: any) {
      console.error('Error handling task check:', error.message);
      message.error('Error handling task check', 1);
    }
  };
  

  const handleConfirmOk = async () => {
    try {
      await axios.post(`http://localhost:3001/api/tasks/complete/${taskIdToComplete}`);
      await fetchTasks();
      setConfirmVisible(false);
      message.success('Task marked as complete', 1);
    } catch (error: any) {
      console.error('Error marking task as complete:', error.message);
      message.error('Error marking task as complete', 1);
    }
  };



  const handleConfirmCancel = () => {
    setConfirmVisible(false);
  };

  const filteredTasks = tasks.filter(task => task.status === displayCompleted);

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
                onClick={() => setDisplayCompleted(0)}
              >
                In Progress
              </Button>
              <Button
                icon={<CheckCircleTwoTone twoToneColor={displayCompleted ? "#1890ff" : ""} />}
                onClick={() => setDisplayCompleted(1)}
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
                    avatar={item.status ? null : (
                      <Checkbox
                        checked={item.status}
                        onChange={() => handleTaskCheck(item.id)}
                      />
                    )}
                    title={<a onClick={() => handleTaskSelect(item)}>{item.name}</a>}
                    description={item.document.title}
                  />
                  {item.status ? <Tag color="success">Completed</Tag> : <Tag color="processing">In Progress</Tag>}
                </List.Item>
              )}
            />

          </Card>
        )}
        <Modal
          title="Complete Task"
          visible={confirmVisible}
          onOk={handleConfirmOk}
          onCancel={handleConfirmCancel}
          okText="Yes"
          cancelText="No"
          okButtonProps={{ style: { backgroundColor: '#214B71', color: '#FFFFFF' } }}
        >
          <p>Are you sure you want to mark this task as complete?</p>
        </Modal>
      </div>
    </div>
  );
};

export default InboxContent;
