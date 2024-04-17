import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Button, Divider, Layout, Space, Typography, message } from 'antd';
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
  initTranslateText,
  onBackButtonClick,
}) => {
  const [text, setText] = useState("<strong>sldasodasodasodsaoda</strong>");
  const [translatedText, setTranslateText] = useState(initTranslateText);

  useEffect(() => {
    setText(initText);
  }, [initText]);

  const handleChange = (content: string) => {
    setText(content);
  };

  const saveDocument = async () => {
    try {
      // Send HTML content directly; no need to strip tags
      const documentStyle = JSON.stringify({ content: text });
      const wordSpaced = text.replace(/<[^>]+>/g, '').split(' '); // Calculate word count without HTML tags
      const wordCount = wordSpaced.length;
      const documentTranslated = initTranslateText;

      await axios.put(`http://localhost:3001/api/documents/${fileId}`, {
        documentStyle,
        wordCount,
        documentTranslated,
      });
      message.success('Document saved to server', 1);
    } catch (error: any) {
      console.error('Error saving document:', error.message);
      message.error('Error saving document', 1);
    }
  };

  const handleSave = () => {
    saveDocument();
  };

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
          <Button
            className="bg-white"
            icon={<ArrowLeftOutlined />}
            onClick={onBackButtonClick}
            style={{ color: '#214B71' }}
          >
            Back
          </Button>
          <h5 className='font-bold'>{title}</h5>
          <Button
            icon={<SaveFilled />}
            type="primary"
            className="bg-blue-500"
            onClick={handleSave}
          >
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
            <Text>This will be replaced by Google Translate API.</Text>
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