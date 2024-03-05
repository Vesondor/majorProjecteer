import { Button } from 'antd';
import React, { useState } from 'react';
import { FaCloudUploadAlt, FaShare } from 'react-icons/fa';

const TransferContent: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [draggingOver, setDraggingOver] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggingOver(false); // Reset dragging over state

    // Filter out unsupported file types
    const unsupportedFiles = Array.from(e.dataTransfer.files).filter(file => {
      const fileType = file.type;
      return fileType !== 'application/pdf' && fileType !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    });

    if (unsupportedFiles.length > 0) {
      alert('Only .docx and .pdf files are supported.'); // Alert for unsupported files
      return;
    }

    // Add supported files to state
    const newFiles = Array.from(e.dataTransfer.files).filter(file => {
      const fileType = file.type;
      return fileType === 'application/pdf' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    });
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggingOver(true); // Set dragging over state
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggingOver(false); // Reset dragging over state
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#214B71', minHeight: '100vh', boxSizing: 'border-box' }}>
      <div className="w-full flex items-center justify-center py-4 relative bg-gray-100" style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', minHeight: '95vh' }}>
        <div
          className="p-8 flex flex-col items-center justify-center border-dashed border-4 border-gray-400"
          style={{ opacity: draggingOver ? 1 : 0.5, transition: 'opacity 0.2s', width: '80%', height: '80%' }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <h2 className="text-2xl font-semibold mb-4">Upload File</h2>
          <FaCloudUploadAlt className="text-8xl mb-8 text-gray-500" />
          {files.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Uploaded files:</h3>
              <ul>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          <Button className="bg-primary text-white mt-8">Transfer</Button>
        </div>
      </div>
    </div>
  );
};

export default TransferContent;
