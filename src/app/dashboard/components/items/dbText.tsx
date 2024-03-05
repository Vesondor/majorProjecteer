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

  const translatedText = "The plaintiff's assertion of a retrial must appear to have been substantiated by any of the reasons given at the point of the retrial (Article 307, paragraph 1). If the facts stated by the plaintiffs of the retrial do not match any of the reasons for the retrial, it is inconsistent with this condition.";

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
      <Button icon={<ArrowLeftOutlined />} onClick={onBackButtonClick} style={{ margin: '10px', alignSelf: 'flex-start' }}>
        Back
      </Button>
      <div className="workspace" style={{ display: 'flex', height: 'calc(100% - 40px)', overflow: 'hidden', margin: '20px' }}>
        <div className="original-text-section" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto', marginRight: '10px' }}>
          <div className="upper-text-section" style={{ flex: 1, overflow: 'auto' }}>
            <h4>Original Text</h4>
            <div className="original-text" dangerouslySetInnerHTML={{ __html: initialText }} />
          </div>
          <div className="lower-text-section" style={{ flex: 1, marginTop: '20px', overflow: 'auto' }}>
            <h4>Machine Translation</h4>
            <div className="translated-text" dangerouslySetInnerHTML={{ __html: translatedText }} /> {/* Update this to show the actual translated text */}
          </div>
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
