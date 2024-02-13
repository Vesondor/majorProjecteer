import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../../../styles/app.css'

const TextContent: React.FC = () => {
  const [text, setText] = React.useState('');

  const handleChange = (content: string) => {
    setText(content);
  };

  // Generate random text for the left div
  const randomText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non dui felis. Integer ac nulla nec turpis vehiculafacilisis. Nulla facilisi. Curabitur lacinia enim eget lectus elementum luctus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam id quibusdam quod cum eius quae, perferendis, facilis aut ratione autem aperiam quia ipsum reiciendis distinctio modi atque nemo odio rerum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam id quibusdam quod cum eius quae, perferendis, facilis aut ratione autem aperiam quia ipsum reiciendis distinctio modi atque nemo odio rerum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam id quibusdam quod cum eius quae, perferendis, facilis aut ratione autem aperiam quia ipsum reiciendis distinctio modi atque nemo odio rerum.";

  return (
    <div className="text-editor-container">
      <div className="text-container">
        <div className="text-content">{randomText}</div>
      </div>
      <div className="editor-container">
        <ReactQuill
          theme="snow"
          value={text}
          onChange={handleChange}
          className="react-quill"
          style={{ height: '100%' }} 
        />
      </div>
    </div>
  );
};

export default TextContent;
