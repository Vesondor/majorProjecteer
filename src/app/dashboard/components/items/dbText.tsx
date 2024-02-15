import React from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from Next.js
import { Button, Divider } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }); // Import Quill.js dynamically

import 'react-quill/dist/quill.snow.css';
import '../../../../styles/app.css';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface TextContentProps {
  initialText: string;
  onBackButtonClick: () => void;
}

const TextContent: React.FC<TextContentProps> = ({ initialText, onBackButtonClick }) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
    clipboard: true,
  };

  const [text, setText] = React.useState(initialText);

  const handleChange = (content: string) => {
    setText(content);
  };

  return (
    <div className="text-editor-container">
      <div className="back-button-container" onClick={onBackButtonClick}>
        <LeftOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
      </div>
      <div className="text-container mt-4" dangerouslySetInnerHTML={{ __html: text }}></div>
      <Divider type="vertical" style={{ height: '100%', margin: '0 10px' }} />
      <div className="editor-container">
        <ReactQuill
          theme="snow"
          value={text}
          modules={modules}
          onChange={handleChange}
          className="react-quill"
          style={{ height: '100%' }}
        />
      </div>

      <style jsx>{`
        .back-button-container {
          display: flex;
          font-size: 20px;
          align:top;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default TextContent;
