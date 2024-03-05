import React, { useState } from 'react';
import { Form, Input, DatePicker, Button, Select, Upload } from 'antd';
import { UploadOutlined, UserOutlined, FileAddOutlined, CalendarOutlined } from '@ant-design/icons';
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
  padding: 20px;
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
  const [fileList, setFileList] = useState<any[]>([]); // State for file upload
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        // Handle form submission here, e.g., save the task to the database
        console.log('Form values:', values);
        console.log('File:', fileList[0]);
      })
      .catch(error => {
        console.log('Validation failed:', error);
      });
  };

  // File upload configuration
  const uploadProps = {
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: (file: any) => {
      setFileList([file]);
      return false;
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
        <FormItem
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter the title' }]}
        >
          <Input prefix={<FileAddOutlined style={{ fontSize: '18px' }} />} placeholder="Enter the task title" />
        </FormItem>
        <FormItem
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter the description' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter the task description" prefix={String(<FileAddOutlined style={{ fontSize: '18px' }} />)} />
        </FormItem>
        <FormItem
          label="Deadline"
          name="deadline"
          rules={[{ required: true, message: 'Please select the deadline' }]}
        >
          <DatePicker style={{ width: '100%' }} suffixIcon={<CalendarOutlined style={{ fontSize: '18px' }} />} />
        </FormItem>
        <FormItem
          label="Assigned To"
          name="assignedTo"
          rules={[{ required: true, message: 'Please select the assignee' }]}
        >
          <Select
            placeholder="Select the assignee"
            suffixIcon={<UserOutlined style={{ fontSize: '18px' }} />}
          >
            <Option value="John Doe">John Doe</Option>
            <Option value="Jane Smith">Jane Smith</Option>
            <Option value="Alice Johnson">Alice Johnson</Option>
          </Select>
        </FormItem>
        <FormItem label="Attachment" name="attachment">
          <UploadContainer isDragging={isDragging}>
            <Upload {...uploadProps}>
              <UploadButton icon={<UploadOutlined />} >Select File</UploadButton>
            </Upload>
            {fileList.length > 0 && <FileName>{fileList[0].name}</FileName>}
          </UploadContainer>
        </FormItem>
        <FormItem style={{ textAlign: 'center' }}>
          <StyledButton type="primary" htmlType="submit" style={{backgroundColor: '#214B71'}}>
            Create
          </StyledButton>
        </FormItem>
      </StyledForm>
    </PageContainer>
  );
};

export default CreateTaskPage;
