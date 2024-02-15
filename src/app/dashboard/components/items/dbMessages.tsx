import React, { useState } from 'react';
import { FaUser, FaTelegram } from 'react-icons/fa';
import { Card, Avatar } from 'antd';

const { Meta } = Card;

const MessageContent: React.FC = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John', username: '@john_doe' },
    { id: 2, name: 'Alice', username: '@alice_smith' },
    // Add more contacts as needed
  ]);

  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [messages, setMessages] = useState<{ contactId: number; messages: { id: number; sender: string; content: string }[] }[]>([]);

  const handleContactClick = (contactId: number) => {
    setSelectedContact(contactId);

    // Simulated static data for messages
    const staticMessages = [
      { id: 1, sender: 'John', content: 'Hey, how are you?' },
      { id: 2, sender: 'You', content: 'Hi John! Doing well, thanks.' },
      { id: 3, sender: 'John', content: 'That\'s great to hear!' },
      { id: 4, sender: 'You', content: 'Yes, indeed!' },
      // Add more messages as needed
    ];

    // Filter messages for the selected contact
    const contactMessages = staticMessages.filter(message => message.sender === 'You' || contactId === 1); // Change contactId to the actual id of the selected contact

    // Set the messages for the selected contact
    setMessages([{ contactId, messages: contactMessages }]);
  };

  const handleSendMessage = () => {
    // Implement sending messages to the selected contact
    // You can use the selectedContact state to determine the current conversation
    console.log('Sending message to contact:', selectedContact);
  };

  return (
    <div className="flex min-h-[700px]">
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
            <Meta
              avatar={<Avatar icon={<FaUser />} />}
              title={contact.name}
              description={contact.username}
            />
          </Card>
        ))}
      </div>

      <div className="flex-1 p-4">
        <div className="text-xl font-bold mb-4">Chat</div>
        <div className="flex flex-col">
          {selectedContact !== null ? (
            <>
              {messages.map((conversation) => (
                <div key={conversation.contactId}>
                  {conversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`my-2 flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`p-3 rounded-lg ${message.sender === 'You' ? 'bg-blue-200 text-right' : 'bg-gray-200 text-left'}`}
                        style={{ maxWidth: '70%', wordWrap: 'break-word' }}
                      >
                        <span>{message.content}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </>
          ) : (
            <div className="text-gray-500">Please select a contact to start a conversation.</div>
          )}
          <div className="mt-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type your message..."
                onChange={(e) => {}}
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
