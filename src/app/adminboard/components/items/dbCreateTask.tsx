import React, { useState } from 'react';
import { Form, Input, DatePicker, Button, Select, Upload, Modal } from 'antd';
import { UploadOutlined, UserOutlined, FileAddOutlined, CalendarOutlined, BookOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Option } = Select;

const PageContainer = styled.div<{ isDragging: boolean }>`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${({ isDragging }) => (isDragging ? 'rgba(0, 0, 0, 0.1)' : 'transparent')};
`;

const StyledForm = styled(Form)`
  width: 80%;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

const FormItem = styled(Form.Item)`
  margin-bottom: 24px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  font-size: 24px;
  color: #333;
`;

const StyledButton = styled(Button)`
  width: 140px;
  font-size: 12px;
`;

const UploadContainer = styled.div<{ isDragging: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed ${({ isDragging }) => (isDragging ? '#1890ff' : '#ccc')};
  padding: 50px;
  border-radius: 10px;
  cursor: pointer;
`;

const FileName = styled.span`
  margin-left: 10px;
  font-size: 14px;
`;

const UploadButton = styled(StyledButton)`
  font-size: 14px;
  white-space: nowrap;
`;

const CreateTaskPage: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ocrText, setOcrText] = useState<string | null>(null);
  const [taskDetails, setTaskDetails] = useState<any>(null);

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      if (fileList.length > 0) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result as string;
          setIsModalVisible(true);

          try {
            const response = await fetch('/api/ocr', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ image: base64String.split(',')[1] }),
            });
            const data = await response.json();

            // Process OCR text right here
            alert(JSON.stringify(values))
            const cleanedText = data.text.replace(/<[^>]*>/g, '') ?? '';
            const docStyle = JSON.stringify(cleanedText).replace(/"/g, '');
            setOcrText(data.text); // Update state, but use local 'cleanedText' for immediate processing

            // Prepare task details to be confirmed
            setTaskDetails({
              taskName: values.title,
              context: values.context,
              message: values.message,
              documentName: values.title,
              documentTranslated: "",
              documentStyle: docStyle,
              language: 'en',
              wordCount: data.text.split(' ').length,
            });

          } catch (error) {
            console.error('Error:', error);
            setIsModalVisible(false);
            Modal.error({
              title: 'Error Processing OCR',
              content: 'Failed to process the OCR request.',
            });
          }
        };
        reader.readAsDataURL(fileList[0]);
      } else {
        Modal.error({
          title: 'No file selected',
          content: 'Please select a file for OCR processing.',
        });
      }
    }).catch((error) => {
      console.log('Validation failed:', error);
    });
  };


  const handleConfirmTask = async () => {
    if (!taskDetails) return;

    try {
      const currentUserId = localStorage.getItem('adminId') ? parseInt(localStorage.getItem('adminId')!) : null;
      if (currentUserId) {
        const response = await fetch('http://localhost:3001/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...taskDetails,
            assignorId: currentUserId,
            receiverId: 4, // Example, set as per your actual data
            projectId: 1, // Example, set as per your actual data
          }),
        });
        const data = await response.json();
        console.log('Task created:', data);
        setIsModalVisible(false);
        Modal.success({
          title: 'Task Created',
          content: 'Task and document were successfully created.',
        });
      } else {
        Modal.error({
          title: 'No User ID found',
          content: 'Unable to create the task due to missing user ID.',
        });
      }
    } catch (error) {
      console.error('Error creating task:', error);
      setIsModalVisible(false);
      Modal.error({
        title: 'Task Creation Failed',
        content: 'Failed to create the task and document.',
      });
    }
  };

  const uploadProps = {
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: (file: File) => {
      setFileList([file]);
      return false; // Prevent automatic uploading
    },
    fileList,
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setFileList([...e.dataTransfer.files]);
  };

  return (
    <PageContainer
      isDragging={isDragging}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <StyledForm form={form} layout="vertical" onFinish={handleSubmit}>
        <Title>Create New Task</Title>
        <FormItem label="Title" name="title" rules={[{ required: true, message: 'Please enter the title' }]}>
          <Input prefix={<FileAddOutlined style={{ fontSize: '18px' }} />} placeholder="Enter the task title" />
        </FormItem>
        <FormItem label="Context" name="context" rules={[{ required: true, message: 'Please enter the context' }]}>
          <Input prefix={<BookOutlined style={{ fontSize: '18px' }} />} placeholder="Enter the task's specific context" />
        </FormItem>
        <FormItem label="Message" name="message" rules={[{ required: true, message: 'Please enter the message' }]}>
          <Input.TextArea rows={4} placeholder="Enter the message to Translator" />
        </FormItem>
        <FormItem label="Deadline" name="deadline" rules={[{ required: true, message: 'Please select the deadline' }]}>
          <DatePicker style={{ width: '100%' }} suffixIcon={<CalendarOutlined style={{ fontSize: '18px' }} />} />
        </FormItem>
        <FormItem label="Assigned To" name="assignedTo" rules={[{ required: true, message: 'Please select the assignee' }]}>
          <Select
            placeholder="Select the assignee"
            suffixIcon={<UserOutlined style={{ fontSize: '18px' }} />}
          >
            <Option value="John Doe">John Doe</Option>
            <Option value="Jane Smith">Jane Smith</Option>
            <Option value="Alice Johnson">Alice Johnson</Option>
          </Select>
        </FormItem>
        <FormItem label="Attachment" name="attachment" rules={[{ required: true, message: 'Please upload an attachment' }]}>
          <UploadContainer isDragging={isDragging}>
            <Upload {...uploadProps}>
              <UploadButton icon={<UploadOutlined />}>Select File</UploadButton>
            </Upload>
            {fileList.length > 0 && <FileName>{fileList[0].name}</FileName>}
          </UploadContainer>
        </FormItem>
        <FormItem style={{ textAlign: 'center' }}>
          <StyledButton type="primary" htmlType="submit" style={{ backgroundColor: '#214B71' }}>
            Create
          </StyledButton>
        </FormItem>
      </StyledForm>
      <Modal
        title="Confirm Task Creation"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleConfirmTask}>
            Confirm
          </Button>,
        ]}
      >
        {ocrText ? <p>{ocrText}</p> : <p>Processing...</p>}
      </Modal>
    </PageContainer>
  );
};

export default CreateTaskPage;