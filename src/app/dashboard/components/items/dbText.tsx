import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextContent: React.FC = () => {
  const [text, setText] = React.useState('');

  const handleChange = (content: string) => {
    setText(content);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1">
        <ReactQuill
          theme="snow"
          value={text}
          onChange={handleChange}
          style={{ height: '90%' }}
        />
      </div>
    </div>
  );
};

export default TextContent;
