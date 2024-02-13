import React from 'react';
import { FaCheck, FaPencilAlt, FaTrash } from 'react-icons/fa';

const InboxContent: React.FC = () => {
  const tasks = [
    { id: 1, name: 'Task 1', category: 'Category 1' },
    { id: 2, name: 'Task 2', category: 'Category 2' },
    { id: 3, name: 'Task 3', category: 'Category 1' },
    // Add more tasks as needed
  ];

  return (
    <div className="flex-grow">
      <div className="w-full min-h-[700px] mx-auto py-4">
        <div className="shadow-md">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" /> {/* Checkbox for selecting task */}
                <div>
                  <span className="text-sm text-gray-500">{task.category}</span> {/* Task category */}
                  <span className="ml-2">{task.name}</span> {/* Task name */}
                </div>
              </div>
              <div className="flex items-center">
                <button className="text-blue-500 hover:text-blue-700 mr-2">
                  <FaPencilAlt />
                </button>
                <button className="text-red-500 hover:text-red-700 mr-2">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end p-4">
            <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Mark as Read</button>
            <button className="px-4 py-2 text-white bg-gray-500 rounded ml-4 hover:bg-gray-600">Archive</button>
            <button className="px-4 py-2 text-white bg-red-500 rounded ml-4 hover:bg-red-600">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxContent;
