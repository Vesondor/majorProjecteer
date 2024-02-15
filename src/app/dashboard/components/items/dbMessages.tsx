import React, { useState } from 'react';
import { FaTelegram } from 'react-icons/fa';

const MessageContent: React.FC = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John' },
    { id: 2, name: 'Alice' },
    // Add more contacts as needed
  ]);

  const [selectedContact, setSelectedContact] = useState<number | null>(null);

  const handleContactClick = (contactId: number) => {
    setSelectedContact(contactId);
  };

  const handleSendMessage = () => {
    // Implement sending messages to the selected contact
    // You can use the selectedContact state to determine the current conversation
    console.log('Sending message to contact:', selectedContact);
  };

  return (
    <div className="flex min-h-[700px]">
      <div className="w-1/5  text-white p-4" style={{ backgroundColor: '#214B71' }}>


        <div className="mt-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`cursor-pointer p-2 rounded-lg hover:bg-blue-600 ${selectedContact === contact.id ? 'bg-blue-600' : ''}`}
              onClick={() => handleContactClick(contact.id)}
            >
              {contact.name}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col bg-gray-100">
        <div className="bg-white p-4">
          {selectedContact !== null && (
            <div className="text-xl font-bold">{contacts.find(contact => contact.id === selectedContact)?.name}</div>
          )}
        </div>
        
        <div id="message-container" className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {/* Display messages for the selected contact */}
        </div>

        <div className="bg-white p-4 flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            onChange={(e) => {}}
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 ml-2 rounded-lg hover:bg-blue-600"
            disabled={selectedContact === null}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageContent;
