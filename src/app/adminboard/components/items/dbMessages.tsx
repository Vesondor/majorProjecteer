import React, { useState, useEffect } from 'react';
import { Card, Avatar } from 'antd';
import { FaUser } from 'react-icons/fa';

const { Meta } = Card;

// Define types for TypeScript (optional)
interface Contact {
  id: number;
  name: string;
  username: string;
}

interface Message {
  id: number;
  sender: number; // Consider using 'senderId' for clarity
  content: string;
  contactId: number; // The recipient's ID
}

const MessageContent: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: 'Sunkheang', username: '@bonglee' },
    { id: 2, name: 'Vathnak', username: '@ericvk' },
    { id: 3, name: 'Smey', username: '@vesondor' },
  ]);

  const [messages, setMessages] = useState<Message[]>(() => {
    const storedMessages = localStorage.getItem('messages');
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  const [text, setText] = useState('');
  const [selectedContact, setSelectedContact] = useState<number | null>(null);

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
      sender: 0, // Assuming '0' is the user's ID
      content: text,
      contactId: selectedContact,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setText('');
  };

  return (
    <div className="flex min-h-[750px]">
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
                onClick={handleSendMessage}
                className="bg-blue-500 text-white p-3 ml-3 rounded-lg hover:bg-blue-600"
                disabled={!selectedContact}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageContent;
