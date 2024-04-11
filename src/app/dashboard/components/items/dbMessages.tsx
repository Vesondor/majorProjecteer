import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { Button } from 'antd';
import { motion } from "framer-motion";

interface Message {
  messageId: number;
  senderId: number;
  receiverId: number;
  text: string;
  createdAt: string;
  senderUsername: string;
  receiverUsername: string;
}

const CURRENT_USER_ID = 4; // Change this ID to test with different users

const fetchMessages = async (): Promise<Message[]> => {
  try {
    const response = await axios.get<Message[]>(`http://localhost:3001/api/messages/${CURRENT_USER_ID}`);
    return response.data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } catch (error: any) {
    alert('Error fetching messages: ' + (error.response?.data || error));
    throw error;
  }
};

const createMessage = async (receiverId: number, text: string) => {
  try {
    await axios.post('http://localhost:3001/api/messages', { senderId: CURRENT_USER_ID, receiverId, text });
  } catch (error: any) {
    console.error('Error creating message:', error.message);
    throw error;
  }
};

const MessageContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages().then(setMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUserSelection = (userId: number) => {
    setSelectedUser(userId);
  };

  const sendMessage = async () => {
    if (!selectedUser || !newMessage) return;
    await createMessage(selectedUser, newMessage);
    setNewMessage('');
    fetchMessages().then(setMessages);
  };

  // Determine unique users for the sidebar
  const uniqueUsers = messages.reduce((acc: Record<number, Message>, message: Message) => {
    const otherUserId = message.senderId === CURRENT_USER_ID ? message.receiverId : message.senderId;
    if (!acc[otherUserId]) {
      acc[otherUserId] = message;
    }
    return acc;
  }, {});

  return (
    <div className="flex h-screen">
      <div className={`w-1/6 bg-white border-r flex-shrink-0 shadow-lg ${isSidebarOpen ? 'block' : 'hidden'}`}>
        {/* Sidebar content */}
        <div className="p-2">
          <h3 className="text-lg font-semibold text-center border-b pb-2">Contacts</h3>
          {Object.values(uniqueUsers).map((user) => {
            const isActive = user.senderId === selectedUser || user.receiverId === selectedUser;
            const truncatedName = user.senderId === CURRENT_USER_ID ? user.receiverUsername : user.senderUsername;

            return (
              <div key={user.messageId}
                onClick={() => handleUserSelection(user.senderId === CURRENT_USER_ID ? user.receiverId : user.senderId)}
                className={`flex items-center p-2 cursor-pointer rounded-lg m-1 ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'} transition duration-150 ease-in-out break-words`}
              >
                <UserOutlined className={`mr-2 ${isActive ? 'text-white' : 'text-gray-600'} text-xl`} />
                <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-900'}`} style={{ wordWrap: "break-word" }}>
                  {truncatedName}
                </span>
              </div>
            );
          })}
        </div>
      </div>




      <div className="flex flex-col flex-grow p-4 bg-gray-100">
        {selectedUser && (
          <>
            {/* Message display area */}
            <div className="flex-grow overflow-y-auto">
              {messages
                .filter((message) => (message.senderId === selectedUser && message.receiverId === CURRENT_USER_ID) || (message.senderId === CURRENT_USER_ID && message.receiverId === selectedUser))
                .map((message) => (
                  <div key={message.messageId} className={`flex mb-4 ${message.senderId === CURRENT_USER_ID ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-3/4 p-3 rounded-lg shadow ${message.senderId === CURRENT_USER_ID ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`} style={{ maxWidth: '75%' }}>
                      <span>{message.text}</span>
                      <div className="text-xs mt-2">
                        {message.senderId === CURRENT_USER_ID ? 'You' : message.senderUsername} - {new Date(message.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message input area */}
            <div className="py-4 flex items-center">
              <TextArea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                autoSize={{ minRows: 1, maxRows: 4 }}
                placeholder="Type a message..."
                className="flex-grow mr-2"
              />
              <Button type="primary" className='bg-blue-500' onClick={sendMessage}>
                Send
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageContent;
