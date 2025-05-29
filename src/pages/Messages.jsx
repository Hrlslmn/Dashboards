import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const contacts = [
  {
    id: 1,
    name: 'Marcus',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    lastMessage: 'Do you have updates?',
    messages: [
      { from: 'them', text: 'Hey, do you have updates on the new product launch?', time: '10:01 AM' },
      { from: 'me', text: 'Yes, it’s launching next week.', time: '10:02 AM' },
      { from: 'them', text: 'Great! Please send over the final deck.', time: '10:03 AM' },
    ],
  },
  {
    id: 2,
    name: 'Yok Mei',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    lastMessage: 'Invoice confirmed.',
    messages: [
      { from: 'them', text: 'Invoice #065495 has been processed successfully.', time: '9:15 AM' },
    ],
  },
];

export default function MessagesPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState(contacts[0]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      const newMsg = {
        from: 'me',
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setSelected((prev) => ({
        ...prev,
        messages: [...prev.messages, newMsg],
      }));
      setInput('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selected.messages]);

  return (
    <div className="flex h-screen bg-[#F5F7FB] overflow-hidden">
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
          <div className="fixed z-50 top-0 left-0 h-full">
            <Sidebar collapsed={false} onClose={() => setMobileOpen(false)} isMobile />
          </div>
        </>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setMobileOpen((prev) => !prev)} />

        <main className="flex flex-1 overflow-hidden h-full">
          {/* Contact list */}
          <aside className="w-full md:w-72 bg-white border-r overflow-y-auto">
            <h2 className="text-lg font-semibold p-4 border-b">Contacts</h2>
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelected(contact)}
                className={`flex items-center gap-3 p-4 cursor-pointer transition ${
                  selected.id === contact.id ? 'bg-indigo-50' : 'hover:bg-gray-100'
                }`}
              >
                <img src={contact.avatar} className="w-10 h-10 rounded-full" alt={contact.name} />
                <div>
                  <h4 className="text-sm font-semibold">{contact.name}</h4>
                  <p className="text-xs text-gray-500 truncate w-44">{contact.lastMessage}</p>
                </div>
              </div>
            ))}
          </aside>

          {/* Chat area */}
          <section className="flex-1 flex flex-col bg-[#FAFAFA] h-full">
            {/* Chat header */}
            <div className="bg-white px-6 py-4 border-b flex items-center gap-4 shadow-sm">
              <img src={selected.avatar} className="w-10 h-10 rounded-full" alt={selected.name} />
              <div>
                <h3 className="text-lg font-semibold">{selected.name}</h3>
                <span className="text-xs text-gray-500">Active now</span>
              </div>
            </div>

            {/* Scrollable messages */}
            <div className="flex-1 overflow-y-auto h-0 p-6 space-y-4">
              {selected.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-xl text-sm shadow relative ${
                    msg.from === 'me' ? 'ml-auto bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.text}
                  <span className="block text-[10px] text-right mt-1 opacity-70">{msg.time}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message input */}
            <div className="bg-white p-4 border-t flex gap-2 shadow-inner">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleSend}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Send
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}



