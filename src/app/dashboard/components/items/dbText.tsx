import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Button, Divider, Layout, Space, Typography, message, Spin } from 'antd';
import axios from 'axios';
import { ArrowLeftOutlined, SaveFilled } from '@ant-design/icons';
import { TextContentProps } from '@/types';
import 'react-quill/dist/quill.snow.css';

const { Content, Header } = Layout;
const { Title, Text } = Typography;

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });



const TextContent: React.FC<TextContentProps> = ({
  fileId,
  title,
  initText,
  initMachine,
  initTranslateText,
  onBackButtonClick,
}) => {
  const [text, setText] = useState("<strong>sldasodasodasodsaoda</strong>");
  const [translatedText, setTranslateText] = useState(initTranslateText);
  const [machineTranslated, setMachineTranslated] = useState('');
  const [loading, setLoading] = useState(false);
  const [machineLoading, setMachineLoading] = useState(false);

  useEffect(() => {
    setText(initText);
    setMachineTranslated(initMachine);
  }, [initText]);

  const handleChange = (content: string) => {
    setText(content);
  };

  const saveDocument = async () => {
    try {
      const documentStyle = JSON.stringify({ content: text });
      const wordSpaced = text.replace(/<[^>]+>/g, '').split(' ');
      const wordCount = wordSpaced.length;
      const documentTranslated = initTranslateText;

      await axios.put(`http://localhost:3001/api/documents/${fileId}`, {
        documentStyle,
        wordCount,
        documentTranslated,
        documentMachine: machineTranslated
      });
      message.success('Document saved to server', 1);
    } catch (error: any) {
      console.error('Error saving document:', error.message);
      message.error('Error saving document', 1);
    }
  };

  const translateDocument = async (language: string) => {
    try {
      // Set loading state to true for buttons
      setLoading(true);

      // Set a timeout before showing the loading indicator for machine translation
      const timeout = setTimeout(() => {
        setMachineLoading(true);
      }, 2000);

      const response = await axios.post(`http://localhost:3001/api/${language}`, {
        text: initTranslateText,
      });

      // Clear the timeout and hide the loading indicator after translation is complete
      clearTimeout(timeout);
      setLoading(false);
      setMachineLoading(false);

      message.success('Document translated', 2);
      setMachineTranslated(response.data.translation);
    } catch (error: any) {
      // Clear the timeout and hide the loading indicators if there's an error
      setLoading(false);
      setMachineLoading(false);

      console.error('Error translating document:', error.message);
      message.error('Error translating document', 2);
    }
  };


  const handleSave = () => {
    saveDocument();
  };

  const handleKhmer = () => {
    translateDocument('kh');
  }
  const handleEnglish = () => {
    translateDocument('eng');
  }

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      ['clean'],
    ],
  };

  useEffect(() => {
    const saveText = (event: any) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault();
        handleSave();
      }
    };
    document.addEventListener('keydown', saveText);
    return () => {
      document.removeEventListener('keydown', saveText);
    };
  }, [text, fileId]);

  return (
    <Layout>
      <Header style={{ backgroundColor: '#214B71' }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Button className="bg-white" icon={<ArrowLeftOutlined />} onClick={onBackButtonClick} style={{ color: '#214B71' }}>
            Back
          </Button>
          <h5 className="font-bold text-white dark:text-white">{title}</h5>
          <Space>
            <Spin spinning={loading}>
              <Button type="primary" className="bg-blue-500" onClick={handleKhmer}>
                Translate to Khmer
              </Button>
            </Spin>
            <Spin spinning={loading}>
              <Button type="primary" className="bg-blue-500" onClick={handleEnglish}>
                Translate to English
              </Button>
            </Spin>
          </Space>
          <Button icon={<SaveFilled />} type="primary" className="bg-blue-500" onClick={handleSave}>
            Save
          </Button>
        </Space>
      </Header>
      <Content style={{ display: 'flex', height: 'calc(100vh - 64px)', padding: '20px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
          <div style={{ flex: 1, overflow: 'auto' }}>
            <Title level={4} className="text-blue-900">
              Original Text
            </Title>
            <Text style={{ whiteSpace: 'pre-wrap' }}>{initTranslateText}</Text>
          </div>
          <Divider />
          <div style={{ flex: 1, overflow: 'auto' }}>
            <Title level={4} className="text-gray-800">
              Machine Translation
            </Title>
            {machineLoading ? (
              <Spin spinning={machineLoading}>
                <Text>{machineTranslated}</Text>
              </Spin>
            ) : (
              <Text>{machineTranslated}</Text>
            )}
          </div>
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Title level={4} className="text-red-900">
            Translated Text
          </Title>
          <ReactQuill
            theme="snow"
            value={text}
            onChange={handleChange}
            modules={modules}
            style={{
              height: '100%',
              overflow: 'auto',
              backgroundColor: '#f5f5f5',
              border: '1px solid #e8e8e8',
              borderRadius: '4px',
              padding: '20px',
            }}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default TextContent;