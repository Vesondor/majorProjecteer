import React from 'react';
import { FaCheck, FaPencilAlt, FaTrash } from 'react-icons/fa';

const InboxContent: React.FC = () => {
  const tasks = [
    { id: 1, name: 'Task 1' },
    { id: 2, name: 'Task 2' },
    { id: 3, name: 'Task 3' },
    // Add more tasks as needed
  ];

  return (
    <div className="w-full py-4"> {/* Adjusted for full width */}
      <div className="shadow-md">
        <ul className="divide-y divide-gray-200">
          {tasks.map((task, index) => ( // Updated to use index for key due to duplicate ids
            <li key={index} className="flex items-center justify-between p-4 ml-auto mr-auto hover:bg-gray-50">
              <div className="flex items-center">
                <button className="text-green-500 hover:text-green-700">
                  <FaCheck />
                </button>
                <span className="ml-2">{task.name}</span>
              </div>
              <div>
                <button className="text-blue-500 hover:text-blue-700 mr-2">
                  <FaPencilAlt />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InboxContent;
