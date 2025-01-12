import { useState } from 'react';
import { Send, Search } from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  subject: string;
  message: string;
  date: string;
  unread: boolean;
}

interface ChatMessage {
  id: number;
  content: string;
  sender: 'admin' | 'user';
  timestamp: string;
}

const messages = [
  {
    id: 1,
    sender: 'John Supplier',
    subject: 'New Product Stock Update',
    message: 'Hi, I wanted to inform you about the new stock arrival...',
    date: '2024-02-20 10:30 AM',
    unread: true,
  },
  {
    id: 2,
    sender: 'Sarah Vendor',
    subject: 'Price Changes Notification',
    message: 'Due to recent market changes, we need to adjust prices...',
    date: '2024-02-19 03:45 PM',
    unread: false,
  },
  {
    id: 3,
    sender: 'Mike Distributor',
    subject: 'Shipping Delay Notice',
    message: 'There will be a slight delay in the upcoming shipment...',
    date: '2024-02-18 09:15 AM',
    unread: false,
  },
];

export function Inbox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const filteredMessages = messages.filter(
    (message) =>
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newChatMessage: ChatMessage = {
        id: Date.now(),
        content: newMessage,
        sender: 'admin',
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatMessages([...chatMessages, newChatMessage]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-[calc(100vh-7rem)] overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
      {/* Message List */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <div className="flex items-center rounded-lg border border-gray-300 px-3 dark:border-gray-600">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border-0 bg-transparent px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 dark:text-white"
            />
          </div>
        </div>
        <div className="h-full overflow-y-auto">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              onClick={() => setSelectedMessage(message.id)}
              className={`cursor-pointer border-b border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 ${
                selectedMessage === message.id
                  ? 'bg-blue-50 dark:bg-gray-700'
                  : ''
              } ${message.unread ? 'font-semibold' : ''}`}
            >
              <div className="flex justify-between">
                <span className="text-sm text-gray-900 dark:text-white">
                  {message.sender}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {message.date}
                </span>
              </div>
              <div className="mt-1 text-sm text-gray-900 dark:text-white">
                {message.subject}
              </div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {message.message.substring(0, 50)}...
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Content */}
      <div className="flex flex-1 flex-col">
        {selectedMessage ? (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              {messages.find((m) => m.id === selectedMessage)?.message}

              {/* Chat Messages */}
              <div className="mt-6 space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === 'admin' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        msg.sender === 'admin'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <span className="mt-1 text-xs opacity-70">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Type your reply..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={handleSendMessage}
                  className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
            Select a message to read
          </div>
        )}
      </div>
    </div>
  );
}