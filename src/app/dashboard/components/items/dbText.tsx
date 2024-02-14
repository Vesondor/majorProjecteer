import React from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from Next.js

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }); // Import Quill.js dynamically

import 'react-quill/dist/quill.snow.css';
import '../../../../styles/app.css';

const TextContent: React.FC = () => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],         // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],             // outdent/indent
      [{ 'direction': 'rtl' }],                           // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }],    // custom dropdown
      [{ 'color': [] }, { 'background': [] }],              // dropdown with defaults
      ['clean']                                         // remove formatting button
    ],
    clipboard: true,
  };

  const [text, setText] = React.useState('');

  const handleChange = (content: string) => {
    setText(content);
  };

  // Generate random text for the left div
  const randomText =
    "មានរបបផ្អាកការអនុវត្តដោយការដាក់ពាក្យបណ្តឹងទាមទារឱ្យ ជំនុំជម្រះសាជាថ្មី។ នេះគឺជារបបផ្អាក ការអនុវត្តមួយរយៈពេល ក្នុងករណីដែលមាន ការដាក់ពាក្យបណ្តឹង ទាមទារឱ្យជំនុំជម្រះសាជាថ្មី រហូតដល់  ពេលបានទទួលលទ្ធផល នៃការដាក់ពាក្យបណ្តឹងនោះ។ ពេលមានសាលក្រម ឬសាលដីកាចូលជាស្ថាពរហើយ តាម ធម្មតា គេអាចអនុវត្តដោយបង្ខំហើយ។ ហេតុនេះ ការសុំផ្អាក ការអនុវត្តនោះ តម្រូវឱ្យមានល័ក្ខខ័ណ្ឌតឹងរ៉ឹងណាស់។ "
  return (
    <div className="text-editor-container">
      <div className="text-container">
        <div className="text-content mt-12">{randomText}</div>
      </div>
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
        @media (max-width: 768px) {
          .text-editor-container {
            display: flex;
            flex-direction: column;
          }
          .editor-container {
            margin-top: 20px; /* Adjust spacing between the text and editor on mobile */
          }
        }
      `}</style>
    </div>
  );
};

export default TextContent;
