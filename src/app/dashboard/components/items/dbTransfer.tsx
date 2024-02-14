import { Button } from 'antd';
import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

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
    <div
      className={`w-full min-h-[700px] mx-auto py-4 ${draggingOver ? 'border-dashed border-4 border-gray-400' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="shadow-md p-4 flex flex-col items-center justify-center">
        <FaCloudUploadAlt className={`text-4xl mb-4 ${draggingOver ? 'text-blue-500' : 'text-gray-500'}`} />
        <h2 className="text-lg font-semibold mb-4">Drag and drop .docx or .pdf files here</h2>
        {files.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Uploaded files:</h3>
            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
              <Button className='bg-primary text-white m-5'>Transfer</Button>
      </div>
    </div>
  );
};

export default TransferContent;
