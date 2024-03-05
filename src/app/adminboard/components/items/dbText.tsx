import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import 'react-quill/dist/quill.snow.css'; // Import ReactQuill styling

// Dynamically import ReactQuill for client-side rendering
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface TextContentProps {
  fileId: number; // Unique identifier for each file
  initialText: string;
  onBackButtonClick: () => void;
}

const TextContent: React.FC<TextContentProps> = ({ fileId, initialText, onBackButtonClick }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    // Try to retrieve saved text for this fileId
    const savedText = localStorage.getItem(`savedText_${fileId}`);
    if (savedText) {
      setText(savedText);
    } else {
      setText(initialText);
    }
  }, [fileId, initialText]);

  const handleChange = (content: string) => {
    setText(content);
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
        event.preventDefault(); // Prevent the default save dialog
        localStorage.setItem(`savedText_${fileId}`, text); // Save the current text to localStorage with unique key
        console.log('Text saved to localStorage');
      }
    };

    document.addEventListener('keydown', saveText);

    return () => {
      document.removeEventListener('keydown', saveText);
    };
  }, [text, fileId]);

  return (
    <div className="text-editor-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Button icon={<ArrowLeftOutlined />} onClick={onBackButtonClick} style={{ marginBottom: '20px', alignSelf: 'flex-start' }}>
        Back
      </Button>
      <div className="workspace" style={{ display: 'flex', height: 'calc(100% - 40px)', overflow: 'hidden' }}>
        <div className="original-text-section" style={{ flex: 1, overflow: 'auto', marginRight: '10px' }}>
          <h4>Original Text</h4>
          <div className="original-text" dangerouslySetInnerHTML={{ __html: initialText }} />
        </div>
        <div style={{ width: '2px', backgroundColor: '#ccc', marginRight: '20px' }} className="divider" />

        <div className="translation-editor-section" style={{ flex: 1, overflow: 'auto' }}>
          <h4>Text Editor</h4>
          <ReactQuill theme="snow" value={text} onChange={handleChange} modules={modules} style={{ height: '100%', overflow: 'auto' }} />
        </div>
      </div>
    </div>
  );
};

export default TextContent;
