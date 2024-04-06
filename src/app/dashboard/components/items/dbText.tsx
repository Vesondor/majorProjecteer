import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Button } from 'antd';
import axios from 'axios';
import { ArrowLeftOutlined } from '@ant-design/icons';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface TextContentProps {
  fileId: number;
  initText: string;
  initTranslateText: string;
  onBackButtonClick: () => void;
}

const TextContent: React.FC<TextContentProps> = ({ fileId, initText, initTranslateText, onBackButtonClick }) => {
  const [text, setText] = useState(initText);
  const [translatedText, setTranslateText] = useState(initTranslateText)

  useEffect(() => {
    setText(initText);

  }, [initText]);

  const handleChange = (content: string) => {
    setText(content);
  };

  const saveDocument = async () => {
    try {

      const cleanedText = text.replace(/<[^>]*>/g, ''); // Remove HTML tags
      const documentStyle = JSON.stringify(cleanedText).replace(/"/g, ''); // Remove double quotes
      const wordSpaced = documentStyle.split(' ');
      const wordCount = wordSpaced.length;
      const documentTranslated = translatedText;

      await axios.put(`http://localhost:3001/api/documents/${fileId}`, {
        documentStyle,
        wordCount,
        documentTranslated,
      });

      console.log('Document saved to server');
    } catch (error: any) {
      console.error('Error saving document:', error.message);
    }
  };
  const handleSave = () => {
    saveDocument();
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ color: [] }, { background: [] }],
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
    <div className="text-editor-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Button icon={<ArrowLeftOutlined />} onClick={onBackButtonClick} style={{ margin: '10px', alignSelf: 'flex-start' }}>
        Back
      </Button>
      <div className="workspace" style={{ display: 'flex', height: 'calc(100% - 40px)', overflow: 'hidden', margin: '20px' }}>
        <div className="original-text-section" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto', marginRight: '10px' }}>
          <div className="upper-text-section" style={{ flex: 1, overflow: 'auto' }}>
            <h4>Original Text</h4>
            <div className="original-text" dangerouslySetInnerHTML={{ __html: initText }} />
          </div>
          <div className="lower-text-section" style={{ flex: 1, marginTop: '20px', overflow: 'auto' }}>
            <h4>Machine Translation</h4>
            <div className="translated-text" dangerouslySetInnerHTML={{ __html: initTranslateText }} />
          </div>
        </div>
        <div className="translation-editor-section" style={{ flex: 1, overflow: 'auto' }}>
          <h4>Text Editor</h4>
          <ReactQuill theme="snow" value={text} onChange={handleChange} modules={modules} style={{ height: '100%', overflow: 'auto' }} />
        </div>
      </div>
    </div>
  );
};

export default TextContent;
