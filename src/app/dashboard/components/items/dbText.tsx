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

  // Adjustments within your existing TextContent component
  return (
    <div className="text-editor-container" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="back-button-container" onClick={onBackButtonClick}>
        <LeftOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
      </div>
      <div className="content-container" style={{ flex: 1, display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
        <div className="text-container" dangerouslySetInnerHTML={{ __html: text }} style={{ flex: 2 }}></div>
        <Divider type="vertical" style={{ height: '100%', margin: '0 20px', backgroundColor: 'red' }} />
        <div className="editor-container" style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
          <ReactQuill
            theme="snow"
            value={text}
            modules={modules}
            onChange={handleChange}
            className="react-quill"
            style={{ height: '100%', width: 'auto' }}
          />
        </div>
      </div>

      <style jsx>{`
      .back-button-container {
        font-size: 20px;
        align-items: top;
        cursor: pointer;
      }
      .text-container{
        margin:20px;

      }
      .text-editor-container {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .content-container {
        flex: 1;
        display: flex;
      }
    `}</style>
    </div>
  );


};

export default TextContent;
