import React, { useState, useEffect } from 'react';
import { Card, Avatar } from 'antd';
import { FaUser } from 'react-icons/fa';
import { AiOutlineFile } from 'react-icons/ai';

const { Meta } = Card;

interface Contact {
  id: number;
  name: string;
  username: string;
}

interface Message {
  id: number;
  sender: number;
  content: string;
  contactId: number;
}

const MessageContent: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: 'Sunkheang', username: '@bonglee' },
    { id: 2, name: 'Vathnak', username: '@ericvk' },
    { id: 3, name: 'Smey', username: '@vesondor' },
  ]);

  const [selectedContact, setSelectedContact] = useState<number | null>(contacts.length > 0 ? contacts[0].id : null);
  const [messages, setMessages] = useState<Message[]>(() => {
    const storedMessages = localStorage.getItem('messages');
    return storedMessages ? JSON.parse(storedMessages) : [];
  });
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const handleContactClick = (contactId: number) => {
    setSelectedContact(contactId);
  };

  const handleSendMessage = () => {
    if (!selectedContact || text.trim() === '') return;

    const newMessage: Message = {
      id: Date.now(),
      sender: 0,
      content: text,
      contactId: selectedContact,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setText('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // You can handle file upload logic here
      console.log('Uploaded file:', file);
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setText(text + emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#214B71', minHeight: '100vh', boxSizing: 'border-box' }}>
      <div className="flex" style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', minHeight: '95vh' }}>
        <div className="w-1/5 p-4">
          <div className="text-xl font-bold mb-4">Contacts</div>
          {contacts.map((contact) => (
            <Card
              key={contact.id}
              style={{ marginBottom: 10 }}
              hoverable
              onClick={() => handleContactClick(contact.id)}
              className={`${selectedContact === contact.id ? 'bg-blue-100' : ''}`}
            >
              <Meta avatar={<Avatar icon={<FaUser />} />} title={contact.name} description={contact.username} />
            </Card>
          ))}
        </div>

        <div className="flex-1 p-4 flex flex-col">
          <div className="text-xl font-bold mb-4">Chat</div>
          <div className="flex flex-col flex-1">
            <div className="overflow-auto mb-4">
              {selectedContact !== null ? (
                messages
                  .filter((message) => message.contactId === selectedContact || message.sender === selectedContact)
                  .map((message) => (
                    <div key={message.id} className={`my-2 flex ${message.sender === 0 ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`p-3 rounded-lg ${message.sender === 0 ? 'bg-blue-200 text-right' : 'bg-gray-200 text-left'}`}
                        style={{ maxWidth: '70%' }}
                      >
                        <span>{message.content}</span>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-gray-500">Please select a contact to start a conversation.</div>
              )}
            </div>
            <div className="mt-auto">
              <div className="flex items-center">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-3 border rounded-lg"
                />
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="bg-transparent border-none p-2 ml-2 focus:outline-none"
                >
                  😊
                </button>
                <input type="file" onChange={handleFileUpload} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="bg-transparent border-none p-2 ml-2 cursor-pointer">
                  <AiOutlineFile />
                </label>
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-500 text-white p-3 ml-2 rounded-lg hover:bg-blue-600"
                  disabled={!selectedContact}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageContent;
